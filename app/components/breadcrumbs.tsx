"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Breadcrumbs() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbs = [{ label: "Home", href: "/" }]

  let currentPath = ""
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    const label = segment.replace(/[-]/g, " ") // Replace hyphens with spaces
    breadcrumbs.push({ label: capitalizeFirstLetter(label), href: currentPath })
  })

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <Link href={breadcrumb.href} className="text-sm text-gray-400 hover:text-[#00f2fe] transition-colors">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && <span className="mx-2 text-gray-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
