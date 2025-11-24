"use client"

import { motion } from "framer-motion"
import { AppleIcon, Sparkles, Download, Dumbbell, Brain, Target } from "lucide-react"

export function AppStoreLaunchBanner() {
  const handleDownload = () => {
    window.open("https://apps.apple.com/us/app/betteru-social-fitness/id6744857930", "_blank", "noopener,noreferrer")
  }

  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001420]/60 to-black" />

      {/* Animated gradient meshes */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(0,242,254,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(0,180,255,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(0,242,254,0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating geometric shapes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(135deg, rgba(0,242,254,${Math.random() * 0.5 + 0.2}), rgba(0,180,255,${Math.random() * 0.5 + 0.2}))`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(0,242,254,0.02)_1.5px,transparent_1.5px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,black,transparent)]" />

      <div className="container relative z-10 px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex justify-center mb-12"
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#00f2fe] via-[#00b4ff] to-[#00f2fe] rounded-full opacity-60 blur-lg"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <div className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black/80 border border-[#00f2fe]/40 backdrop-blur-2xl">
                <div className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
                <Sparkles className="h-5 w-5 text-[#00f2fe]" />
                <span className="text-sm font-bold text-white tracking-wide">NOW AVAILABLE ON APP STORE</span>
                <Sparkles className="h-5 w-5 text-[#00f2fe]" />
                <div className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
              </div>
            </div>
          </motion.div>

          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
            >
              <span className="block mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Download
              </span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00f2fe] via-[#00d4ff] to-[#00b4ff] bg-clip-text text-transparent">
                  BetterU AI
                </span>
                <motion.span
                  className="absolute inset-0 bg-[#00f2fe] blur-[60px] opacity-40"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </span>
              <span className="block mt-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Today
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-3xl text-gray-300/90 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Start your AI-powered self-improvement journey.{" "}
              <span className="text-[#00f2fe] font-semibold">Available now</span> on the App Store for iPhone and iPad.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
            >
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-14 py-6 rounded-2xl font-bold text-xl bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black overflow-hidden shadow-2xl shadow-[#00f2fe]/40 hover:shadow-[#00f2fe]/60 transition-all duration-300"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                />
                <span className="relative flex items-center gap-3">
                  <AppleIcon className="h-7 w-7" />
                  <span>Download on App Store</span>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Download className="h-6 w-6" />
                  </motion.div>
                </span>
              </motion.button>

              <a
                href="https://apps.apple.com/us/app/betteru-social-fitness/id6744857930"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-[#00f2fe] hover:text-[#00b4ff] font-semibold text-lg transition-colors inline-flex items-center gap-2"
              >
                <span>View on App Store</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-sm"
            >
              Join thousands transforming their lives with AI-powered guidance
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              {
                icon: Dumbbell,
                title: "Gym & Fitness",
                description: "AI-powered custom workouts tailored to your goals and fitness level",
                gradient: "from-[#00f2fe]/10 via-[#00d4ff]/10 to-[#00b4ff]/10",
              },
              {
                icon: Brain,
                title: "Mental Wellness",
                description: "Guided meditation, mindfulness, and mental health support",
                gradient: "from-[#00b4ff]/10 via-[#0090ff]/10 to-[#00f2fe]/10",
              },
              {
                icon: Target,
                title: "Smart Goals",
                description: "Track your progress in real-time with intelligent insights",
                gradient: "from-[#00f2fe]/10 via-[#00b4ff]/10 to-[#0090ff]/10",
              },
            ].map((feature, i) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="relative group"
                >
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] rounded-3xl opacity-0 blur-xl transition-opacity duration-500"
                    whileHover={{ opacity: 0.4 }}
                  />

                  <div className="relative bg-black/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-[#00f2fe]/50 transition-all duration-500 h-full">
                    {/* Icon container with gradient background */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-[#00f2fe]/30 mb-6 relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/30 via-transparent to-transparent" />
                      <IconComponent className="w-10 h-10 text-[#00f2fe] relative z-10" strokeWidth={1.5} />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00f2fe] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-base">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
