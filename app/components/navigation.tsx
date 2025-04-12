"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAVIGATION } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Logo } from "./logo"

export function Navigation() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const scrollToWaitlist = () => {
    const waitlistForm = document.querySelector("form[action]")
    if (waitlistForm) {
      waitlistForm.scrollIntoView({ behavior: "smooth" })
    } else if (pathname !== "/") {
      window.location.href = "/"
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-black">
      {/* Add a safe area spacer for iOS devices */}
      <div className="h-safe-top w-full bg-black" />

      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex flex-1 items-center">
          <Logo className="mr-6" />
          <nav
            className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium"
            aria-label="Main Navigation"
          >
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-[#00f2fe]",
                  pathname === item.href ? "text-white" : "text-gray-400",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={scrollToWaitlist}
            className="hidden md:inline-flex bg-[#00f2fe] hover:bg-[#00b4ff] text-black font-semibold px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none"
          >
            Join Waitlist
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black pr-0">
              <Logo />
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <nav aria-label="Mobile Navigation">
                  <div className="flex flex-col space-y-3">
                    {NAVIGATION.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "text-sm transition-colors hover:text-[#00f2fe]",
                          pathname === item.href ? "text-white" : "text-gray-400",
                        )}
                        onClick={() => setOpen(false)}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.title}
                      </Link>
                    ))}
                    <Button
                      onClick={() => {
                        setOpen(false)
                        scrollToWaitlist()
                      }}
                      className="mt-4 w-full bg-[#00f2fe] hover:bg-[#00b4ff] text-black font-semibold px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none"
                    >
                      Join Waitlist
                    </Button>
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
