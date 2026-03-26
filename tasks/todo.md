# Project Todo — Version2.hr Rebuild

Last updated: 2026-03-20

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

## Phase 1: Foundation (COMPLETE)

Clean slate. Build from scratch with full interaction stack.

**Page blueprints:** `docs/pages/` — 15 files covering all page types with exact sections, layouts, typography, animations, responsive behavior, data sources, and component mapping. Use as the build-ready reference for every page implementation.

### Sprint 1.1: Project Scaffold (COMPLETE)
- [x] Initialize Next.js 16 + TypeScript strict + Tailwind CSS v4
- [x] Configure `next.config.ts`: `output: 'standalone'`, `trailingSlash: true`, `images: { remotePatterns: [...] }`
- [x] Configure `next.config.ts` `redirects()` — ~730 redirect rules from redirect-map.md
- [x] Configure `next.config.ts` `rewrites()` — subdomain protection for `app/`, `qr/`, `web/`
- [x] Create `middleware.ts` for i18n routing — English default (no prefix), `/hr/` and `/de/` prefixed
- [x] Configure `tsconfig.json`: path aliases `@/*` → `./src/*`, `@content/*` → `./content/*`, strict mode
- [x] Set up ESLint 9 flat config (Next.js + TypeScript rules). Note: Next.js 16 uses `eslint .` (not `next lint`)
- [x] Install core dependencies (all versions verified)
- [x] Install content pipeline
- [x] Install form/validation
- [x] Install infra
- [x] Install dev deps
- [x] Create directory structure
- [x] Create `.env.example` template + `.gitignore`
- [x] Create placeholder build scripts (no-op until Sprint 1.3)
- [x] Set up Tailwind v4 CSS-first config with `@theme` (brand-red colors + font families)
- [x] Set up `postcss.config.mjs` with `@tailwindcss/postcss`
- [x] **Verified:** `npm run dev` starts, `npm run build` produces `.next/standalone/`, `npx tsc --noEmit` clean, `eslint .` clean

### Sprint 1.2: Design System (COMPLETE)
- [x] Fonts: Albert Sans (headline) + Manrope (body) via `next/font/google`
- [x] Color tokens finalized with WCAG AA verification
- [x] Tailwind v4 dark/light mode via CSS custom property cascading
- [x] Typography scale with `clamp()` viewport-relative sizing
- [x] Global CSS: base heading styles, focus rings, selection highlight, grain texture, easing curves, reduced-motion
- [x] UI primitives built: Button, SmartLink, Container, Section, Card, Badge, Input, Textarea
- [x] Kitchen-sink `/dev/` page
- [x] Flash prevention: inline `<script>` in `<head>` reads localStorage before first paint
- [x] **Verified**

### Sprint 1.3: Data Layer (COMPLETE)
- [x] TypeScript types in `src/types/`
- [x] Markdown parser pipeline: `parse-markdown.ts`, `parse-blog-post.ts`
- [x] Data loaders: pages, blog posts (103 curated), products, site config
- [x] i18n system: routing config, translations, UI strings (~120 keys × 3 languages)
- [x] Build-time generators: sitemap, robots.txt, search-index.json
- [x] Blog metadata cleanup and internal link URL rewriting
- [x] Postbuild lifecycle script
- [x] **Verified**

---

## Phase 2: Layout & Pages (COMPLETE)

### Sprint 2.1: Layout Shell (COMPLETE)
- [x] Root layout, language layouts, shared hooks, SVG icons
- [x] Header with scroll behavior, Menu with focus trap, Footer with CTA strip
- [x] Lenis smooth scroll, page transitions, cookie consent
- [x] Skip-to-content, semantic HTML, ThemeToggle, LanguageSwitcher
- [x] **Verified**

### Sprint 2.2: Content Pages — Batch 1 (COMPLETE)
- [x] Shared page section components: PageHero, CTAStrip, ContentSection
- [x] Homepage with Hero3D, ServicesTeaser, Differentiators, StatsStrip, Selected Work, CTA strip
- [x] About, Contact, Career pages — all trilingual
- [x] **Verified**

### Sprint 2.3: Content Pages — Batch 2 (COMPLETE)
- [x] Accordion UI component, Services Overview, 5 individual service pages, Analysis page
- [x] All trilingual with FAQ accordions where applicable
- [x] 21 route wrappers (7 pages x 3 languages)
- [x] **Verified**

### Sprint 2.4: Blog System (COMPLETE)
- [x] Fuse.js search, 8 blog components (BlogCard, CategoryFilter, BlogSearch, BlogListingContent, BlogPostContent, TableOfContents, ShareButtons, RelatedPosts)
- [x] Blog listing + post pages (3 x [slug] routes), prose styling, search index
- [x] 103 blog posts rewritten in HR and DE to match EN quality (206 files updated)
- [x] **Verified**

