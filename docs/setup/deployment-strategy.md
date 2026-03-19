# Deployment Strategy

> **DECISION RESOLVED (2026-03-19):** Option B (full VPS) was chosen. The comparison between Options A/B/C below is historical context. The canonical deployment reference is now [../deployment.md](../deployment.md). This file retains the VPS architecture details, Nginx config, PM2 setup, and server hardening as implementation reference.
>
> Deployment architecture and server setup for Version2.hr on Hostinger VPS.
> Related: [../deployment.md](../deployment.md), [config.md](config.md), [workflow.md](workflow.md)

---

## The Problem

Version2.hr has one primary deployment target:

1. **Next.js standalone server** — unified frontend + backend (SSR, API routes, Server Actions, middleware). Managed by PM2 behind Nginx.

And three **existing subdomain apps** that share `public_html/`:

| Subdomain | Folder | Content |
|---|---|---|
| `app.version2.hr` | `public_html/app/` | Separate web application |
| `qr.version2.hr` | `public_html/qr/` | QR code utility |
| `web.version2.hr` | `public_html/web/` | Web utility |

**The non-negotiable constraint:** Deploying the new site or backend must never delete, overwrite, or break the subdomain folders. These are production apps serving real users.

---

## Option A: Stay on Shared Hosting (Hostinger Cloud)

### Static Site Deployment

The static frontend deploys to `public_html/` via `rsync` with explicit exclusions.

**The safe rsync command:**

```bash
rsync -avz --checksum --delete \
  --exclude='app/' \
  --exclude='qr/' \
  --exclude='web/' \
  --exclude='.htaccess' \
  --exclude='.well-known/' \
  out/ user@host:public_html/
```

Flags explained:
- `-avz` — archive mode (preserves permissions/timestamps), verbose, compress during transfer
- `--checksum` — compare by checksum not timestamp (more reliable across different filesystems)
- `--delete` — remove files from server that no longer exist in `out/` (keeps the deploy clean)
- `--exclude='app/'` — **critical** — never touch subdomain folders
- `--exclude='.htaccess'` — preserve server-side rewrite rules (managed separately, not part of build output)
- `--exclude='.well-known/'` — preserve SSL/domain verification files

**Why rsync, not manual upload:**
- Incremental: only transfers changed files. A typical rebuild changes <50 files. Full site is 2000+ files.
- Atomic at the file level: each file is written completely before replacing the old one.
- The `--exclude` flags are the safety mechanism — rsync will never descend into excluded directories.
- Idempotent: running it twice produces the same result.

**Why not `rm -rf public_html/* && cp -r out/* public_html/`:**
- The `rm -rf` would delete `app/`, `qr/`, `web/` before the copy. One mistake, three apps down.
- Even with `--exclude` on the rm, it's two separate commands with a window of inconsistency between them.
- rsync is one atomic operation that handles both deletion and copying.

### Backend: Can Hostinger Shared Hosting Run Node.js?

**Yes, with limitations.** Hostinger Cloud (the Business Web Hosting and Cloud Hosting plans) supports Node.js applications through their custom panel:

- Node.js version selection (18, 20, 22)
- Application entry point configuration
- Environment variable management
- Application start/stop/restart from the panel

**However, the constraints are significant:**

1. **No root access.** Cannot install system packages, configure Nginx, or run PM2.
2. **Shared resources.** CPU and memory are shared. A scraper that takes 10 seconds to parse carrier HTML could time out under load.
3. **Port restrictions.** The Node.js app runs behind Apache via passenger or a similar proxy. You do not control the port mapping directly.
4. **Process supervision.** If the Node.js process crashes, Hostinger's built-in supervisor restarts it — but there is no PM2-level control over restart strategies, memory limits, or cluster mode.
5. **No cron granularity.** Cron jobs are available but with limited frequency options.
6. **Single Node.js app.** Most shared plans allow only one Node.js application. Running both a staging backend and production backend on the same plan may not be possible.

