import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'
import { cookies } from 'next/headers'

const supabase = createClientComponentClient<Database>()

export class InstagramBusinessAuth {
  private static readonly GRAPH_API_URL = 'https://graph.instagram.com'
  private static readonly AUTH_URL = 'https://www.instagram.com/oauth/authorize'
  private static readonly TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
  private static readonly LONG_LIVED_TOKEN_URL = 'https://graph.instagram.com/access_token'
  private static readonly ACCESS_TOKEN = 'IGAAJA0gG176lBZAE1BZAGRyZAXFNa1g5M0xGNmVlQWRJUHR0X1VWZAjFrd0g2N3JZASFkydE9KOUpHQ3hSQWw3cG5idERTZAGh0X181cVNKd2w5ZADBXMFc2WWh3VmFndXFXWjhseUdPVUkzZA0d4dXZAUMjVLakVaYm1nZAnZARNHlrcDFFSQZDZD'

  static getAuthUrl(): string {
    // Generate a random state parameter
    const state = crypto.randomUUID()
    
    // Store the state in a cookie
    document.cookie = `instagram_auth_state=${state}; path=/; max-age=3600; SameSite=Lax`

    const params = new URLSearchParams({
      client_id: '634220669431721',
      redirect_uri: 'https://techigem.com/api/auth/instagram/callback',
      response_type: 'code',
      scope: [
        'instagram_business_basic',
        'instagram_business_manage_messages',
        'instagram_business_manage_comments',
        'instagram_business_content_publish',
        'instagram_business_manage_insights'
      ].join(','),
      state,
      enable_fb_login: '0',
      force_authentication: '1'
    })

    return `${this.AUTH_URL}?${params.toString()}`
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