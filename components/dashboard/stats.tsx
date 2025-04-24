"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Users, Heart, BarChart2, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: "Total Followers",
    value: "0",
    change: "+0%",
    icon: Users,
    color: "text-blue-500"
  },
  {
    title: "Engagement Rate",
    value: "0%",
    change: "+0%",
    icon: Heart,
    color: "text-red-500"
  },
  {
    title: "Posts Scheduled",
    value: "0",
    change: "+0%",
    icon: BarChart2,
    color: "text-green-500"
  },
  {
    title: "Profile Views",
    value: "0",
    change: "+0%",
    icon: TrendingUp,
    color: "text-purple-500"
  }
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <span className="text-xs font-medium text-muted-foreground">
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}