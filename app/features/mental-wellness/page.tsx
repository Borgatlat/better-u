import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"
import { AppStoreButton } from "@/app/components/app-store-button"
import { Brain, Wind, Moon, Droplet, Heart, LineChart, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Mental Wellness | BetterU AI",
  description:
    "AI-guided meditation, breathing exercises, mood tracking, and emotional support for your mental well-being.",
}

const features = [
  {
    icon: Wind,
    title: "Breathing Exercises",
    description: "Calm your mind with guided breathing techniques designed to reduce stress.",
  },
  {
    icon: Moon,
    title: "Meditation",
    description: "Find peace with guided meditation sessions tailored to your needs.",
  },
  {
    icon: Droplet,
    title: "Stress Relief",
    description: "Quick exercises and techniques to reduce stress and anxiety instantly.",
  },
  {
    icon: Heart,
    title: "Mood Tracking",
    description: "Track your emotional well-being and identify patterns over time.",
  },
  {
    icon: LineChart,
    title: "Mood Analytics",
    description: "Visualize your emotional journey with detailed insights and trends.",
  },
  {
    icon: Brain,
    title: "AI Support",
    description: "Get personalized recommendations based on your mental state.",
  },
]

export default function MentalWellnessPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.03] via-transparent to-transparent" />

        <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-medium">Mental Wellness</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
                Your Mind
                <br />
                <span className="text-white/60">Deserves Care Too</span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg">
                Find peace, reduce stress, and improve your emotional well-being with AI-guided meditation, breathing
                exercises, and mood tracking.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <AppStoreButton variant="hero" />
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white/80 hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-12 bg-gradient-to-br from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-3xl" />

                {/* Phone frame */}
                <div className="relative bg-black rounded-[48px] p-2.5 shadow-2xl border border-white/10">
                  <div className="relative rounded-[38px] overflow-hidden bg-black">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-28 h-7 bg-black rounded-b-2xl" />
                    <Image
                      src="/images/mental-eleos-chat.png"
                      alt="BetterU AI Eleos Mental Health Companion"
                      width={320}
                      height={640}
                      className="w-[320px] h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">Tools for Inner Peace</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Comprehensive features designed to support your mental health journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-screen-xl mx-auto px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-white/[0.06] p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                Begin Your Wellness Journey
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Download BetterU AI and start building better mental health habits today.
              </p>
              <AppStoreButton variant="hero" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
