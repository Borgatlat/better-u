"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    name?: string
    avatar_url?: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signOut: async () => {},
  error: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [supabaseClient, setSupabaseClient] = useState<any>(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const supabaseModule = await import("@supabase/supabase-js")
        const { createClient } = supabaseModule

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kmpufblmilcvortrfilp.supabase.co"
        const supabaseAnonKey =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcHVmYmxtaWxjdm9ydHJmaWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Mjg2MzYsImV4cCI6MjA1OTIwNDYzNn0.JYJ5WSZWp04AGxfcX2GsiPrTn2QUStCfCHmdDNyxo04"

        const client = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
        })

        setSupabaseClient(client)

        // Get initial session
        const {
          data: { session },
          error: sessionError,
        } = await client.auth.getSession()

        if (sessionError) {
          console.error("Error getting session:", sessionError)
        } else {
          setUser(session?.user ?? null)
        }

        // Listen for auth changes
        const {
          data: { subscription },
        } = client.auth.onAuthStateChange(async (event: string, session: any) => {
          setUser(session?.user ?? null)
          setLoading(false)
        })

        setLoading(false)

        return () => subscription?.unsubscribe()
      } catch (error) {
        // Supabase not available - continue without auth
        console.warn("Auth initialization skipped:", error)
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const signOut = async () => {
    if (supabaseClient) {
      try {
        await supabaseClient.auth.signOut()
        setUser(null)
      } catch (error) {
        console.error("Error signing out:", error)
      }
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
