import EmailAddress from "@/components/email-address";
import { companyName } from "../../shared/constants";

export const cookiePolicy = [
  {
    title: "1. What Are Cookies",
    content: (
      <>
        Cookies are small text files stored on your device (computer, tablet, or
        smartphone) when you visit a website. They help us recognize your
        browser, remember your preferences, and improve your overall experience.
        <br />
        <br />
        Cookies may be <em>session cookies</em> (which expire when you close
        your browser) or <em>persistent cookies</em> (which remain stored until
        deleted).
      </>
    ),
  },
  {
    title: "2. How We Use Cookies",
    content: (
      <>
        {companyName} uses cookies and similar technologies for the following
        purposes:
        <h4 className="font-semibold mt-3">2(a) Essential Cookies</h4>
        <p>
          Necessary for the basic functionality of our Platform — for example,
          to enable secure log-ins, form submissions, and navigation. You cannot
          disable these cookies through our interface because the site would not
          function properly without them.
        </p>
        <h4 className="font-semibold mt-3">2(b) Performance &amp; Analytics Cookies</h4>
        <p>
          Used to understand how visitors interact with our Platform — such as
          which pages are visited most often, how users navigate, and whether
          they experience errors. This helps us improve the usability and
          performance of our services.
        </p>
        <h4 className="font-semibold mt-3">2(c) Functional Cookies</h4>
        <p>
          These remember your preferences (such as language or region) to
          provide a more personalized experience on the Platform.
        </p>
        <h4 className="font-semibold mt-3">2(d) Marketing &amp; Advertising Cookies</h4>
        <p>
          We may use these to deliver more relevant advertisements or to measure
          the effectiveness of marketing campaigns (for example, through
          platforms like TikTok or Meta). These cookies can track user activity
          across websites and may be used to build a profile of your interests.
          You can disable these cookies at any time (see Section 5).
        </p>
      </>
    ),
  },
  {
    title: "3. Third-Party Cookies",
    content: (
      <>
        Certain third-party services integrated into our Platform (e.g.,
        analytics, advertising, or embedded media) may place their own cookies
        on your device. These providers may collect data in accordance with
        their own privacy policies, over which {companyName} has no control. We
        encourage you to review the policies of these providers for more
        information.
      </>
    ),
  },
  {
    title: "4. Your Choices",
    content: (
      <>
        Most web browsers automatically accept cookies, but you can usually
        modify your browser settings to decline cookies or notify you before
        accepting them. If you choose to disable cookies, some parts of our
        Platform may not function properly.
        <br />
        <br />
        You may also:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Delete existing cookies from your device</li>
          <li>Block third-party cookies in your browser settings</li>
          <li>Use “Do Not Track” or privacy modes available in most browsers</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Opt-Out Options for Targeted Advertising",
    content: (
      <>
        If you wish to opt out of targeted advertising or cross-site tracking,
        you can use the following industry tools:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <a
              href="https://optout.networkadvertising.org/"
              target="_blank"
              rel="noreferrer"
            >
              Network Advertising Initiative Opt-Out Tool
            </a>
          </li>
          <li>
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noreferrer"
            >
              Digital Advertising Alliance Opt-Out Tool
            </a>
          </li>
          <li>
            <a
              href="https://youradchoices.com/"
              target="_blank"
              rel="noreferrer"
            >
              YourAdChoices
            </a>
          </li>
        </ul>
        <p className="mt-2">
          Note: opting out does not remove ads entirely but may make them less
          relevant to your interests.
        </p>
      </>
    ),
  },
  {
    title: "6. Changes to This Cookie Policy",
    content: (
      <>
        We may update this Cookie Policy periodically to reflect changes in
        technology or applicable laws. Revised versions will be posted on this
        page with the updated “Last Updated” date. We encourage you to review
        this page regularly to stay informed.
      </>
    ),
  },
  {
    title: "7. Contact Us",
    content: (
      <>
        If you have any questions or concerns about our use of cookies or this
        Policy, please contact:
        <br />
        <br />
        <strong>{companyName}</strong>
        <br />
        Miami-Dade County, Florida, USA
        <br />
        📧 <EmailAddress />
        <br />
        <br />
        By using our Platform, you acknowledge that you have read, understood,
        and consent to this Cookie Policy.
      </>
    ),
  },
];
