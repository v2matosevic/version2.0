# ISR & Rendering Strategy

> Which pages use which rendering mode in Next.js standalone.

## Rendering Modes

| Page | Mode | Rationale |
|------|------|-----------|
| **Homepage** | Static (revalidate: 3600) | Changes rarely. ISR revalidates hourly. |
| **Services overview** | Static | Content changes only on deploy. |
| **Service detail pages** | Static | Content changes only on deploy. |
| **Portfolio listing** | Static (revalidate: 3600) | New projects added infrequently. |
| **Portfolio case study** | Static (revalidate: 3600) | Content changes only on deploy. |
| **Blog listing** | Static (revalidate: 1800) | New posts via CMS trigger revalidation. |
| **Blog posts** | Static (revalidate: 3600) | CMS edit triggers `revalidatePath()`. |
| **Pricing tool** | Static | Config changes only on deploy. |
| **About** | Static | Content changes only on deploy. |
| **Contact** | Static | Form is client-side, page is static. |
| **Career** | Static (revalidate: 3600) | Job postings may change via CMS. |
| **Legal pages** | Static | Rarely change. |
| **Tracking page** | SSR | Must fetch live tracking data per request. |
| **404 page** | Static | Pre-rendered. |
| **500 page** | Static | Pre-rendered via error.tsx. |
| **Admin/CMS pages** | SSR | Dynamic, auth-required. |

## Revalidation Triggers

CMS actions that trigger `revalidatePath()` or `revalidateTag()`:
- Blog post published/edited → `revalidatePath('/blog/[slug]')` + `revalidateTag('blog')`
- Portfolio updated → `revalidateTag('portfolio')`
- Career posting changed → `revalidatePath('/career')`

## Key Principle

Default to static. Use ISR for CMS-managed content. Use SSR only for truly dynamic pages (tracking, admin). Never use SSR for marketing pages.
