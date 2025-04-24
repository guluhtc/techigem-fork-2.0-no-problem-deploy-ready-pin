"use client"

import { Card } from "@/components/ui/card"
import { Sparkles, Clock, Hash, Heart } from "lucide-react"

export function HindiFeatureCards() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI पावर्ड कैप्शन",
      description: "आर्टिफिशियल इंटेलिजेंस की मदद से आकर्षक कैप्शन तैयार करें"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "तेज और आसान",
      description: "सेकंड्स में कई विकल्पों के साथ कैप्शन जनरेट करें"
    },
    {
      icon: <Hash className="h-6 w-6" />,
      title: "हैशटैग सपोर्ट",
      description: "स्वचालित रूप से प्रासंगिक हैशटैग के साथ कैप्शन"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "एंगेजमेंट बढ़ाएं",
      description: "अपनी पोस्ट की एंगेजमेंट को बढ़ाने के लिए आकर्षक कैप्शन"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="text-primary">
              {feature.icon}
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}