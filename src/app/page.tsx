import {unstable_cache} from 'next/cache'
import {client} from '@/lib/sanity'
import {PostCard} from '@/components/PostCard'

const query = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)`

const getPosts = unstable_cache(
  async () => client.fetch(query),
  ['posts'],
  {revalidate: 60}
)

export default async function Home() {
  const posts = await getPosts()
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