"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Plus } from 'lucide-react'
import { toast } from 'sonner'

export function PostScheduler() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Post Scheduler</span>
          <Button 
            size="sm"
            onClick={() => toast.info('Post scheduling coming soon!')}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No posts scheduled</p>
            <p className="text-sm text-muted-foreground">
              Create your first post to get started
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}