"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AppStoreButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
  size?: "default" | "sm" | "lg" | "icon" | "large"
  showIcon?: boolean
  showBadge?: boolean
  text?: string
}

export function AppStoreButton({
  className,
  variant = "default",
  size = "default",
  showIcon = true,
  showBadge = false,
  text = "Download on App Store",
}: AppStoreButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    window.open("https://apps.apple.com/us/app/betteru-social-fitness/id6744857930", "_blank", "noopener,noreferrer")
  }

  if (size === "large") {
    return (
      <div className="relative inline-flex flex-col items-center gap-4">
        {/* Subtle ambient glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl transition-opacity duration-700",
            "bg-gradient-to-b from-white/5 to-transparent blur-2xl",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Main button - Apple Store official style */}
        <button
          className={cn(
            "relative flex items-center gap-3 px-6 py-3 rounded-xl",
            "bg-white text-black",
            "transition-all duration-300 ease-out",
            "hover:bg-gray-100 hover:scale-[1.02]",
            "active:scale-[0.98]",
            "shadow-lg shadow-black/20",
            "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black",
            className,
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          {/* Apple Logo */}
          {showIcon && (
            <svg viewBox="0 0 384 512" className="h-8 w-8" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-googletag61.5-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
          )}

          {/* Text content */}
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[10px] font-medium tracking-wide uppercase opacity-80">Download on the</span>
            <span className="text-xl font-semibold -mt-0.5">App Store</span>
          </div>
        </button>

        {/* Subtle "Available Now" indicator */}
        {showBadge && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">Available Now</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer",
        "bg-white text-black font-semibold",
        "hover:bg-gray-100 hover:scale-[1.02]",
        "active:scale-[0.98]",
        "shadow-md shadow-black/10",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {showIcon && (
        <svg viewBox="0 0 384 512" className="h-4 w-4 mr-2" fill="currentColor">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.5-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
      )}
      <span className="relative z-10">{text}</span>
    </Button>
  )
}
