# Redirect Map -- Version2.hr Website Rebuild

> Generated: 2026-02-23
> Updated: 2026-02-25 (all redirect targets aligned with new URL structure: services under /services/[slug]/, portfolio replaces references, products eliminated, gallery dropped)
> Purpose: Comprehensive 301 redirect map for WordPress-to-Next.js migration
> Implementation: `next.config.ts` `redirects()` (standalone mode on Hostinger VPS). Nginx handles edge cases.

## Context

**Three simultaneous changes:**
1. **Language flip:** Croatian at root -> English at root, Croatian at `/hr/`
2. **Blog restructure:** Blog posts move from root to `/blog/[slug]/`
3. **Blog curation:** 87 of 190 posts dropped (301 to `/blog/` listing), 103 kept

**Language structure change:**
- OLD: Croatian at root (`/`), English at `/en/`, German at `/de/`
- NEW: English at root (no prefix), Croatian at `/hr/`, German at `/de/`. There is NO `/en/` in any URL.

**Key constraints:**
- Every old URL must return 200 or 301 -- zero 404s
- Blog posts now live under `/blog/`, not at root
- 103 kept blog posts x 3 languages = 309 blog URLs (with redirects from old paths)
- 87 dropped blog posts x 3 languages = 261 redirect rules to blog listing
- 21 products x 3 languages = 63 product URLs
- Several page slugs simplified (see sitemap.md Slug Changes Summary)
- All trailing slashes preserved

---

## 1. Page URL Mapping

### Core Pages

#### Home
```
/ → /hr/ (301)                         # Old HR root → new HR prefix
/en/ → / (301)                          # Old EN prefix → new EN root
/de/ → /de/ (200)                       # German stays unchanged
```

#### About
```
/o-nama/ → /hr/o-nama/ (301)           # HR: root → /hr/ prefix
/en/about-us/ → /about/ (301)          # EN: /en/ prefix → root, slug change about-us → about
/de/uber-uns/ → /de/uber-uns/ (200)    # DE: unchanged
```

#### Contact
```
/kontakt/ → /hr/kontakt/ (301)         # HR: root → /hr/ prefix
/en/contact/ → /contact/ (301)         # EN: /en/ prefix → root
/de/kontakt/ → /de/kontakt/ (200)      # DE: unchanged
```

#### Services
```
/usluge/ → /hr/usluge/ (301)           # HR: root → /hr/ prefix
/en/services/ → /services/ (301)       # EN: /en/ prefix → root
/de/dienstleistungen/ → /de/dienstleistungen/ (200)  # DE: unchanged
```

#### Blog Listing
```
/blog/ → /hr/blog/ (301)               # HR: root → /hr/ prefix
/en/blog/ → /blog/ (301)               # EN: /en/ prefix → root
/de/blog/ → /de/blog/ (200)            # DE: unchanged
```

#### Portfolio (was References)
```
/reference/ → /hr/portfolio/ (301)     # HR: root → /hr/ prefix, renamed to portfolio
/en/references/ → /portfolio/ (301)    # EN: /en/ prefix → root, renamed to portfolio
/de/referenzen/ → /de/portfolio/ (301) # DE: renamed to portfolio
```

#### Gallery (Dropped)
```
/galerija/ → /hr/portfolio/ (301)      # HR: gallery dropped, redirect to portfolio
/en/gallery/ → /portfolio/ (301)       # EN: gallery dropped, redirect to portfolio
/de/galerie/ → /de/portfolio/ (301)    # DE: gallery dropped, redirect to portfolio
```
> Gallery is dropped (resolved). All gallery URLs redirect to portfolio.

### Active Service Pages

#### Web Design
```
/web-dizajn/ → /hr/usluge/web-dizajn/ (301)   # HR: root → /hr/ prefix, moved under services
/en/web-design/ → /services/web-design/ (301)  # EN: /en/ prefix → root, moved under /services/
/de/web-design/ → /de/dienstleistungen/web-design/ (301) # DE: moved under /dienstleistungen/
```

#### SEO
```
/seo-optimizacija-trazilice/ → /hr/usluge/seo/ (301)                  # HR: root → /hr/, slug simplified, under services
/en/seo-optimization-search-engines/ → /services/seo/ (301)           # EN: slug changed + prefix removed, under /services/
/de/seo-optimierung-suchmaschinen/ → /de/dienstleistungen/seo/ (301) # DE: slug simplified, under /dienstleistungen/
```

#### Digital Business Cards
```
/dig-vizitka/ → /hr/usluge/ (301)                               # HR: no dedicated page, folded into services overview
/en/dig-business-card/ → /services/ (301)                        # EN: no dedicated page, folded into services overview
/de/dig-visitenkarte/ → /de/dienstleistungen/ (301)              # DE: no dedicated page, folded into services overview
```
> Note: No dedicated page. Folded into services overview with card customizer tool.

