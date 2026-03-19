# Blog Post Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/blog/[slug]/` (EN), `/hr/blog/[slug]/` (HR), `/de/blog/[slug]/` (DE)
**Purpose**: Editorial reading experience. The typography IS the product demonstration. Best reading experience on the internet.
**Data sources**: `content/blog/[slug]/en.md` via `loadBlogPost(slug, lang)`. Returns full `BlogPost` object.
**Structured data**: `BlogPosting` (with `headline`, `author`, `datePublished`, `dateModified`, `image`, `articleSection`, `wordCount`) + `BreadcrumbList`

## Section 7.1: Post Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Container** | Narrower: `max-w-4xl mx-auto` (896px, narrower than 7xl for reading comfort) |
| **Breadcrumbs** | `Home > Blog > [Post Title]` (title truncated at 50 chars with `...`). Standard breadcrumb styling. |
| **Search bar** | `<BlogSearch compact={true} />`. Position: `float: right` on desktop (below breadcrumbs), full-width on mobile above title. Compact variant: narrower (max-width 280px desktop), same functionality. |
| **Category badge** | `<Badge>` linked to `/blog/?category=[slug]`. `margin-top: 16px`. `margin-bottom: 12px`. |
| **Headline** | Post `title` from frontmatter. AS300, H1 size, `text-foreground`. `max-width: 800px`. |
| **Meta row** | `margin-top: 12px`. `display: flex`, `flex-wrap: wrap`, `gap: 8px`, `align-items: center`. Items separated by `." text-faint`. Items: Date (formatted "March 2, 2026"), Reading time ("[N] min read"), Author ("Version2"). MR400, Body, `text-muted`. |
| **Featured image** | Full container width (max-w-4xl). `aspect-ratio: 16/9`. `rounded-xl`. `margin-top: 32px`. `object-cover`. From frontmatter `featuredImage` path. Blur-up loading. |

**Animation**: Category badge + headline + meta fade up cascade. Image fades in with slight scale. No `SplitText` on blog headlines (too long for per-character animation -- would be slow).

## Section 7.2: Table of Contents (Conditional)

**Rendered only when post has 3+ headings (`toc.length >= 3`).**

| Property | Specification |
|----------|---------------|
| **Desktop (lg+)** | Sticky sidebar. Positioned left of prose column. Using a grid: `grid-template-columns: 220px 1fr`, `gap: 3rem`. TOC in left column, `position: sticky`, `top: 96px` (below header height + 24px buffer), `max-height: calc(100vh - 120px)`, `overflow-y: auto`. |
| **Tablet/Mobile (<lg)** | Collapsible section above post content. "Contents" toggle button (MR600, Body, `text-foreground` + Lucide `ChevronDown` 16px). Collapsed by default. Expands to show TOC list. `bg-raised`, `rounded-lg`, `p-4`, `margin-bottom: 24px`. |

**TOC list**:

| Element | Specification |
|---------|---------------|
| **Heading** | "Contents". MR600, Small, uppercase, `tracking-overline`, `text-muted`. `margin-bottom: 12px`. |
| **Items** | From `BlogPost.toc` array. H2 items: MR400, Body (1rem), `text-muted`. H3 items: MR400, Small (0.875rem), `text-muted`, `padding-left: 1rem`. `padding: 4px 0` per item. |
| **Active state** | Current section (tracked by `IntersectionObserver` on heading elements): `text-foreground`, `border-left: 2px solid var(--color-brand-red)`, `padding-left: 8px` (offset by border). |
| **Inactive** | `border-left: 2px solid transparent`. |
| **Click** | Smooth scroll to target heading (Lenis `scrollTo`). URL hash updates (`#heading-id`). |
| **Transition** | Active/inactive state: 150ms `ease-smooth`. |

## Section 7.3: Post Content (Prose)

| Property | Specification |
|----------|---------------|
| **Container** | `max-w-3xl mx-auto` (768px). If TOC sidebar is present (desktop), this is the right column of the grid. |

**Typography for all rendered markdown elements**:

