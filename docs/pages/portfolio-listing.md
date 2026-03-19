# Portfolio Listing Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/portfolio/` (EN), `/hr/portfolio/` (HR), `/de/portfolio/` (DE)
**Purpose**: One fluid page. Project list with hover previews and large typography. Each row links to a full case study.
**Data sources**: Portfolio case study content files in `content/portfolio/` (6 real projects with i18n markdown)
**Structured data**: `CollectionPage` + `BreadcrumbList`

## Section 4.1: Portfolio Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | Container. Left-aligned. `min-height: 40vh`. `display: flex`, `align-items: flex-end`, `padding-bottom: 4rem`. |
| **Headline** | "Work we're proud of." AS300, H1 size, `text-foreground`. |
| **Subtext** | "Selected projects across web design, e-commerce, AI, and custom applications." MR400, Body Large, `text-muted`. `max-width: 560px`. `margin-top: 16px`. |

**Animation**: Headline `SplitText-chars`. Subtext fade up.

## Section 4.2: Project List

**Purpose**: Large typographic rows. Inspired by Locomotive's project listing approach.

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Section padding** | `py-0 md:py-0` (no additional padding; hero flows into list) |
| **Container** | Standard |
| **No heading** | Project names are the content. |

**Projects** (6 real entries from `content/portfolio/`):

| # | Name | Category | Tech Tags |
|---|------|----------|-----------|
| 1 | "Misha Gashi" | Wellness & Personal Development | Next.js, Stripe, CMS, Course Platform |
| 2 | "Village Homes Drage" | Real Estate & Tourism | Next.js, Maps, Comparison Tool, 4 Languages |
| 3 | "Adria Escape" | Travel & Tourism Media | Next.js, 5 Languages, Dark/Light, SEO |
| 4 | "Villa Nadja & Tamaris" | Hospitality & Vacation Rentals | Next.js, Booking, Maps, 2 Languages |
| 5 | "Fiore Paklenica" | Hospitality & Vacation Rentals | Vanilla JS, 6 Languages, Ultra-Fast |
| 6 | "SIMA Office" | Professional Services | Vanilla JS, Schema.org, One-Page |

**Project row structure**:

| Element | Specification |
|---------|---------------|
| **Wrapper** | `<a href="/portfolio/[slug]/">`. `display: flex`, `align-items: center`, `justify-content: space-between`. `py-6 md:py-8`. `border-bottom: 1px solid var(--color-line-subtle)`. First item also gets `border-top`. `position: relative`. |
| **Left: Project title** | AS300, H2 size, `text-foreground`. |
| **Right: Category** | MR400, Body (1rem), `text-muted`. Desktop: right-aligned. Mobile: below title, `margin-top: 4px`. |
| **Hover state (desktop)** | Title: `text-brand-red`, 200ms. Background: subtle `bg-raised/30` overlay. **Preview image**: appears to the right of the title, `position: absolute`, `right: 20%`, `top: 50%`, `transform: translateY(-50%)`. Size: `300px x 200px`, `rounded-lg`, `object-cover`. Entry: `opacity: 0, scale: 0.9` -> `opacity: 1, scale: 1`, 200ms `ease-out`. The image follows cursor Y position by 10% offset (parallax effect via JS `onMouseMove`). Placeholder: gradient rectangle. |
| **Hover state (tablet)** | Title color only. No preview image. |
| **Mobile** | `flex-direction: column`, `align-items: flex-start`. Title and category stacked. Full-width tap zone. |

**Animation**: Each row `ST-reveal` with `stagger(80ms)`.

## Section 4.3: Portfolio CTA

`<CTASection />`: heading "Have a project in mind?", subtext "Let's talk about what you need and whether we can build it.", ctaLabel "Start a Project", ctaHref "/contact/".

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Portfolio Listing | Placeholder JSON | None | -- |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Portfolio Listing | `CollectionPage`, `BreadcrumbList` |
