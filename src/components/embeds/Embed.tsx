import { useTranslation } from '@/src/app/i18n/client'
import { fallbackLng, languages } from '@/src/app/i18n/settings'
import { media_type } from '@/src/lib/media/media'
import { useBoundStore } from '@/src/lib/store/store'
import * as React from 'react'
import { FacebookEmbed } from './FacebookEmbed'
import { InstagramEmbed } from './InstagramEmbed'
import { PadletEmbed } from './PadletEmbed'
import { SoundCloudEmbed } from './SoundCloudEmbed'
import { SpotifyEmbed } from './SpotifyEmbed'
import { TikTokEmbed } from './TikTokEmbed'
import { TwitterEmbed } from './TwitterEmbed'
import { VimeoEmbed } from './VimeoEmbed'
import { WikipediaEmbed } from './WikipediaEmbed'
import { YouTubeEmbed } from './YoutubeEmbed'
import { DailymotionEmbed } from './DailymotionEmbed'
export interface EmbedProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDListElement>,
    HTMLDListElement
  > {
  media: media_type | undefined
  options?: object
  width?: string | number
  height?: string | number
}

export function Embed({
  media,
  width = '100%',
  height = '100%',
  options,
}: EmbedProps) {
  let lng = useBoundStore(state => state.language)
  if (languages.indexOf(lng) < 0) {
    lng = fallbackLng
  }
  const { t } = useTranslation(lng, 'embeds')

  return (
    <div className="h-full w-full">
      {media && media.type == 'YOUTUBE' && (
        <YouTubeEmbed
          height={height}
          options={options as { autoplay: boolean }}
          url={media.content}
          width={width}
        />
      )}
      {media && media.type == 'TWITTER' && (
        <TwitterEmbed height={height} url={media.content} width={width} />
      )}
      {media && media.type == 'INSTAGRAM' && (
        <InstagramEmbed height={height} url={media.content} width={width} />
      )}
      {media && media.type == 'TIKTOK' && (
        <TikTokEmbed height={height} url={media.content} width={width} />
      )}
      {media && media.type == 'PADLET' && (
        <PadletEmbed height={height} url={media.content} width={width} />
      )}
      {media && media.type == 'FACEBOOK' && (
        <FacebookEmbed height={height} url={media.content} width={width} />
      )}
      {media && media.type == 'WIKIPEDIA' && (
        <WikipediaEmbed height={height} url={media.content} width={width} />
      )}
      {media && media.type == 'SPOTIFY' && (
        <SpotifyEmbed height={height} url={media.content} width={width} />
      )}
      {media && media.type == 'SOUNDCLOUD' && (
        <SoundCloudEmbed height={height} url={media.content} width={width} />
      )}
      {media && media.type == 'VIMEO' && (
        <VimeoEmbed height={height} url={media.content} width={width} />
      )}
      {media && media.type == 'DAILYMOTION' && (
        <DailymotionEmbed height={height} url={media.content} width={width} />
      )}

      {media == null && <p>{t('Embed.notRecognized')}</p>}
    </div>
  )
}
