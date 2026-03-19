# Form Validation Specifications

> Zod v4 schemas, server error handling, and API envelope contracts for every form on Version2.hr.
> Related: [form-specs.md](form-specs.md), [form-architecture.md](form-architecture.md), [../backend/api-contracts.md](../backend/api-contracts.md)

---

## Overview

| Form | Location | Endpoint | Purpose |
|------|----------|----------|---------|
| **Contact** | `/contact/` | `POST /api/contact` | General inquiries |
| **Analysis** | `/analysis/` | `POST /api/contact` (`type: "analysis"`) | Free website audit requests |
| **Booking** | `/contact/#book-a-call` | `POST /api/booking` | Consultation scheduling |
| **Pricing** | `/pricing/` (summary step) | `POST /api/pricing` | Estimate submission with full configurator state |
| **Career** | `/career/` | `POST /api/career` | Junior developer applications |
| **AI Chat** | FAB on every page | `POST /api/chat` | Conversational AI messages |

All forms share React Hook Form + `@hookform/resolvers/zod` on the client, and identical Zod schemas on the Next.js API route handlers. The frontend validates on blur and on submit. The backend re-validates every request before processing.

---

## Shared Constants

```typescript
// file: src/lib/validation/constants.ts

export const FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 5000,
  URL_MAX: 500,
  CHAT_MESSAGE_MAX: 1000,
  HONEYPOT_FIELD: '_honey',
} as const;

export const SUPPORTED_LANGUAGES = ['en', 'hr', 'de'] as const;

export const CONTACT_METHODS = ['email', 'whatsapp', 'phone'] as const;

export const PROJECT_TYPES = ['website', 'webshop', 'webapp'] as const;

export const SCOPE_OPTIONS = [
  'landing', 'business', 'corporate', 'enterprise',
  'starter', 'growing',
  'simple', 'complex',
] as const;

export const DESIGN_OPTIONS = ['reference', 'custom', 'brand'] as const;

export const TIMELINE_OPTIONS = ['flexible', 'standard', 'priority'] as const;

export const MAINTENANCE_TIERS = [
  'maintenance_none',
  'maintenance_basic',
  'maintenance_standard',
  'maintenance_premium',
] as const;
```

---

## Shared Field Schemas

```typescript
// file: src/lib/validation/fields.ts

import { z } from 'zod';
import { FIELD_LIMITS, SUPPORTED_LANGUAGES, HONEYPOT_FIELD } from './constants';

/** Reusable name field — 2-100 chars, trimmed. */
export const nameField = z
  .string({ error: 'Name is required' })
  .trim()
  .min(FIELD_LIMITS.NAME_MIN, { error: 'Name must be at least 2 characters' })
  .max(FIELD_LIMITS.NAME_MAX, { error: 'Name cannot exceed 100 characters' });

/** Reusable email field — valid format, max 254 chars, lowercased. */
export const emailField = z
  .string({ error: 'Email is required' })
  .trim()
  .email({ error: 'Please enter a valid email address' })
  .max(FIELD_LIMITS.EMAIL_MAX, { error: 'Email cannot exceed 254 characters' })
  .transform((val) => val.toLowerCase());

/** Reusable message/description field — 10-5000 chars, trimmed. */
export const messageField = z
  .string({ error: 'Message is required' })
  .trim()
  .min(FIELD_LIMITS.MESSAGE_MIN, { error: 'Message must be at least 10 characters' })
  .max(FIELD_LIMITS.MESSAGE_MAX, { error: 'Message cannot exceed 5000 characters' });

/** Optional message — 0 or 10-5000 chars. Empty string coerced to undefined. */
export const optionalMessageField = z
  .string()
  .trim()
  .transform((val) => (val === '' ? undefined : val))
  .pipe(
    z.union([
      z.undefined(),
      z
        .string()
        .min(FIELD_LIMITS.MESSAGE_MIN, { error: 'If provided, message must be at least 10 characters' })
        .max(FIELD_LIMITS.MESSAGE_MAX, { error: 'Message cannot exceed 5000 characters' }),
    ]),
  );

/** URL field — valid URL, max 500 chars. */
export const urlField = z
  .string({ error: 'URL is required' })
  .trim()
  .url({ error: 'Please enter a valid URL' })
  .max(FIELD_LIMITS.URL_MAX, { error: 'URL cannot exceed 500 characters' });

/** Optional URL — empty string coerced to undefined. */
export const optionalUrlField = z
  .string()
  .trim()
  .transform((val) => (val === '' ? undefined : val))
  .pipe(
    z.union([
      z.undefined(),
      z
        .string()
        .url({ error: 'Please enter a valid URL' })
        .max(FIELD_LIMITS.URL_MAX, { error: 'URL cannot exceed 500 characters' }),
    ]),
  );

/** Language field — one of en, hr, de. */
export const languageField = z.enum(SUPPORTED_LANGUAGES, {
  error: 'Language must be one of: en, hr, de',
});

/** Honeypot field — must be empty string or absent. Presence of content = bot. */
export const honeypotField = z
  .string()
  .max(0)
  .optional()
  .default('');
```

