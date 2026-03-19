# Project Todo — Version2.hr Rebuild

Last updated: 2026-03-19

**Build strategy:** `docs/build-strategy.md` — horizontal layers with vertical validation. Layers map to sprints below.

---

## Phase 0: Preparation (COMPLETE)

### Content Extraction & Validation
- [x] Download all blog posts (190 posts x 3 languages)
- [x] Download all page content (21 pages x 3 languages)
- [x] Fix 13 corrupted featured images (re-downloaded from og:image)
- [x] Verify inline blog images (confirmed: text-only extraction, no broken refs)
- [x] Extract WooCommerce products (21 products -> products.json + 21 images)
- [x] Validate all 190 blog posts — images valid, 100% translation coverage, categories mapped
- [x] Map all internal links in blog content -> `tasks/internal-links-report.md`
- [x] Tier all 190 blog posts by relevance -> `tasks/blog-tiering-report.md`
- [x] Build complete redirect map -> `tasks/redirect-map.md`
- [x] Scan all 190 blog posts for slug collisions -> irrelevant now (/blog/ prefix eliminates collisions)
- [x] Verify all product image references in products.json (all 21 OK)

### Content Audit
- [x] Page audit against service pivot -> `tasks/page-audit.md`
- [x] Verify all page/product/global assets are valid images (all clean)
- [x] Identify duplicate assets (67 client logos, 18 flag icons, 6 empty `tr` files)
- [x] Remove duplicate language flag icons and empty `tr` files (24 files -> `content/assets/flags/`)
- [x] ~~Fix 2 malformed URLs in zastita-wordpress-web-stranice~~ FALSE POSITIVE (valid inline code)
- [x] Build filename normalization manifest -> `tasks/filename-normalization-manifest.md` (~68 renames)
- [x] Catalog duplicate client logos -> `tasks/client-logo-catalog.md` (66 dupes across 6 dirs)
- [x] Delete 66 duplicate client logo files from page directories
- [x] Execute asset filename renames (~68 files renamed, products.json updated)
- [x] Normalize asset filenames (all active dirs now lowercase kebab-case)
- [x] Consultation page -> redirect to contact (resolved)

### URL Structure & Blog Curation
- [x] Design complete new URL structure -> `docs/sitemap.md` (complete rewrite)
- [x] Curate blog posts -> `tasks/blog-curation-manifest.md` (103 keep, 87 drop)
- [x] Update redirect map for /blog/ restructure -> `tasks/redirect-map.md` (~730 rules)
- [x] Resolve Language URL Structure decision (EN at root)
- [x] Resolve Blog Post URL Structure decision (move to /blog/)
- [x] Resolve WordPress Category Pages decision (redirect to /blog/?category=)
- [x] Resolve Missing Consultation Page decision (redirect to contact)
- [x] Resolve Analiza Page Fate decision (keep as lead-gen)
- [x] Resolve site-config.json Default Language decision (update to EN, defer to Phase 1)
- [x] Update all docs for consistency with new URL structure

### Decisions — ALL RESOLVED (2026-02-23)
- [x] Color Palette — evolve: keep red DNA, push toward sophistication
- [x] Typography — thin/minimalistic headlines + readable body font (Nunito retired)
- [x] Dark Mode — both modes with system preference + manual toggle
- [x] Form Backend — fully custom backend (no third-party services)
- [x] Client Showcase Selection — owner will provide new web dev clients
- [x] Gallery Page Fate — drop entirely, 301 redirect to portfolio
- [x] WooCommerce Product Pages — fold into digital business cards service as customizer tool
- [x] Catalog Page Purpose — drop entirely, 301 redirect to services

### Brand Discovery (2026-02-25)
- [x] Complete brand discovery interview -> `docs/brand-discovery.md`
- [x] Define identity, tone, visual mood, color direction
- [x] Define technical stack (R3F, GSAP, Lenis, Motion, Howler.js)
- [x] Define site structure and page map (portfolio, services/[slug], career, FAB)
- [x] Define page-by-page breakdown (20 sections)
- [x] Define backend platform scope (CMS, AI chat, booking, analytics, forms, pricing engine)
- [x] Align all 17 project docs with brand discovery
- [x] Drop Windows Applications service

### Data Files (COMPLETE)
- [x] Update site-config.json (defaultLanguage→EN, nav rewrite, dropped services, language-aware footer URLs)
- [x] Update products.json (removed product URLs — products folded into card customizer, no routes)
- [x] Update redirect-map.md targets (~60+ stale targets fixed: services→/services/[slug]/, references→portfolio, products→services, gallery→portfolio)

### Documentation (COMPLETE)
- [x] All docs created in docs/
- [x] decisions.md up to date (all 16 resolved)
- [x] content-audit.md up to date (13 issues documented)
- [x] lessons.md capturing patterns
- [x] sitemap.md rewritten for new URL structure (services/[slug], portfolio, career)
- [x] brand-discovery.md created (master reference document)
- [x] All docs aligned with brand-discovery.md (17 docs updated 2026-02-25)
- [x] site-config.json navigation updated for new service structure
- [x] R3F + static export pattern documented in `docs/setup/dependencies.md`
- [x] GSAP plugin access and SplitText documented in `docs/setup/dependencies.md`
- [x] Blog search implementation approach documented (`docs/setup/dependencies.md` + `docs/components/features.md`)
- [x] CMS rebuild pipeline expanded with implementation details (deployment.md)
- [x] AI Chat RAG approach documented (`docs/features/form-specs.md`)
- [x] content-structure.md updated with current page status annotations
- [x] Final consistency sweep — zero stale references remaining

### Pre-Build Documentation Gap Fix (2026-02-27)
- [x] UI Strings Inventory — categorized ~120 keys across 10 categories → `docs/i18n.md`
- [x] Build-Time Generator Output Schemas — sitemap, robots, htaccess, search index, image optimizer specs → `docs/setup/workflow.md`
- [x] Cookie Consent Implementation Details — storage key, JSON format, versioning, re-display logic → `docs/features/integrations.md`
- [x] Dark/Light Mode Implementation — CSS strategy, flash prevention script, section overrides → `docs/design/colors-tokens.md`
- [x] Form Error Messages — validation messages in 3 languages + server error/success strings → `docs/features/form-specs.md`
- [x] Loading & Empty States — all async and content-dependent views defined → `docs/components/features.md`
- [x] PageTransition Component — full spec (library, animation, trigger, reduced motion) → `docs/components/layout.md`
- [x] 404 Page Content — actual copy, visual spec, language-awareness → `docs/components/features.md`
- [x] Blog Pagination — resolved as "Load More" (12 per batch, remaining count) → `docs/components/features.md`

