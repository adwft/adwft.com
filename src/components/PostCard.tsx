'use client'

import {urlFor} from '@/lib/sanity'
import {PortableText} from '@portabletext/react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

function formatDate(iso: string) {
  const d = new Date(iso)
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const day = String(d.getDate()).padStart(2, '0')
  return `${months[d.getMonth()]} ${day}, ${d.getFullYear()}`
}

export function PostCard({post}: {post: any}) {
  const router = useRouter()

  return (
    <article className="border-b pb-14">
      {post.image && (
        <Link href={`/posts/${post.slug.current}`}>
          <img
            src={urlFor(post.image).url()}
            alt={post.title}
            className="w-full h-auto rounded mb-8"
          />
        </Link>
      )}
      <div className="flex items-center gap-4 font-['PT_Sans',sans-serif] text-[15px] tracking-[0.1em] text-[#0032FF]">
        <span>{formatDate(post.publishedAt)}</span>
        {post.category && <span>{post.category.toUpperCase()}</span>}
      </div>
      <div
        className="font-['Baskervville',serif] font-medium text-[70px] leading-[75px] tracking-[0.01em] line-clamp-7 text-[#0032FF] mt-8 cursor-pointer"
        onClick={() => router.push(`/posts/${post.slug.current}`)}
      >
        <PortableText value={post.body} />
      </div>
    </article>
  )
}   