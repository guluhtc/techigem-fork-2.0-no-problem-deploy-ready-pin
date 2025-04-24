import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Data Deletion Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px;">
        <h1>Data Deletion Confirmation</h1>
        <p>We confirm that your Instagram data has been deleted from our systems.</p>
        <p>Reference ID: ${id || 'Not provided'}</p>
      </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}