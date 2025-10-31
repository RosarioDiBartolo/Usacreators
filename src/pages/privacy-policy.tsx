import LegalPage from "@/components/legal-page";
import WebsiteLink from "@/components/website-link";
import { privacyPolicy } from "@/lib/privacy-policies";

function PrivacPolicy() {
  return (
     <LegalPage
     title="Privacy Policy"
      lastUpdated="1 Jan 2025"
      paragraph={<> We values your privacy and is committed to protecting your personal
          information. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website
          <WebsiteLink /> and when you use any of our related services
          (collectively, the “Platform”). By using our Platform, you consent to
          this Privacy Policy. If you do not agree, please do not access or use
          the Platform.</>}
     content={privacyPolicy}/>
  );
}

export default PrivacPolicy;
