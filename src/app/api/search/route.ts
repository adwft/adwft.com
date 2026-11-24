import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q')
    if (!q || q.length < 2) return NextResponse.json([])

    const results = await client.fetch(
      `*[_type == "post" && (title match $q || category match $q)] | order(publishedAt desc)[0..5]{_id, title, slug}`,
      { q: `*${q}*` }
    )

    return NextResponse.json(results)
  } catch (err) {
    console.error('Search error:', err)
    return NextResponse.json([])
  }
}   