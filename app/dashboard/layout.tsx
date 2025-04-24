"use client"

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'

interface User {
  id: string;
  email: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session error:', error)
        throw error
      }
      
      if (!session) {
        router.push(`/login?returnTo=${encodeURIComponent(window.location.pathname)}`)
        return
      }
      
      setIsAuthenticated(true)
      setUser({
        id: session.user.id,
        email: session.user.email || ''
      })
    } catch (error) {
      console.error('Error checking auth status:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    checkAuth()
    
    // Set up auth state listener for real-time session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true)
          setUser({
            id: session.user.id,
            email: session.user.email || ''
          })
        }
        
        if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false)
          setUser(null)
          router.push('/login')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [checkAuth, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[280px]">
        <DashboardHeader user={user} />
        <main className="container py-8">
          {children}
        </main>
      </div>
    </div>
  )
}