#### 360 Virtual Tours
```
/360-virtualna-setnja/ → /hr/usluge/ (301)                            # HR: no dedicated page, folded into services overview
/en/360-virtual-tour/ → /services/ (301)                              # EN: no dedicated page, folded into services overview
/de/360-grad-virtuelle-tour/ → /de/dienstleistungen/ (301)            # DE: no dedicated page, folded into services overview
```
> Note: No dedicated page. Embedded demos on services overview.

#### 360 Virtual Tour Sub-Pages

##### Sukosanska Vila
```
/360-virtualna-setnja/sukosanska-vila/ → /hr/usluge/ (301)
/en/360-virtual-tour/sukosan-villa/ → /services/ (301)
/de/360-grad-virtuelle-tour/sukosan-villa/ → /de/dienstleistungen/ (301)
```
> Note: Redirect targets may change if tour sub-pages get their own routes in the future.

##### Holiday Home Baroque Art
```
/360-virtualna-setnja/holiday-home-baroque-art/ → /hr/usluge/ (301)
```
> Note: Only HR version exists. No EN/DE translations. Redirect target may change if tour sub-pages get their own routes.

### Legal Pages

#### Privacy Policy
```
/politika-privatnosti/ → /hr/politika-privatnosti/ (301)
/en/privacy-policy/ → /privacy-policy/ (301)
/de/datenschutz/ → /de/datenschutz/ (200)
```

#### Cookies
```
/kolacici/ → /hr/kolacici/ (301)
/en/cookies/ → /cookies/ (301)
/de/kekse/ → /de/cookies/ (301)
```

#### Refund Policy
```
/politika-povrata/ → /hr/politika-povrata/ (301)
/en/refund-policy/ → /refund-policy/ (301)
/de/ruckgabe-politik/ → /de/widerrufsrecht/ (301)
```

### Pricing (New Page)
```
/pricing/ → (200, new page, no redirect needed)
/hr/cijene/ → (200, new page, no redirect needed)
```

---

## 2. Dropped Service Redirects

These service pages are being discontinued because Version2 is pivoting from full-service agency to web development studio. Per the SEO migration strategy, each page needs either an archive page (noindex) or a 301 redirect.

### Social Media Management
```
/drustvene-mreze/ → /hr/usluge/ (301)
/en/social-media/ → /services/ (301)
/de/soziale-netzwerke/ → /de/dienstleistungen/ (301)
```
> Recommendation: If this page had significant traffic or backlinks, consider creating an archive page at `/hr/drustvene-mreze/` with noindex instead.

### Paid Advertising (PPC)
```
/placeno-oglasavanje/ → /hr/usluge/ (301)
/en/ppc-advertising/ → /services/ (301)
/de/bezahlte-werbung/ → /de/dienstleistungen/ (301)
```

### Video & Photo Production
```
/video-foto-produkcija/ → /hr/usluge/ (301)
/en/video-photo-production/ → /services/ (301)
/de/video-foto-produktion/ → /de/dienstleistungen/ (301)
```

### Real Estate Photography
```
/fotografiranje-nekretnina/ → /hr/usluge/ (301)
/en/photography-real-estate/ → /services/ (301)
/de/fotografie-immobilien/ → /de/dienstleistungen/ (301)
```

### Real Estate Video / Drone
```
/snimanje-nekretnina-iz-novih-perspektiva/ → /hr/usluge/ (301)
/en/filming-real-estate-from-new-perspectives/ → /services/ (301)
/de/filmobjekte-aus-neuen-perspektiven/ → /de/dienstleistungen/ (301)
```

> Action needed before launch: Check Google Analytics / Search Console for traffic data on each dropped page. Pages with significant organic traffic or backlinks should get archive pages instead of blind 301s.

---

## 3. Package Page Redirects

The old package-based pricing system is being replaced by an interactive pricing tool at `/pricing/` (EN) / `/hr/cijene/` (HR).

### Smart Web Plan
```
/smart-web-plan/ → /hr/cijene/ (301)
/en/smart-web-plan/ → /pricing/ (301)
/de/smart-web-plan/ → /de/preise/ (301)
```
> Decision needed: Confirm DE pricing page slug.

### Simple Paket
```
/web-dizajn/simple-paket/ → /hr/cijene/ (301)
/en/web-design/simple-package/ → /pricing/ (301)
/de/web-design/einfaches-paket/ → /de/preise/ (301)
```

### Profesionalni Paket
```
/web-dizajn/profesionalni-paket/ → /hr/cijene/ (301)
/en/web-design/professional-package/ → /pricing/ (301)
/de/web-design/professionelles-paket/ → /de/preise/ (301)
```

### E-Commerce Paket
```
/web-dizajn/e-commerce-paket/ → /hr/cijene/ (301)
/en/web-design/e-commerce-package/ → /pricing/ (301)
/de/web-design/e-commerce-paket/ → /de/preise/ (301)
```

### Premium Paket
```
/web-dizajn/premium-paket/ → /hr/cijene/ (301)
/en/web-design/premium-package/ → /pricing/ (301)
/de/web-design/premium-paket/ → /de/preise/ (301)
```

### Evaluation Pages (Resolved)

