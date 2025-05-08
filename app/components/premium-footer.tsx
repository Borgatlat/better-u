"use client"

import Link from "next/link"
import { NAVIGATION } from "@/lib/constants"
import { InstagramIcon } from "./icons/instagram-icon"
import { SocialIcon } from "./social-icon"
import { BetterULogo } from "./betteru-logo"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { WaitlistForm } from "./waitlist-form"

export function PremiumFooter() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-black to-[#001a1a] pt-20"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f2fe]/30 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00f2fe] rounded-full filter blur-[120px] opacity-5" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-[#00f2fe] rounded-full filter blur-[120px] opacity-5" />
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 relative z-10">
        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00f2fe] rounded-full filter blur-[100px] opacity-10" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00f2fe] rounded-full filter blur-[100px] opacity-10" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
                  Ready to Transform Your Life?
                </h2>
                <p className="text-xl text-gray-300">
                  Join our waitlist today and be the first to experience BetterU AI
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="space-y-6">
            <Link href="/" className="inline-block" aria-label="BetterU AI Home">
              <div className="flex items-center gap-2">
                <BetterULogo width={50} height={50} />
                <span className="text-[#00f2fe] font-bold text-xl">BetterU AI</span>
              </div>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Transform your life with AI-powered personal development for facial enhancement, fitness, mental wellness,
              and smart shopping.
            </p>
            <div className="flex space-x-4">
              <SocialIcon
                href="https://www.instagram.com/betteru2025?igsh=MXYwOWFnOTJ3dWhidw=="
                aria-label="Follow BetterU AI on Instagram"
                icon={<InstagramIcon className="h-5 w-5" aria-hidden="true" />}
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-white text-lg">Features</h3>
            <ul className="space-y-4">
              {NAVIGATION.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[#00f2fe] transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]/50 mr-2 group-hover:scale-150 transition-transform" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-white text-lg">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-400 hover:text-[#00f2fe] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]/50 mr-2 group-hover:scale-150 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:lucas@betteruai.com"
                  className="text-gray-400 hover:text-[#00f2fe] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]/50 mr-2 group-hover:scale-150 transition-transform" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-white text-lg">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-[#00f2fe] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]/50 mr-2 group-hover:scale-150 transition-transform" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-[#00f2fe] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]/50 mr-2 group-hover:scale-150 transition-transform" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-gray-400 hover:text-[#00f2fe] transition-colors flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]/50 mr-2 group-hover:scale-150 transition-transform" />
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© {currentYear} BetterU AI. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/cookie-preferences" className="text-gray-500 hover:text-[#00f2fe] text-sm transition-colors">
                Cookie Preferences
              </Link>
              <Link href="/about-us" className="text-gray-500 hover:text-[#00f2fe] text-sm transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Safe area padding for iOS */}
      <div className="h-safe-bottom w-full bg-[#001a1a]" />
    </footer>
  )
}
