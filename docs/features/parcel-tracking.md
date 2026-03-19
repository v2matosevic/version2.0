# Parcel Tracking

> Order tracking system for Version2.hr. Admin creates orders with tracking numbers, customers track delivery progress via a branded page.
> Related: [form-architecture.md](form-architecture.md), [../backend/api-contracts.md](../backend/api-contracts.md), [../backend/data-security.md](../backend/data-security.md)

---

## Overview

Version2.hr sells physical products (NFC digital business cards). When an order ships, the admin enters tracking details in the backend dashboard. The system sends a branded email to the customer with a tracking link. The customer visits the tracking page to see real-time delivery progress scraped from carrier websites.

**No paid aggregator APIs.** All tracking data comes from direct carrier page scraping. This keeps costs at zero but requires maintenance when carriers change their page structure.

**Carriers supported at launch:**
- Hrvatska Posta (Croatian national postal service)
- GLS Croatia
- DPD Croatia

---

## Data Model (SQLite via Drizzle)

Three tables extend the existing schema in `data-security.md`.

### `orders` table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PK, `ord_` prefix + nanoid(12) | Order identifier |
| `customer_name` | text | NOT NULL | Customer's full name |
| `customer_email` | text | NOT NULL | Customer's email address |
| `customer_language` | text | NOT NULL, `en` \| `hr` \| `de` | Language for email and tracking page |
| `product_name` | text | NOT NULL | Product ordered (e.g., "NFC Business Card — Matte Black") |
| `product_image` | text | NULL | Relative path to product image (optional) |
| `tracking_number` | text | NULL | Carrier tracking number (NULL until shipped) |
| `carrier` | text | NULL, `hp` \| `gls` \| `dpd` \| `other` | Carrier identifier |
| `status` | text | NOT NULL, default `ordered` | Current delivery status (see Status Enum) |
| `notes` | text | NULL | Internal admin notes (never exposed to customer) |
| `tracking_email_sent` | integer | NOT NULL, default 0 | Whether tracking email has been sent (0/1) |
| `created_at` | text | NOT NULL, ISO 8601 | Order creation timestamp |
| `updated_at` | text | NOT NULL, ISO 8601 | Last modification timestamp |

### `tracking_events` table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PK, `evt_` prefix + nanoid(12) | Event identifier |
| `order_id` | text | FK → orders.id, NOT NULL | Parent order |
| `status` | text | NOT NULL | Normalized status (see Status Enum) |
| `timestamp` | text | NOT NULL, ISO 8601 | When the event occurred (from carrier) |
| `location` | text | NULL | Location text from carrier (e.g., "Zagreb, Sortirni centar") |
| `description` | text | NOT NULL | Human-readable event description |
| `raw_status` | text | NULL | Original carrier status text (for debugging) |
| `source` | text | NOT NULL, `scraper` \| `manual` | Whether event came from scraping or manual override |
| `created_at` | text | NOT NULL, ISO 8601 | When we recorded this event |

### `tracking_cache` table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `tracking_number` | text | PK | Carrier tracking number |
| `carrier` | text | NOT NULL | Carrier identifier |
| `response_json` | text | NOT NULL | Full normalized JSON response |
| `fetched_at` | text | NOT NULL, ISO 8601 | When the data was last fetched |

### Drizzle Schema

```ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerLanguage: text('customer_language').notNull().$type<'en' | 'hr' | 'de'>(),
  productName: text('product_name').notNull(),
  productImage: text('product_image'),
  trackingNumber: text('tracking_number'),
  carrier: text('carrier').$type<'hp' | 'gls' | 'dpd' | 'other'>(),
  status: text('status').notNull().$type<TrackingStatus>().default('ordered'),
  notes: text('notes'),
  trackingEmailSent: integer('tracking_email_sent').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const trackingEvents = sqliteTable('tracking_events', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id),
  status: text('status').notNull().$type<TrackingStatus>(),
  timestamp: text('timestamp').notNull(),
  location: text('location'),
  description: text('description').notNull(),
  rawStatus: text('raw_status'),
  source: text('source').notNull().$type<'scraper' | 'manual'>(),
  createdAt: text('created_at').notNull(),
})

export const trackingCache = sqliteTable('tracking_cache', {
  trackingNumber: text('tracking_number').primaryKey(),
  carrier: text('carrier').notNull(),
  responseJson: text('response_json').notNull(),
  fetchedAt: text('fetched_at').notNull(),
})
```

