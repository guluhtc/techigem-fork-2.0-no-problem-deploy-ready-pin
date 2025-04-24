"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Mail, Lock, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { InstagramBusinessAuth } from "@/lib/instagram/auth"

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isInstagramLoading, setIsInstagramLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams?.get('error')
    const reason = searchParams?.get('reason')
    const description = searchParams?.get('description')

    if (error) {
      let errorMessage = 'Authentication failed'
      
      if (error === 'access_denied' && reason === 'user_denied') {
        errorMessage = 'Instagram login was cancelled'
      } else if (error === 'no_session') {
        errorMessage = 'Please sign in to continue'
      } else if (description) {
        errorMessage = decodeURIComponent(description).replace(/\+/g, ' ')
      } else if (error === 'Invalid API key') {
        errorMessage = 'Authentication service is temporarily unavailable'
      }

      toast.error(errorMessage)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (error) throw error

      // Get the return URL from the query parameter or default to dashboard
      const returnTo = searchParams?.get('returnTo') || '/dashboard'

      router.push(returnTo)
      router.refresh() // Force a refresh to update auth state
      toast.success("Welcome back!")
    } catch (error: any) {
      console.error("Login error:", error)
      toast.error(error.message || "Failed to login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInstagramLogin = async () => {
    setIsInstagramLoading(true)
    try {
      const authUrl = InstagramBusinessAuth.getAuthUrl()
      window.location.href = authUrl
    } catch (error) {
      console.error('Instagram login error:', error)
      toast.error('Failed to initiate Instagram login')
    } finally {
      setIsInstagramLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to access your dashboard
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <Button
            variant="outline"
            className="w-full h-11 relative hover:bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:text-white group transition-colors"
            onClick={handleInstagramLogin}
            disabled={isInstagramLoading}
          >
            {isInstagramLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting to Instagram...
              </>
            ) : (
              <>
                <Instagram className="absolute left-4 h-4 w-4" />
                Continue with Instagram
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-[#8B5CF6]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}