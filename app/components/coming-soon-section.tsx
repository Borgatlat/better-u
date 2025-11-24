"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Sparkles, AppleIcon, TrendingUp, Users, Target } from "lucide-react"
import { AppStoreButton } from "./app-store-button"

export function ComingSoonSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001420]/50 to-black" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f2fe] rounded-full filter blur-[150px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00b4ff] rounded-full filter blur-[150px] opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.25, 0.15, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-8 relative"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-[#00f2fe] blur-2xl opacity-40 rounded-full" />
            <div className="relative bg-gradient-to-br from-[#00f2fe]/20 to-[#00b4ff]/20 p-6 rounded-2xl border border-[#00f2fe]/30 backdrop-blur-xl">
              <Sparkles className="w-12 h-12 text-[#00f2fe]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                Download{" "}
              </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#00f2fe] via-[#00d4ff] to-[#00b4ff] bg-clip-text text-transparent animate-gradient">
                  BetterU AI
                </span>
                <motion.span
                  className="absolute -inset-4 bg-[#00f2fe] blur-3xl opacity-20"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                Today
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-300/90 max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            BetterU AI is now officially available on the App Store. Start your personalized self-improvement journey
            with AI-powered coaching, custom workouts, and mental wellness support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#00f2fe]/10 to-[#00b4ff]/10 border border-[#00f2fe]/20 backdrop-blur-xl">
              <div className="w-3 h-3 rounded-full bg-[#00f2fe] animate-pulse" />
              <AppleIcon className="h-5 w-5 text-[#00f2fe]" />
              <span className="text-base font-semibold text-white">Available Now on iOS</span>
            </div>

            <AppStoreButton
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black hover:text-white text-lg px-10 py-6 shadow-2xl shadow-[#00f2fe]/30"
              text="Download on App Store"
            />

            <p className="text-sm text-gray-400">Join thousands improving their lives daily</p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "Personalized AI Coaching",
              description: "Get tailored guidance based on your unique goals and preferences with real-time adaptation",
              icon: Target,
              gradient: "from-[#00f2fe]/10 to-[#00b4ff]/10",
            },
            {
              title: "Advanced Progress Tracking",
              description:
                "Monitor your improvement journey with detailed analytics, insights, and milestone celebrations",
              icon: TrendingUp,
              gradient: "from-[#00b4ff]/10 to-[#0090ff]/10",
            },
            {
              title: "Vibrant Community",
              description: "Connect with others on similar self-improvement journeys and share your achievements",
              icon: Users,
              gradient: "from-[#0090ff]/10 to-[#00f2fe]/10",
            },
          ].map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

                <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#00f2fe]/40 transition-all duration-500 h-full">
                  {/* Icon container */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} border border-[#00f2fe]/20 mb-6 relative overflow-hidden`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/20 to-transparent" />
                    <IconComponent className="w-8 h-8 text-[#00f2fe] relative z-10" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#00f2fe] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
