"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Sparkles, Target, TrendingUp, Users } from "lucide-react"
import { AppStoreButton } from "./app-store-button"

export function ComingSoonSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  const features = [
    {
      title: "Personalized AI Coaching",
      description: "Get tailored guidance based on your unique goals with real-time adaptation",
      icon: Target,
    },
    {
      title: "Advanced Progress Tracking",
      description: "Monitor your journey with detailed analytics and milestone celebrations",
      icon: TrendingUp,
    },
    {
      title: "Vibrant Community",
      description: "Connect with others on similar journeys and share achievements",
      icon: Users,
    },
  ]

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00f2fe]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-8"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <Sparkles className="w-8 h-8 text-[#00f2fe]" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            <span className="text-white">Download </span>
            <span className="text-gradient">BetterU</span>
            <br />
            <span className="text-white/60">Today</span>
          </h2>

          <p className="text-lg text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed">
            Now available on the App Store. Start your personalized self-improvement journey with AI-powered coaching.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
              <span className="text-sm font-medium text-white/60">Available Now on iOS</span>
            </div>

            <AppStoreButton variant="hero" text="Download on App Store" />

            <p className="text-sm text-white/30 mt-2">Join thousands improving daily</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06] hover:border-white/[0.1] transition-all duration-500 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6 group-hover:border-[#00f2fe]/20 transition-colors">
                    <IconComponent className="w-5 h-5 text-white/60 group-hover:text-[#00f2fe] transition-colors" />
                  </div>

                  <h3 className="text-lg font-medium mb-3 text-white group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
