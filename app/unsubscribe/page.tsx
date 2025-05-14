"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function UnsubscribePage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleUnsubscribe() {
    if (!email) {
      setStatus("error")
      setMessage("No email provided")
      return
    }

    setStatus("loading")
    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage("You have been successfully unsubscribed from our emails.")
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to unsubscribe. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An unexpected error occurred. Please try again.")
    }
  }

  useEffect(() => {
    if (email) {
      handleUnsubscribe()
    } else {
      setStatus("error")
      setMessage("No email provided")
    }
  }, [email])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Unsubscribe</h1>

        {status === "loading" && (
          <div className="text-center">
            <p>Processing your request...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <p className="text-green-600 mb-4">{message}</p>
            <p>We're sorry to see you go. If you change your mind, you can always sign up again.</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <p className="text-red-600 mb-4">{message}</p>
            <p>If you continue to experience issues, please contact our support team.</p>
          </div>
        )}
      </div>
    </div>
  )
}
