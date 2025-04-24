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

export function HindiBioForm({ onGenerate, isGenerating }: BioFormProps) {
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
            <label className="text-sm font-medium">विषय/विशेषज्ञता</label>
            <Input
              placeholder="आपका मुख्य फोकस क्या है? (जैसे: डिजिटल मार्केटिंग)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">श्रेणी</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="श्रेणी चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">बिजनेस और उद्यमिता</SelectItem>
                <SelectItem value="creator">कंटेंट क्रिएटर</SelectItem>
                <SelectItem value="influencer">इन्फ्लुएंसर</SelectItem>
                <SelectItem value="personal">पर्सनल ब्रांड</SelectItem>
                <SelectItem value="professional">प्रोफेशनल</SelectItem>
                <SelectItem value="lifestyle">लाइफस्टाइल</SelectItem>
                <SelectItem value="fashion">फैशन और ब्यूटी</SelectItem>
                <SelectItem value="health">हेल्थ और वेलनेस</SelectItem>
                <SelectItem value="tech">टेक्नोलॉजी</SelectItem>
                <SelectItem value="food">फूड और कुकिंग</SelectItem>
                <SelectItem value="travel">ट्रैवल</SelectItem>
                <SelectItem value="art">आर्ट और डिज़ाइन</SelectItem>
                <SelectItem value="education">एजुकेशन</SelectItem>
                <SelectItem value="nonprofit">नॉन-प्रॉफिट</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">बायो स्टाइल</label>
            <Sliders className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">स्टाइल</label>
              <Select 
                value={options.style} 
                onValueChange={(value) => setOptions(prev => ({ ...prev, style: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="स्टाइल चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">प्रोफेशनल और क्लीन</SelectItem>
                  <SelectItem value="creative">क्रिएटिव और आर्टिस्टिक</SelectItem>
                  <SelectItem value="minimalist">मिनिमलिस्ट</SelectItem>
                  <SelectItem value="bold">बोल्ड और प्रभावशाली</SelectItem>
                  <SelectItem value="storytelling">स्टोरीटेलिंग</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                  <SelectItem value="friendly">फ्रेंडली और अप्रोचेबल</SelectItem>
                  <SelectItem value="professional">प्रोफेशनल और फॉर्मल</SelectItem>
                  <SelectItem value="casual">कैजुअल और रिलैक्स्ड</SelectItem>
                  <SelectItem value="enthusiastic">एंथुसिएस्टिक और एनर्जेटिक</SelectItem>
                  <SelectItem value="authoritative">अथॉरिटेटिव और एक्सपर्ट</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">बायो की लंबाई</label>
                <span className="text-sm text-muted-foreground">{options.length} अक्षर</span>
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
                इमोजी शामिल करें
              </Button>
              <Button
                type="button"
                variant={options.includeWebsite ? "default" : "outline"}
                onClick={() => setOptions(prev => ({ ...prev, includeWebsite: !prev.includeWebsite }))}
                className="flex-1"
              >
                वेबसाइट लिंक
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
            बायो तैयार हो रहा है...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            बायो तैयार करें
          </>
        )}
      </Button>
    </Card>
  )
}