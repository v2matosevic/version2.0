# Lessons Learned

Rules and patterns discovered during the project. Every mistake becomes a rule that prevents the same mistake twice.

---

## Content Extraction

- **WordPress saves 404 pages as images.** When downloading images from WordPress and the URL returns a 404, WordPress serves its HTML error page — which gets saved with a .jpg/.webp extension. Always verify downloaded images with `file` command to confirm they're actual image data, not HTML.
- **Blog content was extracted text-only.** The original WordPress extraction captured markdown text and featured images but stripped all inline images. Blog posts on the live site have 3-6 images each; our markdown has zero. This is a known gap — inline images can be re-added during the blog rewrite phase.
- **WooCommerce products share identical descriptions.** All 21 digital business card products use the exact same feature description, differing only in name, color, and image. Don't duplicate this text 21 times in content files — store shared data once in products.json.
- **Product sitemap is the authoritative source for product data.** The `/product-sitemap.xml` contains every product URL, image URL, and i18n variant. Don't scrape individual product pages when the sitemap has structured data.

## Internal Links

- **EN/DE blog links still use HR slugs.** Many English and German blog posts have internal links where the URL path uses the Croatian slug instead of the translated slug (e.g., `/en/blog-sadrzaj-koji-ce-vam-donijeti-rezultate/` instead of translated English). These are technically the correct WordPress URLs (WordPress stored them this way), but they look wrong and need the redirect map to work properly.
- **Trailing slashes are inconsistent.** Some internal links have trailing slashes, some don't. Same URL appears both ways. Must normalize at build time — pick one style and redirect the other.
- **`/konzultacija/` page doesn't exist.** Three blog posts link to `/konzultacija/`, `/en/consultation/`, `/de/beratung/` — but no such page exists in our content. Need to create it or redirect to `/kontakt/`.
- **False positive: "malformed URLs" in zastita-wordpress-web-stranice.** The `http://` and `https://` patterns flagged by the link scanner are actually valid markdown inline code demonstrating SSL protocol change. Always verify grep hits in context before marking as broken.
- **Category pages are linked from blog posts.** `/category/drustvene-mreze` is referenced — these category URLs need redirect handling.

## URLs & Routing

- **Blog posts live at ROOT, not /blog/.** WordPress serves blog posts at `version2.hr/slug/`, NOT `version2.hr/blog/slug/`. This is a critical SEO constraint — 190 indexed URLs cannot be moved without 301 redirects. The Next.js app router needs `[slug]/page.tsx` at the root level.
- **Language flip breaks every URL.** Old site: Croatian at root, English at /en/, German at /de/. New site: English at root, Croatian at /hr/, German at /de/. Every single existing URL needs a redirect plan.
- **Internal links use full absolute URLs.** Blog posts link to other content using `https://version2.hr/...` absolute URLs, not relative paths. These need rewriting to match the new URL structure — either at build time or during content migration.

## MCP & Tooling

- **Windows bash mangles `/c` flag.** When running `claude mcp add` with `cmd /c` arguments, bash on Windows interprets `/c` as a path `C:/`. Fix: use `claude mcp add-json` with proper JSON args instead.
- **`.claude.json` gets modified by Claude Code itself.** The config file updates metrics between read and write operations, causing race conditions. Use `claude mcp remove` + `claude mcp add-json` CLI commands instead of direct file editing.
- **`og:image` meta tags are the reliable source for WordPress featured images.** The raw HTML `<head>` section always contains the correct image URL in the `og:image` meta property, even when the page content strips image references.

## Documentation

- **CLAUDE.md is a behavior guide, not a project wiki.** Don't turn it into a dumping ground for project-specific details (colors, analytics IDs, server config rules). Keep it focused on coding behavior rules. Project details go in `docs/`.
- **One source of truth per fact.** Don't duplicate information across docs. If the color palette is in `docs/design/colors-tokens.md`, other docs reference it — they don't restate it.
- **Mark decisions explicitly.** Every TBD goes in `decisions.md` with date opened. Every resolution gets recorded with date and reasoning. Don't leave ambiguity scattered across multiple docs.

## Content Data Files

- ~~**site-config.json and products.json use OLD URL structure.**~~ **RESOLVED.** site-config.json navigation URLs have been updated to new structure (EN at root, HR at `/hr/`). products.json no longer contains URLs (products have no dedicated routes).
- **products.json shares descriptions across 21 products.** All digital business card products use the same feature text. Don't duplicate — the shared data lives at the top level of products.json.
- **Slug collisions exist.** 6 blog posts have identical HR and EN slugs. 4 have triple collisions (all 3 languages same). These need special routing handling — EN gets root, HR gets `/hr/` prefix.

## Documentation

