import { createClient } from "./supabase/client"
import { getSupabaseClient } from "./supabase/server"

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

// Client-side auth functions
export const authClient = {
  async signUp(email: string, password: string, fullName?: string) {
    const supabase = createClient()

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        console.error("Signup error:", error)
        throw new Error(error.message)
      }

      return data
    } catch (error: any) {
      console.error("Auth signup failed:", error)
      throw error
    }
  },

  async signIn(email: string, password: string) {
    const supabase = createClient()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Signin error:", error)
        throw new Error(error.message)
      }

      if (!data.user) {
        throw new Error("No user returned from authentication")
      }

      return data
    } catch (error: any) {
      console.error("Auth signin failed:", error)
      throw error
    }
  },

  async signOut() {
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Signout error:", error)
        throw error
      }
    } catch (error: any) {
      console.error("Auth signout failed:", error)
      throw error
    }
  },

  async getUser() {
    const supabase = createClient()

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        console.error("Get user error:", error)
        return null
      }

      return user
    } catch (error: any) {
      console.error("Get user failed:", error)
      return null
    }
  },

  async getSession() {
    const supabase = createClient()

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("Get session error:", error)
        return null
      }

      return session
    } catch (error: any) {
      console.error("Get session failed:", error)
      return null
    }
  },
}

// Server-side auth functions
export const authServer = {
  async getUser() {
    try {
      const supabase = await getSupabaseClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        console.error("Server get user error:", error)
        return null
      }

      return user
    } catch (error: any) {
      console.error("Server get user failed:", error)
      return null
    }
  },

  async getSession() {
    try {
      const supabase = await getSupabaseClient()
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("Server get session error:", error)
        return null
      }

      return session
    } catch (error: any) {
      console.error("Server get session failed:", error)
      return null
    }
  },
}