### Pre-Build Audit — Round 2 (2026-02-27)
- [x] Build script execution order — prebuild/postbuild pipeline with failure semantics → `docs/setup/workflow.md`
- [x] Booking slot duration stale TBD — updated `decisions.md` to RESOLVED with concrete values (30min/15min/2-14d)
- [x] Error tracking decision — resolved as Sentry (`@sentry/nextjs`), install in Sprint 1.1 → `docs/decisions.md`
- [x] 404 route pattern — `not-found.tsx` per language folder, static export generates `404.html` → `docs/components/features.md`
- [x] Cookie consent version rules — initial version 1, sequential increment, old preference discarded on bump → `docs/features/integrations.md`
- [x] Preloader scope and timing — homepage only, 800ms min, 4s timeout, no repeat on internal nav → `docs/components/sections.md`
- [x] Service page FAQ structure — frontmatter `faqs` array, 5-8 items, single-expand accordion → `docs/components/features.md`

### Dependency Compatibility Audit (2026-02-27)
- [x] R3F v9 + Drei v10 required for React 19 — version pairing documented → `docs/setup/dependencies.md`
- [x] `framer-motion` → `motion` rebrand — all docs updated to `motion/react` imports → all docs
- [x] `@gsap/react` separate install + `useGSAP` hook pattern documented → `docs/setup/dependencies.md`
- [x] Tailwind v4 CSS-first config — `@theme` directive replaces JS config → `docs/setup/config.md`, `docs/design/colors-tokens.md`
- [x] `useSearchParams` Suspense requirement for static export → `docs/setup/config.md`
- [x] Sentry static export config (disable tunnelRoute, server instrumentation) → `docs/setup/config.md`
- [x] Lenis route-change scroll reset + GSAP ticker integration pattern → `docs/setup/dependencies.md`
- [x] `tsx` dev dependency, `@types/three` types added to dependency list → `docs/setup/dependencies.md`
- [x] Static Export Constraints checklist added → `docs/setup/config.md`
- [x] Blog tag taxonomy (19 tags) enumerated → `docs/content-structure.md`
- [x] SEO meta description mapping (excerpt vs description) → `docs/content-structure.md`
- [x] Service page `faqs` field noted as upcoming → `docs/content-structure.md`

---

## Phase 1: Foundation

Clean slate. Build from scratch with full interaction stack.

**Page blueprints:** `docs/pages/` — 15 files covering all page types with exact sections, layouts, typography, animations, responsive behavior, data sources, and component mapping. Use as the build-ready reference for every page implementation.

### Sprint 1.1: Project Scaffold
- [ ] Initialize Next.js 16 + TypeScript strict + Tailwind CSS v4
- [ ] Configure `next.config.ts`: `output: 'standalone'`, `trailingSlash: true`, `images: { remotePatterns: [...] }`
- [ ] Configure `next.config.ts` `redirects()` — ~730 redirect rules from redirect-map.md
- [ ] Configure `next.config.ts` `rewrites()` — subdomain protection for `app/`, `qr/`, `web/`
- [ ] Create `middleware.ts` for i18n routing — English default (no prefix), `/hr/` and `/de/` prefixed
- [ ] Configure `tsconfig.json`: path aliases `@/*` → `./src/*`, `@content/*` → `./content/*`, strict mode
- [ ] Set up ESLint 9 flat config (Next.js + TypeScript rules). Note: Next.js 16 uses `eslint .` (not `next lint`)
- [ ] Install core dependencies (all versions verified):
  - `@react-three/fiber` ^9.5 + `@react-three/drei` ^10.7 + `three` ^0.183 + `@types/three`
  - `gsap` ^3.14 + `@gsap/react` ^2.1
  - `lenis` ^1.3
  - `motion` ^12.34
  - `lucide-react` for icons
- [ ] Install content pipeline: `gray-matter`, `unified`, `remark-parse`, `remark-rehype`, `rehype-stringify`, `rehype-highlight`
- [ ] Install form/validation: `react-hook-form` ^7.71, `@hookform/resolvers` ^5.2, `zod` ^4.3
- [ ] Install infra: `@sentry/nextjs` ^10.40, `detect-gpu` ^5.0
- [ ] Install dev deps: `tsx` ^4.21, `@tailwindcss/postcss` ^4, `satori`, `@resvg/resvg-js`
- [ ] Create directory structure: components/{layout,ui,blog,services,home,seo,scenes,shared}, lib/, types/, scripts/
- [ ] Create `.env.example` template + `.gitignore`
- [ ] Create placeholder build scripts (no-op until Sprint 1.3)
- [ ] Set up Tailwind v4 CSS-first config with `@theme` (brand-red colors + font families)
- [ ] Set up `postcss.config.mjs` with `@tailwindcss/postcss`
- [ ] **Verify:** `npm run dev` starts, `npm run build` produces `.next/standalone/`, `npx tsc --noEmit` clean, `eslint .` clean

### Sprint 1.2: Design System
- [ ] Fonts: Albert Sans (headline) + Manrope (body) via `next/font/google` with CSS variables `--font-headline` / `--font-body`. Latin Extended subset for Croatian diacritics. Both variable fonts (full weight axis).
- [ ] Color tokens finalized (TBD values resolved in `docs/design/colors-tokens.md`):
  - Brand: `#991717` / `#cc2323` / `#7a1212` (static, mode-independent)
  - Dark mode: base `#141414`, raised `#1c1c1c`, sunken `#0c0c0c`, foreground `#F0E8E0`, muted `#9A918A`, faint `#6A625C`, line `#2a2a2a`
  - Light mode: base `#F5F0EB`, raised `#FFFFFF`, sunken `#EDE8E3`, foreground `#1A1714`, muted `#6B635C`, faint `#8A8380`, line `#DDD5CC`
  - WCAG AA verified: foreground/base 15.9:1, muted/base 6.3:1
- [ ] Tailwind v4 dark/light mode via CSS custom property cascading — semantic tokens in `@theme` auto-swap on `html.light` class. No `dark:` prefixes needed. Section-level `[data-theme]` overrides.
- [ ] Typography scale with `clamp()` viewport-relative sizing:
  - Display: `clamp(3.5rem, 7vw + 1rem, 8rem)`, H1: `clamp(3rem, 5vw + 1rem, 5.5rem)`, H2: `clamp(2rem, 3vw + 0.5rem, 3.5rem)`, H3: `clamp(1.5rem, 1.5vw + 1rem, 2.25rem)`, H4: `clamp(1.25rem, 0.5vw + 1rem, 1.5rem)`
  - Negative letter-spacing on headlines: -0.03em (display) to -0.02em (H3/H4)
  - Overline utility class, body-lg, caption
