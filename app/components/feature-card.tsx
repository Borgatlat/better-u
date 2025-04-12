"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ScrollResponsiveCard } from "./scroll-responsive-card"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index: number
  className?: string
  features: { title: string; description: string }[]
}

export function FeatureCard({ title, description, icon, index, className, features }: FeatureCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Calculate background colors based on index
  const getBgColors = () => {
    switch (index % 4) {
      case 0:
        return { from: "from-[#003333]", to: "to-black" }
      case 1:
        return { from: "from-[#002b47]", to: "to-black" }
      case 2:
        return { from: "from-[#003333]", to: "to-black" }
      case 3:
        return { from: "from-[#002b47]", to: "to-black" }
      default:
        return { from: "from-[#003333]", to: "to-black" }
    }
  }

  const { from, to } = getBgColors()

  return (
    <ScrollResponsiveCard
      className={cn("w-full mb-12", className)}
      minHeight="40vh"
      maxHeight="70vh"
      bgFrom={from}
      bgTo={to}
      id={`feature-card-${index}`}
    >
      <div ref={ref} className="space-y-6 text-center h-full flex flex-col justify-center">
        <motion.div
          className="bg-[#00f2fe]/10 w-fit p-3 rounded-lg mx-auto"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
          aria-hidden="true"
        >
          {icon}
        </motion.div>

        <motion.h3
          className="text-3xl font-bold bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-gray-400 md:text-lg max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="grid gap-4 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-3 text-left"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -10 }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
            >
              <div className="bg-[#00f2fe]/10 p-1.5 rounded-lg mt-1" aria-hidden="true">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#00f2fe]"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: idx * 0.2,
                  }}
                />
              </div>
              <div>
                <h4 className="font-semibold">
                  <span className="bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
                    {feature.title}
                  </span>
                </h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollResponsiveCard>
  )
}
