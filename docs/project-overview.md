# Project Overview

## What This Is

A complete rebuild of version2.hr from WordPress/Elementor to a custom Next.js application. The current site is a digital marketing agency website. The new site repositions Version2 as a web development studio.

This is not a redesign. It is a new product built on new technology with a new brand direction.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime:** React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **3D / WebGL:** React Three Fiber (R3F)
- **Animation:** GSAP (timelines, scroll triggers, per-character effects), Motion (component animation, page transitions — package: `motion`, import from `motion/react`)
- **Smooth Scroll:** Lenis
- **Output:** Standalone mode (`output: 'standalone'` in next.config.ts)
- **Backend:** Consolidated into Next.js API routes and Server Actions (forms, pricing, booking, AI chat, CMS, analytics, parcel tracking)
- **Package manager:** npm
- **Hosting:** Hostinger VPS (Nginx reverse proxy + PM2 process manager)
- **Version control:** Git + GitHub (account: v2matosevic)

## Getting Started

See `docs/setup/` for setup instructions and `docs/build-strategy.md` for the implementation approach.

## Why Standalone Mode on VPS

The site runs on a Hostinger VPS as a Node.js application in Next.js standalone mode. Nginx handles SSL termination and static asset serving. PM2 manages the Node.js process (restarts, logs, cluster mode).

Standalone mode enables the full Next.js feature set: SSR, API routes, middleware, Server Actions, `next/image` optimization, and Incremental Static Regeneration. The backend is consolidated into Next.js API routes and Server Actions — no separate server framework, no CORS, no dual deployment.

The migration from static export to standalone was driven by the need for middleware (i18n routing), API routes (eliminating the separate Hono backend), image optimization, and reduced architectural complexity. Content-heavy pages (blog posts, services) use `generateStaticParams()` for build-time pre-rendering; dynamic pages use on-demand SSR.

## Constraints

### Subdomain Services
Three subdomains run as separate services on the VPS behind Nginx:
- `app/` (app.version2.hr)
- `qr/` (qr.version2.hr)
- `web/` (web.version2.hr)

These must never be overwritten or deleted during deployment. Each has its own Nginx server block.

### URL Preservation
Every existing WordPress URL must map 1:1 to a Next.js route or redirect. This is a hard requirement for SEO. The site has 190 blog posts and 20+ pages indexed by Google. Redirects are handled natively via `next.config.ts` `redirects()`.

### Multi-Language
Three languages: English (root, primary), Croatian (`/hr/`), German (`/de/`). Implemented via folder-based routing.

## Content Source

All content is pre-extracted from the WordPress site into `content/`. See `content-structure.md` for the full data model. The Next.js app reads from these files at build time.

## Key Features (New Site)

1. **Interactive pricing tool** — real-time car-configurator-style project estimator
2. **Portfolio with case studies** — curated client work with embedded live sites, tech details, results
3. **Blog** — 103 curated blog posts (87 dropped with 301 redirects), new content strategy focused on web dev and AI
4. **Multi-language** — English (root), Croatian (/hr/), German (/de/)
5. **Contact + custom booking system** — form, meeting scheduling, calendar integration, automated reminders
6. **AI Chat Agent** — custom-built AI assistant for client questions, support, and lead capture
7. **Digital business cards** — product page with live card customizer tool
8. **360° virtual tours** — product page with embedded interactive demos
9. **Career page** — junior dev / mentorship recruitment with application form
10. **SEO** — technical SEO, structured data, sitemap, analytics integration