**Verdict:** Shared hosting works for the static frontend. It can technically run the Node.js backend, but the lack of control over process management, resource allocation, and debugging makes it fragile for a backend that runs web scrapers, sends emails, serves an AI chat, and manages a CMS rebuild pipeline.

---

## Option B: Move to VPS (Recommended)

A VPS (Hostinger VPS or any provider — Hetzner, DigitalOcean) gives full root access and control over every layer.

### Architecture

```
                   Internet
                      │
                 ┌────┴────┐
                 │ Cloudflare │  (DNS + CDN, already configured)
                 └────┬────┘
                      │
              ┌───────┴───────┐
              │    Nginx       │  Reverse proxy on port 80/443
              └───────┬───────┘
                      │
        ┌─────────────┼─────────────┐
        │                           │
   Next.js Standalone          Subdomain Files
   version2.hr                 app/qr/web.version2.hr
   (frontend + API routes)          │
        │                      /var/www/
   localhost:3000              version2.hr/subdomains/
   via PM2                     app/ qr/ web/
```

### Directory Structure on the VPS

```
/var/www/version2.hr/
  .next/                     # Next.js build output
    standalone/              # Self-contained Node.js server
      server.js              # Entry point (managed by PM2)
    static/                  # Static assets (symlinked or copied)
  data/
    version2.db              # SQLite database
  backups/
    db/                      # Daily database backups
  logs/
    error.log                # PM2 error log
    output.log               # PM2 stdout log
  subdomains/
    app/                     # app.version2.hr content
    qr/                      # qr.version2.hr content
    web/                     # web.version2.hr content
  ecosystem.config.js        # PM2 config
  package.json
  node_modules/
```

**Key decision:** Subdomain apps live in their own `subdomains/` directory. Nginx routes each subdomain to its own root. The main site is a Next.js standalone server — rebuilds and restarts via PM2 never touch the subdomain files.

### Nginx Configuration

```nginx
# Main site - proxy to Next.js standalone server
server {
    listen 443 ssl http2;
    server_name version2.hr www.version2.hr;

    ssl_certificate /etc/letsencrypt/live/version2.hr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/version2.hr/privkey.pem;

    # Redirect www to non-www
    if ($host = www.version2.hr) {
        return 301 https://version2.hr$request_uri;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets with long cache
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}

# Subdomains - serve from separate directories
server {
    listen 443 ssl http2;
    server_name app.version2.hr;
    ssl_certificate /etc/letsencrypt/live/version2.hr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/version2.hr/privkey.pem;
    root /var/www/version2.hr/subdomains/app;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}

server {
    listen 443 ssl http2;
    server_name qr.version2.hr;
    ssl_certificate /etc/letsencrypt/live/version2.hr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/version2.hr/privkey.pem;
    root /var/www/version2.hr/subdomains/qr;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}

server {
    listen 443 ssl http2;
    server_name web.version2.hr;
    ssl_certificate /etc/letsencrypt/live/version2.hr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/version2.hr/privkey.pem;
    root /var/www/version2.hr/subdomains/web;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name version2.hr www.version2.hr app.version2.hr qr.version2.hr web.version2.hr;
    return 301 https://$host$request_uri;
}
```

No separate `api.version2.hr` block — API routes are same-origin at `/api/*`, proxied through the main server block.

### SSL via Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificates for all domains
sudo certbot --nginx -d version2.hr -d www.version2.hr -d app.version2.hr -d qr.version2.hr -d web.version2.hr

# Auto-renewal is set up by certbot (cron or systemd timer)
# Verify: sudo certbot renew --dry-run
```

### PM2 Process Management

```bash
# Install PM2 globally
npm install -g pm2
```

Ecosystem file for the Next.js standalone server:

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'version2',
    script: '.next/standalone/server.js',
    cwd: '/var/www/version2.hr',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '127.0.0.1'
    },
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '512M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: '/var/www/version2.hr/logs/error.log',
    out_file: '/var/www/version2.hr/logs/output.log',
  }]
};
```

