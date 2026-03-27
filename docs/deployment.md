# Version2.hr — VPS Deployment Plan

## Overview

All Version2 properties run on a single Hostinger VPS (KVM 2) using Docker containers behind an Nginx reverse proxy. Cloudflare sits in front for DNS, CDN, and public SSL. The main website shows a "coming soon" page until the design phase is complete — flipping `COMING_SOON=false` reveals the full site without redeployment.

## Server

| Property | Value |
|----------|-------|
| Provider | Hostinger VPS KVM 2 |
| VPS ID | 1396909 |
| IPv4 | 76.13.134.6 |
| IPv6 | 2a02:4780:79:e0e4::1 |
| OS | Ubuntu 24.04 + Docker |
| CPU | 2 vCPU |
| RAM | 8 GB |
| Disk | 100 GB SSD |
| Hostname | version2.hr |

## Domains & Apps

Five properties share the VPS. Each gets its own Docker container(s) and Nginx server block.

### 1. version2.hr — Main Website

| | |
|---|---|
| Stack | Next.js 16 + TypeScript + Tailwind CSS v4 |
| Container | `v2-nextjs` (Node.js 20 Alpine) |
| Port | 3000 (internal) |
| Database | SQLite (Drizzle ORM, WAL mode) — Docker volume `nextjs-data` |
| Repo | `v2matosevic/version2.0` |
| Status | **Deployed.** Coming-soon page live at VPS IP. |

Features: 428+ pages (3 languages), 103 blog posts, AI chat, booking system, admin dashboard, contact/career forms, analytics, pricing wizard. All gated behind `COMING_SOON=true` until design phase is complete.

### 2. app.version2.hr — Digital Business Cards

| | |
|---|---|
| Stack | Laravel 10 + PHP 8.2 + Livewire 2 |
| Containers | `v2-app-php` (PHP-FPM) + `v2-app-worker` (queue) + `v2-app-nginx` (static assets) |
| Database | MySQL 8.0 — `app_v2cards` (user: `v2app`) |
| Repo | TBD (user will provide) |
| Status | **Awaiting GitHub repo + DB dump.** Nginx placeholder active. |

Features: 21 card templates, QR code generation, vCard export, analytics per card, appointment scheduling, 999 users, 61 active vcards. Laravel queue worker for emails and media processing.

### 3. web.version2.hr — Web Application

| | |
|---|---|
| Stack | Laravel + PHP 8.2 |
| Containers | `v2-web-php` (PHP-FPM) + `v2-web-nginx` (static assets) |
| Database | MySQL 8.0 — `web_v2` (user: `v2web`) |
| Repo | TBD (user will provide) |
| Status | **Getting a redesign.** Awaiting new repo + DB dump. Nginx placeholder active. |

### 4. offer.version2.hr — Smart Web Plan Landing Page

| | |
|---|---|
| Stack | Vanilla PHP 8.x (no framework) |
| Containers | `v2-offer-php` (PHP-FPM) + `v2-offer-nginx` (static assets) |
| Database | MySQL 8.0 — `offer_v2` (user: `v2offer`) |
| Repo | TBD (user will provide) |
| Status | **Keeping as-is.** May be absorbed into main site later. Nginx placeholder active. |

Features: Stripe payment links, AI chat widget (GPT-4o-mini), custom analytics, admin panel, onboarding wizard.

### 5. qr.version2.hr — QR Code Tool

| | |
|---|---|
| Stack | Next.js + TypeScript + Tailwind CSS (NEW — being built from scratch) |
| Container | `v2-qr-nextjs` (Node.js 20 Alpine) |
| Port | 3001 (internal) |
| Database | TBD |
| Repo | TBD (will be created) |
| Status | **Not yet built.** Nginx placeholder active. |

## Architecture

