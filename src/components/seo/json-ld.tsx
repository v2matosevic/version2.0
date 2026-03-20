import { SITE_URL, SITE_NAME } from '@/lib/seo'
import type { Language } from '@/types/i18n'

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/* ---------- LocalBusiness (persistent, root layout or homepage) ---------- */

function LocalBusinessJsonLd({ lang }: { lang: Language }) {
  const nameMap: Record<Language, string> = {
    en: 'Version2 — Web Design & Development Studio',
    hr: 'Version2 — Web Dizajn & Razvoj Studio',
    de: 'Version2 — Web Design & Entwicklung Studio',
  }

  const descMap: Record<Language, string> = {
    en: 'Premium web design, development, and AI integration studio based in Zadar, Croatia.',
    hr: 'Premium web dizajn, razvoj i AI integracija studio sa sjedištem u Zadru, Hrvatska.',
    de: 'Premium-Webdesign, -Entwicklung und KI-Integration Studio mit Sitz in Zadar, Kroatien.',
  }

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: SITE_NAME,
        alternateName: nameMap[lang],
        description: descMap[lang],
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        image: `${SITE_URL}/opengraph-image`,
        telephone: '+385995617706',
        email: 'info@version2.hr',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Novigradska 21',
          addressLocality: 'Zadar',
          postalCode: '23000',
          addressCountry: 'HR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 44.1194,
          longitude: 15.2314,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
        priceRange: '€€',
        sameAs: [
          'https://www.facebook.com/version2.hr',
          'https://www.instagram.com/version2.hr',
          'https://www.tiktok.com/@version2.hr',
        ],
      }}
    />
  )
}

/* ---------- WebSite (homepage) ---------- */

function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: ['en', 'hr', 'de'],
        publisher: { '@id': `${SITE_URL}/#business` },
      }}
    />
  )
}

/* ---------- Service (service detail pages) ---------- */

type ServiceJsonLdProps = {
  name: string
  description: string
  url: string
}

function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 44.1194,
            longitude: 15.2314,
          },
          geoRadius: '5000',
        },
      }}
    />
  )
}

/* ---------- BlogPosting ---------- */

type BlogPostingJsonLdProps = {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  author: string
  image?: string
}

function BlogPostingJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
}: BlogPostingJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        url,
        datePublished,
        dateModified,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: { '@id': `${SITE_URL}/#business` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        ...(image ? { image } : {}),
      }}
    />
  )
}

/* ---------- BreadcrumbList ---------- */

type BreadcrumbItem = {
  name: string
  url: string
}

function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  )
}

/* ---------- FAQPage (for service pages with FAQs) ---------- */

type FaqItem = {
  question: string
  answer: string
}

function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  )
}

export {
  JsonLd,
  LocalBusinessJsonLd,
  WebSiteJsonLd,
  ServiceJsonLd,
  BlogPostingJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
}

export type {
  JsonLdProps,
  ServiceJsonLdProps,
  BlogPostingJsonLdProps,
  BreadcrumbItem,
  FaqItem,
}
