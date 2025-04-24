"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Instagram, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function InstagramBusinessLogin() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
      const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`
      const scope = 'instagram_basic,instagram_content_publish,instagram_manage_insights,instagram_manage_comments,pages_show_list,pages_read_engagement'
      
      const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
      
      window.location.href = url
    } catch (error) {
      console.error('Instagram login error:', error)
      toast.error('Failed to initiate Instagram login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Connect Instagram Business Account</h3>
        <p className="text-sm text-muted-foreground">
          Connect your Instagram Business account to enable posting and analytics features
        </p>
      </div>

      <Button
        className="w-full"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Instagram className="mr-2 h-4 w-4" />
            Connect Instagram
          </>
        )}
      </Button>
    </Card>
  )
}