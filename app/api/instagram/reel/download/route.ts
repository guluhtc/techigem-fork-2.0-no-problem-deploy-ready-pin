import { NextResponse } from 'next/server'
import axios from 'axios'

const API_KEY = '1ecbc17c-caf1-4602-a40c-a7d1b68a45a1'
const API_URL = 'https://apihut.in/api/download/videos'

// Rate limiting configuration
const MAX_REQUESTS_PER_WINDOW = 100
const WINDOW_SIZE_MS = 3600000 // 1 hour

// Simple in-memory rate limiting
let requestCount = 0
let windowStart = Date.now()

// Rate limit check function
function checkRateLimit() {
  const now = Date.now()
  if (now - windowStart >= WINDOW_SIZE_MS) {
    requestCount = 0
    windowStart = now
    return true
  }
  
  if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }
  
  requestCount++
  return true
}

// Helper function to extract media URL from various response formats
function extractMediaUrl(responseData: any): string | null {
  // Log response structure for debugging
  console.log('API Response Structure:', JSON.stringify(responseData, null, 2))

  // Handle different response formats
  if (responseData?.message?.data?.[0]?.url) {
    return responseData.message.data[0].url
  }
  
  if (responseData?.message?.data?.[0]?.thumbnail) {
    return responseData.message.data[0].thumbnail
  }

  if (responseData?.data?.[0]?.url) {
    return responseData.data[0].url
  }

  if (responseData?.data?.[0]?.thumbnail) {
    return responseData.data[0].thumbnail
  }

  // If response has a direct URL property
  if (responseData?.url) {
    return responseData.url
  }

  if (responseData?.thumbnail) {
    return responseData.thumbnail
  }

  // If the response is an array
  if (Array.isArray(responseData) && responseData[0]) {
    return responseData[0].url || responseData[0].thumbnail || null
  }

  return null
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { message: 'URL is required' },
        { status: 400 }
      )
    }

    if (!url.includes('instagram.com/')) {
      return NextResponse.json(
        { message: 'Invalid Instagram URL' },
        { status: 400 }
      )
    }

    // Check rate limit
    if (!checkRateLimit()) {
      return NextResponse.json(
        { 
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil((WINDOW_SIZE_MS - (Date.now() - windowStart)) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((WINDOW_SIZE_MS - (Date.now() - windowStart)) / 1000).toString()
          }
        }
      )
    }

    try {
      // Make request to API
      const response = await axios.post(API_URL, {
        video_url: url,
        type: 'instagram'
      }, {
        headers: {
          'x-avatar-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      })

      // Log full API response for debugging
      console.log('Full API Response:', JSON.stringify(response.data, null, 2))

      // Extract media URL using helper function
      const mediaUrl = extractMediaUrl(response.data)

      if (!mediaUrl) {
        console.error('Failed to extract media URL from response:', response.data)
        throw new Error('Could not extract media URL from API response')
      }

      // Download the media
      const mediaResponse = await axios.get(mediaUrl, {
        responseType: 'arraybuffer',
        timeout: 30000,
        maxContentLength: 100 * 1024 * 1024, // 100MB max for reels
        headers: {
          'Accept': 'video/*, application/octet-stream'
        }
      })

      // Determine content type
      const contentType = mediaResponse.headers['content-type'] || 'video/mp4'

      return new NextResponse(mediaResponse.data, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': 'attachment; filename="instagram-reel.mp4"',
          'Cache-Control': 'no-cache'
        }
      })

    } catch (error: any) {
      console.error('API Error:', error.message)
      if (error.response?.data) {
        console.error('API Response:', error.response.data)
      }

      let errorMessage = 'Failed to download reel'
      let statusCode = 500
      
      if (error.response) {
        statusCode = error.response.status
        
        switch (statusCode) {
          case 400:
            errorMessage = 'Invalid request to media API'
            break
          case 401:
          case 403:
            errorMessage = 'API authentication failed'
            break
          case 404:
            errorMessage = 'Reel not found or is private'
            break
          case 429:
            errorMessage = 'API rate limit exceeded'
            break
          default:
            if (statusCode >= 500) {
              errorMessage = 'Media API service error'
            }
        }

        // Add more context to the error message
        if (error.response.data?.message) {
          errorMessage += `: ${error.response.data.message}`
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out'
        statusCode = 408
      } else if (error.message.includes('Invalid response format')) {
        errorMessage = 'Could not process API response'
        statusCode = 502
      } else if (error.message.includes('Could not extract media URL')) {
        errorMessage = 'Could not extract media URL from response'
        statusCode = 422
      }

      return NextResponse.json(
        {
          message: errorMessage,
          details: error.message
        },
        { status: statusCode }
      )
    }
  } catch (error: any) {
    console.error('Request processing error:', error)
    return NextResponse.json(
      {
        message: 'Failed to process request',
        details: error.message
      },
      { status: 500 }
    )
  }
}