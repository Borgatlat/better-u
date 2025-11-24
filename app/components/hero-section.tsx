"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AppStoreButton } from "./app-store-button"
import { useInView } from "react-intersection-observer"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToNextSection = () => {
    const viewportHeight = window.innerHeight
    window.scrollTo({
      top: viewportHeight,
      behavior: "smooth",
    })
  }

  const rotateX = isMounted ? mousePosition.y * -0.01 : 0
  const rotateY = isMounted ? mousePosition.x * 0.01 : 0

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  const y = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#00f2fe] opacity-20 blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-radial from-[#003333]/40 via-black to-black" />

      <motion.div
        ref={ref}
        className="container relative z-10 px-4 md:px-6 text-center"
        style={{
          y,
          opacity,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Life with{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
                BetterU AI
              </span>
              <motion.span
                className="absolute -inset-1 rounded-lg opacity-30 blur-xl bg-[#00f2fe]"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Your personal AI companion for complete self-improvement across all aspects of your life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 100 }}
            className="relative flex justify-center mb-8"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
          >
            <AppStoreButton size="large" showBadge />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-gray-400 font-medium">
              Join thousands improving their lives daily • Free to download
            </p>
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-[#00f2fe]">✓</span>
                <span>AI-Powered Workouts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#00f2fe]">✓</span>
                <span>Mental Wellness</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#00f2fe]">✓</span>
                <span>Smart Goals</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <motion.button
        onClick={scrollToNextSection}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer p-3 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00f2fe]/50 focus:ring-offset-2 focus:ring-offset-black"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        aria-label="Scroll down to next section"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 5L12 19M12 19L6 13M12 19L18 13"
            stroke="#00f2fe"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </div>
  )
}
