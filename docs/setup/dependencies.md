# Dependencies

> All project dependencies, library rationale, and integration patterns for Version2.hr.
> Related: [config.md](config.md), [workflow.md](workflow.md)
>
> **Versions verified against npm registry on 2026-03-19.**

---

## Breaking Change Warnings

> **@sentry/nextjs v8 -> v10:** Major version jump (v9 was skipped). Expect significant API changes, updated SDK initialization, and new configuration patterns. Review the [Sentry migration guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/migration/) before upgrading. The v8 `tunnelRoute` and `autoInstrumentServerFunctions` options may be renamed or removed.

> **zod v3 -> v4:** Major version jump. Zod v4 introduces a new API surface, changes to schema inference types, and potential breaking changes in `.parse()` / `.safeParse()` behavior. All schemas and `@hookform/resolvers` integration must be tested. Review the [Zod v4 changelog](https://github.com/colinhacks/zod) before upgrading.

> **three 0.172 -> 0.183:** Three.js uses 0.x semver where every minor bump can contain breaking changes. Eleven minor versions of changes to review. Check R3F/Drei compatibility matrices and test all 3D scenes thoroughly after upgrading.

---

## Prerequisites

- Node.js 20+ (LTS)
- npm
- Git
- GitHub account (v2matosevic)

---

## Key Dependencies

Core framework: **Next.js ^16.2**, **React ^19.2**, **TypeScript ^5.9**, **Tailwind CSS ^4.2**.

**Interaction stack:**
- **@react-three/fiber ^9.5 + @react-three/drei ^10.7** — WebGL/3D scenes. R3F v9 is required for React 19 (v8 pairs with React 18 only). Drei v10 matches.
- **three ^0.183 + @types/three** — Three.js (R3F peer dependency). **See breaking change warning above.**
- **gsap ^3.14 + @gsap/react ^2.1** — Timeline animations, scroll triggers, per-character text effects. `@gsap/react` provides the `useGSAP` hook (required for proper cleanup in React 19 strict mode). Separate install.
- **lenis ^1.3** — Smooth scrolling. Import from `lenis/react` for React bindings.
- **motion ^12.38** — Component animations, page transitions. **Not `framer-motion`** — the package was rebranded. Import from `motion/react`.
- **lucide-react ^0.577** — Tree-shakeable icon library (menu, close, chevrons, social, mail, phone, arrows, etc.)
- **detect-gpu ^5.0** — GPU tier detection for R3F fallbacks (see `performance.md`)

**Data & forms:**
- **react-hook-form ^7.71** — Form state management (all 4 forms)
- **zod ^4.3 + @hookform/resolvers ^5.2** — Schema validation (shared between frontend and backend). **See breaking change warning above.**
- **gray-matter ^4.0** — Frontmatter parsing for markdown content
- **unified ^11.0** — Markdown/MDX processing pipeline
- **fuse.js ^7.1** — Client-side fuzzy search for blog listing

**Infrastructure:**
- **@sentry/nextjs ^10.44** — Error tracking. **See breaking change warning above.** With standalone mode, previous static export constraints are lifted — `tunnelRoute` and `autoInstrumentServerFunctions` are now fully supported. Server-side error tracking and performance monitoring work out of the box.
- **sharp ^0.34** — Build-time image optimization (runs in `scripts/optimize-images.ts`)
- **drizzle-orm ^0.45 + better-sqlite3 ^12.8** — Database layer (backend only)
- **nodemailer ^6.9** — SMTP email transport (Zoho Mail). Used by the `sendEmail()` utility in API routes.
- **node-cron ^3.0** — Scheduled tasks (DB backup, tracking refresh, chat purge). Runs within the Next.js standalone process.
- ~~**hono**~~ — *(Removed)* Previously the backend HTTP framework. Backend is now consolidated into Next.js API routes and Server Actions. Hono is no longer a dependency.

**Dev dependencies:**
- **tsx ^4.21** — Runs TypeScript build scripts (`scripts/generate-*.ts`)
- **@tailwindcss/postcss ^4.2** — PostCSS plugin for Tailwind v4
- **satori ^0.25** — Build-time OG image generation from JSX templates
- **@resvg/resvg-js ^2.6** — SVG-to-PNG conversion for Satori output
- **@types/nodemailer** — TypeScript types for nodemailer

**Optional (Phase 7, if needed):**
- **howler ^2.2 + @types/howler** — Ambient sound (off by default, toggle in menu)

---

## R3F + SSR Pattern

React Three Fiber uses browser-only APIs (`WebGLRenderer`, `canvas`, `requestAnimationFrame`). Even though standalone mode supports SSR, R3F components still cannot render server-side — they must be loaded via `next/dynamic` with SSR disabled. This is now a performance optimization (avoiding hydration overhead for 3D scenes) rather than a hard requirement from static export.

```tsx
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('@/components/scenes/hero-scene'), {
  ssr: false,
  loading: () => <HeroFallback />,  // meaningful fallback, not blank
})
```

Rules:
- **Never import R3F at module top level** in a page/layout. Always `next/dynamic` with `ssr: false`.
- **Wrap in Suspense** with a styled fallback (the preloader or a skeleton, not an empty div).
- **Tree-shake Three.js** — import specific classes (`import { BoxGeometry } from 'three'`), never the full library.
- **One Canvas per page** — multiple Canvas elements degrade GPU performance. Composite all 3D elements into a single scene.

---

## GSAP Plugin Access

All GSAP plugins are free (Webflow acquired GSAP in 2024, removed all paywalls). Install both packages:

```bash
npm install gsap @gsap/react
```

All plugins are included in the main `gsap` package. The `@gsap/react` package provides the `useGSAP` hook — required for proper animation cleanup in React 19 strict mode (double-mounting). Import pattern:

```tsx
'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
```

Use `useGSAP()` instead of `useEffect`/`useLayoutEffect` for all GSAP animations. It automatically reverts animations on unmount.

---

## Lenis + GSAP Integration

Lenis smooth scrolling must sync with GSAP's ticker for coordinated ScrollTrigger animations. Set `autoRaf: false` on Lenis and drive it from GSAP's ticker:

```tsx
'use client'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
```

**Route change scroll reset:** Lenis does not auto-reset scroll position on client-side navigation. Add a `useEffect` watching `usePathname()` that calls `lenis.scrollTo(0, { immediate: true })` on route change.

---

## Blog Search (Client-Side)

Client-side search remains the recommended approach for instant, responsive filtering. While server-side search is now possible with standalone mode, Fuse.js provides a snappier UX for 103 posts without a server round-trip.

1. **Build-time index generation** — During `npm run build`, generate a JSON search index from all 103 curated blog posts (title, excerpt, category, tags, first 200 words of content).
2. **Client-side search library** — Fuse.js (lightweight, fuzzy search, ~5KB gzipped). Search index generated at build time, lazy-loaded on first search focus.
3. **Index loaded on demand** — The search index JSON (~50-80KB for 103 posts) loads only when the user focuses the search input, not on page load.

The search component renders on the blog listing page and optionally on blog post pages. Filters: category, free text. Results update instantly as the user types (debounced 200ms).

---

## Related Files

- [config.md](config.md) — Project configuration, directory structure, standalone mode setup
- [workflow.md](workflow.md) — Build scripts, package.json scripts, dev workflow
- [../performance.md](../performance.md) — GPU tier detection, R3F fallback strategy
- [../features/form-architecture.md](../features/form-architecture.md) — React Hook Form + Zod integration details