```bash
# Start the Next.js standalone server
pm2 start ecosystem.config.js

# Save PM2 process list (survives server reboot)
pm2 save

# Set PM2 to start on boot
pm2 startup
```

### Migration Plan: Shared Hosting → VPS

1. **Provision VPS.** Hostinger VPS KVM 2 or similar (2 vCPU, 4GB RAM, 100GB SSD — more than sufficient).
2. **Install dependencies.** Node.js 20 LTS, Nginx, certbot, PM2, SQLite, Git.
3. **Copy subdomain apps.** `rsync` the `app/`, `qr/`, `web/` folders from shared hosting `public_html/` to `/var/www/version2.hr/subdomains/`.
4. **Deploy backend.** Clone repo, install deps, configure `.env`, start with PM2.
5. **Deploy frontend.** Build locally, rsync `out/` to `/var/www/version2.hr/public/`.
6. **Configure Nginx.** Apply the config above, test with `nginx -t`.
7. **Generate SSL certificates.** Run certbot.
8. **Update Cloudflare DNS.** Point A records to the new VPS IP. Subdomains and main domain all point to the same VPS now — Nginx routes them.
9. **Verify everything.** Run the full post-deployment checklist from `deployment.md`. Specifically verify all three subdomains work.
10. **Monitor for 48 hours.** Watch error logs, uptime checks, and SSL renewal.
11. **Decommission shared hosting.** Only after everything is confirmed working. Keep the shared hosting plan active for 30 days as a safety net.

---

## Option C: Hybrid (Static on Shared + Backend on VPS)

### How It Works

- **Shared hosting stays** for the static frontend and subdomain apps. No migration risk — nothing changes for existing apps.
- **Backend runs on a separate VPS** (Hostinger VPS, Hetzner, DigitalOcean).
- The static frontend at `version2.hr` calls the backend at `api.version2.hr` (different server).

### CORS Configuration

The Hono backend must accept requests from both production and staging:

```ts
import { cors } from 'hono/cors'

app.use('/api/*', cors({
  origin: [
    'https://version2.hr',
    'https://www.version2.hr',
    'https://staging.version2.hr',
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}))
```

### DNS Setup

| Record | Points To |
|---|---|
| `version2.hr` | Shared hosting IP (unchanged) |
| `www.version2.hr` | Shared hosting (unchanged) |
| `api.version2.hr` | VPS IP (new) |
| `app.version2.hr` | Shared hosting IP (unchanged) |
| `qr.version2.hr` | Shared hosting IP (unchanged) |
| `web.version2.hr` | Shared hosting IP (unchanged) |

### Pros

- **Zero risk to subdomains.** Nothing changes on the shared hosting side.
- **Full backend control.** PM2, Nginx, custom scraper timeouts, SQLite tuning.
- **Incremental.** Can move the static frontend to the VPS later if desired.
- **Cost-effective.** The VPS can be a small instance ($5-10/month) since it only runs the API.

### Cons

- **Two servers to maintain.** Two SSH targets, two sets of updates, two billing accounts.
- **CMS rebuilds are harder.** The CMS backend (on VPS) triggers `npm run build` but the output must be deployed to shared hosting. This requires the VPS to have SSH/SFTP access to the shared hosting, adding a deployment bridge.
- **Latency.** API calls cross the network between two servers instead of hitting localhost. Adds 20-50ms per request (negligible for this use case, but measurable).

### CMS Rebuild Bridge

For the CMS rebuild to work in the hybrid model:

```bash
# On the VPS, after a successful build:
rsync -avz --checksum --delete \
  --exclude='app/' \
  --exclude='qr/' \
  --exclude='web/' \
  --exclude='.htaccess' \
  --exclude='.well-known/' \
  /var/www/version2.hr/out/ \
  shared-hosting-user@shared-hosting-ip:public_html/
```

