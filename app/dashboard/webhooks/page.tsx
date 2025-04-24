"use client"

import { motion } from 'framer-motion'
import { WebhookManager } from '@/components/instagram/webhook-manager'

export default function WebhooksPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold">Webhook Management</h1>
        <p className="text-muted-foreground">
          Configure and manage Instagram webhook notifications
        </p>
      </div>

      <WebhookManager />
    </motion.div>
  )
}