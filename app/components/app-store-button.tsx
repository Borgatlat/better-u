"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AppleIcon, Download, Sparkles } from "lucide-react"
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
      <div className="relative inline-block group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#00b4ff] to-[#00f2fe] rounded-2xl blur-xl opacity-30 group-hover:opacity-60 animate-pulse transition-opacity duration-500" />

        {showBadge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-orange-500/40 animate-bounce">
            <Sparkles className="h-3 w-3" />
            <span>NOW LIVE!</span>
            <Sparkles className="h-3 w-3" />
          </div>
        )}

        <button
          className={cn(
            "relative px-8 py-4 rounded-2xl font-bold text-base overflow-hidden transition-all duration-500 transform",
            "bg-gradient-to-br from-[#00f2fe] via-[#00b4ff] to-[#0099ff]",
            "hover:from-[#00ffff] hover:via-[#00d4ff] hover:to-[#00b4ff]",
            "text-black shadow-xl shadow-[#00f2fe]/50",
            "hover:scale-105 hover:shadow-[0_0_40px_rgba(0,242,254,0.6)]",
            "active:scale-100",
            "border-2 border-white/20",
            className,
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-60"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-60"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-white rounded-full animate-ping opacity-60"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="relative z-10 flex items-center justify-center gap-3">
            {showIcon && (
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <AppleIcon className="h-6 w-6" />
              </div>
            )}
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium opacity-90 tracking-wide">Download now on</span>
              <span className="text-xl font-black leading-tight tracking-tight">App Store</span>
            </div>
            <Download className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-y-1 group-hover:scale-110" />
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

          <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-300" />
        </button>
      </div>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer group",
        "bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black font-bold",
        "border-2 border-white/20",
        "hover:from-[#00ffff] hover:to-[#00d4ff]",
        "hover:shadow-xl hover:shadow-[#00f2fe]/60 hover:scale-110 hover:-translate-y-1",
        "active:scale-100 active:translate-y-0",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {showIcon && (
        <AppleIcon
          className={cn("h-5 w-5 mr-2 transition-transform duration-300", isHovered ? "scale-125 rotate-12" : "")}
        />
      )}
      <span className="relative z-10 font-bold text-base">{text}</span>
      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </Button>
  )
}
