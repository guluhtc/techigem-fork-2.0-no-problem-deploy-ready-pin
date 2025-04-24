"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/signup-form"
import { useRouter } from "next/navigation"

export function DesktopNav() {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden md:flex items-center space-x-2"
    >
      <nav className="flex items-center space-x-1" aria-label="Main navigation">
        <Button 
          variant="ghost"
          className="text-sm font-medium px-4 py-2 rounded-full hover:bg-black/5 transition-colors"
          onClick={() => router.push('/instagram')}
          aria-label="Navigate to Instagram tools"
        >
          Instagram
        </Button>
        <Button 
          variant="ghost"
          className="text-sm font-medium px-4 py-2 rounded-full hover:bg-black/5 transition-colors"
          onClick={() => router.push('/features')}
          aria-label="Navigate to Features page"
        >
          Features
        </Button>
        <Button 
          variant="ghost"
          className="text-sm font-medium px-4 py-2 rounded-full hover:bg-black/5 transition-colors"
          onClick={() => router.push('/about')}
          aria-label="Navigate to About page"
        >
          About
        </Button>
        <Button 
          variant="ghost"
          className="text-sm font-medium px-4 py-2 rounded-full hover:bg-black/5 transition-colors"
          onClick={() => router.push('/contact')}
          aria-label="Navigate to Contact page"
        >
          Contact
        </Button>
      </nav>
      
      <div className="flex items-center space-x-2 ml-4 before:w-px before:h-6 before:bg-gray-200 before:mr-4">
        <Button 
          variant="ghost" 
          className="rounded-full px-4 hover:bg-black/5"
          onClick={() => router.push('/login')}
          aria-label="Log in to your account"
        >
          Log in
        </Button>
        <SignUpForm />
      </div>
    </motion.div>
  )
}