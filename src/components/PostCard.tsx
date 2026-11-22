import {urlFor} from '@/lib/sanity'
import Link from 'next/link'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
}

export function PostCard({post}: {post: any}) {
  const excerpt = post.excerpt || (post.body?.[0]?.children?.[0]?.text || '').slice(0, 150)

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
      <p className="text-gray-700 line-clamp-3 mt-2">{excerpt}</p>
    </article>
  )
}   