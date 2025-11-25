"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbs = [{ label: "Home", href: "/" }]

  let currentPath = ""
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    const label = segment.replace(/[-]/g, " ")
    breadcrumbs.push({ label: capitalizeFirstLetter(label), href: currentPath })
  })

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-1">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            <Link
              href={breadcrumb.href}
              className={`text-sm transition-colors ${
                index === breadcrumbs.length - 1 ? "text-white/80" : "text-white/40 hover:text-white/60"
              }`}
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-white/20" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
