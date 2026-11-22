export const instant = false   

import {client} from '@/lib/sanity'
import {PostCard} from '@/components/PostCard'

export const revalidate = 60 

const query = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)`

export default async function Home() {
  const posts = await client.fetch(query)
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      <div className="space-y-6">
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}   