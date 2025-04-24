"use client"

import { Card } from "@/components/ui/card"
import { Sparkles, Clock, Palette, Share2 } from "lucide-react"

export function SareeFeatureCards() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI पावर्ड कैप्शन",
      description: "आर्टिफिशियल इंटेलिजेंस द्वारा तैयार किए गए यूनीक और आकर्षक कैप्शन"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "तुरंत जनरेशन",
      description: "सेकंड्स में कई विकल्पों के साथ कैप्शन तैयार"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "कस्टमाइज़ेशन",
      description: "अपनी पसंद के अनुसार स्टाइल और टोन को कस्टमाइज़ करें"
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "आसान शेयरिंग",
      description: "एक क्लिक में कैप्शन को कॉपी और शेयर करें"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}