import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <div className="flex items-center gap-2.5">
        <Image
          src="/images/betteru-logo.png"
          alt="BetterU Logo"
          width={size}
          height={size}
          className="object-contain"
        />
        <span className="text-white font-semibold text-base tracking-tight hidden sm:inline">BetterU</span>
      </div>
    </Link>
  )
}
