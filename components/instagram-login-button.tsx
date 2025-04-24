'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Instagram } from 'lucide-react'
import { getInstagramAuthUrl } from '@/lib/instagram/config'
import { useRouter } from 'next/navigation'

export function InstagramLoginButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInstagramLogin = async () => {
    setIsLoading(true)
    try {
      // Generate a random state
      const state = crypto.randomUUID()
      
      // Store state in cookie
      document.cookie = `instagram_auth_state=${state}; path=/; max-age=3600; secure; samesite=lax`
      
      // Redirect to Instagram auth
      window.location.href = getInstagramAuthUrl(state)
    } catch (error) {
      console.error('Instagram login error:', error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleInstagramLogin}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90"
    >
      <Instagram className="mr-2 h-5 w-5" />
      {isLoading ? 'Connecting...' : 'Continue with Instagram'}
    </Button>
  )
} 