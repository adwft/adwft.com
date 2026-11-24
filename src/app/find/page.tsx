export const instant = false   

import {client} from '@/lib/sanity'

export default async function Contact() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Find</h1>
      <p className="whitespace-pre-line mb-4">{settings?.contactText}</p>
      <a href={`mailto:${settings?.contactEmail}`} className="text-blue-600 hover:underline">
        {settings?.contactEmail}
      </a>
    </main>
  )
}   