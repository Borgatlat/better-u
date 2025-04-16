"use client"

import { useRef, useState, useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import { Hero3D } from "./components/hero-3d"
import { FeatureShowcase } from "./components/feature-showcase"
import { motion, useScroll } from "framer-motion"
import { AppleStyleDivider } from "./components/apple-style-divider"
import { ComingSoonSection } from "./components/coming-soon-section"
import { getWaitlistCount } from "./actions/waitlist"

export default function Home() {
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { scrollY } = useScroll()

  const [waitlistCount, setWaitlistCount] = useState(0)

  useEffect(() => {
    getWaitlistCount().then((count) => setWaitlistCount(count))
  }, [])

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BetterU AI",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    description:
      "Your personal AI companion for complete self-improvement across facial enhancement, fitness, mental wellness, and smart shopping.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="bg-black text-white overflow-hidden">
        {/* Hero Section */}
        <Hero3D />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Divider */}
        <AppleStyleDivider />

        {/* Coming Soon Section (instead of testimonials) */}
        <ComingSoonSection />

        {/* Divider */}
        <AppleStyleDivider />

        {/* Values Section */}
        <section ref={(el) => (sectionsRef.current["values"] = el)} className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001a1a]/20 to-black" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
                Our Jesuit-Inspired Values
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The principles that guide our mission and vision
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Brotherhood */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative overflow-hidden group hover:border-[#00f2fe]/30 transition-colors"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#00f2fe] rounded-full filter blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity" />

                <div className="relative z-10">
                  <div className="bg-[#00f2fe]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-[#00f2fe]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 20V10M12 20V4M6 20V14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Brotherhood</h3>
                  <p className="text-gray-300">
                    We foster a community built on mutual respect, support, and genuine care for one another's wellbeing
                    and growth. Our technology brings people together rather than isolating them, creating meaningful
                    connections that enhance the self-improvement journey.
                  </p>
                </div>
              </motion.div>

              {/* Open to Growth */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative overflow-hidden group hover:border-[#00f2fe]/30 transition-colors"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#00f2fe] rounded-full filter blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity" />

                <div className="relative z-10">
                  <div className="bg-[#00f2fe]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-[#00f2fe]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Open to Growth</h3>
                  <p className="text-gray-300">
                    We embrace continuous learning, adaptation, and evolution in our pursuit of excellence and service
                    to others. Our AI constantly improves to better understand and meet the unique needs of each
                    individual, just as we encourage our users to remain open to their own growth potential.
                  </p>
                </div>
              </motion.div>

              {/* Loving */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative overflow-hidden group hover:border-[#00f2fe]/30 transition-colors"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#00f2fe] rounded-full filter blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity" />

                <div className="relative z-10">
                  <div className="bg-[#00f2fe]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-[#00f2fe]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19.5 12.5719L12 19.9999L4.5 12.5719C3.33579 11.4281 2.5 9.83311 2.5 7.99992C2.5 4.85698 5.05701 2.33325 8.2 2.33325C9.87389 2.33325 11.3872 3.04103 12.4373 4.16601C12.4623 4.19291 12.4866 4.22001 12.5103 4.24731C12.5439 4.21251 12.5788 4.17841 12.615 4.14501C13.6707 3.02851 15.1846 2.33325 16.85 2.33325C19.993 2.33325 22.55 4.85698 22.55 7.99992C22.55 9.83311 21.7142 11.4281 20.55 12.5719L19.5 12.5719Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Loving</h3>
                  <p className="text-gray-300">
                    We approach our work and relationships with compassion, empathy, and a genuine desire to help others
                    flourish. Our technology is designed with care and understanding, recognizing the dignity and worth
                    of every person who uses our platform.
                  </p>
                </div>
              </motion.div>

              {/* Committed to Justice */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative overflow-hidden group hover:border-[#00f2fe]/30 transition-colors"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#00f2fe] rounded-full filter blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity" />

                <div className="relative z-10">
                  <div className="bg-[#00f2fe]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-[#00f2fe]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 2 12C2 6.47715 6.47715 2 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Committed to Justice</h3>
                  <p className="text-gray-300">
                    We strive to create technology that promotes fairness, accessibility, and equal opportunity for all
                    people. We are committed to addressing biases in AI and ensuring our platform serves diverse
                    populations with equity and respect.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Toaster />
    </>
  )
}