---

## Form Schemas

### 1. Contact Form

**Location:** `/contact/#contact-form`
**Endpoint:** `POST /api/contact`
**Fields:** name, email, message, honeypot

```typescript
// file: src/lib/validation/schemas/contact-schema.ts

import { z } from 'zod';
import { nameField, emailField, messageField, honeypotField, languageField } from '../fields';

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  message: messageField,
  _honey: honeypotField,
});

/** Full payload sent to backend — adds language for email template selection. */
export const contactPayloadSchema = contactSchema.extend({
  language: languageField,
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactPayload = z.infer<typeof contactPayloadSchema>;
```

| Field | Type | Required | Min | Max | Format | Notes |
|-------|------|----------|-----|-----|--------|-------|
| `name` | string | Yes | 2 | 100 | Text, trimmed | |
| `email` | string | Yes | — | 254 | Valid email, lowercased | |
| `message` | string | Yes | 10 | 5000 | Text, trimmed | |
| `_honey` | string | No | — | 0 | Empty string | Bot trap |
| `language` | enum | Yes (payload) | — | — | `en \| hr \| de` | Added by frontend before POST |

---

### 2. Analysis Form

**Location:** `/analysis/`
**Endpoint:** `POST /api/contact` with `type: "analysis"`
**Fields:** name, email, websiteUrl, message (optional), honeypot

```typescript
// file: src/lib/validation/schemas/analysis-schema.ts

import { z } from 'zod';
import {
  nameField,
  emailField,
  urlField,
  optionalMessageField,
  honeypotField,
  languageField,
} from '../fields';

export const analysisSchema = z.object({
  name: nameField,
  email: emailField,
  websiteUrl: urlField,
  message: optionalMessageField,
  _honey: honeypotField,
});

/** Full payload — adds type discriminator and language. */
export const analysisPayloadSchema = analysisSchema.extend({
  type: z.literal('analysis'),
  language: languageField,
});

export type AnalysisFormData = z.infer<typeof analysisSchema>;
export type AnalysisPayload = z.infer<typeof analysisPayloadSchema>;
```

| Field | Type | Required | Min | Max | Format | Notes |
|-------|------|----------|-----|-----|--------|-------|
| `name` | string | Yes | 2 | 100 | Text, trimmed | |
| `email` | string | Yes | — | 254 | Valid email, lowercased | |
| `websiteUrl` | string | Yes | — | 500 | Valid URL | Must include protocol (`https://`) |
| `message` | string | No | 10 | 5000 | Text, trimmed | If provided, minimum 10 chars |
| `type` | literal | Yes (payload) | — | — | `"analysis"` | Discriminator for backend routing |
| `_honey` | string | No | — | 0 | Empty string | Bot trap |
| `language` | enum | Yes (payload) | — | — | `en \| hr \| de` | Added by frontend before POST |

