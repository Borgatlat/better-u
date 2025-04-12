import Link from "next/link"
import { Breadcrumbs } from "../components/breadcrumbs"

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-24 mt-safe-top pt-14">
      <Breadcrumbs />

      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-300">
        <p>Last Updated: April 5, 2025</p>

        <h2 className="text-xl font-semibold text-white mt-8">1. Introduction</h2>
        <p>
          Welcome to BetterU AI. We respect your privacy and are committed to protecting your personal data. This
          privacy policy will inform you about how we look after your personal data when you visit our website or use
          our mobile application, and tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. Data We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped
          together as follows:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Identity and Profile Data</strong> includes email address, age, gender, height, weight, fitness
            goals, and training level.
          </li>
          <li>
            <strong>Health and Fitness Data</strong> includes workout history, exercise statistics, physical
            measurements, and progress tracking.
          </li>
          <li>
            <strong>Wellness Data</strong> includes mood tracking, emotional states, and mental wellness information.
          </li>
          <li>
            <strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and
            version, time zone setting and location, browser plug-in types and versions, operating system and platform,
            and other technology on the devices you use to access this website or application.
          </li>
          <li>
            <strong>Usage Data</strong> includes information about how you use our website, mobile application, products
            and services.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">3. How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
          for the following purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>To create and maintain your user profile within our application.</li>
          <li>To provide personalized fitness, wellness, and self-improvement recommendations.</li>
          <li>To track your progress and help you achieve your fitness and wellness goals.</li>
          <li>To analyze trends and improve our services based on user behavior and feedback.</li>
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>
            Where it is necessary for our legitimate interests (or those of a third party) and your interests and
            fundamental rights do not override those interests.
          </li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">4. Data Storage and Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against
          accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. These measures
          include:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Encryption of sensitive personal data both in transit and at rest.</li>
          <li>Regular security assessments and testing of our systems.</li>
          <li>Access controls and authentication procedures for our staff and systems.</li>
          <li>Regular backups to prevent data loss.</li>
        </ul>
        <p className="mt-4">
          We store your data on secure servers and cloud services that comply with industry-standard security practices.
          We retain your personal data only for as long as necessary to fulfill the purposes for which we collected it,
          including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">5. Data Sharing</h2>
        <p>We may share your personal data with the following categories of recipients:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Service providers who provide IT, system administration, and platform services.</li>
          <li>Professional advisers including lawyers, bankers, auditors, and insurers.</li>
          <li>
            Regulators and other authorities who require reporting of processing activities in certain circumstances.
          </li>
          <li>Third parties to whom we may choose to sell, transfer, or merge parts of our business or our assets.</li>
        </ul>
        <p className="mt-4">
          We require all third parties to respect the security of your personal data and to treat it in accordance with
          the law. We do not allow our third-party service providers to use your personal data for their own purposes
          and only permit them to process your personal data for specified purposes and in accordance with our
          instructions.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">6. Your Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>The right to access, update or delete the information we have on you.</li>
          <li>
            The right of rectification - the right to have your information corrected if it is inaccurate or incomplete.
          </li>
          <li>The right to object to our processing of your personal data.</li>
          <li>
            The right of restriction - the right to request that we restrict the processing of your personal data.
          </li>
          <li>
            The right to data portability - the right to request that we transfer the data we have collected to another
            organization, or directly to you.
          </li>
          <li>The right to withdraw consent at any time where we rely on consent to process your personal data.</li>
        </ul>
        <p className="mt-4">
          If you wish to exercise any of these rights, please contact us using the details provided below.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">7. Children's Privacy</h2>
        <p>
          Our service is not intended for use by children under the age of 13. We do not knowingly collect personal data
          from children under 13. If you are a parent or guardian and you are aware that your child has provided us with
          personal data, please contact us so that we can take necessary actions.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">8. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">9. Contact Us</h2>
        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
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
