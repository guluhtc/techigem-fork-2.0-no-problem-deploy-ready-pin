"use client"

import { motion } from 'framer-motion'
import { InstagramSettingsManager } from '@/components/instagram/settings-manager'

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold">Instagram Settings</h1>
        <p className="text-muted-foreground">
          Configure your Instagram integration settings
        </p>
      </div>

      <InstagramSettingsManager />
    </motion.div>
  )
}