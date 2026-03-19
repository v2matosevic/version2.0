# Form Architecture

> Frontend-backend communication pattern, validation strategy, and spam prevention for all Version2.hr forms.
> Related: [form-specs.md](form-specs.md), [integrations.md](integrations.md)

---

## Frontend-Backend Architecture

The frontend and backend are consolidated in a single Next.js application running in standalone mode on Hostinger VPS. API routes (`app/api/*/route.ts`) handle all form submissions, data processing, and dynamic behavior. Server Actions are also available as an alternative submission mechanism for forms that benefit from progressive enhancement.

Every form on the site follows the same pattern: client-side validation, submit via Server Action or API route, handle response.

---

## Form Validation

All forms (contact, pricing, booking, career) share the same validation architecture.

### Client-Side

- **Library:** React Hook Form for form state, submission handling, and field registration
- **Schema:** Zod schemas define validation rules for every form. Each form has a dedicated schema file (e.g., `contact-schema.ts`, `booking-schema.ts`)
- **Integration:** `@hookform/resolvers/zod` connects Zod schemas to React Hook Form. Validation runs on blur and on submit.

### Server-Side

The same Zod schemas run on the backend. Never trust client validation alone — all inputs are re-validated server-side before processing or storage.

Shared schemas live in a common package or are duplicated between frontend and backend (duplication is acceptable at this scale — 4 forms). If schemas drift, the backend is the authority.

### Error Display

- **Inline field errors:** Displayed directly below the invalid field, visible immediately after blur or submit. Uses `aria-describedby` linking the error message to the field.
- **Summary for screen readers:** An `aria-live="polite"` region at the top of the form announces the total error count after a failed submission (e.g., "3 errors found. Please correct the highlighted fields.").
- **Server errors:** Displayed in a banner above the form. Never expose raw error messages or stack traces.

### Form Validation Messages

Common validation messages stored in `ui-strings.ts` under `form.validation.*`:

| Key | EN | HR | DE |
|-----|----|----|-----|
| `required` | This field is required | Ovo polje je obavezno | Dieses Feld ist erforderlich |
| `email_invalid` | Please enter a valid email address | Unesite valjanu email adresu | Bitte geben Sie eine gültige E-Mail-Adresse ein |
| `min_length` | Must be at least {n} characters | Mora sadržavati najmanje {n} znakova | Mindestens {n} Zeichen erforderlich |
| `max_length` | Cannot exceed {n} characters | Ne može prelaziti {n} znakova | Darf {n} Zeichen nicht überschreiten |
| `url_invalid` | Please enter a valid URL | Unesite valjani URL | Bitte geben Sie eine gültige URL ein |
| `phone_invalid` | Please enter a valid phone number | Unesite valjani telefonski broj | Bitte geben Sie eine gültige Telefonnummer ein |

Server-side error responses displayed in a banner above the form:

| Scenario | Message (EN) |
|----------|-------------|
| Network error | Unable to reach the server. Please check your connection and try again. |
| Rate limited | Too many requests. Please wait a moment and try again. |
| Server error | Something went wrong. Please try again later. |
| Success (contact) | Message sent! We'll get back to you within 24 hours. |
| Success (booking) | Booking confirmed! Check your email for details. |
| Success (career) | Application received! We'll review it and get back to you. |
| Success (pricing) | Quote request sent! We'll prepare a detailed proposal. |

### Form Field Constraints

| Field | Min | Max | Format |
|-------|-----|-----|--------|
| Name | 2 chars | 100 chars | Text |
| Email | — | 254 chars | Valid email format |
| Message / Description | 10 chars | 5000 chars | Text |
| Website URL (analysis form) | — | 500 chars | Valid URL |
| Portfolio URL (career) | — | 500 chars | Valid URL |

---

## Spam Prevention / Honeypot Implementation

All public forms include a hidden honeypot field:

- **Field name:** `_honey` (or any innocuous name)
- **CSS:** `position: absolute; left: -9999px; opacity: 0; height: 0; pointer-events: none;`
- **Frontend:** Rendered in the DOM but invisible to human users. Bots auto-fill it.
- **Backend:** If `_honey` is non-empty, return fake success (`200 OK`) but silently discard the submission. No error response — bots should believe the submission succeeded.

Additional spam prevention layers:
- Server-side validation and rate limiting on the backend
- Client-side rate limiting (disable button after submit, prevent double-submit)
- No CAPTCHA if possible (bad UX). Add only if spam becomes a problem.

---

## Related Files

- [form-specs.md](form-specs.md) — Per-form field definitions, submission flows, UX patterns
- [integrations.md](integrations.md) — Analytics, cookie consent, font loading, maps
- [../backend/api-contracts.md](../backend/api-contracts.md) — API endpoint contracts for form submissions
- [../backend/data-security.md](../backend/data-security.md) — Server-side validation, rate limiting, security
