# Image Sourcing Manifest

> Maps every page section to its required image and source status.
> Generated 2026-03-19. Based on page blueprints in `docs/pages/` and existing assets in `content/`.

## Legend

- **READY**: Image exists in `content/` (already exported, with responsive variants)
- **PORTFOLIO**: From portfolio screenshots in `content/portfolio/screenshots/` (already captured)
- **OWNER**: Must be provided by the business owner (photos, team shots, office)
- **CREATE**: Must be created (illustrations, graphics, SVGs, device mockups)
- **GENERATE**: Generated at build time (OG images via Satori, noise textures, CSS gradients)
- **STOCK**: Source from stock photography
- **DEFER**: Not needed for launch (placeholder/conditional content)
- **CODE**: Produced entirely by code (R3F scenes, CSS gradients, canvas animations)

---

## Existing Asset Inventory

Before the per-page breakdown, here is what already exists:

### Brand Assets (`content/assets/brand/`)
- `v2-icon-black.svg` -- V2 chevron icon, black
- `v2-icon-white.svg` -- V2 chevron icon, white

### Logos (`content/assets/logos/`)
- `white-logo-name` -- White logo with name (multiple sizes)
- `black-logo-name` -- Black logo with name (multiple sizes)
- `black-logo-text` -- Black logo text variant

### Favicon (`content/assets/favicon/`)
- `favicon.ico` + `logo-black`, `logo-black-name`, `logo-white` (responsive variants)

### Client Logos (`content/assets/clients/`) -- 27 clients
- `dubrovnik-republic-gin.webp`, `zadar-tehnika.webp`, `tamaris.webp`, `riva-consulting-logo.webp`, `lcl-optika-ds.webp`, `cardo.webp` (homepage 6)
- Plus 21 more: adria-escape, apartmani-zadar, aqua-art, brkljaca-logo, crni-logo, eskimo-logo, grana-logo, home-interijeri, kamp-kargita-logo, kodfrane-logo, modul-interijeri, monster-kebab, ndm-logo, nk-abeceda, optika-visus-1, rottex-logo, tmshop, trazivuk, trstika-1, version2-media, vrata-lopar-1, zyx-bowling (all with 600w/1200w/1920w variants)

### Flags (`content/assets/flags/`)
- `en.png`, `hr.png`, `de.png` (with responsive variants)

### Partner Logos (`content/assets/partners/`)
- `cloudflare-logo.webp`, `hostinger-logo.webp` (with responsive variants)

### OG Images (`content/assets/og-images/`)
- `default-og.webp` -- Fallback OG image
- `dig-vizitka.webp`, `kontakt.webp`, `o-nama.webp`, `seo-optimizacija.webp`, `usluge.webp`, `web-dizajn.webp` (page-specific, from old site)

### Service Hero Images (`content/images/services/`)
- `web-design-hero.png`, `web-apps-hero.png`, `ecommerce-hero.png`, `ai-hero.png`, `seo-hero.png`, `digital-cards-hero.png` (with responsive variants)

### Portfolio Placeholder Images (`content/images/portfolio/`)
- `case-study-1.png` through `case-study-4.png` (with responsive variants)

### Blog Generic Images (`content/images/blog/`)
- `blog-featured-1.png`, `blog-featured-2.png`, `blog-featured-3.png` (with responsive variants)

### Blog Featured Images (`content/blog/*/assets/`)
- 190 blog posts each have a `featured.jpeg` or `featured.webp` in their `assets/` directory (with 600w/1200w/1920w responsive variants). All 190 posts have featured images.

### Product Card Images (`content/products/assets/`)
- 20 digital business card designs (amber-swirl, color-stream, crystal-net, custom-design, dark-prism, emerald-f, geo-chroma, geo-purple, golden-bliss, gold-marble, marble-flow, orange-craft, purple-mosaic, scarlet-red, silk-wave, sun-arc, sun-satin, swirl-harmony, swirl-sync, twilight-fade, velocity-s -- with responsive variants)

