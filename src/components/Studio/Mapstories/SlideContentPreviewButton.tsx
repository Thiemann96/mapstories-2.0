import { SlideContent } from '@prisma/client'

import { cx } from 'class-variance-authority'
import dynamic from 'next/dynamic'
import { OgObject } from 'open-graph-scraper/dist/lib/types'
import { HTMLAttributes } from 'react'
import EmbedIconFactory from '../../Icons/EmbedIconFactory'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})

const markdownPreviewStyles = {
  background: 'white',
  fontFamily: 'inherit',
}

function Wrapper(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('flex items-center gap-2', props.className)}
      {...props}
    />
  )
}

export default function SlideContentPreviewButton({
  content,
  type,
  ogData,
}: SlideContent) {
  const og = ogData as OgObject | null

  function IconComponent() {
    return <EmbedIconFactory type={type} />
  }

  if (type == 'TEXT') {
    return (
      <Wrapper>
        <IconComponent />
        <MarkdownPreview
          className="hover:bg-hover"
          source={content.substring(0, 12) + '...'}
          style={markdownPreviewStyles}
        />
      </Wrapper>
    )
  }

  const previewContent = og?.ogTitle ?? content

  if (type == 'TITLE') {
    return (
      <Wrapper>
        <IconComponent />
        {previewContent.substring(0, 12)}...
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <IconComponent />
      {previewContent.substring(0, 24)}
    </Wrapper>
  )
}