- [ ] Global CSS: base heading styles, focus rings, selection highlight, grain texture utility, easing curves (smooth/out/bounce), reduced-motion support
- [ ] UI primitives built (all in `src/components/ui/`):
  - `Button` — primary/secondary/ghost × sm/md/lg, loading spinner, disabled, forwardRef
  - `SmartLink` — auto-detects internal/external/anchor, security attrs on external
  - `Container` — max-w-7xl centered, `narrow` prop for prose (max-w-3xl)
  - `Section` — consistent padding, `theme` prop for dark/light override, `sunken` prop
  - `Card` — default/elevated/bordered, `interactive` hover scale
  - `Badge` — default/brand/solid variants
  - `Input` / `Textarea` — label, error, hint, forwardRef, ARIA attributes
- [ ] Kitchen-sink `/dev/` page: colors, typography, diacritics test, all primitives in all states, section theme overrides, dark/light toggle
- [ ] Flash prevention: inline `<script>` in `<head>` reads localStorage before first paint
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean, `npm run build` succeeds, `/dev/` route accessible

### Sprint 1.3: Data Layer
- [ ] TypeScript types in `src/types/`: `i18n.ts` (Language, RouteDefinition, MultilingualLabel), `content.ts` (PageData, BlogPost, BlogPostMeta, Product, SiteConfig), `index.ts` (re-exports)
- [ ] Markdown parser pipeline: `parse-markdown.ts` (gray-matter + unified/remark/rehype + rehype-highlight), `parse-blog-post.ts` (reading time, TOC extraction, content preview)
- [ ] Data loaders: `load-pages.ts`, `load-blog-posts.ts` (103 curated via Set), `load-products.ts`, `load-site-config.ts`, `curated-blog-slugs.ts`
- [ ] i18n system: `i18n-config.ts` (21 routes × 3 languages, middleware-based routing: EN default no prefix, /hr/ and /de/ prefixed), `get-translations.ts` (hreflang URL resolution), `ui-strings.ts` (~120 keys × 3 languages across 13 categories)
- [ ] Build-time generators in `scripts/`:
  - `generate-sitemap.ts` → 369 URLs with xhtml:link hreflang alternates
  - `generate-robots.ts` → robots.txt with sitemap reference
  - `generate-search-index.ts` → 103 EN posts, 157KB JSON index (slug, title, excerpt, category, tags, contentPreview)
  - Note: ~730 redirects now handled via `next.config.ts` `redirects()` (not .htaccess)
  - Note: RSS feed not needed (owner decision 2026-03-19)
- [ ] Blog metadata cleanup: run one-time migration script to sync HR/DE blog post category, tags, and lastModified from EN files (see `tasks/blog-metadata-cleanup.md`)
- [ ] Blog internal link URL rewriting: transform Croatian WordPress URLs in blog markdown to new English URL structure at parse time
- [ ] Postbuild lifecycle script runs all generators after `next build` (npm lifecycle, no explicit chaining)
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean, `npm run build` succeeds. `public/` contains sitemap.xml (369 URLs), robots.txt, search-index.json (103 posts). Redirects configured in `next.config.ts`.

---

## Phase 2: Layout & Pages

### Sprint 2.1: Layout Shell
- [ ] Root layout (`src/app/layout.tsx`) — font variables, theme flash prevention, LayoutShell wrapper, body semantic classes
- [ ] Language layouts (`src/app/hr/layout.tsx`, `src/app/de/layout.tsx`) — `<div lang="hr/de">` override
- [ ] Shared hooks: `use-theme.ts` (useSyncExternalStore + localStorage), `use-scroll-direction.ts` (scroll delta tracking), `use-lock-body.ts` (overflow hidden), `use-reduced-motion.ts` (media query)
- [ ] SVG icons: 13 icons in `components/ui/icons.tsx` (Menu, X, Sun, Moon, ChevronDown, ArrowUpRight, Facebook, Instagram, TwitterX, TikTok, Mail, Phone, WhatsApp)
- [ ] Header: logo + quick links (Portfolio/Pricing/Contact) + menu toggle. Transparent → solid backdrop on scroll → hides on scroll down → reappears on scroll up. Desktop quick links hidden on mobile.
- [ ] Menu (unified desktop sidebar + mobile fullscreen): AnimatePresence slide from right, 8 nav items with Services collapsible submenu, social links, contact info, language switcher, theme toggle. Focus trap, ESC close, body scroll lock.
- [ ] Footer: CTA strip ("Have a project? Let's talk.") + 5-column grid (Services/Company/Legal/Contact/Social+Theme+Language) + copyright. Responsive 5→2→1 cols.
- [ ] Lenis smooth scroll: raf-driven, reduced-motion respect, lighter mobile config (0.8s vs 1.2s), scroll-to-top on route change
- [ ] Page transitions: Motion AnimatePresence, opacity + translateY(8px), 200ms, reduced-motion bypass
- [ ] Cookie consent: useSyncExternalStore for consent state, Accept All / Decline / Customize with toggle switches, localStorage v2_cookie_consent with version field, `hasAnalyticsConsent()` export for analytics gating
- [ ] Skip-to-content link, semantic `<header>`, `<main id="main-content">`, `<footer>`, `<nav aria-label>`
- [ ] ThemeToggle + LanguageSwitcher reusable components (used in menu + footer)
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean, `npm run build` succeeds (7 routes: /, /_not-found, /de, /dev, /hr). Layout shell renders with skip link, header, menu, page transition, footer, cookie consent.

### Sprint 2.2: Content Pages — Batch 1
**Depends on:** Sprint 2.1 (layout shell)
- [ ] Shared page section components: `PageHero` (headline + optional subtext), `CTAStrip` (heading + body + CTA button), `ContentSection` (generic section with heading + children) — all in `components/shared/`
- [ ] Homepage (`/`, `/hr/`, `/de/`):
  - `HeroPlaceholder` — gradient + grain + brand glow + headline + 2 CTAs (placeholder for 3D)
  - `ServicesTeaser` — 6 service cards with trilingual copy and links
  - `Differentiators` — 3 "why us" blocks (Modern Stack, Built to Last, Real Partnership) with trilingual copy
  - `StatsStrip` — 3 key numbers (100+ projects, 100+ clients, 5.0 rating)
  - Selected work placeholder (blocked on portfolio content)
  - CTA strip (trilingual)
- [ ] About page (`/about/`, `/hr/o-nama/`, `/de/uber-uns/`):
  - `AboutContent` — hero, story (3 paragraphs), beliefs (3 blocks), team, location, CTA. All trilingual.
- [ ] Contact page (`/contact/`, `/hr/kontakt/`, `/de/kontakt/`):
  - `ContactForm` — name, email, message fields + honeypot + loading/success mock
  - `ContactContent` — 2-column layout: form side + info side (direct contact, business hours, location address)
- [ ] Career page (`/career/`, `/hr/karijera/`, `/de/karriere/`):
  - `CareerContent` — intro, "what it's like here", Junior Developer opening (tech stack/expectations/benefits lists), "no opening that fits?" section, application form (name, email, portfolio URL, GitHub, message + honeypot + loading/success mock). All trilingual.
