"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FEATURE_SHOWCASE } from "@/lib/constants"
import { Dumbbell, Brain, Users, ChevronRight, Check } from "lucide-react"
import Link from "next/link"

function FeatureSection({
  feature,
  index,
  accentColor,
}: {
  feature: (typeof FEATURE_SHOWCASE)[0]
  index: number
  accentColor: string
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  const icons = [
    <Dumbbell key="dumbbell" className="w-6 h-6" />,
    <Brain key="brain" className="w-6 h-6" />,
    <Users key="users" className="w-6 h-6" />,
  ]

  const isEven = index % 2 === 0

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center relative py-24 lg:py-32">
      {/* Background gradient based on feature */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 50% at ${isEven ? "20%" : "80%"} 50%, ${accentColor}08, transparent)`,
        }}
      />

      <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? "lg:grid-flow-dense" : ""}`}>
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : isEven ? -40 : 40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={!isEven ? "lg:col-start-2" : ""}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                {icons[index]}
              </div>
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: accentColor }}>
                {feature.title}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">
              {feature.title === "Gym & Fitness" && (
                <>
                  Train Smarter,
                  <br />
                  <span className="text-white/50">Not Harder</span>
                </>
              )}
              {feature.title === "Mental Wellness" && (
                <>
                  Find Your
                  <br />
                  <span className="text-white/50">Inner Peace</span>
                </>
              )}
              {feature.title === "Community" && (
                <>
                  Grow Together,
                  <br />
                  <span className="text-white/50">Achieve More</span>
                </>
              )}
            </h2>

            {/* Description */}
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">{feature.description}</p>

            {/* Feature List */}
            <div className="space-y-4 mb-10">
              {feature.features.slice(0, 4).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <Check className="w-3.5 h-3.5" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-white/40 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href={feature.href}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-medium text-black transition-all duration-300 hover:gap-4 hover:shadow-lg"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 30px ${accentColor}30`,
              }}
            >
              <span>Explore {feature.title}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Phone Mockup Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40, scale: 0.95 }}
            animate={{
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : isEven ? 40 : -40,
              scale: isInView ? 1 : 0.95,
            }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className={`relative flex justify-center ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}
          >
            {/* Glow effect behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full blur-3xl opacity-40" style={{ backgroundColor: accentColor }} />
            </div>

            {/* Phone Frame */}
            {feature.image ? (
              <div className="relative">
                {/* Outer phone frame */}
                <div className="relative bg-gradient-to-b from-white/20 to-white/5 rounded-[3rem] p-[3px]">
                  <div className="relative bg-black rounded-[2.8rem] p-2 shadow-2xl">
                    {/* Inner screen bezel */}
                    <div className="relative rounded-[2.4rem] overflow-hidden bg-black">
                      {/* Dynamic Island */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-24 h-7 bg-black rounded-full" />

                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={`${feature.title} app screenshot`}
                        width={280}
                        height={560}
                        className="w-[280px] h-auto object-cover"
                      />
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
                  </div>
                </div>

                {/* Reflection effect */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>
            ) : (
              /* Placeholder for features without images */
              <div className="relative bg-gradient-to-b from-white/20 to-white/5 rounded-[3rem] p-[3px]">
                <div className="relative bg-black rounded-[2.8rem] p-2 w-[288px] h-[580px] flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="inline-flex p-6 rounded-3xl mb-4"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {icons[index]}
                    </div>
                    <p className="text-white/40 text-sm">Screenshot Coming Soon</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}

export function FeatureShowcase() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.5 })

  const accentColors = ["#00f2fe", "#a855f7", "#10b981"]

  return (
    <div className="relative">
      {/* Section Header */}
      <section ref={headerRef} className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2fe]/[0.02] to-transparent" />

        <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHeaderInView ? 1 : 0, y: isHeaderInView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-[#00f2fe] text-sm font-medium tracking-widest uppercase mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
              Transform Every Aspect
              <br />
              <span className="text-white/50">of Your Life</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
              Our AI-powered platform helps you improve across fitness, mental wellness, and community connection.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* Full-Page Feature Sections */}
      {FEATURE_SHOWCASE.map((feature, index) => (
        <FeatureSection key={feature.title} feature={feature} index={index} accentColor={accentColors[index]} />
      ))}
    </div>
  )
}
