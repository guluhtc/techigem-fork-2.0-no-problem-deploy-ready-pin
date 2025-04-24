import { NextResponse } from 'next/server'
import { InstagramBusinessAuth } from '@/lib/instagram/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const error_reason = searchParams.get('error_reason')
    const error_description = searchParams.get('error_description')
    const state = searchParams.get('state')
    const next = searchParams.get('next') || '/dashboard'

    // Handle OAuth errors
    if (error) {
      console.error('Instagram OAuth error:', { error, error_reason, error_description })
      return NextResponse.redirect(
        new URL(`/login?error=${error}&reason=${error_reason}&description=${error_description}`, 'https://techigem.com')
      )
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL('/login?error=invalid_request', 'https://techigem.com'))
    }

    try {
      // Exchange code for token
      const tokenData = await InstagramBusinessAuth.exchangeCodeForToken(code)
      
      // Get long-lived token
      const longLivedTokenData = await InstagramBusinessAuth.getLongLivedToken(tokenData.access_token)
      
      // Get profile data
      const profileData = await InstagramBusinessAuth.getBusinessProfile(longLivedTokenData.access_token)

      console.log('Instagram profile data:', profileData)

      // Create a new user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: `${profileData.username}@instagram.user`,
        password: crypto.randomUUID(),
        options: {
          data: {
            instagram_id: profileData.id,
            instagram_username: profileData.username
          }
        }
      })

      if (authError) {
        console.error('Error creating user:', authError)
        return NextResponse.redirect(new URL('/login?error=user_creation_failed', 'https://techigem.com'))
      }

      if (!authData.user) {
        console.error('No user data returned from signUp')
        return NextResponse.redirect(new URL('/login?error=no_user_data', 'https://techigem.com'))
      }

      // Create user profile in users table
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          instagram_id: profileData.id,
          instagram_username: profileData.username,
          instagram_full_name: profileData.name,
          instagram_profile_picture: profileData.profile_picture_url,
          instagram_bio: profileData.biography,
          instagram_website: profileData.website,
          instagram_followers_count: profileData.followers_count,
          instagram_following_count: profileData.follows_count,
          instagram_media_count: profileData.media_count,
          instagram_account_type: profileData.account_type,
          instagram_is_business: true,
          instagram_connected_at: new Date().toISOString()
        })

      if (profileError) {
        console.error('Error creating user profile:', profileError)
        return NextResponse.redirect(new URL('/login?error=profile_creation_failed', 'https://techigem.com'))
      }

      // Store Instagram session
      const { error: sessionError } = await supabase
        .from('instagram_auth_sessions')
        .insert({
          user_id: authData.user.id,
          access_token: longLivedTokenData.access_token,
          token_type: longLivedTokenData.token_type,
          expires_at: new Date(Date.now() + (longLivedTokenData.expires_in * 1000)).toISOString(),
          scope: ['instagram_business_basic']
        })

      if (sessionError) {
        console.error('Error storing session:', sessionError)
        return NextResponse.redirect(new URL('/login?error=session_creation_failed', 'https://techigem.com'))
      }

      // Sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: `${profileData.username}@instagram.user`,
        password: authData.user.user_metadata.password
      })

      if (signInError) {
        console.error('Error signing in user:', signInError)
        return NextResponse.redirect(new URL('/login?error=sign_in_failed', 'https://techigem.com'))
      }

      // Redirect to dashboard with session data
      const redirectUrl = new URL(next, 'https://techigem.com')
      redirectUrl.searchParams.set('session', JSON.stringify({
        access_token: longLivedTokenData.access_token,
        expires_in: longLivedTokenData.expires_in,
        scope: ['instagram_business_basic'],
        profile: profileData
      }))
      return NextResponse.redirect(redirectUrl)
    } catch (error: any) {
      console.error('Instagram auth error:', error)
      const errorMessage = encodeURIComponent(error.message || 'unknown')
      return NextResponse.redirect(new URL(`/login?error=${errorMessage}`, 'https://techigem.com'))
    }
  } catch (error) {
    console.error('Instagram callback error:', error)
    return NextResponse.redirect(new URL('/login?error=unknown', 'https://techigem.com'))
  }
}