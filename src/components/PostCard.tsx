'use client'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { useRouter } from 'next/navigation'

function formatDate(iso: string) {
  const d = new Date(iso)
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const day = String(d.getDate()).padStart(2, '0')
  return `${months[d.getMonth()]} ${day}, ${d.getFullYear()}`
}

export function PostCard({ post }: { post: any }) {
  const router = useRouter()

  return (
    <article className="border-b pb-14">
      {post.image && (
        <img
          src={urlFor(post.image).url()}
          alt={post.title}
          className="w-full h-auto rounded mb-8 max-w-full"
        />
      )}
      <div className="flex items-center gap-4 font-['PT_Sans',sans-serif] text-[15px] tracking-[0.1em] text-[#0032FF]">
        <span>{formatDate(post.publishedAt)}</span>
        {post.category && <span>{post.category.toUpperCase()}</span>}
      </div>
      <div
        className="font-['Baskervville',serif] font-medium text-[32px] sm:text-[48px] md:text-[70px] leading-[36px] sm:leading-[52px] md:leading-[75px] tracking-[0.01em] line-clamp-7 text-[#0032FF] mt-8 cursor-pointer break-words hover:underline"
        onClick={() => router.push(`/posts/${post.slug.current}`)}
      >
        <PortableText value={post.body} />
      </div>
    </article>
  )
}   