### Portfolio Screenshots (`content/portfolio/screenshots/`)
- **adria-escape**: 7 screenshots (about, article, blog, contact, destinations, homepage-dark, homepage-light)
- **fiore-paklenica**: 2 screenshots (attractions, homepage)
- **misha-gashi**: 6 screenshots (about, blog, education, homepage, services, webshop)
- **sima-office**: 1 screenshot (homepage)
- **village-homes-drage**: 8 screenshots (about, camp-detail, camps, compare, homepage, model-detail, models, news)
- **villa-nadja-tamaris**: 6 screenshots (attractions, contact, gallery, homepage, villa-nadja, villa-tamaris)

---

## Global Components (`_globals.md`)

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| G1. Header -- V2 Logo SVG | V2 logo, SVG, 28-32px height | READY | Done | `content/assets/brand/v2-icon-white.svg` + `content/assets/logos/white-logo-name` |
| G2. Desktop Menu -- V2 watermark | V2 icon SVG at `opacity: 0.03` | READY | Done | `content/assets/brand/v2-icon-white.svg` |
| G4. FAB -- Icons | Lucide icons only (Mail, MessageCircle, Bot) | CODE | Done | No images needed, Lucide icon components |
| G5. Cookie Consent | No images | -- | -- | Text + toggles only |
| G7. Footer -- Social icons | Lucide icons (Facebook, Instagram, X, TikTok) | CODE | Done | Icon components, no image files |
| G7. Footer -- Language flags | EN/HR/DE flags | READY | Done | `content/assets/flags/` |
| G8. Custom Cursor | No images | CODE | Done | CSS/JS drawn |

---

## Homepage

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 1.1 Preloader -- V2 chevron | V2 chevron icon for particle target | READY | Done | `content/assets/brand/v2-icon-white.svg` vertex data |
| 1.2a 3D Hero -- Background | R3F 3D scene (wireframe polyhedra, particles) | CODE | Done | Entirely code-generated in Three.js/R3F |
| 1.2a 3D Hero -- CSS fallback | Radial gradient fallback | CODE | Done | CSS `radial-gradient()` |
| 1.2b Hero Content | No images (text + buttons) | -- | -- | Pure typography |
| 1.3 Services Teaser | No images | -- | -- | Typography-driven, no visuals |
| 1.4 Portfolio Highlights -- Card images (x4) | Project screenshots in 16:10 aspect | PORTFOLIO | Partial | 6 projects have screenshots in `content/portfolio/screenshots/`. Spec calls for 4 cards: Kargita, DRG, Zadar Tehnika, LCL Optika. Only `village-homes-drage` and similar exist. **Need screenshots for Kargita, DRG, Zadar Tehnika, LCL Optika** or use placeholder gradients |
| 1.4 Portfolio Highlights -- Hover preview | Same as card images | PORTFOLIO | Partial | Same dependency as above |
| 1.5 Client Logos (x6) | 6 client logos, grayscale | READY | Done | `content/assets/clients/` -- dubrovnik-republic-gin, zadar-tehnika, tamaris, riva-consulting-logo, lcl-optika-ds, cardo |
| 1.6 Differentiators | No images | -- | -- | Number + text layout only |
| 1.7 Testimonials | No images | -- | -- | Quote text + attribution only |
| 1.8 CTA Section | No images | -- | -- | Text + button only |

---

## Services Overview

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 2.1 Services Hero | No images | -- | -- | Text only, radial gradient background is CSS |
| 2.2 Band 1: Custom Websites -- Visual | Browser mockup or abstract visual, 4:3 aspect | CREATE | Pending | Spec says "browser mockup frame or abstract visual showing a website." Could reuse `content/images/services/web-design-hero.png` as starting point, but needs device frame treatment |
| 2.2 Band 2: Web Applications -- Visual | Dashboard wireframe/grid pattern, 4:3 aspect | CREATE | Pending | "Abstract dashboard wireframe or grid pattern." Could reuse `web-apps-hero.png` |
| 2.2 Band 3: Online Stores -- Visual | E-commerce visual, 4:3 aspect | CREATE | Pending | No specific image described. Could reuse `ecommerce-hero.png` |
| 2.2 Band 4: AI Integration -- Visual | AI-themed visual, 4:3 aspect | CREATE | Pending | Could reuse `ai-hero.png` |
| 2.2 Band 5: SEO -- Visual | SEO-themed visual, 4:3 aspect | CREATE | Pending | Could reuse `seo-hero.png` |
| 2.3 Supporting Services -- Icons | Lucide icons (CreditCard, View, Plug, Wrench) | CODE | Done | Icon components |
| 2.3 Digital Cards -- Product strip | 5 card images, 60x36px thumbnails | READY | Done | `content/products/assets/` -- 20 card designs available |

