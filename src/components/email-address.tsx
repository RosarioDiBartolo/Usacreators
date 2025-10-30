import { officialEmail } from "@/lib/constants"

function EmailAddress() {
  return (
    <a href={`mailto:${officialEmail}`} aria-label="Email us at hello@example.com">{officialEmail}</a>

  )
}

export default EmailAddress