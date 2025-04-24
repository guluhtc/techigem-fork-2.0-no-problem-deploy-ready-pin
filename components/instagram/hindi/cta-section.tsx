"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl"
    >
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          अपनी इंस्टाग्राम यात्रा को आज ही शुरू करें
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          हमारे एडवांस्ड टूल्स के साथ अपनी इंस्टाग्राम प्रेजेंस को बढ़ाएं और अपनी ऑडियंस से बेहतर कनेक्ट करें।
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full"
        >
          निःशुल्क शुरू करें
        </Button>
      </div>
    </motion.section>
  )
}