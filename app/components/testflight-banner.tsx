"use client"

import { useState, useEffect } from "react"
import { X, AppleIcon } from "lucide-react"

export function TestFlightBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if the banner has been dismissed before
    const dismissed = localStorage.getItem("testflightBannerDismissed")
    if (dismissed === "true") {
      setIsDismissed(true)
      return
    }

    // Show the banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    // After animation completes, set as dismissed
    setTimeout(() => {
      setIsDismissed(true)
      localStorage.setItem("testflightBannerDismissed", "true")
    }, 300)
  }

  if (isDismissed) return null

  return (
    <div
      className={`fixed top-16 inset-x-0 z-40 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AppleIcon className="h-5 w-5" />
            <p className="text-sm font-medium">
              Try the BetterU iOS app beta!{" "}
              <a
                href="https://testflight.apple.com/join/9TQrDfBx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold hover:text-blue-100"
              >
                Join TestFlight
              </a>
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white hover:text-blue-100 focus:outline-none"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
