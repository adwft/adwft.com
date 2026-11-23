'use client'

import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {client, urlFor} from '@/lib/sanity'

const SENTENCES = [
  "almighty demigods whilt from tippance",
  "always do what freedom tells",
  "aesopic dream wild forgotten times",
  "always do want for things ",
  "all design will fail time",
  "adolescence doesn't wait for time",
  "a distant warning fogs tonight",
  "affirmative drugs wipe fearful thoughts",
  "absolute death waits for tribulation ",
  "as dares we forget truths",
  "a drunk's words felt timeless",
  "ancient doors whisper for trespassers",
  "aetherial dreamers walk free tonight",
  "amulet dancers wave fire-like trembling",
  "a distant wave felt thunder",
  "a dream's worth fades too",
  "ageless dream warm fire tonight",
  "angelic digital winter fox trot",
  "aghast death which feels true",
  "another day wasted fuck tuesday",
]

function generateSentence(): string {
  return SENTENCES[Math.floor(Math.random() * SENTENCES.length)]
}

export function Header({logo}: {logo: any}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [sentence, setSentence] = useState('')
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

  function toggleMenu() {
    const next = !open
    setOpen(next)
    if (next) setSentence(generateSentence())
  }

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
          onClick={toggleMenu}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`cursor-pointer transition-all duration-300 ${scrolled ? 'mt-2 mb-2' : 'mt-8 mb-4'} w-[92px] h-[52px] flex items-center justify-center`}
        >
          {logo ? (
            <img
              src={hovered || open ? '/Union.svg' : urlFor(logo).url()}
              alt="Logo"
              className="object-contain"
              style={hovered || open ? {width: '91.42px', height: '51.84px'} : {width: '92px', height: '28px'}}
            />
          ) : (
            <span className="text-lg font-semibold">Logo</span>
          )}
        </button>

        {open && (
          <nav className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-[#0032FF] rounded-none shadow-lg w-72 p-4 max-h-[70vh] overflow-y-auto">
            <p className="font-['Courier_New',monospace] text-[20px] tracking-[0.02em] text-[#000000] mb-3 text-center leading-snug">{sentence}</p>   
            <input
              type="search"
              placeholder="Search posts…"
              value={search}
              onChange={handleSearch}
              className="w-full border-none rounded-none bg-[#00A6FF]/10 px-3 py-2 text-sm mb-3"
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
            <Link href="/" onClick={() => setOpen(false)} className="block py-2 font-['PT_Sans',sans-serif] text-[20px] tracking-[0.1em] text-[#0032FF] hover:underline">Home</Link>
            <Link href="/memories" onClick={() => setOpen(false)} className="block py-2 font-['PT_Sans',sans-serif] text-[20px] tracking-[0.1em] text-[#0032FF] hover:underline">Memories</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block py-2 font-['PT_Sans',sans-serif] text-[20px] tracking-[0.1em] text-[#0032FF] hover:underline">About</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block py-2 font-['PT_Sans',sans-serif] text-[20px] tracking-[0.1em] text-[#0032FF] hover:underline">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  )
}   