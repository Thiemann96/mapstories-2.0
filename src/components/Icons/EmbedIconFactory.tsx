import { MediaType } from '@prisma/client'
import {
  HeadingIcon,
  ImageIcon,
  InstagramLogoIcon,
  PlayIcon,
  TextIcon,
  TwitterLogoIcon,
  VideoIcon,
} from '@radix-ui/react-icons'
import { cva, VariantProps } from 'class-variance-authority'
import { HTMLAttributes } from 'react'
import { PadletIcon } from '.'
import BaseIcon from './BaseIcon'
import SvgFacebookIcon from './FacebookIcon'
import SvgTiktokIcon from './TiktokIcon'
import SvgWikipediaIcon from './WikipediaIcon'

interface EmbedIconFactoryProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconStyle> {}

type cvaType = {
  type: {
    [_key in MediaType]: string
  }
}

const iconStyle = cva<cvaType>('', {
  variants: {
    type: {
      TEXT: 'bg-zinc-100 text-zinc-800',
      TITLE: 'bg-zinc-800 text-zinc-200',
      TWITTER: 'bg-[#1DA1F2] text-white',
      YOUTUBE: 'bg-[#FF0000] text-white',
      INSTAGRAM:
        'bg-gradient-to-br from-[#405DE6] via-[#E1306C] to-[#FFDC80] text-white',
      TIKTOK: 'bg-black text-zinc-[#00f2ea]',
      PADLET: 'bg-white',
      FACEBOOK: 'bg-[#4267B2] text-white',
      WIKIPEDIA: 'bg-white',
      IMAGE: '',
      VIDEO: '',
    },
  },
})

const getIcon = (myType: MediaType) => {
  switch (myType) {
    case 'TEXT':
      return TextIcon
    case 'TITLE':
      return HeadingIcon
    case 'TWITTER':
      return TwitterLogoIcon
    case 'YOUTUBE':
      return PlayIcon
    case 'INSTAGRAM':
      return InstagramLogoIcon
    case 'TIKTOK':
      return SvgTiktokIcon
    case 'PADLET':
      return PadletIcon
    case 'FACEBOOK':
      return SvgFacebookIcon
    case 'WIKIPEDIA':
      return SvgWikipediaIcon
    case 'IMAGE':
      return ImageIcon
    case 'VIDEO':
      return VideoIcon
    default:
      myType satisfies never // This makes sure the switch case is exhaustive (https://stackoverflow.com/a/75217377/5660646)
  }
}

export default function EmbedIconFactory({
  type,
  ...props
}: EmbedIconFactoryProps) {
  if (!type) {
    return <BaseIcon {...props} />
  }

  const Icon = getIcon(type)

  if (!Icon) {
    return <BaseIcon {...props} />
  }

  return (
    <BaseIcon className={iconStyle({ type })} {...props}>
      <Icon className="h-full w-auto" />
    </BaseIcon>
  )
}