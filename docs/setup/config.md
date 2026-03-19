# Configuration

> Directory structure, project initialization, key config files, standalone mode configuration, and environment variables for Version2.hr.
> Related: [dependencies.md](dependencies.md), [workflow.md](workflow.md)

---

## Directory Structure

See `docs/build-strategy.md` for the full rationale. Components are organized by domain, not by type.

```
src/
  app/                      # Thin route wrappers only (5-15 lines each)
    layout.tsx              # Root layout
    page.tsx                # EN homepage
    blog/[slug]/page.tsx
    services/               # Explicit service page folders (EN)
    hr/                     # Croatian routes mirror EN structure
    de/                     # German routes mirror EN structure
    dev/page.tsx            # Design system kitchen sink
  components/               # By domain, not by type
    layout/                 # Header, Footer, Menu, PageTransition
    ui/                     # Button, Card, Badge, Input, Section, Container
    blog/                   # BlogPostLayout, BlogListing, BlogCard, TOC, Search
    services/               # ServicePageLayout, ServicesGrid, ServiceCard
    home/                   # Homepage-specific sections
    seo/                    # MetaTags, Hreflang, JsonLd, Breadcrumbs
    scenes/                 # R3F (dynamically imported, ssr: false)
    shared/                 # LanguageSwitcher, CustomCursor, FAB, ScrollReveal
  lib/                      # Data layer and utilities
    i18n-config.ts          # Route map, language detection, slug mappings
    ui-strings.ts           # Interface text in 3 languages
    parse-markdown.ts       # gray-matter + unified pipeline
    load-pages.ts           # Content loaders
    load-blog-posts.ts
    constants.ts
  types/                    # TypeScript definitions
    content.ts              # PageData, BlogPost, Product, SiteConfig
    i18n.ts                 # Language, TranslationMap, UIStringKey
  styles/globals.css        # Tailwind import, font vars, dark mode
scripts/                    # Build-time (sitemap, robots, OG images, search index)
```

---

## Project Init

```bash
npx create-next-app@latest version2-site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Adjust as needed. The exact command may change based on the Next.js version at time of setup.

---

## Key Config

### next.config.ts

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'version2.hr' },
    ],
  },
  async redirects() {
    // ~730 WordPress → new URL redirects loaded from redirect-map
    return []  // populated from redirect config
  },
  async rewrites() {
    return []  // language rewrites if needed beyond middleware
  },
}

export default nextConfig
```

- `output: 'standalone'` — generates a self-contained Node.js server in `.next/standalone/`
- `images` — enables `next/image` optimization with AVIF/WebP formats (available in standalone mode)
- `trailingSlash: true` — matches WordPress URL format (all URLs end with `/`)
- `redirects()` — handles ~730 WordPress URL redirects natively (no .htaccess needed)
- `rewrites()` — available for URL rewriting (e.g., language routing helpers)

### TypeScript

Strict mode enabled. No `any` types.

### Tailwind CSS v4

Tailwind v4 uses **CSS-first configuration** — no `tailwind.config.js`/`.ts`. Design tokens are defined directly in CSS via the `@theme` directive. Content detection is automatic (scans project files, respects `.gitignore`).

PostCSS setup (`postcss.config.mjs`):
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Global CSS (`src/styles/globals.css`):
```css
@import "tailwindcss";

@theme {
  --color-brand-red: #991717;
  --color-brand-red-light: #cc2323;
  --color-brand-red-dark: #7a1212;
  --color-surface-dark: #141414;
  --color-surface-light: #F5F0EB;
  --color-surface-neutral: #1c1c1c;
  --font-headline: "Albert Sans", sans-serif;
  --font-body: "Manrope", sans-serif;
}
```

This generates utilities like `bg-brand-red`, `text-surface-dark`, `font-headline` automatically.

### Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@content/*": ["./content/*"]
    }
  }
}
```

---

## Standalone Mode Features

`output: 'standalone'` enables the full Next.js feature set. The application runs as a Node.js server on the VPS.

**Now available (previously blocked by static export):**
- `cookies()`, `headers()` server functions
- Middleware (`middleware.ts`) — use for i18n language detection, auth, redirects
- Server Actions (`'use server'`) — use for form submissions, mutations
- Rewrites/redirects in `next.config.ts` — handles ~730 WordPress redirects natively
- `next/image` optimization — AVIF/WebP with on-demand resizing
- Incremental Static Regeneration (ISR) — revalidate cached pages without full rebuild
- API routes (`src/app/api/`) — consolidated backend, no separate server

**Best practices:**
- **`useSearchParams()`** — Suspense boundary is optional but recommended for loading UX:
  ```tsx
  // page.tsx (Server Component)
  import { Suspense } from 'react'
  import { BlogList } from './blog-list'

  export default function BlogPage() {
    return (
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList />
      </Suspense>
    )
  }
  ```
- **`generateStaticParams()`** — optional but recommended for content pages (blog posts, services). Pre-renders at build time for faster first load. Pages without it use on-demand SSR.

### Sentry Standalone Config

`@sentry/nextjs` can use its full feature set in standalone mode:
- Enable `tunnelRoute` (e.g., `'/monitoring'`) for ad-blocker bypass
- Enable `autoInstrumentServerFunctions: true` for server-side error tracking
- Use both client-side and server-side Sentry: Error Boundary, browser SDK, server instrumentation, source maps

---

## Environment Variables

Comprehensive `.env.local` spec (not committed to git):

```env
# === Site ===
NEXT_PUBLIC_SITE_URL=https://version2.hr

# === Analytics (client-side, NEXT_PUBLIC_ prefix) ===
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX

# === Sentry ===
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=sntrys_xxx
SENTRY_ORG=version2
SENTRY_PROJECT=version2-hr

# === Database ===
DATABASE_PATH=./data/version2.db

# === Email (Zoho SMTP) ===
SMTP_HOST=smtp.zoho.eu
SMTP_PORT=465
SMTP_USER=office@version2.hr
SMTP_PASS=xxx
SMTP_FROM=Version2 <office@version2.hr>

# === Admin Auth ===
ADMIN_API_KEY=xxx

# === AI Chat ===
LLM_PROVIDER=anthropic
LLM_API_KEY=sk-ant-xxx
LLM_MODEL=claude-sonnet-4-20250514

# === NFC Card E-Commerce (Phase 7) ===
# STRIPE_SECRET_KEY=sk_live_xxx
# STRIPE_WEBHOOK_SECRET=whsec_xxx
# APP_V2_API_KEY=xxx
```

Notes:
- No `NEXT_PUBLIC_API_URL` needed — API routes are same-origin (`/api/*`).
- Phase 7 vars are commented out until needed.
- All client-side env vars must be prefixed with `NEXT_PUBLIC_`.

---

## Content Access

The `content/` directory lives in the project root (not inside `src/`). Access it via the `@content/*` path alias:

```ts
import siteConfig from '@content/site-config.json'
```

For markdown files, use `gray-matter` (frontmatter extraction) + the unified ecosystem (`remark-parse` → `remark-rehype` → `rehype-stringify` → `rehype-highlight` for syntax highlighting).

---

## Related Files

- [dependencies.md](dependencies.md) — Library rationale, R3F/GSAP/Lenis patterns
- [workflow.md](workflow.md) — Build scripts, package.json scripts, dev workflow
- [../build-strategy.md](../build-strategy.md) — Full directory structure rationale
- [../design/colors-tokens.md](../design/colors-tokens.md) — Design tokens defined in Tailwind CSS
