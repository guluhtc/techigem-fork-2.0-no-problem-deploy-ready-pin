"use client"

import { Card } from "@/components/ui/card"
import { Languages, Brain, Palette } from "lucide-react"

const features = [
  {
    icon: Languages,
    title: "15+ Languages",
    description: "Generate captions in multiple Indian languages"
  },
  {
    icon: Brain,
    title: "Smart AI",
    description: "Advanced AI trained on viral Instagram content"
  },
  {
    icon: Palette,
    title: "Custom Styles",
    description: "Personalize captions with emojis, hashtags, and more"
  }
]

export function FeatureCards() {
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