# Portfolio Case Study Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/portfolio/[slug]/` (EN), `/hr/portfolio/[slug]/` (HR), `/de/portfolio/[slug]/` (DE)
**Purpose**: Deep project dive. Challenge, approach, tech, screenshots, live embed, testimonial, metrics.
**Data sources**: Portfolio case study markdown files in `content/portfolio/[slug]/` (6 real projects with i18n content and screenshots)
**Structured data**: `CreativeWork` (with `name`, `description`, `image`, `author`, `dateCreated`) + `BreadcrumbList`

## Section 5.1: Case Study Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-sunken`, full-bleed. Grain overlay. |
| **Breadcrumbs** | `Home > Portfolio > [Project Name]`. Truncated if name > 40 chars. |
| **Layout** | Container. `min-height: 50vh`. Vertical center. |
| **Overline** | "[Client Industry]". Overline style. |
| **Headline** | "[Project Name]". AS300, Display size, `text-foreground`. |
| **Summary** | One-line project summary. MR400, Body Large, `text-muted`. `max-width: 600px`. `margin-top: 16px`. |
| **Hero image** | Full container width. `aspect-ratio: 16/9`. `rounded-xl`. `margin-top: 48px`. Placeholder gradient. To be replaced with hero screenshot in device mockup frame. |

**Animation**: Overline + headline + summary cascade with `stagger(100ms)`. Image fades in with slight scale (0.97 -> 1.0), 0.8s.

## Section 5.2: Project Overview

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | `display: grid`, `grid-template-columns: auto 1fr` (md+), `gap: 4rem`. Single column mobile. |

**Left column (meta, min-width 200px)**:

| Item | Specification |
|------|---------------|
| **Each meta pair** | Label: MR600, Small, uppercase, `tracking-overline`, `text-muted`. Value: MR400, Body, `text-foreground`. `gap: 6px` between label and value. `gap: 1.5rem` between pairs. |
| **Pairs** | Client, Industry, Year, Services (as `<Badge>` components), Tech Stack (as `<Badge>` components), Live URL (if available, as linked text). |
| **Badge style** | `bg-raised`, `border: 1px solid var(--color-line)`, `rounded-md`, `px-2 py-0.5`. MR600, Small. `text-foreground`. |

**Right column (description)**:

| Element | Specification |
|---------|---------------|
| **Prose** | MR400, Body Large (1.25rem), line-height 1.6, `text-foreground`. 2-3 paragraphs: the challenge, the approach, the outcome. `max-width: 640px`. |

**Animation**: Meta column items `ST-reveal` with `stagger(60ms)`. Prose fades up.

## Section 5.3: Screenshots Gallery

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Layout** | Alternating: full-width image, then 2-col side-by-side, then full-width. 3-5 images total. `gap: 1.5rem`. |
| **Image treatment** | Each: `rounded-xl`, `shadow-md`. Placeholder gradients. `aspect-ratio: 16/10` for full-width, `4/3` for half-width. |
| **Optional captions** | MR400, Small, `text-muted`. Below each image, centered. `margin-top: 8px`. |

**Animation**: Each image `ST-reveal` independently.

## Section 5.4: Embedded Live Site

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Heading** | "See it Live". AS300, H3 size, `text-foreground`. `margin-bottom: 24px`. |
| **Iframe wrapper** | `aspect-ratio: 16/10`. `border: 1px solid var(--color-line)`. `rounded-xl`. `overflow: hidden`. |
| **Iframe** | `width: 100%`, `height: 100%`. `loading="lazy"`. `sandbox="allow-scripts allow-same-origin"`. |
| **External link** | "Visit [domain.com]" -> `<Button variant="ghost" size="md">`. Lucide `ExternalLink` 16px. Opens in new tab (`target="_blank" rel="noopener"`). `margin-top: 16px`. |
| **Fallback** | If no live URL: large static screenshot with semi-transparent overlay and "Visit Live Site" button centered on top. |

## Section 5.5: Client Testimonial (Conditional)

**Rendered only if testimonial data exists for this project.**

| Property | Specification |
|----------|---------------|
| **Background** | `bg-sunken` with grain overlay |
| **Layout** | Container. Centered. `max-width: 640px`. `margin-inline: auto`. |
| **Quote** | AS300, H3 size, `font-style: italic`, `text-foreground`. Centered. |
| **Attribution** | MR600, Body, `text-foreground`. `margin-top: 24px`. Centered. |
| **Role** | MR400, Small, `text-muted`. Centered. |
| **Decorative** | Large `"` character above quote, centered. AS700, 6rem, `text-brand-red`, `opacity: 0.15`. |

## Section 5.6: Results & Metrics (Conditional)

**Rendered only if metrics data exists.**

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Layout** | `display: flex`, `justify-content: center`, `gap: 4rem md:gap-6rem`. 3-4 stat blocks. |

**Stat block**:

| Element | Specification |
|---------|---------------|
| **Number** | AS700, H2 size, `text-brand-red`. |
| **Label** | MR400, Small, `text-muted`. `margin-top: 4px`. |
| **Animation** | Counter animation: count from 0 to target value over 1.5s, `power2.out`. Triggered by `ST-reveal` when section enters viewport. Numbers with `+` suffix (e.g., "100+") count to 100 then append "+". Percentage numbers count with `%`. |

**Responsive**: 4 stats in a row (desktop). 2x2 (tablet). Stacked (mobile).

## Section 5.7: More Projects

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` |
| **Heading** | "More Projects". AS300, H3 size, `text-foreground`. `margin-bottom: 32px`. |
| **Layout** | 2-column grid (md+). 2 project cards (different from current case study). Same `<PortfolioCard />` component. |
| **CTA** | "View All Projects". Ghost button. `margin-top: 32px`. Links to `/portfolio/`. |

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Case Study (x5) | Placeholder JSON per slug | None | -- |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Case Study | `CreativeWork`, `BreadcrumbList` |
