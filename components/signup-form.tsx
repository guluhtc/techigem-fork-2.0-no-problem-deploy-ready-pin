"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { SignupDialog } from "./auth/signup-dialog"
import { InstagramBusinessAuth } from "@/lib/instagram/auth"

export function SignUpForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`
        }
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              role: 'user'
            }
          ])

        if (profileError) {
          throw profileError
        }

        toast.success("Account created successfully! Please check your email to verify your account.")
        setIsOpen(false)
        setFormData({ email: "", password: "" })
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      toast.error(error.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInstagramLogin = async () => {
    try {
      const authUrl = InstagramBusinessAuth.getAuthUrl()
      window.location.href = authUrl
    } catch (error) {
      console.error('Instagram login error:', error)
      toast.error('Failed to initiate Instagram login')
    }
  }

  return (
    <>
      <Button 
        size="sm"
        className="h-9 sm:h-10 px-4 sm:px-6 bg-gradient-to-r from-primary via-[#8B5CF6] to-[#EC4899] hover:opacity-90 rounded-full"
        onClick={() => setIsOpen(true)}
        data-signup-trigger
      >
        Start Free Trial
        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>

      <SignupDialog
        isOpen={isOpen}
        isLoading={isLoading}
        formData={formData}
        onOpenChange={setIsOpen}
        onInstagramLogin={handleInstagramLogin}
        onFormChange={handleFormChange}
        onSubmit={handleSignUp}
      />
    </>
  )
}