# Version2.hr — VPS Deployment Plan

## Overview

All Version2 properties run on a single Hostinger VPS (KVM 2) using Docker containers. The infrastructure is split into 6 independent Hostinger Docker projects that share a common network (`v2-net`). Each project deploys independently — updating one app does not rebuild or restart others.

Cloudflare sits in front for DNS, CDN, and public SSL. The main website shows a "coming soon" page until the design phase is complete — flipping `COMING_SOON=false` reveals the full site without redeployment.

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

## Multi-Project Architecture

### Why Multiple Projects?

The previous monolithic compose required rebuilding ALL services whenever ANY app changed. The multi-project approach gives each app independent deployments, independent failure domains, and independent scaling.

### The 6 Projects

```
┌─────────────────────────────────────────────────────────────┐
│                        v2-net (bridge)                      │
│                                                             │
│  v2-main (GitHub: v2matosevic/version2.0)                   │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  v2-nginx    │  │  v2-nextjs   │                         │
│  │  :80 / :443  │──│  :3000       │                         │
│  └──────┬───────┘  └──────────────┘                         │
│         │                                                   │
│         ├──── version2.hr ──────────── v2-nextjs:3000       │
│         ├──── app.version2.hr ──────── v2-app-nginx:8001    │
│         ├──── web.version2.hr ──────── v2-web-nginx:8002    │
│         ├──── offer.version2.hr ────── v2-offer-nginx:8003  │
│         └──── qr.version2.hr ──────── v2-qr-nextjs:3001    │
│                                                             │
│  v2-db (raw YAML)         v2-app (GitHub: v2matosevic/v2-app)
│  ┌──────────────┐         ┌──────────┬─────────┬──────────┐│
│  │  v2-mysql    │         │v2-app-php│v2-app-  │v2-app-   ││
│  │  :3306       │◄────────│  :9000   │worker   │nginx:8001││
│  └──────────────┘         └──────────┴─────────┴──────────┘│
│         ▲                                                   │
│         │  v2-web (GitHub: v2matosevic/v2-web)               │
│         │  ┌──────────┬──────────┐                          │
│         ├──│v2-web-php│v2-web-   │                          │
│         │  │  :9000   │nginx:8002│                          │
│         │  └──────────┴──────────┘                          │
│         │                                                   │
│         │  v2-offer (GitHub: v2matosevic/v2-offer)           │
│         │  ┌────────────┬────────────┐                      │
│         └──│v2-offer-php│v2-offer-   │                      │
│            │  :9000     │nginx:8003  │                      │
│            └────────────┴────────────┘                      │
│                                                             │
│  v2-qr (GitHub: v2matosevic/v2-qr)                          │
│  ┌──────────────┐                                           │
│  │ v2-qr-nextjs │                                           │
│  │  :3001       │                                           │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
```

### Project Details

| # | Project | Source | Creates | Depends On |
|---|---------|--------|---------|------------|
| 1 | **v2-main** | GitHub: `v2matosevic/version2.0` | v2-net network, v2-nginx, v2-nextjs | — |
| 2 | **v2-db** | Raw YAML | v2-mysql | v2-net (from v2-main) |
| 3 | **v2-app** | GitHub: `v2matosevic/v2-app` | v2-app-php, v2-app-worker, v2-app-nginx | v2-net, v2-mysql |
| 4 | **v2-web** | GitHub: `v2matosevic/v2-web` | v2-web-php, v2-web-nginx | v2-net, v2-mysql |
| 5 | **v2-offer** | GitHub: `v2matosevic/v2-offer` | v2-offer-php, v2-offer-nginx | v2-net, v2-mysql |
| 6 | **v2-qr** | GitHub: `v2matosevic/v2-qr` | v2-qr-nextjs | v2-net |

### Deploy Order

1. **v2-main** — must be first (creates the shared `v2-net` network)
2. **v2-db** — if PHP apps need MySQL
3. **v2-app**, **v2-web**, **v2-offer**, **v2-qr** — in any order

## Domains & Apps

### 1. version2.hr — Main Website

| | |
|---|---|
| Stack | Next.js 16 + TypeScript + Tailwind CSS v4 |
| Container | `v2-nextjs` (Node.js 20 Alpine) |
| Port | 3000 (internal) |
| Database | SQLite (Drizzle ORM, WAL mode) — Docker volume `nextjs-data` |
| Repo | `v2matosevic/version2.0` |
| Project | `v2-main` |
| Status | **Deployed.** Coming-soon page live at VPS IP. |

Features: 428+ pages (3 languages), 103 blog posts, AI chat, booking system, admin dashboard, contact/career forms, analytics, pricing wizard. All gated behind `COMING_SOON=true` until design phase is complete.

