# Operations

> Email, monitoring, environment, booking lifecycle, CMS pipeline, and backup/rollback procedures for the Version2.hr backend.
> Related: [api-contracts.md](api-contracts.md), [data-security.md](data-security.md)

---

## Email Infrastructure

### Provider

**Resolved: Zoho Mail via SMTP.** Transport: `nodemailer` with Zoho's SMTP relay. The backend abstracts the provider behind a `sendEmail()` utility so swapping providers requires changing one file.

In development, missing SMTP config falls back to console logging for safe local iteration. In production, missing SMTP config is treated as a hard misconfiguration and throws immediately when email delivery is attempted.

- **Package:** `nodemailer ^6.9`
- **Connection:** SSL on port 465 (Zoho EU endpoint)
- **Env vars:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

### Templates

| Template | Trigger | Recipients |
|---|---|---|
| Contact form receipt | Contact form submission | Visitor (confirmation) + team (notification) |
| Booking confirmation | Booking created | Visitor + team |
| Booking reminder | 24 hours before booking | Visitor |
| Career acknowledgment | Career application submitted | Visitor (confirmation) + team (notification) |
| Pricing estimate summary | Pricing tool submission | Visitor (summary) + team (notification) |

Templates are HTML emails with inline CSS (for email client compatibility). Stored as template files in the backend codebase, not in the database. Each template supports EN, HR, and DE — language determined by the visitor's active language at submission time.

### Addresses

- **From:** `Version2 <office@version2.hr>` (via `SMTP_FROM` env var)
- **Reply-To:** `info@version2.hr`
- **Team notifications:** Sent to `info@version2.hr`

### DNS Records

Required for email deliverability (Zoho-specific):
- **SPF:** `v=spf1 include:zoho.eu ~all`
- **DKIM:** Zoho-generated TXT record (configured in Zoho admin panel)
- **DMARC:** `v=DMARC1; p=quarantine; rua=mailto:dmarc@version2.hr`

These DNS records are added to Cloudflare (see `deployment.md` DNS section).

---

## Error Tracking & Monitoring

### Error Tracking

**Resolved: Sentry** — see `decisions.md`. Sentry is the chosen error tracking provider.

Implementation:
- **Frontend:** `@sentry/nextjs` captures client-side errors, unhandled promise rejections, and React error boundaries
- **Backend:** Sentry Node.js SDK captures unhandled exceptions, API errors, and failed builds
- **Source maps:** Uploaded to Sentry during build for readable stack traces
- **Environment tags:** `production`, `staging` — filter noise from staging errors
- **PII scrubbing:** Enabled by default. Email addresses and names redacted from error reports.

### Uptime Monitoring

External uptime checker (BetterStack or UptimeRobot free tier) pings:
- `https://version2.hr` — frontend availability
- `https://version2.hr/api/health` — backend health (API routes consolidated into Next.js)

Check interval: 5 minutes. Alert on 2 consecutive failures.

### Health Check Endpoint

`GET /api/health` returns:

```json
{
  "status": "ok",
  "timestamp": "2026-02-26T12:00:00Z",
  "uptime": 86400,
  "checks": {
    "database": "connected",
    "smtp": "configured",
    "adminAuth": "configured",
    "sentry": "configured",
    "llm": "configured"
  }
}
```

Returns `200` when healthy, `503` when a required subsystem is degraded. No authentication required (it exposes no secrets, only coarse readiness state).

### Alerting

- **5xx errors:** Email alert to `info@version2.hr` when error rate exceeds 5 errors in 10 minutes (via Sentry or custom middleware)
- **Downtime:** Uptime monitor sends email + optional push notification on consecutive failures
- **Build failures:** CMS rebuild failures already trigger email to owner (see `deployment.md`)

---

## Environment Variables Inventory

```bash
# === Site ===
NEXT_PUBLIC_SITE_URL=https://version2.hr

# === Analytics (client-side, NEXT_PUBLIC_ prefix) ===
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX

# === Sentry ===
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=sntrys_xxx
SENTRY_ORG=version2
SENTRY_PROJECT=version2-hr

# === Database ===
DATABASE_PATH=./data/version2.db

# === Email (Zoho SMTP) ===
SMTP_HOST=smtp.zoho.eu
SMTP_PORT=465
SMTP_USER=office@version2.hr
SMTP_PASS=xxx
SMTP_FROM=Version2 <office@version2.hr>

# === Admin Auth ===
ADMIN_API_KEY=xxx

# Optional: extra trusted browser origins for POST APIs
ALLOWED_ORIGINS=https://staging.version2.hr

# === AI Chat ===
LLM_PROVIDER=anthropic
LLM_API_KEY=sk-ant-xxx
LLM_MODEL=claude-sonnet-4-20250514

# === NFC Card E-Commerce (Phase 7) ===
# STRIPE_SECRET_KEY=sk_live_xxx
# STRIPE_WEBHOOK_SECRET=whsec_xxx
# APP_V2_API_KEY=xxx
```

Note: No `NEXT_PUBLIC_API_URL` needed — API routes are same-origin (`/api/*`).
Note: Phase 7 vars are commented out until needed.

---

## Booking Status Lifecycle

Booking statuses follow a linear progression:

`pending` → `confirmed` → `completed`

Additionally, `cancelled` can occur from either party at any point before `completed`.

No `no-show` tracking in v1.

---

## CMS Rebuild Pipeline

The CMS triggers a rebuild by calling a shell command on the same server:

1. **Acquire build lock** — prevent concurrent builds, 10-min stale timeout
2. **Run build** — `npm run build` in the project directory (5-min timeout)
3. **On success:** `pm2 restart version2` to serve the new `.next/standalone/` build
4. **On failure:** log error, release lock, current running server untouched
5. **Log result** — write build result to `build_logs` table (duration, stdout/stderr, status)
6. **Retain previous builds** — keep git history for rollback (`git checkout <prev> && npm run build && pm2 restart`)

---

## Backup & Rollback

### Database Backups

See Database section in [data-security.md](data-security.md). Summary:
- Daily automated SQLite file copy
- 30-day retention
- WAL mode for consistent hot backups

### Application Rollback

The entire application (frontend + backend) is deployed via Git and managed by PM2. Rollback procedure:
1. SSH into VPS
2. `git log --oneline -5` to find the last good commit
3. `git checkout <commit> && npm run build && pm2 restart version2`
4. Verify via health check endpoint

See `deployment.md` CMS-Triggered Rebuilds section for the full rebuild procedure.

### Disaster Recovery

If everything fails:
1. **Application:** `git checkout <last-known-good> && npm run build && pm2 restart version2`
2. **Database:** Restore from the most recent daily backup in `backups/db/`
3. **DNS:** Cloudflare dashboard — no local state to lose

Maximum data loss: 24 hours of database writes (time since last backup). For a site with low write volume (a few form submissions per day), this is acceptable. If write volume grows, increase backup frequency.

---

## Related Files

- [api-contracts.md](api-contracts.md) — Endpoint reference and request/response contracts
- [data-security.md](data-security.md) — Database schema, API security, input sanitization
- [../deployment.md](../deployment.md) — Deployment procedures, CMS-triggered rebuilds
- [../decisions.md](../decisions.md) — Resolved decisions
