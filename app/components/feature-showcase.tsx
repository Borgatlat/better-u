"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { FEATURE_SHOWCASE } from "@/lib/constants"
import { Dumbbell, Brain, ShoppingBag, Users, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  // Auto-rotate features
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % FEATURE_SHOWCASE.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isInView])

  // Get icon based on feature index
  const getFeatureIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-6 h-6" />
      case 1:
        return <Dumbbell className="w-6 h-6" />
      case 2:
        return <Brain className="w-6 h-6" />
      case 3:
        return <ShoppingBag className="w-6 h-6" />
      default:
        return <Users className="w-6 h-6" />
    }
  }

  return (
    <div ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001a1a] to-black opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
            Transform Every Aspect of Your Life
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform helps you improve in four key areas, guided by Jesuit-inspired values
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature selector */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {FEATURE_SHOWCASE.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  "p-6 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group",
                  activeFeature === index
                    ? "bg-white/10 backdrop-blur-sm border border-[#00f2fe]/30"
                    : "bg-black/20 hover:bg-black/40 border border-white/5",
                )}
                onClick={() => setActiveFeature(index)}
                whileHover={{ x: 5 }}
              >
                {/* Active indicator */}
                {activeFeature === index && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f2fe]"
                    layoutId="activeFeatureIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "p-3 rounded-lg transition-colors",
                      activeFeature === index
                        ? "bg-[#00f2fe]/20 text-[#00f2fe]"
                        : "bg-white/5 text-gray-400 group-hover:text-white",
                    )}
                  >
                    {getFeatureIcon(index)}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3
                        className={cn(
                          "font-bold text-xl transition-colors",
                          activeFeature === index ? "text-white" : "text-gray-400 group-hover:text-white",
                        )}
                      >
                        {item.title}
                      </h3>
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 transition-transform",
                          activeFeature === index
                            ? "text-[#00f2fe] translate-x-0"
                            : "text-gray-500 -translate-x-2 group-hover:translate-x-0",
                        )}
                      />
                    </div>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature details */}
          <div className="relative h-[500px] bg-black/20 rounded-2xl border border-white/10 overflow-hidden">
            {/* Feature background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001a1a] to-black opacity-70" />

            {/* Feature content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 p-8 h-full flex flex-col"
              >
                <div className="mb-6">
                  <div className="inline-block p-3 rounded-lg bg-[#00f2fe]/20 text-[#00f2fe] mb-4">
                    {getFeatureIcon(activeFeature)}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{FEATURE_SHOWCASE[activeFeature].title}</h3>
                  <p className="text-gray-300">{FEATURE_SHOWCASE[activeFeature].description}</p>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto">
                  {FEATURE_SHOWCASE[activeFeature].features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                    >
                      <h4 className="font-semibold text-[#00f2fe] mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00f2fe] rounded-full filter blur-[100px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00f2fe] rounded-full filter blur-[100px] opacity-10" />
          </div>
        </div>
      </div>
    </div>
  )
}
