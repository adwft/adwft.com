export const instant = false   

import {client} from '@/lib/sanity'

export default async function About() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">What</h1>
      <p className="whitespace-pre-line">{settings?.aboutText}</p>
    </main>
  )
}   