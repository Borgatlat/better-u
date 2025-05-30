"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function FeedbackButton() {
  const handleClick = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLScqC-Un8Nisy7W1iGYTIvjUmMr4iZyEMLJ-hfv53OsNvzHmfg/viewform?usp=dialog",
      "_blank",
    )
  }

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-[#00f2fe] hover:bg-[#00b4ff] text-black font-semibold rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out focus:outline-none z-50 flex items-center gap-2"
    >
      <MessageSquare className="h-5 w-5" />
      <span className="hidden sm:inline">Feedback</span>
    </Button>
  )
}