---

## Status Enum

Normalized across all carriers. Maps to the 5-stage visual progress bar.

| Status | Progress Stage | Description |
|--------|---------------|-------------|
| `ordered` | 1 — Ordered | Order created, not yet shipped |
| `processing` | 1 — Ordered | Carrier has received shipment info but no physical parcel yet |
| `shipped` | 2 — Ready | Parcel accepted by carrier |
| `in_transit` | 3 — In Transit | Parcel moving between facilities |
| `out_for_delivery` | 4 — Out for Delivery | On the delivery vehicle |
| `delivered` | 5 — Delivered | Delivered to recipient |
| `exception` | (highlighted) | Delivery problem (failed attempt, address issue, customs hold) |
| `returned` | (highlighted) | Returned to sender |

Progress bar stages: **Ordered** → **Ready** → **In Transit** → **Out for Delivery** → **Delivered**

The `exception` and `returned` statuses display as an alert state rather than a linear stage.

---

## Carrier Scraper Modules

Each carrier has a dedicated scraper module. All scrapers return the same normalized format. Scrapers run server-side only (Next.js API routes).

### Architecture

```
src/lib/scrapers/
  types.ts              # Shared types (CarrierEvent, NormalizedResponse)
  hrvatska-posta.ts     # HP scraper
  gls.ts                # GLS scraper
  dpd.ts                # DPD scraper
  index.ts              # Registry: carrier ID → scraper function
```

### Shared Types

```ts
type TrackingStatus =
  | 'ordered'
  | 'processing'
  | 'shipped'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'exception'
  | 'returned'

interface CarrierEvent {
  status: TrackingStatus
  timestamp: string       // ISO 8601
  location: string | null
  description: string     // Translated to customer_language
  rawStatus: string       // Original carrier text
}

interface NormalizedTrackingResponse {
  trackingNumber: string
  carrier: 'hp' | 'gls' | 'dpd' | 'other'
  currentStatus: TrackingStatus
  events: CarrierEvent[]  // Most recent first
  carrierName: string     // "Hrvatska Pošta", "GLS", "DPD"
  carrierUrl: string      // Link to carrier's tracking page for this parcel
  fetchedAt: string       // ISO 8601
}
```

### Hrvatska Posta Scraper

**Endpoint:** `GET https://posiljka.posta.hr/hr/tracking/trackingdata?barcode={CODE}`

This endpoint returns a partial HTML response (not a full page) containing a tracking event table. Parse with a lightweight HTML parser (e.g., `node-html-parser` — no headless browser needed).

**Status mapping (Croatian → normalized):**

| HP Status (contains) | Normalized Status |
|---|---|
| `Zaprimljena` / `Podaci zaprimljeni` | `processing` |
| `Pristigla u` / `Prihvaćena` | `shipped` |
| `U prijevozu` / `Otpremljena` / `Krenula` | `in_transit` |
| `U dostavi` / `Izašla na dostavu` | `out_for_delivery` |
| `Uručena` / `Isporučena` | `delivered` |
| `Nije uručena` / `Neuspješan pokušaj` | `exception` |
| `Vraćena` | `returned` |

The mapping uses `includes()` matching against the status text. Croatian diacritics must be handled (the source is UTF-8). If no mapping matches, default to `in_transit` and log a warning for manual review.

**Error handling:**
- HTTP 404 or empty response → tracking number not found
- HTTP 5xx → carrier service temporarily unavailable, return cached data
- Parse failure → log the raw HTML, return cached data, alert for scraper maintenance

### GLS Scraper

**Endpoint:** `GET https://gls-group.com/HR/hr/pracenje-posiljaka?match={CODE}`

GLS returns a full HTML page with tracking details rendered in a timeline format. Parse the tracking event list from the page HTML.

**Status mapping:**

