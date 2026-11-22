import './globals.css'
import {unstable_cache} from 'next/cache'
import {client} from '@/lib/sanity'
import {Header} from '@/components/Header'

export const metadata = {title: 'adwft'}

const getSettings = unstable_cache(
  async () => client.fetch(`*[_type == "siteSettings"][0]`),
  ['siteSettings'],
  {revalidate: 3600}
)

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const settings = await getSettings()
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        <Header logo={settings?.logo} />
        <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </div>
      </body>
    </html>
  )
}   