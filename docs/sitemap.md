# Sitemap — Route Map

## URL Strategy

- **English:** Root routes (no prefix). English is the primary language.
- **Croatian:** `/hr/` prefix
- **German:** `/de/` prefix
- Trailing slashes: enforced via `trailingSlash: true` in `next.config.ts` + Nginx `rewrite` rules as a fallback

> **Language flip:** The old WordPress site used Croatian as root and `/en/`, `/de/` as prefixes. The new site flips this. Every old URL needs a 301 redirect.

> **Blog restructure:** Blog posts move from root level to `/blog/[slug]/`. This breaks every indexed blog URL but simplifies routing, eliminates slug collisions, and enables clean blog curation. See `tasks/redirect-map.md` for the full redirect implementation (~730 rules).

> **Blog curation:** 103 of 190 posts are kept (88 Tier 1 + 15 Tier 2). 87 posts are dropped with 301 redirects to `/blog/`. See `tasks/blog-curation-manifest.md` for the complete list.

> **Services restructure:** All individual service pages now live under `/services/[slug]/` (previously at root level like `/web-design/`, `/seo/`). Old root-level service URLs become 301 redirects to the new `/services/[slug]/` paths.

> **Portfolio rename:** `/references/` is now `/portfolio/` to match the brand vocabulary. Old reference URLs redirect to portfolio equivalents.

---

## Core Pages

| EN (root) | HR (/hr/) | DE (/de/) | Status |
|---|---|---|---|
| `/` | `/hr/` | `/de/` | Rebuild |
| `/about/` | `/hr/o-nama/` | `/de/uber-uns/` | Rebuild |
| `/contact/` | `/hr/kontakt/` | `/de/kontakt/` | Rebuild |
| `/services/` | `/hr/usluge/` | `/de/dienstleistungen/` | Rebuild |
| `/portfolio/` | `/hr/portfolio/` | `/de/portfolio/` | Rebuild (was `/references/`) |
| `/blog/` | `/hr/blog/` | `/de/blog/` | Rebuild |
| `/career/` | `/hr/karijera/` | `/de/karriere/` | NEW |

## Service Pages (Core — Individual Pages)

Five core services with dedicated pages, all under `/services/`:

| EN (root) | HR (/hr/) | DE (/de/) | Status |
|---|---|---|---|
| `/services/web-design/` | `/hr/usluge/web-dizajn/` | `/de/dienstleistungen/web-design/` | Rebuild |
| `/services/web-applications/` | `/hr/usluge/web-aplikacije/` | `/de/dienstleistungen/web-anwendungen/` | NEW |
| `/services/e-commerce/` | `/hr/usluge/e-trgovina/` | `/de/dienstleistungen/e-commerce/` | NEW |
| `/services/ai-integration/` | `/hr/usluge/ai-integracija/` | `/de/dienstleistungen/ki-integration/` | NEW |
| `/services/seo/` | `/hr/usluge/seo/` | `/de/dienstleistungen/seo/` | Rebuild |

### Supporting Services (No Individual Pages at Launch)

These services are listed on the `/services/` overview page only. They do not have dedicated routes at launch. May get individual pages later if SEO demands it.

- **360 Virtual Tours** — embedded demos on the services overview
- **Digital Business Cards** — card customizer tool (location TBD: may live on services overview or get its own page)
- **Integrations** — enterprise integration capabilities
- **Maintenance** — ongoing support and maintenance

### 360 Virtual Tour Sub-Pages (TBD)

These tour demo pages may or may not get separate routes. Decision pending based on whether the tours are embedded on the services overview or need standalone pages.

| EN (root) | HR (/hr/) |
|---|---|
| `/360-virtual-tours/sukosan-villa/` | `/hr/360-virtualne-setnje/sukosanska-vila/` |
| `/360-virtual-tours/holiday-home-baroque-art/` | `/hr/360-virtualne-setnje/holiday-home-baroque-art/` |

## Portfolio Case Studies

