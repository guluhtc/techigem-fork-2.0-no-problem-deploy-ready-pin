"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface SareeCaptionFormProps {
  onGenerate: (prompt: string, options: any) => Promise<void>
  isGenerating: boolean
}

export function SareeCaptionForm({ onGenerate, isGenerating }: SareeCaptionFormProps) {
  const [prompt, setPrompt] = useState("")
  const [options, setOptions] = useState({
    style: "modern",
    tone: "professional",
    length: "medium"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onGenerate(prompt, options)
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt">साड़ी का विवरण</Label>
          <Textarea
            id="prompt"
            placeholder="अपनी साड़ी का विवरण यहाँ लिखें (जैसे: रंग, डिज़ाइन, अवसर)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-32"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="style">स्टाइल</Label>
            <select
              id="style"
              className="w-full p-2 border rounded-md"
              value={options.style}
              onChange={(e) => setOptions({ ...options, style: e.target.value })}
            >
              <option value="modern">आधुनिक</option>
              <option value="traditional">पारंपरिक</option>
              <option value="fusion">फ्यूजन</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">टोन</Label>
            <select
              id="tone"
              className="w-full p-2 border rounded-md"
              value={options.tone}
              onChange={(e) => setOptions({ ...options, tone: e.target.value })}
            >
              <option value="professional">प्रोफेशनल</option>
              <option value="casual">कैजुअल</option>
              <option value="elegant">एलिगेंट</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">लंबाई</Label>
            <select
              id="length"
              className="w-full p-2 border rounded-md"
              value={options.length}
              onChange={(e) => setOptions({ ...options, length: e.target.value })}
            >
              <option value="short">छोटा</option>
              <option value="medium">मध्यम</option>
              <option value="long">लंबा</option>
            </select>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? "कैप्शन तैयार किए जा रहे हैं..." : "कैप्शन तैयार करें"}
        </Button>
      </form>
    </Card>
  )
}