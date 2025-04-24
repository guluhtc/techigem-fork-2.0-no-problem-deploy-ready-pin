import { supabase } from '@/lib/supabase'
import { verifyToken as checkTokenValidity } from './token'

export interface VerificationResult {
  isValid: boolean;
  token?: string;
  error?: string;
}

export async function validateInstagramToken(userId: string, token: string): Promise<VerificationResult> {
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

    if (session.access_token !== token) {
      return {
        isValid: false,
        error: 'Invalid token'
      }
    }

    const tokenInfo = await checkTokenValidity(userId)
    return {
      isValid: tokenInfo.isValid,
      token: tokenInfo.isValid ? token : undefined,
      error: tokenInfo.error
    }
  } catch (error: any) {
    console.error('Error verifying token:', error)
    return {
      isValid: false,
      error: error.message
    }
  }
}

export async function createToken(userId: string, token: string): Promise<VerificationResult> {
  try {
    const { error } = await supabase
      .from('instagram_auth_sessions')
      .upsert({
        user_id: userId,
        access_token: token,
        expires_at: new Date(Date.now() + (60 * 60 * 24 * 60 * 1000)).toISOString(), // 60 days
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (error) throw error

    return {
      isValid: true,
      token
    }
  } catch (error: any) {
    console.error('Error creating token:', error)
    return {
      isValid: false,
      error: error.message
    }
  }
}