| GLS Status (contains) | Normalized Status |
|---|---|
| `Pošiljka je najavljena` / `Info received` | `processing` |
| `Pošiljka je preuzeta` / `Picked up` | `shipped` |
| `U tranzitu` / `In transit` / `Sortiranje` | `in_transit` |
| `Izlazna dostava` / `Out for delivery` | `out_for_delivery` |
| `Isporučeno` / `Delivered` | `delivered` |
| `Neuspješna dostava` / `Not delivered` | `exception` |
| `Povrat` / `Return` | `returned` |

### DPD Scraper

**Endpoint:** `GET https://tracking.dpd.de/status/hr_HR/parcel/{CODE}`

DPD uses a centralized European tracking system. The Croatian-language variant returns HTML with a step-based progress indicator and event list.

**Status mapping:**

| DPD Status (contains) | Normalized Status |
|---|---|
| `Narudžba zaprimljena` / `Order information received` | `processing` |
| `Pošiljka preuzeta` / `Picked up` | `shipped` |
| `U prijevozu` / `In transit` / `At parcel delivery centre` | `in_transit` |
| `U dostavi` / `With delivery driver` | `out_for_delivery` |
| `Dostavljeno` / `Delivered` | `delivered` |
| `Pokušaj dostave neuspješan` / `Delivery attempt failed` | `exception` |

### Scraper Registry

```ts
import { scrapeHrvatskaPosta } from './hrvatska-posta'
import { scrapeGLS } from './gls'
import { scrapeDPD } from './dpd'

const scraperRegistry: Record<string, ScraperFunction> = {
  hp: scrapeHrvatskaPosta,
  gls: scrapeGLS,
  dpd: scrapeDPD,
}

function getScraper(carrier: string): ScraperFunction | null {
  return scraperRegistry[carrier] ?? null
}
```

For carrier `other`, no scraping is available. The system returns only manually-entered events.

---

## Caching Strategy

Carrier sites should not be hammered with requests. Every tracking fetch is cached in the `tracking_cache` table.

**Cache rules:**
- **TTL:** 30 minutes. If cached data exists and `fetched_at` is less than 30 minutes ago, return cached data without hitting the carrier.
- **Cache miss:** Fetch from carrier, store result in `tracking_cache` (upsert on `tracking_number`), also insert new events into `tracking_events`.
- **Cache bypass:** Admin dashboard has a "Refresh" button that ignores the cache and fetches fresh data. Rate limited to 1 bypass per tracking number per 5 minutes.
- **Stale data fallback:** If the carrier fetch fails (network error, parse error, 5xx), return the cached data regardless of TTL. Add a `stale: true` flag and `lastSuccessfulFetch` timestamp to the response so the frontend can display "Last updated: 2 hours ago".
- **Delivered parcels:** Once status reaches `delivered`, stop refreshing. Cached data is final. The scraper is never called again for delivered parcels.
- **Event deduplication:** When inserting scraped events into `tracking_events`, deduplicate by `(order_id, timestamp, raw_status)`. Carrier pages often show the same events on repeated scrapes.

---

## API Endpoints

All tracking endpoints are Next.js API routes (`app/api/tracking/*/route.ts`, `app/api/admin/orders/*/route.ts`). Public endpoints use no authentication. Admin endpoints require API key.

### Public Endpoints

#### `GET /api/tracking/:trackingNumber`

Customer-facing tracking data. Returns normalized tracking info for display on the tracking page.

**Rate limit:** 30/min/IP

**Response 200:**
```json
{
  "success": true,
  "order": {
    "id": "ord_a1b2c3d4e5f6",
    "customerName": "Ivan",
    "productName": "NFC Business Card — Matte Black",
    "productImage": "/images/products/nfc-matte-black.webp",
    "trackingNumber": "RR123456789HR",
    "carrier": "hp",
    "carrierName": "Hrvatska Pošta",
    "carrierUrl": "https://posiljka.posta.hr/hr/tracking/trackingdata?barcode=RR123456789HR",
    "carrierPhone": "+385 0800 303 304",
    "status": "in_transit"
  },
  "events": [
    {
      "status": "in_transit",
      "timestamp": "2026-03-18T14:30:00+01:00",
      "location": "Zagreb, Sortirni centar",
      "description": "Parcel dispatched from sorting center"
    },
    {
      "status": "shipped",
      "timestamp": "2026-03-17T09:15:00+01:00",
      "location": "Zadar, Pošta",
      "description": "Parcel accepted at post office"
    }
  ],
  "stale": false,
  "fetchedAt": "2026-03-19T10:00:00+01:00"
}
```

