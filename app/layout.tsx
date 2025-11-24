import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "./components/navigation"
import { Footer } from "./components/footer"
import { CookieConsent } from "./components/cookie-consent"
import { AnalyticsTracker } from "./components/analytics-tracker"
import { AuthProvider } from "./components/auth/auth-provider"
import { AppStoreBanner } from "./components/app-store-banner"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "BetterUAI - AI-Powered Personal Self-Improvement Assistant",
    template: "%s | BetterUAI",
  },
  description:
    "Transform your life with BetterUAI - your personal AI companion for complete self-improvement across facial enhancement, fitness, mental wellness, and smart shopping.",
  keywords: ["AI", "self-improvement", "fitness", "mental wellness", "personal development", "BetterUAI"],
  authors: [{ name: "BetterUAI Team" }],
  creator: "BetterUAI",
  publisher: "BetterUAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://betteruai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://betteruai.com",
    siteName: "BetterUAI",
    title: "BetterUAI - AI-Powered Personal Self-Improvement Assistant",
    description:
      "Transform your life with BetterUAI - your personal AI companion for complete self-improvement across all aspects of your life.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BetterUAI - AI-Powered Self-Improvement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BetterUAI - AI-Powered Personal Self-Improvement Assistant",
    description: "Transform your life with BetterUAI - your personal AI companion for complete self-improvement.",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            <AppStoreBanner />
            <main className="pt-14">{children}</main>
            <Footer />
            <CookieConsent />
            <AnalyticsTracker />
            <Toaster />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
