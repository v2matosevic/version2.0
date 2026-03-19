import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://version2.hr'
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml')

type Language = 'en' | 'hr' | 'de'

type RouteEntry = {
  en: string
  hr: string
  de: string
  changefreq?: string
  priority?: number
}

function getBlogSlugs(): string[] {
  // Read curated slugs from the curated-slugs.ts source
  const curatedModule = path.join(process.cwd(), 'src', 'lib', 'content', 'curated-slugs.ts')
  const content = fs.readFileSync(curatedModule, 'utf-8')
  const matches = content.match(/'([a-z0-9-]+)'/g)
  if (!matches) return []
  return matches.map((m) => m.replace(/'/g, ''))
}

function getStaticRoutes(): RouteEntry[] {
  return [
    { en: '/', hr: '/hr/', de: '/de/', priority: 1.0, changefreq: 'weekly' },
    { en: '/about/', hr: '/hr/o-nama/', de: '/de/uber-uns/', priority: 0.8 },
    { en: '/contact/', hr: '/hr/kontakt/', de: '/de/kontakt/', priority: 0.8 },
    { en: '/portfolio/', hr: '/hr/portfolio/', de: '/de/portfolio/', priority: 0.8 },
    { en: '/pricing/', hr: '/hr/cijene/', de: '/de/preise/', priority: 0.7 },
    { en: '/career/', hr: '/hr/karijera/', de: '/de/karriere/', priority: 0.5 },
    { en: '/blog/', hr: '/hr/blog/', de: '/de/blog/', priority: 0.9, changefreq: 'daily' },
    { en: '/analysis/', hr: '/hr/analiza/', de: '/de/analyse/', priority: 0.6 },
    { en: '/services/', hr: '/hr/usluge/', de: '/de/dienstleistungen/', priority: 0.8 },
    { en: '/services/web-design/', hr: '/hr/usluge/web-dizajn/', de: '/de/dienstleistungen/web-design/', priority: 0.7 },
    { en: '/services/web-applications/', hr: '/hr/usluge/web-aplikacije/', de: '/de/dienstleistungen/web-anwendungen/', priority: 0.7 },
    { en: '/services/e-commerce/', hr: '/hr/usluge/e-trgovina/', de: '/de/dienstleistungen/e-commerce/', priority: 0.7 },
    { en: '/services/ai-integration/', hr: '/hr/usluge/ai-integracija/', de: '/de/dienstleistungen/ki-integration/', priority: 0.7 },
    { en: '/services/seo/', hr: '/hr/usluge/seo/', de: '/de/dienstleistungen/seo/', priority: 0.7 },
  ]
}

function generateUrlEntry(route: RouteEntry): string {
  const langs: Language[] = ['en', 'hr', 'de']
  const alternates = langs
    .map((lang) => {
      const href = `${SITE_URL}${route[lang]}`
      return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`
    })
    .join('\n')

  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route.en}" />`

  return `  <url>
    <loc>${SITE_URL}${route.en}</loc>
${alternates}
${xDefault}
    <changefreq>${route.changefreq ?? 'monthly'}</changefreq>
    <priority>${route.priority ?? 0.5}</priority>
  </url>`
}

function main(): void {
  const staticRoutes = getStaticRoutes()
  const blogSlugs = getBlogSlugs()

  const blogRoutes: RouteEntry[] = blogSlugs.map((slug) => ({
    en: `/blog/${slug}/`,
    hr: `/hr/blog/${slug}/`,
    de: `/de/blog/${slug}/`,
    changefreq: 'monthly',
    priority: 0.6,
  }))

  const allRoutes = [...staticRoutes, ...blogRoutes]
  const totalUrls = allRoutes.length * 3

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allRoutes.map(generateUrlEntry).join('\n')}
</urlset>`

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8')

  console.log(`Sitemap generated: ${allRoutes.length} URL entries (${totalUrls} total with hreflang)`)
}

main()
