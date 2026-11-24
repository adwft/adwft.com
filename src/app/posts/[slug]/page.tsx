import { unstable_cache } from 'next/cache'
import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const instant = false

const query = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  "body": body[]{
    ...,
    _type == "image" => {
      ...,
      "asset": image.asset->
    },
    _type == "audio" => {
      ...,
      "asset": asset->
    },
    _type == "video" => {
      ...,
      "asset": asset->
    }
  },
  "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{
    title, "slug": slug.current
  },
  "next": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{
    title, "slug": slug.current
  }
}`

const getPost = unstable_cache(
  async (slug: string) => client.fetch(query, { slug }),
  ['post', 'slug'],
  { revalidate: 60 }
)

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <main className="max-w-2xl mx-auto p-6 overflow-x-hidden">
      <h1 className="font-['PT_Sans',sans-serif] text-[36px] sm:text-[36px] md:text-[36px] leading-[44px] sm:leading-[44px] md:leading-[44px] tracking-[0.01em] text-[#0032FF] break-words">
        {post.title}
      </h1>
      <div className="flex items-center gap-4 font-['PT_Sans',sans-serif] text-[15px] tracking-[0.1em] text-[#0032FF] mt-2">
        <span>
          {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(/(\w{3}) (\d{2}), (\d{4})/, (m, mon, day, yr) => `${mon.toUpperCase()} ${day}, ${yr}`)}
        </span>
        {post.category && <span>{post.category.toUpperCase()}</span>}
      </div>
      {post.image && <img src={urlFor(post.image).url()} alt="" className="w-full h-auto rounded my-8 max-w-full" />}

      <PortableText
        value={post.body}
        components={{
          types: {
            image: ({ value }: { value: any }) => (
              <img
                src={urlFor(value.asset).url()}
                alt={value.alt || ''}
                className="w-full h-auto rounded my-8"
              />
            ),
            audio: ({ value }: { value: any }) => {
              if (!value?.asset?._id) return null
              const id = value.asset._id
              const [, assetId, ext] = id.split('-')
              const fileUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${assetId}.${ext}`
              return <audio src={fileUrl} controls className="w-full my-8" />
            },
            video: ({ value }: { value: any }) => {
              if (!value?.asset?._id) return null
              const id = value.asset._id
              const [, assetId, ext] = id.split('-')
              const fileUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${assetId}.${ext}`
              return <video src={fileUrl} controls className="w-full rounded my-8" />
            },
            soundcloud: ({ value }: { value: any }) => (
              <div className="my-8">
                <iframe
                  title="SoundCloud"
                  width="100%"
                  height="166"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(value.url)}&color=%230032FF&auto_play=false`}
                  frameBorder="0"
                  allow="autoplay"
                />
              </div>
            ),
          },
          block: {
            normal: ({ children }) => (
              <p className="font-['Baskervville',serif] font-medium text-[32px] sm:text-[48px] md:text-[70px] leading-[36px] sm:leading-[52px] md:leading-[75px] tracking-[0.01em] text-[#0032FF] break-words my-4">
                {children}
              </p>
            ),
            h1: ({ children }) => (
              <h1 className="font-['Baskervville',serif] font-medium text-[32px] sm:text-[48px] md:text-[70px] leading-[36px] sm:leading-[52px] md:leading-[75px] tracking-[0.01em] text-[#0032FF] break-words mt-8 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="font-['Baskervville',serif] font-medium text-[28px] sm:text-[36px] md:text-[48px] leading-[32px] sm:leading-[40px] md:leading-[56px] tracking-[0.01em] text-[#0032FF] break-words mt-8 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-['Baskervville',serif] font-medium text-[22px] sm:text-[28px] md:text-[36px] leading-[26px] sm:leading-[32px] md:leading-[40px] tracking-[0.01em] text-[#0032FF] break-words mt-6 mb-2">
                {children}
              </h3>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#0032FF] pl-6 my-6 font-['Baskervville',serif] italic text-[20px] sm:text-[24px] md:text-[28px] leading-[28px] sm:leading-[32px] md:leading-[36px] text-[#0032FF]">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc pl-6 my-4 font-['Baskervville',serif] font-medium text-[32px] sm:text-[48px] md:text-[70px] leading-[36px] sm:leading-[52px] md:leading-[75px] tracking-[0.01em] text-[#0032FF] break-words">
                {children}
              </ul>
            ),
          },
        }}
      />

      <nav className="flex justify-between items-center gap-8 mt-16 pt-8 border-t">
        {post.prev ? (
          <Link
            href={`/posts/${post.prev.slug}`}
            className="flex items-center gap-2 font-['PT_Sans',sans-serif] text-[15px] tracking-[0.1em] text-[#0032FF] hover:underline max-w-[45%]"
          >
            <span>←</span>
            <span className="truncate">{post.prev.title}</span>
          </Link>
        ) : <span />}
        {post.next ? (
          <Link
            href={`/posts/${post.next.slug}`}
            className="flex items-center gap-2 font-['PT_Sans',sans-serif] text-[15px] tracking-[0.1em] text-[#0032FF] hover:underline max-w-[45%]"
          >
            <span className="truncate">{post.next.title}</span>
            <span>→</span>
          </Link>
        ) : <span />}
      </nav>
    </main>
  )
}   