export const instant = false

import { client } from '@/lib/sanity'
import { pageH1, bodyText, linkStyle } from '@/lib/styles'

export default async function Contact() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className={pageH1}>Tell Me</h1>
      <p className={`whitespace-pre-line mb-4 ${bodyText}`}>{settings?.contactText}</p>
      <a href={`mailto:${settings?.contactEmail}`} className={linkStyle}>
        {settings?.contactEmail}
      </a>
    </main>
  )
}   