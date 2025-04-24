"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Heart, BarChart2, Share2, BookmarkPlus } from "lucide-react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface HashtagListProps {
  hashtags: string[]
  onCopy: (text: string) => void
}

export function HashtagList({ hashtags, onCopy }: HashtagListProps) {
  const [sortBy, setSortBy] = useState("relevance")
  const [savedHashtags, setSavedHashtags] = useState<Set<string>>(new Set())

  if (!hashtags.length) return null

  const handleSave = (hashtag: string) => {
    const newSaved = new Set(savedHashtags)
    if (newSaved.has(hashtag)) {
      newSaved.delete(hashtag)
      toast.info("Removed from saved hashtags")
    } else {
      newSaved.add(hashtag)
      toast.success("Added to saved hashtags")
    }
    setSavedHashtags(newSaved)
  }

  const handleShare = (hashtag: string) => {
    if (navigator.share) {
      navigator.share({
        text: hashtag,
        title: "Share Hashtags",
      }).catch(console.error)
    } else {
      onCopy(hashtag)
      toast.success("Copied to clipboard for sharing!")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Generated Hashtags</h2>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="length">Length</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {hashtags.map((hashtags, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <p className="text-sm font-medium">{hashtags}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BarChart2 className="h-3 w-3" />
                      <span>{hashtags.split(' ').length} tags</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Heart className="h-3 w-3" />
                      <span>High Engagement</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare(hashtags)}
                    className="hover:text-primary"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSave(hashtags)}
                    className={savedHashtags.has(hashtags) ? "text-primary" : "hover:text-primary"}
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onCopy(hashtags)}
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