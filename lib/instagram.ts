import { createClient } from '@supabase/supabase-js'
import { supabase } from './supabase'

interface InstagramToken {
  access_token: string
  user_id: string
  expires_in: number
}

interface InstagramPost {
  caption: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  scheduled_time: string
}

export class InstagramAPI {
  private static readonly GRAPH_API_URL = 'https://graph.instagram.com/v12.0'
  private static readonly GRAPH_API_PUBLISH_URL = 'https://graph.facebook.com/v12.0'

  static async getAuthUrl(): Promise<string> {
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`
    const scope = 'instagram_basic,instagram_content_publish'

    return `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
  }

  static async exchangeCodeForToken(code: string): Promise<InstagramToken> {
    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!,
        client_secret: process.env.INSTAGRAM_APP_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`,
        code,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    return response.json()
  }

  static async schedulePost(post: InstagramPost, userId: string): Promise<void> {
    try {
      // Store the scheduled post in Supabase
      const { error } = await supabase
        .from('scheduled_posts')
        .insert([
          {
            user_id: userId,
            caption: post.caption,
            media_type: post.media_type,
            media_url: post.media_url,
            scheduled_time: post.scheduled_time,
            status: 'pending'
          }
        ])

      if (error) throw error

    } catch (error) {
      console.error('Error scheduling post:', error)
      throw new Error('Failed to schedule post')
    }
  }

  static async publishPost(mediaUrl: string, caption: string, accessToken: string): Promise<void> {
    try {
      // 1. Create a container
      const containerResponse = await fetch(`${this.GRAPH_API_PUBLISH_URL}/me/media`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: mediaUrl,
          caption: caption,
          access_token: accessToken,
        }),
      })

      if (!containerResponse.ok) {
        throw new Error('Failed to create media container')
      }

      const { id: containerId } = await containerResponse.json()

      // 2. Publish the container
      const publishResponse = await fetch(`${this.GRAPH_API_PUBLISH_URL}/me/media_publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creation_id: containerId,
          access_token: accessToken,
        }),
      })

      if (!publishResponse.ok) {
        throw new Error('Failed to publish post')
      }
    } catch (error) {
      console.error('Error publishing post:', error)
      throw new Error('Failed to publish post')
    }
  }
}