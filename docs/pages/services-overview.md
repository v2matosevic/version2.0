# Services Overview Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.

**Routes**: `/services/` (EN), `/hr/usluge/` (HR), `/de/dienstleistungen/` (DE)
**Purpose**: Scannable in one scroll. Like a high-end restaurant menu. Each core service gets a full-width section. Supporting services compact at bottom.
**Data sources**: `content/pages/usluge/en.md` | `content/site-config.json` | `content/products/products.json` (for digital card images)
**Structured data**: `WebPage` + `BreadcrumbList` + `Service` (aggregate listing)

---

## Section 2.1: Services Page Hero

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base`. Subtle radial gradient: `radial-gradient(ellipse at 20% 80%, var(--color-brand-red)/3 0%, transparent 50%)`. Grain overlay. |
| **Layout** | Container. Content on cols 1-8 of 12. `min-height: 60vh`. `display: flex`, `align-items: flex-end`, `padding-bottom: 4rem md:6rem`. |
| **Overline** | "Services". Overline style. |
| **Headline** | "Everything we build is custom." AS300, H1 size, `text-foreground`. `margin-top: 12px`. |
| **Subtext** | "No templates. No drag-and-drop. Every project starts from zero and ships as something only you have." MR400, Body Large, `text-muted`. `max-width: 540px`. `margin-top: 16px`. |
| **No CTA buttons** | The page itself is the path to individual services. |

**Animation**: Overline fade up. Headline `SplitText-chars`. Subtext fade up with 100ms delay.

---

## Section 2.2: Core Services (Full-Width Alternating Bands)

**Purpose**: Each core service gets a full-width horizontal section. The visitor scrolls through 5 service "bands." Alternating asymmetric layouts create rhythm.

**Common properties for all 5 service bands**:

| Property | Specification |
|----------|---------------|
| **Section padding** | Standard |
| **Container** | Standard |
| **Inner grid** | `display: grid`, gap `2rem md:gap-3rem`. See layout per service. |

### Service Band 1: Custom Websites (text-left, visual-right)

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Grid** | `grid-template-columns: 1fr 1.2fr` (md+). Single column mobile. |
| **Left column (text)** | `display: flex`, `flex-direction: column`, `justify-content: center`. |
| **Service number** | "01". AS700, H1 size, `text-brand-red`, `opacity: 0.1`. `margin-bottom: 16px`. |
| **Title** | "Custom Websites". `<a href="/services/web-design/">`. AS300, H2 size, `text-foreground`. Hover: `text-brand-red`, 200ms. |
| **One-liner** | "Hand-coded sites that load fast, rank well, and look like nothing your competitors have." MR400, Body Large, `text-muted`. `max-width: 420px`. `margin-top: 12px`. |
| **CTA** | "Explore Web Design". `<Button variant="ghost" size="md">`. Lucide `ArrowRight` after text, 16px. `margin-top: 24px`. Links to `/services/web-design/`. |
| **Right column (visual)** | Placeholder: `aspect-ratio: 4/3`. `rounded-xl`. `background: linear-gradient(135deg, var(--color-raised), var(--color-base))`. `border: 1px solid var(--color-line-subtle)`. To be replaced with a browser mockup frame or abstract visual showing a website. |

### Service Band 2: Web Applications (visual-left, text-right -- FLIPPED)

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Grid** | `grid-template-columns: 1.2fr 1fr` (md+). Left: visual. Right: text. |
| **Number** | "02" |
| **Title** | "Web Applications". Links to `/services/web-applications/`. |
| **One-liner** | "Dashboards, portals, internal tools. If it runs in a browser, we can build it." |
| **CTA** | "Explore Web Apps". |
| **Visual** | Placeholder: abstract dashboard wireframe or grid pattern. Same styling as band 1 visual. |

### Service Band 3: Online Stores (text-left, visual-right)

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Grid** | `grid-template-columns: 1fr 1.2fr` |
| **Number** | "03" |
| **Title** | "Online Stores". Links to `/services/e-commerce/`. |
| **One-liner** | "Your own store with your own rules. Not a Shopify theme with your logo on it." |
| **CTA** | "Explore E-Commerce". |

### Service Band 4: AI Integration (visual-left, text-right -- FLIPPED)

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Grid** | `grid-template-columns: 1.2fr 1fr` |
| **Number** | "04" |
| **Title** | "AI Integration". Links to `/services/ai-integration/`. |
| **One-liner** | "Chatbots, automation, smart search. AI that actually does something useful for your business." |
| **CTA** | "Explore AI". |

### Service Band 5: SEO (text-left, visual-right)

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Grid** | `grid-template-columns: 1fr 1.2fr` |
| **Number** | "05" |
| **Title** | "SEO". Links to `/services/seo/`. |
| **One-liner** | "Rankings you earn, not rankings someone promised you." |
| **CTA** | "Explore SEO". |

### Responsive (all bands)

- Desktop (lg+): Asymmetric 2-col grid as specified.
- Tablet (md): `grid-template-columns: 1fr 1fr` (equal columns).
- Mobile (<md): Single column. Visual above text. Number inline before title (same line, smaller: `AS700, H3, text-brand-red, opacity: 0.2, margin-right: 12px`).

**Animation per band**: Number slides in from left (`x: -20`). Title and one-liner fade up. Visual fades in with slight scale (`scale: 0.95` -> `1.0`). `stagger(80ms)`. Each band triggers independently via `ST-reveal`.

---

## Section 2.3: Supporting Services

**Purpose**: Compact grid for services without dedicated pages.

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |
| **Heading** | "Also on the Menu". AS300, H3 size, `text-foreground`. `margin-bottom: 32px`. |
| **Grid** | `display: grid`, `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, `gap: 1.5rem`. 4 cols desktop (1 row), 2 cols tablet, 1 col mobile. |

