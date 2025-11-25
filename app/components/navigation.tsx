"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAVIGATION } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"
import { AppStoreButton } from "./app-store-button"
import { motion } from "framer-motion"

export function Navigation() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNavigation = NAVIGATION.filter((item) => !["Login", "Sign Up"].includes(item.title))
  const authLinks = NAVIGATION.filter((item) => ["Login", "Sign Up"].includes(item.title))

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent",
      )}
    >
      <div className="h-safe-top w-full" />

      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-6">
        <div className="flex items-center">
          <Logo className="mr-8" />
        </div>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                pathname === item.href ? "text-white" : "text-white/60 hover:text-white",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.title}
              {pathname === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {authLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300",
                  item.title === "Sign Up"
                    ? "text-black bg-white hover:bg-white/90 rounded-full"
                    : "text-white/60 hover:text-white",
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <AppStoreButton variant="default" className="hidden lg:inline-flex" text="Download" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white/80 hover:text-white hover:bg-white/5"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-96 bg-black/95 backdrop-blur-xl border-l border-white/[0.06] p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                  <Logo />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    className="text-white/60 hover:text-white hover:bg-white/5"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex-1 p-6" aria-label="Mobile Navigation">
                  <div className="flex flex-col gap-1">
                    {NAVIGATION.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center py-3 text-lg font-medium tracking-wide transition-colors",
                            pathname === item.href ? "text-white" : "text-white/60 hover:text-white",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <div className="p-6 border-t border-white/[0.06]">
                  <AppStoreButton className="w-full" text="Download App" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
