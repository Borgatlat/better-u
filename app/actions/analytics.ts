"use server"

import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const supabase = createClient(supabaseUrl, supabaseServiceKey)

/**
 * Record cookie consent choices in Supabase
 */
export async function recordCookieConsent(data: {
  userId: string
  essential: boolean
  preferences: boolean
  analytics: boolean
  timestamp: string
}) {
  try {
    const { error } = await supabase.from("cookie_consents").upsert(
      {
        user_id: data.userId,
        essential: data.essential,
        preferences: data.preferences,
        analytics: data.analytics,
        updated_at: data.timestamp,
      },
      {
        onConflict: "user_id",
      },
    )

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error recording cookie consent:", error)
    return { success: false, error }
  }
}

/**
 * Record analytics event in Supabase
 */
export async function recordAnalyticsEvent(data: {
  userId: string
  eventType: string
  eventData?: any
  timestamp: string
}) {
  // Only record if user has consented to analytics
  try {
    const { error } = await supabase.from("analytics_events").insert({
      user_id: data.userId,
      event_type: data.eventType,
      event_data: data.eventData,
      created_at: data.timestamp,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error recording analytics event:", error)
    return { success: false, error }
  }
}
