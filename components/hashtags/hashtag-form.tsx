"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Wand2, RefreshCw, Hash, Sliders } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface HashtagFormProps {
  onGenerate: (topic: string, category: string, options: HashtagOptions) => Promise<void>
  isGenerating: boolean
}

interface HashtagOptions {
  count: number
  popularity: string
  includeEmojis: boolean
  includeLocation: boolean
}

export function HashtagForm({ onGenerate, isGenerating }: HashtagFormProps) {
  const [topic, setTopic] = useState("")
  const [category, setCategory] = useState("")
  const [options, setOptions] = useState<HashtagOptions>({
    count: 30,
    popularity: "mixed",
    includeEmojis: true,
    includeLocation: true
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
            <label className="text-sm font-medium">Topic/Keywords</label>
            <div className="relative">
              <Input
                placeholder="Enter your main topic or keywords"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="pl-10"
              />
              <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="art">Art & Photography</SelectItem>
                <SelectItem value="music">Music & Entertainment</SelectItem>
                <SelectItem value="sports">Sports & Athletics</SelectItem>
                <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                <SelectItem value="finance">Finance & Investment</SelectItem>
                <SelectItem value="gaming">Gaming & Esports</SelectItem>
                <SelectItem value="wellness">Health & Wellness</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Advanced Options</label>
            <Sliders className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Number of Hashtags</label>
                <span className="text-sm text-muted-foreground">{options.count}</span>
              </div>
              <Slider
                value={[options.count]}
                onValueChange={(value) => setOptions(prev => ({ ...prev, count: value[0] }))}
                max={30}
                min={5}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Popularity Level</label>
              <Select 
                value={options.popularity} 
                onValueChange={(value) => setOptions(prev => ({ ...prev, popularity: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select popularity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (most popular)</SelectItem>
                  <SelectItem value="mixed">Balanced Mix</SelectItem>
                  <SelectItem value="niche">Niche Specific</SelectItem>
                </SelectContent>
              </Select>
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
                variant={options.includeLocation ? "default" : "outline"}
                onClick={() => setOptions(prev => ({ ...prev, includeLocation: !prev.includeLocation }))}
                className="flex-1"
              >
                Location Tags
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
            Generate Hashtags
          </>
        )}
      </Button>
    </Card>
  )
}