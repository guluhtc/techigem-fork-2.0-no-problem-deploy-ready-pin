"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Download, TrendingUp, Users, Eye, Heart, Lock } from 'lucide-react'
import { toast } from 'sonner'

const dummyData = [
  { name: 'Mon', followers: 0 },
  { name: 'Tue', followers: 0 },
  { name: 'Wed', followers: 0 },
  { name: 'Thu', followers: 0 },
  { name: 'Fri', followers: 0 },
  { name: 'Sat', followers: 0 },
  { name: 'Sun', followers: 0 },
]

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState('7d')

  const stats = [
    {
      title: 'Total Followers',
      value: '0',
      change: '+0%',
      icon: Users
    },
    {
      title: 'Profile Views',
      value: '0',
      change: '+0%',
      icon: Eye
    },
    {
      title: 'Engagement Rate',
      value: '0%',
      change: '+0%',
      icon: Heart
    },
    {
      title: 'Growth Rate',
      value: '0%',
      change: '+0%',
      icon: TrendingUp
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Analytics</h2>
        <div className="flex items-center gap-4">
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline"
            onClick={() => toast.info('Analytics export coming soon!')}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Growth Trends</CardTitle>
          <CardDescription>
            Connect your Instagram account to view analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center bg-muted/5 rounded-lg border border-dashed">
            <div className="text-center">
              <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Connect your Instagram Business account to unlock detailed analytics and insights.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}