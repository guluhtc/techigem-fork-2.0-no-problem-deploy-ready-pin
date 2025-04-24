"use client"

import { Card } from "@/components/ui/card"
import { Target, TrendingUp, Hash } from "lucide-react"

export function HindiFeatureCards() {
  const features = [
    {
      icon: Target,
      title: "टारगेटेड कंटेंट",
      description: "आपकी विशेष नीश के लिए कस्टम बायो"
    },
    {
      icon: TrendingUp,
      title: "ट्रेंडिंग स्टाइल",
      description: "मॉडर्न और आकर्षक फॉर्मेट"
    },
    {
      icon: Hash,
      title: "SEO ऑप्टिमाइज्ड",
      description: "बेहतर विजिबिलिटी और रीच"
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-full blur-xl" />
            <feature.icon className="relative h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  )
}