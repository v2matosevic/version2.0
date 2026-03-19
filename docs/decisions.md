# Decision Log

Track all open questions and resolved decisions. Update this as the project progresses.

## Format

```
### [OPEN/RESOLVED] Decision Title
**Date opened:** YYYY-MM-DD
**Date resolved:** YYYY-MM-DD (if resolved)
**Context:** Why this decision matters
**Options:** What we considered
**Decision:** What we chose and why
```

---

## Open Decisions

### [RESOLVED] Transactional Email Provider
**Date opened:** 2026-02-26
**Date resolved:** 2026-03-19
**Context:** The backend needs a transactional email provider for contact form receipts, booking confirmations/reminders, career acknowledgments, pricing estimate summaries, and parcel tracking notifications (~5-6 templates, <100 emails/month at launch).
**Options:** (1) Resend (2) Postmark (3) Brevo (4) Zoho Mail SMTP
**Decision:** Zoho Mail via SMTP. Owner already uses Zoho email for the business. Send via `nodemailer` with Zoho SMTP credentials (host, port, user, password provided by owner as environment variables). No third-party email API needed — direct SMTP connection.
**Implementation:** `sendEmail()` utility using `nodemailer` with Zoho SMTP transport. Credentials stored in environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.

---

## Resolved Decisions

### [RESOLVED] RSS Feed
**Date opened:** 2026-02-26
**Date resolved:** 2026-03-19
**Context:** 103 curated blog posts could benefit from an RSS feed.
**Options:** (1) Yes — auto-generate `feed.xml`. (2) No — skip it.
**Decision:** No. Not needed. Can be added later if demand arises.

### [RESOLVED] NFC Card E-Commerce + App Integration
**Date opened:** 2026-03-19
**Date resolved:** 2026-03-19
**Context:** NFC card sales need an ordering flow on version2.hr and automatic provisioning of digital card profiles on app.version2.hr.
**Options:** (1) Stripe checkout on version2.hr + API call to app.version2.hr for account creation. (2) Redirect customers to app.version2.hr for the entire purchase flow. (3) Unified checkout on a single domain.
**Decision:** Stripe checkout on version2.hr + API call to app.version2.hr for account creation. Keeps ordering on the main site, digital card profiles on the existing app. Connected via authenticated API (`POST app.version2.hr/api/create-account` with shared API key in environment variables). Physical card shipped with parcel tracking. See `docs/features/integrations.md` for full integration spec.

### [RESOLVED] Homepage Header State Detection
**Date opened:** 2026-03-06
**Date resolved:** 2026-03-06
**Context:** The header transitions between transparent (over hero) and solid (scrolled past hero). Need a method to detect when the hero section exits the viewport.
**Options:** (1) `scrollY` math against hero element height, (2) Static `100vh` assumption, (3) Intersection Observer on the hero section.
**Decision:** Intersection Observer on `#hero` section. Fires exactly once per transition. Handles dynamic viewport heights (mobile browser chrome), doesn't require measuring, and naturally returns `false` on non-homepage pages where `#hero` doesn't exist (header starts solid). See `docs/pages/homepage-analysis.md` Section 3.

### [RESOLVED] Homepage Footer CTA Strip
**Date opened:** 2026-03-06
**Date resolved:** 2026-03-06
**Context:** The footer has an optional CTA strip ("Have a project? Let's talk.") but the homepage already has a dedicated CTA section (Section 7) with nearly identical copy, creating redundancy.
**Decision:** Disable the footer CTA strip on the homepage via `<Footer showCTAStrip={!isHomepage} />`. The strip remains active on interior pages (blog, services, about, etc.) where there's no dedicated CTA section above the footer.

### [RESOLVED] Homepage 3D Hero Touch Interaction
**Date opened:** 2026-03-06
**Date resolved:** 2026-03-06
**Context:** The 3D hero uses mouse parallax and particle attraction, which don't work on touch devices.
**Decision:** On touch devices (`pointer: coarse`): disable mouse parallax and particle attraction. Replace camera parallax with DeviceOrientation API (gyroscope-based subtle camera drift). If gyroscope unavailable or permission denied, fall back to automatic sine wave drift (0.1 unit amplitude, 8s period). Never prompt for gyroscope permission unprompted — only after user interaction. See `docs/pages/homepage-analysis.md` Section 5.2.

