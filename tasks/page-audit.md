# Page Content Audit — Service Pivot Analysis

Generated 2026-02-23. Every page evaluated against the resolved service pivot decision.

**Pivot summary:** Drop social media, PPC, video, photography as standalone services. Keep web dev, web apps, digital business cards, 360 tours, SEO, maintenance. Replace fixed packages with interactive pricing tool.

---

## Classification

### KEEP & REBUILD (Core Pages)

| Page | Slug | Verdict | Issues |
|---|---|---|---|
| Homepage | `home` | REWRITE | Lists dropped services (Social Media, Video, PPC). Says "vodimo društvene mreže". Must reflect web dev studio identity. |
| Services | `usluge` | REWRITE | Title is "Usluge Digitalnog Marketinga". Lists Social Media, Video, PPC as equal services. Complete rewrite needed. |
| Web Design | `web-dizajn` | REWRITE | Mentions WooCommerce, old package tiers. Must position as custom code, no templates. 4 sub-pages (packages) are obsolete. |
| SEO | `seo-optimizacija-trazilice` | REFRESH | Content is solid. Just needs tone alignment with new brand voice. |
| Digital Business Cards | `dig-vizitka` | REFRESH | Core product. Content mostly fine. Needs design refresh. 28 assets. |
| 360 Virtual Tours | `360-virtualna-setnja` | REFRESH | Core service. Content fine. Has 2 project sub-pages. |
| About | `o-nama` | REWRITE | Lists "Vođenje Društvenih Mreža" and "Video i Foto Produkcija" as services. Client list mentions agency-era work. |
| References | `reference` | REWRITE | Project descriptions include "društvene mreže", "plaćeno oglašavanje", "video i foto produkcija". Must reframe around web dev work. |
| Contact | `kontakt` | MINOR UPDATE | Content is service-neutral. Just needs design treatment. |
| Analysis | `analiza` | KEEP | Free website analysis — great lead gen for web dev studio. Content fits perfectly. |
| Catalog | `katalog` | EVALUATE | "Gotovi Dizajni" (ready-made templates) might conflict with "no templates" positioning. Could repurpose as project showcase or product catalog for business cards. |

### LEGAL PAGES (Keep, Minor Updates)

| Page | Slug | Verdict |
|---|---|---|
| Privacy Policy | `politika-privatnosti` | Keep. Update for new site tech stack (cookies may change). |
| Cookies | `kolacici` | Keep. Update cookie list for new analytics setup. |
| Refund Policy | `politika-povrata` | Keep. Applies to digital business card products. |

### DROPPED SERVICE PAGES (Need SEO Strategy)

| Page | Slug | Assets | Action |
|---|---|---|---|
| Social Media | `drustvene-mreze` | 12 files | Archive or 301 → `/services/` |
| Paid Advertising | `placeno-oglasavanje` | 1 file | 301 → `/services/` |
| Video & Photo | `video-foto-produkcija` | 5 files | Archive or 301 → `/services/` |
| Real Estate Photography | `fotografiranje-nekretnina` | 7 files | 301 → `/services/` or `/360-virtual-tours/` |
| Real Estate Filming | `snimanje-nekretnina` | 9 files | 301 → `/services/` or `/360-virtual-tours/` |

### OBSOLETE PACKAGE PAGES (All redirect to pricing tool)

| Page | Slug | Action |
|---|---|---|
| Smart Web Plan | `smart-web-plan` | 301 → `/pricing/` |
| Simple Package | `web-dizajn/simple-paket` | 301 → `/pricing/` or `/web-design/` |
| Professional Package | `web-dizajn/profesionalni-paket` | 301 → `/pricing/` or `/web-design/` |
| E-Commerce Package | `web-dizajn/e-commerce-paket` | 301 → `/pricing/` or `/web-design/` |
| Premium Package | `web-dizajn/premium-paket` | 301 → `/pricing/` or `/web-design/` |

### GALLERY (Decision Needed)

| Page | Slug | Assets | Issue |
|---|---|---|---|
| Gallery | `galerija` | 46 files | All photography work (dropped service). "Version2 Media" branding is old identity. Options: drop, repurpose as project screenshots, or redirect to references. |

### TOUR SUB-PAGES

| Page | Path | Translation | Issue |
|---|---|---|---|
| Sukošanska Vila | `360-virtualna-setnja/sukosanska-vila` | hr/en/de | OK — portfolio piece |
| Holiday Home Baroque Art | `360-virtualna-setnja/holiday-home-baroque-art` | hr ONLY | **Missing en.md and de.md** |

