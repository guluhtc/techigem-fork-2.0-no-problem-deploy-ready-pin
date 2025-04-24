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

      // Store Instagram session in localStorage or sessionStorage
      const sessionData = {
        access_token: longLivedTokenData.access_token,
        expires_in: longLivedTokenData.expires_in,
        scope: ['instagram_business_basic'],
        profile: profileData
      }

      // Redirect to dashboard with session data
      const redirectUrl = new URL(next, 'https://techigem.com')
      redirectUrl.searchParams.set('session', JSON.stringify(sessionData))
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