- **Docs that assume a decision drift when the decision is still OPEN.** sitemap.md, i18n.md, and redirect-map.md all wrote English-at-root as fact while decisions.md still marks it OPEN. Either formally resolve the decision or add "assumes option X" disclaimers to downstream docs.
- **Blog URL format appeared wrong in i18n.md table** (`/blog/slug/` instead of `/{slug}/`). The folder structure diagram in the same file was correct. Tables are easy to get wrong — always cross-check tables against the detailed sections below them.
- **Run parallel consistency checks.** Two independent agents found different issues. The overlap confirmed real problems; the unique finds in each caught things the other missed.

## URL Architecture

- **When you're already breaking every URL, break them properly.** The language flip (HR root -> EN root) already required 301 redirects for every existing URL. Adding the blog-to-/blog/ restructure on top had marginal additional SEO cost but massive architectural benefit: eliminated slug collisions, simplified Next.js routing, and enabled clean blog curation.
- **Blog curation saves more than SEO weight — it saves build complexity.** Dropping 87 of 190 posts means 87 fewer pages to render, template, translate, and maintain. The curated 103 posts are focused on the brand's actual expertise.
- **Slug rewrites compound with language flips.** When both the language prefix AND the slug change (e.g., `/seo-optimizacija-trazilice/` -> `/hr/seo/`), the redirect must handle the combined transformation. These can't be pattern-matched — they need individual rules.
- **The blanket `/en/` strip rule breaks when blog posts move to /blog/.** Previously, `/en/{slug}/` -> `/{slug}/` worked for blog posts. After moving to /blog/, EN blog posts need individual redirects because they need `/blog/` prefix added, not just `/en/` stripped. This doubled the redirect count for EN blog posts.

- **Language flip doesn't always mean redirect.** When old HR `/product/darkprism/` becomes new EN `/product/darkprism/` (same path, different language), no redirect is needed. The URL stays, the content language changes, and hreflang tags handle the rest. Don't create redirects for URLs that already match their new destination.

## AI Design Tooling

- **Figma MCP is overhead without a Figma-first workflow.** When building from brand docs + design system specs directly in code (no designer handing off Figma files), creating Figma mockups just to feed through MCP is backwards. Screenshot + prompt is faster and zero-setup. Revisit MCP if a designer joins or client projects need Figma-to-code pipelines.
- **Claude Code plugins stack.** For our interaction stack, install: `frontend-design` (Anthropic official), `gsap-scrolltrigger`, `react-three-fiber`, `motion-framer`, `locomotive-scroll` (all from `claude-design-skillstack` marketplace). These activate automatically when relevant.
- **CLAUDE.md aesthetics block eliminates AI slop.** Without explicit bans (no Inter, no purple gradients, no generic cards), Claude converges on the same generic output. The "Frontend Aesthetics" section in CLAUDE.md is the single highest-impact change for design quality.
- **Build section-by-section, not page-at-once.** Every AI coding tool (Claude, v0, Bolt, Lovable) produces better results when building individual sections with specific constraints than when generating an entire page.

## Standalone Mode (VPS)

- **Middleware, API routes, and SSR are now available.** The migration from `output: 'export'` to standalone mode on Hostinger VPS unlocks the full Next.js feature set: middleware, API routes, Server Actions, `cookies()`, `headers()`, rewrites/redirects in `next.config.ts`, and `next/image` optimization.
- **Subdomain folders must never be touched.** `app/`, `qr/`, `web/` directories on the VPS belong to other projects. Each runs as a separate service behind Nginx reverse proxy.
- **`useSearchParams` Suspense boundary is optional but recommended.** In standalone mode, Suspense is no longer required for `useSearchParams()` to build successfully. However, wrapping in Suspense still provides a better loading UX — use it when it makes sense, not as a build constraint.
- **Sentry `tunnelRoute` now works.** With standalone mode, rewrites and server instrumentation are fully supported. Enable `tunnelRoute` for ad-blocker bypass and `autoInstrumentServerFunctions: true` for server-side error tracking.
- **`generateStaticParams()` is optional but recommended for performance.** Pages with `generateStaticParams()` are pre-rendered at build time (faster first load). Pages without it use on-demand SSR. Use `generateStaticParams` for blog posts and other content-heavy pages; skip it for dynamic/personalized pages.
- **Nginx + PM2 manage the production process.** The standalone server runs via PM2 (`node .next/standalone/server.js`). Nginx handles SSL termination, static file serving, and reverse proxy to the Node.js process. PM2 handles restarts, log rotation, and cluster mode.
- **Backend is consolidated into Next.js.** No separate Hono server. API routes live in `src/app/api/`, Server Actions in `src/app/actions/`. This eliminates CORS configuration, port management, and deployment of a second process.

