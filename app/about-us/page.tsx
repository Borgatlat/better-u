import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "../components/breadcrumbs"
import { AppStoreButton } from "../components/app-store-button"
import { ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - BetterU AI | Our Mission, Team & Vision",
  description:
    "Learn about BetterU AI's mission to transform lives through AI-powered self-improvement technology. Meet our team and discover our journey.",
  keywords: "BetterU AI about us, AI self-improvement company, BetterU team, AI wellness mission",
  openGraph: {
    title: "About Us - BetterU AI | Our Mission, Team & Vision",
    description:
      "Learn about BetterU AI's mission to transform lives through AI-powered self-improvement technology. Meet our team and discover our journey.",
    url: "https://betteruai.com/about-us",
    siteName: "BetterU AI",
    images: [
      {
        url: "/og-images/about-us.png",
        width: 1200,
        height: 630,
        alt: "About BetterU AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function AboutUsPage() {
  const teamMembers = [
    { name: "Lucas Borgarello", role: "Co-Founder", initials: "LB" },
    { name: "Daniel Johnson", role: "Co-Founder, Mobile", initials: "DJ" },
    { name: "Enrique Ortiz", role: "Co-Founder", initials: "EO" },
    { name: "Jordi Idiarte", role: "Co-Founder", initials: "JI" },
    { name: "Joaquin Muniz", role: "Co-Founder", initials: "JM" },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00f2fe]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="container max-w-3xl mx-auto px-6 py-32 relative z-10">
        <Breadcrumbs />

        <section className="mb-20">
          <p className="text-[#00f2fe] text-sm font-medium tracking-widest uppercase mb-4">About Us</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Transforming lives through
            <br />
            <span className="text-white/60">AI-powered improvement</span>
          </h1>
          <p className="text-lg text-white/40 leading-relaxed max-w-2xl">
            BetterU AI was founded in 2024 with a mission to make personalized self-improvement accessible to everyone
            through the power of artificial intelligence.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-6 tracking-tight">Our Mission</h2>
          <div className="space-y-4 text-white/50 leading-relaxed">
            <p>
              We believe that everyone deserves the opportunity to become their best self. Traditional methods of
              self-improvement often fall short - they're either too generic, too expensive, or too time-consuming.
            </p>
            <p>
              We're changing that by creating AI technology that truly understands your unique needs and goals,
              providing personalized guidance that evolves as you do.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">Our Team</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center text-white/60 text-sm font-medium">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{member.name}</h3>
                    <p className="text-sm text-white/40">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center py-16 border-t border-white/[0.06]">
          <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Join Our Journey</h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            Download the app and start your AI-powered self-improvement journey today.
          </p>
          <AppStoreButton variant="hero" text="Download on App Store" />
        </section>

        <section className="pt-12 border-t border-white/[0.06]">
          <h2 className="text-lg font-medium text-white mb-4">Contact</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="mailto:info@betteruai.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
            >
              Email Us
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.instagram.com/betteru2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] text-white font-medium text-sm border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
            >
              Instagram
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