| Element | Specification |
|---------|---------------|
| **Paragraphs** | MR400, Body Prose (1.125rem, md+), line-height `--leading-prose` (1.75). `margin-bottom: 1.5rem`. `text-foreground`. Mobile: Body (1rem), line-height 1.6. |
| **H2** | AS300, H2 size. Line-height 1.2. `letter-spacing: -0.02em`. `margin-top: 3rem`. `margin-bottom: 1.5rem`. `text-foreground`. |
| **H3** | AS700, H3 size. Line-height 1.2. `letter-spacing: -0.01em`. `margin-top: 2rem`. `margin-bottom: 1rem`. `text-foreground`. Auto-generates `id` attribute for TOC anchor linking. |
| **H4** | AS700, H4 size. `margin-top: 1.5rem`. `margin-bottom: 0.75rem`. `text-foreground`. |
| **Bold** | `font-weight: 600` (MR600). |
| **Italic** | `font-style: italic`. |
| **Links** | `text-brand-red`. `text-decoration: none`. Hover: `text-brand-red-hover`, `text-decoration: underline`. Transition 150ms. External links get Lucide `ExternalLink` icon 12px inline after text. |
| **Unordered lists** | `padding-left: 1.5rem`. Custom bullets: `list-style: none`. `::before` pseudo-element: `content: ""`, `width: 6px`, `height: 6px`, `background: var(--color-brand-red)`, `display: inline-block`, `margin-right: 12px`, `vertical-align: middle`. `margin-bottom: 0.5rem` per item. |
| **Ordered lists** | `padding-left: 1.5rem`. Standard decimal numbers. MR600 for the number. |
| **Blockquotes** | `border-left: 3px solid var(--color-brand-red)`. `padding-left: 1.5rem`. `margin: 2rem 0`. Text: AS300, Body Large (1.25rem), `font-style: italic`, `text-foreground`. Line-height 1.6. |
| **Code blocks** | `bg-sunken`. `rounded-lg`. `padding: 1.25rem`. `overflow-x: auto`. `margin: 1.5rem 0`. Font: Fira Code (or JetBrains Mono), 0.875rem (Small). Syntax highlighting with restrained warm colors (comments: `text-faint`, strings: `text-brand-red-light`, keywords: `text-foreground`, functions: `text-muted` -- NO neon greens, blues, or purples). |
| **Inline code** | `bg-sunken`. `rounded-md`. `padding: 2px 6px`. Fira Code, 0.875rem. `text-brand-red-light`. |
| **Images** | Full prose width. `rounded-lg`. `margin: 2rem 0`. Alt text mandatory (from markdown). Blur-up loading. |
| **Horizontal rules** | `border: none`. `border-top: 1px solid var(--color-line)`. `margin: 3rem 0`. |
| **Tables** | `width: 100%`. `border-collapse: collapse`. Header: `bg-raised`. `border-bottom: 2px solid var(--color-line)`. MR600. Cells: `padding: 0.75rem 1rem`. `border-bottom: 1px solid var(--color-line-subtle)`. MR400. `text-align: left`. `overflow-x: auto` wrapper for mobile. |

**No animation**: Blog prose content does not use `ST-reveal` or any scroll-triggered animation. It renders immediately and fully. The reading experience should be distraction-free.

## Section 7.4: Tags

| Property | Specification |
|----------|---------------|
| **Position** | Below post content. `margin-top: 3rem`. `border-top: 1px solid var(--color-line-subtle)`. `padding-top: 1.5rem`. |
| **Label** | "Tags:". MR600, Small, `text-muted`. Inline before tags. |
| **Tags** | From `BlogPost.tags`. Each rendered as `<Badge>`. `bg-raised`, `border: 1px solid var(--color-line)`, `rounded-md`, `px-2 py-0.5`. MR400, Small, `text-muted`. Hover: `text-foreground`, `border-color: var(--color-line)`. `gap: 0.5rem`. `display: inline-flex`, `flex-wrap: wrap`. Not linked (tags are display-only, filtering is via categories). |

## Section 7.5: Share Buttons

| Property | Specification |
|----------|---------------|
| **Position** | Below tags. `margin-top: 2rem`. `display: flex`, `gap: 1rem`, `align-items: center`. |
| **Label** | "Share:". MR600, Small, `text-muted`. |
| **Buttons** | 4 icon buttons: LinkedIn, X, Facebook, Copy Link. Each: Lucide icon (20px), `text-muted`, hover `text-foreground`. 40x40px touch target (`rounded-full`, `flex items-center justify-center`). Hover: `bg-raised`. Transition 150ms. |
| **LinkedIn** | Opens `https://www.linkedin.com/sharing/share-offsite/?url=[encoded-url]` in new window. |
| **X** | Opens `https://twitter.com/intent/tweet?url=[encoded-url]&text=[encoded-title]` in new window. |
| **Facebook** | Opens `https://www.facebook.com/sharer/sharer.php?u=[encoded-url]` in new window. |
| **Copy Link** | On click: `navigator.clipboard.writeText(url)`. Icon changes to Lucide `Check`. Button text tooltip: "Copied!" for 2000ms, then reverts. |

## Section 7.6: Related Posts

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard (back to max-w-7xl, not the narrow prose container) |
| **Heading** | "Related Articles". AS300, H3 size, `text-foreground`. `margin-bottom: 32px`. |
| **Layout** | `display: grid`, `grid-template-columns: repeat(3, 1fr)` (lg+), `repeat(2, 1fr)` (md), `1fr` (mobile). `gap: 1.5rem`. |
| **Content** | 3 `<BlogPostCard />` components. Selection: same category first, then most recent. Exclude current post. |

## Section 7.7: Post CTA

`<CTASection variant="compact" />`: Heading varies by post category. E.g., web-development: "Need a custom website?", seo: "Want better rankings?". Links to relevant service page + `/contact/`. Compact variant: smaller padding (`py-12 md:py-16`), H3 heading instead of H1.

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Blog Post (x103) | `content/blog/[slug]/[lang].md` (full) | None | TOC, reading time, related posts |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Blog Post | `BlogPosting`, `BreadcrumbList` |
