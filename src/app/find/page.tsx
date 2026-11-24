export const instant = false

import { client, urlFor } from '@/lib/sanity'

export default async function Find() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    ...,
    "findLinks": findLinks[]{
      ...,
      "asset": image.asset->,
      "hoverAsset": hoverImage.asset->
    }
  }`)

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="font-['PT_Sans',sans-serif] text-[36px] leading-[44px] tracking-[0.01em] text-[#0032FF] mb-4">
        Find me
      </h1>
      {settings?.findText && (
        <p className="whitespace-pre-line mb-8 font-['Baskervville',serif] text-[20px] leading-[28px] text-[#0032FF]">
          {settings.findText}
        </p>
      )}
      {settings?.findLinks?.length > 0 && (
        <div className="grid grid-cols-2 gap-6 mb-10">
          {settings.findLinks.filter((link: any) => link.asset).map((link: any) => (
            <a
              key={link._key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
                <img
                  src={urlFor(link.asset).url()}
                  alt={link.label}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                {link.hoverAsset && (
                  <img
                    src={urlFor(link.hoverAsset).url()}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
              </div>
              <span className="font-['PT_Sans',sans-serif] text-[15px] tracking-[0.1em] text-[#0032FF] group-hover:underline">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      )}
      {settings?.socialLinks?.length > 0 && (
        <div className="flex gap-6 pt-6 border-t">
          {settings.socialLinks.map((link: any) => (
            <a
              key={link._key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['PT_Sans',sans-serif] text-[15px] tracking-[0.1em] text-[#0032FF] hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </main>
  )
}   