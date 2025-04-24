"use client"

import { motion } from 'framer-motion'
import { GraphApiExplorer } from '@/components/instagram/graph-api-explorer'

export default function ApiExplorerPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold">API Explorer</h1>
        <p className="text-muted-foreground">
          Test and explore Instagram Graph API endpoints
        </p>
      </div>

      <GraphApiExplorer />
    </motion.div>
  )
}