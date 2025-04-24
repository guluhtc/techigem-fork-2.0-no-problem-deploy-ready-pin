"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Target, Hash } from "lucide-react"

export function HindiFeatureCards() {
  const features = [
    {
      icon: TrendingUp,
      title: "ट्रेंडिंग एनालिटिक्स",
      description: "हैशटैग परफॉरमेंस और एंगेजमेंट रेट का रीयल-टाइम डेटा"
    },
    {
      icon: Target,
      title: "स्मार्ट टारगेटिंग",
      description: "आपकी नीश और ऑडियंस के आधार पर AI-पावर्ड सुझाव"
    },
    {
      icon: Hash,
      title: "ऑप्टिमाइज्ड सेट्स",
      description: "ट्रेंडिंग और नीश-स्पेसिफिक हैशटैग का परफेक्ट कॉम्बिनेशन"
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