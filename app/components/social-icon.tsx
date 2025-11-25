import type React from "react"

interface SocialIconProps {
  href: string
  "aria-label": string
  icon: React.ReactNode
  target?: string
  rel?: string
}

export function SocialIcon({ href, "aria-label": ariaLabel, icon, target, rel }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all duration-300"
    >
      {icon}
    </a>
  )
}
