import { supabase } from '@/lib/supabase'

export interface TokenInfo {
  isValid: boolean;
  expiresIn?: number;
  error?: string;
}

export async function verifyToken(userId: string): Promise<TokenInfo> {
  try {
    const { data: session, error: sessionError } = await supabase
      .from('instagram_auth_sessions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (sessionError) throw sessionError

    if (!session) {
      return {
        isValid: false,
        error: 'No active Instagram session found'
      }
    }

    const now = new Date()
    const expiresAt = new Date(session.expires_at)
    const expiresIn = Math.floor((expiresAt.getTime() - now.getTime()) / 1000)

    return {
      isValid: expiresIn > 0,
      expiresIn: expiresIn > 0 ? expiresIn : 0,
      error: expiresIn <= 0 ? 'Token has expired' : undefined
    }
  } catch (error: any) {
    console.error('Error verifying token:', error)
    return {
      isValid: false,
      error: error.message
    }
  }
}

export async function refreshToken(userId: string): Promise<TokenInfo> {
  try {
    const { data: session, error: sessionError } = await supabase
      .from('instagram_auth_sessions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (sessionError) throw sessionError

    if (!session) {
      return {
        isValid: false,
        error: 'No active Instagram session found'
      }
    }

    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${session.access_token}`
    )

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()

    const { error: updateError } = await supabase
      .from('instagram_auth_sessions')
      .update({
        access_token: data.access_token,
        expires_at: new Date(Date.now() + (data.expires_in * 1000)).toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)

    if (updateError) throw updateError

    return {
      isValid: true,
      expiresIn: data.expires_in
    }
  } catch (error: any) {
    console.error('Error refreshing token:', error)
    return {
      isValid: false,
      error: error.message
    }
  }
}