import type { Metadata } from 'next'
import type { Language } from '@/types/i18n'

const SITE_URL = 'https://version2.hr'
const SITE_NAME = 'Version2'
const DEFAULT_OG_IMAGE = '/og-default.jpg'

/**
 * Route map for all pages across languages.
 * EN has no prefix (root). HR uses /hr/. DE uses /de/.
 */
const ROUTE_MAP: Record<string, Record<Language, string>> = {
  home: { en: '/', hr: '/hr/', de: '/de/' },
  about: { en: '/about/', hr: '/hr/o-nama/', de: '/de/uber-uns/' },
  contact: { en: '/contact/', hr: '/hr/kontakt/', de: '/de/kontakt/' },
  career: { en: '/career/', hr: '/hr/karijera/', de: '/de/karriere/' },
  services: { en: '/services/', hr: '/hr/usluge/', de: '/de/dienstleistungen/' },
  'services/web-design': { en: '/services/web-design/', hr: '/hr/usluge/web-dizajn/', de: '/de/dienstleistungen/web-design/' },
  'services/web-applications': { en: '/services/web-applications/', hr: '/hr/usluge/web-aplikacije/', de: '/de/dienstleistungen/web-anwendungen/' },
  'services/e-commerce': { en: '/services/e-commerce/', hr: '/hr/usluge/e-trgovina/', de: '/de/dienstleistungen/e-commerce/' },
  'services/ai-integration': { en: '/services/ai-integration/', hr: '/hr/usluge/ai-integracija/', de: '/de/dienstleistungen/ki-integration/' },
  'services/seo': { en: '/services/seo/', hr: '/hr/usluge/seo/', de: '/de/dienstleistungen/seo/' },
  analysis: { en: '/analysis/', hr: '/hr/analiza/', de: '/de/analyse/' },
  blog: { en: '/blog/', hr: '/hr/blog/', de: '/de/blog/' },
  pricing: { en: '/pricing/', hr: '/hr/cijene/', de: '/de/preise/' },
  portfolio: { en: '/portfolio/', hr: '/hr/portfolio/', de: '/de/portfolio/' },
  'legal-notice': { en: '/legal-notice/', hr: '/hr/pravna-obavijest/', de: '/de/impressum/' },
  'terms-and-conditions': { en: '/terms-and-conditions/', hr: '/hr/uvjeti-koristenja/', de: '/de/nutzungsbedingungen/' },
  'privacy-policy': { en: '/privacy-policy/', hr: '/hr/politika-privatnosti/', de: '/de/datenschutz/' },
  cookies: { en: '/cookies/', hr: '/hr/kolacici/', de: '/de/cookies/' },
  'refund-policy': { en: '/refund-policy/', hr: '/hr/politika-povrata/', de: '/de/widerrufsrecht/' },
  accessibility: { en: '/accessibility/', hr: '/hr/izjava-o-pristupacnosti/', de: '/de/barrierefreiheit/' },
}

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path}`
}

export function buildAlternates(routeKey: string): Metadata['alternates'] {
  const routes = ROUTE_MAP[routeKey]
  if (!routes) return { canonical: SITE_URL }

  return {
    canonical: canonicalUrl(routes.en),
    languages: {
      'en': canonicalUrl(routes.en),
      'hr': canonicalUrl(routes.hr),
      'de': canonicalUrl(routes.de),
      'x-default': canonicalUrl(routes.en),
    },
  }
}

export function buildBlogAlternates(
  slug: string,
  translations: Partial<Record<Language, string>>,
): Metadata['alternates'] {
  const enPath = `/blog/${slug}/`
  const hrSlug = translations.hr ?? slug
  const deSlug = translations.de ?? slug

  return {
    canonical: canonicalUrl(enPath),
    languages: {
      'en': canonicalUrl(enPath),
      'hr': canonicalUrl(`/hr/blog/${hrSlug}/`),
      'de': canonicalUrl(`/de/blog/${deSlug}/`),
      'x-default': canonicalUrl(enPath),
    },
  }
}

type PageMetaInput = {
  title: string
  description: string
  routeKey: string
  ogImage?: string
  ogType?: 'website' | 'article'
}

export function buildPageMetadata({
  title,
  description,
  routeKey,
  ogImage,
  ogType = 'website',
}: PageMetaInput): Metadata {
  const routes = ROUTE_MAP[routeKey]
  const url = routes ? canonicalUrl(routes.en) : SITE_URL

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: buildAlternates(routeKey),
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: ogType,
      images: [{ url: ogImage ?? DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${SITE_NAME}`,
      description,
      images: [ogImage ?? DEFAULT_OG_IMAGE],
    },
  }
}

type BlogMetaInput = {
  title: string
  description: string
  slug: string
  lang: Language
  translations: Partial<Record<Language, string>>
  date: string
  author: string
  featuredImage?: string
  tags?: string[]
}

export function buildBlogMetadata({
  title,
  description,
  slug,
  lang,
  translations,
  date,
  author,
  featuredImage,
  tags,
}: BlogMetaInput): Metadata {
  const langPrefix = lang === 'en' ? '' : `/${lang}`
  const localSlug = lang === 'en' ? slug : (translations[lang] ?? slug)
  const url = canonicalUrl(`${langPrefix}/blog/${localSlug}/`)

  return {
    title: `${title} — ${SITE_NAME} Blog`,
    description,
    alternates: buildBlogAlternates(slug, translations),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: date,
      authors: [author],
      tags,
      images: featuredImage
        ? [{ url: featuredImage, width: 1200, height: 630 }]
        : [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: featuredImage ? [featuredImage] : [DEFAULT_OG_IMAGE],
    },
  }
}

export { SITE_URL, SITE_NAME, ROUTE_MAP }
