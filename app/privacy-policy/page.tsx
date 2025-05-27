import Link from "next/link"
import { Breadcrumbs } from "../components/breadcrumbs"

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-24 mt-safe-top pt-14">
      <Breadcrumbs />

      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
        BetterUAI Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-300">
        <p>Last Updated: May 27, 2025</p>

        <h2 className="text-xl font-semibold text-white mt-8">1. Introduction</h2>
        <p>
          BetterUAI, Inc. ("BetterUAI," "we," "us," or "our") respects your privacy and is committed to protecting your
          personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
          information when you use our mobile and web applications (the "Service").
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Account Information:</strong> Email address, username, and password (securely hashed).
          </li>
          <li>
            <strong>Profile & Usage Data:</strong> Profile details you choose to provide (e.g., name, age, gender);
            wellness activity data (workouts, hydration logs, mental health check‑ins); device information (model,
            operating system) and app usage statistics.
          </li>
          <li>
            <strong>Automatically Collected Data:</strong> IP address, device identifiers, language preference, crash
            reports, and performance metrics.
          </li>
          <li>
            <strong>Third‑Party Integrations:</strong> Data from connected services (e.g., health platforms) when you
            choose to link them.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Create, manage, and personalize your account;</li>
          <li>Provide, improve, and troubleshoot the Service;</li>
          <li>Communicate with you about updates, promotions, and support;</li>
          <li>Analyze trends and usage to enhance features;</li>
          <li>Detect, prevent, and address technical or security issues.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">4. Sharing Your Information</h2>
        <p>We do not sell your personal information. We may share data with:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Service Providers:</strong> Vendors who perform functions on our behalf (hosting, analytics, email
            delivery), limited to what they need to provide those services;
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required by law, to protect our rights, or to investigate fraud or
            security issues;
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of our assets,
            subject to this Privacy Policy.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">5. Your Choices and Controls</h2>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Profile & Communications:</strong> You can view and update your profile information at any time and
            opt out of promotional emails via the unsubscribe link.
          </li>
          <li>
            <strong>Device Permissions:</strong> You may disable device permissions (e.g., health data access) in your
            device settings, though this may limit certain features.
          </li>
          <li>
            <strong>Data Deletion:</strong> You can request deletion of your account and personal data by contacting us
            at support@betteru.ai. We will process your request unless retention is legally required.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">6. Data Security</h2>
        <p>
          We implement reasonable administrative, technical, and physical safeguards to protect your information.
          However, no system is entirely secure; you acknowledge that transmitting data over the internet carries
          inherent risks.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">7. Data Retention</h2>
        <p>
          We retain your personal information as long as your account is active or as needed to provide the Service,
          comply with legal obligations, resolve disputes, and enforce our agreements.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">8. Children's Privacy</h2>
        <p>
          Our Service is intended for users aged 13 and older. We do not knowingly collect personal information from
          children under 13. If we learn we have inadvertently collected such information, we will delete it promptly.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">9. International Users</h2>
        <p>
          If you access the Service from outside the United States, your information may be transferred to and processed
          in the U.S., where data protection laws may differ. By using the Service, you consent to these transfers.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy at any time. We will notify you of material changes via email or in‑app
          notice. Continued use of the Service after notification constitutes acceptance of the revised policy.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">11. Contact Us</h2>
        <p>If you have questions or requests about this Privacy Policy, please contact us at:</p>
        <p className="mt-2">
          <a href="mailto:support@betteruai.com" className="text-[#00f2fe] hover:underline">
            support@betteruai.com
          </a>
        </p>

        <p className="mt-8 font-semibold text-white">
          By using BetterUAI, you acknowledge that you have read and understood this Privacy Policy.
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