This requires:
- SSH key from VPS → shared hosting (password-less authentication)
- The VPS has the full Next.js project for building (content files synced from shared hosting or from Git)

The complexity here is the main argument against Option C.

---

## Safe Deployment Script

The canonical deployment script. Works for Options A, B, and C with minor path changes.

### `scripts/deploy.sh`

```bash
#!/bin/bash
set -euo pipefail

# ============================================================
# Version2.hr Deployment Script
# Builds the static site and deploys to the server.
# NEVER deletes subdomain folders (app/, qr/, web/).
# ============================================================

# --- Configuration ---
REMOTE_USER="${DEPLOY_USER:-user}"
REMOTE_HOST="${DEPLOY_HOST:-version2.hr}"
REMOTE_PATH="${DEPLOY_PATH:-/var/www/version2.hr/public}"
BUILD_DIR="out"
BACKUP_DIR="backups/builds"
MAX_BACKUPS=3

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[DEPLOY]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
fail() { echo -e "${RED}[FAIL]${NC} $1"; exit 1; }

# --- Pre-flight Checks ---
log "Running pre-flight checks..."

# Ensure we're in the project root
if [ ! -f "package.json" ]; then
  fail "Not in project root. Run from the directory containing package.json."
fi

# Ensure required tools exist
command -v rsync >/dev/null 2>&1 || fail "rsync is not installed."
command -v ssh >/dev/null 2>&1   || fail "ssh is not installed."
command -v npm >/dev/null 2>&1   || fail "npm is not installed."

# Ensure SSH connectivity
log "Testing SSH connection..."
ssh -o ConnectTimeout=10 -o BatchMode=yes "${REMOTE_USER}@${REMOTE_HOST}" "echo ok" > /dev/null 2>&1 \
  || fail "Cannot SSH into ${REMOTE_USER}@${REMOTE_HOST}. Check credentials."

# --- Step 1: Build ---
log "Building static site..."
npm run build || fail "Build failed. Aborting deployment."

# Verify build output exists and has content
if [ ! -d "${BUILD_DIR}" ] || [ -z "$(ls -A ${BUILD_DIR})" ]; then
  fail "Build directory '${BUILD_DIR}' is empty or missing."
fi

# Verify critical files exist in build output
for required_file in "index.html" "sitemap.xml" "robots.txt"; do
  if [ ! -f "${BUILD_DIR}/${required_file}" ]; then
    warn "Expected file '${required_file}' not found in build output."
  fi
done

log "Build complete. $(find ${BUILD_DIR} -type f | wc -l) files in ${BUILD_DIR}/."

# --- Step 2: Pre-deploy Backup (on server) ---
log "Creating backup of current deployment on server..."
TIMESTAMP=$(date +%Y-%m-%d-%H%M%S)

ssh "${REMOTE_USER}@${REMOTE_HOST}" bash -s <<BACKUP_SCRIPT
  set -euo pipefail
  mkdir -p "${REMOTE_PATH}/../${BACKUP_DIR}"

  # Archive current deployment (excluding subdomains if they exist in this dir)
  if [ -d "${REMOTE_PATH}" ] && [ "\$(ls -A ${REMOTE_PATH} 2>/dev/null)" ]; then
    rsync -a \
      --exclude='app/' \
      --exclude='qr/' \
      --exclude='web/' \
      "${REMOTE_PATH}/" "${REMOTE_PATH}/../${BACKUP_DIR}/build-${TIMESTAMP}/"
    echo "Backup created: build-${TIMESTAMP}"
  else
    echo "Nothing to back up (first deploy)."
  fi

  # Prune old backups, keep last ${MAX_BACKUPS}
  cd "${REMOTE_PATH}/../${BACKUP_DIR}"
  ls -dt build-*/ 2>/dev/null | tail -n +$((${MAX_BACKUPS} + 1)) | xargs rm -rf 2>/dev/null || true
BACKUP_SCRIPT

# --- Step 3: Deploy via rsync ---
log "Deploying to ${REMOTE_HOST}:${REMOTE_PATH}..."

rsync -avz --checksum --delete \
  --exclude='app/' \
  --exclude='qr/' \
  --exclude='web/' \
  --exclude='.htaccess' \
  --exclude='.well-known/' \
  "${BUILD_DIR}/" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

log "Files synced."

# --- Step 4: Restart Next.js Server ---
log "Restarting Next.js standalone server..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" "pm2 restart version2" \
  || warn "Server restart failed. Check PM2 manually."

# --- Step 5: Verify Deployment ---
log "Verifying deployment..."

VERIFY_FAILED=0

# Check main site
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "https://version2.hr/")
if [ "$HTTP_STATUS" = "200" ]; then
  log "Main site: OK (HTTP ${HTTP_STATUS})"
else
  warn "Main site: UNEXPECTED (HTTP ${HTTP_STATUS})"
  VERIFY_FAILED=1
fi

# Check subdomains
for subdomain in app qr web; do
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "https://${subdomain}.version2.hr/")
  if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
    log "Subdomain ${subdomain}.version2.hr: OK (HTTP ${HTTP_STATUS})"
  else
    warn "Subdomain ${subdomain}.version2.hr: UNEXPECTED (HTTP ${HTTP_STATUS})"
    VERIFY_FAILED=1
  fi
done

# Check API health endpoint (same-origin)
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "https://version2.hr/api/health" 2>/dev/null || echo "000")
if [ "$HEALTH_STATUS" = "200" ]; then
  log "API health: OK (HTTP ${HEALTH_STATUS})"
elif [ "$HEALTH_STATUS" = "000" ]; then
  warn "API health: Not reachable (server may not be running)."
else
  warn "API health: UNEXPECTED (HTTP ${HEALTH_STATUS})"
  VERIFY_FAILED=1
fi

# --- Summary ---
echo ""
if [ $VERIFY_FAILED -eq 0 ]; then
  log "Deployment complete. All checks passed."
else
  warn "Deployment complete but some checks failed. Review warnings above."
fi

log "Backup: build-${TIMESTAMP}"
log "Rollback: ssh ${REMOTE_USER}@${REMOTE_HOST} 'rsync -a ${REMOTE_PATH}/../${BACKUP_DIR}/build-${TIMESTAMP}/ ${REMOTE_PATH}/'"
```

