"use client"

import { useRef, useState, useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import { Hero3D } from "./components/hero-3d"
import { FeatureShowcase } from "./components/feature-showcase"
import { useScroll } from "framer-motion"
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
      </main>
      <Toaster />
    </>
  )
}
