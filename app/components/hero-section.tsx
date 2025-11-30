"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AppStoreButton } from "./app-store-button"
import { useInView } from "react-intersection-observer"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToNextSection = () => {
    const viewportHeight = window.innerHeight
    window.scrollTo({
      top: viewportHeight,
      behavior: "smooth",
    })
  }

  const y = useTransform(scrollY, [0, 500], [0, -80])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const features = ["AI-Powered Workouts", "Mental Wellness", "Progress Tracking"]

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0">
        {/* Primary gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#050505]" />

        {/* Subtle cyan accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#00f2fe]/[0.04] rounded-full blur-[150px]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        ref={ref}
        className="container relative z-10 px-6 text-center max-w-4xl mx-auto"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-10"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2fe] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00f2fe]"></span>
              </span>
              <span className="text-xs font-medium text-white/60 tracking-wide">Now Available on iOS</span>
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 leading-[1.05] tracking-tight">
            <span className="text-white">Transform Your Life</span>
            <br />
            <span className="text-white">with </span>
            <span className="text-gradient">BetterU</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base md:text-lg text-white/40 mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Your personal AI companion for complete self-improvement across fitness and mental wellness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <AppStoreButton variant="hero" text="Download on App Store" />

            <p className="text-sm text-white/30">Join thousands improving daily</p>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />

      <motion.button
        onClick={scrollToNextSection}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group focus:outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] font-medium text-white/30 uppercase tracking-[0.2em] group-hover:text-white/50 transition-colors">
          Explore
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5 group-hover:border-white/20 transition-colors"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <motion.div
            className="w-0.5 h-1.5 bg-white/30 rounded-full group-hover:bg-white/50 transition-colors"
            animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.button>
    </div>
  )
}
