"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { HeroSection } from "@/components/instagram/hindi/hero-section"
import { HindiToolsToggle } from "@/components/instagram/hindi/tools-toggle"
import { GeneratorCards } from "@/components/instagram/hindi/generator-cards"
import { FeaturesSection } from "@/components/instagram/hindi/features-section"
import { CTASection } from "@/components/instagram/hindi/cta-section"

export default function HindiInstagramPage() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-16"
          >
            <HeroSection />
            <HindiToolsToggle />
            <GeneratorCards />
            <FeaturesSection />
            <CTASection />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}