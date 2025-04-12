"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto p-4 border border-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "transition-colors",
              heading.level === 2 ? "ml-0" : "ml-4",
              activeId === heading.id ? "text-[#00f2fe]" : "text-gray-400 hover:text-white",
            )}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
