"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Loader2, Copy } from "lucide-react"
import { toast } from "sonner"
import { generateCaption } from "@/lib/openai"

export default function TestPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCaption, setGeneratedCaption] = useState("")

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    try {
      const caption = await generateCaption(prompt)
      setGeneratedCaption(caption)
      toast.success("Caption generated successfully!")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to generate caption")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCaption)
    toast.success("Caption copied to clipboard!")
  }

  return (
    <div className="container py-12">
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Test OpenAI Caption Generator</h1>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-32"
          />

          <Button
            onClick={handleGenerate}
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Caption"
            )}
          </Button>
        </div>

        {generatedCaption && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="whitespace-pre-wrap">{generatedCaption}</p>
            </div>
            
            <Button
              variant="outline"
              onClick={handleCopy}
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Caption
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}