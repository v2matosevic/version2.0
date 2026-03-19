# About Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/about/` (EN), `/hr/o-nama/` (HR), `/de/uber-uns/` (DE)
**Purpose**: Studio showcase. Capabilities, process, stats, clients, location. NOT a personal founder bio.
**Data sources**: `content/pages/o-nama/en.md` | `content/site-config.json` | client logos
**Structured data**: `AboutPage` + `BreadcrumbList` + `Organization`

## Section 10.1: About Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | Container. Content on cols 1-8. `min-height: 50vh`. Flex `items-end pb-16`. |
| **Headline** | "We're Version2. We write code." AS300, H1 size, `text-foreground`. |
| **Animation** | `SplitText-chars` on headline. |

## Section 10.2: Studio Story

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Layout** | `display: grid`, `grid-template-columns: 1fr 0.8fr` (lg+), `gap: 4rem`. Mobile: single column, visual below text. |
| **Left (text)** | Prose from "Our Story" section of content. MR400, Body Large (1.25rem), line-height 1.6, `text-foreground`. Multiple paragraphs. `max-width: 600px`. |
| **Right (visual)** | `aspect-ratio: 3/4`. `rounded-xl`. `bg-raised`. `border: 1px solid var(--color-line-subtle)`. Placeholder gradient. To be replaced with studio/team photo or branded atmospheric image. |

## Section 10.3: Values

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Section padding** | Standard |
| **Heading** | "What We Believe". AS300, H2 size, `text-foreground`. `margin-bottom: 40px`. |
| **Layout** | `display: grid`, `grid-template-columns: 1fr 1fr` (md+), `gap: 2rem`. Mobile: single column. |

**Value items** (from content "What We Believe" section, 4 items):

| # | Title | Source |
|---|-------|--------|
| 1 | "Templates look like templates." | From content |
| 2 | "Your website is not a brochure." | From content |
| 3 | "Speed matters." | From content |
| 4 | "Complexity is the enemy." | From content |

**Value item structure**:

| Element | Specification |
|---------|---------------|
| **Accent line** | `width: 32px`, `height: 2px`, `bg-brand-red`. `margin-bottom: 16px`. |
| **Title** | AS700, H4 size, `text-foreground`. |
| **Description** | MR400, Body, `text-muted`. From content paragraph below each H3. `margin-top: 8px`. |

**Animation**: Items `ST-reveal` with `stagger(80ms)`.

## Section 10.4: Stats Strip

| Property | Specification |
|----------|---------------|
| **Background** | `bg-sunken`, full-bleed. No grain. |
| **Section padding** | `py-12 md:py-16 lg:py-20` |
| **Container** | Standard |
| **Layout** | `display: flex`, `justify-content: space-between`, `align-items: center`, `flex-wrap: wrap`, `gap: 2rem`. |

**Stats** (5):

| Number | Label |
|--------|-------|
| "100+" | "Projects" |
| "100+" | "Clients" |
| "5.0" | "Rating" |
| "40+" | "Reviews" |
| "2022" | "Founded" |

**Stat block**:

| Element | Specification |
|---------|---------------|
| **Number** | AS700, H2 size, `text-foreground`. |
| **Label** | MR400, Small, `text-muted`. `margin-top: 4px`. |
| **Animation** | Counter from 0 to value. 1.5s, `power2.out`. `ST-reveal` triggered. "100+" counts to 100 then appends "+". "5.0" counts from "0.0" to "5.0" (one decimal). "2022" displays instantly (no counting for years). |

**Responsive**: Desktop: 5 in a row. Tablet: wrap to 3+2. Mobile: 2+2+1.

## Section 10.5: Tech Stack

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Heading** | "What We Build With". AS300, H2 size. `margin-bottom: 32px`. |
| **Layout** | Grouped by category. Each group: category label (overline style) + row of badges. `gap: 2rem` between groups. |

**Categories and technologies**:

| Category | Technologies |
|----------|-------------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Three.js/R3F, GSAP |
| Backend | Node.js, PostgreSQL, REST APIs, WebSockets |
| AI | Claude API, GPT API, RAG, Embeddings |
| Infrastructure | Hostinger VPS, Nginx, PM2, Cloudflare, Git |

> Note: This table shows the tech stack Version2 uses for client projects. The Version2 website itself uses SQLite + Next.js API routes (see `docs/backend/`).

**Badge style**: Same as service detail tech badges.

## Section 10.6: Client Logo Grid

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Heading** | "Companies We've Worked With". AS300, H3 size. `margin-bottom: 32px`. |
| **Layout** | `display: grid`, `grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))`, `gap: 2rem`, `align-items: center`. |
| **Logos** | 12-15 logos from `content/assets/clients/`. Extended set (more than homepage). Same grayscale-to-color hover treatment. Max-height: 40px. |

## Section 10.7: Location

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Heading** | "Where We Are". AS300, H3 size. |
| **Content** | "Zadar, Croatia. A city on the Adriatic coast with fast internet and good coffee. European quality. Competitive pricing compared to Western Europe. Same timezone as Berlin, Paris, and Rome." MR400, Body Large, `text-muted`. `max-width: 560px`. |
| **Address** | "Novigradska 21, 23000 Zadar, Croatia". MR400, Body, `text-foreground`. `margin-top: 16px`. |

## Section 10.8: About CTA

`<CTASection />`: heading "Want to see if we're the right fit?", subtext "Let's start with a conversation. No pitch decks. No sales calls.", ctaLabel "Get in Touch", ctaHref "/contact/".

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| About | `content/pages/o-nama/*.md`, `content/site-config.json` | None | -- |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| About | `AboutPage`, `BreadcrumbList`, `Organization` |