---

## Service Detail (x5 pages)

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 3.1 Service Hero | No images | -- | -- | Text + CTA only |
| 3.2 What We Build | No images | -- | -- | Text grid only |
| 3.3 How We Work | No images | -- | -- | Numbered steps, no visuals |
| 3.4 Technologies | No images | -- | -- | Text badges only |
| 3.5 Related Portfolio (x2 cards) | Project screenshots, 16:10 aspect | PORTFOLIO | Partial | Conditional -- omitted if no projects exist. Same dependency as homepage portfolio cards |
| 3.6 FAQ Accordion | No images | -- | -- | Text only |
| 3.7 Service CTA | No images | -- | -- | Text + buttons |

---

## Portfolio Listing

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 4.1 Portfolio Hero | No images | -- | -- | Text only |
| 4.2 Project List -- Hover preview (x5) | Project screenshots, 300x200px preview | PORTFOLIO | Partial | Spec says "placeholder gradient" for now. Real screenshots needed per project. 6 projects already have screenshots |
| 4.3 Portfolio CTA | No images | -- | -- | Text + button |

---

## Portfolio Case Study (x5 pages)

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 5.1 Case Study Hero -- Hero image | Full-width 16:9 screenshot in device mockup | PORTFOLIO + CREATE | Partial | Raw screenshots exist for 6 projects. **Need device mockup frames wrapping them**. Projects without screenshots need new captures |
| 5.2 Project Overview | No images | -- | -- | Text + meta only |
| 5.3 Screenshots Gallery (3-5 per project) | Full-width and half-width screenshots | PORTFOLIO | Partial | Existing screenshots per project: adria-escape (7), fiore-paklenica (2), misha-gashi (6), sima-office (1), village-homes-drage (8), villa-nadja-tamaris (6). **Need to map these to the 5 case study slugs from spec** (Kargita, DRG, Zadar Tehnika, LCL Optika, Riva Consulting) |
| 5.4 Embedded Live Site -- Fallback | Large static screenshot | PORTFOLIO | Partial | Can reuse homepage screenshots from portfolio set |
| 5.5 Client Testimonial | No images | -- | -- | Text only, conditional |
| 5.6 Results & Metrics | No images | -- | -- | Animated numbers only |
| 5.7 More Projects (x2 cards) | Project card screenshots | PORTFOLIO | Partial | Same pool as homepage portfolio cards |

---

## Blog Listing

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 6.1 Blog Hero + Search | No images | -- | -- | Text + search input |
| 6.2 Category Filter | No images | -- | -- | Text pills only |
| 6.3 Post Grid -- Card featured images (x103) | Featured image per blog post, 16:9 | READY | Done | All 190 posts have `featured.jpeg`/`featured.webp` in `content/blog/[slug]/assets/`. 103 curated posts all covered |
| 6.4 Load More | No images | -- | -- | Button only |

---

## Blog Post (x103 pages)

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 7.1 Post Hero -- Featured image | Full-width 16:9 featured image | READY | Done | `content/blog/[slug]/assets/featured.*` |
| 7.2 Table of Contents | No images | -- | -- | Text links |
| 7.3 Post Content -- Inline images | Images referenced within markdown body | READY | Done | Blog posts from WordPress do not contain inline images (only featured images). Markdown bodies reference no local image files |
| 7.4 Tags | No images | -- | -- | Text badges |
| 7.5 Share Buttons | Lucide icons (LinkedIn, X, Facebook, Link/Check) | CODE | Done | Icon components |
| 7.6 Related Posts (x3 cards) | Same featured images as blog listing cards | READY | Done | Reuses blog card component |
| 7.7 Post CTA | No images | -- | -- | Text + buttons |

