"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { DashboardStats } from '@/components/dashboard/stats'
import { PostScheduler } from '@/components/dashboard/post-scheduler'
import { AnalyticsSection } from '@/components/dashboard/analytics'
import { HashtagSuggestions } from '@/components/dashboard/hashtag-suggestions'
import { AiTools } from '@/components/dashboard/ai-tools'

interface User {
  id: string;
  email: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({
          id: user.id,
          email: user.email || ''
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <DashboardStats />
        
        <AiTools />
        
        <div className="grid gap-8 md:grid-cols-2">
          <PostScheduler />
          <HashtagSuggestions />
        </div>
        
        <AnalyticsSection />
      </motion.div>
    </div>
  )
}