- [ ] All pages use thin route wrappers (5-line files passing `lang` prop to content components)
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean (1 unused import fixed), `npm run build` succeeds (16 routes), all 9 Batch 1 content routes render correctly. SSR available where beneficial.

### Sprint 2.3: Content Pages — Batch 2
**Depends on:** Sprint 2.1 (layout shell)
- [ ] `Accordion` UI component — single-expand FAQ, smooth grid-rows height animation, ARIA attributes, ChevronDown rotation
- [ ] Services Overview (`/services/`, `/hr/usluge/`, `/de/dienstleistungen/`):
  - `ServicesOverviewContent` — 5 core service cards (linked) + 4 supporting cards (no links), process strip, CTA to analysis. All trilingual.
- [ ] 5 individual service pages — each with hero, content sections, optional FAQ accordion, CTA. All trilingual COPY objects:
  - `WebDesignContent` — features (6), tech stack, process (6 steps), pricing, FAQ accordion (4 items), CTA
  - `WebAppsContent` — app types (6), process (6 steps), tech, "when you need" indicators, pricing, CTA
  - `EcommerceContent` — features (7), payments, "why custom" (5 reasons), tech, pricing, CTA
  - `AiIntegrationContent` — AI types (5), "how it works" (RAG/function calling/custom), example, models, CTA
  - `SeoContent` — services (4), approach, deliverables, FAQ accordion (3 items), CTA
- [ ] Analysis page (`/analysis/`, `/hr/analiza/`, `/de/analyse/`):
  - `AnalysisContent` — what we analyze (5 areas), what you get (4 deliverables), trust section
  - `AnalysisForm` — name, email, website-url fields + honeypot + loading/success mock
- [ ] All components in `components/services/` (6 content + index) and `components/shared/` (2 new: analysis-content, analysis-form)
- [ ] 21 route wrappers (7 pages × 3 languages)
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean (1 unused import fixed), `npm run build` succeeds (37 routes), all 21 new routes render correctly. API routes available for dynamic features.

### Sprint 2.4: Blog System
**Depends on:** Sprint 1.3 (data layer), Sprint 2.1 (layout shell)
- [ ] Fuse.js installed for client-side search
- [ ] Blog components in `components/blog/` (8 components + index):
  - `BlogCard` — category badge, title, excerpt, date, reading time. Trilingual date formatting + reading time labels.
  - `CategoryFilter` — horizontal pill buttons, "All" + unique categories from posts. Trilingual "All" label.
  - `BlogSearch` — combobox search, lazy-loads Fuse.js + search-index.json on first focus. EN-only in v1 (returns null for HR/DE). Weighted keys: title 0.4, excerpt 0.3, tags 0.15, contentPreview 0.15. Threshold 0.3, max 8 results.
  - `BlogListingContent` — hero + filter bar + search + card grid (3-col) + Load More (12 per batch, remaining count). Client-side category filtering resets pagination.
  - `BlogPostContent` — full article layout: back link, meta (badge + reading time + date + author), H1, sidebar TOC + share (sticky), prose-blog article, tags section, mobile share. Related posts section.
  - `TableOfContents` — sidebar nav from H2/H3, only renders with 3+ entries, H3 indented. Trilingual heading.
  - `ShareButtons` — LinkedIn, X, Facebook (share URLs), Copy Link (clipboard API). Trilingual labels.
  - `RelatedPosts` — same-category posts (up to 3), fills with recent if not enough. Uses BlogCard.
- [ ] Blog listing pages (3 routes): `app/blog/page.tsx`, `app/hr/blog/page.tsx`, `app/de/blog/page.tsx` — server-loads `loadCuratedBlogMetas()`, passes to client listing component
- [ ] Blog post pages (3 × `[slug]` routes): `app/blog/[slug]/page.tsx`, `app/hr/blog/[slug]/page.tsx`, `app/de/blog/[slug]/page.tsx` — `findBlogByUrlSlug()` lookup, `loadBlogPost()` full parse, `loadCuratedBlogMetas()` for related posts. Optional `generateStaticParams()` from `getCuratedBlogSlugs()` for pre-rendering optimization.
- [ ] Blog prose styling in `globals.css` — `.prose-blog` class: heading spacing/colors, links (brand-red-light), lists with disc/decimal markers, blockquotes (red left border), code blocks (sunken bg, line borders, rounded), inline code (raised bg), images (rounded), tables, horizontal rules. Max-width 768px, 1.75 line-height.
- [ ] Search index: prebuild script generates 103 EN posts, 157KB `public/search-index.json`
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean (combobox role fix for aria-expanded), `npm run build` succeeds (349 routes). 104 blog pages per language (1 listing + 103 posts = 312 blog routes + 3 listings = 315 total). All routes render correctly.

### Sprint 2.5: Legal, Utility & Remaining Pages
**Depends on:** Sprint 2.1 (layout shell)
- [ ] `LegalPageContent` shared component — renders markdown via `loadPage()` with `.prose-blog` styling, back link, title, last-updated caption. Trilingual back label + last-updated label.
- [ ] Legal pages — all 6, all 3 languages (18 route files):
  - Legal Notice (`/legal-notice/`, `/hr/pravna-obavijest/`, `/de/impressum/`)
  - Terms & Conditions (`/terms-and-conditions/`, `/hr/uvjeti-koristenja/`, `/de/nutzungsbedingungen/`)
  - Privacy Policy (`/privacy-policy/`, `/hr/politika-privatnosti/`, `/de/datenschutz/`)
  - Cookie Policy (`/cookies/`, `/hr/kolacici/`, `/de/cookies/`)
  - Right of Withdrawal (`/refund-policy/`, `/hr/politika-povrata/`, `/de/widerrufsrecht/`)
  - Accessibility Statement (`/accessibility/`, `/hr/izjava-o-pristupacnosti/`, `/de/barrierefreiheit/`)
- [ ] 404 page (`not-found.tsx`) — "This page went offline." headline, subtext, 4 nav links (Homepage, Services, Blog, Contact). Dark aesthetic. Generates `404.html` in output.
- [ ] `error.tsx` — 500 error page (runtime errors). Dark cinematic aesthetic matching 404. "Something went wrong" headline + retry button + contact link. Resets error boundary on retry. Trilingual via detected language.
- [ ] `global-error.tsx` — Root error boundary. Minimal HTML fallback (no layout dependencies). Catches errors that `error.tsx` cannot (root layout failures). Includes inline styles (no CSS imports).
- [ ] 503 maintenance page — static HTML file served by Nginx when PM2 is restarting. Self-contained (inline CSS, no external dependencies). Dark aesthetic matching the site. "We'll be right back" message + estimated return time. Nginx `error_page 502 503 /maintenance.html` directive.
- [ ] Pricing placeholder (3 routes: `/pricing/`, `/hr/cijene/`, `/de/preise/`) — headline + configurator-coming-soon message + €2,500 floor note + CTA to contact. Trilingual.
- [ ] Portfolio placeholder (3 routes: `/portfolio/`, `/hr/portfolio/`, `/de/portfolio/`) — headline + projects-coming-soon message + CTA to contact. Trilingual.
- [ ] Case study template (`/portfolio/[slug]/`) — DEFERRED (no content yet). Build when portfolio content arrives. Can use SSR for dynamic rendering.
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean, `npm run build` succeeds (expect ~373 routes). Phase 2 complete when all routes render.

