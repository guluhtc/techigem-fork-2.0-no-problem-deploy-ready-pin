"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { HindiCaptionForm } from "@/components/captions/hindi/caption-form"
import { CaptionList } from "@/components/captions/caption-list"
import { HindiFeatureCards } from "@/components/captions/hindi/feature-cards"

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
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const dummyCaptions = [
        "✨ हर पल को खूबसूरती से जीने का हुनर सीखें। जीवन एक सुंदर यात्रा है जो हमें निरंतर विकास और खोज की ओर ले जाती है। #आत्मविकास #जीवन",
        "🌟 सपनों को हकीकत में बदलें, एक कदम एक समय में। रास्ता आसान नहीं होगा, लेकिन हर चुनौती इसे और भी खास बनाती है। #प्रेरणा #सफलता",
        "💫 हर क्षण में जादू बनाएं। कभी-कभी छोटे कदम सबसे बड़ी सफलता की ओर ले जाते हैं। #प्रगति #यात्रा"
      ]
      
      setGeneratedCaptions(dummyCaptions)
      toast.success("कैप्शन सफलतापूर्वक तैयार किए गए!")
    } catch (error) {
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
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold gradient-text">हिंदी कैप्शन जनरेटर</h1>
              <p className="text-xl text-muted-foreground">
                AI की मदद से सेकंड्स में आकर्षक हिंदी कैप्शन बनाएं
              </p>
            </div>

            <ToolsToggle />

            <HindiCaptionForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center gap-2 text-sm text-primary">
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