Individual case study pages for featured projects:

| EN (root) | HR (/hr/) | DE (/de/) |
|---|---|---|
| `/portfolio/[slug]/` | `/hr/portfolio/[slug]/` | `/de/portfolio/[slug]/` |

Estimated 4-6 featured projects at launch, expandable over time. Each case study includes project details, tech stack, screenshots/video, embedded live site iframe, and testimonials.

## Other Pages

| EN (root) | HR (/hr/) | DE (/de/) | Status |
|---|---|---|---|
| `/pricing/` | `/hr/cijene/` | `/de/preise/` | NEW — interactive pricing configurator |
| `/analysis/` | `/hr/analiza/` | `/de/analyse/` | Rebuild — free website audit (lead-gen) |

## Legal Pages

| EN (root) | HR (/hr/) | DE (/de/) | Status |
|---|---|---|---|
| `/legal-notice/` | `/hr/pravna-obavijest/` | `/de/impressum/` | NEW — mandatory imprint |
| `/terms-and-conditions/` | `/hr/uvjeti-koristenja/` | `/de/nutzungsbedingungen/` | NEW — purchase terms |
| `/privacy-policy/` | `/hr/politika-privatnosti/` | `/de/datenschutz/` | Rewrite — full GDPR Art. 13 |
| `/cookies/` | `/hr/kolacici/` | `/de/cookies/` | Rewrite — specific cookie tables |
| `/refund-policy/` | `/hr/politika-povrata/` | `/de/widerrufsrecht/` | Rewrite — withdrawal rights + form |
| `/accessibility/` | `/hr/izjava-o-pristupacnosti/` | `/de/barrierefreiheit/` | NEW — WCAG 2.2 AA statement |

---

## Dropped Pages (301 Redirects)

### Old Root-Level Service URLs

These old root-level service URLs now redirect to their new `/services/[slug]/` paths:

| Old URL | Redirect Target | Notes |
|---|---|---|
| `/web-design/` | `/services/web-design/` | Moved under /services/ |
| `/hr/web-dizajn/` | `/hr/usluge/web-dizajn/` | HR equivalent |
| `/de/web-design/` | `/de/dienstleistungen/web-design/` | DE equivalent |
| `/seo/` | `/services/seo/` | Moved under /services/ |
| `/hr/seo/` | `/hr/usluge/seo/` | HR equivalent |
| `/de/seo/` | `/de/dienstleistungen/seo/` | DE equivalent |
| `/digital-business-cards/` | `/services/` | Folded into services overview |
| `/hr/digitalne-vizitke/` | `/hr/usluge/` | HR equivalent |
| `/de/digitale-visitenkarten/` | `/de/dienstleistungen/` | DE equivalent |
| `/360-virtual-tours/` | `/services/` | Folded into services overview |
| `/hr/360-virtualne-setnje/` | `/hr/usluge/` | HR equivalent |
| `/de/360-virtuelle-touren/` | `/de/dienstleistungen/` | DE equivalent |

### Old Reference URLs

| Old URL | Redirect Target | Notes |
|---|---|---|
| `/references/` | `/portfolio/` | Renamed to portfolio |
| `/hr/reference/` | `/hr/portfolio/` | HR equivalent |
| `/de/referenzen/` | `/de/portfolio/` | DE equivalent |

### Dropped Service Pages

| Old WordPress URL | Redirect Target | Notes |
|---|---|---|
| `/drustvene-mreze/` | `/hr/usluge/` | Social media — dropped service |
| `/en/social-media/` | `/services/` | EN variant |
| `/de/soziale-netzwerke/` | `/de/dienstleistungen/` | DE variant |
| `/placeno-oglasavanje/` | `/hr/usluge/` | PPC — dropped service |
| `/en/ppc-advertising/` | `/services/` | EN variant |
| `/de/bezahlte-werbung/` | `/de/dienstleistungen/` | DE variant |
| `/video-foto-produkcija/` | `/hr/usluge/` | Video/photo — dropped |
| `/en/video-photo-production/` | `/services/` | EN variant |
| `/fotografiranje-nekretnina/` | `/hr/usluge/` | Real estate photography — dropped |
| `/snimanje-nekretnina-iz-novih-perspektiva/` | `/hr/usluge/` | Real estate video — dropped |

