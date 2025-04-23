"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { WaitlistForm } from "./waitlist-form"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { getWaitlistCount } from "../actions/waitlist"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  // Add state for waitlist count
  const [waitlistCount, setWaitlistCount] = useState(0)

  // Fetch the actual waitlist count
  useEffect(() => {
    getWaitlistCount().then((count) => setWaitlistCount(count))
  }, [])

  // Handle mouse movement for subtle effect
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

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    // Get the height of the viewport
    const viewportHeight = window.innerHeight

    // Scroll down one viewport height with smooth behavior
    window.scrollTo({
      top: viewportHeight,
      behavior: "smooth",
    })
  }

  // Calculate subtle rotation based on mouse position
  const rotateX = isMounted ? mousePosition.y * -0.01 : 0
  const rotateY = isMounted ? mousePosition.x * 0.01 : 0

  // Particles for background effect
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
      {/* Animated background particles */}
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

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#003333]/40 via-black to-black" />

      {/* 3D rotating container */}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
          >
            <div className="max-w-md mx-auto relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] rounded-xl blur-lg opacity-30" />
              <div className="relative bg-black/60 backdrop-blur-xl p-1 rounded-xl border border-white/10">
                <WaitlistForm />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-xs font-semibold",
                      i === 0
                        ? "bg-purple-600 text-white"
                        : i === 1
                          ? "bg-blue-600 text-white"
                          : "bg-blue-700 text-white",
                    )}
                  >
                    {i === 0 ? "LB" : i === 1 ? "DJ" : "JM"}
                  </div>
                ))}
              </div>
              <p className="text-gray-300">
                <span className="font-semibold text-white">{waitlistCount}</span> people on the waitlist
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Scroll down button */}
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
