"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { getCookie } from "../lib/cookies"
import { recordPageView } from "../actions/cookie-analytics"

export function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams() // Add this line to properly use the hook

  useEffect(() => {
    // Check if user has consented to analytics
    const consentCookie = getCookie("cookie_consent")
    if (!consentCookie) return

    try {
      const consent = JSON.parse(consentCookie)
      if (!consent.analytics) return

      // Get user ID
      const userId = getCookie("user_id")
      if (!userId) return

      // Record page view
      recordPageView(pathname, userId)
    } catch (error) {
      console.error("Error tracking page view:", error)
    }
  }, [pathname])

  return null // This component doesn't render anything
}
