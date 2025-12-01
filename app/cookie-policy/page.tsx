import Link from "next/link"
import { Breadcrumbs } from "../components/breadcrumbs"

export default function CookiePolicy() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-24 mt-safe-top pt-14">
      <Breadcrumbs />

      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
        Cookie Policy
      </h1>

      <div className="space-y-6 text-gray-300">
        <p>Last Updated: April 5, 2025</p>

        <h2 className="text-xl font-semibold text-white mt-8">1. What Are Cookies</h2>
        <p>
          Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in
          your web browser and allows the service or a third-party to recognize you and make your next visit easier and
          the service more useful to you.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. How We Use Cookies</h2>
        <p>
          When you use and access our service, we may place a number of cookie files in your web browser. We use cookies
          for the following purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>To enable certain functions of the service</li>
          <li>To provide analytics</li>
          <li>To store your preferences</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">3. Types of Cookies We Use</h2>
        <p>
          We use both session and persistent cookies on the service and we use different types of cookies to run the
          service:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Essential cookies.</strong> We may use essential cookies to authenticate users and prevent
            fraudulent use of user accounts.
          </li>
          <li>
            <strong>Preferences cookies.</strong> We may use preferences cookies to remember information that changes
            the way the service behaves or looks, such as the "remember me" functionality.
          </li>
          <li>
            <strong>Analytics cookies.</strong> We may use analytics cookies to track information how the service is
            used so that we can make improvements.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">4. Contact Us</h2>
        <p>If you have any questions about our Cookie Policy, please contact us at:</p>
        <p className="mt-2">
          <a href="mailto:support@betteruai.com" className="text-[#00f2fe] hover:underline">
            support@betteruai.com
          </a>
        </p>

        <div className="mt-12 pt-6 border-t border-gray-800">
          <Link href="/" className="text-[#00f2fe] hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
