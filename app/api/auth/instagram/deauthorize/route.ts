import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const signedRequest = searchParams.get('signed_request')

    if (!signedRequest) {
      return NextResponse.json({ error: 'Missing signed_request parameter' }, { status: 400 })
    }

    // Parse and verify the signed request
    const [encodedSignature, payload] = signedRequest.split('.')
    const data = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))

    // Delete Instagram account data
    const { error: deleteError } = await supabase
      .from('instagram_accounts')
      .delete()
      .eq('instagram_user_id', data.user_id)

    if (deleteError) {
      console.error('Error deleting Instagram account:', deleteError)
      return NextResponse.json({ error: 'Failed to delete account data' }, { status: 500 })
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Deauthorization error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}