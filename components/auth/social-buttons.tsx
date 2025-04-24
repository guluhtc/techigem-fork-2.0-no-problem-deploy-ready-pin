"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface SocialButtonsProps {
  isLoading: boolean
  onInstagramLogin: () => void
}

export function SocialButtons({ isLoading, onInstagramLogin }: SocialButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <Button 
        variant="outline" 
        className="w-full h-11 relative hover:bg-[#1877F2] hover:text-white group transition-colors"
        onClick={() => toast.info("Facebook login coming soon")}
        disabled={isLoading}
      >
        <Facebook className="absolute left-4 h-4 w-4 text-[#1877F2] group-hover:text-white" />
        <span className="text-sm">Continue with Facebook</span>
      </Button>

      <Button 
        variant="outline" 
        className="w-full h-11 relative hover:bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:text-white group transition-colors"
        onClick={onInstagramLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Instagram className="absolute left-4 h-4 w-4 group-hover:text-white" />
            <span className="text-sm">Continue with Instagram</span>
          </>
        )}
      </Button>
    </div>
  )
}