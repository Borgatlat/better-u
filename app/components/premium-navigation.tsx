"use client"

import { SheetFooter } from "@/components/ui/sheet"

import { UserMenu } from "./auth/user-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TestFlightButton } from "./testflight-button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"

export function PremiumNavigation() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">Premium App</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-gray-300">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Support
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TestFlightButton
              variant="outline"
              className="hidden md:inline-flex border-[#00f2fe]/50 text-[#00f2fe] hover:text-white hover:bg-[#00f2fe]/10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              onClick={() => {}}
              className="hidden md:inline-flex bg-transparent hover:bg-white/10 text-white border border-[#00f2fe]/50 font-medium px-5 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none group overflow-hidden relative"
            >
              <span className="relative z-10">Join Waitlist</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <UserMenu />
          </motion.div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="md:hidden">Open</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Take action</SheetDescription>
              </SheetHeader>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <TestFlightButton className="mt-4 w-full" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  onClick={() => {
                    setOpen(false)
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black font-semibold px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none"
                >
                  Join Waitlist
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-4"
              >
                <UserMenu />
              </motion.div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
