"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Users, Target, Shield, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-16"
        >
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">About Techigem</h1>
            <p className="text-xl text-muted-foreground">
              Empowering Indian creators and businesses to excel on Instagram
            </p>
          </div>

          {/* Founder Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Founder</h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Shyam Sunder Goyal</h3>
              <p className="text-lg text-muted-foreground">
                A visionary entrepreneur and tech enthusiast, Shyam founded Techigem with the mission to revolutionize 
                how Indian businesses and creators manage their social media presence. With extensive experience in 
                digital marketing and software development, he leads the company&apos;s innovation in AI-powered social 
                media management solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-primary/10 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-primary">Founder & CEO</span>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-primary">Tech Visionary</span>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-primary">Digital Marketing Expert</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At Techigem, we&apos;re on a mission to revolutionize how Indian creators and businesses manage their Instagram presence. 
              We believe in making professional social media management accessible to everyone, regardless of their technical expertise.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Community First</h3>
              </div>
              <p className="text-muted-foreground">
                We prioritize our users&apos; success and build features based on community feedback.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Innovation Driven</h3>
              </div>
              <p className="text-muted-foreground">
                We continuously innovate to provide cutting-edge social media management tools.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Trust & Security</h3>
              </div>
              <p className="text-muted-foreground">
                Your data security and privacy are our top priorities.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Quality Service</h3>
              </div>
              <p className="text-muted-foreground">
                We&apos;re committed to providing exceptional support and reliable service.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Based in Bikaner, Rajasthan, our team of passionate professionals is dedicated to helping Indian businesses thrive in the digital age. 
              We combine local insights with global best practices to deliver a platform that truly understands the needs of Indian creators.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                We&apos;d love to hear from you! Reach out to us at:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>Email: techigemtech@gmail.com</li>
                <li>Address: Techigem, Near Yadgar Hair Salon, Tilak Nagar, Bikaner 334001</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      <FooterSection />
    </div>
  )
}