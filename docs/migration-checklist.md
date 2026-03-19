# Migration Checklist

## Pre-Migration (Before Going Live)

### Content Verification
- [ ] Verify SSL certificate is valid and auto-renewing on Hostinger
- [ ] All 103 curated blog posts render correctly with proper formatting
- [ ] All page content matches or improves upon WordPress originals
- [ ] Featured images display correctly on all blog posts
- [ ] All internal links point to valid routes (no broken links)
- [ ] Dropped service pages have their archive/redirect strategy implemented
- [ ] Legal pages are accurate and complete (Legal Notice, Terms, Privacy Policy, Cookies, Refund Policy, Accessibility)
- [ ] Portfolio page and case studies display correctly
- [ ] Career page renders correctly

### SEO Verification
- [ ] Every page has a unique meta title and description
- [ ] Open Graph tags present on every page (title, description, image)
- [ ] Canonical URLs set on every page
- [ ] hreflang tags on every page (en, hr, de, x-default)
- [ ] JSON-LD schemas implemented (LocalBusiness, WebSite, Service, BlogPosting, Product, BreadcrumbList, CreativeWork)
- [ ] sitemap.xml generates correctly with all routes
- [ ] robots.txt is correct (allows crawling, points to sitemap)
- [ ] No noindex tags on pages that should be indexed
- [ ] URL structure matches the redirect map (no mismatches)

### Redirect Map
- [ ] `next.config.ts` `redirects()` array covers all changed URLs (~730 rules)
- [ ] Old Croatian root URLs redirect to /hr/ equivalents
- [ ] Old /en/ URLs redirect to unprefixed root equivalents (no /en/ in new URLs)
- [ ] Dropped service pages redirect to appropriate targets
- [ ] Old package pages redirect to /pricing/ (EN) and /hr/cijene/ (HR)
- [ ] Middleware handles Accept-Language detection for first-time visitors
- [ ] Test every redirect locally or on staging

### Functionality
- [ ] Contact form submits successfully and delivers email
- [ ] Pricing tool completes all steps and submits
- [ ] Language switcher works on every page
- [ ] Mobile navigation opens, navigates, and closes properly
- [ ] Cookie consent banner appears and blocks analytics until accepted
- [ ] All external links open in new tab
- [ ] WhatsApp link works on mobile and desktop
- [ ] Social media links point to correct profiles
- [ ] AI Chat Agent responds to questions correctly
- [ ] Booking/scheduling system works end-to-end (date selection, contact method, confirmation)
- [ ] 3D hero scene loads and renders correctly across browsers
- [ ] Custom cursor works on desktop
- [ ] Floating Action Button (FAB) expands and all options work (Contact, WhatsApp, AI Chat)
- [ ] Digital business card customizer works (if implemented)
- [ ] Blog search works on listing and post pages
- [ ] Blog table of contents generates for posts with 3+ headings
- [ ] Code syntax highlighting renders in blog posts

### Build Artifacts
- [ ] OG images generated for all pages (1200x630, Satori template)
- [ ] Search index JSON generated for blog (Fuse.js-compatible, ~80-150KB)
- [ ] sitemap.xml includes all routes across all 3 languages
- [ ] robots.txt generated with correct sitemap URL
- [ ] `next.config.ts` `redirects()` populated with ~730 redirect rules
- [ ] Nginx config handles subdomain routing and WordPress infrastructure blocks
- [ ] Sentry source maps uploaded (if applicable)

### Data Integrity
- [x] `site-config.json` defaultLanguage is "en", navigation restructured (header/menu/footer), branding tokens updated
- [x] `products.json` restructured: URLs removed, i18n added (category, colors, features), tags updated
- [ ] Blog internal links rewritten to new URL structure (absolute → relative)
- [ ] Accessibility statement page exists for all 3 languages

### Performance
- [ ] Lighthouse score 90+ on homepage (Performance, A11y, Best Practices, SEO)
- [ ] Lighthouse score 90+ on a blog post page
- [ ] Lighthouse score 90+ on the pricing tool page
- [ ] No console errors on any page
- [ ] Images are optimized (WebP, compressed, correct dimensions)
- [ ] Fonts load without layout shift
- [ ] WebGL/3D scene doesn't block initial page render (progressive loading)

### Cross-Browser / Device
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, macOS and iOS)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)
- [ ] Tablet viewport (iPad)

### Analytics
- [ ] GA4 tracking fires on page load (verify in GA4 Real-Time)
- [ ] GA4 events fire on form submission and pricing tool completion
- [ ] Google Ads conversion tracking works
- [ ] Facebook Pixel fires on page load (verify in Events Manager)
- [ ] All analytics are consent-gated (don't fire until cookie consent)

## Migration Day

### Backup
1. Backup current VPS deployment (PM2 snapshot, `.next/` directory, Nginx config)
2. Export WordPress database from old hosting (just in case)
3. Save current Nginx configuration files

### Deploy
4. Build Next.js standalone (`npm run build`), verify `.next/standalone/` output
5. Deploy to VPS via `git pull + npm run build + pm2 restart`
6. Verify Nginx config routes main domain to Next.js and subdomains to their directories
7. Verify subdomain apps are untouched: `app/`, `qr/`, `web/`
8. Verify backend health check endpoint responds (`GET /api/health`)

### Verify Live
9. Homepage loads at version2.hr
10. Spot check 5 random blog posts
11. Check services overview and individual service pages
12. Test contact form (send a real submission)
13. Test pricing tool end-to-end
14. Test language switching (EN → HR → DE)
15. Test subdomains (app.version2.hr, qr.version2.hr, web.version2.hr)
16. Check GA4 Real-Time for incoming data
17. Run Lighthouse on live homepage

### Search Engines
18. Submit new sitemap to Google Search Console
19. Request indexing of homepage
20. Monitor Search Console for crawl errors daily for first week
21. Check for 404s in Search Console after 24-48 hours

## Rollback Plan

If the site is broken after deployment: restore the previous build from the VPS backup, revert PM2 to the prior process, and verify subdomain Nginx server blocks are intact.

1. **Immediate (< 1 hour):** Restore previous `.next/standalone/` build from backup, `pm2 restart`. Subdomains unaffected (separate Nginx server blocks).
2. **DNS-level:** No DNS changes involved (same VPS), so no propagation delay.
3. **Search Console:** If rolled back within 24 hours, minimal SEO impact. Google re-crawls quickly.
4. **Backend:** Backend is consolidated into Next.js — rolling back the build rolls back everything.
5. **Decision point:** If rollback needed, fix the issue in dev, rebuild, and re-deploy. Don't iterate on production.

## Post-Migration (First 30 Days)

- [ ] Purge CDN/Cloudflare cache if configured
- [ ] Monitor Google Search Console weekly for crawl errors and indexing issues
- [ ] Monitor analytics for traffic drops vs WordPress baseline
- [ ] Check keyword rankings for top 10 target keywords
- [ ] Fix any 404s that appear in Search Console
- [ ] Respond to any user-reported issues
- [ ] Compare page speed scores with WordPress baseline
- [ ] Verify all redirects are being followed by Googlebot (check crawl stats)
- [ ] Test AI Chat Agent accuracy on real queries