**Response 404 — tracking number not found:**
```json
{
  "success": false,
  "error": "tracking_not_found",
  "message": "No order found with this tracking number."
}
```

**Response 404 — order exists but no tracking number yet:**
```json
{
  "success": false,
  "error": "not_yet_shipped",
  "message": "This order has not been shipped yet."
}
```

**Notes:**
- `customerName` returns only the first name (split on first space). Never expose the full name or email to a public endpoint.
- `carrierPhone` is a static lookup per carrier (not scraped).
- `events` are sorted most recent first.
- `stale: true` means the last scrape failed and cached data is being served. Frontend should display the `fetchedAt` timestamp.

### Admin Endpoints

All require `Authorization: Bearer <API_KEY>`.

#### `GET /api/admin/orders`

List all orders with pagination and filtering.

**Query params:** `?page=1&limit=20&status=in_transit&search=ivan`

**Response 200:**
```json
{
  "orders": [
    {
      "id": "ord_a1b2c3d4e5f6",
      "customerName": "Ivan Horvat",
      "customerEmail": "ivan@example.com",
      "productName": "NFC Business Card — Matte Black",
      "trackingNumber": "RR123456789HR",
      "carrier": "hp",
      "status": "in_transit",
      "trackingEmailSent": true,
      "createdAt": "2026-03-15T10:00:00+01:00",
      "updatedAt": "2026-03-18T14:30:00+01:00"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 47,
    "pages": 3
  }
}
```

#### `POST /api/admin/orders`

Create a new order.

**Request:**
```json
{
  "customerName": "Ivan Horvat",
  "customerEmail": "ivan@example.com",
  "customerLanguage": "hr",
  "productName": "NFC Business Card — Matte Black",
  "productImage": "/images/products/nfc-matte-black.webp",
  "trackingNumber": "RR123456789HR",
  "carrier": "hp",
  "notes": "Express shipping requested"
}
```

`trackingNumber` and `carrier` are optional at creation. An order can be created before the parcel ships.

**Response 201:**
```json
{
  "success": true,
  "id": "ord_a1b2c3d4e5f6"
}
```

**Side effect:** If `trackingNumber` and `carrier` are provided, the system immediately:
1. Fetches initial tracking data from the carrier
2. Stores events in `tracking_events`
3. Sends tracking email to customer (see Email Notification section)

#### `PUT /api/admin/orders/:id`

Update an existing order. Partial updates accepted (only send fields that changed).

**Request:**
```json
{
  "trackingNumber": "RR123456789HR",
  "carrier": "hp"
}
```

**Response 200:**
```json
{
  "success": true,
  "id": "ord_a1b2c3d4e5f6"
}
```

**Side effect:** If `trackingNumber` is being set for the first time (was NULL before) and `carrier` is provided, the system triggers the same flow as creation: fetch tracking data, send tracking email.

If `trackingNumber` is being updated (changed, not set for the first time), the system fetches new tracking data but does NOT re-send the email unless `resendEmail: true` is included in the request body.

#### `DELETE /api/admin/orders/:id`

Soft-delete by adding a `deleted_at` timestamp. The order disappears from the dashboard but data is preserved. Cascade: associated `tracking_events` are retained (for audit trail).

**Response 200:**
```json
{
  "success": true
}
```

#### `POST /api/admin/orders/:id/events`

Manually add a tracking event. Used when scraping fails or for carrier `other`.

**Request:**
```json
{
  "status": "in_transit",
  "timestamp": "2026-03-18T14:30:00+01:00",
  "location": "Zagreb",
  "description": "Parcel dispatched from warehouse"
}
```

**Response 201:**
```json
{
  "success": true,
  "eventId": "evt_x1y2z3w4v5u6"
}
```

#### `PUT /api/admin/orders/:id/status`

Override the order's current status. Also inserts a manual tracking event.

**Request:**
```json
{
  "status": "delivered",
  "description": "Confirmed delivered via phone"
}
```

**Response 200:**
```json
{
  "success": true
}
```

#### `POST /api/admin/orders/:id/refresh`

