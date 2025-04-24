"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Brain, Sparkles, Hash } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Smart Analysis",
    description: "AI analyzes trending content and engagement patterns"
  },
  {
    icon: Sparkles,
    title: "Unique Content",
    description: "Generate original and engaging content every time"
  },
  {
    icon: Hash,
    title: "Trending Hashtags",
    description: "Stay relevant with up-to-date hashtag suggestions"
  }
]

export function FeaturesSection() {
  return (
    <div className="text-center space-y-8">
      <h2 className="text-3xl font-bold">Powered by Advanced AI</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <feature.icon className="h-8 w-8 mx-auto text-primary" />
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}