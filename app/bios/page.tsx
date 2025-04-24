"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { BioForm } from "@/components/bios/bio-form"
import { BioList } from "@/components/bios/bio-list"
import { FeatureCards } from "@/components/bios/feature-cards"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function BiosGeneratorPage({ searchParams }: Props) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBios, setGeneratedBios] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)

  const handleGenerate = async (topic: string, category: string) => {
    if (!topic) {
      toast.error("Please select your topic")
      return
    }

    setIsGenerating(true)
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const dummyBios = [
        "🚀 Digital Marketing Specialist | Helping brands grow online\n📈 5+ years experience\n💡 Tips & Strategies\n🔗 Link in bio",
        "📱 Social Media Expert | Content Creator\n✨ Sharing growth secrets\n🎯 DM for collaborations\n📍 Mumbai, India",
        "💼 Business Coach & Mentor\n🌟 Helping entrepreneurs scale\n📊 Marketing strategies that work\n📩 Contact: email@example.com"
      ]
      
      setGeneratedBios(dummyBios)
      toast.success("Bios generated successfully!")
    } catch (error) {
      toast.error("Failed to generate bios")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Bio copied to clipboard!")
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
              <h1 className="text-4xl font-bold gradient-text">AI Bio Generator</h1>
              <p className="text-xl text-muted-foreground">
                Create a professional Instagram bio that stands out
              </p>
            </div>

            <ToolsToggle />

            <BioForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>Premium features free for 30 days</span>
              </div>
            )}

            <BioList 
              bios={generatedBios}
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