"use client"

import type React from "react"

import { useState } from "react"

export default function TestEmailPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/test-email?email=${encodeURIComponent(email)}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: (error as Error).message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Send Test Email</h1>

        <p className="mb-4 text-gray-700">
          Use this page to send a test email and verify that the email system is working correctly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 shadow-sm"
          >
            {isLoading ? "Sending..." : "Send Test Email"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 p-4 rounded-md ${result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
          >
            <h2 className="text-lg font-medium mb-2 text-gray-900">
              {result.success ? "Email Sent Successfully!" : "Error Sending Email"}
            </h2>

            {result.success ? (
              <p className="text-gray-800">
                A test email has been sent to {email}. Please check your inbox (and spam folder) to verify receipt.
              </p>
            ) : (
              <p className="text-red-700">{result.error || "An unknown error occurred."}</p>
            )}

            <pre className="mt-4 p-2 bg-gray-100 rounded text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
