"use client"

import { useState } from "react"

interface EmailListProps {
  emails: string[]
  totalCount: number
}

export function EmailList({ emails, totalCount }: EmailListProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadCSV = () => {
    setIsDownloading(true)
    try {
      const csvContent = "data:text/csv;charset=utf-8," + emails.join("\n")
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", "waitlist_emails.csv")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading CSV:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Waitlist Admin</h1>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <p className="text-lg font-medium">
          Total Subscribers: <span className="font-bold">{totalCount}</span>
        </p>
        <button
          onClick={downloadCSV}
          disabled={isDownloading}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isDownloading ? "Downloading..." : "Download as CSV"}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Waitlist Emails</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
          {emails.length > 0 ? (
            emails.map((email, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                <p>{email}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No emails in waitlist yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
