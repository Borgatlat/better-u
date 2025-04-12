"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { joinWaitlist } from "../actions/waitlist"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface WaitlistFormProps {
  onSuccess?: (count: number) => void
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [state, formAction, isPending] = useActionState(joinWaitlist, null)
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success!",
        description: state.message,
        duration: 5000,
      })
      if (state.count && onSuccess) {
        onSuccess(state.count)
      }
      setEmail("")
    } else if (state?.success === false) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
        duration: 5000,
      })
    }
  }, [state, toast, onSuccess])

  return (
    <form action={formAction} className="w-full space-y-4" aria-labelledby="waitlist-form-heading">
      <div className="sr-only" id="waitlist-form-heading">
        Join our waitlist
      </div>
      <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 backdrop-blur-sm ring-1 ring-white/20 focus-within:ring-[#00f2fe]">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
          className="flex-1 border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
          aria-label="Email address"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#00f2fe] hover:bg-[#00b4ff] text-black font-semibold px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none min-w-[120px]"
          aria-label={isPending ? "Submitting..." : "Join Waitlist"}
        >
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : "Join Waitlist"}
        </Button>
      </div>
      {/* Hidden field for bots to fill out - spam protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Leave this field empty</label>
        <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  )
}