---

### 3. Booking Form

**Location:** `/contact/#book-a-call`
**Endpoint:** `POST /api/booking`
**Fields:** name, email, date, time, contactMethod, description (optional), honeypot

```typescript
// file: src/lib/validation/schemas/booking-schema.ts

import { z } from 'zod';
import {
  nameField,
  emailField,
  optionalMessageField,
  honeypotField,
  languageField,
} from '../fields';
import { CONTACT_METHODS } from '../constants';

/** ISO date string in YYYY-MM-DD format. */
const bookingDateField = z
  .string({ error: 'Please select a date' })
  .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'Date must be in YYYY-MM-DD format' })
  .refine(
    (val) => {
      const date = new Date(val);
      const day = date.getUTCDay();
      // 3 = Wednesday, 4 = Thursday, 5 = Friday
      return day === 3 || day === 4 || day === 5;
    },
    { error: 'Bookings are only available on Wednesday, Thursday, and Friday' },
  )
  .refine(
    (val) => {
      const date = new Date(val);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const minDate = new Date(today);
      minDate.setDate(minDate.getDate() + 2);
      const maxDate = new Date(today);
      maxDate.setDate(maxDate.getDate() + 14);
      return date >= minDate && date <= maxDate;
    },
    { error: 'Bookings must be 2-14 days in advance' },
  );

/** Time slot in HH:MM format — one of the 4 available slots. */
const bookingTimeField = z
  .string({ error: 'Please select a time slot' })
  .regex(/^\d{2}:\d{2}$/, { error: 'Time must be in HH:MM format' })
  .refine(
    (val) => ['14:00', '14:45', '15:30', '16:15'].includes(val),
    { error: 'Please select a valid time slot (14:00, 14:45, 15:30, or 16:15)' },
  );

const contactMethodField = z.enum(CONTACT_METHODS, {
  error: 'Please select a contact method: email, whatsapp, or phone',
});

export const bookingSchema = z.object({
  name: nameField,
  email: emailField,
  date: bookingDateField,
  time: bookingTimeField,
  contactMethod: contactMethodField,
  description: optionalMessageField,
  _honey: honeypotField,
});

/** Full payload — adds language. */
export const bookingPayloadSchema = bookingSchema.extend({
  language: languageField,
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type BookingPayload = z.infer<typeof bookingPayloadSchema>;
```

| Field | Type | Required | Min | Max | Format | Notes |
|-------|------|----------|-----|-----|--------|-------|
| `name` | string | Yes | 2 | 100 | Text, trimmed | |
| `email` | string | Yes | — | 254 | Valid email, lowercased | |
| `date` | string | Yes | — | — | `YYYY-MM-DD` | Wed/Thu/Fri only, 2-14 days ahead |
| `time` | string | Yes | — | — | `HH:MM` | One of: `14:00`, `14:45`, `15:30`, `16:15` |
| `contactMethod` | enum | Yes | — | — | `email \| whatsapp \| phone` | Radio group selection |
| `description` | string | No | 10 | 5000 | Text, trimmed | If provided, minimum 10 chars |
| `_honey` | string | No | — | 0 | Empty string | Bot trap |
| `language` | enum | Yes (payload) | — | — | `en \| hr \| de` | Added by frontend before POST |

**Server-side additional validation:** The backend also checks slot availability against Google Calendar before confirming. A slot that passes schema validation can still fail with a 409 Conflict if it was booked between the time the visitor loaded the page and submitted the form.

---

### 4. Pricing Estimate Form

**Location:** `/pricing/` (summary step CTA)
**Endpoint:** `POST /api/pricing`
**Fields:** name, email, message (optional), language, selections, calculatedEstimate, honeypot