**Cards** (4 supporting services):

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | Lucide `CreditCard` | "Digital Business Cards" | "NFC tap, QR backup, custom design. Your contact info shared in two seconds. Starting at EUR 29.99." |
| 2 | Lucide `View` | "360 Virtual Tours" | "Interactive walkthroughs for real estate, hotels, restaurants, and venues. Let people explore before they visit." |
| 3 | Lucide `Plug` | "Integrations" | "Slack, Teams, CRMs, payment gateways, third-party APIs. We connect your site to whatever your business already uses." |
| 4 | Lucide `Wrench` | "Maintenance" | "Ongoing support, security updates, performance monitoring. We built it. We keep it running." |

**Card structure**:

| Element | Specification |
|---------|---------------|
| **Card** | `bg-base`. `border: 1px solid var(--color-line)`. `rounded-xl`. `padding: 1.5rem`. |
| **Icon** | Lucide icon, 24px, `text-brand-red`. `margin-bottom: 16px`. |
| **Title** | AS700, H4 size, `text-foreground`. |
| **Description** | MR400, Body (1rem), `text-muted`. `margin-top: 8px`. Line-clamp 3. |
| **Hover** | `transform: translateY(-2px)`. `border-color: var(--color-brand-red)/30`. Transition 200ms. |

**Digital Business Cards card extra**: Below the description, a horizontal scroll strip of 5 product card images from `content/products/assets/`. Each image: `60px x 36px`, `rounded-md`, `object-cover`. `gap: 8px`. `overflow-x: auto`, `scrollbar-width: none`. Provides visual proof of the product line.

**Animation**: Cards `ST-reveal` with `stagger(80ms)`.

---

## Section 2.4: Process Strip

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |
| **Heading** | "How It Works". AS300, H2 size, `text-foreground`. `margin-bottom: 48px`. |
| **Layout** | Desktop (lg+): `display: grid`, `grid-template-columns: repeat(4, 1fr)`, `gap: 2rem`. Tablet (md): 2x2 grid. Mobile: single column. |

**Steps** (4):

| # | Step Number | Step Name | Visual Connector |
|---|------------|-----------|-----------------|
| 1 | "01" | "Discovery" | Line right (desktop) or down (mobile) |
| 2 | "02" | "Design" | Line right or down |
| 3 | "03" | "Build" | Line right or down |
| 4 | "04" | "Launch" | None (last) |

**Step structure**:

| Element | Specification |
|---------|---------------|
| **Number** | MR600, Overline size, `text-brand-red`. `margin-bottom: 8px`. |
| **Name** | AS300, H4 size, `text-foreground`. |
| **Connector** | Desktop: `::after` pseudo-element on step container. `width: 100%`, `height: 1px`, `background: var(--color-line)`. Positioned at top 50% between steps. Mobile: vertical line, `height: 32px`, `width: 1px`, centered, between steps. |

**Animation**: Steps `ST-reveal` with `stagger(100ms)`.

---

## Section 2.5: Services CTA

`<CTASection />` with: heading "Not sure where to start?", subtext "We offer a free analysis of your current site. No pitch. No pressure.", ctaLabel "Get Free Analysis", ctaHref "/analysis/".

---

## Data Dependencies

| Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|---------------------------|---------------------------|---------------------|
| `content/pages/usluge/*.md`, `content/products/products.json` | None | -- |

## Structured Data

| JSON-LD Schema Types |
|---------------------|
| `WebPage`, `BreadcrumbList`, `Service` (aggregate listing) |