### Obsolete Package Pages

All redirect to the interactive pricing tool.

| Old WordPress URL | Redirect Target |
|---|---|
| `/smart-web-plan/` | `/hr/cijene/` |
| `/en/smart-web-plan/` | `/pricing/` |
| `/web-dizajn/simple-paket/` | `/hr/cijene/` |
| `/web-dizajn/profesionalni-paket/` | `/hr/cijene/` |
| `/web-dizajn/e-commerce-paket/` | `/hr/cijene/` |
| `/web-dizajn/premium-paket/` | `/hr/cijene/` |
| (Plus EN/DE variants — see `tasks/redirect-map.md`) | |

### Other Dropped/Redirected Pages

| Old URL | Redirect Target | Notes |
|---|---|---|
| `/galerija/` | `/hr/portfolio/` | Gallery redirects to portfolio |
| `/en/gallery/` | `/portfolio/` | EN variant |
| `/katalog/` | `/hr/usluge/` | Old WooCommerce catalog redirects to services |
| `/en/catalog/` | `/services/` | EN variant |
| `/konzultacija/` | `/hr/kontakt/` | Never existed — redirect to contact |
| `/en/consultation/` | `/contact/` | EN variant |

> Redirect targets in `tasks/redirect-map.md` were audited and updated on 2026-02-25 to match this URL structure.

---

## Blog

### Structure

Blog posts live under `/blog/`, NOT at root level.

**Route patterns:**
- English: `/blog/[slug]/` (root, primary)
- Croatian: `/hr/blog/[slug]/`
- German: `/de/blog/[slug]/`
- Blog listing: `/blog/`, `/hr/blog/`, `/de/blog/`

### Curation

103 posts are kept. 87 posts are dropped with 301 redirects to the blog listing.

| Category | Count | Action |
|---|---|---|
| Tier 1 — Core (web dev, SEO, hosting, cards, 360) | 88 | Keep |
| Tier 2 — Adjacent (selected: branding, AI, fonts, content) | 15 | Keep |
| Case Studies (removed session 9 — outdated client work) | 13 | 301 -> /blog/ |
| Tier 2 — Adjacent (dropped: email marketing, generic DM) | 12 | 301 -> /blog/ |
| Tier 3 — Off-topic (social media, PPC, video, photography) | 62 | 301 -> /blog/ |
| **Total kept** | **103** | |
| **Total dropped** | **87** | |

Full classification: `tasks/blog-tiering-report.md`
Full curation list: `tasks/blog-curation-manifest.md`

### Blog Categories (New)

Remapped from WordPress categories to match the web development studio focus:

| Category Slug | Label (EN) | Label (HR) |
|---|---|---|
| `web-development` | Web Development | Web Razvoj |
| `seo` | SEO | SEO |
| `digital-marketing` | Digital Marketing | Digitalni Marketing |
| `wordpress` | WordPress | WordPress |
| `business-strategy` | Business & Strategy | Poslovanje i Strategija |
| `ai-automation` | AI & Automation | AI i Automatizacija |

### Category Page Redirects

Old WordPress category pages redirect to blog listing with category filter:

| Old URL | Redirect Target |
|---|---|
| `/category/web-dizajn/` | `/hr/blog/?category=web-development` |
| `/category/drustvene-mreze/` | `/hr/blog/` |
| `/category/referenca/` | `/hr/portfolio/` |
| `/en/category/web-design/` | `/blog/?category=web-development` |
| `/en/category/social-networks/` | `/blog/` |
| `/en/category/reference/` | `/portfolio/` |
| (Full list in `tasks/redirect-map.md`) | |