```typescript
// file: src/lib/validation/schemas/pricing-schema.ts

import { z } from 'zod';
import {
  nameField,
  emailField,
  optionalMessageField,
  honeypotField,
  languageField,
} from '../fields';
import {
  PROJECT_TYPES,
  SCOPE_OPTIONS,
  DESIGN_OPTIONS,
  TIMELINE_OPTIONS,
  MAINTENANCE_TIERS,
} from '../constants';

/** A [min, max] price range tuple — both non-negative integers. */
const priceRangeTuple = z
  .tuple([
    z.number().int().nonnegative(),
    z.number().int().nonnegative(),
  ])
  .refine(([min, max]) => min <= max, {
    error: 'Minimum price must not exceed maximum price',
  });

/** Feature/addon ID — lowercase alphanumeric with underscores. */
const optionIdArray = z
  .array(z.string().regex(/^[a-z][a-z0-9_]*$/, { error: 'Invalid option ID format' }))
  .default([]);

/** Quantity map — option ID to positive integer. */
const quantityMap = z
  .record(
    z.string().regex(/^[a-z][a-z0-9_]*$/),
    z.number().int().positive(),
  )
  .default({});

const selectionsSchema = z.object({
  projectType: z.enum(PROJECT_TYPES, { error: 'Invalid project type' }),
  scope: z.enum(SCOPE_OPTIONS, { error: 'Invalid scope selection' }),
  design: z.enum(DESIGN_OPTIONS, { error: 'Invalid design selection' }),
  timeline: z.enum(TIMELINE_OPTIONS, { error: 'Invalid timeline selection' }),
  features: optionIdArray,
  featureQuantities: quantityMap,
  ecommerce: optionIdArray,
  integrations: optionIdArray,
  integrationQuantities: quantityMap,
  designAddons: optionIdArray,
  services: optionIdArray,
  serviceQuantities: quantityMap,
  maintenance: z.enum(MAINTENANCE_TIERS, { error: 'Invalid maintenance tier' }),
});

const calculatedEstimateSchema = z.object({
  oneTime: priceRangeTuple,
  monthly: priceRangeTuple,
  yearly: priceRangeTuple,
});

export const pricingSchema = z.object({
  name: nameField,
  email: emailField,
  message: optionalMessageField,
  language: languageField,
  selections: selectionsSchema,
  calculatedEstimate: calculatedEstimateSchema,
  _honey: honeypotField,
});

export type PricingFormData = z.infer<typeof pricingSchema>;
export type PricingSelections = z.infer<typeof selectionsSchema>;
export type PriceEstimate = z.infer<typeof calculatedEstimateSchema>;
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | Yes | 2-100 chars, trimmed |
| `email` | string | Yes | Valid email, max 254, lowercased |
| `message` | string | No | 10-5000 chars if provided |
| `language` | enum | Yes | `en \| hr \| de` |
| `selections.projectType` | enum | Yes | `website \| webshop \| webapp` |
| `selections.scope` | enum | Yes | Varies by project type (see below) |
| `selections.design` | enum | Yes | `reference \| custom \| brand` |
| `selections.timeline` | enum | Yes | `flexible \| standard \| priority` |
| `selections.features` | string[] | No | Array of option IDs |
| `selections.featureQuantities` | Record | No | `{ optionId: quantity }` |
| `selections.ecommerce` | string[] | No | Array of option IDs (webshop only) |
| `selections.integrations` | string[] | No | Array of option IDs |
| `selections.integrationQuantities` | Record | No | `{ optionId: quantity }` |
| `selections.designAddons` | string[] | No | Array of option IDs |
| `selections.services` | string[] | No | Array of option IDs |
| `selections.serviceQuantities` | Record | No | `{ optionId: quantity }` |
| `selections.maintenance` | enum | Yes | One of 4 tiers (mutually exclusive) |
| `calculatedEstimate.oneTime` | [number, number] | Yes | Non-negative integers, min <= max |
| `calculatedEstimate.monthly` | [number, number] | Yes | Non-negative integers, min <= max |
| `calculatedEstimate.yearly` | [number, number] | Yes | Non-negative integers, min <= max |
| `_honey` | string | No | Empty string, bot trap |

**Valid scope values by project type:**

| Project Type | Valid Scopes |
|-------------|-------------|
| `website` | `landing`, `business`, `corporate`, `enterprise` |
| `webshop` | `starter`, `growing`, `enterprise` |
| `webapp` | `simple`, `complex`, `enterprise` |

**Server-side additional validation:** The backend recalculates the estimate from `selections` using the same `pricing-config.json` formula. If the server result diverges from `calculatedEstimate`, the backend logs the discrepancy and uses the server-calculated value. This prevents client-side price manipulation.

---

### 5. Career Application Form

**Location:** `/career/#apply`
**Endpoint:** `POST /api/career`
**Fields:** name, email, portfolioUrl (optional), message, honeypot

