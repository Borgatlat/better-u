"use client"

import Link from "next/link"
import { NAVIGATION } from "@/lib/constants"
import { InstagramIcon } from "./icons/instagram-icon"
import { SocialIcon } from "./social-icon"
import { BetterULogo } from "./betteru-logo"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { AppStoreButton } from "./app-store-button"
import { ArrowUpRight } from "lucide-react"

export function PremiumFooter() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-black pt-24" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f2fe] rounded-full filter blur-[200px] opacity-[0.03]" />
      </div>

      <motion.div style={{ y, opacity }} className="container max-w-screen-xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Download the app and begin transforming your life with AI-powered guidance.
            </p>
            <AppStoreButton variant="hero" text="Download on App Store" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-12 border-t border-white/[0.06]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6" aria-label="BetterU AI Home">
              <BetterULogo width={36} height={36} />
              <span className="text-white font-semibold tracking-tight">BetterU AI</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              AI-powered personal development for fitness and mental wellness.
            </p>
          </div>

          <div>
            <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Product</h3>
            <ul className="space-y-3">
              {NAVIGATION.filter((item) => !["Login", "Sign Up", "Pricing"].includes(item.title)).map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-white/60 text-sm hover:text-white transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-white/60 text-sm hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:lucas@betteruai.com"
                  className="text-white/60 text-sm hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Contact
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-white/60 text-sm hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-white/60 text-sm hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-white/60 text-sm hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">{currentYear} BetterU AI</p>
          <div className="flex items-center gap-6">
            <SocialIcon
              href="https://www.instagram.com/betteru2025"
              aria-label="Instagram"
              icon={<InstagramIcon className="h-4 w-4" />}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </motion.div>

      <div className="h-safe-bottom w-full bg-black" />
    </footer>
  )
}
