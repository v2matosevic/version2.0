# Documentation Index

Source of truth for the Version2.hr website rebuild. These are living documents — update them as the project evolves.

## Rules

1. **Update docs when decisions are made.** Don't let docs go stale.
2. **Mark decisions in `decisions.md`.** Every open question logged, every resolution recorded.
3. **Don't duplicate.** Each piece of information lives in one place. Other docs reference it.
4. **Keep it honest.** Uncertain = "TBD". Changed = updated. No outdated info.

---

## Company & Brand

| Doc | What It Covers |
|---|---|
| [brand-discovery.md](brand-discovery.md) | Master reference — identity, visual mood, technical stack, site structure, backend platform |
| [VERSION2-COMPANY-PROFILE.md](VERSION2-COMPANY-PROFILE.md) | Identity, positioning, differentiators, target market |
| [brand-voice.md](brand-voice.md) | Tone, copy rules, banned words, examples |
| [services.md](services.md) | All services, pricing approach, what's dropped |

## Design System (`docs/design/`)

| Doc | What It Covers |
|---|---|
| [design/colors-tokens.md](design/colors-tokens.md) | Color palette, Tailwind v4 theme tokens, dark/light mode, CSS strategy |
| [design/typography.md](design/typography.md) | Albert Sans + Manrope specs, type scale, clamp values, weight rules, line-height |
| [design/layout-spacing.md](design/layout-spacing.md) | Spacing scale, container widths, grid system, breakpoints, responsive behavior |
| [design/animation.md](design/animation.md) | GSAP tokens, Motion transitions, Lenis defaults, stagger timing, reduced motion |
| [design/imagery.md](design/imagery.md) | Image treatment, noise/grain overlays, gradients, aspect ratios |
| [design/polish.md](design/polish.md) | Shadows, z-index scale, focus states, performance constraints |

## Page Blueprints (`docs/pages/`)

| Doc | What It Covers |
|---|---|
| [pages/_conventions.md](pages/_conventions.md) | Grid notation, type shorthand, color tokens, animation shorthand, data dependency + structured data summaries |
| [pages/_globals.md](pages/_globals.md) | Header (4 scroll states), menus, FAB, cookie consent, page transitions, footer, custom cursor |
| [pages/homepage.md](pages/homepage.md) | 9 sections: Preloader → 3D Hero → Services → Portfolio → Logos → Differentiators → Testimonials → CTA → Footer |
| [pages/services-overview.md](pages/services-overview.md) | 5 core service bands (alternating asymmetric) + supporting grid + process strip |
| [pages/service-detail.md](pages/service-detail.md) | Hero → What We Build → How We Work → Tech → Related Portfolio → FAQ → CTA |
| [pages/portfolio-listing.md](pages/portfolio-listing.md) | Large typographic project rows with hover previews |
| [pages/portfolio-case-study.md](pages/portfolio-case-study.md) | Overview → Screenshots → Live Site → Testimonial → Metrics → More Projects |
| [pages/blog-listing.md](pages/blog-listing.md) | Hero + search → Category filter → Post grid (3-col, 12/batch) → Load more |
| [pages/blog-post.md](pages/blog-post.md) | Sticky TOC sidebar → Prose spec → Tags → Share → Related → CTA |
| [pages/pricing.md](pages/pricing.md) | Step indicator → 4-step wizard → Summary + customizer (66 options) |
| [pages/contact.md](pages/contact.md) | Choose Your Path → Contact Form → Booking → Map |
| [pages/about.md](pages/about.md) | Studio story → Values → Stats strip → Tech stack → Client logos → Location |
| [pages/career.md](pages/career.md) | What It's Like → Junior Dev Position → Application Form → Open Door |
| [pages/analysis.md](pages/analysis.md) | What We Analyze (5 areas) → What You Get → Analysis Form |
| [pages/legal.md](pages/legal.md) | Shared template for Privacy, Terms, Cookies, Impressum, Refund, Accessibility |

## Components (`docs/components/`)

| Doc | What It Covers |
|---|---|
| [components/layout.md](components/layout.md) | Header, Footer, Navigation, Mobile Menu, FAB, Cookie Consent |
| [components/sections.md](components/sections.md) | Hero variants, CTA bands, Stats strip, Testimonial carousel, Process strip |
| [components/features.md](components/features.md) | Pricing wizard, Contact form, Booking widget, Blog search, Portfolio hover |
| [components/ui-primitives.md](components/ui-primitives.md) | Buttons, inputs, cards, tags, loaders, accordions, modals, toasts |
| [components/registry.md](components/registry.md) | Complete component registry: file paths, usage, props |

## Features (`docs/features/`)