---

## Phase 3: SEO Infrastructure

### Sprint 3.1: Meta, Structured Data & Build Output
**Depends on:** Phase 2 complete (all pages exist)
- [ ] SEO helpers in `src/lib/seo.ts`: `canonicalUrl()`, `buildAlternates()`, `buildPageMetadata()`, `buildBlogMetadata()`
- [ ] `metadataBase: new URL('https://version2.hr')` in root layout — OG images resolve to production domain
- [ ] Metadata on every page: unique `<title>`, `<meta name="description">`, OG tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), Twitter card tags
- [ ] Canonical URLs (`<link rel="canonical">`) on every page
- [ ] hreflang tags on every page (en, hr, de, x-default) — via Next.js `alternates.languages` in metadata
- [ ] JSON-LD structured data in `src/components/seo/json-ld.tsx`:
  - `LocalBusiness` + `WebSite` — on homepage (all 3 languages)
  - `Service` — on all 15 service pages (5 × 3 languages)
  - `BlogPosting` — on all blog post [slug] pages (3 language variants)
  - `BreadcrumbList` — on homepage, service pages, and blog posts (localized breadcrumb labels)
  - `CreativeWork` — DEFERRED (no portfolio case studies yet)
- [ ] Static pages use `export const metadata`, dynamic [slug] pages use `generateMetadata()`
- [ ] Postbuild verified: `sitemap.xml` (369 URLs), `robots.txt`, `search-index.json` (103 posts). Redirects handled by `next.config.ts`.
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean, `npm run build` succeeds (373 routes, 373 HTML pages). HTML output confirmed: canonical, hreflang (en/hr/de/x-default), OG tags with correct domain, Twitter cards, JSON-LD (Service, BlogPosting, LocalBusiness, WebSite, BreadcrumbList).

---

## Phase 4: Interactions & Visual Polish

### Sprint 4.1: Animation System
**Depends on:** Phase 2 complete (pages to animate)
- [ ] Animation components in `src/components/animations/` (5 components + index):
  - `ScrollReveal` — fade + directional slide on viewport enter (up/down/left/right/none), GSAP ScrollTrigger
  - `StaggerReveal` — staggers direct children entrance (configurable delay between), GSAP ScrollTrigger
  - `CounterAnimation` — animates number from 0 to target on scroll enter, prefix/suffix support
  - `TextReveal` — per-character/word/line GSAP SplitText animation, mount or scroll trigger
  - `CustomCursor` — minimalistic dot with GSAP quickTo interpolation, grows on interactive elements, click pulse, hidden on touch/mobile, mix-blend-difference
- [ ] All animation components respect `prefers-reduced-motion` via `useReducedMotion()` hook — renders immediately without animation
- [ ] Animations applied to existing components:
  - `HeroPlaceholder` — TextReveal chars on mount + ScrollReveal on CTAs
  - `ServicesTeaser` — StaggerReveal on card grid (100ms stagger)
  - `StatsStrip` — CounterAnimation on all 3 stats (100+, 100+, 5.0)
  - `Differentiators` — StaggerReveal on 3-column grid (150ms stagger)
  - `PageHero` — TextReveal words on mount + ScrollReveal on subtext
  - `CTAStrip` — ScrollReveal on entire block
- [ ] Custom cursor added to `LayoutShell` — global, desktop-only
- [ ] Section dark/light rhythm already established via alternating bg-sunken/bg-raised sections
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean, `npm run build` succeeds (373 routes). No CLS from animations (opacity/transform only, no layout-affecting properties).

### Sprint 4.2: 3D Hero
**Depends on:** Sprint 1.1 (R3F installed), Sprint 2.2 (homepage exists)
- [ ] R3F scene components in `src/components/scenes/` (3 files):
  - `hero-particles.tsx` — 800 particles (desktop), effect-based position generation for React 19 purity, smooth mouse-reactive rotation via refs
  - `hero-geometry.tsx` — 3 wireframe polyhedra (icosahedron/octahedron/dodecahedron), per-shape mouse lerping in useFrame
  - `hero-scene.tsx` — R3F Canvas wrapper, `detect-gpu` tier detection (high/medium/low), 4-light setup, mouse position via ref
- [ ] `Hero3D` client wrapper (`components/home/hero-3d.tsx`) — `next/dynamic` + `ssr: false`, atmospheric gradient fallback always visible, 3D scene fades in over 1s when Canvas reports ready, TextReveal + ScrollReveal on text overlay
- [ ] All 3 homepage routes (EN/HR/DE) updated from `HeroPlaceholder` → `Hero3D`
- [ ] Progressive loading: text + gradient render immediately, 3D scene overlays on top when ready
- [ ] Device adaptation: GPU tier → high (800 particles, geometry, antialias, 2x dpr), medium (480 particles), low (300 particles, no geometry, no antialias)
- [ ] `prefers-reduced-motion` skips 3D entirely (gradient-only fallback)
- [ ] V2 icon particle assembly + preloader — DEFERRED (needs V2 icon vector asset from owner)
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean, `npm run build` succeeds (373 routes)

### Sprint 4.3: Interactive Features
**Depends on:** Sprint 2.1 (layout shell), Sprint 1.3 (data layer)
- [ ] Interactive pricing tool — full 5-step wizard in `src/components/pricing/` (15+ components):
  - Calculation engine: `src/lib/calculate-estimate.ts` (pure function, all pricing rules)
  - Types: `src/types/pricing.ts` (WizardSelections, PricingEstimate, PricingConfig)
  - Steps 1-4: ProjectType → Scope → Design → Timeline with OptionCard UI, AnimatePresence transitions
  - Step 5 Summary: PriceDisplay + ChoicesSummary + expandable AddOnPanel (66 add-on options in 10 categories)
  - Add-on components: AddonToggle, QuantitySelector, MaintenancePicker, AddonSection, AddonPanel
  - State management: `use-wizard-state.ts` custom hook (all handlers, live estimate)
  - "Get Exact Quote" CTA encodes selections into contact URL query params
  - "Schedule a Call" links to contact with booking intent
  - Pricing pages (EN/HR/DE) updated from placeholder to full wizard
