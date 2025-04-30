"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAVIGATION } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "./logo"

export function PremiumNavigation() {
  const [open, setOpen] = React.useState(false)
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams() // Add this line to properly use the hook

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToWaitlist = () => {
    const waitlistForm = document.querySelector("form[action]")
    if (waitlistForm) {
      waitlistForm.scrollIntoView({ behavior: "smooth" })
    } else if (pathname !== "/") {
      window.location.href = "/"
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent",
      )}
    >
      {/* Add a safe area spacer for iOS devices */}
      <div className="h-safe-top w-full bg-transparent" />

      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex flex-1 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Logo className="mr-6" />
          </motion.div>

          <nav
            className="hidden md:flex flex-1 items-center justify-center space-x-1 text-sm font-medium"
            aria-label="Main Navigation"
          >
            {NAVIGATION.map(
              (item) =>
                item.href !== "/blog" && (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 rounded-full transition-colors relative z-10 flex items-center",
                        pathname === item.href ? "text-white" : "text-gray-400 hover:text-white",
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.title}
                    </Link>

                    {/* Hover effect */}
                    <AnimatePresence>
                      {hoveredItem === item.href && (
                        <motion.div
                          className="absolute inset-0 bg-white/5 rounded-full -z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active indicator */}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00f2fe] rounded-full"
                        layoutId="activeNavIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                ),
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              onClick={scrollToWaitlist}
              className="hidden md:inline-flex bg-transparent hover:bg-white/10 text-white border border-[#00f2fe]/50 font-medium px-5 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none group overflow-hidden relative"
            >
              <span className="relative z-10">Join Waitlist</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                aria-label="Open menu"
              >
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black/95 backdrop-blur-xl border-r border-white/10 pr-0">
              <Logo />
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <nav aria-label="Mobile Navigation">
                  <div className="flex flex-col space-y-3">
                    {NAVIGATION.map(
                      (item, index) =>
                        item.href !== "/blog" && (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Link
                              href={item.href}
                              className={cn(
                                "text-sm transition-colors hover:text-[#00f2fe] flex items-center space-x-2 p-2 rounded-lg",
                                pathname === item.href ? "bg-white/10 text-white" : "text-gray-400",
                              )}
                              onClick={() => setOpen(false)}
                              aria-current={pathname === item.href ? "page" : undefined}
                            >
                              <span>{item.title}</span>
                            </Link>
                          </motion.div>
                        ),
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Button
                        onClick={() => {
                          setOpen(false)
                          scrollToWaitlist()
                        }}
                        className="mt-4 w-full bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black font-semibold px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none"
                      >
                        Join Waitlist
                      </Button>
                    </motion.div>
                  </div>
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