## Dev Server & Build

- **`dynamicParams` is now optional.** In standalone mode, pages without `generateStaticParams()` use on-demand SSR. Setting `dynamicParams = false` still works to return 404 for unknown slugs on statically generated routes, but it's no longer a build requirement. Use it as an intentional choice, not a constraint workaround.
- **Windows CRLF breaks regexes that use `\n`.** Content files on Windows have `\r\n` line endings. Gray-matter preserves them. Regex patterns matching line boundaries must use `[\r\n]` instead of `\n`. Caught when H1 stripping regex `/^\s*#\s+.+\n+/` failed on Windows — fixed to `/^\s*#\s+.+[\r\n]+/`.
- **Turbopack caches aggressively.** Changes to library files (e.g., `src/lib/parse-markdown.ts`) may not hot-reload in dev mode. Clear `.next/cache` or restart the dev server if changes don't take effect.
- **Headless Playwright doesn't trigger scroll or animations.** GSAP ScrollTrigger elements start at `opacity: 0` and are invisible in headless screenshots. Counter animations reset to `from` values before scroll triggers. This is expected behavior — not a real bug. Only trust headless screenshots for layout/structure, not for animated content.

## Dependency Version Traps

- **R3F follows React major versions.** R3F v8 = React 18, v9 = React 19. Since Next.js 16 ships React 19, you must use `@react-three/fiber` ^9 and `@react-three/drei` ^10. Installing v8 will fail with peer dependency errors.
- **Framer Motion was rebranded to Motion.** The `framer-motion` package still exists but is effectively deprecated. Install `motion` (not `framer-motion`). Imports change from `"framer-motion"` to `"motion/react"`. This is a find-and-replace migration.
- **`@gsap/react` is a separate install.** The `useGSAP` hook lives in `@gsap/react`, not in `gsap`. It's required for React 19 strict mode (handles animation cleanup on double-mount). Register it as a plugin: `gsap.registerPlugin(useGSAP)`.
- **Tailwind v4 has no JS config file.** The `tailwind.config.js`/`.ts` format is Tailwind v3. In v4, design tokens go in CSS via `@theme { ... }` in your global stylesheet. A `@config` compatibility layer exists but is not recommended. PostCSS plugin is `@tailwindcss/postcss` (not `tailwindcss`).
- **Lenis doesn't reset scroll on client navigation.** When navigating between pages via `<Link>`, Lenis keeps the scroll position. Add an explicit `useEffect` watching `usePathname()` that calls `lenis.scrollTo(0, { immediate: true })`.
- **Verify dependencies via Context7 at install time.** Training data drifts. Dependency versions, API shapes, and package names change. Always verify current state before installing.

## Documentation

- **Brand discovery is the master document.** After a comprehensive brand discovery session, `docs/brand-discovery.md` became the single source of truth for the entire project. All other docs (17 total) had to be aligned against it. When a discovery phase changes fundamental assumptions (URL structure, tech stack, backend architecture), every downstream doc must be audited.
- **Docs drift fast when decisions cascade.** One decision (e.g., "fully custom backend") invalidated content in 5+ docs (forms-and-integrations, content-management, pricing-tool, deployment, project-overview). Cascade checking is essential — resolve a decision, then grep for every doc that assumed the old answer.
- **Services moved under /services/[slug]/ after brand discovery.** The original sitemap had services at root level (/web-design/, /seo/). Brand discovery moved them under /services/. This means redirect targets in redirect-map.md need updating too — redirect targets are just URLs, and when URLs change, so do the targets.

## Homepage Analysis

- **WordPress content files survive extraction but rot silently.** The homepage `en.md`, `hr.md`, `de.md` were extracted from WordPress and appeared valid, but contained old agency messaging (dropped services, fake stats "473+ projects", social media/video/PPC references). Always audit content files against the current brand direction before building templates against them.
- **Parallel agents can resolve the same gap.** `site-config.json` footer legal links were flagged as incomplete and fixed by a parallel agent before this analysis could patch them. When multiple agents work concurrently, check shared files before editing — they may already be current.
- **Preloader accessibility is easy to miss.** A fixed overlay at z-100 that blocks the viewport needs keyboard handling: focus trapping, a skip button, and aria-live announcements. This applies to any modal-like overlay that appears before the main content.
- **Touch devices need explicit interaction alternatives.** Mouse parallax, particle attraction, and hover effects all need touch-specific handling documented before build. "It just won't work on mobile" isn't a spec — specify what DOES happen instead (gyroscope, auto-drift, full-color logos, active states).
- **CTA redundancy surfaces when you map the full vertical stack.** A dedicated CTA section + a footer CTA strip with near-identical copy creates awkward repetition. Map the full page vertically before building to catch this.
