"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, MapPin } from "lucide-react"
import { SignUpForm } from "@/components/signup-form"

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individual creators and small businesses",
    features: [
      "Schedule up to 50 posts",
      "Basic analytics dashboard",
      "1 Instagram account",
      "Community support in Hindi & English",
      "Local time zone scheduling",
      "Basic hashtag suggestions"
    ]
  },
  {
    name: "Growth",
    price: "₹49",
    description: "Ideal for growing creators and businesses in India",
    features: [
      "Unlimited post scheduling",
      "Advanced analytics with local insights",
      "5 Instagram accounts",
      "AI caption generation in Hindi & English",
      "Priority email & chat support",
      "Custom posting schedule",
      "Trending hashtags for Indian market",
      "Regional audience insights"
    ],
    popular: true
  },
  {
    name: "Business",
    price: "₹199",
    description: "For agencies and established brands",
    features: [
      "Everything in Growth plan",
      "Unlimited Instagram accounts",
      "Team collaboration tools",
      "Custom AI training for Indian content",
      "API access for integration",
      "Dedicated account manager",
      "Multi-language support",
      "Priority feature requests"
    ]
  }
]

export function PricingSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-24"
      id="pricing"
    >
      <div className="text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border shadow-sm mb-4"
        >
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Proudly Made in India 🇮🇳</span>
        </motion.div>
        <h2 className="text-4xl font-bold gradient-text">Plans That Grow With You</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Affordable pricing designed specifically for Indian creators and businesses. All plans include GST.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-8 h-full space-y-6 relative group hover:shadow-xl transition-all duration-300 glass-card
              ${plan.popular ? 'gradient-border' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#FF9933] via-primary to-[#138808] text-white text-sm rounded-full">
                  Most Popular in India
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Free" && (
                    <>
                      <span className="text-muted-foreground">/month</span>
                      <span className="text-xs text-muted-foreground">(incl. GST)</span>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-r from-[#FF9933]/10 via-primary/10 to-[#138808]/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                {plan.popular ? (
                  <SignUpForm />
                ) : (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full hover:bg-gradient-to-r hover:from-[#FF9933] hover:via-primary hover:to-[#138808] hover:text-white transition-all duration-300"
                  >
                    Get Started
                  </Button>
                )}
              </div>

              {plan.price !== "Free" && (
                <p className="text-xs text-center text-muted-foreground mt-4">
                  *Special pricing for Indian market
                </p>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          Need a custom plan? <a href="#contact" className="text-primary hover:underline">Contact our India sales team</a>
        </p>
      </div>
    </motion.div>
  )
}