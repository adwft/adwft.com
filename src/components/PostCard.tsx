import {urlFor} from '@/lib/sanity'
import {PortableText} from '@portabletext/react'
import Link from 'next/link'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
}

export function PostCard({post}: {post: any}) {
  return (
    <article className="border-b pb-6">
      {post.image && (
        <img
          src={urlFor(post.image).url()}
          alt={post.title}
          className="w-full h-auto rounded mb-3"
        />
      )}
      {post.category && <span className="text-sm text-gray-500">{post.category}</span>}
      <h2 className="text-xl font-semibold mt-1">
        <Link href={`/posts/${post.slug.current}`}>{post.title}</Link>
      </h2>
      <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
      <div className="font-['Baskervville',serif] font-medium text-[80px] leading-[85px] tracking-[0.01em] line-clamp-7 text-[#0032FF] mt-2">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}   