"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Target, Hash, BarChart2, Globe, Shield } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Trending Analytics",
    description: "Real-time data on hashtag performance and engagement rates",
    gradient: "from-[#FF6B6B] to-[#FF8E8E]"
  },
  {
    icon: Target,
    title: "Smart Targeting",
    description: "AI-powered suggestions based on your niche and audience",
    gradient: "from-[#4E54C8] to-[#8F94FB]"
  },
  {
    icon: Hash,
    title: "Optimized Sets",
    description: "Perfect combinations of trending and niche-specific hashtags",
    gradient: "from-[#11998E] to-[#38EF7D]"
  },
  {
    icon: BarChart2,
    title: "Performance Tracking",
    description: "Monitor hashtag effectiveness and reach over time",
    gradient: "from-[#F857A6] to-[#FF5858]"
  },
  {
    icon: Globe,
    title: "Location Intelligence",
    description: "Geo-targeted hashtags for better local reach",
    gradient: "from-[#5B86E5] to-[#36D1DC]"
  },
  {
    icon: Shield,
    title: "Safe & Compliant",
    description: "Avoid banned and flagged hashtags automatically",
    gradient: "from-[#FF8008] to-[#FFC837]"
  }
]

export function FeatureCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 space-y-4 overflow-hidden relative group hover:shadow-lg transition-all duration-300">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
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