# Content Audit Report

**Generated:** 2026-02-23
**Scope:** `content/blog/`, `content/pages/`, `content/products/`, `content/assets/`

---

## Executive Summary

| Metric | Value |
|---|---|
| Total blog post directories | 190 |
| Total blog .md files | 570 |
| Total pages (top-level) | 21 |
| Total pages (including sub-pages) | 27 |
| Total products | 21 |
| Date range | 2023-07-21 to 2025-07-10 |
| Average word count (hr.md) | 531 words |
| Frontmatter issues | 0 |
| Missing featured images | 0 |
| Language coverage gaps (blog) | 0 |

The content layer is in excellent structural health. All 190 blog posts have complete tri-language coverage (hr/en/de), all required frontmatter fields are present, and every featured image reference resolves to a valid image file. The only issues found are minor category naming inconsistencies and one sub-page missing translations.

---

## 1. Translation Coverage (Blog Posts)

**Result: 100% coverage across all 3 languages.**

| Status | Count |
|---|---|
| All 3 languages (hr + en + de) | 190 |
| Missing DE | 0 |
| Missing EN | 0 |
| Missing HR | 0 |

Every blog post directory contains `hr.md`, `en.md`, and `de.md`.

---

## 2. Frontmatter Validation

**Result: All 570 .md files pass validation.**

Required fields checked: `title`, `slug`, `language`, `date`, `category`, `featuredImage`

| Check | Result |
|---|---|
| Files scanned | 570 |
| Missing required fields | 0 |

### Additional consistency checks

| Check | Result |
|---|---|
| Slug matches directory name (hr.md) | 190/190 pass |
| Language field matches filename | 570/570 pass |
| Posts with tags field | 190/190 |

### Frontmatter fields observed

Based on sample inspection, each blog .md file contains:
- `title`, `slug`, `originalUrl`, `language`, `translations` (map to other slugs)
- `date`, `lastModified`, `author`, `category`, `tags`, `excerpt`
- `featuredImage` (relative path `./assets/featured.*`)

---

## 3. Featured Image Validation

**Result: All 190 featured images are valid.**

Every `featuredImage` path resolves to an existing file (relative to the blog post directory), and all files are confirmed to be actual images via `file` command inspection.

| Status | Count |
|---|---|
| Valid image files | 190 |
| Missing files | 0 |
| Non-image files | 0 |

### Image format distribution

| Format | Count |
|---|---|
| .jpg | 90 |
| .webp | 58 |
| .jpeg | 36 |
| .png | 6 |

### Asset structure

Each blog post has exactly 1 asset file (the featured image) in its `assets/` subdirectory. No blog post has additional inline images or supplementary assets beyond the featured image.

---

## 4. Category Distribution

### By language (HR as canonical)

| Category (HR) | Category (EN) | Category (DE) | Posts |
|---|---|---|---|
| Digitalni Marketing | Digital Marketing | Digitales Marketing | 77 |
| Web Dizajn | Web Design | Web-Design | 50 |
| Drustvene Mreze | Social Media | Soziale Netzwerke | 46 |
| Referenca | Reference | Referenz | 15 |
| Video i Foto | Video and Photo | Video und Foto | 2 |

**Total: 190 posts across 5 categories.**

### Category naming inconsistencies

There are naming inconsistencies in the EN and DE translations for the social media category:

**English:** 43 posts use "Social Media", but 3 posts use "Social Networks"
- `kako-napraviti-kratke-viralne-videozapise`
- `tko-su-influenceri-i-zasto-su-oni-bitni`
- `zasto-se-vasi-tiktok-videozapisi-zaustavljaju-na-oko-250-pregleda`

**German:** 44 posts use "Soziale Netzwerke", but 2 posts use "Soziale Medien"
- `kako-napraviti-kratke-viralne-videozapise`
- `tko-su-influenceri-i-zasto-su-oni-bitni`

These 3 EN posts and 2 DE posts should be normalized to the majority spelling to avoid category fragmentation.

---

## 5. Date Range

| Metric | Value |
|---|---|
| Oldest post | 2023-07-21 |
| Newest post | 2025-07-10 |
| Span | ~24 months |

### Publishing frequency by month

| Month | Posts | Month | Posts |
|---|---|---|---|
| 2023-07 | 10 | 2024-03 | 3 |
| 2023-08 | 40 | 2024-04 | 1 |
| 2023-09 | 33 | 2024-05 | 5 |
| 2023-10 | 26 | 2024-06 | 7 |
| 2023-11 | 5 | 2024-07 | 4 |
| 2023-12 | 18 | 2024-08 | 6 |
| 2024-01 | 5 | 2024-09 | 2 |
| 2024-02 | 13 | 2024-10 | 1 |
| 2025-03 | 1 | 2025-06 | 8 |
| 2025-07 | 2 | | |

**Notable:** Heavy initial output in mid-2023 (109 posts in Jul-Oct 2023), tapering to sporadic publishing through 2024 and a brief pickup in mid-2025. A 5-month gap exists between 2024-10 and 2025-03.

---

## 6. Word Count Statistics (hr.md)

