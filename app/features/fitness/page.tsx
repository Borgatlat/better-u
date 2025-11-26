import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"
import { AppStoreButton } from "@/app/components/app-store-button"
import { Dumbbell, Target, TrendingUp, Users, Zap, Trophy, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Gym & Fitness | BetterU AI",
  description:
    "AI-powered workout plans, progress tracking, and personalized fitness coaching to help you reach your goals.",
}

const features = [
  {
    icon: Dumbbell,
    title: "Custom Workouts",
    description: "AI generates personalized workout plans based on your goals, equipment, and fitness level.",
  },
  {
    icon: Target,
    title: "Personal Records",
    description: "Track your PRs and celebrate milestones as you get stronger.",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Visualize your fitness journey with detailed charts and insights.",
  },
  {
    icon: Users,
    title: "Shared Workouts",
    description: "Share your workouts with friends and discover new routines from the community.",
  },
  {
    icon: Zap,
    title: "AI Generation",
    description: "Let AI create the perfect workout for you with just a few taps.",
  },
  {
    icon: Trophy,
    title: "Challenges",
    description: "Join fitness challenges and compete with others to stay motivated.",
  },
]

export default function FitnessPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f2fe]/[0.03] via-transparent to-transparent" />

        <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/20 mb-6">
                <Dumbbell className="w-4 h-4 text-[#00f2fe]" />
                <span className="text-[#00f2fe] text-sm font-medium">Gym & Fitness</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
                Your Personal
                <br />
                <span className="text-white/60">AI Fitness Coach</span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg">
                Get personalized workout plans, track your progress, and achieve your fitness goals with AI-powered
                guidance tailored just for you.
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
                <div className="absolute -inset-12 bg-gradient-to-br from-[#00f2fe]/20 via-[#00f2fe]/5 to-transparent rounded-full blur-3xl" />

                {/* Phone frame */}
                <div className="relative bg-black rounded-[48px] p-2.5 shadow-2xl border border-white/10">
                  <div className="relative rounded-[38px] overflow-hidden bg-black">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-28 h-7 bg-black rounded-b-2xl" />
                    <Image
                      src="/images/img-6128.jpeg"
                      alt="BetterU AI Fitness App"
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
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">Everything You Need</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Powerful features designed to help you build strength, track progress, and stay motivated.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-[#00f2fe]/10 text-[#00f2fe] mb-4 group-hover:scale-110 transition-transform">
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
          <div className="relative rounded-3xl bg-gradient-to-br from-[#00f2fe]/10 to-transparent border border-white/[0.06] p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/5 to-transparent" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                Start Your Fitness Journey
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Download BetterU AI today and get personalized workouts designed for your goals.
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
