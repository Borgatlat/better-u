"use client"

import { motion } from "framer-motion"
import { Sparkles, Check } from "lucide-react"

export function AppStoreLaunchBanner() {
  const handleDownload = () => {
    window.open("https://apps.apple.com/us/app/betteru-social-fitness/id6744857930", "_blank", "noopener,noreferrer")
  }

  const features = [
    "AI-powered workout generation",
    "Personalized mental wellness guidance",
    "Real-time progress tracking",
    "Vibrant community support",
    "Achieve your goals faster",
  ]

  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,242,254,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,rgba(0,180,255,0.08),transparent)]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />

      <div className="container relative z-10 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
            <Sparkles className="h-4 w-4 text-[#00f2fe]" />
            <span className="text-xs font-semibold text-white tracking-wider uppercase">Now Available</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
          >
            <span className="block text-white/90">Start Your Journey</span>
            <span className="block mt-2 bg-gradient-to-r from-[#00f2fe] via-[#00d4ff] to-[#00b4ff] bg-clip-text text-transparent">
              Download BetterU AI
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transform your fitness and mental wellness with AI-powered personalized coaching. Available now on iOS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-6 mb-16"
          >
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-semibold text-lg transition-all duration-300 hover:bg-white/95 shadow-2xl shadow-white/10"
            >
              <svg viewBox="0 0 384 512" className="h-7 w-7" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.5-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-medium tracking-wide uppercase opacity-70">Download on the</span>
                <span className="text-xl font-bold -mt-0.5">App Store</span>
              </div>
            </motion.button>

            <p className="text-sm text-white/30">Join thousands transforming their lives daily</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:border-white/[0.1] transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#00f2fe]" strokeWidth={3} />
                </div>
                <span className="text-sm text-white/70 font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
