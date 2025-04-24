"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Lock } from 'lucide-react'

export function PostScheduler() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center bg-muted/5 rounded-lg border border-dashed">
          <div className="text-center">
            <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Post Scheduler Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Connect your Instagram Business account to schedule and manage posts.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}