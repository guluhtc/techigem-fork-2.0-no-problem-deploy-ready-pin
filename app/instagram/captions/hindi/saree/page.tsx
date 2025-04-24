"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { SareeCaptionForm } from "@/components/captions/hindi/saree/caption-form"
import { CaptionList } from "@/components/captions/caption-list"
import { SareeFeatureCards } from "@/components/captions/hindi/saree/feature-cards"
import { CaptionSuggestions } from "@/components/captions/hindi/saree/caption-suggestions"

export default function SareeCaptionsPage() {
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
        "✨ साड़ी में सजी हर नारी, खूबसूरती की मिसाल बनी। परंपरा और आधुनिकता का अनूठा मेल, यही तो है भारतीय नारी की पहचान। #साड़ी #भारतीयपरिधान",
        "🌟 साड़ी है भारतीय संस्कृति का प्रतीक, इसमें झलकती है हमारी परंपराओं की खूबसूरती। हर मौसम, हर अवसर के लिए एक अलग साड़ी, यही तो है इसकी खासियत। #साड़ीलव #भारतीयसंस्कृति",
        "💫 छह गज का यह साड़ी का परिधान, बनाए हर नारी को महारानी समान। सादगी में भी दिखे शान, और शगुन के अवसर पर बने पहचान। #साड़ीस्टाइल #परंपरागत"
      ]
      
      setGeneratedCaptions(dummyCaptions)
      toast.success("साड़ी कैप्शन सफलतापूर्वक तैयार किए गए!")
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
              <h1 className="text-4xl font-bold gradient-text">साड़ी कैप्शन जनरेटर</h1>
              <p className="text-xl text-muted-foreground">
                साड़ी पोस्ट के लिए आकर्षक कैप्शन बनाएं
              </p>
            </div>

            <ToolsToggle />

            <SareeCaptionForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>30 दिन का फ्री ट्रायल</span>
              </div>
            )}

            {generatedCaptions.length > 0 && (
              <CaptionList 
                captions={generatedCaptions}
                onCopy={handleCopy}
                onSave={handleSave}
              />
            )}

            <CaptionSuggestions onCopy={handleCopy} />

            <SareeFeatureCards />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}