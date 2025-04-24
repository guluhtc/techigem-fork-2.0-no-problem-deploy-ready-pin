"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { HindiToolsToggle } from "@/components/instagram/hindi/tools-toggle"
import { HindiBioForm } from "@/components/bios/hindi/bio-form"
import { BioList } from "@/components/bios/bio-list"
import { HindiFeatureCards } from "@/components/bios/hindi/feature-cards"
import { generateBio } from "@/lib/openai"

interface BioOptions {
  style: string
  tone: string
  includeEmojis: boolean
  includeWebsite: boolean
  length: number
}

export default function HindiBiosPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBios, setGeneratedBios] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)
  const [savedBios, setSavedBios] = useState<string[]>([])

  const handleGenerate = async (topic: string, category: string, options: BioOptions) => {
    if (!topic) {
      toast.error("कृपया विषय दर्ज करें")
      return
    }

    if (!category) {
      toast.error("कृपया श्रेणी चुनें")
      return
    }

    setIsGenerating(true)
    try {
      const bio = await generateBio(topic, category, { ...options, language: 'hi' })
      setGeneratedBios([bio, ...generatedBios])
      toast.success("बायो सफलतापूर्वक तैयार किया गया!")
    } catch (error) {
      console.error('Error:', error)
      toast.error("बायो जनरेट करने में विफल")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("बायो क्लिपबोर्ड पर कॉपी किया गया!")
  }

  const handleSave = (bio: string) => {
    setSavedBios(prev => [...prev, bio])
    toast.success("बायो लाइब्रेरी में सहेजा गया!")
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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">हिंदी बायो जनरेटर</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                AI की मदद से प्रोफेशनल इंस्टाग्राम बायो बनाएं
              </p>
            </div>

            <HindiToolsToggle />

            <HindiBioForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>30 दिन का फ्री ट्रायल</span>
              </div>
            )}

            <BioList 
              bios={generatedBios}
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