> **Note:** Category redirect targets for `/category/referenca/` and `/en/category/reference/` updated from `/hr/reference/` and `/references/` to `/hr/portfolio/` and `/portfolio/` respectively.

---

## Slug Changes Summary

Page slugs that changed from the old WordPress structure:

| Page | Old Slug | New Slug | Language |
|---|---|---|---|
| References/Portfolio | `references` | `portfolio` | EN |
| References/Portfolio | `reference` | `portfolio` | HR |
| References/Portfolio | `referenzen` | `portfolio` | DE |
| SEO | `seo-optimizacija-trazilice` | `seo` | HR |
| SEO | `seo-optimization-search-engines` | `seo` | EN |
| SEO | `seo-optimierung-suchmaschinen` | `seo` | DE |
| Digital Cards | `dig-vizitka` | (no dedicated page — on services overview) | HR |
| Digital Cards | `dig-business-card` | (no dedicated page — on services overview) | EN |
| Digital Cards | `dig-visitenkarte` | (no dedicated page — on services overview) | DE |
| 360 Tours | `360-virtualna-setnja` | (no dedicated page — on services overview) | HR |
| 360 Tours | `360-virtual-tour` | (no dedicated page — on services overview) | EN |
| 360 Tours | `360-grad-virtuelle-tour` | (no dedicated page — on services overview) | DE |
| About | `about-us` | `about` | EN |
| Privacy | `datenschutzrichtlinie` | `datenschutz` | DE |
| Cookies | `kekse` | `cookies` | DE |
| Refund Policy | `ruckgabe-politik` | `widerrufsrecht` | DE |

All individual services moved from root level to `/services/[slug]/` (EN), `/hr/usluge/[slug]/` (HR), `/de/dienstleistungen/[slug]/` (DE). Old root-level service URLs redirect to the new paths.

Blog post slugs remain unchanged — they keep their existing per-language slugs but move under the `/blog/` prefix.

---

## Next.js App Router Structure

> **IMPORTANT:** Next.js App Router derives URLs from filesystem paths. The folder name IS the URL slug. These must match exactly. For example, the URL `/de/nutzungsbedingungen/` requires the folder `de/nutzungsbedingungen/page.tsx`, NOT `de/agb/page.tsx`.

```
src/app/
├── layout.tsx                              # Root layout (EN default)
├── page.tsx                                # EN homepage
├── about/page.tsx
├── contact/page.tsx
├── portfolio/
│   ├── page.tsx                            # Portfolio listing
│   └── [slug]/page.tsx                     # Case studies
├── services/
│   ├── page.tsx                            # Services overview
│   ├── web-design/page.tsx
│   ├── web-applications/page.tsx
│   ├── e-commerce/page.tsx
│   ├── ai-integration/page.tsx
│   └── seo/page.tsx
├── pricing/page.tsx
├── analysis/page.tsx
├── career/page.tsx
├── legal-notice/page.tsx
├── terms-and-conditions/page.tsx
├── privacy-policy/page.tsx
├── cookies/page.tsx
├── refund-policy/page.tsx
├── accessibility/page.tsx
├── blog/
│   ├── page.tsx                            # Blog listing
│   └── [slug]/page.tsx                     # Blog posts (103)
├── hr/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── o-nama/page.tsx
│   ├── kontakt/page.tsx
│   ├── portfolio/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── usluge/
│   │   ├── page.tsx
│   │   ├── web-dizajn/page.tsx
│   │   ├── web-aplikacije/page.tsx
│   │   ├── e-trgovina/page.tsx
│   │   ├── ai-integracija/page.tsx
│   │   └── seo/page.tsx
│   ├── cijene/page.tsx
│   ├── analiza/page.tsx
│   ├── karijera/page.tsx
│   ├── pravna-obavijest/page.tsx
│   ├── uvjeti-koristenja/page.tsx
│   ├── politika-privatnosti/page.tsx
│   ├── kolacici/page.tsx
│   ├── politika-povrata/page.tsx
│   ├── izjava-o-pristupacnosti/page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/page.tsx
└── de/
    ├── layout.tsx
    ├── page.tsx
    ├── uber-uns/page.tsx
    ├── kontakt/page.tsx
    ├── portfolio/
    │   ├── page.tsx
    │   └── [slug]/page.tsx
    ├── dienstleistungen/
    │   ├── page.tsx
    │   ├── web-design/page.tsx
    │   ├── web-anwendungen/page.tsx
    │   ├── e-commerce/page.tsx
    │   ├── ki-integration/page.tsx
    │   └── seo/page.tsx
    ├── preise/page.tsx
    ├── analyse/page.tsx
    ├── karriere/page.tsx
    ├── impressum/page.tsx
    ├── nutzungsbedingungen/page.tsx
    ├── datenschutz/page.tsx
    ├── cookies/page.tsx
    ├── widerrufsrecht/page.tsx
    ├── barrierefreiheit/page.tsx
    └── blog/
        ├── page.tsx
        └── [slug]/page.tsx
```

