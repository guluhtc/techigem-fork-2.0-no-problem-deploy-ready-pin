"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { HashtagForm } from "@/components/hashtags/hashtag-form"
import { HashtagList } from "@/components/hashtags/hashtag-list"
import { FeatureCards } from "@/components/hashtags/feature-cards"
import { generateHashtags } from "@/lib/openai"

interface HashtagOptions {
  count: number
  popularity: string
  includeEmojis: boolean
  includeLocation: boolean
}

export default function HashtagsGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)

  const handleGenerate = async (topic: string, category: string, options: HashtagOptions) => {
    if (!topic) {
      toast.error("Please enter a topic or keywords")
      return
    }

    if (!category) {
      toast.error("Please select a category")
      return
    }

    setIsGenerating(true)
    try {
      const hashtags = await generateHashtags(topic, { ...options, category })
      setGeneratedHashtags([hashtags, ...generatedHashtags])
      toast.success("Hashtags generated successfully!")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to generate hashtags")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Hashtags copied to clipboard!")
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">AI Hashtag Generator</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Generate trending hashtags to increase your reach
              </p>
            </div>

            <ToolsToggle />

            <HashtagForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>Premium features free for 30 days</span>
              </div>
            )}

            <HashtagList 
              hashtags={generatedHashtags}
              onCopy={handleCopy}
            />

            <FeatureCards />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}