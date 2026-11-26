'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/lib/sanity'

const SENTENCES = [
  "almighty demigods whilt from tippance",
  "always do what freedom tells",
  "aesopic dream wild forgotten times",
  "ate dinner wanting french tacos",
  "always do want for things ",
  "all designs will fail time",
  "adolescence doesn't wait for time",
  "a distant warning fogs tonight",
  "affirmative drugs wipe fearful thoughts",
  "absolute death waits for tribulation ",
  "as dares we forget truths",
  "a drunk's words felt timeless",
  "ancient doors watch for trespassers",
  "aetherial dreamers walk free tonight",
  "amulet dancers wave fire-like trembling",
  "a distant wave felt thunder",
  "a dream's worth fades too",
  "august desires warm fire tonight",
  "angelic digital winter fox trot",
  "aghast death which feels true",
  "another day wasted fuck tuesday",
]

function generateSentence(): string {
  return SENTENCES[Math.floor(Math.random() * SENTENCES.length)]
}

export function Header({ logo }: { logo: any }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [sentence, setSentence] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const isSearching = search.length >= 2
  const fontSize = Math.min(20, Math.floor(850 / sentence.length))

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
        setResults([])
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function toggleMenu() {
    const next = !open
    if (next) {
      setSearch('')
      setResults([])
      setSentence(generateSentence())
    }
    setOpen(next)
  }

  function closeSearch() {
    setSearch('')
    setResults([])
  }

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    setSearch(q)
    if (q.length < 2) { setResults([]); return }
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    setResults(data)
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
              style={hovered || open ? { width: '91.42px', height: '51.84px' } : { width: '92px', height: '28px' }}
            />
          ) : (
            <span className="text-lg font-semibold">Logo</span>
          )}
        </button>

        {open && (
          <nav className={`absolute top-full left-1/2 -translate-x-1/2 rounded-none shadow-lg w-72 h-[380px] p-4 transition-colors duration-300 ${isSearching ? 'bg-[#0032FF]' : 'bg-white border border-[#0032FF]'}`}>
            <p
              className={`font-['Courier_New',monospace] tracking-[0.02em] mb-3 text-center leading-snug h-[56px] overflow-hidden ${isSearching ? 'text-white' : 'text-[#000000]'}`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {sentence}
            </p>

            <div className="flex items-center justify-between mb-3">
              <input
                type="search"
                placeholder={isSearching ? 'Search…' : 'Search posts…'}
                value={search}
                onChange={handleSearch}
                autoFocus={isSearching}
                className={`flex-1 border-none rounded-none px-3 py-2 text-sm ${isSearching ? 'bg-white/20 text-white placeholder-white/60' : 'bg-[#00A6FF]/10 text-black'}`}
              />
              {isSearching && (
                <button
                  onClick={closeSearch}
                  className="ml-3 text-white text-lg font-bold cursor-pointer hover:opacity-70"
                  aria-label="Close search"
                >
                  ✕
                </button>
              )}
            </div>

            {!isSearching && (
              <>
                <Link href="/" onClick={() => setOpen(false)} className="block py-2 font-['PT_Sans',sans-serif] text-[20px] tracking-[0.1em] text-[#0032FF] hover:underline">Abode</Link>
                <Link href="/memories" onClick={() => setOpen(false)} className="block py-2 font-['PT_Sans',sans-serif] text-[20px] tracking-[0.1em] text-[#0032FF] hover:underline">Database</Link>
                <Link href="/about" onClick={() => setOpen(false)} className="block py-2 font-['PT_Sans',sans-serif] text-[20px] tracking-[0.1em] text-[#0032FF] hover:underline">What is this?</Link>
                <Link href="/find" onClick={() => setOpen(false)} className="block py-2 font-['PT_Sans',sans-serif] text-[20px] tracking-[0.1em] text-[#0032FF] hover:underline">Find me</Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="block py-2 font-['PT_Sans',sans-serif] text-[20px] tracking-[0.1em] text-[#0032FF] hover:underline">Tell me</Link>
              </>
            )}

            {isSearching && (
              <div className="overflow-y-auto max-h-[220px]">
                {results.length === 0 ? (
                  <p className="text-white/70 text-sm py-2">No results</p>
                ) : (
                  results.map((r) => (
                    <button
                      key={r._id}
                      onClick={() => { router.push(`/posts/${r.slug.current}`); setOpen(false); closeSearch() }}
                      className="block w-full text-left text-white text-sm hover:underline py-2 border-b border-white/20 last:border-b-0"
                    >
                      {r.title}
                    </button>
                  ))
                )}
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}   