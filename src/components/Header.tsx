'use client'

import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {client, urlFor} from '@/lib/sanity'

export function Header({logo}: {logo: any}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [scrolled, setScrolled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    setSearch(q)
    if (q.length < 2) { setResults([]); return }
    const res = await client.fetch(
      `*[_type == "post" && (title match $q or category match $q)] | order(publishedAt desc)[0..5] {title, slug}`,
      {q: `*${q}*`}
    )
    setResults(res)
  }

  return (
    <header className="sticky top-0 bg-white/30 backdrop-blur-sm z-50">
      <div className="w-full flex justify-center relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className={`cursor-pointer transition-all duration-300 ${scrolled ? 'mt-2 mb-2' : 'mt-8 mb-4'}`}
        >
          {logo ? (
            <img src={urlFor(logo).url()} alt="Logo" className="w-[92px] h-[28px]" />
          ) : (
            <span className="text-lg font-semibold">Logo</span>
          )}
        </button>

        {open && (
          <nav className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-[#0032FF] rounded shadow-lg w-64 p-4">
            <input
              type="search"
              placeholder="Search posts…"
              value={search}
              onChange={handleSearch}
              className="w-full border rounded px-3 py-2 text-sm mb-3"
            />
            {results.map((r) => (
              <button
                key={r._id}
                onClick={() => { router.push(`/posts/${r.slug.current}`); setOpen(false) }}
                className="block w-full text-left text-sm hover:underline py-1"
              >
                {r.title}
              </button>
            ))}
            <hr className="my-3" />
            <Link href="/" onClick={() => setOpen(false)} className="block py-2 text-sm hover:underline">Home</Link>
            <Link href="/memories" onClick={() => setOpen(false)} className="block py-2 text-sm hover:underline">Memories</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block py-2 text-sm hover:underline">About</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block py-2 text-sm hover:underline">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  )
}   