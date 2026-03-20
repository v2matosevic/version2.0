import type { Language } from '@/types/i18n'

/**
 * Bi-directional route map: given a path in any language,
 * find its equivalent in the target language.
 */

type RouteEntry = Record<Language, string>

const ROUTE_MAP: RouteEntry[] = [
  { en: '/', hr: '/hr/', de: '/de/' },
  { en: '/about/', hr: '/hr/o-nama/', de: '/de/uber-uns/' },
  { en: '/contact/', hr: '/hr/kontakt/', de: '/de/kontakt/' },
  { en: '/career/', hr: '/hr/karijera/', de: '/de/karriere/' },
  { en: '/services/', hr: '/hr/usluge/', de: '/de/dienstleistungen/' },
  { en: '/services/web-design/', hr: '/hr/usluge/web-dizajn/', de: '/de/dienstleistungen/web-design/' },
  { en: '/services/web-applications/', hr: '/hr/usluge/web-aplikacije/', de: '/de/dienstleistungen/web-anwendungen/' },
  { en: '/services/e-commerce/', hr: '/hr/usluge/e-trgovina/', de: '/de/dienstleistungen/e-commerce/' },
  { en: '/services/ai-integration/', hr: '/hr/usluge/ai-integracija/', de: '/de/dienstleistungen/ki-integration/' },
  { en: '/services/seo/', hr: '/hr/usluge/seo/', de: '/de/dienstleistungen/seo/' },
  { en: '/analysis/', hr: '/hr/analiza/', de: '/de/analyse/' },
  { en: '/blog/', hr: '/hr/blog/', de: '/de/blog/' },
  { en: '/pricing/', hr: '/hr/cijene/', de: '/de/preise/' },
  { en: '/portfolio/', hr: '/hr/portfolio/', de: '/de/portfolio/' },
  { en: '/tracking/', hr: '/hr/pracenje/', de: '/de/sendungsverfolgung/' },
  { en: '/legal-notice/', hr: '/hr/pravna-obavijest/', de: '/de/impressum/' },
  { en: '/terms-and-conditions/', hr: '/hr/uvjeti-koristenja/', de: '/de/nutzungsbedingungen/' },
  { en: '/privacy-policy/', hr: '/hr/politika-privatnosti/', de: '/de/datenschutz/' },
  { en: '/cookies/', hr: '/hr/kolacici/', de: '/de/cookies/' },
  { en: '/refund-policy/', hr: '/hr/politika-povrata/', de: '/de/widerrufsrecht/' },
  { en: '/accessibility/', hr: '/hr/izjava-o-pristupacnosti/', de: '/de/barrierefreiheit/' },
]

/** Build a lookup: path → RouteEntry */
const PATH_LOOKUP = new Map<string, RouteEntry>()
for (const entry of ROUTE_MAP) {
  PATH_LOOKUP.set(entry.en, entry)
  PATH_LOOKUP.set(entry.hr, entry)
  PATH_LOOKUP.set(entry.de, entry)
}

/**
 * Translate a path from the current language to the target language.
 * Falls back to simple prefix swap for unknown paths (e.g. blog post slugs).
 */
export function translatePath(pathname: string, targetLang: Language): string {
  // Normalize trailing slash
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`

  // Check static route map
  const entry = PATH_LOOKUP.get(normalized)
  if (entry) return entry[targetLang]

  // Handle blog post paths: /blog/slug/ → /hr/blog/slug/
  // Blog slug translation must be handled by the caller with frontmatter translations
  const blogMatch = normalized.match(/^(?:\/(hr|de))?\/blog\/(.+)$/)
  if (blogMatch) {
    const slug = blogMatch[2]
    if (targetLang === 'en') return `/blog/${slug}`
    return `/${targetLang}/blog/${slug}`
  }

  // Handle portfolio paths: /portfolio/slug/ → /hr/portfolio/slug/
  const portfolioMatch = normalized.match(/^(?:\/(hr|de))?\/portfolio\/(.+)$/)
  if (portfolioMatch) {
    const slug = portfolioMatch[2]
    if (targetLang === 'en') return `/portfolio/${slug}`
    return `/${targetLang}/portfolio/${slug}`
  }

  // Fallback: strip current lang prefix and add target
  const stripped = normalized.replace(/^\/(hr|de)\//, '/')
  if (targetLang === 'en') return stripped
  return `/${targetLang}${stripped}`
}
