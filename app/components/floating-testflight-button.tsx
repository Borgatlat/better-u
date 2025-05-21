"use client"

import { useState, useEffect } from "react"
import { AppleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingTestFlightButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the button after scrolling a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Show the button after a delay even if no scroll
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Button
        as="a"
        href="https://testflight.apple.com/join/9TQrDfBx"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        <AppleIcon className="mr-2 h-4 w-4" />
        Join iOS Beta
      </Button>
    </div>
  )
}
