import LegalDocument from '../components/LegalDocument'
import { termsContent } from '../data/termsContent'

export default function Terms() {
  return (
    <LegalDocument
      title="Terms and Conditions"
      description="Terms and Conditions governing access to and use of the Sydney service."
      path="/terms"
      effectiveDate="[EFFECTIVE DATE]"
      lastUpdated="[LAST UPDATED DATE]"
      content={termsContent}
    />
  )
}