Force-refresh tracking data from the carrier, bypassing the 30-minute cache.

**Rate limit:** 1 per tracking number per 5 minutes.

**Response 200:**
```json
{
  "success": true,
  "events": [ ... ],
  "fetchedAt": "2026-03-19T10:05:00+01:00"
}
```

---

## Email Notification

### Trigger

The tracking email is sent exactly once per order, when:
1. An order is created with a `trackingNumber` and `carrier`, OR
2. An existing order has its `trackingNumber` set for the first time

The system checks `tracking_email_sent` before sending. If already sent, it does not re-send unless the admin explicitly requests it via `resendEmail: true` on the PUT endpoint.

### Template

Uses the same `sendEmail()` abstraction from `operations.md`. This adds a sixth email template to the existing five.

| Template | Trigger | Recipients |
|---|---|---|
| Tracking notification | Tracking number added to order | Customer |

**Template data:**

```ts
interface TrackingEmailData {
  customerName: string        // Full name
  productName: string
  trackingNumber: string
  carrierName: string         // "Hrvatska Pošta", "GLS", "DPD"
  trackingUrl: string         // https://version2.hr/tracking/?code={trackingNumber}
  language: 'en' | 'hr' | 'de'
}
```

**Subject lines:**

| Language | Subject |
|---|---|
| EN | `Your order has shipped — Track your package` |
| HR | `Vaša narudžba je poslana — Pratite svoju pošiljku` |
| DE | `Deine Bestellung wurde versendet — Verfolge dein Paket` |

**Email body includes:**
- Version2 logo (hosted, not embedded)
- Greeting with customer name
- Product name and tracking number
- Large "Track Your Package" CTA button linking to `https://version2.hr/tracking/?code={trackingNumber}` (or `/hr/tracking/` / `/de/tracking/` based on language)
- Carrier name and carrier's own tracking URL as secondary link
- "Questions? Reply to this email" footer with `info@version2.hr`

**Sender addresses:** Same as other emails — `From: noreply@version2.hr`, `Reply-To: info@version2.hr`.

---

## Frontend: Tracking Page

### Route Structure

| Language | Route | URL Pattern |
|---|---|---|
| EN | `/tracking/` | `https://version2.hr/tracking/?code=RR123456789HR` |
| HR | `/hr/tracking/` | `https://version2.hr/hr/tracking/?code=RR123456789HR` |
| DE | `/de/tracking/` | `https://version2.hr/de/tracking/?code=RR123456789HR` |

### Rendering Strategy

This page can be either client-rendered or server-rendered. With standalone mode, SSR is available — the tracking page can fetch data server-side and render a complete page on first load, improving perceived performance and eliminating the loading skeleton flash.

**Client-rendered approach** (simpler): One HTML shell per language, tracking data loads dynamically via `useEffect` + `fetch`. Wrapping the component using `useSearchParams` in a `<Suspense>` boundary is optional but recommended for clean loading states.

**SSR approach** (recommended): Use a Server Component that reads the `?code` search param via `searchParams` prop, fetches tracking data server-side, and renders the complete page. Falls back to client-side fetching for refresh/polling.

```tsx
// src/app/tracking/page.tsx
import { Suspense } from 'react'
import { TrackingPage } from '@/components/tracking/tracking-page'
import { TrackingPageSkeleton } from '@/components/tracking/tracking-page-skeleton'

export default function Page() {
  return (
    <Suspense fallback={<TrackingPageSkeleton />}>
      <TrackingPage language="en" />
    </Suspense>
  )
}
```

### Component Structure

```
src/components/tracking/
  tracking-page.tsx            # Main page: reads ?code, fetches data, orchestrates UI
  tracking-page-skeleton.tsx   # Loading skeleton for Suspense fallback
  tracking-progress-bar.tsx    # 5-stage visual progress indicator
  tracking-timeline.tsx        # Chronological event list
  tracking-carrier-card.tsx    # Carrier info (logo, name, phone, external link)
  tracking-product-card.tsx    # Product info (name, image)
  tracking-number-display.tsx  # Tracking number with copy-to-clipboard
  tracking-error.tsx           # Error state (not found, not shipped, generic)
  tracking-search.tsx          # Manual tracking number input (when no ?code param)
```

### Page States

