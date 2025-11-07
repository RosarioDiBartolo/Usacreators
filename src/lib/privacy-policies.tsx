import EmailAddress from "@/components/email-address";
import { companyName } from "./creators/constants";

export const privacyPolicy = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        We collect personal information voluntarily provided by users in two
        primary contexts: <strong>Creators</strong> and <strong>Brands</strong>.
        <br />
        <br />
        The types of information we may collect include:
        <h4 className="font-semibold mt-3">1.1 From Creators</h4>
        When a Creator registers or submits a form on the Platform, we collect:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Full name and photograph</li>
          <li>Age of the creator</li>
          <li>Content niche or category</li>
          <li>Social media links (TikTok, Instagram, etc.)</li>
          <li>Portfolio links or video samples</li>
          <li>Self-written biography or description</li>
          <li>E-mail address</li>
        </ul>
        <h4 className="font-semibold mt-3">1.2 From Brands</h4>
        When a Brand registers or purchases access to the Creator Catalog, we
        collect:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Business name</li>
          <li>Representative name and contact details (e-mail, phone)</li>
          <li>Company website or social media links</li>
          <li>Campaign details or creative requirements (optional)</li>
        </ul>
        <h4 className="font-semibold mt-3">1.3 Automatically Collected Data</h4>
        When you visit our website, we may automatically collect:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>IP address and device information</li>
          <li>Browser type and version</li>
          <li>Pages visited, timestamps, and referring URLs</li>
          <li>General geographic location (city, state, country)</li>
        </ul>
        This data is used for analytics, security, and platform optimization
        purposes only.
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <>
        We use the collected data solely for legitimate business purposes,
        including to:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Operate and maintain the Platform</li>
          <li>Create and manage user accounts</li>
          <li>
            Display Creator profiles in the private catalog accessible only to
            verified, paying Brands
          </li>
          <li>Communicate with users about campaigns, opportunities, or updates</li>
          <li>Verify identities and ensure the integrity of user submissions</li>
          <li>Provide customer support and respond to inquiries</li>
          <li>Improve our services and user experience</li>
          <li>Enforce our Terms and comply with legal obligations</li>
        </ul>
        We do not sell, rent, or trade user data to third parties.
      </>
    ),
  },
  {
    title: "3. E-mail Communications and Opt-Out",
    content: (
      <>
        By providing your e-mail address, you consent to receive:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Notifications about new brand opportunities and collaborations</li>
          <li>Platform updates or community news</li>
          <li>Transactional messages related to your account</li>
        </ul>
        You can opt out at any time by clicking “unsubscribe” in our e-mails or
        by contacting <EmailAddress />.
        <br />
        Even if you opt out, we may still send non-promotional messages
        regarding your account or legal notices.
      </>
    ),
  },
  {
    title: "4. Data Visibility and Sharing",
    content: (
      <>
        <h4 className="font-semibold mt-2">4.1 Creator Catalog</h4>
        Creator profiles are visible only to verified Brands who have purchased
        access.
        <br />
        General visitors and the public cannot view Creator data.
        <br />
        Brands are contractually prohibited from copying, reselling, or sharing
        Creator information.
        <h4 className="font-semibold mt-3">4.2 Third-Party Service Providers</h4>
        We may use third-party vendors (e.g., hosting, analytics, payment
        processors) to support our operations.
        <br />
        These providers only access data necessary to perform their functions
        and are bound by confidentiality obligations.
        <h4 className="font-semibold mt-3">4.3 Legal Requirements</h4>
        We may disclose information if required by law, subpoena, or government
        request, or to protect our legal rights, users, or the public.
      </>
    ),
  },
  {
    title: "5. Data Retention",
    content: (
      <>
        We retain personal information only for as long as necessary to fulfill
        the purposes described in this Policy or as required by law.
        <br />
        <br />
        In general:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Creator and Brand data are retained while the account is active</li>
          <li>
            If an account remains inactive for more than 24 months, data may be
            archived or deleted
          </li>
          <li>
            Users may request deletion of their data at any time (see Section 8)
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Data Security",
    content: (
      <>
        We implement reasonable physical, electronic, and administrative
        safeguards to protect personal information against loss, misuse, or
        unauthorized access.
        <br />
        Access to personal data is limited to authorized personnel who require
        it for legitimate business purposes.
        <br />
        However, no online platform can guarantee absolute security, and you use
        the Platform at your own risk.
      </>
    ),
  },
  {
    title: "7. Children’s Privacy",
    content: (
      <>
        The Platform is intended for users aged 18 and older.
        <br />
        We do not knowingly collect data from anyone under 18 years old.
        <br />
        If you believe we have inadvertently collected such information, please
        contact us, and we will promptly delete it.
      </>
    ),
  },
  {
    title: "8. Your Rights (Florida Digital Bill of Rights)",
    content: (
      <>
        Under the <strong>Florida Digital Bill of Rights (FDBR)</strong>, you
        have the right to:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Access the personal information we hold about you</li>
          <li>Delete your personal data</li>
          <li>Correct inaccurate information</li>
          <li>Opt out of targeted advertising or data sharing</li>
          <li>Receive a copy of your data in a portable format</li>
        </ul>
        To exercise these rights, contact us at <EmailAddress />.
        <br />
        We may require reasonable verification of your identity before
        fulfilling your request.
      </>
    ),
  },
  {
    title: "9. International Users",
    content: (
      <>
        Although the Platform is primarily intended for users in the United
        States, data may be processed in or transferred to other jurisdictions
        where our service providers operate.
        <br />
        By using the Platform, you consent to such transfers, which will occur
        in compliance with applicable data-protection standards.
      </>
    ),
  },
  {
    title: "10. Changes to This Policy",
    content: (
      <>
        We may update this Privacy Policy from time to time.
        <br />
        When we do, we will revise the “Last Updated” date at the top of this
        page.
        <br />
        Significant changes will be communicated via e-mail or platform notice.
        <br />
        Your continued use of the Platform after updates constitutes your
        acceptance of the revised Policy.
      </>
    ),
  },
  {
    title: "11. Contact Us",
    content: (
      <>
        For any questions, concerns, or requests related to this Privacy Policy,
        please contact:
        <br />
        <br />
        <strong>{companyName}</strong>
        <br />
        📧 <EmailAddress />
      </>
    ),
  },
];
