import { StructuredContent } from 'next-dato-utils'
//import StructuredContent from './StructuredContent'
//import * as Blocks from './blocks'

export type Props = {
  id?: string
  content: any
  className?: string
  onClick?: (imageId: string) => void
}

const blocks = {}

export default function Content({ id, content, className, onClick }: Props) {

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