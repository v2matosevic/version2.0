# Deployment

## Target

Hostinger VPS with Nginx reverse proxy + PM2 process manager. Next.js runs in standalone mode (`node .next/standalone/server.js`). Nginx handles SSL termination, static asset serving, and proxying to the Node.js process.

## Architecture Overview

Single deployment target on the Hostinger VPS:

1. **Next.js standalone server** — handles SSR, API routes, Server Actions, middleware, image optimization, and static asset serving. Managed by PM2.
2. **Nginx** — reverse proxy, SSL termination, static asset caching, subdomain routing.

Subdomains (`app/`, `qr/`, `web/`) run as separate static sites behind Nginx server blocks.

## Build Process

```bash
npm run build
```

This runs `next build` with `output: 'standalone'` and generates a self-contained Node.js server in `.next/standalone/`. Pre-rendered pages, API routes, middleware, and redirects are all included.

## Deploy Process

1. SSH into VPS or push via Git
2. `git pull` latest code
3. `npm ci && npm run build`
4. `pm2 restart version2` (or `pm2 start .next/standalone/server.js --name version2`)
5. Verify live site

### What Gets Deployed

The `.next/standalone/` directory contains:
- Self-contained Node.js server (`server.js`)
- Pre-rendered pages and SSR routes
- API routes and Server Actions
- Middleware (i18n language detection, redirects)
- Static assets (copied from `.next/static/` and `public/`)

### What Must NOT Be Touched

Subdomain directories served by separate Nginx server blocks:
- `/var/www/version2.hr/subdomains/app/` (app.version2.hr)
- `/var/www/version2.hr/subdomains/qr/` (qr.version2.hr)
- `/var/www/version2.hr/subdomains/web/` (web.version2.hr)

## Redirects

~730 WordPress migration redirects are handled natively by `next.config.ts` `redirects()`. No `.htaccess` needed. See `tasks/redirect-map.md` for the complete redirect map.

Nginx handles edge cases:
- Subdomain routing (app/, qr/, web/ to their own directories)
- WordPress infrastructure blocks (wp-admin, xmlrpc.php → 403)
- Security headers and HTTPS enforcement

## Backend

The backend is consolidated into Next.js API routes (`src/app/api/`) and Server Actions. No separate backend server or framework.

### What the Backend Handles
- Form submissions (contact, pricing tool, career applications)
- Pricing tool engine (configurator logic, price calculations)
- Scheduling/booking system (calendar API integration, availability, reminders)
- AI chat agent (conversation storage, LLM API calls, context management)
- Blog CMS (content management, triggers rebuild)
- Custom analytics dashboard (page visits, clicks, scroll depth, conversions)
- Email notifications (booking confirmations, reminders, form receipts)

### Deployment
Backend deploys with the frontend — a single `npm run build && pm2 restart version2` deploys everything. No separate deployment step needed.

## CMS-Triggered Rebuilds

When content is edited in the custom CMS, it can trigger either ISR revalidation or a full rebuild.

### Workflow (ISR — Preferred for Single Content Updates)

1. Owner writes or edits content in the CMS dashboard
2. CMS saves content to the `content/` directory (markdown + frontmatter)
3. CMS calls `revalidatePath('/blog/[slug]')` or `revalidateTag('blog')` via a Server Action
4. Next.js re-renders the affected pages on the next request
5. No full rebuild needed — instant content updates

### Workflow (Full Rebuild — For Structural Changes)

1. Owner makes structural changes (new pages, URL changes, config updates)
2. CMS triggers `npm run build && pm2 restart version2` on the VPS
3. Full rebuild generates all pre-rendered pages + standalone server
4. PM2 restarts the Next.js process with zero downtime

### Implementation Details

- **Trigger:** CMS save action calls an internal API route (not exposed publicly)
- **ISR path:** `revalidatePath()` or `revalidateTag()` — preferred for content updates (blog posts, page edits)
- **Full rebuild:** `child_process.exec('npm run build', { cwd: '/path/to/project' })` with timeout (5 minutes max), followed by `pm2 restart version2`
- **Locking:** Only one build at a time. Subsequent saves queue and trigger a single build after the current one completes
- **Logging:** Build stdout/stderr saved for debugging. Last 10 build logs accessible from CMS dashboard
- **Fallback:** If build fails, the current running server continues serving. CMS shows error with build log
- **Manual rollback:** Git-based: `git checkout <previous-commit> && npm run build && pm2 restart version2`

## DNS & CDN

### Cloudflare Configuration

Cloudflare serves as DNS proxy and CDN for `version2.hr`.

