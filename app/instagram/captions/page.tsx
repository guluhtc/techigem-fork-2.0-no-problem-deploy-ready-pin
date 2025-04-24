"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { CaptionForm } from "@/components/captions/caption-form"
import { CaptionList } from "@/components/captions/caption-list"
import { FeatureCards } from "@/components/captions/feature-cards"
import { generateCaption } from "@/lib/openai"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function CaptionsGeneratorPage({ searchParams }: Props) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)
  const [savedCaptions, setSavedCaptions] = useState<string[]>([])

  const handleGenerate = async (prompt: string, options: any) => {
    if (!prompt) {
      toast.error("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    try {
      const caption = await generateCaption(prompt, options)
      setGeneratedCaptions([caption, ...generatedCaptions])
      toast.success("Caption generated successfully!")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to generate caption")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Caption copied to clipboard!")
  }

  const handleSave = (caption: string) => {
    setSavedCaptions(prev => [...prev, caption])
    toast.success("Caption saved to library!")
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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">AI Caption Generator</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Create engaging Instagram captions in seconds with AI
              </p>
            </div>

            <ToolsToggle />

            <CaptionForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>Premium features free for 30 days</span>
              </div>
            )}

            <CaptionList 
              captions={generatedCaptions}
              onCopy={handleCopy}
              onSave={handleSave}
            />

            <FeatureCards />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}