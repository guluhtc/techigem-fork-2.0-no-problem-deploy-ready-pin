import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

const supabase = createClientComponentClient<Database>()

export class InstagramBusinessAuth {
  private static readonly GRAPH_API_URL = 'https://graph.instagram.com'
  private static readonly AUTH_URL = 'https://www.instagram.com/oauth/authorize'
  private static readonly TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
  private static readonly LONG_LIVED_TOKEN_URL = 'https://graph.instagram.com/access_token'

  static getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`,
      response_type: 'code',
      scope: [
        'instagram_business_basic',
        'instagram_business_manage_messages',
        'instagram_business_manage_comments',
        'instagram_business_content_publish',
        'instagram_business_manage_insights'
      ].join(','),
      state: crypto.randomUUID(),
      enable_fb_login: '0',
      force_authentication: '1'
    })

    return `${this.AUTH_URL}?${params.toString()}`
  }

  static async exchangeCodeForToken(code: string): Promise<{
    access_token: string;
    user_id: string;
  }> {
    const formData = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!,
      client_secret: process.env.INSTAGRAM_APP_SECRET!,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`,
      code,
    })

    const response = await fetch(this.TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to exchange code for token: ${error}`)
    }

    return response.json()
  }

  static async getLongLivedToken(shortLivedToken: string): Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }> {
    const response = await fetch(
      `${this.LONG_LIVED_TOKEN_URL}?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_APP_SECRET}&access_token=${shortLivedToken}`
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to get long-lived token: ${error}`)
    }

    return response.json()
  }

  static async refreshLongLivedToken(token: string): Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }> {
    const response = await fetch(
      `${this.GRAPH_API_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to refresh token: ${error}`)
    }

    return response.json()
  }

  static async getBusinessProfile(accessToken: string): Promise<any> {
    const response = await fetch(
      `${this.GRAPH_API_URL}/me?fields=id,username,name,profile_picture_url,account_type,media_count,followers_count,follows_count,website,biography&access_token=${accessToken}`
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to fetch business profile: ${error}`)
    }

    return response.json()
  }

  static async storeAuthSession(userId: string, data: {
    access_token: string;
    expires_in: number;
    scope: string[];
  }): Promise<void> {
    // Use service role client for admin operations
    const serviceClient = createClientComponentClient<Database>({
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    })

    const { error } = await serviceClient
      .from('instagram_auth_sessions')
      .upsert({
        user_id: userId,
        access_token: data.access_token,
        expires_at: new Date(Date.now() + (data.expires_in * 1000)).toISOString(),
        scope: data.scope
      })

    if (error) {
      console.error('Error storing auth session:', error)
      throw error
    }
  }
}