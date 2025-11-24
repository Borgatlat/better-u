"use client"

import { motion } from "framer-motion"
import { AppleIcon, Sparkles, Download } from "lucide-react"

export function AppStoreLaunchBanner() {
  const handleDownload = () => {
    window.open("https://apps.apple.com/us/app/betteru-social-fitness/id6744857930", "_blank", "noopener,noreferrer")
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-[#00f2fe]/20 via-transparent to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#00f2fe]/10 via-[#00b4ff]/10 to-[#00f2fe]/10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 200%" }}
        />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#00f2fe]"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00f2fe]/20 to-[#00b4ff]/20 border border-[#00f2fe]/30 backdrop-blur-xl">
              <Sparkles className="h-5 w-5 text-[#00f2fe]" />
              <span className="text-sm font-semibold text-white">Now Available on App Store</span>
            </div>
          </motion.div>

          {/* Main content */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Download </span>
              <span className="relative">
                <span className="bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
                  BetterU AI
                </span>
                <motion.span
                  className="absolute -inset-2 rounded-lg opacity-30 blur-2xl bg-[#00f2fe]"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Today</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Start your AI-powered self-improvement journey. Available now on the App Store for iPhone and iPad.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black overflow-hidden shadow-2xl shadow-[#00f2fe]/30 hover:shadow-[#00f2fe]/50 transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  style={{ opacity: 0.2 }}
                />
                <span className="relative flex items-center space-x-3">
                  <AppleIcon className="h-6 w-6" />
                  <span>Download on App Store</span>
                  <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                </span>
              </motion.button>

              <a
                href="https://apps.apple.com/us/app/betteru-social-fitness/id6744857930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00f2fe] hover:text-[#00b4ff] font-semibold underline underline-offset-4 transition-colors"
              >
                View on App Store →
              </a>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              {
                icon: "🏋️",
                title: "Gym & Fitness",
                description: "AI-powered custom workouts",
              },
              {
                icon: "🧘",
                title: "Mental Wellness",
                description: "Guided meditation & mindfulness",
              },
              {
                icon: "🎯",
                title: "Smart Goals",
                description: "Track your progress in real-time",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#00f2fe]/30 transition-colors">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