---

## ~~site-config.json Issues~~ ALL RESOLVED 2026-03-06

All 4 issues fixed in the site-config.json rewrite:
1. ~~`defaultLanguage: "hr"`~~ → Changed to `"en"`
2. ~~Navigation lists dropped services~~ → Header trimmed to 3 items, menu restructured with current services
3. ~~Footer links include dropped services~~ → Footer updated with current services, full company/legal links
4. ~~Navigation still uses old URL structure~~ → All URLs flipped to EN at root, HR at `/hr/`, DE at `/de/`

---

## Duplicate Assets

Client logos appear in 4+ page directories (home, o-nama, reference, usluge):
- `zyx_bowloing_200x150.webp` (also misspelled — "bowloing")
- `monster-kebab.png`
- `optika-visus-1.png`
- `aqua-art.png`
- `Modul-Intderijeri.png` (mixed case)
- `DUBROVNIK_200X150.webp` (CAPS)
- `apartmani-zadar-e1691193482526.webp` (WordPress artifact)
- `vrata-lopar-1.png`
- `trstika-1.png`
- `trazivuk.png`
- `nk-abeceda.webp`
- `homeinterijeri_200X150.webp`

**Action:** Consolidate into `content/assets/clients/`. Reference from a single location.

Language flag icons (`de_DE.png`, `en_GB.png`, `hr.png`) duplicated in: dig-vizitka, galerija, home, o-nama, reference, usluge.
**Action:** Move to `content/assets/` or handle with code (SVG flags or emoji).

---

## Filename Issues

| Problem | Examples |
|---|---|
| Generic names | `666.webp`, `7.webp`, `dsdsdsds-2.png`, `5-1.webp`, `6-1.webp`, `2-1.webp` |
| WordPress artifacts | `apartmani-zadar-e1691193482526.webp`, `Does-SEO-Really-Help-Your-Website-To-Rank-Higher-On-Google-e1693467011186.webp` |
| Mixed case | `Modul-Intderijeri.png`, `DUBROVNIK_200X150.webp`, `ROTTEX-LOGO.png`, `DarkPrism.webp` |
| Typos | `zyx_bowloing_200x150.webp` (should be "bowling"), `riva-consutling-mockup` (should be "consulting") |
| Inconsistent separators | Mix of `-`, `_`, camelCase, PascalCase |

**Action:** Normalize all to lowercase kebab-case during build or one-time cleanup.

---

## Content That References Dropped Services

These pages/files explicitly mention dropped services and need content updates:

1. **Homepage (home/)** — "vodimo društvene mreže i dovodimo prave klijente", sections for Social Media, Video, PPC
2. **Services (usluge/)** — Title "Usluge Digitalnog Marketinga", full sections for Social Media, Video, PPC
3. **About (o-nama/)** — "Vođenje Društvenih Mreža", "Video i Foto Produkcija" listed as services
4. **References (reference/)** — Per-client descriptions list "društvene mreže", "plaćeno oglašavanje", "video i foto produkcija"
5. **Web Design (web-dizajn/)** — "WooCommerce platformu", old package structure
6. **site-config.json** — Navigation and footer still include all dropped service pages

---

## Missing Pages (New Site Needs)

Per `docs/sitemap.md` and `docs/services.md`, the new site needs pages that don't exist yet:

| Page | Purpose | Priority |
|---|---|---|
| `/pricing/` | Interactive pricing tool | High |
| `/blog/` | Blog listing/archive page | High |
| Web Applications service | New core service page | High |
| E-Commerce service | New core service page | High |
| AI Integration service | New core service page | Medium |
| Maintenance service | New service page | Medium |
| Integrations service | New service page | Low |

---

## Summary Counts

| Category | Count |
|---|---|
| Pages to REWRITE | 6 (home, usluge, web-dizajn, o-nama, reference, katalog) |
| Pages to REFRESH | 4 (seo, dig-vizitka, 360-tours, analiza) |
| Pages with MINOR updates | 4 (kontakt, privacy, cookies, refund) |
| DROPPED service pages | 5 |
| OBSOLETE package pages | 5 |
| GALLERY (decision needed) | 1 |
| Missing translation | 1 (holiday-home-baroque-art: no en/de) |
| Duplicate asset sets | 12+ client logos across 4 dirs |
| Generic/bad filenames | 10+ |
| New pages needed | 8 |
| Total existing page dirs | 21 (+ 6 sub-pages) |