- [ ] Language switcher — already built in Sprint 2.1 (`src/components/layout/language-switcher.tsx`), resolves translation slugs from route map
- [ ] Analytics integration — `src/components/layout/analytics.tsx`:
  - GA4 (GT-NBBTZS5), Google Ads (AW-11213118615, AW-16539026255), Facebook Pixel (557616629917733)
  - Consent-gated via `useSyncExternalStore` + `hasAnalyticsConsent()`. Scripts unmount on consent revocation.
  - Added to LayoutShell
- [ ] FAB — `src/components/layout/fab.tsx`:
  - Fixed bottom-right, expandable with 3 actions: Contact (language-aware), WhatsApp, AI Chat (coming soon)
  - AnimatePresence stagger animation, close on outside click/ESC, z-[40]
  - Added to LayoutShell
- [ ] Cookie consent persistence — already built in Sprint 2.1 (localStorage, version field, footer re-open link, `hasAnalyticsConsent()` export)
- [ ] **Verify:** `tsc --noEmit` clean, `eslint .` clean, `npm run build` succeeds. Phase 4 complete when all interactions work at 60fps.

---

## Phase 5: Backend Platform (Consolidated into Next.js)

Backend is consolidated into the Next.js application via API Routes and Server Actions. No separate backend service.

### Sprint 5.1: Backend Foundation
**Can start in parallel with Phase 4** (same codebase — API routes + server actions)
- [ ] Database: SQLite via `better-sqlite3` + Drizzle ORM (WAL mode, foreign keys)
- [ ] 9-table schema in `src/db/schema.ts`: contacts, pricing_leads, bookings, career_apps, chat_conversations, chat_messages, analytics_events, blog_drafts, build_logs
- [ ] API route middleware pattern for auth (Bearer token validation in shared utility)
- [ ] Rate limiter utility with configurable windows per route group
- [ ] Security headers configured in `next.config.ts` `headers()` (CSP, X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy)
- [ ] Email service abstraction (console.log stub — provider TBD)
- [ ] Health check API route (`GET /api/health` — DB connectivity + uptime)
- [ ] **Verify:** `tsc --noEmit` clean, `npm run dev` serves API routes, health check responds at `/api/health`

### Sprint 5.2: Form Processing
**Depends on:** Sprint 5.1 (backend foundation)
- [ ] Contact form API route: `POST /api/contact` — Zod validation, honeypot (fake 200 for bots), DB insert, team notification email, 5/min rate limit
- [ ] Career application API route: `POST /api/career` — same pattern, portfolio URL + GitHub URL, 3/min rate limit
- [ ] Pricing tool API route: `POST /api/pricing` — server-side price recalculation from `content/pricing-config.json`, discrepancy logging, full config stored, 10/min rate limit
- [ ] Zod schemas: `src/schemas/contact.ts`, `career.ts`, `pricing.ts`
- [ ] Server-side calculate-estimate shared between API route and frontend (`src/lib/calculate-estimate.ts`)
- [ ] HTML notification email templates (`src/lib/notification-emails.ts`)
- [ ] Client IP extraction for audit trail (`src/lib/client-ip.ts`)
- [ ] Server Actions alternative for forms where appropriate (progressive enhancement)
- [ ] **Verify:** `tsc --noEmit` clean

### Sprint 5.3: Booking System
**Depends on:** Sprint 5.1 (backend foundation)
- [ ] Availability logic: Wed-Fri 14:00-17:00 CET, 4 slots/day (14:00, 14:45, 15:30, 16:15), 2-14 day advance window
- [ ] `GET /api/booking/slots` — returns available slots checking against existing bookings
- [ ] `POST /api/booking` — atomic check + insert, prevents double-booking, 5/min rate limit
- [ ] ICS calendar file generation (RFC 5545 VCALENDAR/VEVENT)
- [ ] Confirmation + notification emails with multilingual greetings
- [ ] Frontend booking widget: date grid (locale-aware), time slot selector, booking form, ICS download
- [ ] Booking widget embedded on contact page (all 3 languages)
- [ ] Google Calendar API integration — DEFERRED (needs service account credentials)
- [ ] 24h reminder cron job — DEFERRED (needs scheduler setup on deployment)
- [ ] **Verify:** `tsc --noEmit` clean, `npm run lint` clean, `npm run build` succeeds (373 routes)

### Sprint 5.4: CMS
**Depends on:** Sprint 5.1 (backend foundation)
- [ ] Blog post CRUD (auth-protected API routes):
  - `GET /api/cms/posts` — list with language filter
  - `GET /api/cms/posts/[id]` — full draft
  - `POST /api/cms/posts` — create
  - `PUT /api/cms/posts/[id]` — update
  - `DELETE /api/cms/posts/[id]` — delete
- [ ] CMS-triggered rebuild pipeline (`src/lib/build-pipeline.ts`):
  - Build lock (one at a time, 10-min stale timeout)
  - `child_process.exec('npm run build')` with 5-min timeout
  - PM2 restart to pick up new `.next/standalone/` build
  - Build log storage (stdout/stderr, duration)
  - Failure = previous build untouched (PM2 keeps running old process)
- [ ] Build API routes: `POST /api/cms/build` (async, returns build ID), `GET /api/cms/builds`, `GET /api/cms/builds/[id]`
- [ ] All CMS endpoints behind API key auth middleware
- [ ] Draft preview mode using Next.js `draftMode()`. Admin can preview unpublished blog posts at `/blog/[slug]?draft=true` with auth token. Renders the draft content as it would appear on the live site. Auth token validated via API key cookie set by `POST /api/cms/preview` endpoint. `draftMode().disable()` on `POST /api/cms/preview/exit`.
- [ ] Asset upload — DEFERRED (needs file storage setup)
- [ ] Image upload API — file upload endpoint, Sharp processing (resize, WebP conversion, thumbnails), storage in `/uploads/` directory. DEFERRED to post-launch.
- [ ] CMS admin UI — DEFERRED (build as needed, API-first)
- [ ] **Verify:** `tsc --noEmit` clean

### Sprint 5.5: AI Chat Agent
**Depends on:** Sprint 5.1 (backend foundation), Phase 2 complete
- [ ] RAG pipeline:
  - `scripts/build-rag-index.ts` — processes 207 documents (103 blog posts + pages), produces 638 chunks
  - Keyword-based TF-IDF search (title bonus, stop word filtering, language filter)
  - JSON file storage (`data/rag-chunks.json`)
- [ ] LLM abstraction (`src/lib/llm.ts`) — stub implementation returns helpful fallback (provider TBD)
- [ ] Chat API routes:
  - `POST /api/chat` — message handling, RAG context retrieval, LLM call, conversation storage, 30/min rate limit
  - `GET /api/chat/[conversationId]` — conversation history restoration