```typescript
// file: src/lib/validation/schemas/career-schema.ts

import { z } from 'zod';
import {
  nameField,
  emailField,
  messageField,
  optionalUrlField,
  honeypotField,
  languageField,
} from '../fields';

export const careerSchema = z.object({
  name: nameField,
  email: emailField,
  portfolioUrl: optionalUrlField,
  message: messageField,
  _honey: honeypotField,
});

/** Full payload — adds language. */
export const careerPayloadSchema = careerSchema.extend({
  language: languageField,
});

export type CareerFormData = z.infer<typeof careerSchema>;
export type CareerPayload = z.infer<typeof careerPayloadSchema>;
```

| Field | Type | Required | Min | Max | Format | Notes |
|-------|------|----------|-----|-----|--------|-------|
| `name` | string | Yes | 2 | 100 | Text, trimmed | |
| `email` | string | Yes | — | 254 | Valid email, lowercased | |
| `portfolioUrl` | string | No | — | 500 | Valid URL | GitHub, Dribbble, personal site, etc. |
| `message` | string | Yes | 10 | 5000 | Text, trimmed | "Show us what you've built" |
| `_honey` | string | No | — | 0 | Empty string | Bot trap |
| `language` | enum | Yes (payload) | — | — | `en \| hr \| de` | Added by frontend before POST |

---

### 6. AI Chat Message

**Location:** FAB on every page
**Endpoint:** `POST /api/chat`
**Fields:** message, conversationId (optional), language

```typescript
// file: src/lib/validation/schemas/chat-schema.ts

import { z } from 'zod';
import { languageField } from '../fields';
import { FIELD_LIMITS } from '../constants';

export const chatMessageSchema = z.object({
  conversationId: z
    .string()
    .uuid({ error: 'Invalid conversation ID' })
    .optional(),
  message: z
    .string({ error: 'Message is required' })
    .trim()
    .min(1, { error: 'Message cannot be empty' })
    .max(FIELD_LIMITS.CHAT_MESSAGE_MAX, { error: 'Message cannot exceed 1000 characters' }),
  language: languageField,
});

export type ChatMessageData = z.infer<typeof chatMessageSchema>;
```

| Field | Type | Required | Min | Max | Format | Notes |
|-------|------|----------|-----|-----|--------|-------|
| `conversationId` | string | No | — | — | UUID v4 | Omit to start new conversation |
| `message` | string | Yes | 1 | 1000 | Text, trimmed | |
| `language` | enum | Yes | — | — | `en \| hr \| de` | Determines RAG language and reply language |

**Conversation limits enforced server-side:** Max 50 messages per conversation. The backend returns a specific error when this limit is hit (see error handling below).

---

## Barrel Export

```typescript
// file: src/lib/validation/index.ts

export { FIELD_LIMITS, SUPPORTED_LANGUAGES, CONTACT_METHODS, PROJECT_TYPES, SCOPE_OPTIONS, DESIGN_OPTIONS, TIMELINE_OPTIONS, MAINTENANCE_TIERS } from './constants';
export { nameField, emailField, messageField, optionalMessageField, urlField, optionalUrlField, languageField, honeypotField } from './fields';
export { contactSchema, contactPayloadSchema, type ContactFormData, type ContactPayload } from './schemas/contact-schema';
export { analysisSchema, analysisPayloadSchema, type AnalysisFormData, type AnalysisPayload } from './schemas/analysis-schema';
export { bookingSchema, bookingPayloadSchema, type BookingFormData, type BookingPayload } from './schemas/booking-schema';
export { pricingSchema, type PricingFormData, type PricingSelections, type PriceEstimate } from './schemas/pricing-schema';
export { careerSchema, careerPayloadSchema, type CareerFormData, type CareerPayload } from './schemas/career-schema';
export { chatMessageSchema, type ChatMessageData } from './schemas/chat-schema';
```