| Metric | Value |
|---|---|
| Total hr.md files | 190 |
| Total words | 101,006 |
| Average words per post | 531 |
| Shortest post | 144 words (`klima-centar-trazivuk`) |
| Longest post | 1,788 words (`trendovi-na-drustvenim-mrezama`) |

### Distribution

| Word range | Posts |
|---|---|
| 0-199 | 9 |
| 200-299 | 34 |
| 300-399 | 37 |
| 400-499 | 24 |
| 500-599 | 25 |
| 600-699 | 20 |
| 700-799 | 13 |
| 800-899 | 4 |
| 900-999 | 8 |
| 1000+ | 16 |

**Notable:** 9 posts are under 200 words (very thin content). The median range is 300-399 words. Only 16 posts exceed 1,000 words.

---

## 7. Page Inventory

### Top-level pages (21 directories)

| Page | HR | EN | DE | Has Assets | Sub-pages |
|---|---|---|---|---|---|
| 360-virtualna-setnja | Y | Y | Y | Y | holiday-home-baroque-art, sukosanska-vila |
| analiza | Y | Y | Y | - | - |
| dig-vizitka | Y | Y | Y | Y (28 files) | - |
| drustvene-mreze | Y | Y | Y | Y (12 files) | - |
| fotografiranje-nekretnina | Y | Y | Y | Y (7 files) | - |
| galerija | Y | Y | Y | Y (38 files) | - |
| home | Y | Y | Y | Y (26 files) | - |
| katalog | Y | Y | Y | - | - |
| kolacici | Y | Y | Y | - | - |
| kontakt | Y | Y | Y | - | - |
| o-nama | Y | Y | Y | Y (24 files) | - |
| placeno-oglasavanje | Y | Y | Y | Y (1 file) | - |
| politika-povrata | Y | Y | Y | - | - |
| politika-privatnosti | Y | Y | Y | - | - |
| reference | Y | Y | Y | Y (22 files) | - |
| seo-optimizacija-trazilice | Y | Y | Y | Y (1 file) | - |
| smart-web-plan | Y | Y | Y | Y (6 files) | - |
| snimanje-nekretnina | Y | Y | Y | Y (9 files) | - |
| usluge | Y | Y | Y | Y (26 files) | - |
| video-foto-produkcija | Y | Y | Y | Y (5 files) | - |
| web-dizajn | Y | Y | Y | Y (16 files) | e-commerce-paket, premium-paket, profesionalni-paket, simple-paket |

### Sub-pages (6 total)

| Sub-page | HR | EN | DE |
|---|---|---|---|
| 360-virtualna-setnja/holiday-home-baroque-art | Y | - | - |
| 360-virtualna-setnja/sukosanska-vila | Y | Y | Y |
| web-dizajn/e-commerce-paket | Y | Y | Y |
| web-dizajn/premium-paket | Y | Y | Y |
| web-dizajn/profesionalni-paket | Y | Y | Y |
| web-dizajn/simple-paket | Y | Y | Y |

---

## 8. Page Translation Coverage

**Top-level pages:** All 21 pages have complete tri-language coverage (hr/en/de).

**Sub-pages:** 5 of 6 sub-pages have complete coverage. One gap exists:

| Sub-page | Missing |
|---|---|
| `360-virtualna-setnja/holiday-home-baroque-art` | en.md, de.md |

This sub-page only has `hr.md`. Its frontmatter shows `translations: {}` (empty), confirming translations were never created.

---

## Supplementary: Products & Global Assets

### Products (`content/products/`)

- **21 products** defined in `products.json`
- All 21 product image references resolve to valid `.webp` files in `content/products/assets/`
- Products are NFC digital business cards with pricing, color variants, and tri-language URL mappings

### Global assets (`content/assets/`)

| Directory | File count |
|---|---|
| clients | 30 |
| og-images | 16 |
| favicon | 4 |
| logos | 4 |
| partners | 3 |
| video | 0 (empty) |

**Note:** `content/assets/video/` is an empty directory.

---

## Issues Summary

### Must fix

| # | Issue | Severity | Affected |
|---|---|---|---|
| 1 | Sub-page `360-virtualna-setnja/holiday-home-baroque-art` missing en.md and de.md | Medium | 1 sub-page |

### Should fix

| # | Issue | Severity | Affected |
|---|---|---|---|
| 2 | EN category inconsistency: 3 posts use "Social Networks" instead of "Social Media" | Low | 3 posts |
| 3 | DE category inconsistency: 2 posts use "Soziale Medien" instead of "Soziale Netzwerke" | Low | 2 posts |
| 4 | Empty `content/assets/video/` directory | Trivial | 1 dir |

### Observations (no action needed)

| # | Observation |
|---|---|
| 5 | 9 blog posts have fewer than 200 words (thin content) -- may warrant expansion for SEO |
| 6 | Mixed image formats across featured images (jpg/webp/jpeg/png) -- consider standardizing on webp |
| 7 | 5-month publishing gap (Oct 2024 - Mar 2025) |
| 8 | All blog posts have exactly 1 asset; no inline images used in markdown body |
