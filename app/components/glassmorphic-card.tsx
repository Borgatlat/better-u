"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  delay?: number
  index?: number
}

export function GlassmorphicCard({ children, className, delay = 0, index = 0 }: GlassmorphicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [inViewRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  // Transform scale based on scroll position
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95])

  // Transform opacity based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7])

  // Transform background gradient intensity
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1])

  // Calculate a unique delay based on index
  const animationDelay = delay + index * 0.1

  return (
    <motion.div
      ref={(el) => {
        // @ts-ignore - combine refs
        cardRef.current = el
        // @ts-ignore
        inViewRef(el)
      }}
      className={cn("relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 20,
      }}
      transition={{
        duration: 0.5,
        delay: animationDelay,
        ease: "easeOut",
      }}
      style={{
        scale,
        opacity,
      }}
    >
      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/20 to-transparent -z-10"
        style={{
          opacity: gradientOpacity,
        }}
      />

      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-[#00f2fe]/20"
        animate={{
          boxShadow: inView
            ? ["0 0 0px rgba(0, 242, 254, 0)", "0 0 15px rgba(0, 242, 254, 0.3)", "0 0 0px rgba(0, 242, 254, 0)"]
            : "0 0 0px rgba(0, 242, 254, 0)",
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {children}
    </motion.div>
  )
}
