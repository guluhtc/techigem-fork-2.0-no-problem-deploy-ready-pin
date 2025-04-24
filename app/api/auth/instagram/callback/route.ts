import { NextResponse } from 'next/server'
import { InstagramBusinessAuth } from '@/lib/instagram/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const INSTAGRAM_ACCESS_TOKEN = 'IGAAJA0gG176lBZAE1BZAGRyZAXFNa1g5M0xGNmVlQWRJUHR0X1VWZAjFrd0g2N3JZASFkydE9KOUpHQ3hSQWw3cG5idERTZAGh0X181cVNKd2w5ZADBXMFc2WWh3VmFndXFXWjhseUdPVUkzZA0d4dXZAUMjVLakVaYm1nZAnZARNHlrcDFFSQZDZD'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const next = searchParams.get('next') || '/dashboard'

    try {
      // Get profile data using the provided access token
      const profileData = await InstagramBusinessAuth.getBusinessProfile(INSTAGRAM_ACCESS_TOKEN)

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
          access_token: INSTAGRAM_ACCESS_TOKEN,
          token_type: 'Bearer',
          expires_at: new Date(Date.now() + (60 * 24 * 60 * 60 * 1000)).toISOString(), // 60 days from now
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
        access_token: INSTAGRAM_ACCESS_TOKEN,
        expires_in: 60 * 24 * 60 * 60, // 60 days in seconds
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