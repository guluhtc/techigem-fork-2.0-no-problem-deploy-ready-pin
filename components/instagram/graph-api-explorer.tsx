"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Lock } from 'lucide-react'

export function GraphApiExplorer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Graph API Explorer</CardTitle>
        <CardDescription>
          Test Instagram Graph API endpoints
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center bg-muted/5 rounded-lg border border-dashed">
          <div className="text-center">
            <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">API Explorer Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Connect your Instagram Business account to explore and test API endpoints.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}