"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Heart, Share2, BookmarkPlus } from "lucide-react"
import { toast } from "sonner"

interface BioListProps {
  bios: string[]
  onCopy: (text: string) => void
  onSave?: (text: string) => void
}

export function BioList({ bios, onCopy, onSave }: BioListProps) {
  if (!bios.length) return null

  const handleShare = async (bio: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: bio,
          title: "Share Instagram Bio"
        })
        toast.success("Bio shared successfully!")
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error)
          toast.error("Failed to share bio")
        }
      }
    } else {
      onCopy(bio)
      toast.success("Bio copied to clipboard for sharing!")
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Generated Bios</h2>
      <div className="grid gap-4">
        {bios.map((bio, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <p className="text-sm whitespace-pre-line">{bio}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{bio.length} characters</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{bio.split('\n').length} lines</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{(bio.match(/[\p{Emoji}]/gu) || []).length} emojis</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare(bio)}
                    className="hover:text-primary"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  {onSave && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onSave(bio)}
                      className="hover:text-primary"
                    >
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onCopy(bio)}
                    className="hover:text-primary"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}