Dynamic routes (`[slug]`) can use `generateStaticParams()` to pre-render pages at build time (recommended for known content). Without it, pages render on-demand via SSR.

---

## Static Assets

| Path | Content |
|---|---|
| `/sitemap.xml` | Auto-generated at build time |
| `/robots.txt` | Auto-generated at build time |
| `/_next/` | Framework assets (JS, CSS) |

---

## Redirect Implementation

Redirects are implemented in `next.config.ts` using the `redirects()` async function, which is now available in standalone mode (not possible with static export). Nginx handles edge cases that Next.js redirects cannot cover (subdomain folder protection, WordPress infrastructure blocks).

**Complete redirect map:** `tasks/redirect-map.md` (~730 rules)

> Redirect targets in `tasks/redirect-map.md` were audited and aligned with this URL structure on 2026-02-25.

**Implementation layers:**

**`next.config.ts` redirects (primary):**
1. Exact page slug-change redirects (including service URL moves and portfolio rename)
2. Old root-level service URL redirects (to `/services/[slug]/`)
3. Dropped service page redirects
4. Package page redirects
5. Blog post redirects (kept posts: old path -> /blog/ path)
6. Blog post redirects (dropped posts: old path -> /blog/ listing)
7. Category page redirects
8. Blanket `/en/` strip rule (redirects old `/en/*` URLs to unprefixed root `/*` — English has no prefix in new URLs)

**Nginx configuration:**
1. Subdomain folder protection (app/, qr/, web/) — proxy pass to separate apps
2. WordPress infrastructure blocks (wp-admin, xmlrpc) — return 403
3. Trailing slash enforcement (backup for `trailingSlash: true` in next.config.ts)
4. HTTPS enforcement
5. Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`
6. Gzip/Brotli compression

---

## Total Route Count

| Type | EN | HR | DE | Total |
|---|---|---|---|---|
| Core pages (home, about, contact, services, portfolio, blog, career) | 7 | 7 | 7 | 21 |
| Service pages (individual) | 5 | 5 | 5 | 15 |
| Portfolio case studies (~5 at launch) | 5 | 5 | 5 | 15 |
| Blog listing | 1 | 1 | 1 | 3 |
| Blog posts (kept) | 103 | 103 | 103 | 309 |
| Legal pages | 6 | 6 | 6 | 18 |
| Other (pricing, analysis) | 2 | 2 | 2 | 6 |
| **Total at launch** | **129** | **129** | **129** | **387** |

Notes:
- Portfolio case study count is an estimate (4-6 projects at launch). Actual count depends on how many case studies are ready.
- 360 tour sub-pages excluded from count (TBD whether they get separate routes).
- DE blog/product counts assume all translations exist. Actual count may be lower for DE where translations are incomplete.
- Product pages removed from route count — products are displayed as a customizer tool on the services overview, not as separate routes.
