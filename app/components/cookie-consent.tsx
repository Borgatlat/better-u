"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { getCookie, setCookie, generateUserId } from "../lib/cookies"
import { recordCookieConsent } from "../actions/cookie-analytics"

// Define cookie types based on our cookie policy
type CookieType = "essential" | "preferences" | "analytics"

interface CookieSettings {
  essential: boolean
  preferences: boolean
  analytics: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    essential: true, // Essential cookies are always enabled
    preferences: true,
    analytics: true,
  })

  // Check if user has already set cookie preferences
  useEffect(() => {
    const consentCookie = getCookie("cookie_consent")
    if (!consentCookie) {
      // No consent cookie found, show the banner
      setShowBanner(true)
    } else {
      try {
        // Parse the saved preferences
        const savedSettings = JSON.parse(consentCookie)
        setCookieSettings(savedSettings)
      } catch (e) {
        // If there's an error parsing, show the banner again
        setShowBanner(true)
      }
    }

    // Ensure user has a unique ID for analytics
    if (!getCookie("user_id")) {
      setCookie("user_id", generateUserId(), 365)
    }
  }, [])

  // Save user preferences and set cookies accordingly
  const savePreferences = async () => {
    // Save the consent preferences
    setCookie("cookie_consent", JSON.stringify(cookieSettings), 365)

    // Set example cookies based on user preferences
    if (cookieSettings.preferences) {
      setCookie("theme_preference", "dark", 365)
      setCookie("language_preference", "en", 365)
    }

    if (cookieSettings.analytics) {
      setCookie("analytics_session_id", `session_${Date.now()}`, 1)
      setCookie("first_visit", new Date().toISOString(), 365)
    }

    // Record consent to Redis
    const userId = getCookie("user_id") || generateUserId()

    // Always record consent choices to server for compliance
    await recordCookieConsent({
      userId,
      essential: cookieSettings.essential,
      preferences: cookieSettings.preferences,
      analytics: cookieSettings.analytics,
    })

    setShowBanner(false)
    setShowPreferences(false)
  }

  // Accept all cookies
  const acceptAll = async () => {
    const allEnabled = {
      essential: true,
      preferences: true,
      analytics: true,
    }
    setCookieSettings(allEnabled)
    setCookie("cookie_consent", JSON.stringify(allEnabled), 365)

    // Set all example cookies
    setCookie("theme_preference", "dark", 365)
    setCookie("language_preference", "en", 365)
    setCookie("analytics_session_id", `session_${Date.now()}`, 1)
    setCookie("first_visit", new Date().toISOString(), 365)

    // Record consent to Redis
    const userId = getCookie("user_id") || generateUserId()

    await recordCookieConsent({
      userId,
      essential: true,
      preferences: true,
      analytics: true,
    })

    setShowBanner(false)
  }

  // Reject non-essential cookies
  const rejectNonEssential = async () => {
    const essentialOnly = {
      essential: true,
      preferences: false,
      analytics: false,
    }
    setCookieSettings(essentialOnly)
    setCookie("cookie_consent", JSON.stringify(essentialOnly), 365)

    // Record consent to Redis
    const userId = getCookie("user_id") || generateUserId()

    await recordCookieConsent({
      userId,
      essential: true,
      preferences: false,
      analytics: false,
    })

    setShowBanner(false)
  }

  // Toggle a specific cookie type
  const toggleCookieType = (type: CookieType) => {
    if (type === "essential") return // Essential cookies can't be toggled

    setCookieSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe-bottom"
        >
          <div className="mx-auto max-w-4xl bg-black border border-gray-800 rounded-xl p-4 md:p-6 shadow-lg backdrop-blur-sm">
            {!showPreferences ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white">Cookie Consent</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBanner(false)}
                    className="h-8 w-8 p-0 rounded-full"
                    aria-label="Close cookie banner"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-300">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our
                  traffic. By clicking "Accept All", you consent to our use of cookies as described in our Cookie
                  Policy.
                </p>
                <div className="flex flex-wrap gap-3 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={rejectNonEssential}
                    className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    Essential Only
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreferences(true)}
                    className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    Preferences
                  </Button>
                  <Button
                    size="sm"
                    onClick={acceptAll}
                    className="bg-[#00f2fe] hover:bg-[#00b4ff] text-black font-semibold"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white">Cookie Preferences</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreferences(false)}
                    className="h-8 w-8 p-0 rounded-full"
                    aria-label="Back to cookie banner"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Essential Cookies</h4>
                      <p className="text-xs text-gray-400">Required for the website to function properly</p>
                    </div>
                    <div className="h-5 w-10 bg-[#00f2fe] rounded-full relative">
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-black rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Preferences Cookies</h4>
                      <p className="text-xs text-gray-400">Remember your settings and preferences</p>
                    </div>
                    <button
                      onClick={() => toggleCookieType("preferences")}
                      className={`h-5 w-10 rounded-full relative transition-colors ${
                        cookieSettings.preferences ? "bg-[#00f2fe]" : "bg-gray-700"
                      }`}
                      aria-checked={cookieSettings.preferences}
                      role="switch"
                    >
                      <span
                        className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-black rounded-full transition-all ${
                          cookieSettings.preferences ? "right-1" : "left-1"
                        }`}
                      ></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Analytics Cookies</h4>
                      <p className="text-xs text-gray-400">Help us improve our website by collecting anonymous data</p>
                    </div>
                    <button
                      onClick={() => toggleCookieType("analytics")}
                      className={`h-5 w-10 rounded-full relative transition-colors ${
                        cookieSettings.analytics ? "bg-[#00f2fe]" : "bg-gray-700"
                      }`}
                      aria-checked={cookieSettings.analytics}
                      role="switch"
                    >
                      <span
                        className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-black rounded-full transition-all ${
                          cookieSettings.analytics ? "right-1" : "left-1"
                        }`}
                      ></span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={savePreferences}
                    className="bg-[#00f2fe] hover:bg-[#00b4ff] text-black font-semibold"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
