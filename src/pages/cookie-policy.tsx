import LegalPage from "@/components/legal-page";
import { Button } from "@/components/ui/button";
import WebsiteLink from "@/components/website-link";
import { cookiePolicy } from "@/lib/cookies";

function CookiePolicy() {
  return (
     <LegalPage
     title="Cookie Policy"
      lastUpdated="1 Jan 2025"
      paragraph={<> This Cookie Policy explains how Miami Creators uses cookies and similar tracking technologies on our website <WebsiteLink />.
This Policy should be read together with our Privacy Policy which explains how we collect, use, and safeguard personal information.
By continuing to browse or use our Platform, you consent to our use of cookies as described in this Policy.
</>}
     content={cookiePolicy}/>
  );
}

export default CookiePolicy;