### 2. app.version2.hr — Digital Business Cards

| | |
|---|---|
| Stack | Laravel 10 + PHP 8.2 + Livewire 2 |
| Containers | `v2-app-php` (PHP-FPM) + `v2-app-worker` (queue) + `v2-app-nginx` (sidecar) |
| Database | MySQL 8.0 — `app_v2cards` (user: `v2app`) |
| Repo | `v2matosevic/v2-app` (TBD) |
| Project | `v2-app` |
| Status | **Awaiting GitHub repo + DB dump.** Nginx maintenance page active. |

### 3. web.version2.hr — Web Application

| | |
|---|---|
| Stack | Laravel + PHP 8.2 |
| Containers | `v2-web-php` (PHP-FPM) + `v2-web-nginx` (sidecar) |
| Database | MySQL 8.0 — `web_v2` (user: `v2web`) |
| Repo | `v2matosevic/v2-web` (TBD) |
| Project | `v2-web` |
| Status | **Getting a redesign.** Nginx maintenance page active. |

### 4. offer.version2.hr — Smart Web Plan Landing Page

| | |
|---|---|
| Stack | Vanilla PHP 8.x (no framework) |
| Containers | `v2-offer-php` (PHP-FPM) + `v2-offer-nginx` (sidecar) |
| Database | MySQL 8.0 — `offer_v2` (user: `v2offer`) |
| Repo | `v2matosevic/v2-offer` (TBD) |
| Project | `v2-offer` |
| Status | **Keeping as-is.** May be absorbed into main site. Nginx maintenance page active. |

### 5. qr.version2.hr — QR Code Tool

| | |
|---|---|
| Stack | Next.js + TypeScript + Tailwind CSS (NEW — being built from scratch) |
| Container | `v2-qr-nextjs` (Node.js 20 Alpine) |
| Port | 3001 (internal) |
| Database | TBD |
| Repo | `v2matosevic/v2-qr` (TBD) |
| Project | `v2-qr` |
| Status | **Not yet built.** Nginx maintenance page active. |

## Docker Network

Single bridge network `v2-net`, created by the `v2-main` project with `name: v2-net` (prevents Docker from prefixing the project name). All other projects join it as `external: true`.

Containers resolve each other by `container_name` via Docker's embedded DNS resolver at `127.0.0.11`.

## Nginx Resilience

The nginx configs use the Docker DNS resolver trick so nginx starts even when backend containers are absent:

```nginx
resolver 127.0.0.11 valid=30s;
set $upstream http://v2-app-nginx:8001;
proxy_pass $upstream;
```

When a backend is unreachable, nginx serves a branded maintenance page via `error_page 502 503 504 = @maintenance`.

## Docker Volumes

| Volume | Project | Purpose | Backup? |
|--------|---------|---------|---------|
| `nextjs-data` | v2-main | SQLite database + RAG index | Yes — SQLite `.backup` |
| `mysql-data` | v2-db | All MySQL databases | Yes — `mysqldump` |
| `uploads` | v2-app | User uploads for app.version2.hr | Yes — file copy |
| `uploads` | v2-web | User uploads for web.version2.hr | Yes — file copy |
| `qr-data` | v2-qr | QR app database | Yes |

## SSL Strategy

| Layer | Certificate | Managed By |
|-------|-------------|------------|
| Visitor <-> Cloudflare | Cloudflare Universal SSL | Cloudflare (automatic) |
| Cloudflare <-> VPS | Cloudflare Origin Certificate | Us — installed on Nginx |

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

| Host | Backend | Config File |
|------|---------|-------------|
| `version2.hr` / `www.version2.hr` | `v2-nextjs:3000` | `10-version2.conf` |
| `app.version2.hr` | `v2-app-nginx:8001` | `20-app.conf` |
| `web.version2.hr` | `v2-web-nginx:8002` | `30-web.conf` |
| `offer.version2.hr` | `v2-offer-nginx:8003` | `40-offer.conf` |
| `qr.version2.hr` | `v2-qr-nextjs:3001` | `50-qr.conf` |
| Any other / IP | `v2-nextjs:3000` | `00-default.conf` |

Each subdomain shows a branded maintenance page when its backend is unavailable.

## Database Strategy

### SQLite (version2.hr)
- File-based, stored in Docker volume `nextjs-data` at `/app/data/version2.db`
- Created automatically on first app start via Drizzle ORM
- WAL mode for concurrent reads
- Backup: `sqlite3 .backup` command

