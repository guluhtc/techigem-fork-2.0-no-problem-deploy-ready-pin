"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Download } from 'lucide-react'
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

export function AnalyticsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Analytics Overview</span>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => toast.info('Analytics export coming soon!')}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}