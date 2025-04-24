export const instagramConfig = {
  appId: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID,
  appSecret: process.env.INSTAGRAM_APP_SECRET,
  accessToken: 'IGAAJA0gG176lBZAE84cl9WSUxfeU9zV3pGUWIwa2RaSjM4VU1TMEFOYVppX3NOWklSVG1BVmxzY0U2U2I5T3lEOHdvanhCTG4wYlRvRnlDUlZAvSm82V3hNMGZA0aG5OTzdRNEhudjY4WlMtWklIUnhWcXNuUEstTV9VYlE2cHpDZAwZDZD',
  apiVersion: 'v12.0',
  graphApiUrl: 'https://graph.instagram.com',
  graphApiPublishUrl: 'https://graph.facebook.com',
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`,
  settings: {
    defaultPermissions: [
      'instagram_business_basic',
      'instagram_business_content_publish',
      'instagram_business_manage_insights',
      'instagram_business_manage_comments',
      'pages_show_list',
      'pages_read_engagement'
    ],
    webhookFields: [
      'mentions',
      'story_insights',
      'media_insights'
    ],
    mediaFields: [
      'id',
      'caption',
      'media_type',
      'media_url',
      'thumbnail_url',
      'permalink',
      'timestamp',
      'like_count',
      'comments_count',
      'insights'
    ],
    insightMetrics: {
      user: [
        'impressions',
        'reach',
        'profile_views',
        'follower_count'
      ],
      media: [
        'engagement',
        'impressions',
        'reach',
        'saved',
        'video_views'
      ]
    },
    postingLimits: {
      maxScheduledPosts: 25,
      maxCaptionLength: 2200,
      maxHashtags: 30
    }
  }
}