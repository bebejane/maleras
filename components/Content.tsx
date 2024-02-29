import { StructuredContent, Block } from 'next-dato-utils/components'
import * as blocks from './blocks'

export type Props = {
  content: any
  className?: string
  children?: typeof Block | typeof Block[]
}


export default function Content({ content, className }: Props) {

  if (!content)
    return null

  return (
    <StructuredContent
      blocks={blocks}
      className={className}
      content={content}
    />
  )
}