"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Smile, Hash, Target, Zap, Wand2, RefreshCw } from "lucide-react"

interface CaptionFormProps {
  onGenerate: (prompt: string, options: CaptionOptions) => Promise<void>
  isGenerating: boolean
}

interface CaptionStyle {
  emoji: boolean
  hashtags: boolean
  mentions: boolean
  callToAction: boolean
}

interface CaptionOptions {
  industry: string
  tone: string
  language: string
  length: string
  style: CaptionStyle
}

export function CaptionForm({ onGenerate, isGenerating }: CaptionFormProps) {
  const [prompt, setPrompt] = useState("")
  const [options, setOptions] = useState<CaptionOptions>({
    industry: "",
    tone: "professional",
    language: "english",
    length: "medium",
    style: {
      emoji: true,
      hashtags: true,
      mentions: false,
      callToAction: true
    }
  })

  const handleStyleChange = (key: keyof CaptionStyle) => {
    setOptions(prev => ({
      ...prev,
      style: { ...prev.style, [key]: !prev.style[key] }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(prompt, options)
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Industry/Niche</label>
          <Select 
            value={options.industry} 
            onValueChange={(value) => setOptions(prev => ({ ...prev, industry: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your industry's niche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fashion">Fashion & Beauty</SelectItem>
              <SelectItem value="food">Food & Cooking</SelectItem>
              <SelectItem value="travel">Travel & Adventure</SelectItem>
              <SelectItem value="fitness">Health & Fitness</SelectItem>
              <SelectItem value="business">Business & Marketing</SelectItem>
              <SelectItem value="art">Art & Photography</SelectItem>
              <SelectItem value="education">Education & Learning</SelectItem>
              <SelectItem value="technology">Tech & Gaming</SelectItem>
              <SelectItem value="lifestyle">Lifestyle & Personal</SelectItem>
              <SelectItem value="entertainment">Entertainment & Media</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tone</label>
          <Select 
            value={options.tone} 
            onValueChange={(value) => setOptions(prev => ({ ...prev, tone: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual & Friendly</SelectItem>
              <SelectItem value="funny">Funny & Playful</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
              <SelectItem value="storytelling">Storytelling</SelectItem>
              <SelectItem value="promotional">Promotional</SelectItem>
              <SelectItem value="formal">Formal & Corporate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <Select 
            value={options.language} 
            onValueChange={(value) => setOptions(prev => ({ ...prev, language: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="gujarati">Gujarati</SelectItem>
              <SelectItem value="marathi">Marathi</SelectItem>
              <SelectItem value="bengali">Bengali</SelectItem>
              <SelectItem value="tamil">Tamil</SelectItem>
              <SelectItem value="telugu">Telugu</SelectItem>
              <SelectItem value="kannada">Kannada</SelectItem>
              <SelectItem value="malayalam">Malayalam</SelectItem>
              <SelectItem value="punjabi">Punjabi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Length</label>
          <Select 
            value={options.length} 
            onValueChange={(value) => setOptions(prev => ({ ...prev, length: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (50-100 chars)</SelectItem>
              <SelectItem value="medium">Medium (100-200 chars)</SelectItem>
              <SelectItem value="long">Long (200-400 chars)</SelectItem>
              <SelectItem value="story">Story Format</SelectItem>
              <SelectItem value="carousel">Carousel Post</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">What's your post about?</label>
        <Textarea
          placeholder="Describe your post or what you want to say..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="h-24"
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Caption Style</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant={options.style.emoji ? "default" : "outline"}
            className="w-full"
            onClick={() => handleStyleChange('emoji')}
          >
            <Smile className="mr-2 h-4 w-4" />
            Emojis
          </Button>
          <Button
            variant={options.style.hashtags ? "default" : "outline"}
            className="w-full"
            onClick={() => handleStyleChange('hashtags')}
          >
            <Hash className="mr-2 h-4 w-4" />
            Hashtags
          </Button>
          <Button
            variant={options.style.mentions ? "default" : "outline"}
            className="w-full"
            onClick={() => handleStyleChange('mentions')}
          >
            <Target className="mr-2 h-4 w-4" />
            Mentions
          </Button>
          <Button
            variant={options.style.callToAction ? "default" : "outline"}
            className="w-full"
            onClick={() => handleStyleChange('callToAction')}
          >
            <Zap className="mr-2 h-4 w-4" />
            Call to Action
          </Button>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleSubmit}
        disabled={isGenerating || !prompt || !options.industry}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Captions
          </>
        )}
      </Button>
    </Card>
  )
}