**1. No `?code` parameter:**
Display a search form where the customer can manually enter their tracking number. Input field + "Track" button. Same dark cinematic aesthetic.

**2. Loading:**
Skeleton UI: pulsing placeholder bars for the progress indicator, timeline, and cards. Match the layout dimensions of the loaded state to prevent layout shift.

**3. Success — tracking data loaded:**
Full tracking view (see UI Components below).

**4. Error — tracking number not found:**
Centered message: "We couldn't find a shipment with this tracking number. Please check the number and try again." with a search form below to try a different number.

**5. Error — not yet shipped:**
Message: "Your order has been received and is being prepared. Tracking information will be available once your package ships." Display the order date if available.

**6. Error — generic/network failure:**
Message: "Something went wrong while loading your tracking information. Please try again in a few minutes." with a "Retry" button.

### UI Components

#### Progress Bar (`tracking-progress-bar.tsx`)

Five stages arranged horizontally (desktop) or vertically (mobile). Each stage has:
- An icon (Lucide: `ShoppingCart`, `Package`, `Truck`, `MapPin`, `CircleCheck`)
- A label (Ordered, Ready, In Transit, Out for Delivery, Delivered)
- Active/inactive/current visual states

**Active:** filled red icon (#991717), white label, connecting line is red
**Current:** pulsing red glow animation on the icon, bold label
**Inactive:** muted gray icon, dim label, gray connecting line

**Exception/returned status:** The progress bar freezes at the last known good stage. An alert banner appears above the bar with an amber/red warning: "Delivery exception — contact the carrier for details."

**Animation:** On page load, the stages fill in sequentially with a 150ms stagger (GSAP). The current stage icon has a subtle breathing pulse (CSS animation, not GSAP — this loops indefinitely).

#### Event Timeline (`tracking-timeline.tsx`)

Vertical timeline, most recent event at top. Each event shows:
- Status icon (small, colored dot matching the status)
- Timestamp (formatted per locale: "18. ožu 2026. u 14:30" for HR, "Mar 18, 2026 at 2:30 PM" for EN)
- Location (if available)
- Description text

The most recent event is visually emphasized (slightly larger, bolder). Older events progressively dim.

If `stale: true`, display a small notice above the timeline: "Last updated {fetchedAt}. Carrier data may be delayed."

#### Carrier Card (`tracking-carrier-card.tsx`)

Small card showing:
- Carrier logo (static SVG/PNG stored in `public/images/carriers/`)
- Carrier name
- Phone number (clickable `tel:` link on mobile)
- "Track on carrier site" link (opens carrier's tracking page in new tab)

#### Product Card (`tracking-product-card.tsx`)

Small card showing:
- Product image (if available, else a generic package icon)
- Product name

#### Tracking Number Display (`tracking-number-display.tsx`)

The tracking number displayed in a monospace-style presentation with a "Copy" button (Lucide `Copy` icon). On click, copies to clipboard and shows a brief "Copied!" toast or icon change (Lucide `Check`).

### SEO

- `<meta name="robots" content="noindex">` — tracking pages should never be indexed
- No canonical, no hreflang (tracking URLs are ephemeral, per-customer)
- Page title: "Track Your Order — Version2" (translated per language)

### Accessibility

- Progress bar uses `role="progressbar"` with `aria-valuenow` (current stage 1-5) and `aria-valuemax="5"`
- Timeline uses `<ol>` with each event as `<li>`
- Copy button has `aria-label="Copy tracking number to clipboard"`
- Error states are announced via `aria-live="polite"` region
- All interactive elements are keyboard-navigable

---

## Multi-Language Support

### UI Strings

Add to `ui-strings.ts`:

```ts
tracking: {
  page_title: {
    en: 'Track Your Order',
    hr: 'Pratite svoju narudžbu',
    de: 'Verfolge deine Bestellung',
  },
  search_placeholder: {
    en: 'Enter your tracking number',
    hr: 'Unesite broj za praćenje',
    de: 'Gib deine Sendungsnummer ein',
  },
  search_button: {
    en: 'Track',
    hr: 'Prati',
    de: 'Verfolgen',
  },
  stage_ordered: {
    en: 'Ordered',
    hr: 'Naručeno',
    de: 'Bestellt',
  },
  stage_ready: {
    en: 'Ready',
    hr: 'Spremno',
    de: 'Bereit',
  },
  stage_in_transit: {
    en: 'In Transit',
    hr: 'U prijevozu',
    de: 'Unterwegs',
  },
  stage_out_for_delivery: {
    en: 'Out for Delivery',
    hr: 'U dostavi',
    de: 'In Zustellung',
  },
  stage_delivered: {
    en: 'Delivered',
    hr: 'Dostavljeno',
    de: 'Zugestellt',
  },
  error_not_found: {
    en: "We couldn't find a shipment with this tracking number. Please check the number and try again.",
    hr: 'Nismo pronašli pošiljku s ovim brojem. Provjerite broj i pokušajte ponovo.',
    de: 'Wir konnten keine Sendung mit dieser Nummer finden. Bitte überprüfe die Nummer und versuche es erneut.',
  },
  error_not_shipped: {
    en: 'Your order has been received and is being prepared. Tracking information will be available once your package ships.',
    hr: 'Vaša narudžba je zaprimljena i priprema se. Informacije o praćenju bit će dostupne kad pošiljka bude poslana.',
    de: 'Deine Bestellung wurde empfangen und wird vorbereitet. Tracking-Informationen sind verfügbar, sobald dein Paket versendet wird.',
  },
  error_generic: {
    en: 'Something went wrong. Please try again in a few minutes.',
    hr: 'Nešto je pošlo po krivu. Pokušajte ponovo za nekoliko minuta.',
    de: 'Etwas ist schiefgelaufen. Bitte versuche es in ein paar Minuten erneut.',
  },
  exception_alert: {
    en: 'Delivery exception — contact the carrier for details.',
    hr: 'Problem s dostavom — kontaktirajte dostavljača za detalje.',
    de: 'Zustellungsproblem — kontaktiere den Zusteller für Details.',
  },
  stale_notice: {
    en: 'Last updated {time}. Carrier data may be delayed.',
    hr: 'Zadnje ažuriranje {time}. Podaci dostavljača mogu kasniti.',
    de: 'Zuletzt aktualisiert {time}. Zustellerdaten können verzögert sein.',
  },
  copy_tracking: {
    en: 'Copy tracking number',
    hr: 'Kopiraj broj za praćenje',
    de: 'Sendungsnummer kopieren',
  },
  copied: {
    en: 'Copied!',
    hr: 'Kopirano!',
    de: 'Kopiert!',
  },
  track_on_carrier: {
    en: 'Track on carrier site',
    hr: 'Prati na stranici dostavljača',
    de: 'Auf Zustellerseite verfolgen',
  },
  retry: {
    en: 'Retry',
    hr: 'Pokušaj ponovo',
    de: 'Erneut versuchen',
  },
}
```

### Event Descriptions

Carrier scrapers return Croatian-language status text. The backend translates event descriptions to the customer's language before returning the response. Translation is a simple lookup table per carrier per status — not a dynamic translation service.

For carrier `other` with manual events, the admin enters the description in the customer's language.

---

## Carrier Reference Data

Static data stored in a constants file, not in the database.

```ts
const CARRIER_INFO = {
  hp: {
    name: 'Hrvatska Pošta',
    phone: '0800 303 304',
    trackingUrl: (code: string) =>
      `https://posiljka.posta.hr/hr/tracking/trackingdata?barcode=${code}`,
    logo: '/images/carriers/hrvatska-posta.svg',
  },
  gls: {
    name: 'GLS',
    phone: '+385 1 5765 375',
    trackingUrl: (code: string) =>
      `https://gls-group.com/HR/hr/pracenje-posiljaka?match=${code}`,
    logo: '/images/carriers/gls.svg',
  },
  dpd: {
    name: 'DPD',
    phone: '+385 1 6695 611',
    trackingUrl: (code: string) =>
      `https://tracking.dpd.de/status/hr_HR/parcel/${code}`,
    logo: '/images/carriers/dpd.svg',
  },
  other: {
    name: 'Other',
    phone: null,
    trackingUrl: () => null,
    logo: '/images/carriers/package-generic.svg',
  },
} as const
```

---

## Error Handling

### Scraper Failures

Carrier websites change without notice. When a scraper fails:

1. **Parse error:** Log the raw HTML response to a `scraper_errors` log (file-based, rotated weekly). Return cached data with `stale: true`. If no cache exists, return the order info with an empty events array and a `scraperUnavailable: true` flag.

2. **Network error (timeout, DNS failure):** Same as parse error. Scraper timeout: 10 seconds per carrier request.

3. **Carrier returning different structure:** This is the most common failure mode. The scraper should be defensive — if an expected DOM element is missing, skip that event rather than crashing. Return whatever events were successfully parsed.

4. **Monitoring:** Track scraper success/failure rate. If a carrier's failure rate exceeds 50% over 24 hours, send an alert email to `info@version2.hr` with the carrier name and sample error. This signals the scraper needs updating.

### API Error Responses

All error responses follow the same shape used across the backend:

```json
{
  "success": false,
  "error": "error_code",
  "message": "Human-readable message"
}
```

HTTP status codes:
- `200` — success
- `201` — created (new order, new event)
- `400` — validation error (missing fields, invalid carrier)
- `404` — order/tracking number not found
- `429` — rate limited
- `500` — internal server error (scraper crash, database error)

### Input Validation (Zod)

```ts
import { z } from 'zod'

const createOrderSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email().max(254),
  customerLanguage: z.enum(['en', 'hr', 'de']),
  productName: z.string().min(2).max(200),
  productImage: z.string().max(500).nullable().optional(),
  trackingNumber: z.string().min(5).max(50).nullable().optional(),
  carrier: z.enum(['hp', 'gls', 'dpd', 'other']).nullable().optional(),
  notes: z.string().max(1000).nullable().optional(),
})

const updateOrderSchema = createOrderSchema.partial()

const manualEventSchema = z.object({
  status: z.enum([
    'ordered', 'processing', 'shipped', 'in_transit',
    'out_for_delivery', 'delivered', 'exception', 'returned',
  ]),
  timestamp: z.string().datetime(),
  location: z.string().max(200).nullable().optional(),
  description: z.string().min(2).max(500),
})

const statusOverrideSchema = z.object({
  status: z.enum([
    'ordered', 'processing', 'shipped', 'in_transit',
    'out_for_delivery', 'delivered', 'exception', 'returned',
  ]),
  description: z.string().min(2).max(500),
})
```

---

## Rate Limits

Added to the existing rate limit table in `data-security.md`:

| Endpoint | Limit | Window |
|---|---|---|
| `GET /api/tracking/:trackingNumber` | 30 requests | per minute per IP |
| `POST /api/admin/orders/:id/refresh` | 1 request per tracking number | per 5 minutes |
| Admin order CRUD endpoints | 60 requests | per minute (shared CMS limit) |

---

## Dependencies

**New backend dependencies:**

| Package | Purpose |
|---|---|
| `node-html-parser` | Parse carrier HTML responses (lightweight, no headless browser) |

No new frontend dependencies. The tracking page uses existing libraries (React, Lucide icons, GSAP for entrance animations).

---

## Implementation Order

1. **Database schema** — Add the three tables via Drizzle migration
2. **Carrier scrapers** — Implement HP first (most common), then GLS, then DPD. Test against real tracking numbers.
3. **Admin API endpoints** — CRUD for orders, manual events, status override
4. **Public tracking API** — `GET /api/tracking/:trackingNumber` with caching
5. **Email template** — Tracking notification email in 3 languages
6. **Frontend tracking page** — Progress bar, timeline, cards, error states
7. **Admin dashboard UI** — Order list, create/edit forms (part of the larger CMS dashboard)

---

## Related Files

- [form-architecture.md](form-architecture.md) — Shared validation patterns
- [../backend/api-contracts.md](../backend/api-contracts.md) — Existing API endpoint reference (tracking endpoints extend this)
- [../backend/data-security.md](../backend/data-security.md) — Database schema (tracking tables extend this)
- [../backend/operations.md](../backend/operations.md) — Email infrastructure (tracking email uses same `sendEmail()`)
- [../setup/config.md](../setup/config.md) — Static export constraints (Suspense boundary for useSearchParams)
- [../setup/deployment-strategy.md](../setup/deployment-strategy.md) — Deployment architecture for the backend
