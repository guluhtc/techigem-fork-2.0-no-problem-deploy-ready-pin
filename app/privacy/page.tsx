"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-gray max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <section className="mb-8">
            <h2>1. Information We Collect</h2>
            <p>When you use Techigem, we collect the following types of information:</p>
            <ul>
              <li>Instagram account information and access tokens</li>
              <li>Content you create and schedule through our platform</li>
              <li>Usage data and analytics</li>
              <li>Information you provide in your account profile</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Schedule and publish content to Instagram</li>
              <li>Analyze and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. Data Storage and Security</h2>
            <p>Your data is stored securely using industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information.</p>
          </section>

          <section className="mb-8">
            <h2>4. Instagram API Usage</h2>
            <p>Our use of Instagram{"'"}s API services complies with:</p>
            <ul>
              <li>Instagram{"'"}s Platform Policy</li>
              <li>Meta{"'"}s Terms of Service</li>
              <li>Applicable data protection laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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