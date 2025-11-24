import Link from "next/link"
import { NAVIGATION } from "@/lib/constants"
import { InstagramIcon } from "./icons/instagram-icon"
import { SocialIcon } from "./social-icon"
import { BetterULogo } from "./betteru-logo"
import { AppleIcon } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label="BetterU AI Home">
              <div className="flex items-center gap-2">
                <BetterULogo width={50} height={50} />
                <span className="text-[#00f2fe] font-bold text-xl">BetterU AI</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Transform your life with AI-powered personal development across facial enhancement, fitness, mental
              wellness, and smart shopping.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Features</h3>
            <ul className="space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#00f2fe] transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-sm text-gray-400 hover:text-[#00f2fe] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:lucas@betteruai.com"
                  className="text-sm text-gray-400 hover:text-[#00f2fe] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="https://apps.apple.com/us/app/betteru-social-fitness/id6744857930"
                  className="text-sm text-gray-400 hover:text-[#00f2fe] transition-colors flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppleIcon className="h-3 w-3 mr-1" />
                  Download iOS App
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-[#00f2fe] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-[#00f2fe] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-sm text-gray-400 hover:text-[#00f2fe] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-preferences"
                  className="text-sm text-gray-400 hover:text-[#00f2fe] transition-colors"
                >
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-400">© {currentYear} BetterU AI. All rights reserved.</p>
            <div className="flex space-x-6">
              <SocialIcon
                href="https://www.instagram.com/betteru2025?igsh=MXYwOWFnOTJ3dWhidw=="
                aria-label="Follow BetterU AI on Instagram"
                icon={<InstagramIcon className="h-5 w-5" aria-hidden="true" />}
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
