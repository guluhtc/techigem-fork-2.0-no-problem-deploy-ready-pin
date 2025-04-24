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

interface HashtagFormProps {
  onGenerate: (topic: string, options: HashtagOptions) => Promise<void>
  isGenerating: boolean
}

interface HashtagOptions {
  category: string
  count: number
  popularity: string
  includeEmojis: boolean
  includeLocation: boolean
}

export function HindiHashtagForm({ onGenerate, isGenerating }: HashtagFormProps) {
  const [topic, setTopic] = useState("")
  const [options, setOptions] = useState<HashtagOptions>({
    category: "",
    count: 30,
    popularity: "mixed",
    includeEmojis: true,
    includeLocation: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(topic, options)
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">विषय/कीवर्ड्स</label>
            <Input
              placeholder="अपना मुख्य विषय या कीवर्ड्स दर्ज करें"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">श्रेणी</label>
            <Select 
              value={options.category} 
              onValueChange={(value) => setOptions(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="श्रेणी चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">बिजनेस</SelectItem>
                <SelectItem value="lifestyle">लाइफस्टाइल</SelectItem>
                <SelectItem value="fashion">फैशन</SelectItem>
                <SelectItem value="technology">टेक्नोलॉजी</SelectItem>
                <SelectItem value="food">फूड</SelectItem>
                <SelectItem value="travel">ट्रैवल</SelectItem>
                <SelectItem value="fitness">फिटनेस</SelectItem>
                <SelectItem value="education">एजुकेशन</SelectItem>
                <SelectItem value="entertainment">एंटरटेनमेंट</SelectItem>
                <SelectItem value="art">आर्ट और क्राफ्ट</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">एडवांस्ड ऑप्शंस</label>
            <Sliders className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">हैशटैग की संख्या</label>
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
              <label className="text-sm font-medium">लोकप्रियता स्तर</label>
              <Select 
                value={options.popularity} 
                onValueChange={(value) => setOptions(prev => ({ ...prev, popularity: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="लोकप्रियता स्तर चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">अधिक लोकप्रिय</SelectItem>
                  <SelectItem value="mixed">मिश्रित</SelectItem>
                  <SelectItem value="niche">निश स्पेसिफिक</SelectItem>
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
                इमोजी शामिल करें
              </Button>
              <Button
                type="button"
                variant={options.includeLocation ? "default" : "outline"}
                onClick={() => setOptions(prev => ({ ...prev, includeLocation: !prev.includeLocation }))}
                className="flex-1"
              >
                लोकेशन टैग्स
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleSubmit}
        disabled={isGenerating || !topic || !options.category}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            हैशटैग तैयार किए जा रहे हैं...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            हैशटैग तैयार करें
          </>
        )}
      </Button>
    </Card>
  )
}