```
                         Internet
                            │
                       ┌────┴────┐
                       │Cloudflare│  DNS + CDN + SSL (visitor ↔ Cloudflare)
                       └────┬────┘
                            │  Cloudflare Origin Certificate (Cloudflare ↔ VPS)
                            │
                  ┌─────────┴─────────┐
                  │   v2-nginx        │  Nginx reverse proxy
                  │   :80 / :443      │  Routes by Host header
                  └─────────┬─────────┘
          ┌────────┬────────┼────────┬────────┐
          │        │        │        │        │
      v2-nextjs  v2-app  v2-web  v2-offer  v2-qr
       :3000    :8001    :8002    :8003    :3001
         │        │        │        │
      SQLite    ┌─┴────────┴────────┘
     (volume)   │
             v2-mysql
              :3306
            (volume)
```

### Docker Services

| Service | Image | Ports | Depends On | Restart |
|---------|-------|-------|------------|---------|
| `v2-nginx` | Custom (baked configs) | 80, 443 (published) | nextjs | unless-stopped |
| `v2-nextjs` | Custom (multi-stage build) | 3000 (internal) | — | unless-stopped |
| `v2-mysql` | mysql:8.0 | 3306 (internal) | — | unless-stopped |
| `v2-app-php` | Custom (PHP 8.2-FPM) | 9000 (internal) | mysql | unless-stopped |
| `v2-app-worker` | Same as app-php | — | mysql | unless-stopped |
| `v2-app-nginx` | nginx:alpine | 8001 (internal) | app-php | unless-stopped |
| `v2-web-php` | Custom (PHP 8.2-FPM) | 9000 (internal) | mysql | unless-stopped |
| `v2-web-nginx` | nginx:alpine | 8002 (internal) | web-php | unless-stopped |
| `v2-offer-php` | Custom (PHP 8.x-FPM) | 9000 (internal) | mysql | unless-stopped |
| `v2-offer-nginx` | nginx:alpine | 8003 (internal) | offer-php | unless-stopped |
| `v2-qr-nextjs` | Custom (multi-stage build) | 3001 (internal) | — | unless-stopped |

### Docker Volumes

| Volume | Purpose | Backup? |
|--------|---------|---------|
| `nextjs-data` | SQLite database + RAG index | Yes — SQLite `.backup` |
| `mysql-data` | All MySQL databases | Yes — `mysqldump` |
| `app-uploads` | User uploads for app.version2.hr | Yes — file copy |
| `web-uploads` | User uploads for web.version2.hr | Yes — file copy |
| `offer-uploads` | Portfolio images for offer.version2.hr | Yes — file copy |
| `qr-data` | QR app database | Yes |

### Network

Single Docker bridge network `v2-network`. All containers communicate by service name (e.g., `v2-nextjs:3000`, `v2-mysql:3306`).

## SSL Strategy

| Layer | Certificate | Managed By |
|-------|-------------|------------|
| Visitor ↔ Cloudflare | Cloudflare Universal SSL | Cloudflare (automatic) |
| Cloudflare ↔ VPS | Cloudflare Origin Certificate | Us — installed on Nginx |

**Origin Certificate:** Wildcard for `*.version2.hr` + `version2.hr`. 15-year validity. Generated in Cloudflare dashboard, installed at `/etc/nginx/ssl/origin.pem` and `origin-key.pem`.

**Current state:** Self-signed cert (auto-generated by nginx entrypoint). Works for Cloudflare Full mode but not Full (Strict). Replace with Origin Cert before DNS cutover.

## DNS Plan (Cloudflare)

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `version2.hr` | 76.13.134.6 | Proxied (orange) |
| A | `www` | 76.13.134.6 | Proxied |
| A | `app` | 76.13.134.6 | Proxied |
| A | `web` | 76.13.134.6 | Proxied |
| A | `offer` | 76.13.134.6 | Proxied |
| A | `qr` | 76.13.134.6 | Proxied |
| AAAA | `version2.hr` | 2a02:4780:79:e0e4::1 | Proxied |
| MX | `version2.hr` | (Zoho mail servers) | DNS only |
| TXT | `version2.hr` | (SPF, DKIM, DMARC) | DNS only |

