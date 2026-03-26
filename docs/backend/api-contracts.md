# API Contracts

> Backend architecture for Version2.hr. All API routes run within the Next.js application on Hostinger VPS (standalone mode).
> Related: [data-security.md](data-security.md), [operations.md](operations.md)

---

## Server Framework

The backend uses **Next.js API routes** (App Router `route.ts` handlers) — consolidated within the same Next.js application. No separate backend server. API routes run inside the Next.js standalone server on Hostinger VPS, sharing the same process, configuration, and deployment.

---

## API Endpoint Reference

| Method | Endpoint | Auth | Rate Limit | Purpose |
|--------|----------|------|------------|---------|
| GET | /api/health | None | None | Health check (DB + operational dependencies + uptime) |
| POST | /api/contact | None | 5/min/IP | Contact form submission |
| POST | /api/career | None | 3/min/IP | Career application submission |
| POST | /api/pricing | None | 10/min/IP | Pricing tool estimate submission |
| GET | /api/booking/slots | None | 30/min/IP | Available booking slots (next 14 days) |
| POST | /api/booking | None | 5/min/IP | Create booking |
| POST | /api/chat | None | 30/min/IP | Send chat message, get AI response |
| GET | /api/chat/:conversationId | None | 30/min/IP | Restore chat conversation history |
| POST | /api/analytics/events | None | 100/min/IP | Batch analytics event ingestion |
| GET | /api/cms/posts | API Key | None | List blog drafts |
| GET | /api/cms/posts/:id | API Key | None | Get draft by ID |
| POST | /api/cms/posts | API Key | None | Create draft |
| PUT | /api/cms/posts/:id | API Key | None | Update draft |
| DELETE | /api/cms/posts/:id | API Key | None | Delete draft |
| POST | /api/cms/build | API Key | None | Trigger site rebuild |
| GET | /api/cms/builds | API Key | None | List build logs |
| GET | /api/cms/builds/:id | API Key | None | Get build log by ID |
| GET | /api/analytics/dashboard/overview | API Key | None | Dashboard overview stats |
| GET | /api/analytics/dashboard/pageviews | API Key | None | Pageview time series |
| GET | /api/analytics/dashboard/conversions | API Key | None | Conversion breakdown |

---

## Request/Response Contracts

### POST /api/contact

