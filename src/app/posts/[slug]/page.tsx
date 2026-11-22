export const instant = false   

import {client} from '@/lib/sanity'
import {PortableText} from '@portabletext/react'
import {notFound} from 'next/navigation'

export const revalidate = 60 

const query = `*[_type == "post" && slug.current == $slug][0]`

export default async function PostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const post = await client.fetch(query, {slug})
  if (!post) notFound()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.publishedAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
      </p>
      {post.image && <img src={client.config().projectId ? '' : ''} alt="" />}
      <PortableText value={post.body} />
    </main>
  )
}   