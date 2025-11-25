import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "../components/breadcrumbs"
import { AppStoreButton } from "../components/app-store-button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - BetterU AI | Self-Improvement Insights & Tips",
  description:
    "Explore the latest articles on AI-powered self-improvement, fitness tips, mental wellness strategies, and more from BetterU AI.",
  keywords: "BetterU AI blog, self-improvement tips, fitness advice, mental wellness, AI wellness",
  openGraph: {
    title: "Blog - BetterU AI | Self-Improvement Insights & Tips",
    description:
      "Explore the latest articles on AI-powered self-improvement, fitness tips, mental wellness strategies, and more from BetterU AI.",
    url: "https://betteruai.com/blog",
    siteName: "BetterU AI",
    images: [
      {
        url: "/og-images/blog.png",
        width: 1200,
        height: 630,
        alt: "BetterU AI Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

const blogPosts = [
  {
    title: "How AI is Revolutionizing Personal Fitness",
    excerpt:
      "Discover how artificial intelligence is transforming workout routines and making personalized fitness more accessible than ever before.",
    date: "April 10, 2025",
    category: "Fitness",
    slug: "how-ai-revolutionizing-personal-fitness",
  },
  {
    title: "5 Mental Wellness Practices Enhanced by Technology",
    excerpt:
      "Learn how technology and AI can enhance traditional mental wellness practices like meditation, journaling, and cognitive behavioral therapy.",
    date: "April 5, 2025",
    category: "Wellness",
    slug: "mental-wellness-practices-enhanced-technology",
  },
  {
    title: "The Future of Self-Improvement: AI Companions",
    excerpt:
      "Explore how AI companions are becoming the next frontier in personal development and self-improvement technology.",
    date: "March 15, 2025",
    category: "Technology",
    slug: "future-self-improvement-ai-companions",
  },
  {
    title: "Building Consistent Habits: The Key to Transformation",
    excerpt:
      "Discover science-backed strategies for building and maintaining consistent habits that lead to lasting personal transformation.",
    date: "March 8, 2025",
    category: "Lifestyle",
    slug: "building-consistent-habits-key-transformation",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00f2fe]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="container max-w-4xl mx-auto px-6 py-32 relative z-10">
        <Breadcrumbs />

        <section className="mb-16">
          <p className="text-[#00f2fe] text-sm font-medium tracking-widest uppercase mb-4">Blog</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">Insights & Articles</h1>
          <p className="text-lg text-white/40 max-w-2xl">
            Explore the latest insights on AI-powered self-improvement, fitness strategies, and mental wellness.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 mb-20">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium bg-white/[0.06] text-white/60 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-white/30">{post.date}</span>
              </div>
              <h2 className="text-lg font-medium text-white mb-3 group-hover:text-[#00f2fe] transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-white/40 mb-4 leading-relaxed">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-[#00f2fe] transition-colors"
              >
                Read article
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>

        <section className="text-center py-16 border-t border-white/[0.06]">
          <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Stay Updated</h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            Download the app to get the latest updates and start your self-improvement journey.
          </p>
          <AppStoreButton variant="hero" text="Download on App Store" />
        </section>
      </div>
    </div>
  )
}
