export const INSTAGRAM_CONFIG = {
  clientId: process.env.INSTAGRAM_APP_ID || '634220669431721',
  clientSecret: process.env.INSTAGRAM_APP_SECRET || '7205c5fd1d1c00a5ebbe5b67ecd01d4a',
  redirectUri: process.env.INSTAGRAM_REDIRECT_URI || 'https://techigem.com/api/auth/instagram/callback',
  scopes: [
    'instagram_business_basic',
    'instagram_business_content_publish',
    'instagram_business_manage_messages',
    'instagram_business_manage_comments'
  ].join(','),
  apiVersion: 'v18.0'
}

export const getInstagramAuthUrl = (state: string) => {
  const params = new URLSearchParams({
    client_id: INSTAGRAM_CONFIG.clientId,
    redirect_uri: INSTAGRAM_CONFIG.redirectUri,
    response_type: 'code',
    scope: INSTAGRAM_CONFIG.scopes,
    state
  })

  return `https://www.instagram.com/oauth/authorize?${params.toString()}`
}