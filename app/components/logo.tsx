import Link from "next/link"
import { BetterULogo } from "./betteru-logo"

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <div className="flex items-center gap-2.5">
        <BetterULogo width={size} height={size} />
        <span className="text-white font-semibold text-base tracking-tight hidden sm:inline">BetterU</span>
      </div>
    </Link>
  )
}
