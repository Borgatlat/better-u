import { NAVIGATION } from "@/lib/constants"
import { WaitlistForm } from "../components/waitlist-form"
import { FeatureSection } from "../components/feature-section"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { ResolvingMetadata } from "next"
import { Breadcrumbs } from "../components/breadcrumbs"

type Props = {
  params: { section: string }
}

// Generate metadata for each section page
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const section = NAVIGATION.find((item) => item.href === `/${params.section}`)

  if (!section) {
    return {
      title: "Page Not Found - BetterU AI",
      description: "The page you are looking for does not exist.",
    }
  }

  return {
    title: `${section.title} - BetterU AI`,
    description: section.description,
    openGraph: {
      title: `${section.title} - BetterU AI`,
      description: section.description,
      url: `https://betteruai.com/${params.section}`,
      siteName: "BetterU AI",
      images: [
        {
          url: `/og-images/${params.section}.png`,
          width: 1200,
          height: 630,
          alt: `${section.title} - BetterU AI`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  }
}

export default function SectionPage({ params }: { params: { section: string } }) {
  const section = NAVIGATION.find((item) => item.href === `/${params.section}`)

  if (!section) {
    notFound()
  }

  // Structured data for this section
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${section.title} - BetterU AI`,
    description: section.description,
    url: `https://betteruai.com/${params.section}`,
    mainEntity: {
      "@type": "Service",
      name: section.title,
      description: section.description,
      provider: {
        "@type": "Organization",
        name: "BetterU AI",
        url: "https://betteruai.com",
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* Add padding-top to account for the fixed header and safe area */}
      <div className="container relative mt-safe-top pt-20 mb-10 max-w-screen-xl">
        <Breadcrumbs />
        <div className="overflow-hidden rounded-lg border bg-background shadow-xl">
          <div className="grid grid-cols-1 gap-6 p-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
                  {section.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {section.description}
                </p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm">
              <WaitlistForm />
            </div>
            <FeatureSection features={section.features} />
          </div>
        </div>
      </div>
    </>
  )
}

// Generate static paths for all sections
export async function generateStaticParams() {
  return NAVIGATION.map((item) => ({
    section: item.href.substring(1), // Remove the leading slash
  }))
}
