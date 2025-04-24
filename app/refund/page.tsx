"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-gray max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>

          <section className="mb-8">
            <h2>30-Day Money-Back Guarantee</h2>
            <p>
              We stand behind our service with a 30-day money-back guarantee. If you&apos;re not completely satisfied with your Techigem subscription, you can request a full refund within 30 days of your initial purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2>Eligibility for Refund</h2>
            <p>To be eligible for a refund:</p>
            <ul>
              <li>The refund request must be made within 30 days of the initial purchase</li>
              <li>The request must be submitted through our official support channels</li>
              <li>Your account must be in good standing</li>
              <li>You must provide a reason for the refund request</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Refund Process</h2>
            <p>To request a refund:</p>
            <ol>
              <li>Contact our support team at techigemtech@gmail.com</li>
              <li>Include your account email and reason for the refund</li>
              <li>Our team will process your request within 3-5 business days</li>
              <li>The refund will be credited to the original payment method within 3-5 business days</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2>Exceptions</h2>
            <p>The following situations are not eligible for refund:</p>
            <ul>
              <li>Requests made after the 30-day period</li>
              <li>Accounts that have violated our terms of service</li>
              <li>Special or promotional offers marked as non-refundable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Contact Us</h2>
            <p>If you have any questions about our refund policy, please contact us at:</p>
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