### [RESOLVED] Homepage Light Mode Sections
**Date opened:** 2026-03-06
**Date resolved:** 2026-03-06
**Context:** The homepage blueprint only specifies dark mode backgrounds. Light mode needs equivalent section mapping.
**Decision:** Hero and footer are ALWAYS dark (forced via `data-theme="dark"` on their containers). All other sections inherit the global mode. Light mode backgrounds: base=#F5F0EB, sunken=#EDE8E3, raised=#FAF7F4. Grain overlay reduces to opacity 0.025 on light backgrounds. See `docs/pages/homepage-analysis.md` Section 2.

### [RESOLVED] Pricing → Contact Handoff Transport
**Date opened:** 2026-03-06
**Date resolved:** 2026-03-06
**Context:** The pricing summary's "Get Exact Quote" CTA links to `/contact/` with the visitor's selections. Two options for transporting the data: URL params or sessionStorage.
**Options:** (1) URL params — shareable but very long with 66 potential options. (2) sessionStorage — clean URL but dies on tab close and can't be shared.
**Decision:** sessionStorage for the full selection data (stored under key `v2_pricing_selections`). The contact form reads this on mount, pre-fills the message, and shows a "Based on your estimate" banner. For shareability, a separate compact URL scheme encodes only the 4 wizard steps into a short `?c={base64}` param (see pricing blueprint). This gives clean contact URLs + shareable estimate links as two distinct features.

### [RESOLVED] Pricing Tool Print/PDF
**Date opened:** 2026-02-26
**Date resolved:** 2026-03-06
**Context:** The pricing tool generates a detailed estimate. Visitors may want to save or share this with decision-makers. A downloadable PDF summary adds professionalism.
**Options:** (1) Yes — client-side PDF generation from the summary view using `html2pdf.js` or `jsPDF`. (2) No — visitors can screenshot or bookmark.
**Decision:** Yes. Client-side PDF generation using `jsPDF`. The summary view contains all the data. "Download PDF" button on the summary step. PDF includes: Version2 logo, estimate reference ID, all selections, price breakdown (one-time + monthly + yearly), estimated timeline, baseIncludes list, disclaimer, and contact info. Branded dark background with red accent. Built in Layer 6 (interaction polish) after the wizard UI exists from Layer 4.

### [RESOLVED] OG Image Strategy
**Date opened:** 2026-02-26
**Date resolved:** 2026-03-02
**Context:** Every page needs an Open Graph image for social sharing previews. 103 blog posts make manual image creation impractical.
**Options:** (1) Static per-page images — designed in Figma. (2) Dynamic generation at build time using Satori.
**Decision:** Dynamic at build time using Satori. Generate 1200x630 OG images from a branded template (dark background, Albert Sans headline, brand red accent, Version2 logo) during `npm run build`. Static custom images only for homepage and key landing pages. Satori template designed in Sprint 1.2, generator script built in Sprint 1.3.

### [RESOLVED] Error Tracking Provider
**Date opened:** 2026-02-26
**Date resolved:** 2026-02-27
**Context:** Both frontend and backend need error tracking to catch production issues early. The site uses R3F/WebGL which can fail silently on certain devices — error tracking is essential, not optional.
**Options:** (1) Sentry — industry standard, generous free tier (5K errors/month), source map support, Next.js SDK. (2) Self-hosted alternative (GlitchTip, Highlight.io) — more control, more operational overhead.
**Decision:** Sentry. Free tier covers this project's scale for years. Mature Next.js SDK (`@sentry/nextjs`) with source map support. Install during Sprint 1.1 (project scaffold). Configure with Error Boundary wrappers around R3F Canvas components.

### [RESOLVED] i18n Routing Approach
**Date opened:** 2026-02-23
**Date resolved:** 2026-02-26
**Updated:** 2026-03-19 — Updated for standalone mode with middleware-based language detection.
**Context:** Next.js App Router needs a routing strategy for 3 languages where page slugs differ by language (e.g., `/services/web-design/` vs `/hr/usluge/web-dizajn/` vs `/de/dienstleistungen/web-design/`). The parent segment itself changes across languages, not just the leaf slug.
**Options:** (1) Dynamic `[lang]` parameter — single route file per page, language as a parameter. (2) Explicit folders — separate route files for each language, thin wrappers calling shared templates. (3) Third-party i18n library (next-intl, next-i18next) — library manages routing.
**Decision:** Explicit folders with middleware-based language detection. English is the default language with NO URL prefix (root). Croatian gets `/hr/` prefix, German gets `/de/` prefix. There is no `/en/` in any URL. The language-specific parent segments (`services` vs `usluge` vs `dienstleistungen`) make a `[lang]` parameter unworkable. Third-party libraries assume a `[locale]` prefix pattern that doesn't match this URL architecture. Route files are thin wrappers (5-15 lines) that declare a language and pass content to shared template components. A central `i18n-config.ts` maps route IDs to paths per language. Next.js middleware handles language detection: no prefix = English, `/hr/` = Croatian, `/de/` = German. For first-time visitors, middleware reads the `Accept-Language` header and redirects to the preferred language. `generateStaticParams` is optional (standalone mode supports on-demand SSR). See `docs/build-strategy.md` and `docs/i18n.md` for full architecture.

