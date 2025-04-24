"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the AI-powered scheduling work?",
    answer: "Our AI analyzes your audience's behavior patterns, engagement rates, and optimal posting times to automatically suggest the best times to post your content. It continuously learns and adapts to maximize your reach and engagement."
  },
  {
    question: "Can I schedule posts for multiple Instagram accounts?",
    answer: "Yes! Depending on your plan, you can manage multiple Instagram accounts from a single dashboard. The Professional plan supports up to 5 accounts, while the Enterprise plan offers unlimited account management."
  },
  {
    question: "What happens after my free trial ends?",
    answer: "After your 30-day free trial, you'll be prompted to choose a plan that best suits your needs. Don't worry - we'll send you a reminder before your trial expires, and you can cancel anytime. No credit card is required to start your trial."
  },
  {
    question: "How accurate are the AI-generated captions?",
    answer: "Our AI caption generator is trained on millions of successful Instagram posts and is continuously updated. It considers your brand voice, industry trends, and engagement patterns to suggest relevant, engaging captions that resonate with your audience."
  },
  {
    question: "Do you offer custom solutions for agencies?",
    answer: "Yes! Our Enterprise plan is specifically designed for agencies and large teams. It includes features like team collaboration, custom AI training, API access, and a dedicated account manager to help you scale your Instagram management."
  }
]

export function FaqSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-24"
    >
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-bold gradient-text">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to know about Techigem and our services.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`} className="glass-card">
                <AccordionTrigger className="text-left px-6">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </motion.div>
  )
}