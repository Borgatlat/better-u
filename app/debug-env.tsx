"use client"

import { useEffect, useState } from "react"

export default function DebugEnv() {
  const [envVars, setEnvVars] = useState<{
    url: string | undefined
    key: string | undefined
    urlExists: boolean
    keyExists: boolean
  }>({
    url: undefined,
    key: undefined,
    urlExists: false,
    keyExists: false,
  })

  useEffect(() => {
    // Check if environment variables exist
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    setEnvVars({
      url: url ? url.substring(0, 10) + "..." : undefined, // Only show part for security
      key: key ? key.substring(0, 10) + "..." : undefined, // Only show part for security
      urlExists: !!url,
      keyExists: !!key,
    })
  }, [])

  return (
    <div className="p-4 bg-black/50 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-2">Environment Variable Debug</h2>
      <div className="space-y-2">
        <p>
          <strong>NEXT_PUBLIC_SUPABASE_URL exists:</strong> {envVars.urlExists ? "✅ Yes" : "❌ No"}
          {envVars.url && <span className="ml-2 text-gray-400">(starts with {envVars.url})</span>}
        </p>
        <p>
          <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY exists:</strong> {envVars.keyExists ? "✅ Yes" : "❌ No"}
          {envVars.key && <span className="ml-2 text-gray-400">(starts with {envVars.key})</span>}
        </p>
      </div>
    </div>
  )
}