#### Analiza (Free Website Analysis — KEPT)
```
/analiza/ → /hr/analiza/ (301)
/en/analysis/ → /analysis/ (301)
/de/analyse/ → /de/analyse/ (200)
```
> Resolved: The analiza page is kept as a lead-gen tool at `/analysis/`, `/hr/analiza/`, `/de/analyse/`.

#### Katalog (Product Catalog — DROPPED)
```
/katalog/ → /hr/usluge/ (301)
/en/catalog/ → /services/ (301)
/de/katalog/ → /de/dienstleistungen/ (301)
```
> The old catalog was a WooCommerce shop page. Catalog is dropped entirely (resolved). Redirect to services overview.

---

## 4. Product URL Mapping

Products no longer have individual pages. All 21 digital business card products are folded into a customizer tool on the services overview page. ALL old product URLs redirect to the services page.

### Product Redirect Rules

```
# All HR products at root → services
/product/*/ → /hr/usluge/ (301)

# All EN products
/en/product/*/ → /services/ (301)

# All DE products
/de/produkt/*/ → /de/dienstleistungen/ (301)
```

> Resolved: Products don't have individual pages. The old WooCommerce product URLs (21 products x 3 languages = 63 URLs) all redirect to the services overview where the card customizer tool lives.

---

## 5. Language Flip Redirects

This is the systematic pattern that applies across the entire site. The fundamental transformation:

### Pattern A: Croatian Root → `/hr/` Prefix
Every old Croatian URL at root must redirect to its `/hr/` equivalent.

```apache
# SYSTEMATIC RULE (apply via RewriteRule, not individual Redirect directives):
# All old Croatian root-level page URLs → /hr/ prefix
# This CANNOT be done as a blanket rule because blog posts also live at root
# and EN content now lives at root. Must be handled per-URL.
```

**Affected page URLs (explicit list):**
```
/ → /hr/ (301)
/o-nama/ → /hr/o-nama/ (301)
/kontakt/ → /hr/kontakt/ (301)
/usluge/ → /hr/usluge/ (301)
/web-dizajn/ → /hr/usluge/web-dizajn/ (301)
/seo-optimizacija-trazilice/ → /hr/usluge/seo/ (301)
/dig-vizitka/ → /hr/usluge/ (301)
/360-virtualna-setnja/ → /hr/usluge/ (301)
/reference/ → /hr/portfolio/ (301)
/galerija/ → /hr/portfolio/ (301)
/blog/ → /hr/blog/ (301)
/politika-privatnosti/ → /hr/politika-privatnosti/ (301)
/kolacici/ → /hr/kolacici/ (301)
/politika-povrata/ → /hr/politika-povrata/ (301)
/360-virtualna-setnja/sukosanska-vila/ → /hr/usluge/ (301)
/360-virtualna-setnja/holiday-home-baroque-art/ → /hr/usluge/ (301)
```

### Pattern B: English `/en/` Prefix → Root (No Prefix)
Every old English URL at `/en/` must redirect to the unprefixed root equivalent. The new site has NO `/en/` prefix — English URLs live at root.

```ts
// SYSTEMATIC RULE: Strip /en/ prefix
// Can be implemented as a catch-all redirect in next.config.ts
// { source: '/en/:path*', destination: '/:path*', permanent: true }
// BUT some EN slugs changed (see "Slug Changes" below), so those need
// individual rules BEFORE the blanket strip.
```

**Slug changes (must be handled BEFORE the blanket `/en/` strip):**
```
/en/about-us/ → /about/ (301)                                      # slug: about-us → about
/en/seo-optimization-search-engines/ → /services/seo/ (301)        # slug simplified, under /services/
/en/dig-business-card/ → /services/ (301)                           # no dedicated page, to services overview
/en/360-virtual-tour/ → /services/ (301)                            # no dedicated page, to services overview
/en/360-virtual-tour/sukosan-villa/ → /services/ (301)              # no dedicated page, to services overview
```

**EN pages with target changes (need explicit rules BEFORE blanket strip):**
```
/en/web-design/ → /services/web-design/ (301)       # target changed: under /services/
/en/references/ → /portfolio/ (301)                   # target changed: renamed to portfolio
/en/gallery/ → /portfolio/ (301)                      # target changed: gallery dropped, to portfolio
```

**Unchanged EN slugs (handled by blanket `/en/` → `/` rule):**
```
/en/ → / (301)
/en/services/ → /services/ (301)
/en/blog/ → /blog/ (301)
/en/contact/ → /contact/ (301)
/en/privacy-policy/ → /privacy-policy/ (301)
/en/cookies/ → /cookies/ (301)
/en/refund-policy/ → /refund-policy/ (301)
```

### Pattern C: German `/de/` Prefix Stays, But Some Slugs Change
German URLs keep the `/de/` prefix but several slugs change due to the services restructure and portfolio rename.

