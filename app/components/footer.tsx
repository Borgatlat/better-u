"use client"

import Link from "next/link"
import { NAVIGATION } from "@/lib/constants"
import { InstagramIcon } from "./icons/instagram-icon"
import { SocialIcon } from "./social-icon"
import { BetterULogo } from "./betteru-logo"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: NAVIGATION.filter((item) => !["Login", "Sign Up", "Pricing"].includes(item.title)),
    company: [
      { title: "About", href: "/about-us" },
      { title: "Blog", href: "/blog" },
      { title: "Contact", href: "mailto:lucas@betteru.app" },
    ],
    legal: [
      { title: "Privacy", href: "/privacy-policy" },
      { title: "Terms", href: "/terms-of-service" },
      { title: "Cookies", href: "/cookie-policy" },
    ],
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00f2fe]/30 to-transparent" />

      <div className="container max-w-screen-xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6" aria-label="BetterU Home">
              <BetterULogo width={40} height={40} />
              <span className="text-white font-semibold text-lg tracking-tight">BetterU</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Transform your life with AI-powered personal development. Fitness, mental wellness, and continuous
              improvement.
            </p>
            <div className="flex gap-4">
              <SocialIcon
                href="https://www.instagram.com/betteru2025"
                aria-label="Instagram"
                icon={<InstagramIcon className="h-4 w-4" />}
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>

          <div>
            <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {item.title}
                    {item.href.startsWith("mailto") && (
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">&copy; {currentYear} BetterU LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/cookie-preferences" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
