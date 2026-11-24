'use client'
import { PortableText } from '@portabletext/react'

function splitPT(blocks: any[], charIndex: number): [any[], any[]] {
  let count = 0
  const first: any[] = []
  const second: any[] = []
  let splitDone = false

  for (const block of blocks) {
    if (splitDone) { second.push(block); continue }
    if (!block.children) { first.push(block); continue }

    const blockLen = block.children.reduce((a: number, c: any) => a + (c.text || '').length, 0)

    if (count + blockLen <= charIndex) {
      first.push(block)
      count += blockLen
    } else {
      const remaining = charIndex - count
      const firstChildren: any[] = []
      const secondChildren: any[] = []
      let childCount = 0

      for (const child of block.children) {
        const text = child.text || ''
        if (childCount + text.length <= remaining) {
          firstChildren.push(child)
          childCount += text.length
        } else {
          const splitAt = remaining - childCount
          if (splitAt > 0) {
            firstChildren.push({ ...child, text: text.slice(0, splitAt) })
            secondChildren.push({ ...child, text: text.slice(splitAt) })
          } else {
            secondChildren.push(child)
          }
        }
      }
      if (firstChildren.length) first.push({ ...block, children: firstChildren })
      if (secondChildren.length) second.push({ ...block, children: secondChildren })
      splitDone = true
    }
  }
  return [first, second]
}

export function SplitText({ value, largeClass, smallClass, splitAt = 70 }: {
  value: any
  largeClass: string
  smallClass: string
  splitAt?: number
}) {
  const [first, second] = splitPT(value, splitAt)

  return (
    <>
      {first.length > 0 && (
        <div className={largeClass}>
          <PortableText value={first} />
        </div>
      )}
      {second.length > 0 && (
        <div className={smallClass}>
          <PortableText value={second} />
        </div>
      )}
    </>
  )
}   