**DE redirects needed:**
```
/de/seo-optimierung-suchmaschinen/ → /de/dienstleistungen/seo/ (301)        # Slug simplified + under /dienstleistungen/
/de/web-design/ → /de/dienstleistungen/web-design/ (301)                     # Moved under /dienstleistungen/
/de/seo/ → /de/dienstleistungen/seo/ (301)                                   # Moved under /dienstleistungen/
/de/dig-visitenkarte/ → /de/dienstleistungen/ (301)                           # Folded into services overview
/de/360-grad-virtuelle-tour/ → /de/dienstleistungen/ (301)                    # Folded into services overview
/de/referenzen/ → /de/portfolio/ (301)                                        # Renamed to portfolio
/de/galerie/ → /de/portfolio/ (301)                                           # Gallery dropped, redirect to portfolio
```

### Implementation Order in next.config.ts

The order of redirect rules matters. `next.config.ts` `redirects()` returns an array processed top-to-bottom (first match wins). Process in this sequence:

1. Individual slug-change redirects (specific EN/DE URLs that change slug, including services restructure and portfolio rename)
2. Dropped service page redirects
3. Package page redirects
4. Croatian page root -> /hr/ prefix redirects (with new targets)
5. Blog post redirects — kept posts (all 3 languages, root -> /blog/)
6. Blog post redirects — dropped posts (all 3 languages, root -> /blog/ listing)
7. Product redirects (blanket rules: all products -> services overview)
8. Category, author, product-category, product-tag, misc redirects
9. Blanket `/en/` strip rule (catches remaining EN page URLs — redirects `/en/*` to `/*`)
10. Trailing slash enforcement (handled by `trailingSlash: true` in next.config.ts)

---

## 6. Category Page Redirects

WordPress uses `/category/` for blog categories. The new site either drops category archive pages or reimplements them differently.

### Blog Categories (WordPress → New Site)

```
# Croatian category pages (root → /hr/)
/category/digital-marketing/ → /hr/blog/?category=digital-marketing (301)
/category/drustvene-mreze/ → /hr/blog/ (301)              # Dropped category (social media)
/category/referenca/ → /hr/portfolio/ (301)                 # Case studies → portfolio
/category/video-i-foto/ → /hr/blog/ (301)                  # Dropped category (video/photo)
/category/web-dizajn/ → /hr/blog/?category=web-development (301)

# English category pages (/en/ → root)
/en/category/digital-marketing/ → /blog/?category=digital-marketing (301)
/en/category/social-networks/ → /blog/ (301)               # Dropped category (social media)
/en/category/reference/ → /portfolio/ (301)                 # Case studies → portfolio
/en/category/video-and-photo/ → /blog/ (301)               # Dropped category (video/photo)
/en/category/web-design/ → /blog/?category=web-development (301)

# German category pages
/de/kategorie/digitales-marketing/ → /de/blog/?category=digital-marketing (301)
/de/kategorie/soziale-netzwerke/ → /de/blog/ (301)         # Dropped category (social media)
/de/kategorie/referenz-2/ → /de/portfolio/ (301)            # Case studies → portfolio
/de/kategorie/video-und-foto/ → /de/blog/ (301)            # Dropped category (video/photo)
/de/kategorie/web-design/ → /de/blog/?category=web-development (301)
```

Categories that still exist in the new site (web-development, digital-marketing) redirect to the filtered blog view. Dropped categories (social media, video/photo) redirect to the plain blog listing. Case study categories redirect to portfolio.

### WooCommerce Product Categories

```
/product-category/digitalne-vizitke/ → /hr/usluge/ (301)
/product-category/custom-digitalne-vizitke/ → /hr/usluge/ (301)
/en/product-category/digital-business-cards/ → /services/ (301)
/en/product-category/custom-digital-business-cards/ → /services/ (301)
/de/produktkategorie/digitale-visitenkarten/ → /de/dienstleistungen/ (301)
/de/produktkategorie/individuelle-digitale-visitenkarten/ → /de/dienstleistungen/ (301)
```

### WooCommerce Product Tags

```
/product-tag/gotovi-dizajni/ → /hr/usluge/ (301)
/product-tag/custom-dizajni/ → /hr/usluge/ (301)
/en/product-tag/ready-made-designs/ → /services/ (301)
/en/product-tag/custom-designs/ → /services/ (301)
/de/produkt-tag/fertige-designs/ → /de/dienstleistungen/ (301)
/de/produkt-tag/sonderanfertigungen/ → /de/dienstleistungen/ (301)
```

> Note: There may be additional product tags (e.g., NFC). Check `/product_tag-sitemap.xml` for completeness.

---

## 7. Blog Post URL Pattern

### The Big Change

Blog posts move from root level to `/blog/[slug]/`. This affects ALL 190 posts across 3 languages.

**Old WordPress URL pattern:**
- HR: `/{hr-slug}/` (root)
- EN: `/en/{en-slug}/`
- DE: `/de/{de-slug}/`

**New Next.js URL pattern (kept posts only — 103 posts):**
- EN: `/blog/{en-slug}/`
- HR: `/hr/blog/{hr-slug}/`
- DE: `/de/blog/{de-slug}/`

**Dropped posts (87 posts) — redirect to blog listing:**
- HR: `/{hr-slug}/` -> `/hr/blog/`
- EN: `/en/{en-slug}/` -> `/blog/`
- DE: `/de/{de-slug}/` -> `/de/blog/`

