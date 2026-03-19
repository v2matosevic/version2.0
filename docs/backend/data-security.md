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

- **Public endpoints** (contact form, pricing tool, booking, career, chat): No auth required. Protected by rate limiting and honeypot.
- **CMS endpoints** (content CRUD, rebuild trigger, analytics dashboard, conversation logs): API key in `Authorization: Bearer <key>` header. Key stored in environment variable, never in code.
- **Internal endpoints** (rebuild trigger, health check): Restricted to localhost or API key.

### Rate Limiting

Per-IP limits, enforced by an in-memory store (no Redis needed at this scale):

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
- **SameSite cookies:** `SameSite=Strict` on any session cookies
- **Origin header check:** Backend validates `Origin` or `Referer` header matches the CORS whitelist
- **No cookie-based auth on public endpoints:** Public forms use no cookies, eliminating CSRF risk entirely

### Input Sanitization

- All user inputs validated with Zod schemas (same schemas as frontend — see `../features/form-architecture.md`)
- HTML stripped from text fields before storage
- SQL injection prevented by Drizzle ORM parameterized queries (never raw SQL)
- File uploads (career applications): if added later, validate MIME type, enforce size limits, store outside webroot

### Security Headers

Set on all API responses:

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
```

HSTS is critical — enforces HTTPS on all connections. The `includeSubDomains` directive covers `app.`, `qr.`, `web.`, and `staging.` subdomains.

---

## Related Files

- [api-contracts.md](api-contracts.md) — Endpoint reference and request/response contracts
- [operations.md](operations.md) — Email infrastructure, monitoring, backups, CMS rebuild pipeline
- [../deployment.md](../deployment.md) — Deployment procedures and server setup
- [../features/form-architecture.md](../features/form-architecture.md) — Shared Zod validation schemas
