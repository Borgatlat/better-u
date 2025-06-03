import { createServerClient } from "@supabase/ssr"
import type { NextRequest, NextResponse } from "next/server"

// Re-export createServerClient for compatibility
export { createServerClient } from "@supabase/ssr"

export function createClient(request?: NextRequest, response?: NextResponse) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kmpufblmilcvortrfilp.supabase.co"
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcHVmYmxtaWxjdm9ydHJmaWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Mjg2MzYsImV4cCI6MjA1OTIwNDYzNn0.JYJ5WSZWp04AGxfcX2GsiPrTn2QUStCfCHmdDNyxo04"

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        if (typeof window !== "undefined") {
          // Client-side fallback
          return []
        }
        // Server-side: try to get cookies from request
        if (request) {
          return request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }))
        }
        return []
      },
      setAll(cookiesToSet) {
        if (typeof window !== "undefined") {
          // Client-side: use document.cookie
          cookiesToSet.forEach(({ name, value, options }) => {
            document.cookie = `${name}=${value}; path=/; ${options?.secure ? "secure;" : ""} ${options?.sameSite ? `samesite=${options.sameSite};` : ""}`
          })
          return
        }

        // Server-side: try to set cookies on response
        if (response) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        }
      },
    },
  })
}

// Legacy function for backward compatibility
export async function getSupabaseClient() {
  return createClient()
}