### [RESOLVED] Font Selection
**Date opened:** 2026-02-25
**Date resolved:** 2026-02-25
**Context:** Needed specific font pair for the dual-font system. Requirements: thin/minimalistic headline font + readable body font, both with Latin Extended (Croatian diacritics), open-source, variable font support.
**Options:** (1) Albert Sans + Manrope, (2) Saira + Albert Sans, (3) Archivo + Manrope, (4) Outfit + Albert Sans
**Decision:** Albert Sans (headlines, weight 300 default) + Manrope (body, weight 400 default). Albert Sans brings Scandinavian precision at thin weights on dark backgrounds. Manrope is screen-optimized with high x-height for readability. Both are variable fonts — use CSS custom properties to increase weight +25 units in light mode for optical consistency (light text on dark renders heavier, so dark mode uses base weights; light mode bumps up). Self-hosted via `next/font`.

### [RESOLVED] Pricing Tool Configuration
**Date opened:** 2026-02-25
**Date resolved:** 2026-02-25
**Context:** Interactive pricing tool needs concrete price data. Market research produced initial EU-competitive rates, owner requested ~20% reduction for better accessibility while maintaining premium positioning.
**Decision:** Complete pricing config at `content/pricing-config.json`. Base ranges: websites €2,500-25,000, webshops €6,500-35,000, web apps €8,000-58,000. 66 configurable options across 10 categories, 3 design multipliers (1.0x-1.25x), 3 timeline options (0.95x-1.35x). Minimum floor €2,500. All prices are ranges, never fixed numbers. Reduced ~40% from initial EU market research for Croatian market positioning.

### [RESOLVED] Booking Availability
**Date opened:** 2026-02-25
**Date resolved:** 2026-02-25
**Context:** Booking system needs availability parameters.
**Decision:** Wednesday, Thursday, Friday. 14:00-17:00 CET. 30-minute slots with 15-minute buffer between meetings. Advance booking window: 2-14 days (no same-day, no more than 2 weeks out). See `features/form-specs.md` for full spec.

### [RESOLVED] JSON-LD Schema Types
**Date opened:** 2026-02-25
**Date resolved:** 2026-02-25
**Context:** brand-discovery.md listed Organization as root schema; seo-migration-strategy.md listed LocalBusiness. Need a unified decision.
**Decision:** LocalBusiness as root schema (includes Organization properties + address/contact for Zadar office). Full set: LocalBusiness, WebSite, Service, BlogPosting, Product (digital business cards), BreadcrumbList, CreativeWork (portfolio case studies). Both docs aligned.

### [RESOLVED] Pricing Tool UX
**Date opened:** 2026-02-25
**Date resolved:** 2026-02-25
**Context:** 66 configurable options risk overwhelming visitors in a long wizard. Need to balance simplicity with depth.
**Decision:** Simple-first, detailed on demand. 4 quick wizard steps (Project Type → Scope → Design → Timeline) produce an instant estimate. Summary page has an expandable "Customize your estimate" panel with all 66 options in 10 collapsible categories. Casual visitors get a number in 30 seconds. Detailed buyers toggle add-ons and watch the price update live. Both paths end at the same CTA.

