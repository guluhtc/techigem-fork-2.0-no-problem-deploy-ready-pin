"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Hash, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export function HashtagSuggestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Trending Hashtags</span>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => toast.info('Hashtag refresh coming soon!')}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center py-8">
            <Hash className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Connect your Instagram account</p>
            <p className="text-sm text-muted-foreground">
              to get personalized hashtag suggestions
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}