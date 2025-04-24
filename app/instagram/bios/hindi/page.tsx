"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { HindiBioForm } from "@/components/bios/hindi/bio-form"
import { BioList } from "@/components/bios/bio-list"
import { HindiFeatureCards } from "@/components/bios/hindi/feature-cards"

export default function HindiBiosPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBios, setGeneratedBios] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)

  const handleGenerate = async (topic: string, category: string) => {
    if (!topic) {
      toast.error("कृपया एक विषय चुनें")
      return
    }

    setIsGenerating(true)
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const dummyBios = [
        "🚀 डिजिटल मार्केटिंग विशेषज्ञ | ब्रांड्स को ऑनलाइन बढ़ने में मदद\n📈 5+ वर्षों का अनुभव\n💡 टिप्स और रणनीतियां\n🔗 लिंक इन बायो",
        "📱 सोशल मीडिया एक्सपर्ट | कंटेंट क्रिएटर\n✨ ग्रोथ सीक्रेट्स शेयर करता/करती हूं\n🎯 कोलैब के लिए DM करें\n📍 मुंबई, भारत",
        "💼 बिजनेस कोच और मेंटर\n🌟 उद्यमियों को स्केल करने में मदद\n📊 मार्केटिंग स्ट्रैटेजी जो काम करती हैं\n📩 संपर्क: ईमेल@उदाहरण.कॉम"
      ]
      
      setGeneratedBios(dummyBios)
      toast.success("बायो सफलतापूर्वक तैयार किए गए!")
    } catch (error) {
      toast.error("बायो जनरेट करने में विफल")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("बायो क्लिपबोर्ड पर कॉपी किया गया!")
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
              <h1 className="text-4xl font-bold gradient-text">हिंदी बायो जनरेटर</h1>
              <p className="text-xl text-muted-foreground">
                AI की मदद से प्रोफेशनल इंस्टाग्राम बायो बनाएं
              </p>
            </div>

            <ToolsToggle />

            <HindiBioForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>30 दिन का फ्री ट्रायल</span>
              </div>
            )}

            <BioList 
              bios={generatedBios}
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