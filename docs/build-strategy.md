# Build Strategy

How we build. Not the task list (that's `tasks/todo.md`) but the philosophy, structure, and execution order.

## Approach: Horizontal Layers with Vertical Validation

Build each cross-cutting system (layer) across the entire site. After each layer, validate by checking real pages render correctly at that layer's fidelity.

### Why Not MVP

This is a marketing site for a web dev studio. The site IS the portfolio. An MVP stripped of animations, 3D, and polish is a generic Tailwind template that damages the brand. The reference sites (Unseen Studio, Dogstudio, Locomotive) are finished products where every detail reinforces the craft narrative.

There's also no "later." Shipping layout without the animation system baked in means retrofitting GSAP ScrollTrigger and per-character animations into every section. The cost of bolting on exceeds building it in from the start.

### Why Not Page-by-Page

387 routes share foundational systems: i18n routing, design tokens, data layer, layout shell, animation infrastructure. Building the homepage "completely" means building 80% of the infrastructure anyway. Then when services are built, the i18n approach needs adjustment, the layout needs a variant, the animation system needs different timing.

The blog makes this clearest: 103 posts use one template. The work is the infrastructure (markdown parsing, TOC, reading time, syntax highlighting, search index, related posts), not any individual post.

### The Right Model

Think house-building: pour the entire foundation, frame every room, run all plumbing/electrical, then finish room by room. Don't tile the kitchen while another room has no walls.

---

## The 7 Layers

### Layer 0: Project Scaffold

Next.js 16 + TypeScript strict + Tailwind v4. Standalone mode config. Directory structure. Path aliases. All dependencies installed. ESLint flat config.

**Done when:** `npm run dev` starts. `npm run build` produces `.next/standalone/`. `npx tsc --noEmit` passes.

**Maps to:** Sprint 1.1 in `tasks/todo.md`.

### Layer 1: Design Tokens + Type System

Tailwind v4 config with all color tokens (brand red shades, surface dark/light/neutral, text colors). Typography scale (Albert Sans + Manrope via `next/font`). Spacing tokens. Dark/light mode mechanism. TypeScript types for all content schemas. Base UI primitives (Button, Card, Badge, Input, Section, Container). Dev kitchen-sink page. Reference `docs/design-reference-audit.md` for competitive color palettes, typography strategies, and atmospheric depth techniques.

**Done when:** `/dev/` page renders all tokens, font weights, color swatches, primitives in both modes. Fonts render Croatian diacritics. WCAG AA contrast passes.

**Maps to:** Sprint 1.2 in `tasks/todo.md`.

### Layer 2: Data Layer + i18n

Markdown parser pipeline (gray-matter + unified/rehype). Data loaders for pages and blog posts. Site config loader. i18n config with route map and language detection. Translation resolver from frontmatter. UI strings (100-150 keys x 3 languages). `generateStaticParams` helpers (optional optimization for pre-rendering). Middleware for i18n language detection/redirects. Build-time generators (sitemap, robots, search index). Redirects and rewrites in `next.config.ts`.

**Done when:** Smoke test loads all 103 posts + 17 pages. `npm run build` succeeds with sitemap.xml and robots.txt generated. Middleware correctly detects language and redirects.

**Maps to:** Sprint 1.3 in `tasks/todo.md`.

### Layer 3: Layout Shell

Root layout with fonts, providers. Language-specific sub-layouts (`/hr/`, `/de/`). Header (scroll-aware transparency). Desktop sidebar menu + mobile fullscreen menu. Footer (6 columns, all links). Lenis smooth scroll. Motion (`motion/react`) page transitions. Cookie consent banner. Skip-to-content link.

**Done when:** Navigate between 3+ pages. Header/footer render fully. Menu opens/closes. Page transitions play. Language switcher resolves correct URLs. Responsive on all breakpoints.

**Maps to:** Sprint 2.1 in `tasks/todo.md`.

### Layer 4: Page Templates + Content

Every route exists and renders real content. The work here is building template components, not individual pages. Most page files are 5-15 line thin wrappers. Four parallel sub-layers:

- **4a: Blog** — Listing (grid, search, category filter, pagination) + post template (hero, TOC, rich markdown, share, related posts). All 103 posts render.
- **4b: Services** — Overview grid (9 cards) + individual service pages (hero, features, process, tech, FAQ, CTA). 5 core services.
- **4c: Core pages** — Homepage (placeholder hero, services teaser, differentiators, portfolio highlights with 6 real projects, client logos, CTA). About, Contact (form UI), Career, Analysis, Pricing (placeholder), Portfolio (6 real case studies).
- **4d: Legal + utility** — 6 legal pages (pure prose rendering), 404 page, case study template.

4a through 4d can run in parallel.

**Done when:** `npm run build` succeeds. Pre-rendered pages generate correctly. Every page renders content from markdown. Every page works in EN (with fallbacks for HR/DE where translations don't exist yet). Spot-check 20 random routes.

**Maps to:** Sprints 2.2, 2.3, 2.4, 2.5 in `tasks/todo.md`.

### Layer 5: SEO Infrastructure

Meta component (unique title/description per page from frontmatter). Open Graph tags. Canonical URLs. hreflang tags. JSON-LD structured data (LocalBusiness, WebSite, Service, BlogPosting, BreadcrumbList). OG image generation (Satori at build time). Verify all postbuild generators.

**Done when:** Lighthouse SEO 90+ on homepage, a blog post, a service page. Google Rich Results Test validates structured data.

**Maps to:** Sprint 3.1 in `tasks/todo.md`.

### Layer 6: Animation + Interaction

GSAP ScrollTrigger reveals. Per-character text animations. Custom cursor. Section rhythm. `prefers-reduced-motion` handling. R3F 3D hero with preloader, progressive loading, device adaptation, GPU tier detection. Interactive pricing tool (4-step wizard). Cookie consent persistence. Analytics integration (consent-gated). FAB. Language switcher functionality.

Note: The 3D hero can start as soon as the homepage exists (Layer 4c). It's independent of other Layer 6 work.

**Done when:** Animations at 60fps. 3D hero loads progressively with fallback. Reduced motion works. Pricing tool completes all steps. Lighthouse Performance 90+.

**Maps to:** Sprints 4.1, 4.2, 4.3 in `tasks/todo.md`.

### Layer 7: Integration + Launch

Connect forms to backend. E2E flow testing. Cross-browser testing (especially Safari WebGL). Accessibility audit. Performance audit. Content QA. Final build. Deploy.

**Done when:** Site is live. Forms submit. Analytics fire after consent. No 404s. Subdomains untouched.

**Maps to:** Phase 5 (backend) + Phase 6 (launch) in `tasks/todo.md`.

---

## i18n Routing: Explicit Folders

Resolved. See `decisions.md` for the formal record.

Language-specific slugs make `[lang]` parameters unworkable:

```
EN: /services/web-design/
HR: /hr/usluge/web-dizajn/
DE: /de/dienstleistungen/web-design/
```

The parent segment changes (`services` vs `usluge` vs `dienstleistungen`). No dynamic parameter can unify these paths.

### Architecture

- Route files are thin wrappers (5-15 lines). They declare a language, load content, pass it to a shared template component.
- A central `i18n-config.ts` maps route IDs to paths per language.
- Language detection: check if path starts with `/hr/` or `/de/`. Everything else is English.
- Translation resolution reads frontmatter `translations` field + route map to produce the correct URL per language.
- hreflang generation is automatic from the route map.
- Blog posts use `[slug]` with `generateStaticParams` (parent path is consistent: `/blog/`, `/hr/blog/`, `/de/blog/`).
- No third-party i18n library. The routing is too custom for libraries that assume `[locale]` prefix patterns.

---

## Translation Strategy

Build full trilingual infrastructure from day one. Populate English first.

1. All 387 route files exist from the start (Layer 4).
2. Content fallback chain: requested language -> English -> "not available" notice.
3. UI strings complete in all 3 languages from the start (~100-150 strings).
4. Blog posts: EN done (4 passes). HR/DE exist from WordPress extraction, will need rewriting later. They render now.
5. Build outputs all 387 pages regardless. Missing translations fall back at build time, not runtime.

---

## File Structure

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

## Coding Practices

- **Named exports only.** No default exports (except Next.js page/layout which require them).
- **No `any`.** Use `unknown` + type narrowing.
- **Explicit return types** on public functions.
- **~150 lines max per file.** Refactor immediately if exceeded.
- **~30 lines max per function.** Extract helpers early.
- **Early returns.** Flat over nested.
- **No magic strings/numbers.** Named constants.
- **No dead code, no commented-out code.**
- **Components: one per file.** Colocated with their types.
- **Verify after every layer:** `npx tsc --noEmit && npm run lint && npm run build`.

---

## Risk Reduction

The layered approach de-risks the architecture front-to-back:

1. **i18n routing** (biggest risk) is forced to be solved in Layer 2, before any page exists. If the approach doesn't work, changing it is cheap.
2. **Standalone mode** validated in Layer 0. No late-stage surprises.
3. **Content parsing** validated in Layer 2 across all 103+17 files. Frontmatter inconsistencies surface before templates try to render them.
4. **Layout shell** tested in Layer 3 with minimal content. Scroll conflicts, z-index issues, transition bugs found early.
5. **Animation is the last layer before launch.** If GSAP or R3F cause problems, the site is fully functional without them. Content never depends on animation.

---

## Backend Timing

The backend is consolidated into Next.js API routes and Server Actions (no separate codebase). API routes live in `src/app/api/`, Server Actions in `src/app/actions/`. Backend functionality can be built incrementally alongside frontend layers. Forms connect directly to API routes without CORS or separate deployment.

---

## What We Build First

Layer 0 + Layer 1 combined: project scaffold, design tokens, types, primitives. This is the concrete slab. Everything else sits on it. Build it once, build it right, never touch it again.
