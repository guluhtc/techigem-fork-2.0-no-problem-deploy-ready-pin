"use client"

import { motion } from 'framer-motion'
import { Users, Settings, Package } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

interface StatsCardsProps {
  userCount: number
  featureCount: number
  planCount: number
}

export function StatsCards({ userCount, featureCount, planCount }: StatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {userCount}
          </CardTitle>
          <CardDescription>Total Users</CardDescription>
        </CardHeader>
        <CardContent>
          <Users className="h-8 w-8 text-primary" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {featureCount}
          </CardTitle>
          <CardDescription>Active Features</CardDescription>
        </CardHeader>
        <CardContent>
          <Settings className="h-8 w-8 text-primary" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {planCount}
          </CardTitle>
          <CardDescription>Pricing Plans</CardDescription>
        </CardHeader>
        <CardContent>
          <Package className="h-8 w-8 text-primary" />
        </CardContent>
      </Card>
    </div>
  )
}