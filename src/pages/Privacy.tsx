import LegalDocument from '../components/LegalDocument'
import { privacyContent } from '../data/privacyContent'

export default function Privacy() {
  return (
    <LegalDocument
      title="Privacy Policy"
      description="How Sydney collects, uses, stores, shares, and protects personal data."
      path="/privacy"
      effectiveDate="[EFFECTIVE DATE]"
      lastUpdated="[LAST UPDATED DATE]"
      content={privacyContent}
    />
  )
}
