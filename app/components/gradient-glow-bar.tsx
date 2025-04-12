"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface GradientGlowBarProps {
  className?: string
}

export function GradientGlowBar({ className }: GradientGlowBarProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
    rootMargin: "-100px 0px",
  })

  return (
    <div className={cn("w-full py-12 overflow-hidden", className)} ref={ref}>
      <motion.div
        className="relative h-[2px] w-full max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
      >
        {/* Base line */}
        <div className="absolute inset-0 bg-blue-950/30" />

        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-900 via-[#00b4ff] to-[#00f2fe]"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Blur overlay */}
        <div className="absolute inset-0 blur-[4px] bg-gradient-to-r from-blue-900 via-[#00b4ff] to-[#00f2fe] opacity-70" />

        {/* Center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#00f2fe] blur-[32px] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>
    </div>
  )
}
