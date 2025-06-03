import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// API endpoint for mobile apps to validate sessions
export async function POST(request: NextRequest) {
  try {
    const { sessionToken } = await request.json()

    if (!sessionToken) {
      return NextResponse.json({ error: "Session token required" }, { status: 400 })
    }

    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("user_sessions")
      .select(`
        *,
        profiles (*)
      `)
      .eq("session_token", sessionToken)
      .gt("expires_at", new Date().toISOString())
      .single()

    if (error || !data) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    // Update last_active
    await supabase.from("user_sessions").update({ last_active: new Date().toISOString() }).eq("id", data.id)

    return NextResponse.json({
      user: data.profiles,
      session: data,
    })
  } catch (error) {
    console.error("Session validation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
