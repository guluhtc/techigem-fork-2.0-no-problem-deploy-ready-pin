"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export function Logo() {
  const router = useRouter()

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center space-x-3 cursor-pointer"
      onClick={() => router.push('/')}
    >
      <span className="font-bold text-2xl gradient-text tracking-tight">
        Techigem
      </span>
    </motion.div>
  )
}