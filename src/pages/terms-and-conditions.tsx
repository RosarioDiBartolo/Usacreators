import LegalPage from '@/components/legal-page'
import { domain } from '@/lib/creators/constants'  
import { termsData } from '@/lib/terms-and-conditions'
function TermsAndConditions() {
  return (
    <LegalPage
          title="Terms and Conditions"
          paragraph={<>
              These <span className=' font-bold'>Terms</span> constitute a legally binding agreement between you and Miami Creators, a company organized and existing under the laws of the State of Florida, governing your access to and use of the website {domain} and any related services collectively.
              By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not use the Platform.
          </>} lastUpdated={'1 Jan 2025'} 
          content={termsData}    />
  )
}

export default TermsAndConditions