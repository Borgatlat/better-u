interface BetterULogoProps {
  width?: number | string
  height?: number | string
  className?: string
}

export function BetterULogo({ width = 40, height = 40, className = "" }: BetterULogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: "rotate(0deg)" }} // Ensure no rotation
    >
      <circle cx="250" cy="250" r="250" fill="black" />

      {/* Dumbbell bar */}
      <rect x="150" y="250" width="200" height="20" fill="#00AAFF" />

      {/* Left weights */}
      <rect x="90" y="220" width="30" height="80" rx="10" fill="#00AAFF" />
      <rect x="130" y="200" width="30" height="120" rx="10" fill="#00AAFF" />

      {/* Right weights */}
      <rect x="340" y="200" width="30" height="120" rx="10" fill="#00AAFF" />
      <rect x="380" y="220" width="30" height="80" rx="10" fill="#00AAFF" />

      {/* Circuit nodes */}
      <circle cx="180" cy="180" r="15" fill="#00AAFF" />
      <circle cx="250" cy="150" r="15" fill="#00AAFF" />
      <circle cx="320" cy="180" r="15" fill="#00AAFF" />

      {/* Circuit lines */}
      <path d="M180 180 L180 250" stroke="#00AAFF" strokeWidth="10" />
      <path d="M250 150 L250 250" stroke="#00AAFF" strokeWidth="10" />
      <path d="M320 180 L320 250" stroke="#00AAFF" strokeWidth="10" />

      {/* Small circles inside the larger ones */}
      <circle cx="180" cy="180" r="5" fill="black" />
      <circle cx="250" cy="150" r="5" fill="black" />
      <circle cx="320" cy="180" r="5" fill="black" />

      {/* BetterU text */}
      <text x="250" y="350" fontSize="60" fontWeight="bold" fill="#00AAFF" textAnchor="middle">
        BetterU
      </text>
    </svg>
  )
}