### Why Slug Collisions No Longer Matter

Moving blog posts to `/blog/` completely eliminates the slug collision problem. Blog post slugs and page slugs no longer share the root namespace. The 6 HR=EN, 4 HR=DE, 8 EN=DE collisions documented in the collision analysis below are now irrelevant — each language's blog posts live under `/{locale}/blog/` and never compete with page routes.

### Redirect Logic

**Croatian blog posts — KEPT (103 URLs):**
Each Croatian blog post at root `/{hr-slug}/` redirects to `/hr/blog/{hr-slug}/`:
```apache
# Example: kept post
Redirect 301 /kako-izraditi-web-stranicu-bez-ikakvog-iskustva/ /hr/blog/kako-izraditi-web-stranicu-bez-ikakvog-iskustva/
```

**Croatian blog posts — DROPPED (87 URLs):**
Each dropped Croatian blog post at root `/{hr-slug}/` redirects to `/hr/blog/`:
```apache
# Example: dropped post
Redirect 301 /tiktok/ /hr/blog/
Redirect 301 /influencer-marketing/ /hr/blog/
```

**English blog posts — KEPT (103 URLs):**
Cannot use blanket `/en/` strip because blog posts need `/blog/` prefix added:
```apache
# Example: kept EN post
Redirect 301 /en/how-to-make-a-website-with-no-experience/ /blog/how-to-make-a-website-with-no-experience/
```

**English blog posts — DROPPED (87 URLs):**
```apache
Redirect 301 /en/tiktok/ /blog/
Redirect 301 /en/influencer-marketing/ /blog/
```

