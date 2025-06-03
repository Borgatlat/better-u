import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  // Hardcoded values as fallback (only for development)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kmpufblmilcvortrfilp.supabase.co"
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcHVmYmxtaWxjdm9ydHJmaWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Mjg2MzYsImV4cCI6MjA1OTIwNDYzNn0.JYJ5WSZWp04AGxfcX2GsiPrTn2QUStCfCHmdDNyxo04"

  console.log("Creating Supabase client with:", {
    urlExists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    keyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    usingFallback: !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
