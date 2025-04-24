"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Instagram, Loader2 } from "lucide-react"
import { InstagramBusinessAuth } from "@/lib/instagram/auth"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface InstagramLoginButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function InstagramLoginButton({ 
  className,
  variant = "outline",
  size = "default"
}: InstagramLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      // Check if user is authenticated
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        router.push('/login')
        toast.error('Please sign in to continue')
        return
      }

      const authUrl = InstagramBusinessAuth.getAuthUrl()
      window.location.href = authUrl
    } catch (error) {
      console.error('Instagram login error:', error)
      toast.error('Failed to initiate Instagram login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`relative hover:bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:text-white group transition-colors ${className}`}
      onClick={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting to Instagram...
        </>
      ) : (
        <>
          <Instagram className="mr-2 h-4 w-4" />
          Continue with Instagram
        </>
      )}
    </Button>
  )
}