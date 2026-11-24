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
      file: ({ value }: { value: any }) => {
        const ref = value.asset._ref
        const [, id, ext] = ref.split('-')
        const fileUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${ext}`
        if (ext === 'mp4' || ext === 'webm' || ext === 'mov') {
          return <video src={fileUrl} controls className="w-full rounded my-8" />
        }
        return <audio src={fileUrl} controls className="w-full my-8" />
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