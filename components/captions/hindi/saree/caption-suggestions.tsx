"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy } from "lucide-react"

interface CaptionSuggestionsProps {
  onCopy: (text: string) => void
}

export function CaptionSuggestions({ onCopy }: CaptionSuggestionsProps) {
  const suggestions = [
    {
      category: "पारंपरिक",
      captions: [
        "👗 साड़ी में सजी हर नारी, लगे राजकुमारी। परंपरा की यह पहचान, भारतीय संस्कृति का अभिमान। #TraditionalWear #SareeStyle",
        "✨ साड़ी है इंडियन वुमन की शान, इसमें झलकती है भारतीय परंपरा की पहचान। #SareeSwag #IndianCulture"
      ]
    },
    {
      category: "आधुनिक",
      captions: [
        "💫 क्लासिक साड़ी को मॉडर्न टच के साथ, स्टाइल का परफेक्ट मैच। #ModernSaree #FusionFashion",
        "🌟 साड़ी में स्वैग, लुक में स्टाइल, मॉडर्न टच के साथ परफेक्ट प्रोफाइल। #SareeNotSorry #ContemporarySaree"
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">लोकप्रिय कैप्शन सुझाव</h2>
      
      {suggestions.map((category) => (
        <Card key={category.category} className="p-6">
          <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
          <div className="space-y-4">
            {category.captions.map((caption, index) => (
              <div key={index} className="flex items-start justify-between gap-4 p-4 bg-muted rounded-lg">
                <p className="text-sm">{caption}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onCopy(caption)}
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}