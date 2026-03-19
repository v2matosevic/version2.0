# SEO Migration Strategy

## The Problem

Version2 is pivoting from a full-service digital marketing agency to a web development studio. This means several service pages are no longer relevant (social media, PPC, video production, photography). But these pages have SEO value, backlinks, and indexed URLs that cannot just be deleted.

Additionally, 190 blog posts exist, many covering dropped services. 87 posts are being dropped (curated out) and 103 are kept.

The migration also involves a **language flip** (Croatian root -> English root) and a **blog restructure** (root-level posts -> `/blog/` prefix). These are significant, deliberate SEO changes accepted for long-term architectural benefit.

## Strategy for Dropped Service Pages

### Pages That Are Now Irrelevant

These service pages no longer match our offering:
- `/drustvene-mreze/` (Social Media Management)
- `/placeno-oglasavanje/` (Paid Advertising / PPC)
- `/video-foto-produkcija/` (Video & Photo Production)
- `/fotografiranje-nekretnina/` (Real Estate Photography)
- `/snimanje-nekretnina/` (Real Estate Video)

### Approach: 301 Redirect

All dropped service pages 301 redirect to the main services page (`/services/`, `/hr/usluge/`, `/de/dienstleistungen/`). This passes link equity to the most relevant remaining page.

> Action needed before launch: Check Google Analytics / Search Console for traffic data on each dropped page. Pages with significant organic traffic or backlinks may warrant an archive page (noindex) instead of a blind 301.

## Strategy for Blog Posts

### The Situation

190 blog posts across 3 languages. After curation: 103 kept, 87 dropped.

### Blog Curation (COMPLETED)

Posts classified into tiers and curated:

| Tier | Count | Action |
|---|---|---|
| Tier 1 — Core (web dev, SEO, hosting, business cards, 360) | 88 | Keep, migrate to `/blog/` |
| Tier 2 — Selected adjacent (branding, AI, fonts, e-commerce) | 15 | Keep, migrate to `/blog/` |
| Case Studies (removed session 9 — outdated client work) | 13 | 301 redirect to `/blog/` listing |
| Tier 2 — Dropped adjacent (email marketing, generic DM) | 12 | 301 redirect to `/blog/` listing |
| Tier 3 — Off-topic (social media, PPC, video, photography) | 62 | 301 redirect to `/blog/` listing |

Full classification: `tasks/blog-tiering-report.md`
Definitive keep/drop list: `tasks/blog-curation-manifest.md`

### Blog URL Change

Blog posts move from root level to `/blog/[slug]/`:
- OLD: `version2.hr/{slug}/`
- NEW: `version2.hr/blog/{en-slug}/` (EN), `version2.hr/hr/blog/{hr-slug}/` (HR)

This is a one-time SEO cost that:
- Eliminates all slug collision routing complexity
- Simplifies the Next.js app router architecture
- Creates a clean content hierarchy
- Pairs naturally with blog curation (dropped posts redirect to listing)

### New Content Strategy

Focus blog content on: web development, programming, AI, technical SEO, modern frameworks, custom code vs templates, case studies of web development projects.

### Fix Internal Links

During the blog rewrite phase, update internal links to match new URL structure. Internal links mapped in `tasks/internal-links-report.md`.

**Completed analyses:** Blog tiering (`tasks/blog-tiering-report.md`), blog curation (`tasks/blog-curation-manifest.md`), internal links (`tasks/internal-links-report.md`), redirect map (`tasks/redirect-map.md`), page audit (`tasks/page-audit.md`).

## URL Structure Summary

All page slugs have been cleaned up for readability and SEO. Several were simplified:
- `/seo-optimizacija-trazilice/` -> `/hr/seo/`
- `/dig-vizitka/` -> `/hr/digitalne-vizitke/`
- `/360-virtualna-setnja/` -> `/hr/360-virtualne-setnje/`

Services have moved under a `/services/[slug]/` prefix:
- `/web-design/` -> `/services/web-design/`
- `/web-applications/` -> `/services/web-applications/`
- `/e-commerce/` -> `/services/e-commerce/`
- `/seo/` -> `/services/seo/`
- (and similarly for all individual service pages)

Other structural changes:
- `/references/` -> `/portfolio/`
- `/career/` added as a new page (footer + menu)

> Redirect targets in `tasks/redirect-map.md` were audited and aligned with the current URL structure on 2026-02-25.

Portfolio case study pages (`/portfolio/[slug]/`) each need individual SEO treatment: unique title, meta description, and structured data (CreativeWork schema) for proper search indexing.

Full route map: `sitemap.md`

## Redirect Summary

~730 individual redirect rules via `next.config.ts` `redirects()`. Complete implementation: `tasks/redirect-map.md`.

| Category | Rules |
|---|---|
| Page redirects (language flip + slug changes) | ~48 |
| Dropped services | 15 |
| Package pages | 18 |
| Products | ~26 |
| Blog posts — kept (3 languages) | 309 |
| Blog posts — dropped (3 languages) | 261 |
| Categories, authors, misc | ~50 |
| **Total** | **~730** |

## Sitemap

- Generate a new sitemap.xml at build time via Next.js
- Submit to Google Search Console after migration
- Monitor for 404s in Search Console for 3 months post-launch

## Technical SEO Checklist (Migration Day)

- [ ] All old URLs return 200 or 301 (no 404s)
- [ ] Canonical tags on every page
- [ ] Meta titles and descriptions preserved or improved
- [ ] Open Graph tags on every page
- [ ] JSON-LD schemas: LocalBusiness (root, includes address/contact), WebSite, Service, BlogPosting, Product (digital business cards), BreadcrumbList, CreativeWork (portfolio case studies)
- [ ] hreflang tags on every page (EN, HR, DE, x-default)
- [ ] robots.txt allows crawling
- [ ] sitemap.xml submitted to Search Console
- [ ] Google Analytics and Tag Manager verified working
- [ ] Facebook Pixel verified working
- [ ] Page speed: all pages score 90+ on Lighthouse
- [ ] Mobile responsiveness verified
