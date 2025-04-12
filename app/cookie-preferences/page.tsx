"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "../components/breadcrumbs"
import Link from "next/link"
import { getCookie, setCookie } from "../lib/cookies"

export default function CookiePreferencesPage() {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    preferences: false,
    analytics: false,
  })
  const [saved, setSaved] = useState(false)

  // Load current cookie settings
  useEffect(() => {
    const consentCookie = getCookie("cookie_consent")
    if (consentCookie) {
      try {
        const savedSettings = JSON.parse(consentCookie)
        setCookieSettings(savedSettings)
      } catch (e) {
        console.error("Error parsing cookie consent:", e)
      }
    }
  }, [])

  // Toggle a specific cookie type
  const toggleCookieType = (type: string) => {
    if (type === "essential") return // Essential cookies can't be toggled

    setCookieSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
    setSaved(false)
  }

  // Save preferences
  const savePreferences = () => {
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

    setSaved(true)

    // Reset saved message after 3 seconds
    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-24 mt-safe-top pt-14">
      <Breadcrumbs />

      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
        Cookie Preferences
      </h1>

      <div className="space-y-6">
        <p className="text-gray-300">
          Manage your cookie preferences below. You can learn more about how we use cookies in our{" "}
          <Link href="/cookie-policy" className="text-[#00f2fe] hover:underline">
            Cookie Policy
          </Link>
          .
        </p>

        <div className="bg-black/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-900/50 p-4 rounded-lg">
              <div>
                <h3 className="font-medium text-white">Essential Cookies</h3>
                <p className="text-sm text-gray-400">Required for the website to function properly</p>
              </div>
              <div className="h-6 w-12 bg-[#00f2fe] rounded-full relative">
                <div className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 bg-black rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-900/50 p-4 rounded-lg">
              <div>
                <h3 className="font-medium text-white">Preferences Cookies</h3>
                <p className="text-sm text-gray-400">Remember your settings and preferences</p>
              </div>
              <button
                onClick={() => toggleCookieType("preferences")}
                className={`h-6 w-12 rounded-full relative transition-colors ${
                  cookieSettings.preferences ? "bg-[#00f2fe]" : "bg-gray-700"
                }`}
                aria-checked={cookieSettings.preferences}
                role="switch"
              >
                <span
                  className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-black rounded-full transition-all ${
                    cookieSettings.preferences ? "right-1" : "left-1"
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between bg-gray-900/50 p-4 rounded-lg">
              <div>
                <h3 className="font-medium text-white">Analytics Cookies</h3>
                <p className="text-sm text-gray-400">Help us improve our website by collecting anonymous data</p>
              </div>
              <button
                onClick={() => toggleCookieType("analytics")}
                className={`h-6 w-12 rounded-full relative transition-colors ${
                  cookieSettings.analytics ? "bg-[#00f2fe]" : "bg-gray-700"
                }`}
                aria-checked={cookieSettings.analytics}
                role="switch"
              >
                <span
                  className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-black rounded-full transition-all ${
                    cookieSettings.analytics ? "right-1" : "left-1"
                  }`}
                ></span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>{saved && <p className="text-green-400 text-sm">Your preferences have been saved!</p>}</div>
            <Button onClick={savePreferences} className="bg-[#00f2fe] hover:bg-[#00b4ff] text-black font-semibold">
              Save Preferences
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">About Our Cookies</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-white">Essential Cookies</h3>
              <p className="text-sm text-gray-400">
                These cookies are necessary for the website to function and cannot be switched off in our systems. They
                are usually only set in response to actions made by you which amount to a request for services, such as
                setting your privacy preferences, logging in or filling in forms.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white">Preferences Cookies</h3>
              <p className="text-sm text-gray-400">
                These cookies allow us to remember choices you make and provide enhanced, more personal features. They
                may be set by us or by third party providers whose services we have added to our pages. If you do not
                allow these cookies, then some or all of these services may not function properly.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white">Analytics Cookies</h3>
              <p className="text-sm text-gray-400">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance
                of our site. They help us to know which pages are the most and least popular and see how visitors move
                around the site. All information these cookies collect is aggregated and therefore anonymous.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800">
          <Link href="/" className="text-[#00f2fe] hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