**DO NOT point DNS until all apps are verified working on the VPS.**

## Nginx Routing

Nginx routes by `Host` header to the correct backend:

| Host | → Backend | Config File |
|------|-----------|-------------|
| `version2.hr` / `www.version2.hr` | `v2-nextjs:3000` | `10-version2.conf` |
| `app.version2.hr` | `v2-app-nginx:8001` | `20-app.conf` |
| `web.version2.hr` | `v2-web-nginx:8002` | `30-web.conf` |
| `offer.version2.hr` | `v2-offer-nginx:8003` | `40-offer.conf` |
| `qr.version2.hr` | `v2-qr-nextjs:3001` | `50-qr.conf` |
| Any other / IP | `v2-nextjs:3000` | `00-default.conf` |

Each subdomain currently serves a branded maintenance page until the real app is deployed.

## Database Strategy

### SQLite (version2.hr)
- File-based, stored in Docker volume `nextjs-data` at `/app/data/version2.db`
- Created automatically on first app start via Drizzle ORM
- WAL mode for concurrent reads
- Backup: `sqlite3 .backup` command

### MySQL 8.0 (app, web, offer)
- Single shared container `v2-mysql`
- Three databases, three users (least-privilege):
  - `app_v2cards` / `v2app`
  - `web_v2` / `v2web`
  - `offer_v2` / `v2offer`
- Init script: `deploy/mysql/init/01-create-databases.sql` runs on first container start
- Production data: imported from DB dumps provided by user
- Backup: `mysqldump --all-databases --single-transaction`

## File Structure on VPS

```
/docker/version2/                    ← Hostinger Docker project root
├── docker-compose.yaml              ← Active compose (cloned from GitHub)
├── Dockerfile                       ← Next.js multi-stage build
├── deploy/
│   ├── docker-compose.yml           ← Full multi-app reference
│   ├── nginx/
│   │   ├── Dockerfile               ← Custom nginx with baked configs
│   │   ├── nginx.conf               ← Main nginx config
│   │   ├── entrypoint.sh            ← Self-signed cert generator
│   │   ├── conf.d/
│   │   │   ├── 00-default.conf      ← Catch-all (proxy to nextjs)
│   │   │   ├── 10-version2.conf     ← version2.hr
│   │   │   ├── 20-app.conf          ← app.version2.hr
│   │   │   ├── 30-web.conf          ← web.version2.hr
│   │   │   ├── 40-offer.conf        ← offer.version2.hr
│   │   │   └── 50-qr.conf           ← qr.version2.hr
│   │   ├── app-fpm.conf             ← PHP-FPM upstream for app
│   │   ├── web-fpm.conf             ← PHP-FPM upstream for web
│   │   └── offer-fpm.conf           ← PHP-FPM upstream for offer
│   ├── env/
│   │   ├── nextjs.env.example
│   │   ├── app.env.example
│   │   ├── web.env.example
│   │   └── offer.env.example
│   ├── mysql/init/
│   │   └── 01-create-databases.sql  ← Auto-creates DBs on first run
│   └── scripts/
│       ├── backup.sh                ← Daily backup (MySQL + SQLite)
│       ├── deploy-nextjs.sh         ← Redeploy main site
│       └── generate-self-signed-cert.sh
├── src/                             ← Next.js source code
├── content/                         ← Blog posts, portfolio data
└── public/                          ← Static assets
```

## Deployment Workflow

Deployments are manual, triggered via Claude Code using Hostinger MCP tools.

### Deploying a code change to version2.hr:
1. Make changes locally, commit, push to `v2matosevic/version2.0` on GitHub
2. Via Claude Code: `createNewProjectV1` with GitHub URL — Hostinger clones + builds + starts
3. Verify via Playwright or browser at VPS IP (pre-DNS) or domain (post-DNS)

