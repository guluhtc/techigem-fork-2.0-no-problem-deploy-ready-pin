import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { subscribe } from '@/lib/instagram/webhook'

export async function POST(request: Request) {
  try {
    // Get current user session
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { fields } = await request.json()

    if (!Array.isArray(fields) || fields.length === 0) {
      return NextResponse.json({ error: 'Invalid fields parameter' }, { status: 400 })
    }

    // Subscribe to webhooks with user's access token
    const result = await subscribe(fields)
    return NextResponse.json(result)
  } catch (error: any) {
    // Combine error message into a single string
    console.error(`Subscription error: ${error?.message || error}`)
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}