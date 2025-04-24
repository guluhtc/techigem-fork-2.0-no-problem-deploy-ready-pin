"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Loader2 } from "lucide-react"

interface SignupFormData {
  email: string
  password: string
}

interface SignupFormFieldsProps {
  formData: SignupFormData
  isLoading: boolean
  onChange: (field: keyof SignupFormData, value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function SignupFormFields({ formData, isLoading, onChange, onSubmit }: SignupFormFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="pl-10 h-11"
            required
          />
          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="relative">
          <Input
            type="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
            className="pl-10 h-11"
            required
          />
          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-primary via-[#8B5CF6] to-[#EC4899]"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Free Account"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="/terms" className="text-primary hover:underline">Terms</a>
        {" "}and{" "}
        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
      </p>
    </form>
  )
}