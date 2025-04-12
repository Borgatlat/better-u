"use client"

import { WaitlistForm } from "./components/waitlist-form"
import { NAVIGATION } from "./lib/constants"
import { useRef } from "react"
import { ArrowDown, Dumbbell, Brain, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { motion, useScroll } from "framer-motion"
import { AppleStyleDivider } from "./components/apple-style-divider"
import { FloatingElement } from "./components/floating-element"
import { FeatureCard } from "./components/feature-card"
import { AnimatedLogo } from "./components/animated-logo"
import Script from "next/script"

export default function Home() {
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { scrollY } = useScroll()

  const scrollToSection = (sectionId: string) => {
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: "smooth" })
  }

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1024",
    },
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="bg-black text-white">
        {/* Hero Section - Add padding-top to account for the fixed header and safe area */}
        <section
          className="relative min-h-screen flex items-center justify-center gradient-bg pt-14 md:pt-20"
          aria-labelledby="hero-heading"
        >
          <div className="container px-4 md:px-6 space-y-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h1
                id="hero-heading"
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none mt-safe-top"
              >
                Transform Your Life with
                <FloatingElement delay={0.5} duration={8} yOffset={10}>
                  <motion.span
                    className="block bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    BetterU AI
                  </motion.span>
                </FloatingElement>
              </h1>

              {/* Logo positioned professionally with proper spacing */}
              <div className="mt-8 mb-12 flex justify-center items-center">
                <AnimatedLogo className="mx-auto" minSize={140} maxSize={200} />
              </div>
            </motion.div>

            <motion.p
              className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your personal AI companion for complete self-improvement. Join thousands transforming their lives with our
              revolutionary platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full max-w-sm mx-auto"
            >
              <WaitlistForm onSuccess={() => {}} />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}>
              <Button
                variant="ghost"
                size="lg"
                className="animate-bounce mt-8"
                onClick={() => scrollToSection("features")}
                aria-label="Scroll to features section"
              >
                <ArrowDown className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section
          ref={(el) => (sectionsRef.current["features"] = el)}
          className="py-20 space-y-24"
          aria-labelledby="features-heading"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2
                id="features-heading"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent"
              >
                Transform Every Aspect of Your Life
              </h2>
              <p className="text-gray-400 md:text-xl max-w-3xl mx-auto">
                Our AI-powered platform helps you improve in four key areas
              </p>
            </div>

            <div className="space-y-32">
              {/* Feature Card 1 - Facial Enhancement */}
              <article>
                <FeatureCard
                  title="Facial Enhancement"
                  description="AI-powered analysis and recommendations for your complete facial care routine."
                  icon={<Sparkles className="w-6 h-6 text-[#00f2fe]" aria-hidden="true" />}
                  index={0}
                  features={NAVIGATION[0].features}
                />
              </article>

              {/* Feature Card 2 - Gym & Fitness */}
              <article>
                <FeatureCard
                  title="Gym & Fitness"
                  description="Personalized workout plans and nutrition tracking for optimal results."
                  icon={<Dumbbell className="w-6 h-6 text-[#00f2fe]" aria-hidden="true" />}
                  index={1}
                  features={NAVIGATION[1].features}
                />
              </article>

              {/* Feature Card 3 - Mental Wellness */}
              <article>
                <FeatureCard
                  title="Mental Wellness"
                  description="AI therapy, meditation guidance, and emotional support available 24/7."
                  icon={<Brain className="w-6 h-6 text-[#00f2fe]" aria-hidden="true" />}
                  index={2}
                  features={NAVIGATION[2].features}
                />
              </article>

              {/* Feature Card 4 - Smart Shop */}
              <article>
                <FeatureCard
                  title="Smart Shop"
                  description="Personalized product recommendations based on your unique needs and progress."
                  icon={<ShoppingBag className="w-6 h-6 text-[#00f2fe]" aria-hidden="true" />}
                  index={3}
                  features={NAVIGATION[3].features}
                />
              </article>
            </div>
          </div>
        </section>

        {/* Apple Style Gradient Divider */}
        <AppleStyleDivider />

        {/* Final CTA Section */}
        <section className="min-h-[50vh] flex items-center justify-center gradient-bg" aria-labelledby="cta-heading">
          <div className="container px-4 md:px-6 text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2
                id="cta-heading"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent"
              >
                Ready to Transform Your Life?
              </h2>
            </motion.div>

            <motion.p
              className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Join thousands of others already experiencing the future of self-improvement.
            </motion.p>

            <motion.div
              className="w-full max-w-sm mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <WaitlistForm onSuccess={() => {}} />
            </motion.div>
          </div>
        </section>
        <Toaster />
      </main>
    </>
  )
}
