import Link from "next/link"
import { BetterULogo } from "./betteru-logo"

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <div className="flex items-center gap-2">
        <BetterULogo width={size} height={size} />
        <span className="text-[#00f2fe] font-bold text-xl hidden sm:inline">BetterU AI</span>
      </div>
    </Link>
  )
}
