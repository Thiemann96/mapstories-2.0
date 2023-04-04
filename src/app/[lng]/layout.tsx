import '@/src/styles/globals.scss'
import { Inter } from 'next/font/google'
import { cx } from 'class-variance-authority'
import { dir } from 'i18next'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next/types'

const Providers = dynamic(() => import('./Providers'), { ssr: false })

const font = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Mapstories',
    template: '%s | Mapstories',
  },
  description: 'Globale Geschichten interaktiv erzählen',
  robots: {
    index: true,
  },
  openGraph: {
    title: {
      default: 'Mapstories',
      template: '%s | Mapstories',
    },
    type: 'website',
  },
}

// ISR not working at the moment
// export async function generateStaticParams() {
//   return languages.map(lng => ({ lng }))
// }

// export const generateStaticParams =
//   process.env.NODE_ENV !== 'development'
//     ? async () => {
//         return languages.map(lng => ({ lng }))
//       }
//     : undefined

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: {
    lng: string
  }
}) {
  return (
    <html
      className={cx(
        'h-full w-full bg-white text-slate-900 antialiased',
        font.className,
      )}
      dir={dir(lng)}
      lang={lng}
    >
      <body className="h-full w-full">
        <main className="h-full w-full">
          <Providers lng={lng}>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
