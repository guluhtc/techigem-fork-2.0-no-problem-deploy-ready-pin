"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-gray max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

          <section className="mb-8">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using Techigem, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>

          <section className="mb-8">
            <h2>2. Instagram Integration</h2>
            <p>When using our Instagram integration features:</p>
            <ul>
              <li>You must comply with Instagram&apos;s Platform Policy</li>
              <li>You are responsible for maintaining the security of your Instagram credentials</li>
              <li>We may modify or discontinue Instagram-related features at any time</li>
              <li>You must not use our service to violate Instagram&apos;s terms of service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate account information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in any unauthorized or illegal activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>4. Content Guidelines</h2>
            <p>You are responsible for all content posted through our service. Content must not:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Contain harmful or malicious code</li>
              <li>Include inappropriate or offensive material</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>5. Service Availability</h2>
            <p>We strive to provide uninterrupted service but:</p>
            <ul>
              <li>May modify or discontinue features at any time</li>
              <li>Are not liable for any service interruptions</li>
              <li>May terminate accounts for violations of these terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>6. Limitation of Liability</h2>
            <p>Techigem is provided &quot;as is&quot; without warranties of any kind. We are not liable for:</p>
            <ul>
              <li>Service interruptions or failures</li>
              <li>Data loss or corruption</li>
              <li>Third-party actions or content</li>
              <li>Indirect or consequential damages</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>7. Changes to Terms</h2>
            <p>We may modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>
          </section>

          <section className="mb-8">
            <h2>8. Contact Information</h2>
            <p>For questions about these terms, contact us at:</p>
            <ul>
              <li>Email: techigemtech@gmail.com</li>
              <li>Address: Techigem, Near Yadgar Hair Salon, Tilak Nagar, Bikaner 334001</li>
            </ul>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
      </div>
      <FooterSection />
    </div>
  )
}