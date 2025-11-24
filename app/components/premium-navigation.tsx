"use client"

import { SheetFooter } from "@/components/ui/sheet"

import { UserMenu } from "./auth/user-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AppStoreButton } from "./app-store-button"
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
            <AppStoreButton
              variant="outline"
              className="hidden md:inline-flex border-[#00f2fe]/50 text-[#00f2fe] hover:text-white hover:bg-[#00f2fe]/10"
              text="Download App"
            />
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
              <Button className="md:hidden">Menu</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Access your options</SheetDescription>
              </SheetHeader>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <AppStoreButton className="mt-4 w-full" text="Download App" />
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