**German blog posts — KEPT (103 URLs):**
DE blog posts now need redirects (previously they didn't) because `/blog/` is inserted:
```apache
# Example: kept DE post
Redirect 301 /de/wie-man-eine-website-ohne-erfahrung-erstellt/ /de/blog/wie-man-eine-website-ohne-erfahrung-erstellt/
```

**German blog posts — DROPPED (87 URLs):**
```apache
Redirect 301 /de/tiktok/ /de/blog/
Redirect 301 /de/influencer-marketing/ /de/blog/
```

### Redirect Count

| Category | Count |
|---|---|
| HR kept posts (root -> /hr/blog/) | 103 |
| HR dropped posts (root -> /hr/blog/) | 87 |
| EN kept posts (/en/ -> /blog/) | 103 |
| EN dropped posts (/en/ -> /blog/) | 87 |
| DE kept posts (/de/ -> /de/blog/) | 103 |
| DE dropped posts (/de/ -> /de/blog/) | 87 |
| **Total blog redirect rules** | **570** |

Note: The blanket `/en/` strip rule (Section 5, Pattern B) must EXCLUDE blog post paths. Blog EN posts need individual rules because they need `/blog/` prefix added.

### Automation Script (Required)

Generate all blog redirect rules at build time from content metadata. The output is a TypeScript array for `next.config.ts` `redirects()`:

```typescript
// scripts/generate-redirects.ts (pseudo-code)
// Reads blog frontmatter + curation manifest, outputs redirect array

for each directory in content/blog/*:
    hr_slug = hr.md frontmatter.slug
    en_slug = hr.md frontmatter.translations.en
    de_slug = hr.md frontmatter.translations.de

    if slug in KEPT_LIST:
        emit { source: '/${hr_slug}/', destination: '/hr/blog/${hr_slug}/', permanent: true }
        emit { source: '/en/${en_slug}/', destination: '/blog/${en_slug}/', permanent: true }
        emit { source: '/de/${de_slug}/', destination: '/de/blog/${de_slug}/', permanent: true }
    else:
        emit { source: '/${hr_slug}/', destination: '/hr/blog/', permanent: true }
        emit { source: '/en/${en_slug}/', destination: '/blog/', permanent: true }
        emit { source: '/de/${de_slug}/', destination: '/de/blog/', permanent: true }
```

The KEPT_LIST comes from `tasks/blog-curation-manifest.md`.

Note: Old `/en/` blog URLs redirect to unprefixed `/blog/` paths (English has no URL prefix).

---

## 8. Miscellaneous Redirects

### Author Pages

WordPress generates author archive pages. The new site does not have author pages.

```
/author/version2/ → /hr/blog/ (301)
/author/v2blog/ → /hr/blog/ (301)
/en/author/version2/ → /blog/ (301)
/en/author/v2blog/ → /blog/ (301)
/de/author/version2/ → /de/blog/ (301)
/de/author/v2blog/ → /de/blog/ (301)
```

### WordPress Infrastructure URLs

```apache
# wp-admin: redirect to homepage (or return 410 Gone)
/wp-admin → / (301)
/wp-admin/ → / (301)
/wp-login.php → / (301)

# wp-content: image/upload URLs should be handled separately
# If old images are preserved in the new site, serve them from /images/ or CDN.
# If not, return 404 (acceptable for images -- they are not pages).
/wp-content/uploads/* → (no redirect, or serve from CDN)

# wp-includes: framework files, no redirect needed
/wp-includes/* → (no redirect, let 404)

# XML-RPC and API endpoints
/xmlrpc.php → (block or 410)
/wp-json/* → (no redirect, let 404)
```

### Feed URLs

```
/feed/ → /hr/blog/ (301)
/en/feed/ → /blog/ (301)
/de/feed/ → /de/blog/ (301)
/comments/feed/ → / (301)
```

> Note: If the new site generates an RSS feed, redirect `/feed/` to the new feed URL instead.

### Sitemap URLs

```
/sitemap_index.xml → /sitemap.xml (301)
/post-sitemap.xml → /sitemap.xml (301)
/page-sitemap.xml → /sitemap.xml (301)
/product-sitemap.xml → /sitemap.xml (301)
/category-sitemap.xml → /sitemap.xml (301)
/product_cat-sitemap.xml → /sitemap.xml (301)
/product_tag-sitemap.xml → /sitemap.xml (301)
/author-sitemap.xml → /sitemap.xml (301)
```

### Pagination URLs

WordPress pagination uses `/page/2/`, `/page/3/`, etc.

```apache
# Blog pagination
/blog/page/[N]/ → /hr/blog/ (301)
/en/blog/page/[N]/ → /blog/ (301)
/de/blog/page/[N]/ → /de/blog/ (301)

# Category pagination
/category/*/page/[N]/ → /hr/blog/ (301)
/en/category/*/page/[N]/ → /blog/ (301)
/de/kategorie/*/page/[N]/ → /de/blog/ (301)
```

> Note: If the new blog listing implements client-side pagination, redirect to `/blog/?page=N` instead.

### Trailing Slash Normalization

WordPress uses trailing slashes. Ensure the new site also uses trailing slashes, OR add a blanket rewrite rule:

```apache
# Ensure trailing slashes on all URLs (match WordPress behavior)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.+[^/])$ /$1/ [R=301,L]
```

### WooCommerce Cart/Checkout/Account

```
/cart/ → /hr/usluge/ (301)
/en/cart/ → /services/ (301)
/de/warenkorb/ → /de/dienstleistungen/ (301)
/checkout/ → /hr/usluge/ (301)
/en/checkout/ → /services/ (301)
/my-account/ → / (301)
/en/my-account/ → / (301)
```

---

## Summary Statistics

| Category | Redirect Count (approx) |
|---|---|
| Core pages (3 langs, incl. slug changes, services restructure, portfolio rename) | ~48 |
| Dropped service pages (3 langs) | 15 |
| Package pages (3 langs) | 18 |
| Product pages (blanket rules for all 3 langs) | 3 (blanket RewriteRules) |
| Blog posts — KEPT (3 langs, root -> /blog/) | 309 (103 x 3) |
| Blog posts — DROPPED (3 langs, root -> /blog/ listing) | 261 (87 x 3) |
| Category pages | 15 |
| Product categories | 6 |
| Product tags | 6+ |
| Author pages | 6 |
| WordPress infra | ~15 |
| Sitemaps | 7 |
| Consultation page redirects | 3 |
| **Total individual rules** | **~710+** |
| **Blanket rules** | 5 (EN page strip, trailing slash, 3 product RewriteRules) |

Note: The blanket `/en/` strip rule (`/en/:path*` -> `/:path*`) only covers EN PAGE URLs (not blog posts, which need individual rules with `/blog/` prefix added). Product redirects use 3 wildcard rules instead of ~26 individual rules since products no longer have individual pages. All redirects are implemented in `next.config.ts` `redirects()` — no `.htaccess` needed (standalone mode on VPS).

---

## Open Decisions

These items need confirmation before finalizing the redirect config in `next.config.ts`:

1. **Archive pages vs 301s**: For dropped services — check analytics for traffic, then decide archive page (noindex) vs 301 redirect for each.
2. **RSS feed**: Will the new site have an RSS feed? If so, redirect old `/feed/` to new feed URL.
3. **wp-content/uploads**: Will old image URLs be preserved? If images move to a CDN or `/images/`, bulk redirects or rewrites are needed.

**Resolved since last update:**
- ~~Gallery page~~ RESOLVED: Dropped. All gallery URLs redirect to portfolio.
- ~~Catalog page~~ RESOLVED: Dropped. All catalog URLs redirect to services overview.
- ~~Product URL prefix~~ RESOLVED: Products don't have individual pages. All old product URLs redirect to services overview.
- ~~Analiza page~~ RESOLVED: Keep as lead-gen at `/analysis/`, `/hr/analiza/`, `/de/analyse/`
- ~~DE slug simplifications~~ RESOLVED: All DE slugs simplified (see sitemap.md Slug Changes Summary)
- ~~Identical blog slugs~~ RESOLVED: No longer relevant — blog posts at `/blog/` eliminate all collisions
- ~~Blog category filtering~~ RESOLVED: Yes, redirect to `/blog/?category=<slug>` where applicable

---

## next.config.ts Redirect Implementation

All redirects are implemented in `next.config.ts` `redirects()` async function. The array is processed top-to-bottom (first match wins). Nginx handles edge cases (subdomain routing, WordPress infrastructure blocks, security headers).

```ts
// next.config.ts — redirect structure (pseudocode)
// Full redirect array generated at build time from blog curation manifest

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  async redirects() {
    return [
      // ============================================================
      // PRIORITY 1: Individual slug-change redirects
      // (Must come before blanket rules)
      // ============================================================

      // Old /en/ pages with slug changes → unprefixed root
      { source: '/en/about-us/', destination: '/about/', permanent: true },
      { source: '/en/seo-optimization-search-engines/', destination: '/services/seo/', permanent: true },
      { source: '/en/dig-business-card/', destination: '/services/', permanent: true },
      { source: '/en/360-virtual-tour/', destination: '/services/', permanent: true },
      { source: '/en/360-virtual-tour/sukosan-villa/', destination: '/services/', permanent: true },
      { source: '/en/web-design/', destination: '/services/web-design/', permanent: true },
      { source: '/en/references/', destination: '/portfolio/', permanent: true },
      { source: '/en/gallery/', destination: '/portfolio/', permanent: true },
      { source: '/en/consultation/', destination: '/contact/', permanent: true },

      // DE pages with slug changes
      { source: '/de/seo-optimierung-suchmaschinen/', destination: '/de/dienstleistungen/seo/', permanent: true },
      { source: '/de/dig-visitenkarte/', destination: '/de/dienstleistungen/', permanent: true },
      { source: '/de/360-grad-virtuelle-tour/', destination: '/de/dienstleistungen/', permanent: true },
      { source: '/de/referenzen/', destination: '/de/portfolio/', permanent: true },
      { source: '/de/galerie/', destination: '/de/portfolio/', permanent: true },
      { source: '/de/web-design/', destination: '/de/dienstleistungen/web-design/', permanent: true },
      { source: '/de/seo/', destination: '/de/dienstleistungen/seo/', permanent: true },
      { source: '/de/beratung/', destination: '/de/kontakt/', permanent: true },

      // ============================================================
      // PRIORITY 2: Dropped service redirects
      // ============================================================

      { source: '/drustvene-mreze/', destination: '/hr/usluge/', permanent: true },
      { source: '/en/social-media/', destination: '/services/', permanent: true },
      { source: '/de/soziale-netzwerke/', destination: '/de/dienstleistungen/', permanent: true },

      { source: '/placeno-oglasavanje/', destination: '/hr/usluge/', permanent: true },
      { source: '/en/ppc-advertising/', destination: '/services/', permanent: true },
      { source: '/de/bezahlte-werbung/', destination: '/de/dienstleistungen/', permanent: true },

      { source: '/video-foto-produkcija/', destination: '/hr/usluge/', permanent: true },
      { source: '/en/video-photo-production/', destination: '/services/', permanent: true },
      { source: '/de/video-foto-produktion/', destination: '/de/dienstleistungen/', permanent: true },

      { source: '/fotografiranje-nekretnina/', destination: '/hr/usluge/', permanent: true },
      { source: '/en/photography-real-estate/', destination: '/services/', permanent: true },
      { source: '/de/fotografie-immobilien/', destination: '/de/dienstleistungen/', permanent: true },

      { source: '/snimanje-nekretnina-iz-novih-perspektiva/', destination: '/hr/usluge/', permanent: true },
      { source: '/en/filming-real-estate-from-new-perspectives/', destination: '/services/', permanent: true },
      { source: '/de/filmobjekte-aus-neuen-perspektiven/', destination: '/de/dienstleistungen/', permanent: true },

      // ============================================================
      // PRIORITY 3: Package page redirects
      // ============================================================

      { source: '/smart-web-plan/', destination: '/hr/cijene/', permanent: true },
      { source: '/en/smart-web-plan/', destination: '/pricing/', permanent: true },
      { source: '/de/smart-web-plan/', destination: '/de/preise/', permanent: true },
      // ... (remaining package redirects follow same pattern)

      // ============================================================
      // PRIORITY 4: Croatian page root → /hr/ prefix
      // ============================================================

      { source: '/o-nama/', destination: '/hr/o-nama/', permanent: true },
      { source: '/kontakt/', destination: '/hr/kontakt/', permanent: true },
      { source: '/usluge/', destination: '/hr/usluge/', permanent: true },
      // ... (remaining Croatian page redirects)

      // ============================================================
      // PRIORITY 5: Blog post redirects — KEPT posts (all 3 languages)
      // (103 x 3 = 309 rules — auto-generated from blog-curation-manifest.md)
      // ============================================================

      // HR: root → /hr/blog/
      // { source: '/{hr-slug}/', destination: '/hr/blog/{hr-slug}/', permanent: true },
      // [AUTO-GENERATED: 103 entries for kept HR posts]

      // EN: /en/ → /blog/ (unprefixed root)
      // { source: '/en/{en-slug}/', destination: '/blog/{en-slug}/', permanent: true },
      // [AUTO-GENERATED: 103 entries for kept EN posts]

      // DE: /de/ → /de/blog/
      // { source: '/de/{de-slug}/', destination: '/de/blog/{de-slug}/', permanent: true },
      // [AUTO-GENERATED: 103 entries for kept DE posts]

      // ============================================================
      // PRIORITY 5b: Blog post redirects — DROPPED posts
      // (87 x 3 = 261 rules — auto-generated from blog-curation-manifest.md)
      // ============================================================

      // HR: root → /hr/blog/ (listing)
      // EN: /en/ → /blog/ (listing, unprefixed)
      // DE: /de/ → /de/blog/ (listing)
      // [AUTO-GENERATED: 261 entries for dropped posts]

      // ============================================================
      // PRIORITY 6: Product redirects (all products → services overview)
      // ============================================================

      { source: '/product/:path*', destination: '/hr/usluge/', permanent: true },
      { source: '/en/product/:path*', destination: '/services/', permanent: true },
      { source: '/de/produkt/:path*', destination: '/de/dienstleistungen/', permanent: true },

      // ============================================================
      // PRIORITY 7: Category, author, misc redirects
      // ============================================================

      // Blog categories
      { source: '/category/digital-marketing/', destination: '/hr/blog/', permanent: true },
      { source: '/category/drustvene-mreze/', destination: '/hr/blog/', permanent: true },
      { source: '/category/referenca/', destination: '/hr/portfolio/', permanent: true },
      { source: '/en/category/digital-marketing/', destination: '/blog/', permanent: true },
      { source: '/en/category/social-networks/', destination: '/blog/', permanent: true },
      { source: '/en/category/reference/', destination: '/portfolio/', permanent: true },
      // ... (remaining category, product-category, product-tag, author, feed, sitemap redirects)

      // WordPress infrastructure
      { source: '/wp-admin', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },

      // ============================================================
      // PRIORITY 9: Blanket /en/ strip (MUST be last)
      // Catches remaining /en/* PAGE URLs not handled above.
      // Blog posts are handled by individual rules in PRIORITY 5
      // because they need /blog/ prefix added, not just /en/ stripped.
      // ============================================================

      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ]
  },
}

export default nextConfig
```

**Trailing slash enforcement** is handled by `trailingSlash: true` in next.config.ts (no separate rule needed).

**WordPress infrastructure blocks** (wp-content, wp-includes, xmlrpc.php) are handled by Nginx returning 403/404 directly, not as Next.js redirects.

---

## Slug Collision Analysis (completed 2026-02-23)

Full scan of all 190 blog posts revealed:

### HR=EN Collisions (6 posts)
These have identical Croatian and English slugs — causes routing conflict when EN is at root and HR redirects from root to `/hr/`:

| Slug | Type |
|---|---|
| aquaart-bathrooms | Client reference |
| dubrovnik-republic-gin | Client reference |
| influencer-marketing | Topic post |
| monster-kebab | Client reference |
| riva-consulting | Client reference |
| tiktok | Topic post |

### HR=DE Collisions (4 posts)
| Slug | Type |
|---|---|
| dubrovnik-republic-gin | Client reference (also HR=EN) |
| influencer-marketing | Topic post (also HR=EN) |
| monster-kebab | Client reference (also HR=EN) |
| riva-consulting | Client reference (also HR=EN) |

### EN=DE Collisions (4 posts)
English and German share the same slug (different from Croatian):

| EN/DE Slug | HR Slug |
|---|---|
| discover-version2-virtual-walks | otkrijte-version2-virtualne-setnje |
| how-to-use-linkedin | kako-koristiti-linkedin |
| nk-alphabet | nk-abeceda |
| tiktok-100k-views-condition | tiktok-100k-pregleda-uvjet |

### Triple Collisions (4 posts — HR=EN=DE)
All 3 languages use the exact same slug:
- dubrovnik-republic-gin
- influencer-marketing
- monster-kebab
- riva-consulting

**Resolution strategy:** These 4 triple-collision posts are all client references. For root-level routing, the EN version gets the root slug. HR and DE versions must use `/hr/slug/` and `/de/slug/` respectively. No special handling needed beyond the standard language prefix routing.

The 2 HR=EN-only collisions (aquaart-bathrooms, tiktok) need the same treatment — EN gets root, HR gets `/hr/` prefix.

The 4 EN=DE collisions are fine — EN is at root, DE is at `/de/` prefix, so there's no conflict.

---

## Next Steps

1. ~~Scan for identical HR/EN blog slugs~~ DONE (irrelevant now — /blog/ eliminates collisions)
2. **Build redirect generator script** — Read blog frontmatter + curation manifest, output all 570 blog redirect rules + page redirect rules as a `next.config.ts` `redirects()` array.
3. **Check analytics** — Pull traffic data for dropped service pages before choosing archive vs. redirect.
4. **Confirm remaining open decisions** — Archive pages vs 301s for dropped services, RSS feed strategy, wp-content/uploads handling.
5. **Test with redirect checker** — Before go-live, test every old URL from the WordPress sitemaps against the Next.js redirect rules.
6. **Set up monitoring** — After launch, monitor Google Search Console for 404 errors and crawl anomalies for 90 days.
