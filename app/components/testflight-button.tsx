"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AppleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestFlightButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
  text?: string
}

export function TestFlightButton({
  className,
  variant = "default",
  size = "default",
  showIcon = true,
  text = "Join iOS Beta",
}: TestFlightButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    window.open("https://testflight.apple.com/join/9TQrDfBx", "_blank", "noopener,noreferrer")
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer",
        isHovered ? "bg-black text-white border-[#00f2fe]" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {showIcon && <AppleIcon className={cn("h-4 w-4 mr-2", isHovered ? "text-white" : "")} />}
      <span className="relative z-10">{text}</span>
      {isHovered && <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] opacity-10" />}
    </Button>
  )
}
