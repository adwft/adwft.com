import {createClient} from 'next-sanity'
import {createImageUrlBuilder} from '@sanity/image-url'

export const client = createClient({
  projectId: 'nnfkx2n2',
  dataset: 'production',
  apiVersion: '2026-11-22',
  useCdn: false,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}   