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

    // Delete all user data
    const { error: deleteAccountError } = await supabase
      .from('instagram_accounts')
      .delete()
      .eq('instagram_user_id', data.user_id)

    const { error: deleteWebhooksError } = await supabase
      .from('instagram_webhooks')
      .delete()
      .eq('data->user_id', data.user_id)

    if (deleteAccountError || deleteWebhooksError) {
      console.error('Error deleting user data:', { deleteAccountError, deleteWebhooksError })
      return NextResponse.json({ error: 'Failed to delete user data' }, { status: 500 })
    }

    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/data-deletion/confirmation`,
      confirmation_code: data.user_id
    })
  } catch (error) {
    console.error('Data deletion error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}