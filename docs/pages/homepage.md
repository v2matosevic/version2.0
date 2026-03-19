# Homepage Blueprint

> **Conventions:** See [_conventions.md](_conventions.md) for notation, type scale, and color token shorthand.
> **Global components:** See [_globals.md](_globals.md) for Header, Footer, FAB, etc.
> **Implementation analysis:** See [homepage-analysis.md](homepage-analysis.md) for gap resolutions, animation choreography, responsive strategy, performance budget, touch/a11y specs, and light mode mapping.

**Routes**: `/` (EN), `/hr/` (HR), `/de/` (DE)
**Purpose**: The showpiece. The hero IS the portfolio piece. Proves "We build what others can't" by being the proof.
**Data sources**: `content/pages/home/en.md` (structured frontmatter) | `content/site-config.json` | `content/assets/clients/` (6 logos) | `content/portfolio/portfolio-homepage.json` (4 featured projects) | `content/testimonials.json` (filtered by tag "homepage")
**Structured data (JSON-LD)**: `WebSite` + `Organization` (with `name`, `url`, `logo`, `contactPoint`, `sameAs` social links, `address`)

---

## Section 1.1: Preloader

**Scope**: Homepage only. Other pages use standard page transitions.

| Property | Specification |
|----------|---------------|
| **Layout** | `position: fixed`, `inset: 0`. `100vw x 100vh`. |
| **Z-index** | `var(--z-preloader)` = 100 |
| **Background** | `bg-sunken` (`#0c0c0c`) |
| **Visual** | V2 chevron icon assembling from scattered particles into final shape. Canvas-based particle animation (2D canvas, not R3F -- lighter than the main 3D scene). ~100 particles, each a 2px dot in `text-faint` color. Particles begin scattered randomly, then converge into V2 icon vertices over 1.5s with `ease-out` motion. Final icon renders in `text-foreground` at `opacity: 0.8`. |
| **Progress bar** | Horizontal line. Position: `bottom: 15vh`, centered, `max-w-xs` (320px). Height: 2px. Track: `bg-line`. Fill: `bg-brand-red`. Animates width 0% to 100% tied to actual asset loading progress. If no progress events, uses timed animation over 2s with `ease-in-out`. |
| **Minimum display** | 800ms. Prevents flash on fast connections. Even if assets are cached and ready, hold for 800ms minimum. |
| **Timeout** | 4000ms. Auto-dismiss if 3D scene never reports readiness. Falls back to CSS gradient hero. |
| **Dismiss trigger** | R3F Canvas `onCreated` callback fires, setting a zustand/store flag. Preloader reads this flag. Dismisses when both conditions met: (a) scene ready OR timeout reached, AND (b) minimum 800ms elapsed. |
| **Exit animation** | V2 icon scales up to 1.1x and fades to 0. Background fades to 0. Duration 600ms, `ease-in-out`. The hero content behind begins its entrance animation at the 300ms mark (overlapping exit). |
| **Repeat behavior** | Once per session. After first display, set `sessionStorage.v2_preloader_shown = "true"`. On client-side navigation back to homepage, check this flag and skip. Flag clears automatically when browser tab/session ends. |
| **Reduced motion** | No particle animation. Show static V2 icon centered (SVG, `opacity: 0.8`). Hold for 800ms. Fade out over 300ms. |
| **Component** | `<Preloader />` |
| **File location** | `src/components/layout/preloader.tsx` |

---

## Section 1.2: 3D Hero

**Purpose**: Full-viewport atmospheric R3F scene with massive typographic statement overlaid. The code-built 3D experience proves the headline.

### 1.2a: Background Layer (R3F Canvas)

| Property | Specification |
|----------|---------------|
| **Container** | `position: relative`, `width: 100vw`, `min-height: 100vh`, `overflow: hidden` |
| **Canvas** | `<Canvas>` from `@react-three/fiber`. Loaded via `next/dynamic` with `ssr: false`. `position: absolute`, `inset: 0`. |
| **Canvas z-index** | `var(--z-canvas)` = 20 (behind text overlay) |
| **Canvas fade-in** | `opacity: 0` at mount. Transitions to `opacity: 1` over 1000ms `ease-out` when scene signals readiness via `onCreated`. |
| **CSS gradient fallback** | Rendered as a `<div>` behind the canvas (always present). `background: radial-gradient(ellipse at 30% 40%, #1c1c1c 0%, #0c0c0c 70%)`. This is visible during canvas load and permanently visible on tier 0 / reduced motion. |
| **No grain overlay** | The 3D scene provides its own atmospheric depth. Grain overlay is excluded from this section. |

