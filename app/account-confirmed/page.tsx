import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Account Confirmed - BetterU AI",
  description: "Your BetterU AI account has been successfully confirmed. Welcome to your self-improvement journey!",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AccountConfirmedPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-black" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
            Account Confirmed!
          </h1>
          <p className="text-gray-300 text-lg">
            Thank you for confirming your email address. Your BetterU AI account is now active and ready to help you
            transform your life.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-6">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            Return to Home
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500">
          Questions? Contact us at{" "}
          <a href="mailto:support@betteruai.com" className="text-[#00f2fe] hover:underline">
            support@betteruai.com
          </a>
        </p>
      </div>
    </div>
  )
}