### Usage

```bash
# Deploy static site only
./scripts/deploy.sh

# Deploy and restart backend
RESTART_BACKEND=true ./scripts/deploy.sh

# Deploy to staging
DEPLOY_HOST=staging.version2.hr DEPLOY_PATH=/var/www/version2.hr/staging ./scripts/deploy.sh

# Custom SSH user
DEPLOY_USER=root ./scripts/deploy.sh
```

### Rollback

If a deploy breaks the site, restore from the most recent backup:

```bash
# SSH into the server
ssh user@version2.hr

# List available backups
ls -la /var/www/version2.hr/backups/builds/

# Restore (example)
rsync -a /var/www/version2.hr/backups/builds/build-2026-03-19-143000/ /var/www/version2.hr/public/
```

No rebuild needed — the backup contains ready-to-serve static files.

---

## Recommendation

**Option B (full VPS) is the right choice.** Here is the reasoning:

### Why Not Option A (Shared Hosting)

The static frontend works fine on shared hosting. The problem is the backend. This backend is not a simple form handler — it runs:
- Web scrapers that fetch and parse external HTML (parcel tracking)
- An AI chat agent making LLM API calls with 120-second timeouts
- A CMS rebuild pipeline that runs `npm run build` (spawns child processes, consumes significant CPU/RAM for 30-60 seconds)
- A SQLite database with WAL mode needing consistent file system access
- Cron-like tasks (booking reminders, backup rotation)

