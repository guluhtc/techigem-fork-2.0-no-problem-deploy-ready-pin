"use client"

import { motion } from "framer-motion"
import { SignUpForm } from "@/components/signup-form"

export function CTASection() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold">Ready to Create Better Content?</h2>
      <p className="text-lg text-muted-foreground">
        Join thousands of creators using Techigem&apos;s AI-powered content generators.
      </p>
      <SignUpForm />
    </div>
  )
}