import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found - BetterU AI",
  description: "The page you are looking for does not exist.",
}

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="bg-[#00f2fe] hover:bg-[#00b4ff] text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out focus:outline-none"
      >
        Return to Home
      </Link>
    </div>
  )
}
