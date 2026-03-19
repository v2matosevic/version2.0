# Content Audit

## Issues Found

### 1. ~~Corrupted Featured Images (13 files)~~ RESOLVED 2026-02-22

All 13 corrupted featured images have been re-downloaded from WordPress `og:image` meta tags. Old corrupted files (HTML saved as .jpg) deleted. Frontmatter references updated in all 24 affected markdown files (hr/en/de) to match new file extensions.

**Result:** 5 replaced in-place (.jpg/.webp), 8 saved with correct extension (.webp or .jpeg) and frontmatter updated.

### 2. ~~Missing Inline Blog Images~~ NOT AN ISSUE

Blog posts were extracted as text-only markdown. No inline image references exist in any of the 190 posts — no `![](...)` syntax, no `<img>` tags, no `wp-content/uploads/` references. The WordPress sitemap shows 3-6 images per post, but these were never included in the extraction.

The `https://version2.hr` references found in blog content are internal text links (e.g., `[digitalnim marketingom](https://version2.hr/)`), not image references.

**Action:** Inline images can be re-added during the blog rewrite phase if needed. No broken references to fix now.

### 3. ~~WooCommerce Product Pages~~ RESOLVED 2026-02-25

Extracted all 21 digital business card products from the WooCommerce product sitemap. All products are NFC business cards at 29.99 EUR (sale from 39.99 EUR) with identical descriptions differing only by name, color, and image.

**Products extracted:** DarkPrism, CrystalNet, SilkWave, SunSatin, SunArc, SwirlHarmony, SwirlSync, TwilightFade, VelocityS, AmberSwirl, ColorStream, ScarletRed, PurpleMosaic, OrangeCraft, MarbleFlow, GoldMarble, GoldenBliss, GeoPurple, GeoChroma, EmeraldF, Custom Design.

**Data:** `content/products/products.json` (product catalog: i18n category/features/colors, pricing, shared specs)
**Images:** `content/products/assets/` (21 .webp files)

**RESOLVED:** Products displayed as digital business card customizer on the service page. No separate product routes.

### 4. ~~WordPress Category Pages Not Extracted~~ RESOLVED 2026-02-25

The live site has indexed category pages:
- `/category/web-dizajn/`
- `/category/seo/`
- `/category/drustvene-mreze/`
- etc.

Blog posts link to `/category/drustvene-mreze` (confirmed in internal links report).

**RESOLVED:** Category pages redirect to blog listing with category filter. See `tasks/redirect-map.md`.

### 5. Author Page Not Extracted

WordPress has an author sitemap at `/author-sitemap.xml`.

**Action:** Redirect author pages to `/blog/` (the blog listing is the most relevant destination since authors are associated with blog content).

### 6. Internal Links in Blog Content Point to WordPress URLs

**Full analysis completed.** See `tasks/internal-links-report.md`.

| Metric | Count |
|---|---|
| Unique version2.hr URLs in body content | 206 |
| Total internal link references | 261 |
| Blog post cross-links (HR) | 62 unique URLs, 71 references |
| Blog post cross-links (EN) | 57 unique URLs, 73 references |
| Blog post cross-links (DE) | 56 unique URLs, 71 references |
| Service page links | 12 (some to dropped services) |
| Page links | 9 (including 3 to non-existent `/konzultacija/`) |
| Category links | 3 |
| External third-party links | 40 unique, 120 references |
| ~~Malformed URLs~~ | 0 (false positive — see note below) |

**Key issues:**
- Trailing slash inconsistency (7 URLs appear both with and without)
- EN/DE links sometimes use HR slugs
- Links to `/konzultacija/` which doesn't exist
- Links to dropped service pages (drustvene-mreze, video-foto-produkcija, etc.)
- ~~2 malformed URLs~~ FALSE POSITIVE: `http://` and `https://` in zastita-wordpress-web-stranice are valid markdown inline code demonstrating the SSL protocol change, not broken URLs.

**Action:** Build-time link rewriting to match new URL structure. Create or redirect `/konzultacija/`.

### 7. Image File Naming

