"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
}

export function FloatingElement({ children, className, delay = 0, duration = 6, yOffset = 20 }: FloatingElementProps) {
  return (
    <motion.div
      className={cn("", className)}
      animate={{
        y: [`-${yOffset / 2}px`, `${yOffset / 2}px`, `-${yOffset / 2}px`],
      }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  )
}
