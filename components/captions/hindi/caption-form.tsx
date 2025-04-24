"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Smile, Hash, Target, Zap, Wand2, RefreshCw, Sliders } from "lucide-react"

interface CaptionFormProps {
  onGenerate: (prompt: string, options: CaptionOptions) => Promise<void>
  isGenerating: boolean
}

interface CaptionOptions {
  tone: string
  length: string
  includeEmojis: boolean
  includeHashtags: boolean
  includeMentions: boolean
  includeCallToAction: boolean
}

export function HindiCaptionForm({ onGenerate, isGenerating }: CaptionFormProps) {
  const [prompt, setPrompt] = useState("")
  const [options, setOptions] = useState<CaptionOptions>({
    tone: "casual",
    length: "medium",
    includeEmojis: true,
    includeHashtags: true,
    includeMentions: false,
    includeCallToAction: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(prompt, options)
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">पोस्ट का विवरण</label>
          <Textarea
            placeholder="अपनी पोस्ट का विवरण यहाँ लिखें..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-32"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">कैप्शन स्टाइल</label>
            <Sliders className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">टोन</label>
              <Select 
                value={options.tone} 
                onValueChange={(value) => setOptions(prev => ({ ...prev, tone: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="टोन चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">कैजुअल और फ्रेंडली</SelectItem>
                  <SelectItem value="professional">प्रोफेशनल</SelectItem>
                  <SelectItem value="funny">मजेदार</SelectItem>
                  <SelectItem value="inspirational">प्रेरणादायक</SelectItem>
                  <SelectItem value="informative">जानकारीपूर्ण</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">लंबाई</label>
              <Select 
                value={options.length} 
                onValueChange={(value) => setOptions(prev => ({ ...prev, length: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="लंबाई चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">छोटा (50-100 अक्षर)</SelectItem>
                  <SelectItem value="medium">मध्यम (100-200 अक्षर)</SelectItem>
                  <SelectItem value="long">लंबा (200-400 अक्षर)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant={options.includeEmojis ? "default" : "outline"}
              className="w-full"
              onClick={() => setOptions(prev => ({ ...prev, includeEmojis: !prev.includeEmojis }))}
            >
              <Smile className="mr-2 h-4 w-4" />
              इमोजी
            </Button>
            <Button
              variant={options.includeHashtags ? "default" : "outline"}
              className="w-full"
              onClick={() => setOptions(prev => ({ ...prev, includeHashtags: !prev.includeHashtags }))}
            >
              <Hash className="mr-2 h-4 w-4" />
              हैशटैग
            </Button>
            <Button
              variant={options.includeMentions ? "default" : "outline"}
              className="w-full"
              onClick={() => setOptions(prev => ({ ...prev, includeMentions: !prev.includeMentions }))}
            >
              <Target className="mr-2 h-4 w-4" />
              मेंशन्स
            </Button>
            <Button
              variant={options.includeCallToAction ? "default" : "outline"}
              className="w-full"
              onClick={() => setOptions(prev => ({ ...prev, includeCallToAction: !prev.includeCallToAction }))}
            >
              <Zap className="mr-2 h-4 w-4" />
              कॉल टू एक्शन
            </Button>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleSubmit}
        disabled={isGenerating || !prompt.trim()}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            कैप्शन तैयार किया जा रहा है...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            कैप्शन तैयार करें
          </>
        )}
      </Button>
    </Card>
  )
}