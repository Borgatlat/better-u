import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"
import { AppStoreButton } from "@/app/components/app-store-button"
import { Users, Trophy, Target, MessageCircle, Award, Flame, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Community | BetterU AI",
  description: "Connect with others, join challenges, compete in leagues, and stay motivated together.",
}

const features = [
  {
    icon: Users,
    title: "Social Feed",
    description: "Share your achievements and celebrate wins with the community.",
  },
  {
    icon: Trophy,
    title: "Leagues",
    description: "Compete with friends and others in weekly fitness leagues.",
  },
  {
    icon: Target,
    title: "Challenges",
    description: "Join community challenges to push yourself and earn rewards.",
  },
  {
    icon: MessageCircle,
    title: "Shared Workouts",
    description: "Discover and share workout routines with other members.",
  },
  {
    icon: Award,
    title: "Achievements",
    description: "Earn badges and recognition for your accomplishments.",
  },
  {
    icon: Flame,
    title: "Streaks",
    description: "Build consistency with daily streaks and accountability.",
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] via-transparent to-transparent" />

        <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Community</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
              Stronger
              <br />
              <span className="text-white/60">Together</span>
            </h1>

            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Connect with a supportive community of people on their self-improvement journey. Share progress, join
              challenges, and stay motivated.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">Build Connections</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Features designed to help you connect, compete, and grow with others.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
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
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-white/[0.06] p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">Join the Community</h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Download BetterU AI and connect with thousands of people on their improvement journey.
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
