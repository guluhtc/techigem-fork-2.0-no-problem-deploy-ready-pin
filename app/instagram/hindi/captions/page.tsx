"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { HindiToolsToggle } from "@/components/instagram/hindi/tools-toggle"
import { HindiCaptionForm } from "@/components/captions/hindi/caption-form"
import { CaptionList } from "@/components/captions/caption-list"
import { HindiFeatureCards } from "@/components/captions/hindi/feature-cards"
import { generateCaption } from "@/lib/openai"

export default function HindiCaptionsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)
  const [savedCaptions, setSavedCaptions] = useState<string[]>([])

  const handleGenerate = async (prompt: string, options: any) => {
    if (!prompt) {
      toast.error("कृपया एक विवरण दर्ज करें")
      return
    }

    setIsGenerating(true)
    try {
      const caption = await generateCaption(prompt, { ...options, language: 'hi' })
      setGeneratedCaptions([caption, ...generatedCaptions])
      toast.success("कैप्शन सफलतापूर्वक तैयार किए गए!")
    } catch (error) {
      console.error('Error:', error)
      toast.error("कैप्शन जनरेट करने में विफल")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("कैप्शन क्लिपबोर्ड पर कॉपी किया गया!")
  }

  const handleSave = (caption: string) => {
    setSavedCaptions(prev => [...prev, caption])
    toast.success("कैप्शन लाइब्रेरी में सहेजा गया!")
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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">हिंदी कैप्शन जनरेटर</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                AI की मदद से सेकंड्स में आकर्षक हिंदी कैप्शन बनाएं
              </p>
            </div>

            <HindiToolsToggle />

            <HindiCaptionForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>30 दिन का फ्री ट्रायल</span>
              </div>
            )}

            <CaptionList 
              captions={generatedCaptions}
              onCopy={handleCopy}
              onSave={handleSave}
            />

            <HindiFeatureCards />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}