const supabaseUrl = "https://kmpufblmilcvortrfilp.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcHVmYmxtaWxjdm9ydHJmaWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Mjg2MzYsImV4cCI6MjA1OTIwNDYzNn0.JYJ5WSZWp04AGxfcX2GsiPrTn2QUStCfCHmdDNyxo04"

export async function createClient() {
  try {
    const { createClient: createSupabaseClient } = await import("@supabase/supabase-js")
    return createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseAnonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    )
  } catch (error) {
    console.warn("Supabase server client not available:", error)
    return null
  }
}

// Alias for compatibility
export const createServerClient = createClient

// Legacy function for backward compatibility
export async function getSupabaseClient() {
  return createClient()
}
