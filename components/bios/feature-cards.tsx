"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Hash, Target } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Targeted Content",
    description: "Bios tailored to your specific niche"
  },
  {
    icon: TrendingUp,
    title: "Trending Style",
    description: "Modern and engaging formats"
  },
  {
    icon: Hash,
    title: "SEO Optimized",
    description: "Increased visibility and reach"
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