- [ ] Follow-up heuristic: flags urgent/high-value/human-request conversations, sends team notification
- [ ] Frontend chat UI in `src/components/chat/`:
  - `ChatWidget` — fixed overlay with motion animation, message list, input, session persistence
  - `ChatMessage` — user (red) / assistant (raised) bubbles
  - `ChatParts` — header, thinking indicator, input
  - FAB "AI Chat" opens live chat (no longer "coming soon")
- [ ] **Verify:** `tsc --noEmit` clean, `npm run lint` clean, `npm run build` succeeds (373 routes), RAG build produces 638 chunks

### Sprint 5.7: Parcel Tracking & Order Management
**Depends on:** Sprint 5.1 (backend foundation), Sprint 5.2 (form processing)
- [ ] Carrier scraper modules (Hrvatska Pošta, GLS, DPD) — parse tracking status from carrier websites. Each scraper returns normalized `{ status, location, timestamp, rawEvents[] }`.
- [ ] Tracking cache in SQLite — `orders` and `tracking_events` tables. Re-scrape only active (non-delivered) orders.
- [ ] Admin order management endpoints (CRUD + tracking code entry):
  - `GET /api/cms/orders` — list orders with status filter
  - `GET /api/cms/orders/[id]` — order detail with tracking history
  - `POST /api/cms/orders` — create order (from Stripe webhook)
  - `PUT /api/cms/orders/[id]` — update order (add tracking code, update status)
  - `DELETE /api/cms/orders/[id]` — cancel order
- [ ] Auto-email to customer when tracking code is entered — includes carrier name, tracking code, and link to `/tracking/`.
- [ ] Frontend tracking page at `/tracking/` (`/hr/pracenje/`, `/de/sendungsverfolgung/`) — order ID + email lookup, displays tracking timeline with status events. Trilingual.
- [ ] Spec: `docs/features/parcel-tracking.md`

### Sprint 5.6: Analytics Dashboard
**Depends on:** Sprint 5.1 (backend foundation)
- [ ] Collection endpoint: `POST /api/analytics/events` — batch event ingestion (1-50 events), 100/min rate limit
- [ ] Event types: page_view, click, scroll_depth, time_on_page, conversion
- [ ] Dashboard API (auth-protected):
  - `GET /api/analytics/dashboard/overview` — total views, unique sessions, top pages, conversions, avg scroll/time
  - `GET /api/analytics/dashboard/pageviews` — time-series data (day/week interval)
  - `GET /api/analytics/dashboard/conversions` — by conversion type
- [ ] Frontend tracker (`src/lib/analytics-tracker.ts`): 10s batch flush, sendBeacon for unload, sessionStorage session ID
- [ ] `AnalyticsTracker` component in LayoutShell — consent-gated (same gate as GA4), tracks page views, scroll depth, time on page
- [ ] Conversion tracking wired into contact form + pricing wizard
- [ ] **Verify:** `tsc --noEmit` clean, `npm run lint` clean, `npm run build` succeeds. Phase 5 complete.

---

## Phase 6: Integration, Testing & Launch

### Sprint 6.1: Integration & Quality Assurance
**Depends on:** Phases 2-5 complete

#### Build-Level QA
- [ ] HTML output: 373 pages verified
- [ ] Homepage SEO: hreflang (en/hr/de/x-default), OG tags (title/desc/image/url/type), Twitter cards, JSON-LD (LocalBusiness, WebSite, BreadcrumbList) — all present and correct
- [ ] Blog post metadata: 3 posts sampled, all have title, description, canonical, hreflang, BlogPosting + BreadcrumbList schemas
- [ ] Service page metadata: EN + HR verified, Service schema present, correct hrefLang
- [ ] Internal links from homepage: all 17 targets verified, zero broken
- [ ] Blog internal links: **477 broken links fixed** (Croatian slugs → English slugs across 107 files)
- [ ] Redirects verified: ~730 rules in `next.config.ts` `redirects()` confirmed working
- [ ] 404 page: proper content, nav links, dark aesthetic
- [ ] Sitemap: 369 URLs with hreflang alternates
- [ ] robots.txt: correct format with sitemap reference
- [ ] Stats section: fixed — now shows 100+/100+/5.0 in static HTML (was 0+/0+/0.0)
- [ ] `<html lang>` on HR/DE pages: fixed — SetLang client component updates attribute on hydration
- [ ] `CounterAnimation`: fixed — renders final value in HTML for SEO/no-JS, GSAP animates from 0 on client

#### Code Quality Requirements (from previous build lessons)
- [ ] Sentry error tracking configured (`sentry.client.config.ts` + `withSentryConfig` wrapper, DSN via env var)
- [ ] WebGL Error Boundary on Hero3D (catches R3F crashes, falls back to CSS gradient)
- [ ] Homepage preloader (brand moment, 800ms min, 4s timeout, once-per-session via sessionStorage)
- [ ] Image optimization script (Sharp, content images → WebP variants at 600w/1200w/1920w)
- [ ] Contact + Career forms wired to API routes (same-origin `/api/*` endpoints, no separate backend URL needed)
- [ ] FAQ JSON-LD schema on service pages (web-design + SEO, all 3 languages)
- [ ] Language fallback notice for untranslated blog posts (HR/DE routes show notice bar)

#### Known Pitfalls (catch these during build)
| Pitfall | Solution |
|---------|----------|
| Stats show 0 in static HTML | Render final value in SSR; GSAP animates from 0 on client |
| `<html lang="en">` on HR/DE pages | SetLang client component in sub-layouts |
| Blog internal links use Croatian slugs | Map Croatian directory slugs → English frontmatter slugs |
| Sentry tunnelRoute configuration | Enable `tunnelRoute` and `autoInstrumentServerFunctions: true` (standalone mode supports both) |
| No WebGL Error Boundary | Class component wrapping R3F Canvas with gradient fallback |
| Image optimizer as no-op | Implement Sharp-based prebuild script |
| Forms with mock submissions | Wire to same-origin `/api/*` routes or Server Actions |
| Service FAQs without schema | FaqJsonLd component on service pages with FAQ data |
| No language fallback notice | LanguageFallbackNotice component for HR/DE blog posts |

#### Requires Deployment / Manual Testing
- [ ] End-to-end flow testing (needs deployed server):
  - Contact form → API route → email → dashboard
  - Pricing tool → API route → email → dashboard
  - Booking → confirmation → calendar → reminder
  - AI Chat → RAG → response → conversation stored
  - CMS → edit → rebuild → live site updated
- [ ] Cross-browser testing:
  - Chrome, Firefox, Safari, Edge (latest desktop)
  - Chrome (Android), Safari (iOS), iPad
  - 3D/WebGL on all browsers (especially Safari)
