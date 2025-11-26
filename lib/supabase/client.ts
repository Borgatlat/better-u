let supabaseInstance: any = null

const supabaseUrl = "https://kmpufblmilcvortrfilp.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcHVmYmxtaWxjdm9ydHJmaWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Mjg2MzYsImV4cCI6MjA1OTIwNDYzNn0.JYJ5WSZWp04AGxfcX2GsiPrTn2QUStCfCHmdDNyxo04"

export async function createClient() {
  if (supabaseInstance) return supabaseInstance

  try {
    const { createClient: createSupabaseClient } = await import("@supabase/supabase-js")
    supabaseInstance = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseAnonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      },
    )
    return supabaseInstance
  } catch (error) {
    console.warn("Supabase client not available:", error)
    return null
  }
}

// Sync version for backward compatibility - returns null if not initialized
export function getSupabaseClient() {
  return supabaseInstance
}
