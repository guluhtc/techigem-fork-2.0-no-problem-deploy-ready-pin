"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Brain, Sparkles, Hash } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "स्मार्ट एनालिसिस",
    description: "AI ट्रेंडिंग कंटेंट और एंगेजमेंट पैटर्न का विश्लेषण करता है"
  },
  {
    icon: Sparkles,
    title: "यूनीक कंटेंट",
    description: "हर बार नया और आकर्षक कंटेंट जनरेट करें"
  },
  {
    icon: Hash,
    title: "ट्रेंडिंग हैशटैग",
    description: "लेटेस्ट हैशटैग सजेशंस के साथ रहें रिलेवेंट"
  }
]

export function FeaturesSection() {
  return (
    <div className="text-center space-y-8">
      <h2 className="text-3xl font-bold">एडवांस्ड AI से पावर्ड</h2>
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