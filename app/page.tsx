"use client"

import { useRef } from "react"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import { HeroSection } from "./components/hero-section"
import { FeatureShowcase } from "./components/feature-showcase"
import { useScroll } from "framer-motion"
import { AppleStyleDivider } from "./components/apple-style-divider"
import { AppStoreLaunchBanner } from "./components/app-store-launch-banner"
import { MultiRowCarousel } from "./components/carousel/multi-row-carousel"

export default function Home() {
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { scrollY } = useScroll()

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BetterU AI",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    description:
      "Your personal AI companion for complete self-improvement across fitness, mental wellness, and personal growth.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "100",
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
        <HeroSection />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Divider */}
        <AppleStyleDivider />

        {/* Multi-Row Carousel */}
        <MultiRowCarousel />

        {/* Divider */}
        <AppleStyleDivider />

        <AppStoreLaunchBanner />
      </main>
      <Toaster />
    </>
  )
}