**SSL:** Full (Strict) mode — encrypts traffic between visitors and Cloudflare, and between Cloudflare and the VPS. Requires a valid SSL certificate on the VPS (Let's Encrypt via certbot).

**Caching rules:**
- **HTML pages:** `Cache-Control: no-cache` — Cloudflare still caches but revalidates on every request. Ensures content updates from CMS rebuilds are visible immediately.
- **CSS/JS (`_next/static/`):** `Cache-Control: public, max-age=31536000, immutable` — 1 year cache. Safe because Next.js hashes filenames on every build.
- **Images (`/images/`):** `Cache-Control: public, max-age=31536000` — 1 year cache with hash-busted filenames from the build-time optimization script.
- **API routes (`/api/*`):** Cloudflare Page Rule to bypass cache entirely. API responses must never be cached at the CDN layer.

**Cloudflare Page Rules:**
1. `version2.hr/api/*` — Cache Level: Bypass, SSL: Full (Strict)
2. `version2.hr/_next/static/*` — Cache Level: Cache Everything, Edge TTL: 1 month
3. `version2.hr/images/*` — Cache Level: Cache Everything, Edge TTL: 1 month

### DNS Records

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `version2.hr` | Hostinger VPS IP | Proxied (orange cloud) |
| CNAME | `www` | `version2.hr` | Proxied |
| CNAME | `staging` | `version2.hr` | Proxied |
| MX | `version2.hr` | Mail provider MX records | DNS only |
| TXT | `version2.hr` | SPF record (see `backend/operations.md`) | DNS only |
| TXT | `_dmarc.version2.hr` | DMARC record | DNS only |
| CNAME/TXT | DKIM selector | Provider-specific (added after email provider chosen) | DNS only |

Subdomain DNS for `app.version2.hr`, `qr.version2.hr`, and `web.version2.hr` already exists and must not be changed.

---

## Staging Environment

### Setup

- **Subdomain:** `staging.version2.hr`
- **Server directory:** Separate directory on VPS (`/var/www/version2.hr/staging/`)
- **Environment variables:** Different `NEXT_PUBLIC_SITE_URL` (`https://staging.version2.hr`) and `PORT` (3002 for staging)
- **Backend:** Runs on a different port with a separate SQLite database file. Shares the same codebase but isolated data.

### Access Control

Password-protected via Nginx basic auth on the staging server block:

```nginx
location / {
    auth_basic "Staging";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://127.0.0.1:3002;  # Staging runs on different port
}
```

This prevents search engines from indexing staging and keeps work-in-progress private. Additionally, add `X-Robots-Tag: noindex` header and a `robots.txt` with `Disallow: /` on the staging subdomain.

### Use Cases

- Owner review before production deploys
- Testing CMS rebuild pipeline without affecting production
- QA on new features and design changes
- Verifying redirect rules before going live

### Deploy to Staging

Same build process as production, different port and env vars:

1. Build with staging env vars: `NEXT_PUBLIC_SITE_URL=https://staging.version2.hr npm run build`
2. Start on a different port: `PORT=3002 pm2 start .next/standalone/server.js --name version2-staging`
3. Verify at `staging.version2.hr`

---

## Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] All service pages accessible
- [ ] Blog posts load at /blog/ (spot check 5-10 random posts)
- [ ] Old blog URLs redirect correctly (root -> /hr/blog/, old /en/ -> /blog/ with no prefix)
- [ ] Images loading (check hero images, blog featured images)
- [ ] Navigation works (all links, mobile menu)
- [ ] Contact form functional (submissions reach backend)
- [ ] Booking system works (date selection, confirmation emails)
- [ ] AI Chat Agent responds (opens, answers questions, conversations stored)
- [ ] Pricing tool configurator calculates and submits correctly
- [ ] 3D/WebGL hero loads on desktop (Chrome, Firefox, Safari, Edge)
- [ ] 3D scene degrades gracefully on mobile / low-end devices
- [ ] Career page accessible with working application form
- [ ] Multi-language switching works (EN at root, /hr/, /de/)
- [ ] Subdomain sites still work (app.version2.hr, qr.version2.hr, web.version2.hr)
- [ ] Google Analytics firing (check real-time in GA4)
- [ ] Facebook Pixel firing
- [ ] Backend API endpoints responding (health check)
- [ ] No console errors in browser DevTools
- [ ] Lighthouse score 90+ on homepage
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] robots.txt accessible at /robots.txt

## Future: Vercel Migration

If the project outgrows the VPS, migrating to Vercel is straightforward:
1. Connect GitHub repo to Vercel (standalone mode is natively supported)
2. Point `version2.hr` A record to Vercel
3. Keep subdomain DNS pointing to Hostinger VPS (subdomains continue working)
4. Vercel handles SSR, API routes, middleware, and image optimization natively
5. `next.config.ts` redirects work identically on Vercel

The subdomain apps stay on the VPS behind Nginx regardless of where the main site is hosted.
