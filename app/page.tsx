"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { TrialSection } from "@/components/trial-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { FooterSection } from "@/components/footer-section"
import { FloatingTrialBar } from "@/components/floating-trial-bar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-4 md:px-6 overflow-hidden">
        <HeroSection />
        <FeatureCards />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <TrialSection />
      </main>
      <FooterSection />
      <FloatingTrialBar />
    </div>
  )
}