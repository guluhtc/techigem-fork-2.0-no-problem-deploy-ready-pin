"use client"

import { motion } from "framer-motion"
import { Instagram, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/signup-form"

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-5"
      >
        <Instagram className="w-full h-full text-white" />
      </motion.div>
      <h1 className="text-4xl font-bold gradient-text">Instagram Content Generators</h1>
      <p className="text-xl text-muted-foreground">
        AI-powered tools to create engaging captions, professional bios, and trending hashtags
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <SignUpForm />
        <Button 
          variant="outline" 
          size="lg"
          className="rounded-full"
        >
          Learn More
          <PlayCircle className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}