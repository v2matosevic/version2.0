# Page Blueprint Conventions

**Document version**: 1.0
**Date**: 2026-03-02
**Scope**: 13 page types, every section specified to build-ready detail
**Companion docs**: `docs/design/` (tokens), `docs/components/` (ARIA/behavior), `docs/interactive-pricing-tool.md` (pricing wizard), `docs/features/` (backend contracts)

---

## Notation Used Throughout

- **Grid**: `cols 1-7` means CSS Grid columns 1 through 7 of a 12-column grid (`grid-template-columns: repeat(12, 1fr)`, gap `1.5rem`)
- **Type scale references**: `Display` = `clamp(3rem, 5vw + 1rem, 5.5rem)` ~48px mobile / ~88px desktop. `H1` = `clamp(2.5rem, 4vw + 0.5rem, 4rem)` ~40px / ~64px. `H2` = `clamp(2rem, 3vw + 0.5rem, 3rem)` ~32px / ~48px. `H3` = `clamp(1.5rem, 1.5vw + 0.5rem, 2rem)` ~24px / ~32px. `H4` = `clamp(1.25rem, 0.5vw + 1rem, 1.5rem)` ~20px / ~24px. `Body Large` = `1.25rem` (20px). `Body` = `1rem` (16px). `Body Prose` = `1.125rem` (18px, blog only, md+). `Small` = `0.875rem` (14px). `Overline` = `0.75rem` (12px) uppercase.
- **Font shorthand**: `AS300` = Albert Sans weight 300. `AS700` = Albert Sans weight 700. `MR400` = Manrope weight 400. `MR600` = Manrope weight 600.
- **Color tokens**: `bg-base` = `#141414`. `bg-raised` = `#1c1c1c`. `bg-sunken` = `#0c0c0c`. `fg` = `text-foreground` = `#F0E8E0`. `muted` = `text-muted` = `#9A918A`. `faint` = `text-faint` = `#6A625C`. `line` = `border-line` = `#2a2a2a`. `line-subtle` = `#1f1f1f`. `red` = `brand-red` = `#991717`. `red-hover` = `#cc2323`. `red-pressed` = `#7a1212`.
- **Animation shorthand**: `ST-reveal` = standard GSAP ScrollTrigger reveal (opacity 0->1, y 40->0, duration 0.8s, ease `power2.out`, trigger `start: "top 85%"`, `once: true`). `SplitText-chars` = GSAP SplitText per-character stagger at 30ms. `stagger(Nms)` = delay between sibling elements.
- **Section padding default**: All sections use `py-16 md:py-24 lg:py-32` unless explicitly noted otherwise.
- **Container default**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (max 1280px, centered) unless noted as "full-bleed."
- **Grain overlay default**: All sections receive `.section-atmosphere::after` noise texture (opacity 0.04 dark, 0.025 light, `mix-blend-mode: overlay`, `pointer-events: none`) unless explicitly excluded.
- **i18n**: All user-facing strings live in `ui-strings.ts` with `en`, `hr`, `de` variants. Content pages have `en.md`, `hr.md`, `de.md` in their directory.

---

## Data Dependency Summary

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Homepage | `content/pages/home/*.md`, `content/site-config.json` | None | -- |
| Services Overview | `content/pages/usluge/*.md`, `content/products/products.json` | None | -- |
| Service Detail (x5) | `content/pages/[service-dir]/*.md` | None | FAQ JSON-LD |
| Portfolio Listing | Placeholder JSON | None | -- |
| Case Study (x5) | Placeholder JSON per slug | None | -- |
| Blog Listing | All 103 `content/blog/*/[lang].md` (meta only) | None | Search index JSON (~50-80KB), category counts |
| Blog Post (x103) | `content/blog/[slug]/[lang].md` (full) | None | TOC, reading time, related posts |
| Pricing | `content/pricing-config.json` | POST `/api/pricing` (submit quote) | -- |
| Contact | `content/pages/kontakt/*.md`, `content/site-config.json` | POST `/api/contact`, GET `/api/availability` | -- |
| About | `content/pages/o-nama/*.md`, `content/site-config.json` | None | -- |
| Career | `content/pages/karijera/*.md` | POST `/api/career` | -- |
| Analysis | `content/pages/analiza/*.md` | POST `/api/contact` (type: "analysis") | -- |
| Legal (x6) | `content/pages/[legal-dir]/*.md`, `content/site-config.json` | None | -- |

**Total pages generated**: 387 (129 per language x 3 languages). English pages have no URL prefix (root), Croatian pages use `/hr/`, German pages use `/de/`. See `docs/sitemap.md` for breakdown.

## Structured Data Summary

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Homepage | `WebSite`, `Organization` (with `address`, `contactPoint`, `sameAs`) |
| Services Overview | `WebPage`, `BreadcrumbList` |
| Service Detail | `Service`, `BreadcrumbList`, `FAQPage` |
| Portfolio Listing | `CollectionPage`, `BreadcrumbList` |
| Case Study | `CreativeWork`, `BreadcrumbList` |
| Blog Listing | `CollectionPage`, `BreadcrumbList` |
| Blog Post | `BlogPosting`, `BreadcrumbList` |
| Pricing | `WebPage`, `BreadcrumbList` |
| Contact | `ContactPage`, `BreadcrumbList`, `LocalBusiness` |
| About | `AboutPage`, `BreadcrumbList`, `Organization` |
| Career | `WebPage`, `BreadcrumbList`, `JobPosting` |
| Analysis | `WebPage`, `BreadcrumbList` |
| Legal Pages | `WebPage`, `BreadcrumbList` |
| All Pages (root layout) | `LocalBusiness` (persistent, includes opening hours, geo, phone, logo) |

## Related Files

- [_globals.md](_globals.md) -- Global persistent components
- Individual page files in this directory
- [../design/](../design/) -- Design tokens referenced throughout
- [../components/](../components/) -- Component specs and ARIA patterns
