export const instant = false

import {client} from '@/lib/sanity'
import Link from 'next/link'

const query = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {_id, title, slug, publishedAt}`

export default async function Memories() {
  const posts = await client.fetch<{_id: string, title: string, slug: {current: string}, publishedAt: string}[]>(query)

  const groups: Record<string, typeof posts> = {}
  for (const p of posts) {
    const key = new Date(p.publishedAt).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})
    ;(groups[key] ||= []).push(p)
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Database</h1>
      {Object.entries(groups).map(([month, items]) => (
        <section key={month} className="mb-6">
          <h2 className="text-lg font-semibold text-gray-500">{month}</h2>
          <ul className="list-disc ml-4">
            {items.map((p) => (
              <li key={p._id}>
                <Link href={`/posts/${p.slug.current}`} className="hover:underline">{p.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}   