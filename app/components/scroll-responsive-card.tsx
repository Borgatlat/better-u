"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollResponsiveCardProps {
  children: ReactNode
  className?: string
  minHeight?: string
  maxHeight?: string
  bgFrom?: string
  bgTo?: string
  id?: string
}

export function ScrollResponsiveCard({
  children,
  className,
  minHeight = "40vh",
  maxHeight = "70vh",
  bgFrom = "from-[#003333]",
  bgTo = "to-black",
  id,
}: ScrollResponsiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  const { scrollY } = useScroll()

  // Update measurements on mount and resize
  useEffect(() => {
    const updateMeasurements = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setElementTop(window.scrollY + rect.top)
        setElementHeight(rect.height)
        setWindowHeight(window.innerHeight)
      }
    }

    updateMeasurements()
    window.addEventListener("resize", updateMeasurements)

    // Use a passive scroll listener for better performance
    const handleScroll = () => {
      requestAnimationFrame(updateMeasurements)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("resize", updateMeasurements)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Calculate the range for the animation
  const startScroll = elementTop - windowHeight
  const midScroll = elementTop - windowHeight / 3
  const endScroll = elementTop + elementHeight

  // Transform height based on scroll position
  const height = useTransform(
    scrollY,
    [startScroll, midScroll, elementTop + elementHeight / 2, endScroll],
    [minHeight, maxHeight, maxHeight, minHeight],
  )

  // Transform opacity based on scroll position
  const opacity = useTransform(
    scrollY,
    [startScroll, midScroll, elementTop + elementHeight / 2, endScroll],
    [0.7, 1, 1, 0.7],
  )

  // Transform blur based on scroll position
  const blurAmount = useTransform(
    scrollY,
    [startScroll, midScroll, elementTop + elementHeight / 2, endScroll],
    [2, 0, 0, 2],
  )

  // Transform scale based on scroll position
  const scale = useTransform(
    scrollY,
    [startScroll, midScroll, elementTop + elementHeight / 2, endScroll],
    [0.98, 1.02, 1.02, 0.98],
  )

  return (
    <motion.div
      id={id}
      ref={cardRef}
      className={cn("relative overflow-hidden rounded-3xl transition-all", className)}
      style={{
        opacity,
        scale,
      }}
    >
      {/* Gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${bgFrom} ${bgTo} -z-10`}
        style={{
          height,
          filter: blurAmount.get() > 0 ? `blur(${blurAmount.get()}px)` : "none",
        }}
      />

      {/* Border glow */}
      <div className="absolute inset-0 rounded-3xl border border-[#00f2fe]/10" />

      {/* Content container */}
      <div className="relative z-10 h-full w-full p-6 flex flex-col justify-center">{children}</div>
    </motion.div>
  )
}
