import type { Metadata } from 'next'
import { ComingSoonContent } from '@/components/coming-soon/coming-soon-content'
import { getComingSoonStrings } from '@/components/coming-soon/coming-soon-translations'

export const metadata: Metadata = {
  title: 'Version2 — Web Development Studio',
  description: 'Web development studio based in Zadar, Croatia. New website coming soon.',
  robots: { index: false, follow: false },
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ComingSoonPage({ searchParams }: PageProps) {
  const params = await searchParams
  const langParam = typeof params.lang === 'string' ? params.lang : 'en'
  const lang = ['en', 'hr', 'de'].includes(langParam) ? langParam : 'en'
  const strings = getComingSoonStrings(lang)

  return <ComingSoonContent lang={lang} strings={strings} />
}
