import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PremiumNavigation } from "./components/premium-navigation"
import { PremiumFooter } from "./components/premium-footer"
import { CookieConsent } from "./components/cookie-consent"
import { AnalyticsTracker } from "./components/analytics-tracker"
import { TestFlightBanner } from "./components/testflight-banner"
import { FloatingTestFlightButton } from "./components/floating-testflight-button"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { FeedbackButton } from "./components/feedback-button"
import { RichResults } from "./components/seo/rich-results"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "BetterU AI - Personal AI Self-Improvement Assistant | Fitness, Mental Wellness & More",
  description:
    "Transform your life with BetterU AI, the all-in-one AI companion for self-improvement. Get personalized guidance for facial enhancement, fitness, mental wellness, and smart shopping.",
  keywords:
    "AI self-improvement, personal AI assistant, fitness AI, mental wellness app, self-improvement app, BetterU",
  authors: [{ name: "BetterU AI Team" }],
  creator: "BetterU AI",
  publisher: "BetterU AI",
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://betteruai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BetterU AI - Your Personal Self-Improvement AI Companion",
    description:
      "Transform your life with AI-powered personal development across facial enhancement, fitness, mental wellness, and smart shopping.",
    url: "https://betteruai.com",
    siteName: "BetterU AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BetterU AI - Your Personal Self-Improvement AI Companion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BetterU AI - Your Personal Self-Improvement AI Companion",
    description:
      "Transform your life with AI-powered personal development across facial enhancement, fitness, mental wellness, and smart shopping.",
    images: ["/twitter-image.png"],
    creator: "@betteruai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
  },
  verification: {
    google: "verification_token",
  },
  category: "technology",
  themeColor: "#000000",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationData = {
    name: "BetterU AI",
    url: "https://betteruai.com",
    logo: "https://betteruai.com/logo.png",
    sameAs: [
      "https://www.instagram.com/betteru2025",
      "https://twitter.com/betteruai",
      "https://www.linkedin.com/company/betteruai",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "support@betteruai.com",
      availableLanguage: "English",
    },
  }

  return (
    <html lang="en" className="dark">
      <head>{/* Add viewport-fit=cover meta tag for iOS devices */}</head>
      {/* Then add the component inside the body */}
      <body className={inter.className}>
        <RichResults type="Organization" data={organizationData} />
        <div className="min-h-screen bg-black text-white flex flex-col">
          <Suspense fallback={<div className="h-16 bg-black"></div>}>
            <PremiumNavigation />
          </Suspense>
          <Suspense fallback={null}>
            <TestFlightBanner />
          </Suspense>
          <main className="flex-1 pt-safe-top">{children}</main>
          <PremiumFooter />
          <FeedbackButton />
          <Suspense fallback={null}>
            <FloatingTestFlightButton />
          </Suspense>
        </div>
        <Toaster />
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
    </html>
  )
}