- [ ] Accessibility audit:
  - Keyboard navigation (all interactive elements reachable, focus indicators visible)
  - Screen reader test (NVDA/VoiceOver on key flows: nav, forms, pricing tool)
  - Color contrast ratios (WCAG AA: 4.5:1 normal, 3:1 large)
  - Semantic HTML validation
- [ ] Performance audit:
  - Lighthouse 90+ on all page types (home, blog, service, legal)
  - Core Web Vitals green (LCP < 2.5s, INP < 200ms, CLS < 0.1)
  - Bundle size check (< 300KB gzipped for 3D pages, < 150KB for content pages)
  - WebGL memory: geometries/materials/textures disposed on unmount

### Sprint 6.2: Launch
**Depends on:** Sprint 6.1 (all tests pass)
- [ ] Final production build (`npm run build`)
- [ ] Verify build output:
  - `.next/standalone/` generated successfully
  - `sitemap.xml` contains all routes
  - `robots.txt` correct
  - ~730 redirect rules configured in `next.config.ts`
- [ ] Pre-deployment:
  - Backup current deployment on VPS
  - Verify Nginx config and PM2 ecosystem file
- [ ] Deploy to Hostinger VPS:
  - `git pull` + `npm run build` on VPS
  - `pm2 restart version2` to serve new standalone build
  - Verify subdomain Nginx server blocks untouched
  - Verify API health check endpoint responds
- [ ] Post-deploy verification (from `docs/migration-checklist.md`):
  - Homepage loads, all service pages accessible
  - Spot-check 10 random blog posts
  - Contact form submits successfully
  - Pricing tool works end-to-end
  - Language switching works (EN → HR → DE)
  - Subdomains still work (app, qr, web)
  - GA4 Real-Time shows incoming data
  - Facebook Pixel fires
  - Lighthouse 90+ on live homepage
- [ ] Search engine notification:
  - Submit new sitemap to Google Search Console
  - Request indexing of homepage

### Sprint 6.3: Post-Launch Monitoring (Ongoing)
- [ ] **Week 1:** Monitor Search Console daily for crawl errors, 404s
- [ ] **Weeks 2-4:** Monitor weekly. Fix any 404s. Check keyword rankings for top 10 terms.
- [ ] **Months 2-3:** Weekly check-ins. Compare traffic with WordPress baseline. Fine-tune AI Chat accuracy.
- [ ] Respond to user-reported issues
- [ ] Compare page speed scores with WordPress baseline

---

## Phase 7: Supporting Service Pages & Post-Launch Features

These pages are NOT required for launch. Build only if search demand justifies individual pages.

- [ ] 360 Virtual Tours dedicated page (with embedded demos)
- [ ] Digital Business Cards dedicated page (with customizer)
- [ ] Integrations dedicated page
- [ ] Maintenance dedicated page
- [ ] Optional: Ambient sound (off by default, toggle in menu) — deferred, not in v1
- [ ] Admin dashboard UI — frontend for CMS, analytics, order management, tracking. To be built after API-first backend is complete. Separate Sprint.

---

## Execution Summary

| Phase | Sprints | Depends On | Blocked By |
|---|---|---|---|
| **1. Foundation** | 1.1, 1.2, 1.3 | Nothing | Font selection (Sprint 1.2) |
| **2. Layout & Pages** | 2.1, 2.2, 2.3, 2.4, 2.5 | Phase 1 | Portfolio content (owner), client logos (owner) |
| **3. SEO** | 3.1 | Phase 2 | Nothing |
| **4. Interactions** | 4.1, 4.2, 4.3 | Phase 2 | Pricing model (owner — for 4.3) |
| **5. Backend (API routes)** | 5.1-5.7 | Sprint 5.1 only; can overlap with Phase 4 | LLM provider choice (for 5.5) |
| **6. Launch** | 6.1, 6.2, 6.3 | Phases 2-5 | Nothing |

**Parallelization opportunities:**
- Sprints 2.2 and 2.3 can run in parallel (independent page batches)
- Sprint 2.4 (blog) can start as soon as 2.1 is done
- Phase 5 (API routes/server actions) can start alongside Phase 4 (same codebase, independent features)
- Sprint 4.2 (3D hero) is independent of other Phase 4 work

---

## Reports Index

| Report | Location | Status |
|---|---|---|
| Brand discovery | `docs/brand-discovery.md` | Complete (master reference) |
| Page audit | `tasks/page-audit.md` | Complete |
| Internal links | `tasks/internal-links-report.md` | Complete |
| Blog tiering | `tasks/blog-tiering-report.md` | Complete |
| Blog curation manifest | `tasks/blog-curation-manifest.md` | Complete |
| Content rewrite plan | `tasks/content-rewrite-plan.md` | Complete |
| Redirect map | `tasks/redirect-map.md` | Complete (~730 rules, targets verified) |
| Filename normalization | `tasks/filename-normalization-manifest.md` | Complete |
| Client logo catalog | `tasks/client-logo-catalog.md` | Complete |
| Lessons learned | `tasks/lessons.md` | Ongoing |

---

## Blocked / Waiting on Owner

| Item | Needed For | Phase |
|---|---|---|
| Portfolio project screenshots, videos, testimonials | Portfolio page, homepage "Selected Work" | 2.2, 2.5 |
| 4-5 client logos for homepage | Homepage client logos section | 2.2 |
| ~~Pricing model~~ | ~~Interactive pricing tool~~ | ~~4.3~~ RESOLVED — `content/pricing-config.json` |
| Digital business card customizer options | Card customizer (if built) | 4.3 or 7 |
| LLM provider preference (Claude vs GPT) | AI Chat Agent | 5.5 |
| ~~Booking availability~~ | ~~Booking system~~ | ~~5.3~~ RESOLVED — Wed-Fri 14:00-17:00 CET |

## Design Decisions Still Needed

| Decision | Impact | When Needed |
|---|---|---|
| ~~Specific headline + body font pair~~ | ~~Every page, entire visual identity~~ | ~~Sprint 1.2~~ RESOLVED — Albert Sans + Manrope |
| ~~Exact surface color hex values (dark, light, neutral)~~ | ~~Every component, dark/light mode~~ | ~~Sprint 1.2~~ RESOLVED — see `docs/design/colors-tokens.md` and `src/styles/globals.css` |
| ~~Blog pagination style (load more vs. infinite scroll vs. numbered)~~ | ~~Blog listing UX~~ | ~~Sprint 2.4~~ RESOLVED — "Load More" button, 12 per batch, see `docs/components/features.md` |
| ~~i18n routing approach (explicit folders vs. [lang] param)~~ | ~~App router structure, DX~~ | ~~Sprint 1.3~~ RESOLVED — middleware-based routing (EN default no prefix, /hr/ and /de/ prefixed), see `decisions.md` |