**Request:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "type": "contact | analysis",
  "websiteUrl": "string (required when type is analysis, omit for contact)",
  "_honey": "string"
}
```

The `type` field distinguishes regular contact submissions from analysis/audit requests. When `type` is `"analysis"`, the `websiteUrl` field is required. When omitted, `type` defaults to `"contact"`.

**Success 200:**
```json
{ "success": true, "id": "string" }
```

**Honeypot 200** (fake success, silently discarded):
```json
{ "success": true }
```

**Validation 400:**
```json
{ "success": false, "errors": [{ "field": "string", "message": "string" }] }
```

**Origin 403:**
```json
{ "success": false, "error": "Origin not allowed" }
```

**Rate limit 429:**
```json
{ "success": false, "error": "Too many requests. Try again in {n} seconds." }
```

### GET /api/booking/slots

**Query params:** `?from=2026-03-05&to=2026-03-19&tz=Europe/Zagreb`

**Response 200:**
```json
{ "slots": [{ "date": "string", "times": [{ "time": "string", "available": true }] }] }
```

Slots are Wed/Thu/Fri only, 14:00-17:00 CET/CEST (adjusts for DST), 30-min duration, 15-min buffer. 2-14 day advance window.

### POST /api/booking

**Request:**
```json
{
  "name": "string",
  "email": "string",
  "date": "string",
  "time": "string",
  "description": "string",
  "contactMethod": "email | whatsapp | phone",
  "_honey": "string"
}
```

**Success 200:**
```json
{ "success": true, "id": "string", "icsUrl": "string" }
```

**Conflict 409:**
```json
{ "success": false, "error": "This time slot is no longer available." }
```

### POST /api/chat

**Request:**
```json
{ "conversationId": "string (optional)", "message": "string", "language": "en | hr | de" }
```

**Response 200:**
```json
{ "conversationId": "string", "response": "string", "sources": ["string"] }
```

Non-streaming. Complete response returned. Streaming may be added later.

### POST /api/analytics/events

**Request** (array of 1-50 events per request):
```json
{
  "events": [
    {
      "type": "page_view | click | scroll_depth | time_on_page | conversion",
      "page": "string",
      "data": {},
      "sessionId": "string",
      "timestamp": "string"
    }
  ]
}
```

**Response 200:**
```json
{ "received": 0 }
```

Browser-facing `POST` endpoints (`/api/contact`, `/api/pricing`, `/api/booking`, `/api/career`, `/api/chat`, `/api/analytics/events`, `/api/admin/auth`, `/api/admin/logout`) enforce same-origin `Origin` / `Referer` validation and may return `403` when the request comes from an untrusted origin.

### POST /api/pricing

**Request:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string (optional)",
  "language": "en | hr | de",
  "selections": {
    "projectType": "website | webshop | webapp",
    "scope": "landing | business | corporate | enterprise | starter | growing | simple | complex",
    "design": "reference | custom | brand",
    "timeline": "flexible | standard | priority",
    "features": ["string"],
    "featureQuantities": { "featureId": 0 },
    "ecommerce": ["string"],
    "integrations": ["string"],
    "integrationQuantities": { "integrationId": 0 },
    "designAddons": ["string"],
    "services": ["string"],
    "serviceQuantities": { "serviceId": 0 },
    "maintenance": "maintenance_none | maintenance_basic | maintenance_standard | maintenance_premium"
  },
  "calculatedEstimate": {
    "oneTime": [0, 0],
    "monthly": [0, 0],
    "yearly": [0, 0]
  },
  "_honey": "string"
}
```

The `selections` object captures every choice the visitor made in the pricing wizard and customizer panel. The `calculatedEstimate` is the client-side result — the backend recalculates from `selections` using the same formula and `pricing-config.json` data to prevent manipulation.

- `features`, `ecommerce`, `integrations`, `designAddons`, `services` are arrays of option IDs (e.g., `["blog", "auth", "multilingual"]`).
- `*Quantities` objects map option IDs to their selected quantity (only present for items with `hasQuantity: true`).
- `maintenance` is a single value (mutually exclusive tiers).

**Success 200:**
```json
{
  "success": true,
  "id": "est_abc123",
  "validatedEstimate": {
    "oneTime": [5200, 9400],
    "monthly": [120, 250],
    "yearly": [50, 150]
  }
}
```

The `id` serves as a reference number. Include it in the confirmation email so the visitor can reference it in follow-up communication ("I got estimate est_abc123"). The `validatedEstimate` is the server-side recalculation — if it differs from `calculatedEstimate`, the backend logs the discrepancy and uses the server value.

**Honeypot 200** (fake success, silently discarded):
```json
{ "success": true }
```

**Validation 400:**
```json
{ "success": false, "errors": [{ "field": "string", "message": "string" }] }
```

**Rate limit 429:**
```json
{ "success": false, "error": "Too many requests. Try again in {n} seconds." }
```

### POST /api/career

**Request:**
```json
{
  "name": "string",
  "email": "string",
  "portfolioUrl": "string (optional)",
  "message": "string",
  "_honey": "string"
}
```

**Success 200:**
```json
{ "success": true, "id": "string" }
```

**Honeypot 200** (fake success, silently discarded):
```json
{ "success": true }
```

**Validation 400:**
```json
{ "success": false, "errors": [{ "field": "string", "message": "string" }] }
```

---

## Related Files

- [data-security.md](data-security.md) — Database schema, API security, input sanitization
- [operations.md](operations.md) — Email infrastructure, monitoring, backups, CMS rebuild pipeline
- [../features/form-specs.md](../features/form-specs.md) — Form field definitions and validation rules
- [../deployment.md](../deployment.md) — Deployment procedures and server setup
