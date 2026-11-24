export const instant = false

import { client } from '@/lib/sanity'
import { pageH1, bodyText } from '@/lib/styles'

export default async function About() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className={pageH1}>What is this?</h1>
      <p className={`whitespace-pre-line ${bodyText}`}>{settings?.aboutText}</p>
    </main>
  )
}   