**3D Scene specification** (locked in `docs/components/sections.md` Section "3D Hero"):

| Sub-element | Specification |
|-------------|---------------|
| **Camera** | `<PerspectiveCamera>`, FOV 50, position `[0, 0, 8]`, lookAt `[0, 0, 0]`. |
| **Key light** | `<pointLight>`, color warm white with slight red tint (`#fff5f0`), position `[5, 5, 5]`, intensity 0.6. |
| **Fill light** | `<pointLight>`, color cool (`#e0e8ff`), position `[-3, -2, 4]`, intensity 0.3. |
| **Ambient** | `<ambientLight>`, intensity 0.15. |
| **No animated lights** | All lights are static. No pulsing, no color shifting. |
| **Geometry** | 3 wireframe polyhedra: `<icosahedronGeometry>` (args `[1.2, 0]`), `<octahedronGeometry>` (args `[1.0, 0]`), `<dodecahedronGeometry>` (args `[1.0, 0]`). Positioned at `[-2.5, 1, -1]`, `[2, -0.5, -2]`, `[0.5, -1.5, 1]` respectively (spread, not clustered). Each has `<meshStandardMaterial wireframe={true} color="var(--color-muted)" opacity={0.3} transparent={true} />`. Slow continuous rotation: each on a different axis combination (e.g., `[0.001, 0.002, 0]`, `[0, 0.001, 0.002]`, `[0.002, 0, 0.001]` radians per frame). |
| **Particles** | Custom `<Points>` component using `<bufferGeometry>` with random positions in a sphere of radius 6. Count: 300-500 (tier 3+), 150 (tier 1-2). `<pointsMaterial size={1.5} color="var(--color-faint)" sizeAttenuation={true} transparent={true} opacity={0.6} />`. Animation: gentle sinusoidal position drift (`Math.sin(time * 0.3 + i) * 0.002` per axis per frame). Mouse interaction: particles within 2-unit radius of projected mouse position experience subtle attraction (lerp 0.02 toward cursor). |
| **Mouse parallax** | Normalized mouse position from -1 to 1 on both axes. Camera base position `[0, 0, 8]` offset by `[mouseX * 0.3, mouseY * 0.3, 0]`. Smoothed in `useFrame` with lerp factor 0.05. |
| **Post-processing** | `<EffectComposer>` from `@react-three/postprocessing`. `<Bloom intensity={0.3} luminanceThreshold={0.8} luminanceSmoothing={0.4} />`. `<Vignette offset={0.3} darkness={0.6} />`. No DOF. No film grain. |
| **Performance tiers** | Via `detect-gpu` library, evaluated once on mount: **Tier 0** (no GPU / unsupported): No canvas rendered. CSS gradient fallback only. **Tier 1-2** (low-mid): Canvas renders. 150 particles. No wireframe geometry. No antialiasing. `dpr` capped at 1. No post-processing bloom. **Tier 3+** (high): Full scene as specified above. Antialiasing enabled. `dpr` capped at 2. |
| **Progressive loading** | (1) CSS gradient + text render immediately (SSR/static HTML). (2) Canvas loads asynchronously via dynamic import. (3) Canvas fades in when ready. (4) Preloader covers the transition on homepage. |
| **Reduced motion** | Skip 3D entirely. Do not load canvas. Show CSS gradient fallback with static text. All hero text renders immediately in final position. |
| **Component** | `<HeroScene />` |
| **File location** | `src/components/scenes/hero-scene.tsx` (canvas wrapper), `src/components/scenes/hero-objects.tsx` (geometry), `src/components/scenes/hero-particles.tsx` (particles), `src/components/scenes/hero-lighting.tsx` (lights), `src/components/scenes/hero-effects.tsx` (post-processing) |

