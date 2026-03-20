import type { Metadata } from 'next'
import { Albert_Sans, Manrope } from 'next/font/google'
import '@/styles/globals.css'

const albertSans = Albert_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '700'],
  display: 'swap',
  variable: '--font-albert-sans',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://version2.hr'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('v2_theme');if(t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.add('light')}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-base text-foreground font-body">
        {children}
      </body>
    </html>
  )
}
