import Link from "next/link"
import { Breadcrumbs } from "../components/breadcrumbs"

export default function TermsOfService() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-24 mt-safe-top pt-14">
      <Breadcrumbs />

      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
        Terms of Service
      </h1>

      <div className="space-y-6 text-gray-300">
        <p>Last Updated: May 27, 2025</p>

        <h2 className="text-xl font-semibold text-white mt-8">1. Definitions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>BetterUAI, we, us:</strong> BetterUAI Inc.
          </li>
          <li>
            <strong>Service:</strong> the BetterUAI mobile and web applications, including all features and content.
          </li>
          <li>
            <strong>User Content:</strong> any text, images, or other materials you upload or submit.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">2. Acceptance of Terms</h2>
        <p>
          By downloading, accessing, or using the Service, you agree to these Terms. If you do not agree, you must stop
          using the Service immediately.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">3. Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must be at least 13 years old (or older if required by local law).</li>
          <li>You warrant that all information you provide is accurate and up to date.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">4. Account Registration</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must provide a valid email address and a unique username.</li>
          <li>
            You are responsible for safeguarding your account credentials and must notify us immediately if you suspect
            unauthorized use.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">5. User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Violate any laws, regulations, or third‑party rights.</li>
          <li>Harass, threaten, or harm other users.</li>
          <li>Reverse‑engineer, scrape, or disrupt the Service.</li>
          <li>Use bots or automated scripts without our prior written permission.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">6. Content Ownership & License</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All content and features of the Service are the exclusive property of BetterUAI.</li>
          <li>
            By submitting User Content, you grant us a worldwide, royalty‑free, sublicensable license to use, reproduce,
            modify, and display it in connection with the Service.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">7. Modifications to Service or Terms</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We may update the Service or these Terms at any time.</li>
          <li>
            We will notify you of material changes via email or an in‑app notice. Continuing to use the Service after
            notification constitutes acceptance of the new Terms.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">8. Termination</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We may suspend or terminate your account for violations of these Terms or for inactivity.</li>
          <li>Upon termination, your right to access the Service ends immediately.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">9. Disclaimers</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The Service is provided "AS IS" and "AS AVAILABLE," without any warranties of any kind, express or implied.
          </li>
          <li>
            We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose,
            and non‑infringement.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">10. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, BetterUAI's total liability for any claim arising out of or relating
          to these Terms or the Service will not exceed the greater of (a) the amount you paid us in the twelve months
          prior to the claim or (b) fifty U.S. dollars (USD $50).
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">11. Governing Law & Dispute Resolution</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>These Terms are governed by the laws of the United States.</li>
          <li>
            Any dispute arising under or in connection with these Terms shall be resolved exclusively in the state or
            federal courts located in the United States, and you consent to personal jurisdiction there.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">12. Miscellaneous</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            If any provision of these Terms is found unenforceable, the remaining provisions will remain in full force.
          </li>
          <li>
            These Terms, along with our Privacy Policy, constitute the entire agreement between you and BetterUAI
            regarding the Service.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">13. Contact Information</h2>
        <p>For questions about these Terms, please contact us at:</p>
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
