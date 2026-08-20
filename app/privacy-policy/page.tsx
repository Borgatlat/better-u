import Link from "next/link"
import { Breadcrumbs } from "../components/breadcrumbs"

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-24 mt-safe-top pt-14">
      <Breadcrumbs />

      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
        BetterU Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-300">
        <p>Last Updated: August 20, 2026</p>

        <h2 className="text-xl font-semibold text-white mt-8">1. Introduction</h2>
        <p>
          BetterU LLC ("BetterU," "we," "us," or "our") respects your privacy and is committed to protecting your
          personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
          information when you use our mobile and web applications, websites, and related services (collectively, the
          "Service"). By accessing or using the Service, you agree to the collection and use of information in
          accordance with this Privacy Policy. If you do not agree, please do not use the Service.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. Information We Collect</h2>
        <p>
          We collect information that you provide directly, information collected automatically, and information from
          third parties. This includes:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Account Information:</strong> Email address, username, and password (stored in hashed/encrypted
            form).
          </li>
          <li>
            <strong>Profile &amp; Wellness Data:</strong> Profile details you choose to provide (e.g., name, age,
            gender); wellness and activity data such as workouts, hydration logs, nutrition, goals, and mental health or
            mood check-ins. Some of this may be considered sensitive personal information, which we process only to
            provide the Service and with your consent where required by law.
          </li>
          <li>
            <strong>Content You Submit:</strong> Messages, prompts, journal entries, and other content you enter,
            including anything you share with our AI features.
          </li>
          <li>
            <strong>Automatically Collected Data:</strong> IP address, device identifiers, device and browser type,
            operating system, language preference, app usage statistics, log data, crash reports, and performance
            metrics, collected via cookies and similar technologies (see our{" "}
            <Link href="/cookie-policy" className="text-[#00f2fe] hover:underline">
              Cookie Policy
            </Link>
            ).
          </li>
          <li>
            <strong>Third-Party Integrations:</strong> Data from services you choose to link (e.g., health platforms or
            sign-in providers), limited to what you authorize.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Create, manage, and personalize your account and experience;</li>
          <li>Provide, operate, improve, and troubleshoot the Service;</li>
          <li>Power AI-based features, personalization, and recommendations;</li>
          <li>Communicate with you about updates, security alerts, promotions, and support;</li>
          <li>Analyze trends and usage to enhance features and develop new ones;</li>
          <li>Detect, prevent, and address fraud, abuse, and technical or security issues;</li>
          <li>Comply with legal obligations and enforce our agreements.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">4. Artificial Intelligence Features</h2>
        <p>
          The Service uses artificial intelligence and machine learning technologies to provide personalized guidance,
          insights, and content. When you use these features, the content you submit (such as messages, prompts, and
          relevant profile or wellness data) may be processed by us and by trusted third-party AI providers acting on
          our behalf in order to generate responses.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            AI-generated output may be inaccurate, incomplete, or not suitable for your circumstances. It is provided
            for informational and self-improvement purposes only.
          </li>
          <li>
            AI features are <strong>not</strong> a substitute for professional medical, psychological, legal, or
            financial advice. See the Health &amp; AI Disclaimer below.
          </li>
          <li>
            We take steps intended to prevent your personal information from being used to train third-party
            general-purpose AI models. However, we cannot guarantee the practices of every third party, and you should
            avoid submitting information you do not wish to share.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">5. Health &amp; AI Disclaimer</h2>
        <p>
          BetterU provides general wellness, fitness, and self-improvement information and tools. It does not provide
          medical advice, diagnosis, or treatment, and it is not a medical device. Content and AI output are not a
          substitute for advice from a qualified physician, therapist, or other licensed professional. Always seek the
          guidance of a qualified professional with any questions about a medical or mental health condition, and never
          disregard or delay seeking professional advice because of something you read or received through the Service.
          If you may be experiencing a medical or mental health emergency, call your local emergency services
          immediately. Your use of the Service and any reliance on its content is solely at your own risk.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">6. How We Store and Process Data</h2>
        <p>
          We use <strong>Supabase</strong> as our primary database and authentication provider to securely store your
          account and application data. Our infrastructure and hosting are provided by <strong>Vercel</strong>. These
          providers process data on our behalf under their own security and privacy commitments. Data may be stored and
          processed on servers located in the United States and other countries where our service providers operate.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">7. Sharing Your Information</h2>
        <p>
          We do <strong>not</strong> sell your personal information, and we do not share it for cross-context behavioral
          advertising. We share data only as described below:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Service Providers (Sub-Processors):</strong> Trusted vendors who perform functions on our behalf,
            limited to what they need to provide their services, including:
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Supabase</strong> — database storage and authentication;
              </li>
              <li>
                <strong>Vercel</strong> — application hosting and web analytics;
              </li>
              <li>
                <strong>Resend</strong> — transactional and marketing email delivery;
              </li>
              <li>
                <strong>Upstash</strong> — caching and rate limiting;
              </li>
              <li>
                <strong>AI providers</strong> — processing prompts and content to power AI features.
              </li>
            </ul>
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required by law or valid legal process, to protect our rights,
            safety, and property, or to investigate fraud, security, or abuse;
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with a merger, acquisition, financing, or sale of assets,
            subject to this Privacy Policy;
          </li>
          <li>
            <strong>With Your Consent:</strong> When you direct us to share your information with a third party.
          </li>
        </ul>
        <p>
          Our list of service providers may change over time as we improve the Service. We require our providers to
          protect your information consistent with this Privacy Policy and applicable law.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">8. Your Choices and Controls</h2>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Profile &amp; Communications:</strong> You can view and update your profile at any time and opt out
            of promotional emails via the unsubscribe link.
          </li>
          <li>
            <strong>Device Permissions:</strong> You may disable device permissions (e.g., health data access) in your
            device settings, though this may limit certain features.
          </li>
          <li>
            <strong>Cookies:</strong> You can manage your cookie preferences through our{" "}
            <Link href="/cookie-preferences" className="text-[#00f2fe] hover:underline">
              Cookie Preferences
            </Link>{" "}
            page.
          </li>
          <li>
            <strong>Access &amp; Deletion:</strong> You can request to access, correct, or delete your account and
            personal data by contacting us at support@betteruai.com. We will process your request unless retention is
            legally required.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">9. Your Privacy Rights</h2>
        <p>
          Depending on where you live, you may have rights under laws such as the EU/UK General Data Protection
          Regulation (GDPR) or the California Consumer Privacy Act, as amended by the CPRA (CCPA/CPRA), including the
          right to access, correct, delete, or port your personal information, to opt out of certain processing, and to
          not be discriminated against for exercising these rights. To exercise any of these rights, contact us at
          support@betteruai.com. We will verify and respond to your request as required by applicable law. Where we rely
          on consent, you may withdraw it at any time.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">10. Data Security</h2>
        <p>
          We implement reasonable administrative, technical, and physical safeguards designed to protect your
          information, including encryption in transit and access controls. However, no method of transmission or
          storage is completely secure, and we cannot guarantee absolute security. You are responsible for keeping your
          account credentials confidential, and you acknowledge that transmitting data over the internet carries
          inherent risks.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">11. Data Retention</h2>
        <p>
          We retain your personal information for as long as your account is active or as needed to provide the Service,
          comply with legal obligations, resolve disputes, and enforce our agreements. When no longer needed, we take
          reasonable steps to delete or anonymize it.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">12. Children's Privacy</h2>
        <p>
          Our Service is intended for users aged 13 and older. We do not knowingly collect personal information from
          children under 13. If we learn we have inadvertently collected such information, we will delete it promptly. If
          you believe a child has provided us information, please contact us.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">13. International Users</h2>
        <p>
          If you access the Service from outside the United States, your information may be transferred to, stored, and
          processed in the U.S. and other countries where our service providers operate, where data protection laws may
          differ from those in your jurisdiction. Where required, we use appropriate safeguards for such transfers. By
          using the Service, you consent to these transfers.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">14. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material changes via email or
          in-app notice and update the "Last Updated" date above. Continued use of the Service after notification
          constitutes acceptance of the revised policy.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">15. Contact Us</h2>
        <p>If you have questions or requests about this Privacy Policy, please contact us at:</p>
        <p className="mt-2">
          <a href="mailto:support@betteruai.com" className="text-[#00f2fe] hover:underline">
            support@betteruai.com
          </a>
        </p>

        <p className="mt-8 font-semibold text-white">
          By using BetterU, you acknowledge that you have read and understood this Privacy Policy.
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
