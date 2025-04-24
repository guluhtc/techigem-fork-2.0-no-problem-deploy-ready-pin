"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { FeatureCards } from "@/components/feature-cards"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-16"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Our Features</h1>
            <p className="text-xl text-muted-foreground">
              Discover all the powerful tools and features that make Techigem the best choice for Instagram management
            </p>
          </div>
        </motion.div>
        <FeatureCards />
      </div>
      <FooterSection />
    </div>
  )
}