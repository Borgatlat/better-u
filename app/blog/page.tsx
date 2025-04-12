import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "../components/breadcrumbs"
import { WaitlistForm } from "../components/waitlist-form"

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

// Sample blog posts
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
    category: "Mental Wellness",
    slug: "mental-wellness-practices-enhanced-technology",
  },
  {
    title: "The Science Behind Effective Skincare Routines",
    excerpt:
      "Explore the scientific principles that make a skincare routine effective and how AI can help you optimize your personal regimen.",
    date: "March 28, 2025",
    category: "Facial Enhancement",
    slug: "science-behind-effective-skincare-routines",
  },
  {
    title: "Smart Shopping: How to Choose Products That Actually Work",
    excerpt:
      "Cut through marketing hype and learn how to select products that deliver real results for your self-improvement journey.",
    date: "March 20, 2025",
    category: "Smart Shop",
    slug: "smart-shopping-choose-products-that-work",
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
  // Structured data for Blog page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "BetterU AI Blog",
    description: "Articles on AI-powered self-improvement, fitness, mental wellness, and more",
    url: "https://betteruai.com/blog",
    publisher: {
      "@type": "Organization",
      name: "BetterU AI",
      logo: {
        "@type": "ImageObject",
        url: "https://betteruai.com/logo.png",
      },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://betteruai.com/blog/${post.slug}`,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="container max-w-4xl mx-auto px-4 py-24 mt-safe-top pt-14">
        <Breadcrumbs />

        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
            BetterU AI Blog
          </h1>

          <p className="text-lg text-gray-300 mb-8">
            Explore the latest insights, tips, and strategies for AI-powered self-improvement. Our articles cover
            everything from fitness and mental wellness to skincare and smart shopping.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-black/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                <div className="mb-2">
                  <span className="text-xs font-medium bg-[#00f2fe]/10 text-[#00f2fe] px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 hover:text-[#00f2fe] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-[#00f2fe] hover:underline text-sm font-medium">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="my-16 text-center">
          <div className="bg-gradient-to-br from-[#003333] to-black border border-[#00f2fe]/20 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our waitlist to receive the latest articles, tips, and updates from BetterU AI directly in your
              inbox.
            </p>
            <div className="max-w-md mx-auto">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
