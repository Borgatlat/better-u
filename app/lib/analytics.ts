"use client"

import { getCookie } from "./cookies"
import { recordAnalyticsEvent } from "../actions/analytics"

/**
 * Track a page view if analytics consent is given
 */
export function trackPageView(path: string) {
  try {
    const consentCookie = getCookie("cookie_consent")
    if (!consentCookie) return

    const consent = JSON.parse(consentCookie)
    if (!consent.analytics) return

    const userId = getCookie("user_id")
    if (!userId) return

    recordAnalyticsEvent({
      userId,
      eventType: "page_view",
      eventData: { path },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

/**
 * Track a custom event if analytics consent is given
 */
export function trackEvent(eventName: string, eventData: any = {}) {
  try {
    const consentCookie = getCookie("cookie_consent")
    if (!consentCookie) return

    const consent = JSON.parse(consentCookie)
    if (!consent.analytics) return

    const userId = getCookie("user_id")
    if (!userId) return

    recordAnalyticsEvent({
      userId,
      eventType: eventName,
      eventData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking event:", error)
  }
}
