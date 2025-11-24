"use client"

import { useState, useEffect } from "react"
import { AppleIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingAppStoreButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 300) {
        setIsVisible(false)
      }
    }

    const timer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true)
    }, 5000)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [isDismissed])

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
      <div className="relative group">
        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3" />
        </button>

        {/* Animated glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] rounded-full blur-xl opacity-60 animate-pulse" />

        <Button
          onClick={() =>
            window.open(
              "https://apps.apple.com/us/app/betteru-social-fitness/id6744857930",
              "_blank",
              "noopener,noreferrer",
            )
          }
          className="relative rounded-full bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black font-bold shadow-2xl hover:shadow-[0_0_40px_rgba(0,242,254,0.8)] transition-all duration-300 hover:scale-110 border-2 border-white/30"
          size="lg"
        >
          <AppleIcon className="mr-2 h-5 w-5" />
          <span className="font-bold">Get the App</span>
        </Button>
      </div>
    </div>
  )
}
