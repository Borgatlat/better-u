"use client"

import { useEffect, useState, type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface DynamicBackgroundProps {
  children: ReactNode
  className?: string
  id: string
  from: string
  to: string
  minHeight?: string
  maxHeight?: string
}

export function DynamicBackground({
  children,
  className,
  id,
  from,
  to,
  minHeight = "40vh",
  maxHeight = "80vh",
}: DynamicBackgroundProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)

  const { scrollY } = useScroll()

  // Update measurements and scroll position
  useEffect(() => {
    const updateMeasurements = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setElementTop(window.scrollY + rect.top)
        setElementHeight(rect.height)
        setWindowHeight(window.innerHeight)
      }
    }

    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY)
    }

    updateMeasurements()
    updateScrollPosition()

    window.addEventListener("resize", updateMeasurements)
    window.addEventListener(
      "scroll",
      () => {
        requestAnimationFrame(() => {
          updateMeasurements()
          updateScrollPosition()
        })
      },
      { passive: true },
    )

    return () => {
      window.removeEventListener("resize", updateMeasurements)
      window.removeEventListener("scroll", updateScrollPosition)
    }
  }, [])

  // Calculate the range for the animation
  const startScroll = elementTop - windowHeight
  const midScroll = elementTop - windowHeight / 3
  const endScroll = elementTop + elementHeight

  // Transform height based on scroll position with more dramatic change
  const height = useTransform(
    scrollY,
    [startScroll, midScroll, elementTop + elementHeight / 2, endScroll],
    [minHeight, maxHeight, maxHeight, minHeight],
  )

  // Transform opacity based on scroll position
  const opacity = useTransform(
    scrollY,
    [startScroll, midScroll, elementTop + elementHeight / 2, endScroll],
    [0.5, 1, 1, 0.5],
  )

  // Transform blur based on scroll position
  const blurAmount = useTransform(
    scrollY,
    [startScroll, midScroll, elementTop + elementHeight / 2, endScroll],
    [4, 0, 0, 4],
  )

  // Calculate how "in view" the section is (0 to 1)
  const calculateProgress = () => {
    if (!elementHeight || !windowHeight) return 0

    const viewportBottom = scrollPosition + windowHeight
    const viewportTop = scrollPosition

    // How much of the section is in the viewport
    const visibleTop = Math.max(elementTop, viewportTop)
    const visibleBottom = Math.min(elementTop + elementHeight, viewportBottom)

    // If not in view at all
    if (visibleBottom <= visibleTop) return 0

    const visibleHeight = visibleBottom - visibleTop
    const maxVisibleHeight = Math.min(elementHeight, windowHeight)

    return Math.min(visibleHeight / maxVisibleHeight, 1)
  }

  // Additional transform for scale effect
  const scale = useTransform(
    scrollY,
    [startScroll, midScroll, elementTop + elementHeight / 2, endScroll],
    [0.95, 1.05, 1.05, 0.95],
  )

  return (
    <div id={id} ref={sectionRef} className={cn("relative overflow-hidden transition-all duration-300", className)}>
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${from} ${to} -z-10 rounded-3xl`}
        style={{
          height,
          opacity,
          scale,
          filter: blurAmount.get() > 0 ? `blur(${blurAmount.get()}px)` : "none",
          transformOrigin: "center center",
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
          restDelta: 0.001,
        }}
      />
      {children}
    </div>
  )
}