Asset filenames are inconsistent:
- Mixed case: `Modul-Intderijeri.png`, `ROTTEX-LOGO.png`, `DarkPrism.webp`
- WordPress artifacts: `apartmani-zadar-e1691193482526.webp`
- Generic names: `dsdsdsds-2.png`, `7.webp`, `666.webp`
- Typos: `zyx_bowloing_200x150.webp`, `riva-consutling-mockup`

**Action:** Normalize filenames during build or as a one-time cleanup. Use lowercase kebab-case.

### 8. Duplicate Assets Across Page Directories

**Discovered 2026-02-23. Cataloged 2026-02-23.**

| Issue | Count | Status |
|---|---|---|
| ~~Client logos duplicated in pages~~ | ~~66 copies across 6 dirs~~ | RESOLVED → deleted (canonical set in `content/assets/clients/`) |
| ~~Language flag icons (de_DE.png, en_GB.png, hr.png)~~ | ~~18 copies (6 dirs × 3 files)~~ | RESOLVED → consolidated to `content/assets/flags/` |
| ~~Empty `tr` files (extraction artifacts)~~ | ~~6 files~~ | RESOLVED → deleted |

The `content/assets/clients/` directory has 29 canonical files (client logos + a few Version2 assets). Pages should reference the shared location. Full catalog in `tasks/client-logo-catalog.md`.

**Edge cases identified:**
- `apartmani-zadar-1.webp` (6,216B) in reference/ differs from canonical `apartmani-zadar-e1691193482526.webp` (6,240B) — NOT a duplicate
- `Untitled-design.png` (13,847B) in reference/ differs from canonical `Untitled-design5.webp` (14,800B) — different format/file
- 9 canonical logos are never duplicated in any page dir — verify if still needed

**Action:** Remove 64 page-local logo copies. Reference shared `content/assets/clients/` directory.

### 9. Missing Translation: Holiday Home Baroque Art