### [RESOLVED] Color Palette
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Context:** Current brand uses deep red (#991717) and blue accent (#0c4da2). Repositioning to premium web dev studio.
**Decision:** Evolve the palette. Keep the red as a foundation but shift toward more muted, sophisticated tones. Expand the neutral range for premium positioning. The red is distinctive — refine it, don't replace it.

### [RESOLVED] Typography
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Context:** Current font is Nunito (rounded, friendly). Premium positioning needs something sharper.
**Decision:** Dual-font system. Albert Sans (headlines, weight 300 default) + Manrope (body, weight 400 default). Both variable fonts with Latin Extended support (Croatian diacritics). Self-hosted via `next/font`. Dark mode weight adjustment (~15% lighter on weight axis for optical consistency). Nunito retired. See also: Font Selection decision (2026-02-25).

### [RESOLVED] Dark Mode
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Context:** Dev studio sites commonly use dark themes. Red palette behaves differently on dark vs light backgrounds.
**Decision:** Both modes. System preference detection on first visit + manual toggle. Design both light and dark variants of every component.

### [RESOLVED] Form Backend
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Updated:** 2026-03-19 — Consolidated into Next.js API routes after VPS migration.
**Context:** ~~Static export means no API routes.~~ Migrated to standalone mode on VPS — API routes and Server Actions are now available.
**Decision:** Backend consolidated into Next.js API routes (`src/app/api/`) and Server Actions. No separate Hono server. No third-party form services. Handles contact forms, pricing tool submissions, consultation bookings, AI chat (RAG), analytics, CMS rebuild pipeline, and parcel tracking. The Hono decision (below) is superseded. See `docs/features/` and `docs/deployment.md` for full spec.

### [RESOLVED] Client Showcase Selection
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Context:** Old site showcases agency-era clients (social media, photography). New site needs web development work.
**Decision:** Owner will provide new web dev client projects to showcase. Design the showcase section and populate when content is provided.

### [RESOLVED] WooCommerce Product Pages
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Context:** 21 digital business card products (NFC cards, €29.99 each, identical descriptions, differ by color/design). 63 indexed URLs.
**Decision:** Drop most products, keep one dynamic design. The digital business card product line will be repurposed significantly — details deferred to a later phase. Redirect old product URLs to the digital business cards page for now.

### [RESOLVED] Gallery Page Fate
**Date opened:** 2026-02-23
**Date resolved:** 2026-02-23
**Context:** Gallery page has 46 photography images from the dropped photography service. "Version2 Media" branding is old identity.
**Decision:** Drop entirely. 301 redirect gallery URLs to references page. Photography content is not carried forward.

### [RESOLVED] Catalog Page Purpose
**Date opened:** 2026-02-23
**Date resolved:** 2026-02-23
**Context:** Catalog page offers "Gotovi Dizajni" (ready-made templates), conflicting with "no templates, custom code only" positioning.
**Decision:** Drop entirely. 301 redirect catalog URLs to services page. Templates messaging has no place in the new brand.

### [RESOLVED] Language URL Structure
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Updated:** 2026-03-19 — Clarified: English has NO prefix (no `/en/`). Middleware handles Accept-Language detection.
**Context:** WordPress uses Croatian at root, English at /en/. New site wants English at root. This affects 190+ indexed URLs.
**Decision:** English at root with NO prefix (e.g., `version2.hr/blog/slug/`), Croatian at `/hr/` (e.g., `version2.hr/hr/blog/slug/`), German at `/de/` (e.g., `version2.hr/de/blog/slug/`). There is NO `/en/` in any URL. The `hreflang` `x-default` points to the unprefixed English URL. The language flip is accepted as a one-time SEO cost justified by the business pivot to international web development. Every old Croatian root URL gets a 301 redirect to `/hr/` equivalent. Every old `/en/` URL gets a 301 to the unprefixed root equivalent. Next.js middleware detects language from the URL path and handles `Accept-Language` header detection for first-time visitors. See `sitemap.md` for complete route map and `tasks/redirect-map.md` for implementation.

### [RESOLVED] Blog Post URL Structure
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Context:** WordPress blog posts live at root level (/slug/), not under /blog/. Moving them to /blog/slug/ would break 190 indexed URLs.
**Decision:** Blog posts move to `/blog/[slug]/`. This eliminates all slug collisions, simplifies Next.js routing, and enables clean blog curation. The SEO cost is accepted as part of the larger URL restructure (language flip already breaks every URL). Combined with blog curation (87 of 190 posts dropped), this creates a clean, focused content structure. See `sitemap.md` and `tasks/blog-curation-manifest.md`.

### [RESOLVED] Blog Curation
**Date opened:** 2026-02-23
**Date resolved:** 2026-02-23
**Context:** 190 blog posts exist, many covering dropped services (social media, PPC, video). Migrating all posts dilutes the web development studio positioning.
**Decision:** Keep 103 posts (88 Tier 1 core + 15 Tier 2 adjacent). Drop 87 posts (12 Tier 2 + 62 Tier 3 + 13 case studies). Dropped posts get 301 redirects to `/blog/` listing. Content directories are preserved in `content/blog/` but excluded from the build. See `tasks/blog-curation-manifest.md` for the definitive keep/drop list and `tasks/blog-tiering-report.md` for the classification methodology.

### [RESOLVED] WordPress Category Pages
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Context:** WordPress has indexed category pages (`/category/web-dizajn/`, `/category/seo/`, etc.).
**Decision:** Redirect to `/blog/?category=<new-category>` where a matching new category exists. Categories that no longer exist (social media, video) redirect to plain `/blog/`. See `sitemap.md` for category mapping.

### [RESOLVED] Missing Consultation Page
**Date opened:** 2026-02-23
**Date resolved:** 2026-02-23
**Context:** Three blog posts link to `/konzultacija/`, `/en/consultation/`, `/de/beratung/` — pages that never existed.
**Decision:** Redirect to contact page. `/konzultacija/` -> `/hr/kontakt/`, `/en/consultation/` -> `/contact/`, `/de/beratung/` -> `/de/kontakt/`.

### [RESOLVED] Analiza (Free Analysis) Page Fate
**Date opened:** 2026-02-23
**Date resolved:** 2026-02-23
**Context:** The `/analiza/` page offers a free website analysis — a strong lead-gen tool aligned with the web development studio positioning.
**Decision:** Keep and refresh. Routes: `/analysis/` (EN), `/hr/analiza/` (HR), `/de/analyse/` (DE). Update copy for web dev focus, integrate with contact form backend.

### [RESOLVED] site-config.json Default Language
**Date opened:** 2026-02-23
**Date resolved:** 2026-02-23
**Context:** `site-config.json` has `defaultLanguage: "hr"` but the site is now English-first.
**Decision:** Update `defaultLanguage` to `"en"` and flip all navigation URLs to new structure. Also update `products.json` URLs. **Implemented 2026-03-06:** site-config.json fully restructured (header/menu split, branding tokens, all URLs flipped). products.json restructured with i18n support and URLs removed.

### [RESOLVED] Blog Inline Images
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-23
**Context:** Blog posts were feared to reference inline images from `wp-content/uploads/`. 13 featured images were corrupted (HTML saved as .jpg).
**Decision:** All 13 corrupted featured images re-downloaded from WordPress og:image meta tags. Inline images were never extracted — blog markdown is text-only. Inline images can be re-added during blog rewrite phase.

### [RESOLVED] Duplicate Asset Consolidation
**Date opened:** 2026-02-23
**Date resolved:** 2026-02-23
**Context:** Client logos duplicated across 6 page directories (66 copies). Asset filenames inconsistent.
**Decision:** One-time cleanup. Deleted 66 duplicate client logo files + 18 flag icons + 6 empty `tr` files. Renamed ~68 files to lowercase kebab-case. See `tasks/client-logo-catalog.md` and `tasks/filename-normalization-manifest.md`.

### [RESOLVED] Framework Choice
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-22
**Updated:** 2026-03-19 — Migrated from static export to standalone mode.
**Decision:** Next.js 16 + TypeScript + Tailwind CSS v4 with standalone mode (`output: 'standalone'`). Originally static export — migrated to standalone to enable SSR, API routes, middleware, image optimization, and backend consolidation.

### [RESOLVED] Hosting Strategy
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-22
**Updated:** 2026-03-19 — Migrated from Hostinger Cloud (shared) to Hostinger VPS.
**Decision:** Hostinger VPS with Nginx reverse proxy + PM2 process manager. Next.js runs in standalone mode (`node .next/standalone/server.js`). Nginx handles SSL termination, static asset serving, and proxying to the Node.js process. Subdomain folders (app/, qr/, web/) run as separate services behind Nginx — must never be touched. Rationale: enables SSR, API routes, middleware, `next/image` optimization, and eliminates the need for a separate backend server.

### [RESOLVED] VPS Migration
**Date opened:** 2026-03-19
**Date resolved:** 2026-03-19
**Context:** Static export on Hostinger shared hosting prevented use of SSR, API routes, middleware, image optimization, and required a separate Hono backend. The architecture split increased complexity (CORS, dual deployment, port management) without benefit.
**Options:** (1) Stay on shared hosting with static export + separate backend. (2) Move to Vercel (frontend) + keep backend on Hostinger. (3) Move to Hostinger VPS with Next.js standalone mode, consolidating frontend and backend.
**Decision:** Hostinger VPS with Nginx + PM2. Next.js standalone mode consolidates the entire application — frontend SSR, API routes, Server Actions, image optimization — into a single Node.js process. Subdomains (app/, qr/, web/) protected via separate Nginx server blocks. Rationale: eliminates the Hono backend, removes CORS complexity, enables the full Next.js feature set, keeps everything on one provider, and simplifies deployment to a single `git pull + build + pm2 restart` workflow.

### [RESOLVED] Service Pivot
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-22
**Decision:** Drop social media, PPC, video, photography as standalone services. Keep web dev, web apps, digital business cards, 360 tours, SEO, maintenance. See `services.md`.

### [RESOLVED] Package System
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-22
**Decision:** Replace fixed packages with interactive pricing tool. No more Simple/Professional/E-Commerce/Premium tiers.

### [RESOLVED] Primary Language
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-22
**Decision:** English first. Croatian and German secondary. Site copy written in English, translated to HR and DE.

### [RESOLVED] Blog Search Library
**Date opened:** 2026-02-26
**Date resolved:** 2026-03-02
**Context:** Client-side blog search needs a fuzzy search library. Options: Fuse.js (JS library, fuzzy matching, ~6KB) or Pagefind (Rust-based, builds its own index, ~15KB).
**Decision:** Fuse.js. Lightweight, well-tested, sufficient for 103 posts. Search index generated at build time (~80-150KB JSON depending on content preview length), lazy-loaded on first search focus. Weighted keys: title 0.4, excerpt 0.3, tags 0.15, contentPreview 0.15. Threshold 0.3, max 8 results.

### [RESOLVED] Markdown Parser
**Date opened:** 2026-02-26
**Date resolved:** 2026-03-02
**Context:** Blog posts and pages are stored as markdown with YAML frontmatter. Need a parser pipeline for build-time HTML generation.
**Decision:** gray-matter (frontmatter extraction) + unified ecosystem (remark-parse → remark-rehype → rehype-stringify → rehype-highlight for syntax highlighting). No MDX — blog posts are pure markdown, no interactive components needed. The pipeline is synchronous and deterministic.

### [RESOLVED] Backend Server Framework
**Date opened:** 2026-02-26
**Date resolved:** 2026-03-02
**Superseded:** 2026-03-19 — Backend consolidated into Next.js API routes after VPS migration.
**Context:** The Node.js backend needs an HTTP framework for API endpoints.
**Original decision:** Hono (`@hono/node-server`).
**Current decision:** Superseded. Backend is now consolidated into Next.js API routes and Server Actions. No separate server framework needed. Hono is no longer a dependency.

### [RESOLVED] Icon Library
**Date opened:** 2026-02-25
**Date resolved:** 2026-03-02
**Context:** The site needs a consistent icon set for navigation, services, and UI elements.
**Decision:** Lucide React (`lucide-react`). Tree-shakeable, consistent stroke-width, 1400+ icons, active maintenance. Covers all needed icons: menu, close, chevrons, social media, mail, phone, arrows, etc.

### [RESOLVED] WhatsApp Integration
**Date opened:** 2026-03-02
**Date resolved:** 2026-03-02
**Context:** WhatsApp is listed as a contact method in the FAB and booking system.
**Decision:** Simple wa.me click-to-chat link (https://wa.me/385995617706). No WhatsApp Business API in v1. The link opens WhatsApp with the Version2 number pre-filled. For booking confirmations, email is the primary channel.

### [RESOLVED] Analysis Page Functionality
**Date opened:** 2026-03-02
**Date resolved:** 2026-03-02
**Context:** The /analysis/ page is a lead-generation tool offering free website audits.
**Decision:** Manual review workflow. Visitor submits website URL + contact info. Version2 manually reviews the site and emails a personalized audit. The page describes what gets checked (performance, SEO, design, security, content) but runs no automated tools. Form submits to POST /api/contact with type: "analysis" to distinguish from regular contact.

### [RESOLVED] German Address Form
**Date opened:** 2026-03-02
**Date resolved:** 2026-03-02
**Context:** German-language copy needs a formal (Sie) or informal (du) address form.
**Decision:** Informal "du" address. Matches the brand's "corporate but fun" personality. Standard in the tech/startup sector for German-speaking markets.

### [RESOLVED] WordPress for New Projects
**Date opened:** 2026-02-22
**Date resolved:** 2026-02-22
**Decision:** No more WordPress for new client projects. All new builds use modern frameworks and custom code. Can still manage/redesign existing WordPress client sites.
