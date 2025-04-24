import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { INSTAGRAM_CONFIG } from '@/lib/instagram/config'

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

    // Verify state parameter
    if (!state) {
      console.error('No state parameter provided')
      return NextResponse.redirect(new URL('/login?error=invalid_request', 'https://techigem.com'))
    }

    // Get the stored state from cookies
    const cookieStore = cookies()
    const storedState = cookieStore.get('instagram_auth_state')?.value

    if (!storedState || storedState !== state) {
      console.error('Invalid state parameter', { storedState, state })
      return NextResponse.redirect(new URL('/login?error=invalid_state', 'https://techigem.com'))
    }

    // Clear the state cookie
    cookieStore.delete('instagram_auth_state')

    if (!code) {
      return NextResponse.redirect(new URL('/login?error=invalid_request', 'https://techigem.com'))
    }

    try {
      // Exchange code for token
      const formData = new URLSearchParams({
        client_id: INSTAGRAM_CONFIG.clientId,
        client_secret: INSTAGRAM_CONFIG.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: INSTAGRAM_CONFIG.redirectUri,
        code,
      })

      const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      })

      if (!tokenResponse.ok) {
        const error = await tokenResponse.text()
        throw new Error(`Failed to exchange code for token: ${error}`)
      }

      const tokenData = await tokenResponse.json()

      // Get long-lived token
      const longLivedTokenResponse = await fetch(
        `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_CONFIG.clientSecret}&access_token=${tokenData.access_token}`
      )

      if (!longLivedTokenResponse.ok) {
        const error = await longLivedTokenResponse.text()
        throw new Error(`Failed to get long-lived token: ${error}`)
      }

      const longLivedTokenData = await longLivedTokenResponse.json()

      // Get profile data
      const profileResponse = await fetch(
        `https://graph.instagram.com/me?fields=id,username,name,profile_picture_url,account_type,media_count,followers_count,follows_count,website,biography&access_token=${longLivedTokenData.access_token}`
      )

      if (!profileResponse.ok) {
        const error = await profileResponse.text()
        throw new Error(`Failed to fetch business profile: ${error}`)
      }

      const profileData = await profileResponse.json()

      console.log('Instagram profile data:', profileData)

      // First, check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('instagram_id', profileData.id)
        .single()

      let userId: string
      let userPassword: string

      if (existingUser) {
        // User exists, use their ID
        userId = existingUser.id
        // Get the user's password from their metadata
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('user_metadata')
          .eq('id', userId)
          .single()

        if (userError) {
          console.error('Error getting user data:', userError)
          return NextResponse.redirect(new URL('/login?error=user_data_failed', 'https://techigem.com'))
        }

        userPassword = userData.user_metadata.password
      } else {
        // Create new user with a random password
        const randomPassword = crypto.randomUUID()
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: `${profileData.username}@instagram.user`,
          password: randomPassword,
          options: {
            data: {
              instagram_id: profileData.id,
              instagram_username: profileData.username,
              password: randomPassword // Store password in metadata for later use
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

        userId = authData.user.id
        userPassword = randomPassword

        // Create initial user record
        const { error: createError } = await supabase
          .from('users')
          .insert({
            id: userId,
            email: `${profileData.username}@instagram.user`,
            role: 'user',
            created_at: new Date().toISOString()
          })

        if (createError) {
          console.error('Error creating user record:', createError)
          return NextResponse.redirect(new URL('/login?error=user_record_creation_failed', 'https://techigem.com'))
        }
      }

      // Update user profile with Instagram data
      const { error: updateError } = await supabase
        .from('users')
        .upsert({
          id: userId,
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

      if (updateError) {
        console.error('Error updating user profile:', updateError)
        return NextResponse.redirect(new URL('/login?error=profile_update_failed', 'https://techigem.com'))
      }

      // Store Instagram session
      const { error: sessionError } = await supabase
        .from('instagram_auth_sessions')
        .upsert({
          user_id: userId,
          access_token: longLivedTokenData.access_token,
          token_type: 'bearer',
          expires_at: new Date(Date.now() + longLivedTokenData.expires_in * 1000).toISOString(),
          scope: INSTAGRAM_CONFIG.scopes.split(','),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (sessionError) {
        console.error('Error storing Instagram session:', sessionError)
        return NextResponse.redirect(new URL('/login?error=session_storage_failed', 'https://techigem.com'))
      }

      // Sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: `${profileData.username}@instagram.user`,
        password: userPassword
      })

      if (signInError) {
        console.error('Error signing in user:', signInError)
        return NextResponse.redirect(new URL('/login?error=sign_in_failed', 'https://techigem.com'))
      }

      return NextResponse.redirect(new URL(next, 'https://techigem.com'))
    } catch (error) {
      console.error('Instagram callback error:', error)
      return NextResponse.redirect(new URL('/login?error=internal_error', 'https://techigem.com'))
    }
  } catch (error) {
    console.error('Instagram callback error:', error)
    return NextResponse.redirect(new URL('/login?error=internal_error', 'https://techigem.com'))
  }
}