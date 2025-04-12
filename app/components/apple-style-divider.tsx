"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRef, useEffect, useState } from "react"

export function AppleStyleDivider() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
    rootMargin: "-100px 0px",
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Track if the animation has played once
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  return (
    <div
      ref={(el) => {
        // @ts-ignore - combine refs
        containerRef.current = el
        // @ts-ignore
        ref(el)
      }}
      className="w-full h-32 relative overflow-hidden my-12"
      aria-hidden="true"
    >
      {/* Main horizontal line */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl h-[1px] bg-blue-900/30"
        initial={{ opacity: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 h-[1px] bg-gradient-to-r from-blue-900 via-[#00b4ff] to-[#00f2fe]"
          initial={{ x: "-100%" }}
          animate={{
            x: inView && hasAnimated ? "100%" : "-100%",
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: 0,
          }}
        />

        {/* Blur effect overlay */}
        <motion.div
          className="absolute inset-0 h-[8px] top-[-3.5px] bg-gradient-to-r from-blue-900 via-[#00b4ff] to-[#00f2fe] blur-[4px] opacity-60"
          initial={{ x: "-100%" }}
          animate={{
            x: inView && hasAnimated ? "100%" : "-100%",
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: 0,
          }}
        />
      </motion.div>

      {/* Center glow point */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: inView ? [0, 0.7, 0] : 0,
          scale: inView ? [0.8, 1.2, 0.8] : 0.8,
        }}
        transition={{
          duration: 2,
          times: [0, 0.5, 1],
          ease: "easeInOut",
          repeat: 0,
        }}
      >
        <div className="w-40 h-40 rounded-full bg-[#00f2fe] blur-[40px] opacity-30" />
      </motion.div>

      {/* Subtle dot markers */}
      <motion.div
        className="absolute top-1/2 left-[20%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00f2fe]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />

      <motion.div
        className="absolute top-1/2 right-[20%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00f2fe]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
    </div>
  )
}
