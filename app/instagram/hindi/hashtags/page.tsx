"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { HindiToolsToggle } from "@/components/instagram/hindi/tools-toggle"
import { HindiHashtagForm } from "@/components/hashtags/hindi/hashtag-form"
import { HashtagList } from "@/components/hashtags/hashtag-list"
import { HindiFeatureCards } from "@/components/hashtags/hindi/feature-cards"
import { generateHashtags } from "@/lib/openai"

interface HashtagOptions {
  category: string
  count: number
  popularity: string
  includeEmojis: boolean
  includeLocation: boolean
}

export default function HindiHashtagsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)

  const handleGenerate = async (topic: string, options: HashtagOptions) => {
    if (!topic) {
      toast.error("कृपया विषय दर्ज करें")
      return
    }

    if (!options.category) {
      toast.error("कृपया श्रेणी चुनें")
      return
    }

    setIsGenerating(true)
    try {
      const hashtags = await generateHashtags(topic, { ...options, language: 'hi' })
      setGeneratedHashtags([hashtags, ...generatedHashtags])
      toast.success("हैशटैग सफलतापूर्वक तैयार किए गए!")
    } catch (error) {
      console.error('Error:', error)
      toast.error("हैशटैग जनरेट करने में विफल")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("हैशटैग क्लिपबोर्ड पर कॉपी किए गए!")
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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">हिंदी हैशटैग जनरेटर</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                ट्रेंडिंग हैशटैग जनरेट करें और अपनी रीच बढ़ाएं
              </p>
            </div>

            <HindiToolsToggle />

            <HindiHashtagForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>30 दिन का फ्री ट्रायल</span>
              </div>
            )}

            <HashtagList 
              hashtags={generatedHashtags}
              onCopy={handleCopy}
            />

            <HindiFeatureCards />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}