### Adding a new subdomain app:
1. User provides GitHub repo URL + MySQL dump (if applicable)
2. Add Dockerfile to the app repo
3. Uncomment the service block in `deploy/docker-compose.yml`
4. Update the nginx conf to proxy instead of showing placeholder
5. Import DB dump: `docker exec -i v2-mysql mysql -u root -p < dump.sql`
6. Deploy via `createNewProjectV1`

### Future: GHCR-based deploys
GitHub Actions already builds and pushes the Next.js image to GHCR on every push to master. Once GHCR auth is configured on the VPS, deployments can use pre-built images (faster, no build on VPS).

## Firewall

| Rule | Protocol | Port | Source |
|------|----------|------|--------|
| SSH | TCP | 22 | Any |
| HTTP | TCP | 80 | Any |
| HTTPS | TCP | 443 | Any |

Firewall ID: 209601, name: "v2mail-production" (to be renamed). Managed via Hostinger panel.

**Post-DNS hardening (future):**
- Restrict ports 80/443 to Cloudflare IP ranges only
- Add fail2ban for SSH
- UFW as secondary firewall

## Backup Strategy

**Daily automated backups** via `deploy/scripts/backup.sh`:
- MySQL: `mysqldump --all-databases` → gzipped
- SQLite: `sqlite3 .backup` → gzipped
- Retention: 7 days rolling
- Schedule: cron at 03:00 UTC
- Location: `/opt/version2/data/backups/`

**Hostinger automatic backups:** Weekly, stored off-server.

## Rollout Plan

### Phase 1 — DONE
- [x] VPS analyzed and cleaned (old firewall, duplicate SSH key removed)
- [x] Docker infrastructure files created (Dockerfile, compose, nginx, env templates)
- [x] GitHub repo created (`v2matosevic/version2.0`, public)
- [x] GitHub Actions workflow for Docker image builds
- [x] version2.hr deployed — coming-soon page live at `76.13.134.6`
- [x] Nginx reverse proxy running with all domain placeholders

### Phase 2 — Prepare Remaining Apps
- [ ] User provides GitHub repos for app, web, offer
- [ ] User provides MySQL dumps for app, web, offer databases
- [ ] Add Dockerfiles to each app repo
- [ ] Build and test each app container on VPS
- [ ] Import database dumps
- [ ] Verify all 5 domains serve correctly (via /etc/hosts or Cloudflare)

### Phase 3 — SSL & DNS
- [ ] Generate Cloudflare Origin Certificate (wildcard *.version2.hr)
- [ ] Install origin cert on nginx (replace self-signed)
- [ ] Set Cloudflare SSL mode to Full (Strict)
- [ ] Point DNS records (A records for all domains)
- [ ] Verify all domains work through Cloudflare
- [ ] Harden: restrict nginx to Cloudflare IPs only

### Phase 4 — Post-Launch
- [ ] Set up daily backup cron
- [ ] Rename firewall to "version2-production"
- [ ] Make GitHub repo private (after GHCR auth is configured)
- [ ] Monitor via health checks and Sentry
- [ ] Flip `COMING_SOON=false` when design phase is complete

## Lessons Learned During Deployment

1. **Hostinger Docker API is for pre-built images.** Volume mounts to cloned repo files don't persist after build. Solution: bake configs into custom Dockerfiles.
2. **`.dockerignore` affects ALL `build:` contexts.** If one Dockerfile needs files from `deploy/`, they must not be excluded.
3. **Action queue is serial.** A failed action with retries blocks everything. A VPS reboot clears the queue.
4. **`createNewProjectV1` with same name reuses cached images.** Delete first, then create for a clean rebuild.
5. **`upgrade-insecure-requests` CSP breaks IP-based testing.** Assets load over HTTPS which fails with self-signed cert. Resolves once Cloudflare is in front.
6. **SQLite needs `data/` directory during Next.js build.** The build collects page data which triggers DB connection.
7. **`scripts/` must not be in `.dockerignore`** — postbuild steps (sitemap, robots, search index) need them.
