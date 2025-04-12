"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useInView } from "react-intersection-observer"

interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LazyComponent({ children, fallback }: LazyComponentProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  })

  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (inView) {
      setShouldRender(true)
    }
  }, [inView])

  return (
    <div ref={ref}>
      {shouldRender ? (
        <Suspense fallback={fallback || <div className="h-40 animate-pulse bg-gray-800 rounded-lg" />}>
          {children}
        </Suspense>
      ) : (
        fallback || <div className="h-40 animate-pulse bg-gray-800 rounded-lg" />
      )}
    </div>
  )
}
