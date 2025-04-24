"use client"

import { motion } from "framer-motion"
import { Logo } from "@/components/navbar/logo"
import { DesktopNav } from "@/components/navbar/desktop-nav"
import { MobileNav } from "@/components/navbar/mobile-nav"

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container px-4 py-3">
        <div className="relative rounded-full bg-white/80 backdrop-blur-lg shadow-lg border">
          <div className="flex h-16 items-center justify-between px-6">
            <Logo />
            <DesktopNav />
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}