Shared hosting's process management is a black box. When the CMS rebuild runs `npm run build` via `child_process.exec()`, it spawns a second Node.js process that consumes 512MB+ of RAM. On shared hosting, this may be killed by the OOM reaper. On a VPS, you control the memory limits.

### Why Not Option C (Hybrid)

The CMS rebuild pipeline is the dealbreaker. The backend needs to trigger a build and deploy the result. If the backend is on a VPS and the frontend is on shared hosting, the deploy step requires SSH from VPS → shared hosting. This adds:
- SSH key management between two servers
- A network hop in the critical deploy path
- Failure modes that are hard to debug (SSH timeout during deploy, partial sync)
- Two servers to maintain, monitor, and pay for

The complexity does not justify the risk reduction. Option B with proper directory separation (subdomains in their own folder, not inside `public/`) achieves the same safety.

### Why Option B

- **Physical separation of subdomains.** Moving `app/`, `qr/`, `web/` to `/var/www/version2.hr/subdomains/` means the main site's `public/` directory can be wiped and redeployed without touching them. Nginx routes each subdomain to its own directory. This is fundamentally safer than the shared hosting model where everything lives under `public_html/`.
- **Full control over the backend.** PM2 for process management, Nginx for reverse proxy, cron for scheduled tasks, direct access to logs and SQLite files.
- **CMS rebuilds are local.** Backend triggers build, output goes to `public/` on the same machine. No network hop, no SSH bridge.
- **Staging is straightforward.** A second Nginx server block, a second PM2 process, a second SQLite database. All on the same VPS.
- **Cost.** A Hostinger VPS KVM 2 (2 vCPU, 4GB RAM, 100GB SSD) costs approximately the same as Cloud hosting but with root access and dedicated resources.
- **Portability.** If Hostinger VPS is ever insufficient, the entire setup (Nginx config, PM2 ecosystem file, deploy script) migrates to any Ubuntu VPS in under an hour.

### Cost Comparison

| Option | Monthly Cost (estimate) | Risk Level |
|---|---|---|
| A: Shared hosting | $10-15 (existing plan) | High (backend may not work reliably) |
| B: VPS | $10-20 (Hostinger KVM 2) | Low (full control, physical separation) |
| C: Hybrid | $15-25 (shared + small VPS) | Medium (two servers, SSH bridge) |

### Action Plan

1. **Now:** Continue building on local dev. The deployment target does not affect development.
2. **Before backend Phase 3:** Provision the VPS. Set up Node.js, Nginx, PM2, certbot.
3. **First deploy:** Copy subdomain apps to the VPS. Deploy the static frontend. Point DNS.
4. **Backend deploy:** Clone backend repo, configure `.env`, start with PM2.
5. **Verify:** Full post-deployment checklist from `deployment.md`, plus subdomain verification.

---

## Server Hardening (VPS Only)

Minimal security setup for the VPS. Not exhaustive — covers the essentials.

### SSH

```bash
# Disable password auth (key-only)
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

# Change default SSH port (optional, reduces noise)
# Port 2222 in sshd_config
```

### Firewall (UFW)

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80/tcp     # HTTP (redirects to HTTPS)
sudo ufw allow 443/tcp    # HTTPS
sudo ufw allow 22/tcp     # SSH (change if using non-default port)
sudo ufw enable
```

### Automatic Updates

```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Fail2Ban

```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
# Default config bans IPs after 5 failed SSH attempts for 10 minutes
```

---

## Related Files

- [../deployment.md](../deployment.md) — Canonical deployment spec (VPS, post-deployment checklist)
- [config.md](config.md) — Environment variables, standalone mode features
- [workflow.md](workflow.md) — Build scripts, dev workflow
- [../backend/operations.md](../backend/operations.md) — CMS rebuild pipeline, backup schedule, email infrastructure
- [../backend/data-security.md](../backend/data-security.md) — CORS, rate limiting, security headers
- [../decisions.md](../decisions.md) — [RESOLVED] Hosting Strategy decision
