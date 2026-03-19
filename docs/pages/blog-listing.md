# Blog Listing Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/blog/` (EN), `/hr/blog/` (HR), `/de/blog/` (DE)
**Purpose**: Browseable grid of 103 curated blog posts. Search, filter, paginate.
**Data sources**: `content/blog/*/en.md` via `loadCuratedBlogMetas(lang)`. Search index generated at build time (~50-80KB JSON).
**Structured data**: `CollectionPage` + `BreadcrumbList`

## Section 6.1: Blog Hero + Search

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Layout** | Container. `min-height: 30vh`. `display: flex`, `flex-direction: column`, `justify-content: flex-end`, `padding-bottom: 2rem`. |
| **Headline** | "Blog". AS300, H1 size, `text-foreground`. |
| **Subtext** | "Thoughts on web development, SEO, and building things that work." MR400, Body Large, `text-muted`. `margin-top: 8px`. |

**Search bar** (`<BlogSearch />`):

| Element | Specification |
|---------|---------------|
| **Position** | Full container width. `margin-top: 24px`. |
| **Input** | `bg-sunken`, `border: 1px solid var(--color-line)`, `rounded-lg`, `px-4 py-3`. `width: 100%`. |
| **Icon** | Lucide `Search`, 20px, `text-faint`. Positioned inside input, left side, `padding-left: 44px` on input. |
| **Placeholder** | "Search articles..." `text-faint`. |
| **Font** | MR400, Body size. |
| **Focus** | `border-color: var(--color-brand-red)`, `ring-1 ring-brand-red/20`. |
| **Search engine** | Fuse.js. Index loaded on first focus (lazy, ~50-80KB). Searches: `title`, `excerpt`, `category`, `tags`. Fuzzy threshold: 0.3. |
| **Results dropdown** | `position: absolute`, `top: 100%`, `left: 0`, `width: 100%`. `bg-raised`, `border: 1px solid var(--color-line)`, `rounded-lg`, `shadow-lg`. `max-height: 400px`, `overflow-y: auto`. `z-index: var(--z-raised)`. |
| **Result item** | `px-4 py-3`. Hover: `bg-sunken`. Title: MR600, Body, `text-foreground`. Excerpt snippet: MR400, Small, `text-muted`, `line-clamp-1`. Category badge: inline `<Badge>` after title. |
| **Max visible results** | 8 |
| **ARIA** | Input: `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`, `aria-controls="search-results"`. Results list: `role="listbox"`, `id="search-results"`. Each result: `role="option"`. `aria-activedescendant` tracks highlighted result. Keyboard: Arrow Up/Down navigates. Enter selects (navigates to post). Escape closes dropdown. |
| **No results** | "No posts found for '[query]'. Try a different search term." MR400, Body, `text-muted`. Link: "View all posts" -> clears search. |

## Section 6.2: Category Filter

| Property | Specification |
|----------|---------------|
| **Position** | Below search, `margin-top: 16px`. |
| **Layout** | `display: flex`, `gap: 0.5rem`, `overflow-x: auto`, `scrollbar-width: none`, `-webkit-overflow-scrolling: touch`. Horizontal scroll on mobile. |

**Pills**:

| Category | Post Count | Slug |
|----------|-----------|------|
| All | 103 | (default, no filter) |
| Web Development | 39 | `web-development` |
| SEO | 33 | `seo` |
| Digital Marketing | 13 | `digital-marketing` |
| WordPress | 10 | `wordpress` |
| Business & Strategy | 5 | `business-strategy` |
| AI & Automation | 3 | `ai-automation` |

**Pill styling**:

| State | Specification |
|-------|---------------|
| **Default** | `bg-transparent`, `border: 1px solid var(--color-line)`, `rounded-md`, `px-3 py-1.5`. MR600, Small. `text-muted`. `white-space: nowrap`. |
| **Active** | `bg-brand-red`, `border-color: var(--color-brand-red)`, `text-white`. |
| **Hover (inactive)** | `border-color: var(--color-brand-red)/50`, `text-foreground`. 150ms. |

**Behavior**: Click updates URL to `?category=[slug]` (shareable, bookmarkable). Filters post grid. Resets Load More count. Combinable with search (search within filtered category). "All" pill clears the `category` param.

## Section 6.3: Post Grid

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` |
| **Section padding** | `py-8 md:py-12` (reduced -- tight with filter above) |
| **Container** | Standard |
| **Layout** | `display: grid`, `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`, `gap: 1.5rem`. 3 cols desktop, 2 tablet, 1 mobile. |
| **Initial display** | 12 posts. Sorted by `date` descending. |

**Blog post card** (`<BlogPostCard />`):

| Element | Specification |
|---------|---------------|
| **Wrapper** | `<a href="/blog/[slug]/">`. `bg-raised`. `border: 1px solid var(--color-line-subtle)`. `rounded-xl`. `overflow: hidden`. `display: flex`, `flex-direction: column`. |
| **Featured image** | `aspect-ratio: 16/9`. `object-cover`. `width: 100%`. From `content/blog/[slug]/assets/featured.jpeg`. Skeleton shimmer placeholder if loading or no image. Image loading: `loading="lazy"`, blur-up (tiny base64 placeholder inline, swap to full image on load). |
| **Category badge** | `position: absolute`, `top: 12px`, `left: 12px`. `<Badge>` with `bg-brand-red/80 text-white`. `backdrop-filter: blur(4px)`. MR600, Overline size. |
| **Text area** | `padding: 1rem 1rem 1.25rem 1rem`. |
| **Title** | AS700, H4 size, `text-foreground`. `line-clamp-2`. |
| **Excerpt** | MR400, Body (1rem), `text-muted`. `line-clamp-2`. `margin-top: 8px`. |
| **Meta row** | `margin-top: 12px`. `display: flex`, `gap: 8px`, `align-items: center`. Date: MR400, Small, `text-faint`. Formatted: "Mar 2, 2026". Separator: "." `text-faint`. Reading time: MR400, Small, `text-faint`. Formatted: "5 min read". |
| **Hover** | Card: `transform: translateY(-2px)`, `border-color: var(--color-line)`. Image: `transform: scale(1.02)`. Transition 200ms `ease-smooth`. |

**Data source**: `loadCuratedBlogMetas(lang)` at build time. Returns `BlogPostMeta[]` sorted by date.

## Section 6.4: Load More

| Property | Specification |
|----------|---------------|
| **Position** | Centered below grid. `margin-top: 2rem`. |
| **Button** | "Load More ([N] remaining)". `<Button variant="secondary" size="md">`. |
| **Behavior** | Click appends next 12 posts to grid. Updates remaining count. Disappears when all 103 posts loaded (or all filtered posts loaded). |
| **Loading state** | Button: spinner icon + "Loading..." text. Width preserved. |
| **Search override** | When search is active, all matching results display at once (no pagination). Load More is hidden. |

## Data Dependencies

| Page | Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|------|---------------------------|---------------------------|---------------------|
| Blog Listing | All 103 `content/blog/*/[lang].md` (meta only) | None | Search index JSON (~50-80KB), category counts |

## Structured Data

| Page Type | JSON-LD Schema Types |
|-----------|---------------------|
| Blog Listing | `CollectionPage`, `BreadcrumbList` |