### Sprint 2.5: Legal, Utility & Remaining Pages (COMPLETE)
- [x] LegalPageContent shared component, 6 legal pages x 3 languages (18 routes)
- [x] 404, error.tsx, global-error.tsx, 503 maintenance page
- [x] Pricing page with full interactive wizard (replaced placeholder)
- [x] Portfolio page with case study data (6 projects)
- [x] 7 missing page translations created (ai-integracija, e-trgovina, izjava-o-pristupacnosti, karijera, pravna-obavijest, uvjeti-koristenja, web-aplikacije)
- [x] **Verified**

---

## Phase 3: SEO Infrastructure (COMPLETE)

### Sprint 3.1: Meta, Structured Data & Build Output (COMPLETE)
- [x] SEO helpers in `src/lib/seo.ts`: `canonicalUrl()`, `buildAlternates()`, `buildPageMetadata()`, `buildBlogMetadata()`
- [x] `metadataBase` in root layout, metadata on every page (title, description, OG, Twitter)
- [x] Canonical URLs and hreflang tags on every page
- [x] JSON-LD structured data: LocalBusiness, WebSite, Service, BlogPosting, BreadcrumbList
- [x] Static pages use `export const metadata`, dynamic pages use `generateMetadata()`
- [x] Postbuild verified: sitemap.xml, robots.txt, search-index.json
- [x] **Verified**

---

## Phase 4: Interactions & Visual Polish (COMPLETE)

### Sprint 4.1: Animation System (COMPLETE)
- [x] Animation components: ScrollReveal, StaggerReveal, CounterAnimation, TextReveal, CustomCursor
- [x] All respect `prefers-reduced-motion`
- [x] Applied to homepage sections: Hero, ServicesTeaser, StatsStrip, Differentiators, PageHero, CTAStrip
- [x] Custom cursor in LayoutShell (desktop-only)
- [x] **Verified**

### Sprint 4.2: 3D Hero (COMPLETE)
- [x] R3F scene components: hero-particles, hero-geometry, hero-scene
- [x] Hero3D client wrapper with progressive loading and GPU tier adaptation
- [x] All 3 homepage routes use Hero3D, reduced-motion fallback
- [x] V2 icon SVGs received and moved to content/assets/brand/
- [x] **Verified**

### Sprint 4.3: Interactive Features (COMPLETE)
- [x] Interactive pricing tool — full 5-step wizard with 66 add-on options
- [x] Analytics integration (GA4, Google Ads, Facebook Pixel) — consent-gated
- [x] FAB with Contact, WhatsApp, AI Chat actions
- [x] **Verified**

---

## Phase 5: Backend Platform (COMPLETE)

Backend consolidated into the Next.js application via API Routes and Server Actions. No separate backend service.

### Sprint 5.1: Backend Foundation (COMPLETE)
- [x] SQLite + Drizzle ORM (WAL mode, foreign keys), 9-table schema
- [x] Auth middleware (timing-safe Bearer token), rate limiter, security headers
- [x] Zoho SMTP email via nodemailer (branded HTML templates)
- [x] Health check API route
- [x] No dev key fallback in production
- [x] **Verified**

### Sprint 5.2: Form Processing (COMPLETE)
- [x] Contact, Career, Pricing API routes with Zod v4 validation, honeypot, rate limiting
- [x] Server-side price recalculation, notification emails, client IP extraction
- [x] **Verified**

### Sprint 5.3: Booking System (COMPLETE)
- [x] Availability logic, slot API, atomic booking with double-book prevention
- [x] ICS calendar generation, confirmation/notification emails
- [x] Frontend booking widget on contact page (all 3 languages)
- [ ] Google Calendar API integration — DEFERRED (needs service account credentials)
- [ ] 24h reminder cron job — DEFERRED (needs scheduler setup on deployment)
- [x] **Verified**

### Sprint 5.4: CMS (COMPLETE)
- [x] Blog post CRUD (auth-protected API routes)
- [x] CMS-triggered rebuild pipeline with build lock, PM2 restart, build log storage
- [x] Build API routes, all CMS endpoints behind auth middleware
- [x] Draft preview mode using Next.js `draftMode()`
- [x] Admin dashboard UI built (10 pages) — no longer deferred
- [ ] Asset upload — DEFERRED (needs file storage setup)
- [ ] Image upload API — DEFERRED to post-launch
- [x] **Verified**

### Sprint 5.5: AI Chat Agent (COMPLETE)
- [x] RAG pipeline: 638 chunks from 207 documents, TF-IDF search with language filtering
- [x] Z.AI GLM-4.5 with function calling (OpenAI-compatible API)
- [x] Chat API routes with conversation storage, follow-up heuristic
- [x] Frontend chat UI: ChatWidget, ChatMessage, ChatParts — FAB opens live chat
- [x] **Verified**

