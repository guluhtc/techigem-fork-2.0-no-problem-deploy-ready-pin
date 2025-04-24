"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { HindiHashtagForm } from "@/components/hashtags/hindi/hashtag-form"
import { HashtagList } from "@/components/hashtags/hashtag-list"
import { HindiFeatureCards } from "@/components/hashtags/hindi/feature-cards"

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
    setIsGenerating(true)
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const dummyHashtags = [
        "#डिजिटलमार्केटिंग #मार्केटिंगस्ट्रैटेजी #बिजनेसग्रोथ #ऑनलाइनमार्केटिंग #मार्केटिंगटिप्स #सोशलमीडियामार्केटिंग #कंटेंटक्रिएटर #डिजिटलइंडिया",
        "#बिजनेसटिप्स #एंटरप्रेन्योरशिप #स्टार्टअपइंडिया #स्मॉलबिजनेस #डिजिटलट्रांसफॉर्मेशन #बिजनेसकोच #बिजनेसग्रोथ #इंडियनबिजनेस",
        "#मार्केटिंगएजेंसी #ब्रांडस्ट्रैटेजी #डिजिटलमार्केटर #सोशलमीडियाटिप्स #कंटेंटस्ट्रैटेजी #मार्केटिंगकंसल्टेंट #बिजनेसमार्केटिंग"
      ]
      
      setGeneratedHashtags(dummyHashtags)
      toast.success("हैशटैग सफलतापूर्वक तैयार किए गए!")
    } catch (error) {
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
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold gradient-text">हिंदी हैशटैग जनरेटर</h1>
              <p className="text-xl text-muted-foreground">
                ट्रेंडिंग हैशटैग जनरेट करें और अपनी रीच बढ़ाएं
              </p>
            </div>

            <ToolsToggle />

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