---

## Pricing

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 8.1 Pricing Hero | No images | -- | -- | Text only |
| 8.1b Base Includes Strip | Lucide Check icons | CODE | Done | Icon components |
| 8.2 Step Indicator | No images | CODE | Done | CSS dots and lines |
| 8.3 Wizard Steps -- Option card icons | Lucide icons per option (from config) | CODE | Done | Icon components |
| 8.4 Summary -- Price display | No images | -- | -- | Numbers + text |
| 8.4 Summary -- Customizer toggles | No images | CODE | Done | CSS toggle switches |

---

## Contact

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 9.1 Contact Hero | No images | -- | -- | Text only |
| 9.2 Choose Your Path -- Icons | Lucide icons (Mail, Calendar) | CODE | Done | Icon components |
| 9.3 Contact Form -- Sidebar icons | Lucide icons (Mail, Phone, MessageCircle, MapPin, Clock) | CODE | Done | Icon components |
| 9.4 Booking System | No images | CODE | Done | Calendar grid + time slot buttons, all CSS |
| 9.5 Map -- Static map image | Dark-themed map of Zadar office location | CREATE | Pending | Options: (1) Google Static Maps API with dark style params, (2) pre-generated dark map screenshot. **Need to generate a dark-themed static map image** |

---

## About

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 10.1 About Hero | No images | -- | -- | Text only |
| 10.2 Studio Story -- Visual | Studio/team photo or branded atmospheric image, 3:4 aspect | OWNER | Pending | Spec: "To be replaced with studio/team photo or branded atmospheric image." **Owner must provide a real team or office photo** |
| 10.3 Values | No images | -- | -- | Accent lines + text only |
| 10.4 Stats Strip | No images | -- | -- | Animated numbers |
| 10.5 Tech Stack | No images | -- | -- | Text badges |
| 10.6 Client Logo Grid (12-15 logos) | Extended client logo set | READY | Done | `content/assets/clients/` has 27 logos. Need to curate 12-15 for this section |
| 10.7 Location | No images | -- | -- | Text + address only |
| 10.8 About CTA | No images | -- | -- | Text + button |

---

## Career

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 11.1 Career Hero | No images | -- | -- | Text only |
| 11.2 What It's Like | No images | -- | -- | Prose text |
| 11.3 Junior Developer Position | No images | -- | -- | Text lists in 3-column grid |
| 11.4 Application Form | No images | -- | -- | Form fields |
| 11.5 Open Door | No images | -- | -- | Text + mailto link |

---

## Analysis

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| 12.1 Analysis Hero | No images | -- | -- | Text only |
| 12.2 What We Analyze | No images | -- | -- | Numbered items, same layout as differentiators |
| 12.3 What You Get | No images | -- | -- | Prose + callout |
| 12.4 Analysis Form | No images | -- | -- | Form fields |

---

## Legal Pages (x6)

| Section | Image Needed | Source | Status | Notes |
|---------|-------------|--------|--------|-------|
| All legal pages | No images | -- | -- | Pure text content, no visuals by design |

---

## OG / Social Share Images