### Sprint 5.7: Parcel Tracking & Order Management (COMPLETE)
- [x] Carrier scraper modules (Hrvatska Posta, GLS, DPD) with normalized status output
- [x] Tracking cache in SQLite, admin order management CRUD endpoints
- [x] Auto-email to customer when tracking code entered
- [x] Frontend tracking page (trilingual)
- [x] Spec: `docs/features/parcel-tracking.md`

### Sprint 5.6: Analytics Dashboard (COMPLETE)
- [x] Collection endpoint, event types, dashboard API (auth-protected)
- [x] Frontend tracker with batch flush, sendBeacon, sessionStorage session ID
- [x] AnalyticsTracker in LayoutShell (consent-gated), conversion tracking wired
- [x] **Verified**

---

## Next Steps (2026-03-20)

All functionality is built. The application runs on localhost with all features working. Next steps before launch:

### Design Phase — Visual Polish
- [ ] Go page by page following `docs/design/` specs and `tasks/design-prompts.md`
- [ ] Screenshot self-correction workflow for each section
- [ ] Make every component feel premium — the site IS the portfolio
- [ ] Portfolio listing and case study pages need full visual treatment
- [ ] Homepage sections need refinement against design prompts

### Pre-Deployment
- [ ] Configure production `.env` on VPS (Z.AI key, Zoho SMTP, admin token, Sentry DSN)
- [ ] Set up Nginx config for version2.hr (see `docs/setup/deployment-strategy.md`)
- [ ] Set up PM2 ecosystem file
- [ ] Deploy to Hostinger VPS
- [ ] Verify subdomain services (app/, qr/, web/) still work

### Post-Deployment QA
- [ ] End-to-end flow testing (forms, booking, chat, CMS rebuild)
- [ ] Cross-browser testing
- [ ] Lighthouse audit (target 90+)
- [ ] Submit sitemap to Google Search Console

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
- [x] Admin dashboard UI — 10-page dashboard with auth (CMS, analytics, orders, bookings, chat, builds). COMPLETE.

---

## Execution Summary

| Phase | Sprints | Status |
|---|---|---|
| **1. Foundation** | 1.1, 1.2, 1.3 | COMPLETE |
| **2. Layout & Pages** | 2.1, 2.2, 2.3, 2.4, 2.5 | COMPLETE |
| **3. SEO** | 3.1 | COMPLETE |
| **4. Interactions** | 4.1, 4.2, 4.3 | COMPLETE |
| **5. Backend** | 5.1-5.7 + Admin + Security | COMPLETE |
| **Design Phase** | Page-by-page polish | NEXT |
| **6. Launch** | 6.1, 6.2, 6.3 | PENDING (after design) |

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

| Item | Needed For | Phase | Status |
|---|---|---|---|
| ~~Portfolio project screenshots~~ | ~~Portfolio page~~ | ~~2.5~~ | RESOLVED — 6 case studies documented |
| 4-5 client logos for homepage | Homepage client logos section | Design phase | Still needed |
| ~~Pricing model~~ | ~~Interactive pricing tool~~ | ~~4.3~~ | RESOLVED — `content/pricing-config.json` |
| Digital business card customizer options | Card customizer (if built) | 7 | Deferred |
| ~~LLM provider~~ | ~~AI Chat Agent~~ | ~~5.5~~ | RESOLVED — Z.AI GLM-4.5 |
| ~~Booking availability~~ | ~~Booking system~~ | ~~5.3~~ | RESOLVED — Wed-Fri 14:00-17:00 CET |
| Google Calendar service account | Booking calendar sync | Post-launch | Deferred |
| VPS production `.env` file | Deployment | 6.2 | Needed before deploy |

## Design Decisions Still Needed

| Decision | Impact | When Needed |
|---|---|---|
| ~~Specific headline + body font pair~~ | ~~Every page, entire visual identity~~ | ~~Sprint 1.2~~ RESOLVED — Albert Sans + Manrope |
| ~~Exact surface color hex values (dark, light, neutral)~~ | ~~Every component, dark/light mode~~ | ~~Sprint 1.2~~ RESOLVED — see `docs/design/colors-tokens.md` and `src/styles/globals.css` |
| ~~Blog pagination style (load more vs. infinite scroll vs. numbered)~~ | ~~Blog listing UX~~ | ~~Sprint 2.4~~ RESOLVED — "Load More" button, 12 per batch, see `docs/components/features.md` |
| ~~i18n routing approach (explicit folders vs. [lang] param)~~ | ~~App router structure, DX~~ | ~~Sprint 1.3~~ RESOLVED — middleware-based routing (EN default no prefix, /hr/ and /de/ prefixed), see `decisions.md` |
