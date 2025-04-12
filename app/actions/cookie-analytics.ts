"use server"

import { redis } from "../lib/redis"

/**
 * Record cookie consent in Redis
 */
export async function recordCookieConsent(data: {
  userId: string
  essential: boolean
  preferences: boolean
  analytics: boolean
}) {
  try {
    // Store consent data with user ID as key
    await redis.hset(`cookie_consent:${data.userId}`, {
      essential: data.essential,
      preferences: data.preferences,
      analytics: data.analytics,
      timestamp: new Date().toISOString(),
    })

    // Increment counters for reporting
    await redis.hincrby("cookie_consent_stats", "total", 1)
    if (data.preferences) {
      await redis.hincrby("cookie_consent_stats", "preferences", 1)
    }
    if (data.analytics) {
      await redis.hincrby("cookie_consent_stats", "analytics", 1)
    }

    return { success: true }
  } catch (error) {
    console.error("Error recording cookie consent:", error)
    return { success: false, error }
  }
}

/**
 * Get cookie consent statistics
 */
export async function getCookieConsentStats() {
  try {
    const stats = await redis.hgetall("cookie_consent_stats")
    return {
      total: Number.parseInt(stats.total || "0"),
      preferences: Number.parseInt(stats.preferences || "0"),
      analytics: Number.parseInt(stats.analytics || "0"),
    }
  } catch (error) {
    console.error("Error getting cookie stats:", error)
    return { total: 0, preferences: 0, analytics: 0 }
  }
}

/**
 * Record page view in Redis
 */
export async function recordPageView(path: string, userId: string) {
  try {
    // Increment page view counter
    await redis.hincrby("page_views", path, 1)

    // Store user's page view history
    await redis.lpush(
      `user_pageviews:${userId}`,
      JSON.stringify({
        path,
        timestamp: new Date().toISOString(),
      }),
    )

    // Trim to keep only last 100 page views per user
    await redis.ltrim(`user_pageviews:${userId}`, 0, 99)

    return { success: true }
  } catch (error) {
    console.error("Error recording page view:", error)
    return { success: false, error }
  }
}

/**
 * Get page view statistics
 */
export async function getPageViewStats() {
  try {
    return await redis.hgetall("page_views")
  } catch (error) {
    console.error("Error getting page view stats:", error)
    return {}
  }
}
