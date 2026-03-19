# Integrations

> Analytics, cookie consent, font loading, maps, and social media links for Version2.hr.
> Related: [form-architecture.md](form-architecture.md), [form-specs.md](form-specs.md)

---

## Analytics

### Google Analytics 4
- Measurement ID: `GT-NBBTZS5`
- Load via `next/script` with `strategy="afterInteractive"`
- Consent-gated: only fire after cookie consent is given
- Track: page views, form submissions, pricing tool completion, CTA clicks

### Google Ads
- IDs: `AW-11213118615`, `AW-16539026255`
- Load alongside GA4
- Conversion tracking on form submissions and pricing tool completion
- **Consent:** Google Ads conversion tracking is consent-gated under the same analytics toggle as GA4 (simplified — no separate marketing category in v1)

### Facebook Pixel
- ID: `557616629917733`
- Load via `next/script` with `strategy="afterInteractive"`
- Consent-gated
- Track: page views, contact form leads, pricing tool leads

### Implementation Pattern

```tsx
// Load analytics only after cookie consent
{hasConsent && (
  <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=GT-NBBTZS5" strategy="afterInteractive" />
    <Script id="gtag-init" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || []; ...`}
    </Script>
  </>
)}
```

### Custom Analytics Backend

In addition to GA4 and Facebook Pixel, the custom backend tracks:
- Page visits and navigation patterns
- Button/link clicks
- Scroll depth
- Time on page
- Conversion events (form submissions, pricing tool completions, booking requests)

Full control over this data. No third-party dependency. Accessible through the backend dashboard. Consent-gated alongside GA4/Pixel.

---

## Cookie Consent

Custom-built GDPR banner. No third-party cookie consent libraries.

### Requirements
- Banner appears on first visit
- Options: Accept All, Decline All, Customize
- Stores preference in localStorage or cookie
- Blocks all analytics scripts (GA4, Google Ads, Facebook Pixel, custom analytics) until consent is given
- Must be dismissible and re-accessible (link in footer)

### Categories
- **Necessary** (always on): site functionality, language preference, consent storage
- **Analytics** (opt-in): GA4, custom analytics backend
- **Marketing:** Not currently used. No marketing or advertising cookies. If introduced in the future, explicit consent will be required. See `content/pages/kolacici/en.md` for the definitive cookie inventory.

### Storage & State Management

- **Storage key:** `v2_cookie_consent` in `localStorage`
- **Value format:** JSON string: `{ "necessary": true, "analytics": boolean, "timestamp": ISO8601, "version": number }`
- **Version field:** Incremented when cookie categories change. If stored version < current version, re-display the banner.
- **Re-display trigger:** Footer link "Cookie Settings" opens the same banner/modal. Also re-displays if `v2_cookie_consent` is missing or version is outdated.
- **Consent check function:** `hasAnalyticsConsent(): boolean` — reads from localStorage, returns `false` if missing/expired/declined. All analytics scripts gate on this.
- **Banner position:** Fixed bottom of viewport. Z-index above page content, below modals.
- **Initial version:** `1`. Increment by 1 each time cookie categories change (e.g., adding a marketing category).
- **Version bump behavior:** If stored version < current version, banner re-displays. Old preference is discarded — user must re-consent with the new category set.
- **No expiry on consent itself** — persists until cleared or version bumps. GDPR withdrawal requirement satisfied by the footer link.

---

## Font Loading

- Self-hosted via `next/font`
- No external CDN calls (Google Fonts)
- Subset to Latin + Latin Extended for Croatian diacritics

---

## Maps

- Google Maps embed on contact page
- Load lazily (only when scrolled into view)
- Consider a static map image with a "View on Google Maps" link as a lighter alternative

---

## Social Media Links

Outbound links only. No embedded feeds or widgets:
- Facebook: https://facebook.com/version2hr
- Instagram: https://instagram.com/version2hr
- TikTok: https://tiktok.com/@version2hr
- X: https://x.com/version2hr
- WhatsApp: Simple wa.me click-to-chat link: `https://wa.me/385995617706`. Pre-filled message optional. No Business API integration in v1.

---

## NFC Card E-Commerce + app.version2.hr Integration

The NFC card product bridges version2.hr (ordering) and app.version2.hr (digital card profiles).

### Sales Flow

1. Customer browses NFC card product page on version2.hr (design options, pricing).
2. Customer adds card to cart and completes checkout via Stripe.
3. After successful payment, the version2.hr backend calls app.version2.hr API to provision the customer's digital card account.
4. Customer receives two things:
   - **Physical NFC card** — shipped to their address, tracked via parcel tracking (see `docs/features/parcel-tracking.md`).
   - **Digital card profile** — hosted at app.version2.hr, accessible immediately after account creation.

### API Integration

- **Endpoint:** `POST https://app.version2.hr/api/create-account`
- **Payload:**
  ```json
  {
    "email": "customer@example.com",
    "name": "Customer Name",
    "cardDesign": "midnight-black",
    "orderId": "ord_abc123",
    "phone": "+385...",
    "locale": "en"
  }
  ```
- **Response:** `201 Created` with `{ accountId, profileUrl }` on success.
- **Auth:** Shared API key passed via `Authorization: Bearer <API_KEY>` header. Key stored in environment variable `APP_V2_API_KEY` on both services.
- **Error handling:** If the API call fails (timeout, 5xx), queue for retry with exponential backoff. Customer is notified that their digital profile is being set up. Manual fallback: admin can trigger account creation from the order management dashboard.

### Environment Variables

| Variable | Service | Purpose |
|----------|---------|---------|
| `STRIPE_SECRET_KEY` | version2.hr | Stripe payment processing |
| `STRIPE_WEBHOOK_SECRET` | version2.hr | Verify Stripe webhook signatures |
| `APP_V2_API_KEY` | version2.hr + app.version2.hr | Authenticate cross-service API calls |

---

## Related Files

- [form-architecture.md](form-architecture.md) — Validation, error display, spam prevention
- [form-specs.md](form-specs.md) — Per-form specifications
- [../backend/api-contracts.md](../backend/api-contracts.md) — Analytics event ingestion endpoint
- [../backend/operations.md](../backend/operations.md) — Custom analytics backend details
- [../setup/config.md](../setup/config.md) — Environment variables for analytics IDs
