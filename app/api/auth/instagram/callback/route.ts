import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { InstagramBusinessAuth } from '@/lib/instagram/auth'

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
        new URL(`/login?error=${error}&reason=${error_reason}&description=${error_description}`, request.url)
      )
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL('/login?error=invalid_request', request.url))
    }

    // Create Supabase client
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      console.error('No session:', sessionError)
      return NextResponse.redirect(new URL('/login?error=no_session', request.url))
    }

    try {
      // Exchange code for token
      const tokenData = await InstagramBusinessAuth.exchangeCodeForToken(code)
      
      // Get long-lived token
      const longLivedTokenData = await InstagramBusinessAuth.getLongLivedToken(tokenData.access_token)
      
      // Get profile data
      const profileData = await InstagramBusinessAuth.getBusinessProfile(longLivedTokenData.access_token)

      // Store Instagram session
      await InstagramBusinessAuth.storeAuthSession(session.user.id, {
        access_token: longLivedTokenData.access_token,
        expires_in: longLivedTokenData.expires_in,
        scope: ['instagram_business_basic'] // Default scope since we don't get it in response
      })

      // Update user profile with Instagram data
      const { error: updateError } = await supabase
        .from('users')
        .update({
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
        .eq('id', session.user.id)

      if (updateError) {
        console.error('Error updating user:', updateError)
        return NextResponse.redirect(new URL('/login?error=update_failed', request.url))
      }

      return NextResponse.redirect(new URL(next, request.url))
    } catch (error: any) {
      console.error('Instagram auth error:', error)
      const errorMessage = encodeURIComponent(error.message || 'unknown')
      return NextResponse.redirect(new URL(`/login?error=${errorMessage}`, request.url))
    }
  } catch (error) {
    console.error('Instagram callback error:', error)
    return NextResponse.redirect(new URL('/login?error=unknown', request.url))
  }
}