---

## Server Error Handling

### Error Scenarios

| Scenario | HTTP Status | Response Shape | Frontend Behavior |
|----------|-------------|---------------|-------------------|
| **Validation failure** | 400 | `{ success: false, errors: [...] }` | Map errors to inline field messages |
| **Rate limited** | 429 | `{ success: false, error: "..." }` | Banner: "Too many requests. Please wait a moment and try again." |
| **Slot unavailable** (booking) | 409 | `{ success: false, error: "..." }` | Banner: "This time slot is no longer available." Refresh slots. |
| **Conversation limit** (chat) | 400 | `{ success: false, error: "..." }` | Inline: "Conversation limit reached. Start a new conversation or contact us directly." |
| **Server error** | 500 | `{ success: false, error: "..." }` | Banner: "Something went wrong. Please try again later." |
| **Network failure** | — | fetch throws | Banner: "Unable to reach the server. Please check your connection and try again." |
| **Honeypot triggered** | 200 | `{ success: true }` | Fake success. Form clears. Bot believes submission succeeded. |

### Rate Limits (per IP)

| Endpoint | Limit | Window |
|----------|-------|--------|
| `POST /api/contact` | 5 requests | per minute |
| `POST /api/career` | 3 requests | per minute |
| `POST /api/pricing` | 10 requests | per minute |
| `POST /api/booking` | 5 requests | per minute |
| `POST /api/chat` | 30 requests | per minute |

When rate-limited, the backend returns a `429` response with a `Retry-After` header indicating the number of seconds until the next request is allowed.

### Frontend Error Display Strategy

1. **Validation errors** — Mapped to individual fields via the `errors[].field` key. Displayed inline below each field with `aria-describedby`. An `aria-live="polite"` region announces: "N errors found. Please correct the highlighted fields."

2. **Server/network/rate-limit errors** — Displayed in a banner above the form. Red background tint, clear message, dismiss button. Form inputs remain enabled with values preserved.

3. **Success** — Green banner replaces the form (contact, analysis, career) or displays above it (booking shows confirmation details). Form fields are cleared on success.

---

## API Envelope

### Request Format

All form submissions use `POST` with `Content-Type: application/json`.

```typescript
// The request body IS the schema — no wrapper envelope on the request side.
// Example: POST /api/contact
{
  "name": "Ana Horvat",
  "email": "ana@example.com",
  "message": "We need a new website for our restaurant.",
  "_honey": "",
  "language": "hr"
}
```

### Endpoint Paths

| Form | Method | Path |
|------|--------|------|
| Contact | POST | `/api/contact` |
| Analysis | POST | `/api/contact` (with `type: "analysis"`) |
| Booking | POST | `/api/booking` |
| Pricing | POST | `/api/pricing` |
| Career | POST | `/api/career` |
| Chat | POST | `/api/chat` |

### Success Responses

```typescript
// POST /api/contact — 200
{ "success": true, "id": "cnt_a1b2c3" }

// POST /api/contact (type: "analysis") — 200
{ "success": true, "id": "cnt_d4e5f6" }

// POST /api/booking — 200
{ "success": true, "id": "bk_g7h8i9", "icsUrl": "/api/booking/bk_g7h8i9/ics" }

// POST /api/pricing — 200
{
  "success": true,
  "id": "est_j0k1l2",
  "validatedEstimate": {
    "oneTime": [5200, 9400],
    "monthly": [120, 250],
    "yearly": [50, 150]
  }
}

// POST /api/career — 200
{ "success": true, "id": "app_m3n4o5" }

// POST /api/chat — 200
{
  "conversationId": "550e8400-e29b-41d4-a716-446655440000",
  "response": "We offer custom web development...",
  "sources": ["/services/web-design/", "/pricing/"]
}

// Honeypot triggered (any form) — 200
{ "success": true }
```

