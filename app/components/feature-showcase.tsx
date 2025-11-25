"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { FEATURE_SHOWCASE } from "@/lib/constants"
import { Dumbbell, Brain, Users, ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % FEATURE_SHOWCASE.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isInView])

  const getFeatureIcon = (index: number) => {
    const icons = [
      <Users key="users" className="w-5 h-5" />,
      <Dumbbell key="dumbbell" className="w-5 h-5" />,
      <Brain key="brain" className="w-5 h-5" />,
      <Sparkles key="sparkles" className="w-5 h-5" />,
    ]
    return icons[index] || icons[0]
  }

  return (
    <section ref={containerRef} className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00f2fe] text-sm font-medium tracking-widest uppercase mb-4">Features</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
            Transform Every Aspect
            <br />
            <span className="text-white/60">of Your Life</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Our AI-powered platform helps you improve across key areas, guided by proven methodologies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {FEATURE_SHOWCASE.map((item, index) => (
              <motion.button
                key={index}
                className={cn(
                  "w-full p-5 rounded-xl text-left transition-all duration-300 relative group",
                  activeFeature === index
                    ? "bg-white/[0.06] border border-white/[0.1]"
                    : "bg-transparent border border-transparent hover:bg-white/[0.03]",
                )}
                onClick={() => setActiveFeature(index)}
                whileHover={{ x: 4 }}
              >
                {activeFeature === index && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[#00f2fe] rounded-full"
                    layoutId="activeIndicator"
                  />
                )}

                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "p-2.5 rounded-lg transition-colors",
                      activeFeature === index
                        ? "bg-[#00f2fe]/10 text-[#00f2fe]"
                        : "bg-white/[0.04] text-white/40 group-hover:text-white/60",
                    )}
                  >
                    {getFeatureIcon(index)}
                  </div>

                  <div className="flex-1">
                    <h3
                      className={cn(
                        "font-medium text-base transition-colors",
                        activeFeature === index ? "text-white" : "text-white/60 group-hover:text-white/80",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-sm mt-0.5 line-clamp-1">{item.description}</p>
                  </div>

                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-all",
                      activeFeature === index
                        ? "text-[#00f2fe] translate-x-0"
                        : "text-white/20 -translate-x-1 group-hover:translate-x-0",
                    )}
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>

          <div className="relative h-[480px] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/[0.03] to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 p-8 h-full flex flex-col"
              >
                <div className="mb-6">
                  <div className="inline-flex p-2.5 rounded-xl bg-[#00f2fe]/10 text-[#00f2fe] mb-4">
                    {getFeatureIcon(activeFeature)}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{FEATURE_SHOWCASE[activeFeature].title}</h3>
                  <p className="text-white/50 text-sm">{FEATURE_SHOWCASE[activeFeature].description}</p>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-auto">
                  {FEATURE_SHOWCASE[activeFeature].features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]"
                    >
                      <h4 className="font-medium text-sm text-white mb-1">{feature.title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