### MySQL 8.0 (app, web, offer)
- Separate project `v2-db`, container `v2-mysql`
- Three databases, three users (least-privilege):
  - `app_v2cards` / `v2app`
  - `web_v2` / `v2web`
  - `offer_v2` / `v2offer`
- Init script: `deploy/mysql/init/01-create-databases.sql` (run manually after first start)
- Production data: imported from DB dumps provided by user
- Backup: `mysqldump --all-databases --single-transaction`

## File Structure on VPS

Each Hostinger project clones to `/docker/{project-name}/`:

```
/docker/
├── v2-main/                          <- GitHub: v2matosevic/version2.0
│   ├── docker-compose.yaml           <- nginx + nextjs, creates v2-net
│   ├── Dockerfile                    <- Next.js multi-stage build
│   ├── deploy/
│   │   ├── nginx/
│   │   │   ├── Dockerfile            <- Custom nginx with baked configs
│   │   │   ├── nginx.conf
│   │   │   ├── entrypoint.sh
│   │   │   └── conf.d/
│   │   │       ├── 00-default.conf
│   │   │       ├── 10-version2.conf
│   │   │       ├── 20-app.conf
│   │   │       ├── 30-web.conf
│   │   │       ├── 40-offer.conf
│   │   │       └── 50-qr.conf
│   │   ├── apps/                     <- Template compose files (reference only)
│   │   │   ├── db/
│   │   │   ├── app/
│   │   │   ├── web/
│   │   │   ├── offer/
│   │   │   └── qr/
│   │   └── mysql/init/
│   │       └── 01-create-databases.sql
│   ├── src/                          <- Next.js source code
│   ├── content/                      <- Blog posts, portfolio data
│   └── public/                       <- Static assets
│
├── v2-db/                            <- Raw YAML (no git repo)
│   └── (managed by Hostinger)
│
├── v2-app/                           <- GitHub: v2matosevic/v2-app
│   ├── docker-compose.yaml
│   ├── Dockerfile
│   ├── .env
│   └── (Laravel source)
│
├── v2-web/                           <- GitHub: v2matosevic/v2-web
│   ├── docker-compose.yaml
│   ├── Dockerfile
│   ├── .env
│   └── (Laravel source)
│
├── v2-offer/                         <- GitHub: v2matosevic/v2-offer
│   ├── docker-compose.yaml
│   ├── Dockerfile
│   ├── .env
│   └── (PHP source)
│
└── v2-qr/                            <- GitHub: v2matosevic/v2-qr
    ├── docker-compose.yaml
    ├── Dockerfile
    ├── .env
    └── (Next.js source)
```

## Deployment Workflow

Deployments are manual, triggered via Claude Code using Hostinger MCP tools.

### Deploying v2-main (this repo):
1. Make changes locally, commit, push to `v2matosevic/version2.0` on GitHub
2. Via Claude Code: `createNewProjectV1(project_name="v2-main", content="https://github.com/v2matosevic/version2.0")`
3. Verify via Playwright or browser

### Deploying v2-db:
1. Copy the YAML from `deploy/apps/db/docker-compose.yaml`
2. Via Claude Code: `createNewProjectV1(project_name="v2-db", content="<yaml>")`
3. Run init SQL to create databases

### Deploying a subdomain app:
1. Push code to the app's GitHub repo (e.g., `v2matosevic/v2-app`)
2. Via Claude Code: `createNewProjectV1(project_name="v2-app", content="https://github.com/v2matosevic/v2-app")`
3. The app joins v2-net automatically
4. Nginx routes traffic to it (or shows maintenance if unavailable)

### Updating an existing project:
```
VPS_updateProjectV1(projectName="v2-app")
```

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
- MySQL: `mysqldump --all-databases` -> gzipped
- SQLite: `sqlite3 .backup` -> gzipped
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
- [x] Multi-project architecture restructured (6 independent projects)

### Phase 2 — Prepare Remaining Apps
- [ ] User provides GitHub repos for app, web, offer
- [ ] User provides MySQL dumps for app, web, offer databases
- [ ] Deploy v2-db project with MySQL
- [ ] Deploy each app as its own Hostinger project
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
7. **`scripts/` must not be in `.dockerignore`** -- postbuild steps (sitemap, robots, search index) need them.
8. **Multi-project architecture requires named networks.** Use `name: v2-net` on the creating project to prevent Docker from prefixing the project name (e.g., `v2-main_v2-net`).
9. **Nginx resolver trick for resilient startup.** Use `resolver 127.0.0.11 valid=30s; set $upstream ...;` so nginx starts even when backends are absent.
10. **Nginx sidecar config via entrypoint.** Hostinger may clean up cloned files after build. Inject nginx config inline via shell command to avoid volume mount issues.
