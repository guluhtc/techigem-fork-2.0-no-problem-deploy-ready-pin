import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

const supabase = createClientComponentClient<Database>()

export class InstagramBusinessAuth {
  private static readonly GRAPH_API_URL = 'https://graph.instagram.com'
  private static readonly AUTH_URL = 'https://www.instagram.com/oauth/authorize'
  private static readonly TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
  private static readonly LONG_LIVED_TOKEN_URL = 'https://graph.instagram.com/access_token'
  private static readonly ACCESS_TOKEN = 'IGAAJA0gG176lBZAE1BZAGRyZAXFNa1g5M0xGNmVlQWRJUHR0X1VWZAjFrd0g2N3JZASFkydE9KOUpHQ3hSQWw3cG5idERTZAGh0X181cVNKd2w5ZADBXMFc2WWh3VmFndXFXWjhseUdPVUkzZA0d4dXZAUMjVLakVaYm1nZAnZARNHlrcDFFSQZDZD'

  static getAuthUrl(): string {
    // Since we're using a direct access token, we'll redirect to the callback immediately
    return '/api/auth/instagram/callback'
  }

  static async getBusinessProfile(accessToken: string): Promise<any> {
    const response = await fetch(
      `${this.GRAPH_API_URL}/me?fields=id,username,name,profile_picture_url,account_type,media_count,followers_count,follows_count,website,biography&access_token=${this.ACCESS_TOKEN}`
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
        access_token: this.ACCESS_TOKEN,
        expires_at: new Date(Date.now() + (60 * 24 * 60 * 60 * 1000)).toISOString(), // 60 days from now
        scope: data.scope
      })

    if (error) {
      console.error('Error storing auth session:', error)
      throw error
    }
  }
}