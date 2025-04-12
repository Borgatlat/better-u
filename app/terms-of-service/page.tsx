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
        <p>Last Updated: April 5, 2025</p>

        <h2 className="text-xl font-semibold text-white mt-8">1. Introduction</h2>
        <p>
          Welcome to BetterU AI. These terms and conditions outline the rules and regulations for the use of our website
          and services. By accessing this website or using our mobile application, we assume you accept these terms and
          conditions in full. Do not continue to use BetterU AI if you do not accept all of the terms and conditions
          stated on this page.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. License</h2>
        <p>
          Unless otherwise stated, BetterU AI and/or its licensors own the intellectual property rights for all material
          on BetterU AI. All intellectual property rights are reserved.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">3. App Store Terms</h2>
        <p>When you download our app from the Apple App Store, you acknowledge and agree that:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>These Terms of Service are concluded between you and BetterU AI only, and not with Apple, Inc.</li>
          <li>BetterU AI, not Apple, is solely responsible for the licensed application and its content.</li>
          <li>
            Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the
            licensed application.
          </li>
          <li>
            In the event of any failure of the licensed application to conform to any applicable warranty, you may
            notify Apple, and Apple will refund the purchase price for the licensed application to you; and to the
            maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with
            respect to the licensed application.
          </li>
          <li>
            Apple is not responsible for addressing any claims by you or any third party relating to the licensed
            application or your possession and/or use of the licensed application, including, but not limited to: (i)
            product liability claims; (ii) any claim that the licensed application fails to conform to any applicable
            legal or regulatory requirement; and (iii) claims arising under consumer protection, privacy, or similar
            legislation.
          </li>
          <li>
            In the event of any third-party claim that the licensed application or your possession and use of that
            licensed application infringes that third party's intellectual property rights, Apple will not be
            responsible for the investigation, defense, settlement, and discharge of any such intellectual property
            infringement claim.
          </li>
          <li>
            You represent and warrant that (i) you are not located in a country that is subject to a U.S. Government
            embargo, or that has been designated by the U.S. Government as a "terrorist supporting" country; and (ii)
            you are not listed on any U.S. Government list of prohibited or restricted parties.
          </li>
          <li>
            Apple, and Apple's subsidiaries, are third-party beneficiaries of these Terms of Service, and that, upon
            your acceptance of the terms and conditions of these Terms of Service, Apple will have the right (and will
            be deemed to have accepted the right) to enforce these Terms of Service against you as a third-party
            beneficiary thereof.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">4. User-Generated Content</h2>
        <p>
          Our app may allow you to post, link, store, share and otherwise make available certain information, text,
          graphics, videos, or other material. You are responsible for the content you post. By posting content, you
          grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content
          on and through our service.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">5. Subscriptions</h2>
        <p>
          Some parts of our service are billed on a subscription basis. You will be billed in advance on a recurring and
          periodic basis, depending on the type of subscription plan you select. At the end of each period, your
          subscription will automatically renew under the same conditions unless you cancel it or BetterU AI cancels it.
        </p>
        <p className="mt-2">
          You may cancel your subscription renewal either through your online account management page or by contacting
          our customer support team. A valid payment method is required to process the payment for your subscription.
          You shall provide accurate and complete information and promptly update all information to keep your billing
          account current, complete, and accurate.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">6. Free Trial</h2>
        <p>
          BetterU AI may, at its sole discretion, offer a subscription with a free trial for a limited period of time.
          You may be required to enter your billing information to sign up for the free trial. If you do enter your
          billing information when signing up for a free trial, you will not be charged by BetterU AI until the free
          trial has expired. On the last day of the free trial period, unless you canceled your subscription, you will
          be automatically charged the applicable subscription fee for the type of subscription you have selected.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">7. Data Privacy</h2>
        <p>
          Our Privacy Policy describes how we handle the information you provide to us when you use our services. You
          understand that through your use of the services you consent to the collection and use of this information,
          including the transfer of this information to the United States, Ireland, and/or other countries for storage,
          processing, and use by BetterU AI and its affiliates.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">8. Limitation of Liability</h2>
        <p>
          In no event shall BetterU AI, nor any of its officers, directors and employees, be held liable for anything
          arising out of or in any way connected with your use of this website or our mobile application. BetterU AI
          shall not be liable for any indirect, consequential or special liability arising out of or in any way related
          to your use of this website or our mobile application.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">9. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the United States, without regard
          to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be
          considered a waiver of those rights.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">10. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
          material we will try to provide at least 30 days' notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole discretion.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">11. Contact Us</h2>
        <p>If you have any questions about these Terms of Service, please contact us at:</p>
        <p className="mt-2">
          <a href="mailto:lucas@betteruai.com" className="text-[#00f2fe] hover:underline">
            lucas@betteruai.com
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