`content/pages/360-virtualna-setnja/holiday-home-baroque-art/` only has `hr.md`. Missing `en.md` and `de.md`. (Issue #13 is a duplicate of this item and has been consolidated here.)

**Action:** Create EN/DE translations for the holiday-home-baroque-art sub-page, or drop the sub-page with a redirect to the parent post. The other sub-page (`sukosanska-vila`) has all 3 languages.

### 10. Pages Referencing Dropped Services

6 core pages contain references to dropped services (social media, PPC, video/photo). Full analysis in `tasks/page-audit.md`.

Pages needing complete rewrite: home, usluge, web-dizajn, o-nama, reference
Pages needing refresh: seo, dig-vizitka, 360-tours, analiza

### 11. ~~site-config.json Outdated~~ RESOLVED 2026-03-06

All changes applied. Summary of what was updated:

- `site.languages` reordered to `["en","hr","de"]`, `defaultLanguage` set to `"en"`
- `analytics.kokoAnalytics` removed, `seo.sitemapUrl` updated
- `navigation.header` trimmed to 3 items (Portfolio, Pricing, Contact) per brand-discovery.md §10
- `navigation.menu` added with full sidebar nav (Services with 5 children, Portfolio, Pricing, About, Blog, Career, Analysis, Contact)
- `navigation.footer.legal` completed (was missing Legal Notice, Terms & Conditions, Accessibility)
- German refund URL fixed: `/de/ruckgaberecht/` → `/de/widerrufsrecht/`
- `branding.colors` updated to full semantic token set (brandRed, darkBase, lightBase, foreground, muted, faint, line, etc.)
- `branding.typography` updated to Albert Sans + Manrope dual-font system with weight arrays

### 12. ~~products.json URLs Use Old Structure~~ RESOLVED 2026-03-06

Product URLs removed (products have no individual routes — displayed via card customizer on services page). File fully restructured:

- `category` changed from Croatian-only string to trilingual `{en, hr, de}` object
- All 21 product `color` fields changed from Croatian-only to trilingual objects
- `features` array changed to trilingual `{en, hr, de}` object with translated lists
- `shared.tags` updated from `["Gotovi Dizajni", "NFC"]` to `["NFC", "Digital Business Card"]`
- All 21 product image references verified — every `./assets/*.webp` path resolves to an actual file

### 13. ~~Sub-page Missing Translations~~ CONSOLIDATED INTO #9

Duplicate of #9. The holiday-home-baroque-art sub-page needs EN/DE translations created, or drop the sub-page with a redirect to the parent post. See Issue #9 for the canonical tracking of this item.

---

## Blog Content Analysis

**Full tiering analysis completed.** See `tasks/blog-tiering-report.md`.
**Blog curation completed.** See `tasks/blog-curation-manifest.md`.

| Tier | Description | Count | Action |
|---|---|---|---|
| Tier 1 | Core (web dev, SEO, hosting, business cards, 360) | 88 | **KEEP** |
| Tier 2 — Selected | Adjacent (branding, AI, fonts, e-commerce) | 15 | **KEEP** |
| Case Studies | Removed session 9 (outdated client work) | 13 | **DROP** → 301 to `/blog/` |
| Tier 2 — Dropped | Adjacent (email marketing, generic DM) | 12 | **DROP** → 301 to `/blog/` |
| Tier 3 | Off-topic (social media, PPC, video, photography) | 62 | **DROP** → 301 to `/blog/` |
| **Total kept** | | **103** | Migrate to `/blog/[slug]/` |
| **Total dropped** | | **87** | 301 redirect to blog listing |

### Category Distribution
| Category | Count |
|---|---|
| Digital Marketing | 77 |
| Web Design | 50 |
| Social Media | 43 |
| Reference | 15 |
| Social Networks | 3 |
| Video and Photo | 2 |

### Word Counts
- Total words (EN): 110,219
- Average per post: 580 words
- Shortest: 146 words (klima-centar-trazivuk — client reference)
- Longest: 1,858 words (trendovi-na-drustvenim-mrezama)

---

## Stats

| Metric | Count |
|---|---|
| Blog post directories | 190 |
| Blog featured images | 190 (all valid, verified 2026-02-23) |
| Blog translations | 190 × 3 = 570 (100% coverage) |
| Blog slug collisions | ~~6 HR=EN, 4 HR=DE, 8 EN=DE, 4 triple~~ IRRELEVANT — /blog/ prefix eliminates all collisions |
| Page content directories | 17 (+ 2 sub-pages) |
| Page translations | 17 × 3 = 51 (1 sub-page missing en/de) |
| Product designs | 21 (20 pre-made + 1 custom) |
| Total page asset files | ~202 (after removing 24 dupes/artifacts) |
| Total blog asset files | 190 (featured images only) |
| Total product asset files | 21 |
| Global asset files | 49 (29 clients, 7 og-images, 4 logos, 4 favicon, 2 partners, 3 flags) |
| ~~Remaining duplicate client logos~~ | ~~66~~ RESOLVED → deleted, canonical in `content/assets/clients/` |
| ~~Duplicate flag icons~~ | ~~18~~ RESOLVED → consolidated to `content/assets/flags/` |
| ~~Empty artifact files~~ | ~~6~~ RESOLVED → deleted |
| ~~Asset files needing rename~~ | ~~~68~~ RESOLVED → all renamed to kebab-case |

## What Needs Re-Downloading

1. ~~13 corrupted featured images~~ DONE
2. ~~All inline blog images~~ N/A (never extracted, no broken refs)
3. ~~WooCommerce product images~~ DONE (21 products, all images downloaded)
4. ~~Page asset validation~~ DONE (all valid, no corrupted files)

## Reports

| Report | Location | Contents |
|---|---|---|
| Page audit (service pivot) | `tasks/page-audit.md` | Every page classified by fate in new site |
| Internal links | `tasks/internal-links-report.md` | 206 unique URLs, 261 references mapped |
| Blog tiering | `tasks/blog-tiering-report.md` | 190 posts classified by relevance |
| Redirect map | `tasks/redirect-map.md` | ~730 redirect rules (updated for /blog/ restructure) |
| Blog curation manifest | `tasks/blog-curation-manifest.md` | 103 kept, 87 dropped, redirect targets |
| Filename normalization | `tasks/filename-normalization-manifest.md` | ~68 renames, ~27 duplicates to remove |
| Client logo catalog | `tasks/client-logo-catalog.md` | 64 duplicates mapped across 6 page dirs |
| Lessons learned | `tasks/lessons.md` | Patterns and rules from mistakes |
| Master todo | `tasks/todo.md` | Project-wide task tracker (7 phases, ~21 sprints) |