| Doc | What It Covers |
|---|---|
| [features/form-architecture.md](features/form-architecture.md) | Shared form architecture: validation, submission, error handling, honeypot, rate limiting |
| [features/form-specs.md](features/form-specs.md) | Per-form specs: Contact, Pricing, Booking, Career, Analysis, AI Chat |
| [features/integrations.md](features/integrations.md) | Analytics (GA4, Ads, Pixel), cookie consent, font loading, maps, social embeds |

## Backend (`docs/backend/`)

| Doc | What It Covers |
|---|---|
| [backend/api-contracts.md](backend/api-contracts.md) | All API endpoints, request/response schemas, error codes, rate limiting |
| [backend/data-security.md](backend/data-security.md) | Database schema, authentication, CORS, encryption, GDPR compliance |
| [backend/operations.md](backend/operations.md) | Email, monitoring, backup, rollback, env vars, booking lifecycle, CMS pipeline |

## Setup & Development (`docs/setup/`)

| Doc | What It Covers |
|---|---|
| [setup/dependencies.md](setup/dependencies.md) | Prerequisites, package list, R3F/GSAP/Lenis/Motion patterns, version constraints |
| [setup/config.md](setup/config.md) | next.config.ts, Tailwind CSS config, tsconfig, env vars, standalone mode features |
| [setup/workflow.md](setup/workflow.md) | Git conventions, scripts, generators, build pipeline, deployment workflow |

## Architecture & Technical (standalone)

| Doc | What It Covers |
|---|---|
| [build-strategy.md](build-strategy.md) | Build philosophy, 7-layer approach, file structure, i18n routing, risk reduction |
| [project-overview.md](project-overview.md) | Stack, standalone mode, constraints, key features |
| [content-structure.md](content-structure.md) | Content directory map, frontmatter schemas, data shapes |
| [design-reference-audit.md](design-reference-audit.md) | Competitive visual analysis of 6 premium dark studio sites |
| [interactive-pricing-tool.md](interactive-pricing-tool.md) | Pricing wizard spec, calculation logic, 66-option config |

## Routing & SEO

| Doc | What It Covers |
|---|---|
| [sitemap.md](sitemap.md) | Every route mapped, redirects, blog URL structure |
| [seo-migration-strategy.md](seo-migration-strategy.md) | Dropped pages, blog tiers, URL preservation |
| [blog-content-strategy.md](blog-content-strategy.md) | Blog system spec: content strategy, SEO architecture, filtering, portfolio integration, new content plan |

## Internationalization

| Doc | What It Covers |
|---|---|
| [i18n.md](i18n.md) | Language strategy, URL flip, hreflang, routing architecture, translations |

## Operations

| Doc | What It Covers |
|---|---|
| [deployment.md](deployment.md) | Build process, VPS deployment, Nginx, DNS/CDN, staging, rollback |
| [migration-checklist.md](migration-checklist.md) | Pre-migration, migration day, post-migration checklists |
| [performance.md](performance.md) | Core Web Vitals, image optimization, accessibility |

## Project Management

| Doc | What It Covers |
|---|---|
| [decisions.md](decisions.md) | All open questions and resolved decisions with dates |
| [content-management.md](content-management.md) | How content is added/edited post-launch |
| [content-audit.md](content-audit.md) | Issues found in extracted content, stats, action items |

## Task Reports (`tasks/`)

| Report | What It Covers |
|---|---|
| [todo.md](../tasks/todo.md) | Master project tracker (7 phases, ~21 sprints) |
| [lessons.md](../tasks/lessons.md) | Patterns and rules from mistakes |
| [design-prompts.md](../tasks/design-prompts.md) | Section-specific build prompts and screenshot workflow |
| [page-audit.md](../tasks/page-audit.md) | Every page classified for new site |
| [internal-links-report.md](../tasks/internal-links-report.md) | 206 unique internal URLs mapped |
| [blog-tiering-report.md](../tasks/blog-tiering-report.md) | 190 posts classified by relevance |
| [redirect-map.md](../tasks/redirect-map.md) | Complete URL redirect mapping (~730 rules) |
| [blog-curation-manifest.md](../tasks/blog-curation-manifest.md) | 103 kept, 87 dropped posts with redirect targets |
| [blog-metadata-cleanup.md](../tasks/blog-metadata-cleanup.md) | HR/DE metadata migration spec (category, tags, lastModified) |
| [filename-normalization-manifest.md](../tasks/filename-normalization-manifest.md) | Asset rename plan (~68 files) |
| [client-logo-catalog.md](../tasks/client-logo-catalog.md) | 64 duplicate logos mapped for cleanup |
