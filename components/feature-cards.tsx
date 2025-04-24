"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { 
  Brain, Instagram, Calendar, Zap, Target, BarChart2, 
  Hash, Users, Bell, Sparkles, MessageCircle, TrendingUp 
} from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered scheduling to post when your audience is most active",
    gradient: "from-[#FF6B6B] to-[#FF8E8E]",
    bgGradient: "from-[#FF6B6B]/10 to-[#FF8E8E]/10"
  },
  {
    icon: Brain,
    title: "Content AI",
    description: "Generate engaging captions and hashtag suggestions",
    gradient: "from-[#4E54C8] to-[#8F94FB]",
    bgGradient: "from-[#4E54C8]/10 to-[#8F94FB]/10"
  },
  {
    icon: Instagram,
    title: "Analytics",
    description: "Track performance and get AI-powered insights",
    gradient: "from-[#11998E] to-[#38EF7D]",
    bgGradient: "from-[#11998E]/10 to-[#38EF7D]/10"
  },
  {
    icon: Hash,
    title: "Hashtag Analytics",
    description: "Discover trending hashtags and optimize your reach",
    gradient: "from-[#F857A6] to-[#FF5858]",
    bgGradient: "from-[#F857A6]/10 to-[#FF5858]/10"
  },
  {
    icon: MessageCircle,
    title: "Auto Responses",
    description: "AI-powered automated responses to common messages",
    gradient: "from-[#5B86E5] to-[#36D1DC]",
    bgGradient: "from-[#5B86E5]/10 to-[#36D1DC]/10"
  },
  {
    icon: Users,
    title: "Audience Insights",
    description: "Deep analytics about your followers and engagement",
    gradient: "from-[#FF8008] to-[#FFC837]",
    bgGradient: "from-[#FF8008]/10 to-[#FFC837]/10"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get notified about important engagement opportunities",
    gradient: "from-[#7F00FF] to-[#E100FF]",
    bgGradient: "from-[#7F00FF]/10 to-[#E100FF]/10"
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description: "Monitor your account's growth with detailed metrics",
    gradient: "from-[#0BA360] to-[#3CBA92]",
    bgGradient: "from-[#0BA360]/10 to-[#3CBA92]/10"
  },
  {
    icon: Sparkles,
    title: "Content Inspiration",
    description: "AI-generated content ideas based on trends",
    gradient: "from-[#8E2DE2] to-[#4A00E0]",
    bgGradient: "from-[#8E2DE2]/10 to-[#4A00E0]/10"
  }
]

export function FeatureCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-24"
    >
      <div className="text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border shadow-sm mb-4"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Powerful Features for Growth</span>
        </motion.div>
        <h2 className="text-4xl font-bold gradient-text">Everything You Need</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Comprehensive tools powered by advanced AI to help you create, manage, and grow your Instagram presence.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 h-full space-y-4 overflow-hidden relative group hover:shadow-xl transition-all duration-300 glass-card">
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-full`} />
                <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-semibold pt-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `linear-gradient(to right, var(--gradient-from), var(--gradient-to))` }}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}