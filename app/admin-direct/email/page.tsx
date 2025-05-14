"use client"

import { useState } from "react"
import { sendBulkEmail } from "@/app/actions/send-bulk-email"

export default function BulkEmailDirectPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const result = await sendBulkEmail(formData)
      setResult(result)
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred",
        error: (error as Error).message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Send Email to All Waitlist Subscribers</h1>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <h2 className="text-lg font-medium text-blue-800 mb-2">Email Formatting Tips</h2>
          <ul className="list-disc pl-5 text-blue-700">
            <li>Use plain text in your email content</li>
            <li>Press Enter to create new paragraphs - they will be properly formatted</li>
            <li>Your email will be sent with proper formatting and styling</li>
            <li>Test by sending to yourself first before sending to all subscribers</li>
          </ul>
        </div>

        <form action={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Email Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Exciting Updates from BetterU AI"
            />
          </div>

          <div>
            <label htmlFor="previewText" className="block text-sm font-medium text-gray-700 mb-1">
              Preview Text (optional)
            </label>
            <input
              type="text"
              id="previewText"
              name="previewText"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Brief preview text that appears in email clients"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Email Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Write your email content here. Press Enter to create new paragraphs."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send to All Subscribers"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 p-4 rounded-md ${result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
          >
            <h2 className="text-lg font-medium mb-2">{result.success ? "Success!" : "Error"}</h2>
            <p>{result.message}</p>

            {result.success && result.totalEmails > 0 && (
              <div className="mt-2">
                <p>Total emails: {result.totalEmails}</p>
                <p>Successfully sent: {result.successCount}</p>
                {result.failedEmails && result.failedEmails.length > 0 && (
                  <div className="mt-2">
                    <p>Failed to send to {result.failedEmails.length} email(s):</p>
                    <ul className="list-disc pl-5 mt-1">
                      {result.failedEmails.map((email: string) => (
                        <li key={email}>{email}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
