"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  error: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const supabase = createClient()

      // Get initial session
      const getInitialSession = async () => {
        try {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession()

          if (sessionError) {
            console.error("Error getting session:", sessionError)
            setError(sessionError.message)
          } else {
            setUser(session?.user ?? null)
            setError(null)
          }
        } catch (error) {
          console.error("Failed to get initial session:", error)
          setError(error instanceof Error ? error.message : "Failed to initialize auth")
        } finally {
          setLoading(false)
        }
      }

      getInitialSession()

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
        setError(null)
      })

      return () => subscription.unsubscribe()
    } catch (error) {
      console.error("Failed to initialize Supabase client:", error)
      setError(error instanceof Error ? error.message : "Failed to initialize authentication")
      setLoading(false)
    }
  }, [])

  const signOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setError(null)
    } catch (error) {
      console.error("Error signing out:", error)
      setError(error instanceof Error ? error.message : "Failed to sign out")
    }
  }

  return <AuthContext.Provider value={{ user, loading, signOut, error }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