### Error Responses

```typescript
// Validation error — 400
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Please enter a valid email address" },
    { "field": "message", "message": "Message must be at least 10 characters" }
  ]
}

// Rate limited — 429
{
  "success": false,
  "error": "Too many requests. Try again in 45 seconds."
}

// Booking conflict — 409
{
  "success": false,
  "error": "This time slot is no longer available."
}

// Server error — 500
{
  "success": false,
  "error": "Something went wrong. Please try again later."
}
```

### Response Type Definitions

```typescript
// file: src/lib/validation/api-types.ts

type FieldError = {
  field: string;
  message: string;
};

type ApiSuccessResponse = {
  success: true;
  id?: string;
};

type ApiValidationErrorResponse = {
  success: false;
  errors: FieldError[];
};

type ApiErrorResponse = {
  success: false;
  error: string;
};

type BookingSuccessResponse = ApiSuccessResponse & {
  icsUrl: string;
};

type PricingSuccessResponse = ApiSuccessResponse & {
  validatedEstimate: {
    oneTime: [number, number];
    monthly: [number, number];
    yearly: [number, number];
  };
};

type ChatSuccessResponse = {
  conversationId: string;
  response: string;
  sources: string[];
};

/** Union of all possible API responses for form submissions. */
export type ApiResponse =
  | ApiSuccessResponse
  | ApiValidationErrorResponse
  | ApiErrorResponse;

export type {
  FieldError,
  ApiSuccessResponse,
  ApiValidationErrorResponse,
  ApiErrorResponse,
  BookingSuccessResponse,
  PricingSuccessResponse,
  ChatSuccessResponse,
};
```

---

## File Structure

```
src/lib/validation/
├── constants.ts              # Field limits, enums, magic values
├── fields.ts                 # Reusable field schemas (name, email, message, url, honeypot)
├── api-types.ts              # API response type definitions
├── index.ts                  # Barrel export
└── schemas/
    ├── contact-schema.ts     # Contact form
    ├── analysis-schema.ts    # Analysis/audit form
    ├── booking-schema.ts     # Booking/scheduling form
    ├── pricing-schema.ts     # Pricing estimate submission
    ├── career-schema.ts      # Career application form
    └── chat-schema.ts        # AI chat message
```

---

## Integration Notes

### React Hook Form Usage

```typescript
// Example: contact form component
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validation';

const form = useForm<ContactFormData>({
  resolver: zodResolver(contactSchema),
  mode: 'onBlur',        // validate on blur
  reValidateMode: 'onBlur', // re-validate on blur after first submit
});
```

### Backend Reuse

The same schema files are imported by the Next.js API route handlers. Since backend and frontend share the same codebase, schemas are always in sync. The API route handler is the authority for validation.

### i18n Wrapping

Error messages in the schemas are English defaults. The frontend wraps them through `ui-strings.ts` at the component level using the validation message keys defined in `form-architecture.md`. The Zod error messages serve as fallbacks and as the canonical messages for server-side 400 responses.

---

## Related Files

- [form-specs.md](form-specs.md) — Per-form field definitions, submission flows, UX patterns
- [form-architecture.md](form-architecture.md) — Shared validation strategy, error display, honeypot pattern, i18n message table
- [../backend/api-contracts.md](../backend/api-contracts.md) — Full endpoint reference and request/response contracts
- [../backend/data-security.md](../backend/data-security.md) — Rate limiting, input sanitization, CORS
- [../interactive-pricing-tool.md](../interactive-pricing-tool.md) — Pricing wizard behavioral spec
