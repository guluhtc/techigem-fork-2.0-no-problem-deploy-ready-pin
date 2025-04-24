"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Wand2, RefreshCw, Sliders } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface BioFormProps {
  onGenerate: (topic: string, category: string, options: BioOptions) => Promise<void>
  isGenerating: boolean
}

interface BioOptions {
  style: string
  tone: string
  includeEmojis: boolean
  includeWebsite: boolean
  length: number
}

export function BioForm({ onGenerate, isGenerating }: BioFormProps) {
  const [topic, setTopic] = useState("")
  const [category, setCategory] = useState("")
  const [options, setOptions] = useState<BioOptions>({
    style: "professional",
    tone: "friendly",
    includeEmojis: true,
    includeWebsite: true,
    length: 150
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(topic, category, options)
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Topic/Expertise</label>
            <Input
              placeholder="What's your main focus? (e.g., Digital Marketing)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business & Entrepreneurship</SelectItem>
                <SelectItem value="creator">Content Creator</SelectItem>
                <SelectItem value="influencer">Influencer</SelectItem>
                <SelectItem value="personal">Personal Brand</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="fashion">Fashion & Beauty</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="food">Food & Cooking</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="art">Art & Design</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="nonprofit">Non-Profit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Bio Style</label>
            <Sliders className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Style</label>
              <Select 
                value={options.style} 
                onValueChange={(value) => setOptions(prev => ({ ...prev, style: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional & Clean</SelectItem>
                  <SelectItem value="creative">Creative & Artistic</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="bold">Bold & Impactful</SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tone</label>
              <Select 
                value={options.tone} 
                onValueChange={(value) => setOptions(prev => ({ ...prev, tone: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                  <SelectItem value="professional">Professional & Formal</SelectItem>
                  <SelectItem value="casual">Casual & Relaxed</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic & Energetic</SelectItem>
                  <SelectItem value="authoritative">Authoritative & Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Bio Length</label>
                <span className="text-sm text-muted-foreground">{options.length} characters</span>
              </div>
              <Slider
                value={[options.length]}
                onValueChange={(value) => setOptions(prev => ({ ...prev, length: value[0] }))}
                max={150}
                min={50}
                step={10}
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant={options.includeEmojis ? "default" : "outline"}
                onClick={() => setOptions(prev => ({ ...prev, includeEmojis: !prev.includeEmojis }))}
                className="flex-1"
              >
                Include Emojis
              </Button>
              <Button
                type="button"
                variant={options.includeWebsite ? "default" : "outline"}
                onClick={() => setOptions(prev => ({ ...prev, includeWebsite: !prev.includeWebsite }))}
                className="flex-1"
              >
                Website Link
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleSubmit}
        disabled={isGenerating || !topic || !category}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Bio
          </>
        )}
      </Button>
    </Card>
  )
}