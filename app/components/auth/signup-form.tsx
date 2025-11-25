"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
      } else if (data.user) {
        if (data.user.email_confirmed_at) {
          setMessage("Account created successfully! Redirecting...")
          router.push("/dashboard")
        } else {
          setMessage("Please check your email to confirm your account.")
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm text-white/60">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            disabled={loading}
            className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 focus:border-[#00f2fe]/50 focus:ring-[#00f2fe]/20 rounded-lg h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-white/60">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 focus:border-[#00f2fe]/50 focus:ring-[#00f2fe]/20 rounded-lg h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-white/60">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
            className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 focus:border-[#00f2fe]/50 focus:ring-[#00f2fe]/20 rounded-lg h-11"
          />
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {message && (
          <Alert className="bg-[#00f2fe]/10 border-[#00f2fe]/20 text-[#00f2fe]">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-white/90 font-medium rounded-lg h-11 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-white/40">Already have an account? </span>
        <Link href="/login" className="text-white hover:text-[#00f2fe] transition-colors">
          Sign in
        </Link>
      </div>
    </div>
  )
}
