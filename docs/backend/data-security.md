# Data & Security

> Database architecture and API security for the Version2.hr backend.
> Related: [api-contracts.md](api-contracts.md), [operations.md](operations.md)

---

## Database

### Engine: SQLite + Drizzle ORM

SQLite is the right choice for this workload: single-server deployment, low-to-moderate write volume, zero operational overhead. Drizzle ORM provides type-safe queries and schema management without the weight of Prisma.

**Driver:** `better-sqlite3` (synchronous, fastest Node.js SQLite driver).

### Schema Overview

| Table | Purpose | Key Columns |
|---|---|---|
| `contacts` | Contact form submissions | id, name, email, message, created_at, read |
| `pricing_leads` | Pricing tool submissions | id, name, email, config_json, price_range, message, created_at |
| `bookings` | Consultation bookings | id, name, email, contact_method, date, time_slot, description, status, gcal_event_id, created_at |
| `career_apps` | Career page applications | id, name, email, portfolio_url, message, created_at, read |
| `chat_conversations` | AI chat sessions | id, visitor_id, language, started_at, last_message_at, needs_followup |
| `chat_messages` | Individual chat messages | id, conversation_id, role (user/assistant), content, created_at |
| `analytics_events` | Custom analytics tracking | id, event_type, page_path, metadata_json, session_id, created_at |
| `blog_drafts` | CMS draft content | id, slug, language, title, content_md, frontmatter_json, updated_at, published |
| `build_logs` | CMS rebuild history | id, triggered_by, status (running/success/failed), stdout, stderr, started_at, completed_at, duration_ms |
| `admin_sessions` | Revocable admin sessions | id, session_hash, expires_at, last_seen_at, revoked_at, ip, user_agent |
| `rate_limit_windows` | Persistent rate limiting windows | key_hash, endpoint, hits, window_started_at, expires_at |
| `security_events` | Auth and request security audit trail | id, event_type, level, ip, user_agent, details |

### Migrations

Drizzle Kit handles schema migrations. Migration files live in `backend/drizzle/` and are version-controlled. Run `drizzle-kit generate` to create migration SQL, `drizzle-kit migrate` to apply.

Never modify the SQLite file directly. All schema changes go through Drizzle migrations.

### Backup Schedule

- **Frequency:** Daily automated backup via cron job (2:00 AM CET)
- **Method:** Copy SQLite file to `backups/db/db-YYYY-MM-DD.sqlite`
- **Retention:** 30 days, older backups auto-deleted
- **Implementation:** Simple shell script triggered by crontab. SQLite supports hot backup — copy the file while the server runs (WAL mode ensures consistency)

---

## API Security

### CORS

Whitelist only:
- `https://version2.hr`
- `https://www.version2.hr`
- `https://staging.version2.hr`
- `https://*.version2.hr` (subdomains)

Reject all other origins. No wildcard `*` in production.

### Authentication

- **Public endpoints** (contact form, pricing tool, booking, career, chat): No auth required. Protected by rate limiting, honeypot fields, and same-origin request validation.
- **Admin/CMS endpoints**: Protected by an `HttpOnly` admin session cookie created by `POST /api/admin/auth`. Sessions are HMAC-signed, stored server-side in SQLite, expire after 7 days, and can be revoked on logout.
- **Session cookie policy:** `Secure` in production, `SameSite=Strict`, `Priority=High`.
- **Internal endpoints** (health check): No auth required, but they expose only non-sensitive operational state.

### Rate Limiting

Per-IP limits, enforced by a SQLite-backed window store. The limiter stores a hashed key per endpoint/window/IP combination, so limits survive process restarts without persisting raw IPs in the rate-limit table:

| Endpoint Group | Limit | Window |
|---|---|---|
| Contact form | 5 requests | per minute |
| Pricing tool submit | 10 requests | per minute |
| Booking submit | 5 requests | per minute |
| Career application | 3 requests | per minute |
| AI chat messages | 30 requests | per minute |
| Analytics events | 100 requests | per minute |
| CMS endpoints | 60 requests | per minute |

Return `429 Too Many Requests` with `Retry-After` header when exceeded.

### CSRF Protection

With Next.js standalone mode, Server Actions have built-in CSRF protection. For API routes used by client-side forms:
- **SameSite cookies:** `SameSite=Strict` on admin session cookies
- **Origin header check:** Browser-facing `POST` endpoints reject requests whose `Origin` or `Referer` does not match the configured site origin (`NEXT_PUBLIC_SITE_URL` / `SITE_URL` / `ALLOWED_ORIGINS`)
- **No cookie-based auth on public endpoints:** Public forms use no cookies, eliminating CSRF risk entirely

### Input Sanitization

- All user inputs validated with Zod schemas (same schemas as frontend - see `../features/form-architecture.md`)
- Admin emails escape user-provided values before rendering HTML
- Markdown rendering does **not** allow raw HTML nodes through the parser pipeline
- SQL injection prevented by Drizzle ORM parameterized queries (never raw SQL)
- File uploads (career applications): if added later, validate MIME type, enforce size limits, store outside webroot

### Security Headers

Set on all API responses:

```
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'none'; ...
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
```

HSTS is critical - enforces HTTPS on all connections. The `includeSubDomains` directive covers `app.`, `qr.`, `web.`, and `staging.` subdomains. The current CSP also removes `'unsafe-eval'`, blocks objects/frames, and restricts form submissions to same-origin.

---

## Related Files

- [api-contracts.md](api-contracts.md) — Endpoint reference and request/response contracts
- [operations.md](operations.md) — Email infrastructure, monitoring, backups, CMS rebuild pipeline
- [../deployment.md](../deployment.md) — Deployment procedures and server setup
- [../features/form-architecture.md](../features/form-architecture.md) — Shared Zod validation schemas
