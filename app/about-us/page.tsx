import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "../components/breadcrumbs"
import { AnimatedText } from "../components/animated-text"
import { AppleStyleDivider } from "../components/apple-style-divider"
import { WaitlistForm } from "../components/waitlist-form"

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
  // Structured data for About Us page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About BetterU AI",
    description: "Learn about BetterU AI's mission to transform lives through AI-powered self-improvement technology.",
    url: "https://betteruai.com/about-us",
    mainEntity: {
      "@type": "Organization",
      name: "BetterU AI",
      url: "https://betteruai.com",
      logo: "https://betteruai.com/logo.png",
      foundingDate: "2024",
      founders: [
        {
          "@type": "Person",
          name: "Lucas Borgarello",
          jobTitle: "Co-Founder",
        },
        {
          "@type": "Person",
          name: "Daniel Johnson",
          jobTitle: "Co-Founder, Mobile",
        },
        {
          "@type": "Person",
          name: "Enrique Ortiz",
          jobTitle: "Co-Founder",
        },
        {
          "@type": "Person",
          name: "Jordi Idiarte",
          jobTitle: "Co-Founder",
        },
        {
          "@type": "Person",
          name: "Joaquin Muniz",
          jobTitle: "Co-Founder",
        },
      ],
      description:
        "BetterU AI is a pioneering company in the field of AI-powered self-improvement, offering personalized guidance for facial enhancement, fitness, mental wellness, and smart shopping.",
    },
  }

  const teamMembers = [
    {
      name: "Lucas Borgarello",
      role: "Co-Founder",
      bio: "Passionate about combining AI with personal development, Lucas co-founded BetterU AI to democratize access to personalized self-improvement.",
      image: "/placeholder.svg?height=300&width=300",
      initials: "LB",
    },
    {
      name: "Daniel Johnson",
      role: "Co-Founder, Mobile",
      bio: "With expertise in mobile development, Daniel leads our efforts to create seamless mobile experiences that help users transform their lives.",
      image: "/placeholder.svg?height=300&width=300",
      initials: "DJ",
    },
    {
      name: "Enrique Ortiz",
      role: "Co-Founder",
      bio: "Combining technical expertise with a passion for wellness, Enrique helps drive innovation in our AI-powered self-improvement platform.",
      image: "/placeholder.svg?height=300&width=300",
      initials: "EO",
    },
    {
      name: "Jordi Idiarte",
      role: "Co-Founder",
      bio: "Jordi brings a unique perspective to BetterU AI, focusing on creating technology that truly understands and adapts to individual needs.",
      image: "/placeholder.svg?height=300&width=300",
      initials: "JI",
    },
    {
      name: "Joaquin Muniz",
      role: "Co-Founder",
      bio: "With a background in AI and user experience, Joaquin works to ensure BetterU AI delivers meaningful transformation in users' lives.",
      image: "/placeholder.svg?height=300&width=300",
      initials: "JM",
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* Add padding-top to account for the fixed header and safe area */}
      <div className="container max-w-4xl mx-auto px-4 py-24 mt-safe-top pt-14">
        <Breadcrumbs />

        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
            About BetterU AI
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6">
                BetterU AI was founded in 2024 with a simple but powerful mission: to make personalized self-improvement
                accessible to everyone through the power of artificial intelligence.
              </p>
              <p className="text-lg text-gray-300">
                We believe that everyone deserves the opportunity to become their best self, but traditional methods of
                self-improvement often fall short. They're either too generic, too expensive, or too time-consuming.
                We're changing that by creating AI technology that truly understands your unique needs and goals.
              </p>
            </div>
            <div className="relative h-64 md:h-auto rounded-xl overflow-hidden bg-gradient-to-br from-[#003333] to-black border border-[#00f2fe]/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 relative">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="BetterU AI Office"
                    fill
                    className="object-cover rounded-xl opacity-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
                      BetterU
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AppleStyleDivider />

        <section className="my-16" id="our-mission">
          <div className="text-center mb-12">
            <AnimatedText
              text="Our Mission"
              className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4"
              gradient={true}
            />
            <p className="text-gray-400 md:text-lg max-w-3xl mx-auto">
              We're on a mission to transform lives through AI-powered self-improvement
            </p>
          </div>

          <div className="bg-black/30 border border-gray-800 rounded-xl p-8 backdrop-blur-sm">
            <p className="text-gray-300 mb-6">
              At BetterU AI, we believe that self-improvement should be personalized, accessible, and guided by
              principles of care and justice. Our mission is to harness the power of artificial intelligence to help
              people become the best versions of themselves across all dimensions of life.
            </p>
            <p className="text-gray-300 mb-6">
              Founded on human-centered principles, we're creating technology that understands the unique needs, goals,
              and challenges of each individual user, providing tailored guidance that evolves as you do. Whether it's
              optimizing your fitness routine, enhancing your mental wellness, improving your appearance, or making
              smarter purchasing decisions, our AI is designed to support your journey every step of the way.
            </p>
            <p className="text-lg text-gray-300">
              By democratizing access to personalized self-improvement, we aim to empower millions of people worldwide
              to unlock their full potential and live healthier, happier, and more fulfilling lives.
            </p>
          </div>
        </section>

        <section className="my-16" id="our-team">
          <div className="text-center mb-12">
            <AnimatedText
              text="Meet Our Team"
              className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4"
              gradient={true}
            />
            <p className="text-gray-400 md:text-lg max-w-3xl mx-auto">The passionate experts behind BetterU AI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-black/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#003333] flex items-center justify-center text-white font-semibold text-xl mr-4">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-[#00f2fe]">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <AppleStyleDivider />

        <section className="my-16 text-center" id="join-us">
          <div className="bg-gradient-to-br from-[#003333] to-black border border-[#00f2fe]/20 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Be among the first to experience the future of AI-powered self-improvement. Join our waitlist today and be
              notified when BetterU AI launches.
            </p>
            <div className="max-w-md mx-auto">
              <WaitlistForm />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="border-t border-gray-800 pt-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-6">
              Have questions or want to learn more about BetterU AI? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="mailto:info@betteruai.com"
                className="bg-[#00f2fe] hover:bg-[#00b4ff] text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out focus:outline-none text-center"
              >
                Email Us
              </Link>
              <Link
                href="https://www.instagram.com/betteru2025?igsh=MXYwOWFnOTJ3dWhidw=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out focus:outline-none text-center"
              >
                Follow on Instagram
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
