import {unstable_cache} from 'next/cache'
import {client} from '@/lib/sanity'
import {PortableText} from '@portabletext/react'
import {notFound} from 'next/navigation'

const query = `*[_type == "post" && slug.current == $slug][0]`

const getPost = unstable_cache(
  async (slug: string) => client.fetch(query, {slug}),
  ['post', 'slug'],
  {revalidate: 60}
)

export default async function PostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.publishedAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
      </p>
      {post.image && <img src={client.config().projectId ? '' : ''} alt="" />}
      <div className="font-['Baskervville',serif] text-[#0032FF] text-[80px] leading-[85px] tracking-[0.01em] line-clamp-7">
  <PortableText value={post.body} />
</div>   
    </main>
  )
}   