### 1.2b: Content Overlay (Text on top of 3D scene)

| Property | Specification |
|----------|---------------|
| **Container** | `position: relative` (over canvas). `z-index: var(--z-raised)` = 10 (above canvas z=20 is wrong -- actually text content is NOT inside canvas, it is a sibling div absolutely positioned over it with higher z than canvas's z=20, so use z-index 25 via a custom `--z-hero-content` token). Container with max-w-7xl. `min-height: 100vh`. `display: flex`, `flex-direction: column`, `justify-content: center`. |
| **Desktop layout (lg+)** | Text block left-aligned, spanning cols 1-7 of the 12-col conceptual grid (i.e., `max-width: 58.33%`). `padding-left` from container. |
| **Tablet layout (md)** | Text block left-aligned, `max-width: 75%`. |
| **Mobile layout (<md)** | Text block centered, full width. Text alignment: `text-center`. |

**Elements within content overlay, top to bottom**:

| # | Element | Specification |
|---|---------|---------------|
| 1 | **Overline** | Text: "Web Development Studio". MR600, Overline size (0.75rem), uppercase, `letter-spacing: 0.1em`, `text-muted`. `margin-bottom: 16px`. |
| 2 | **Headline** | Text: "We build what others can't." (from `content/pages/home/en.md` H1). AS300, Display size (`clamp(3rem, 5vw + 1rem, 5.5rem)`), line-height 1.1, `letter-spacing: -0.03em`, `text-foreground`. `margin-bottom: 16px`. |
| 3 | **Red accent line** | `<div>`, `width: 64px`, `height: 3px`, `background: var(--color-brand-red)`. `margin-bottom: 24px`. On mobile (centered layout): `margin-inline: auto`. |
| 4 | **Subtext** | Text: "Custom websites, web applications, and AI-powered tools. Built from scratch. No templates." MR400, Body Large (1.25rem), line-height 1.6, `text-muted`, `max-width: 540px`. `margin-bottom: 32px`. |
| 5 | **CTA row** | `display: flex`, `gap: 16px`. Desktop: horizontal row. Mobile: `flex-direction: column`, `gap: 12px`, buttons full-width. |
| 5a | **CTA Primary** | Text: "See Our Work". `<Button variant="primary" size="lg">`. `bg-brand-red text-white`. Hover: `bg-brand-red-hover`. Active: `bg-brand-red-pressed`. Links to `/portfolio/`. `rounded-lg`, `px-8 py-4`. MR600, Body size. |
| 5b | **CTA Secondary** | Text: "Get a Quote". `<Button variant="secondary" size="lg">`. `border border-line text-foreground`. Hover: `border-brand-red`. Links to `/pricing/`. |
| 6 | **Scroll indicator** | `position: absolute`, `bottom: 32px`, `left: 50%`, `transform: translateX(-50%)`. A thin vertical line: `width: 2px`, `height: 40px`, `background: var(--color-faint)`. CSS animation: `opacity` pulses from 0.3 to 1.0 in a 2s infinite loop with `ease-in-out`. Hides when `scrollY > 100px` (transition opacity to 0 over 300ms). Hidden on mobile (not enough vertical space for it to matter). |

**Entrance animation** (fires after preloader exit, with 300ms overlap):

| Step | Target | Animation | Timing |
|------|--------|-----------|--------|
| 1 | Overline | `opacity: 0, y: 20` -> `opacity: 1, y: 0`. 0.6s, `power2.out`. | Start: 0ms |
| 2 | Headline | GSAP `SplitText` split into characters. Each char: `opacity: 0, y: 30` -> `opacity: 1, y: 0`. 0.5s per char, `power2.out`. Stagger: 30ms. | Start: 150ms after step 1 begins |
| 3 | Red accent line | `width: 0` -> `width: 64px`. 0.6s, `power3.out`. | Start: when headline is ~60% complete |
| 4 | Subtext | `opacity: 0, y: 20` -> `opacity: 1, y: 0`. 0.8s, `power2.out`. | Start: 100ms after step 3 begins |
| 5 | CTA Primary | `opacity: 0, y: 20` -> `opacity: 1, y: 0`. 0.6s, `power2.out`. | Start: 100ms after step 4 begins |
| 6 | CTA Secondary | Same as step 5. | Start: 100ms after step 5 begins |
| 7 | Scroll indicator | `opacity: 0` -> `opacity: 1`. 0.5s, `power1.out`. | Start: after all text complete |

**Reduced motion**: All elements render instantly in final state. No SplitText, no stagger, no fade. Scroll indicator uses only CSS `animation` (which is already disabled by the global `prefers-reduced-motion: reduce` rule).

**Component**: `<HeroContent />`
**File location**: `src/components/home/hero-content.tsx`

---

## Section 1.3: Services Teaser

**Purpose**: Bold typographic statements for 4 core services. NOT a card grid. NOT icons. Typography IS the design element.

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Section padding** | Standard: `py-16 md:py-24 lg:py-32` |
| **Container** | Standard max-w-7xl |
| **Layout** | Single column. Vertical stack of service items. `gap-0` (items have their own padding). |
| **No section heading** | The service names ARE the headings. No "What We Build" or "Services" title above. |

**Service items** (4 total, in this order):

| # | Service | One-liner | Link |
|---|---------|-----------|------|
| 1 | "Custom Websites" | "Hand-coded sites that load fast, rank well, and look like nothing your competitors have." | `/services/web-design/` |
| 2 | "Web Applications" | "Dashboards, portals, internal tools. If it runs in a browser, we can build it." | `/services/web-applications/` |
| 3 | "Online Stores" | "Your own store with your own rules. Not a Shopify theme with your logo on it." | `/services/e-commerce/` |
| 4 | "AI Integration" | "Chatbots, automation, smart search. AI that actually does something useful." | `/services/ai-integration/` |

**Individual service item layout**:

| Element | Specification |
|---------|---------------|
| **Wrapper** | `<a href="/services/[slug]/">`. Full container width. `display: block`. `py-8 md:py-10`. `border-bottom: 1px solid var(--color-line-subtle)` (omit on last item). `cursor: pointer`. |
| **Service name** | AS300, H2 size (`clamp(2rem, 3vw + 0.5rem, 3rem)`), line-height 1.2, `letter-spacing: -0.02em`, `text-foreground`. |
| **One-liner** | MR400, Body Large (1.25rem), line-height 1.6, `text-muted`. `max-width: 480px`. `margin-top: 8px`. |
| **Hover state** | Service name transitions to `text-brand-red` over 200ms `ease-smooth`. On desktop, apply per-character color shift via GSAP SplitText (same 30ms stagger as menu links). On hover leave, characters revert in reverse order. |
| **Arrow indicator** | Desktop only: Lucide `ArrowRight`, 24px, `text-faint`. `position: absolute`, `right: 0`, `top: 50%`, `transform: translateY(-50%)`. On hover: `text-brand-red`, `translateX(4px)`. 200ms. Hidden on mobile. |

**Responsive**:
- Desktop (lg+): Left-aligned text. Arrow indicator on right. Generous right white space.
- Tablet (md): Same but narrower. Arrow indicator present.
- Mobile (<md): Full-width text, left-aligned. No arrow indicator. Entire row is tap zone.

**Animation**: Each item `ST-reveal` with `stagger(100ms)` between items. First item triggers when section top hits 85% viewport.

**Data source**: Hardcoded content, i18n via `ui-strings.ts`. Links from `content/site-config.json` navigation.

**Component**: `<ServicesTeaser />`
**File location**: `src/components/home/services-teaser.tsx`

---

## Section 1.4: Portfolio Highlights

**Purpose**: 3-4 best projects with visual impact. Asymmetric layout breaks the monotony. Hover interactions and large type create engagement.

| Property | Specification |
|----------|---------------|
| **Background** | `bg-sunken` (`#0c0c0c`), full-bleed background. Content in standard container. Grain overlay. |
| **Section padding** | Standard |

**Section header**:

| Element | Specification |
|---------|---------------|
| **Overline** | Text: "Selected Work". MR600, Overline size, uppercase, `tracking-overline`, `text-muted`. Left-aligned. |
| **Heading** | Text: "Projects that prove the point." AS300, H2 size, `text-foreground`. `margin-top: 12px`. `margin-bottom: 48px`. |

**Project cards** (6 real projects from `content/portfolio/portfolio-homepage.json`):

| # | Project Name | Industry | Tech Hint |
|---|-------------|----------|-----------|
| 1 | "Misha Gashi" | Wellness & Personal Development | Next.js, Stripe, Custom CMS, User Portal, Course Platform |
| 2 | "Village Homes Drage" | Real Estate & Tourism | Next.js, Interactive Maps, Comparison Tool, 4 Languages |
| 3 | "Adria Escape" | Travel & Tourism Media | Next.js, 5 Languages, Dark/Light Mode, Custom CMS, SEO Platform |
| 4 | "Villa Nadja & Tamaris" | Hospitality & Vacation Rentals | Next.js, Google Maps, Booking System, 2 Languages |
| 5 | "Fiore Paklenica" | Hospitality & Vacation Rentals | Vanilla JS, 6 Languages, Ultra-Fast, Attractions Guide |
| 6 | "SIMA Office" | Professional Services | Vanilla JS, Schema.org, 2 Languages, One-Page |

**Card grid layout**:
- Desktop (lg+): CSS Grid, `grid-template-columns: 1.2fr 1fr`. `gap: 24px`. Row 1: cards 1 (large) and 2 (standard). Row 2: `grid-template-columns: 1fr 1.2fr`. Cards 3 (standard) and 4 (large). This creates an asymmetric zigzag pattern.
- Tablet (md): `grid-template-columns: 1fr 1fr`. Equal widths. `gap: 20px`.
- Mobile (<md): Single column. `gap: 16px`.

**Individual card**:

| Element | Specification |
|---------|---------------|
| **Wrapper** | `<a href="/portfolio/[slug]/">`. `display: block`. `position: relative`. `overflow: hidden`. `rounded-xl`. `border: 1px solid transparent`. |
| **Image area** | `aspect-ratio: 16/10`. `rounded-t-xl` (top corners only). `overflow: hidden`. Placeholder: `background: linear-gradient(135deg, var(--color-raised) 0%, var(--color-base) 50%, var(--color-brand-red)/5 100%)`. To be replaced with actual project screenshots. |
| **Image hover** | Image scales to `1.03x` over 400ms `ease-smooth`. |
| **Text area** | Below image. `padding: 16px 0 0 0`. |
| **Project title** | AS700, H4 size (`clamp(1.25rem, 0.5vw + 1rem, 1.5rem)`), line-height 1.3, `text-foreground`. |
| **Industry tag** | MR400, Small (0.875rem), `text-muted`. `margin-top: 4px`. |
| **Card hover** | `transform: translateY(-4px)`. `border-color: var(--color-brand-red)/30`. Transition 200ms `ease-smooth`. |

**Bottom CTA**:

| Element | Specification |
|---------|---------------|
| **Layout** | `text-align: right` on desktop. Full-width on mobile. `margin-top: 48px`. |
| **Link** | "View All Projects". `<Button variant="ghost" size="md">`. Lucide `ArrowRight` after text, 16px. Links to `/portfolio/`. |

**Animation**: Overline + heading `ST-reveal`. Cards `ST-reveal` with `stagger(100ms)` between cards. Image scale on hover is CSS-only.

**Data source**: `content/portfolio/portfolio-homepage.json` — 6 real projects with i18n names, industries, tech highlights, and screenshots.

**Component**: `<PortfolioHighlights />`
**File location**: `src/components/home/portfolio-highlights.tsx`

---

## Section 1.5: Client Logos

**Purpose**: Social proof through brand recognition. Understated presence. No label.

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base`. `border-top: 1px solid var(--color-line-subtle)`. `border-bottom: 1px solid var(--color-line-subtle)`. |
| **Section padding** | Reduced: `py-12 md:py-16 lg:py-20` (this is a strip, not a full section). |
| **Container** | Standard |
| **No heading** | No "Trusted by", "Our Clients", or any label. The logos speak for themselves. |
| **Layout** | `display: flex`, `align-items: center`, `justify-content: center`, `gap: 2rem md:gap-3rem lg:gap-4rem`, `flex-wrap: wrap`. |
| **No grain overlay** | Clean strip. No atmospheric texture. |

**Logos** (6 curated from `content/assets/clients/`):

| # | Client | File |
|---|--------|------|
| 1 | Dubrovnik Republic Gin | `dubrovnik-republic-gin.webp` |
| 2 | Zadar Tehnika | `zadar-tehnika.webp` |
| 3 | Tamaris | `tamaris.webp` |
| 4 | Riva Consulting | `riva-consulting-logo.webp` |
| 5 | LCL Optika | `lcl-optika-ds.webp` |
| 6 | Cardo | `cardo.webp` |

**Logo styling**:

| Property | Specification |
|----------|---------------|
| **Max height** | 36px (mobile), 44px (md+), 48px (lg+) |
| **Width** | Auto (maintain aspect ratio) |
| **Default** | `filter: grayscale(100%) brightness(0.6)`. `opacity: 0.5`. |
| **Hover** | `filter: grayscale(0%) brightness(1)`. `opacity: 1`. Transition 400ms `ease-smooth`. |
| **Image loading** | `loading="lazy"`. Alt text: "[Client name] logo". |

**Responsive**:
- Desktop: Single row, 6 logos evenly spaced.
- Tablet: Same, logos slightly smaller.
- Mobile: Wraps to 2 rows of 3. `gap: 1.5rem`. Logos at 36px max-height.

**Animation**: Single `ST-reveal` on the entire flex container (logos fade in as a group, not individually).

**Component**: `<ClientLogos />`
**File location**: `src/components/home/client-logos.tsx`

---

## Section 1.6: Differentiators

**Purpose**: Why Version2. Four key differentiators with editorial numbering and visual weight. NOT a bullet list.

| Property | Specification |
|----------|---------------|
| **Background** | `bg-raised` (`#1c1c1c`). Full-bleed background with grain overlay. Subtle radial gradient: `radial-gradient(ellipse at 50% 0%, var(--color-base) 0%, var(--color-raised) 60%)` creating a slightly lighter center-top that fades to the raised background. |
| **Section padding** | Standard |
| **Container** | Standard |

**Section header**:

| Element | Specification |
|---------|---------------|
| **Overline** | "Why Version2". Overline style. |
| **Heading** | "Every line is ours." AS300, H2 size, `text-foreground`. `margin-top: 12px`. `margin-bottom: 48px`. |

**Differentiator items** (4 total):

| # | Number | Title | Copy |
|---|--------|-------|------|
| 1 | 01 | "In-house. Always." | "No outsourcing. No freelancers. Our team writes every line of code." |
| 2 | 02 | "Custom from zero." | "No WordPress. No Elementor. No Wix. Every project starts with a blank editor." |
| 3 | 03 | "Full-stack, one roof." | "Frontend, backend, database, AI, integrations. One team. Fewer handoffs. Faster delivery." |
| 4 | 04 | "Ships fast." | "Premium quality at speed. We consistently deliver faster than competitors at our price point." |

**Individual item layout**:

| Element | Specification |
|---------|---------------|
| **Wrapper** | `display: grid`, `grid-template-columns: auto 1fr`, `gap: 2rem`. `py-8 md:py-10`. `border-bottom: 1px solid var(--color-line-subtle)` (omit on last). |
| **Number (left)** | AS700, H1 size (`clamp(2.5rem, 4vw + 0.5rem, 4rem)`), `text-brand-red`, `opacity: 0.15`. `min-width: 80px` (md: `min-width: 100px`). |
| **Text block (right)** | Vertical stack. |
| **Title** | AS300, H3 size (`clamp(1.5rem, 1.5vw + 0.5rem, 2rem)`), line-height 1.2, `text-foreground`. |
| **Copy** | MR400, Body (1rem), line-height 1.6, `text-muted`. `max-width: 480px`. `margin-top: 8px`. |

**Responsive**:
- Desktop (lg+): Number on left column, text on right. Generous space.
- Tablet (md): Same layout, narrower.
- Mobile (<md): `grid-template-columns: 1fr` (single column). Number above title (block flow). Number at H2 size. Full width.

**Animation**: Each item `ST-reveal`. Number slides in from left (`x: -20, opacity: 0` -> `x: 0, opacity: 0.15`). Text fades up. `stagger(100ms)` between items.

**Data source**: Hardcoded, i18n via `ui-strings.ts`.

**Component**: `<Differentiators />`
**File location**: `src/components/home/differentiators.tsx`

---

## Section 1.7: Testimonials

**Purpose**: Social proof through client quotes. Clean, minimal. Placeholder content to be filled later.

| Property | Specification |
|----------|---------------|
| **Background** | `bg-base` with grain overlay |
| **Section padding** | Standard |
| **Container** | Standard |

**Section header**:

| Element | Specification |
|---------|---------------|
| **Overline** | "What Clients Say". Overline style. Centered. |
| **No heading** | The quotes themselves are the section content. |
| **Layout** | `margin-bottom: 48px` after overline. |

**Testimonial cards** (2 placeholders):

| Element | Specification |
|---------|---------------|
| **Grid** | `display: grid`, `grid-template-columns: 1fr 1fr` (md+), `gap: 2rem`. Single column on mobile. |

**Individual testimonial**:

| Element | Specification |
|---------|---------------|
| **Layout** | No card background. No box. Just text with a left accent. `border-left: 2px solid var(--color-brand-red)`. `padding-left: 24px`. |
| **Quote mark** | Decorative. `"` character. AS700, font-size `5rem`, `text-brand-red`, `opacity: 0.15`. `position: absolute`, `top: -10px`, `left: 4px`. `pointer-events: none`. Container is `position: relative`. |
| **Quote text** | MR400, Body Large (1.25rem), line-height 1.6, `text-foreground`. `font-style: italic`. |
| **Client name** | MR600, Body (1rem), `text-foreground`. `margin-top: 16px`. |
| **Client role / company** | MR400, Small (0.875rem), `text-muted`. `margin-top: 2px`. |

**Placeholder content**:
1. Quote: "[Placeholder: Quote about speed and quality of delivery]". Name: "[Client Name]". Company: "[Company], [Industry]".
2. Quote: "[Placeholder: Quote about technical capability and result]". Name: "[Client Name]". Company: "[Company], [Industry]".

**Animation**: Both testimonials `ST-reveal` with `stagger(100ms)`.

**Component**: `<Testimonials testimonials={data} />`
**File location**: `src/components/shared/testimonials.tsx`

---

## Section 1.8: CTA Section

**Purpose**: Final conversion push. Direct. Reusable component with homepage-specific copy.

| Property | Specification |
|----------|---------------|
| **Background** | Full-bleed. `background: linear-gradient(180deg, var(--color-base) 0%, var(--color-sunken) 100%)`. Grain overlay. |
| **Section padding** | `py-20 md:py-28 lg:py-36` (slightly larger than standard for visual weight). |
| **Container** | Standard. Content centered. `text-align: center`. |

| Element | Specification |
|---------|---------------|
| **Heading** | "Got a project? Let's talk." AS300, H1 size, `text-foreground`. `max-width: 600px`. `margin-inline: auto`. |
| **Subtext** | "Tell us what you're building. We'll tell you how we'd build it." MR400, Body Large, `text-muted`. `max-width: 480px`. `margin-inline: auto`. `margin-top: 16px`. |
| **Button** | "Start a Conversation". `<Button variant="primary" size="lg">`. Centered. `margin-top: 32px`. Links to `/contact/`. |

**Animation**: Heading `SplitText-chars` (30ms stagger). Subtext and button fade up with `stagger(100ms)`.

**Component**: `<CTASection heading="..." subtext="..." ctaLabel="..." ctaHref="..." />`
**File location**: `src/components/shared/cta-section.tsx`

---

## Section 1.9: Footer

See [_globals.md](_globals.md) **G7. Footer**. Rendered identically on every page.

---

## Data Dependencies

| Content Files Read at Build | Backend API Calls (Runtime) | Build-Time Generated |
|---------------------------|---------------------------|---------------------|
| `content/pages/home/*.md`, `content/site-config.json` | None | -- |

## Structured Data

| JSON-LD Schema Types |
|---------------------|
| `WebSite`, `Organization` (with `address`, `contactPoint`, `sameAs`) |
