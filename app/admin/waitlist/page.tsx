"use client"

import { redis } from "@/app/lib/redis"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function WaitlistAdmin() {
  // Fetch all emails from Redis
  const emails = await redis.smembers("waitlist_emails")
  const totalCount = emails.length

  // Function to download emails as CSV
  const downloadCSV = `
    function downloadCSV() {
      const emails = ${JSON.stringify(emails)};
      const csvContent = "data:text/csv;charset=utf-8," + emails.join("\\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "waitlist_emails.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  `

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Waitlist Admin</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-lg font-medium">
          Total Subscribers: <span className="font-bold">{totalCount}</span>
        </p>
        <button onClick="downloadCSV()" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Download as CSV
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Waitlist Emails</h2>
        </div>
        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {emails.length > 0 ? (
            emails.map((email, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <p>{email}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No emails in waitlist yet.</div>
          )}
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: downloadCSV }} />
    </div>
  )
}