| Page | Image Needed | Source | Status | Notes |
|------|-------------|--------|--------|-------|
| Default OG image | 1200x630 branded card | READY | Needs review | `content/assets/og-images/default-og.webp` exists from old site. **May need redesign for new brand** |
| Homepage OG | Unique OG image | GENERATE | Pending | Satori at build time, or static branded image |
| Services Overview OG | Page-specific OG | READY | Needs review | `content/assets/og-images/usluge.webp` exists from old site |
| Service Detail -- Web Design OG | Page-specific OG | READY | Needs review | `content/assets/og-images/web-dizajn.webp` exists |
| Service Detail -- SEO OG | Page-specific OG | READY | Needs review | `content/assets/og-images/seo-optimizacija.webp` exists |
| Service Detail -- Other services OG | Page-specific OG | GENERATE | Pending | No existing OG images for web-apps, e-commerce, ai-integration |
| Portfolio Listing OG | Page-specific OG | GENERATE | Pending | |
| Portfolio Case Study OG (x5) | Per-project OG with screenshot | GENERATE | Pending | Satori with project screenshot composite |
| Blog Listing OG | Page-specific OG | GENERATE | Pending | |
| Blog Post OG (x103) | Per-post OG with title + featured image | GENERATE | Pending | Satori template: title text + featured image thumbnail + V2 branding |
| Pricing OG | Page-specific OG | GENERATE | Pending | |
| Contact OG | Page-specific OG | READY | Needs review | `content/assets/og-images/kontakt.webp` exists |
| About OG | Page-specific OG | READY | Needs review | `content/assets/og-images/o-nama.webp` exists |
| Career OG | Page-specific OG | GENERATE | Pending | |
| Analysis OG | Page-specific OG | GENERATE | Pending | |
| Legal Pages OG (x6) | Default OG or per-page | GENERATE | Pending | Can reuse default OG |

---

## Summary: Action Items by Source Type

### READY (No action needed -- assets exist)
- V2 logo and icons (SVG)
- Client logos (27 logos, 6 curated for homepage, 12-15 for about page)
- Language flags (EN/HR/DE)
- Partner logos (Cloudflare, Hostinger)
- Favicon set
- Blog featured images (all 190 posts covered)
- Digital business card product images (20 designs)
- Service hero images (6 images, from old site -- may repurpose)

### PORTFOLIO (Screenshots exist, need processing)
- 6 project screenshot sets exist (30 total screenshots)
- **Gap**: The spec names 5 case study projects (Kargita, DRG, Zadar Tehnika, LCL Optika, Riva Consulting) but the captured screenshots are for different projects (adria-escape, fiore-paklenica, misha-gashi, sima-office, village-homes-drage, villa-nadja-tamaris)
- **Decision needed**: Either update the spec to use the 6 projects that have screenshots, or capture new screenshots for the 5 specified projects

### CREATE (Must be produced)
1. **Service overview visuals (x5)** -- Browser/device mockups or abstract visuals for each service band (web design, web apps, e-commerce, AI, SEO). Can potentially wrap existing `content/images/services/` hero images in device frames
2. **Case study hero mockups** -- Device frame composites wrapping project screenshots (once project list is finalized)
3. **Contact page map** -- Dark-themed static map image of Zadar office location
4. **Noise/grain texture** -- SVG or PNG noise overlay for section atmospheres (tiny, tiled)

### GENERATE (Build-time via Satori)
1. **OG image template** -- Satori template producing 1200x630 images
2. **Per-blog-post OG** -- 103 images (title + featured image + V2 branding)
3. **Per-page OG** -- ~15 unique page OG images
4. **Per-case-study OG** -- 5 images with project screenshots

### OWNER (Business owner must provide)
1. **Studio/team photo** -- For About page section 10.2 (3:4 aspect ratio, dark/moody aesthetic preferred)
2. **Client testimonial photos** (optional) -- If testimonials include client headshots

### STOCK (None required)
- The design system avoids stock photography. All visuals are either code-generated (3D, CSS), real project screenshots, or branded graphics.

### DEFER (Not blocking launch)
- Client testimonial content (placeholder for now)
- Portfolio case study real content (placeholder JSON)
- Results/metrics data per case study

---

## Priority Order for Image Production

1. **Noise/grain texture SVG** -- Blocks nearly every section's atmosphere
2. **OG image Satori template** -- Blocks all social sharing
3. **Service overview visuals (x5)** -- Blocks services page launch
4. **Dark map image** -- Blocks contact page
5. **Studio/team photo** -- Blocks about page (request from owner early)
6. **Portfolio project alignment** -- Decide which 5 projects become case studies, then process screenshots into device mockups
7. **Blog post OG generation** -- Can run automatically once Satori template exists
