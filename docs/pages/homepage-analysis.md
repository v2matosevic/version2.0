# Homepage — Complete Implementation Analysis

> **Date:** 2026-03-06 (updated with gap resolutions)
> **Status:** Pre-build analysis. All content gaps resolved. All technical gaps specified. Ready for Layer 0.
> **Companion docs:** `homepage.md` (blueprint), `_globals.md` (header/footer/FAB), `_conventions.md` (tokens), `docs/design/` (full design system), `docs/components/` (component specs)
> **Other agents:** Three parallel agents working on other tasks. This document is the single source of truth for homepage implementation. Do not duplicate work covered here.

---

## Executive Summary

The homepage is 9 visual zones (preloader + 7 content sections + footer) that tell a single story: "We build what others can't — and this page proves it." The 3D hero is the proof. The services teaser is the offer. The portfolio is the evidence. The differentiators are the argument. The CTA is the close. Every section exists to move the visitor toward contact.

The existing blueprint (`homepage.md`) is production-ready for most sections. This analysis originally identified **13 gaps, 4 structural recommendations, and 6 refinements**. All content and specification gaps have been resolved. Remaining items are owner-dependent (portfolio screenshots, testimonial quotes) and deferred technical decisions (V2 icon in 3D scene).

---

## 1. Page Architecture — The Full Vertical Stack

```
+------------------------------------------------------------------+
| PRELOADER (fixed overlay, z-100, homepage only)                   |
|   V2 icon particle assembly + progress bar                       |
|   800ms min, 4s timeout, session-once                            |
|   Keyboard: Enter/Space dismisses early (a11y)                   |
+==================================================================+
| HEADER (fixed, z-30, transparent over hero)                       |
|   Logo | Portfolio  Pricing  Contact | Menu toggle               |
|   Intersection Observer detects hero exit -> solid state          |
+------------------------------------------------------------------+
|                                                                    |
| SECTION 1: 3D HERO (100vh, bg-sunken #0c0c0c)                    |
|   R3F Canvas (z-20) + CSS gradient fallback                      |
|   Mobile: radial gradient overlay for text contrast              |
|   Content overlay (z-25): overline, headline, red line,           |
|   subtext, 2 CTAs, scroll indicator                              |
|   Touch: no mouse parallax, optional gyroscope drift             |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
| SECTION 2: SERVICES TEASER (bg-base #141414 + grain)             |
|   4 typographic rows: service name + one-liner + arrow           |
|   Separated by subtle border-bottom lines                        |
|   SplitText hover: desktop only (pointer: fine)                  |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
| SECTION 3: PORTFOLIO HIGHLIGHTS (bg-sunken #0c0c0c + grain)      |
|   Overline + heading, asymmetric 2x2 card grid                  |
|   Image placeholders with per-card gradient variation             |
|   "View All Projects" CTA right-aligned                          |
|   Data: content/portfolio/portfolio-homepage.json                |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
| SECTION 4: CLIENT LOGOS (bg-base #141414, border strip)           |
|   6 grayscale logos, color on hover, no heading                  |
|   All 6 logo files verified in content/assets/clients/           |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
| SECTION 5: DIFFERENTIATORS (bg-raised #1c1c1c + radial gradient) |
|   Overline + heading, 4 numbered items (01-04)                   |
|   Numbers: aria-hidden="true" (decorative)                       |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
| SECTION 6: TESTIMONIALS (bg-base #141414 + grain)                |
|   Overline, 2 quote cards with red left border                   |
|   Data: content/testimonials.json (filtered by tag "homepage")   |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
| SECTION 7: CTA (gradient bg-base -> bg-sunken + grain)           |
|   Centered headline + subtext + single button                    |
|   Larger padding for visual weight                               |
|                                                                    |
+------------------------------------------------------------------+
| FOOTER (bg-sunken #0c0c0c) — NO CTA strip on homepage            |
|   4-col grid: Services | Company | Legal | Contact               |
|   Social links, language switcher, copyright                     |
+------------------------------------------------------------------+
| FAB (fixed, z-40, bottom-right)                                   |
| CUSTOM CURSOR (fixed, z-80, desktop only)                         |
| COOKIE CONSENT (fixed, z-70, bottom, first-visit only)           |
+------------------------------------------------------------------+
```

### Section Count Verdict: Correct

The 7 content sections hit the right balance. Brand discovery explicitly excludes:
- Blog tease (blog is SEO/traffic, not homepage content)
- Tech stack logo grid (tech goes in case studies)
- Generic stats section (no vanity metrics)

These exclusions are correct. Do not add them.

---

## 2. Visual Rhythm — Background Alternation

### Dark Mode (Default)

```
Section              Background           Grain    Visual Role
─────────────────────────────────────────────────────────────
Hero                 bg-sunken #0c0c0c    No       Deepest dark — immersive
Services Teaser      bg-base   #141414    Yes      Lift — content zone
Portfolio            bg-sunken #0c0c0c    Yes      Drop back — dramatic
Client Logos         bg-base   #141414    No       Neutral strip — breathing
Differentiators      bg-raised #1c1c1c    Yes      Warmest dark — radial gradient glow
Testimonials         bg-base   #141414    Yes      Return to neutral
CTA                  gradient base->sunken Yes      Descent into final dark
Footer               bg-sunken #0c0c0c    No       Anchoring dark
```

**Pattern:** `deep -> medium -> deep -> medium -> warm -> medium -> gradient -> deep`

The differentiators section with its radial gradient provides the brightest moment before the page darkens toward the CTA and footer. The client logos strip (no grain, reduced padding, border-top/bottom) acts as a visual pause between the two heaviest content sections.

### Light Mode Mapping (RESOLVED — Gap #2)

The hero section is ALWAYS dark (forced via `data-theme="dark"`). The remaining sections alternate between light tones:

```
Section              Dark Token           Light Token              Light Hex
─────────────────────────────────────────────────────────────────────────────
Hero                 bg-sunken #0c0c0c    bg-sunken #0c0c0c       FORCED DARK
Services Teaser      bg-base   #141414    bg-light-base            #F5F0EB
Portfolio            bg-sunken #0c0c0c    bg-light-sunken          #EDE8E3
Client Logos         bg-base   #141414    bg-light-base            #F5F0EB
Differentiators      bg-raised #1c1c1c    bg-light-raised          #FAF7F4
Testimonials         bg-base   #141414    bg-light-base            #F5F0EB
CTA                  gradient            gradient raised->sunken   #FAF7F4 -> #EDE8E3
Footer               bg-sunken #0c0c0c    bg-sunken #0c0c0c       FORCED DARK
```

The hero and footer stay dark regardless of mode. They're anchor points — the hero IS the brand statement (dark = cinematic), and the footer is utility (dark = grounding). The sections between them flip to warm cream/off-white tones in light mode. The grain overlay reduces to `opacity: 0.025` on light backgrounds.

**Implementation:** Use `data-theme="dark"` on the hero and footer `<section>` containers. All other sections inherit the global mode.

---

## 3. Header Behavior on Homepage

The header has 4 states, and the homepage is the only page that uses State 1 (transparent):

| State | Condition | Visual |
|-------|-----------|--------|
| **1. Transparent** | Hero is in viewport (Intersection Observer) | `background: transparent`. Logo + links in `text-foreground`. No border. |
| **2. Solid** | Hero exited viewport AND scrolling up or stationary | `bg-base/90` + `backdrop-filter: blur(8px)` + `border-bottom: 1px solid line-subtle`. |
| **3. Hidden** | `scrollDirection === 'down'` AND hero is out of viewport | `translateY(-100%)` over 200ms. |
| **4. Revealed** | `scrollDirection === 'up'` (at any scroll position past hero) | `translateY(0)` over 200ms. Returns to State 2. |

### Hero Height Detection (RESOLVED — Gap #1)

**Decision:** Intersection Observer on the hero `<section>` element.

```typescript
// In Header component
const [heroVisible, setHeroVisible] = useState(true);

useEffect(() => {
  const hero = document.getElementById('hero');
  if (!hero) { setHeroVisible(false); return; } // non-homepage pages

  const observer = new IntersectionObserver(
    ([entry]) => setHeroVisible(entry.isIntersecting),
    { threshold: 0 } // fires as soon as hero exits/enters viewport
  );
  observer.observe(hero);
  return () => observer.disconnect();
}, []);

// heroVisible ? State 1 (transparent) : State 2/3/4 (solid/hidden/revealed)
```

**Why this over scroll position:** Handles dynamic viewport heights (mobile browser chrome appearing/disappearing), doesn't require measuring the hero element, and fires exactly once per transition rather than on every scroll frame.

On non-homepage pages where there's no `#hero` element, the observer never attaches and `heroVisible` stays `false` — the header starts in State 2 directly.

### Scroll Direction Detection

For States 3/4 (hide on scroll down, reveal on scroll up), use a scroll direction hook:

```typescript
function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY.current) < threshold) return;
      setDirection(currentY > lastY.current ? 'down' : 'up');
      lastY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
}
```

The 10px threshold prevents jittery show/hide on micro-scrolls. Combined with the Intersection Observer, the header state logic is:

```
if (heroVisible) -> transparent
else if (scrollDirection === 'down') -> hidden (translateY -100%)
else -> solid (revealed)
```

---

## 4. Footer Interaction with Homepage

### Footer CTA Strip (RESOLVED — Gap #3)

**Decision:** The footer CTA strip is DISABLED on the homepage.

Section 7 already provides the conversion close. Two back-to-back CTAs with nearly identical copy is redundant. The footer CTA strip remains active on all other pages (blog posts, service pages, about, etc.) where there's no dedicated CTA section above the footer.

**Implementation:** The `<Footer>` component accepts a `showCTAStrip` prop:

```tsx
// Root layout determines this based on route
const isHomepage = pathname === '/' || pathname === '/hr/' || pathname === '/de/';
<Footer showCTAStrip={!isHomepage} />
```

### Footer Content

The footer is identical across all pages. No scroll-triggered animations. The `site-config.json` is already updated with English-first navigation URLs. The footer's 4 columns pull from:
- `navigation.footer.services` — 5 service links
- `navigation.footer.company` — 4 company links
- `navigation.footer.legal` — 3 legal links (note: `homepage.md` lists 6 legal links but `site-config.json` only has 3. Missing: Legal Notice, Terms & Conditions, Accessibility.)
- `contact` — email, phone, WhatsApp
- `social` — Facebook, Instagram, X, TikTok

### Gap #14: Footer Legal Links in site-config.json (RESOLVED)

All 6 legal links are now present in `site-config.json`: Legal Notice, Terms & Conditions, Privacy Policy, Cookies, Refund Policy, Accessibility. Updated by a parallel agent.

**Remaining:** The "Cookie Settings" link that re-opens the consent banner is not a navigation link — it's a button rendered in the footer component that calls `reopenCookieConsent()`. It lives in the footer template code, not in `site-config.json`.

---

## 5. Section-by-Section Deep Analysis

### 5.1 Preloader

**Status:** Fully specified. Accessibility gap resolved.

The preloader is a 2D Canvas particle animation (not R3F) where ~100 particles converge into the V2 chevron icon shape. This is smart engineering: the preloader doesn't depend on the heavy 3D scene it's masking.

**Animation sequence:**
1. Particles scattered randomly -> converge to V2 icon vertices (1.5s, ease-out)
2. Final icon renders at opacity 0.8
3. Progress bar fills (tied to asset loading or timed fallback)
4. When ready: icon scales to 1.1x + fades out (600ms)
5. At 300ms mark of exit: hero entrance animation begins (overlap)

**Edge cases handled:**
- Fast connections: 800ms minimum display prevents flash
- Slow/broken 3D: 4s timeout auto-dismisses, falls back to CSS gradient
- Return visits: `sessionStorage` flag skips on client-side navigation
- Reduced motion: static SVG icon, 800ms hold, 300ms fade

### Preloader Accessibility (RESOLVED — Gap #13)

The preloader is a fixed overlay at z-100. Keyboard users tabbing during the preloader would hit the skip-to-content link and invisible elements behind the overlay.

**Decision:** Make the preloader keyboard-dismissable AND focus-trapping.

1. The preloader container gets `role="status"` and `aria-label="Loading Version2"`.
2. A visually hidden "Skip loading" button is the first focusable element inside the preloader. On Enter/Space, it triggers the preloader exit sequence early (still plays the 600ms exit animation, doesn't instantly vanish).
3. Focus is trapped within the preloader div until it exits. On exit, focus releases to the `#main-content` element.
4. The preloader announces completion via `aria-live="polite"`: sets text to "Loading complete" before the exit animation begins.

```tsx
<div
  role="status"
  aria-label="Loading Version2"
  aria-live="polite"
  className="preloader"
>
  <button
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 ..."
    onClick={dismissPreloader}
  >
    Skip loading
  </button>
  {/* Canvas particle animation */}
  {/* Progress bar */}
</div>
```

### Preloader-to-Hero Handoff (RESOLVED — Gap #4)

The 3D Canvas fade-in must be coordinated with the preloader exit, not independent.

**Sequence:**
```
Preloader exit begins (t=0)
  t=0ms:   Preloader icon scales up, fades. Canvas opacity held at 0.
  t=300ms: Hero content entrance begins (overline fade-up).
           Canvas fade-in begins (opacity 0 -> 1 over 1000ms).
  t=600ms: Preloader fully gone. Canvas at ~30% opacity.
  t=1300ms: Canvas fully opaque. Hero text still animating (SplitText).
```

**Implementation:** The preloader's `onComplete` callback fires at t=0 of its exit. The homepage layout passes this signal to both `<HeroContent>` (start entrance) and `<HeroScene>` (start canvas fade):

```tsx
const [preloaderExiting, setPreloaderExiting] = useState(false);

<Preloader onExitStart={() => setPreloaderExiting(true)} />
<HeroScene startFadeIn={preloaderExiting} />
<HeroContent startEntrance={preloaderExiting} entranceDelay={300} />
```

For return visits (preloader skipped), both signals fire immediately on mount.

### 5.2 3D Hero

**Status:** Fully specified. Touch interaction gap resolved.

**File decomposition:**
```
src/components/scenes/
  hero-scene.tsx       <- Canvas wrapper, dynamic import, GPU detection, fallback
  hero-objects.tsx     <- 3 wireframe polyhedra with slow rotation
  hero-particles.tsx   <- Point cloud with mouse/gyro interaction
  hero-lighting.tsx    <- Key light, fill light, ambient
  hero-effects.tsx     <- Bloom + Vignette post-processing
```

### Touch Interaction (RESOLVED — Gap #12)

On touch devices (`pointer: coarse`), mouse-based interactions are disabled and optionally replaced:

| Interaction | Desktop (pointer: fine) | Touch (pointer: coarse) |
|-------------|------------------------|------------------------|
| **Camera parallax** | Mouse position offsets camera +/-0.3 units | DeviceOrientation API: gentle camera drift based on device tilt. Fallback: slow automatic camera drift (sine wave, ~0.1 units amplitude, 8s period). |
| **Particle attraction** | Particles within 2-unit radius lerp toward cursor | Disabled. Particles only use ambient sinusoidal drift. |
| **Post-processing** | Bloom + Vignette | Tier 1-2: No bloom (performance). Tier 3+: same as desktop. |

**DeviceOrientation implementation:**

```typescript
function useTiltParallax(enabled: boolean) {
  const tilt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const handler = (e: DeviceOrientationEvent) => {
      // gamma = left/right tilt (-90 to 90)
      // beta = front/back tilt (-180 to 180)
      tilt.current.x = (e.gamma ?? 0) / 90;  // normalize to -1..1
      tilt.current.y = (e.beta ?? 0) / 180;
    };
    window.addEventListener('deviceorientation', handler);
    return () => window.removeEventListener('deviceorientation', handler);
  }, [enabled]);

  return tilt;
}
```

On iOS 13+, DeviceOrientation requires explicit permission (`DeviceOrientationEvent.requestPermission()`). If permission is denied or the API isn't available, fall back to the automatic sine wave drift. Never prompt the user unprompted — only request if the user has interacted with the page (e.g., scrolled, tapped).

### Mobile Hero Text Contrast (RESOLVED — Gap #11)

A radial gradient overlay between the Canvas and text on mobile ensures readability:

```tsx
{/* Inside the hero section, between Canvas and HeroContent */}
<div
  className="absolute inset-0 pointer-events-none md:hidden"
  style={{
    background: 'radial-gradient(ellipse at 50% 50%, rgba(12,12,12,0.65) 0%, rgba(12,12,12,0.3) 50%, transparent 80%)',
    zIndex: 'var(--z-canvas)' // same as canvas, but rendered after it in DOM
  }}
  aria-hidden="true"
/>
```

This creates a soft dark "reading zone" centered behind the text without a hard edge. The gradient fades to transparent at the edges so the 3D scene remains visible peripherally. On tablet+ (`md:hidden`), this overlay is removed because the text is left-aligned and doesn't overlap the busiest parts of the scene.

### V2 Icon in 3D Scene (RESOLVED — Gap #5)

**Decision:** Keep the 3D scene abstract for v1 launch. The preloader delivers the V2 brand moment (particle-to-icon convergence). The 3D scene proves technical capability through atmosphere, not self-reference.

**Post-launch consideration:** One wireframe shape could use a custom geometry whose silhouette echoes the V2 chevron angle. This is a subtle geometric rhyme, not a literal logo. Deferred to post-launch polish.

### 5.3 Services Teaser

**Status:** Fully specified. Hover refinement resolved.

This section is the brand's offer statement. Four rows of huge type. Typography IS the design.

### SplitText Hover — Desktop Only (RESOLVED — Refinement #2)

Per-character color shift on hover uses GSAP SplitText with 30ms stagger. This only activates on devices with a fine pointer:

```typescript
// In ServicesTeaser component
const canHover = useMediaQuery('(pointer: fine)');

// Only initialize SplitText if canHover is true
useEffect(() => {
  if (!canHover) return;
  // Set up GSAP SplitText on service name elements
  // ...
}, [canHover]);
```

On touch devices, tapping a service row navigates directly. No animation delay. The service name receives a brief `text-brand-red` flash (100ms) via CSS `:active` state to confirm the tap.

### Heading Hierarchy (Confirmed — Refinement #1)

```html
<h1>We build what others can't.</h1>           <!-- Hero -->
<!-- No section heading for services teaser -->
<h2>Custom Websites</h2>                        <!-- Service name = H2 -->
<h2>Web Applications</h2>
<h2>Online Stores</h2>
<h2>AI Integration</h2>
<h2>Projects that prove the point.</h2>          <!-- Portfolio heading -->
<h2>Every line is ours.</h2>                     <!-- Differentiators heading -->
<h2>Got a project? Let's talk.</h2>              <!-- CTA heading -->
```

Semantically correct. Single H1 (hero), all section headings are H2. The service names ARE the section — no wrapper heading needed.

### 5.4 Portfolio Highlights

**Status:** Data structure created. Awaiting real content from owner.

### Portfolio Data Source (RESOLVED — Gap #7)

Created `content/portfolio/portfolio-homepage.json` with the expected schema:

```json
{
  "featured": [
    {
      "slug": "kargita-camping",
      "name": { "en": "Kargita Camping", "hr": "...", "de": "..." },
      "industry": { "en": "Tourism & Hospitality", ... },
      "tech_highlights": ["3D configurator", "booking system", "multi-language"],
      "image": null,
      "grid_size": "large"
    },
    // ... 3 more projects
  ]
}
```

The `grid_size` field (`"large"` or `"standard"`) maps to the zigzag layout:
- Row 1: card[0] = large (1.2fr), card[1] = standard (1fr)
- Row 2: card[2] = standard (1fr), card[3] = large (1.2fr)

When `image` is `null`, the component renders the CSS gradient placeholder with per-card variation (see below).

### Image Placeholder Variation (RESOLVED — Gap #8)

Each placeholder card gets a unique gradient based on its index:

```typescript
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, var(--color-raised) 0%, var(--color-base) 60%, rgba(153,23,23,0.08) 100%)',
  'linear-gradient(225deg, var(--color-raised) 0%, var(--color-base) 55%, rgba(153,23,23,0.06) 100%)',
  'linear-gradient(160deg, var(--color-base) 0%, var(--color-raised) 50%, rgba(153,23,23,0.05) 100%)',
  'linear-gradient(200deg, var(--color-raised) 10%, var(--color-base) 60%, rgba(153,23,23,0.07) 100%)',
] as const;
```

Different angles and slightly different red tint intensities make each card visually distinct during development. When real screenshots arrive, these are replaced by `<img>` elements.

### 5.5 Client Logos

**Status:** Fully specified. All assets verified.

All 6 logo files confirmed present in `content/assets/clients/`:
- `dubrovnik-republic-gin.webp`
- `zadar-tehnika.webp`
- `tamaris.webp`
- `riva-consulting-logo.webp`
- `lcl-optika-ds.webp`
- `cardo.webp`

Each also has responsive variants (`-600w.webp`, `-1200w.webp`, `-1920w.webp`). For the logo strip, use the base `.webp` file (smallest, sufficient at 48px display height).

### 5.6 Differentiators

**Status:** Fully specified. Accessibility note confirmed.

The editorial numbered layout (giant faded 01-04 in brand red). The numbers are decorative at `opacity: 0.15`.

**Confirmed:** Numbers get `aria-hidden="true"`. Screen readers skip them — the title and copy carry the content.

### 5.7 Testimonials

**Status:** Data schema created. Awaiting real quotes from owner.

### Testimonial Data Source (RESOLVED — Gap #10)

Created `content/testimonials.json` with centralized testimonial data:

```json
{
  "testimonials": [
    {
      "id": "placeholder-speed",
      "quote": { "en": "...", "hr": "...", "de": "..." },
      "name": "[Client Name]",
      "role": "[Role / Title]",
      "company": "[Company]",
      "industry": "[Industry]",
      "tags": ["speed", "quality", "homepage"],
      "featured": true
    }
  ]
}
```

The `<Testimonials>` component loads from this file and filters by tag. Homepage uses `tag: "homepage"`. Service detail pages use industry-specific tags. Case study pages use project-specific IDs.

**Loader function:**
```typescript
function loadTestimonials(filter: { tag?: string; ids?: string[] }): Testimonial[] {
  const all = testimonialData.testimonials;
  if (filter.ids) return all.filter(t => filter.ids!.includes(t.id));
  if (filter.tag) return all.filter(t => t.tags.includes(filter.tag!));
  return all.filter(t => t.featured);
}
```

### 5.8 CTA Section

**Status:** Fully specified. Reusable component. No changes needed.

---

## 6. Animation Orchestration — The Full Choreography

### 6.1 Initial Load Sequence (First Visit)

```
Time    Event
─────   ──────────────────────────────────────────────────
0ms     HTML renders: CSS gradient fallback + hero text (invisible, opacity 0)
        Preloader overlay covers everything (z-100)
        Preloader particles begin scattering
        Focus trapped in preloader. "Skip loading" button available.

~50ms   R3F Canvas begins loading (dynamic import, ssr: false)
        Preloader progress bar starts

1500ms  Preloader particles converge into V2 icon
        Progress bar at ~75% (or actual loading progress)

~2000ms R3F Canvas reports ready (onCreated fires)
        OR 4000ms timeout reached

2000ms  Preloader begins exit (onExitStart fires):
        - Icon scales 1.0 -> 1.1x, fades to 0 (600ms)
        - Background fades to 0 (600ms)
        - aria-live region announces "Loading complete"

2300ms  Hero entrance begins (300ms into preloader exit):
        Canvas fade-in begins simultaneously (1000ms, ease-out)
        +0ms    Overline fades up (0.6s)
        +150ms  Headline SplitText chars stagger in (30ms per char)
                "We build what others can't." = 31 chars
                Duration: ~31 * 30ms + 500ms = ~1430ms total
        +~930ms Red accent line grows from 0 to 64px (0.6s)
                (starts when headline ~60% complete)
        +~1030ms Subtext fades up (0.8s)
        +~1130ms CTA Primary fades up (0.6s)
        +~1230ms CTA Secondary fades up (0.6s)
        +~1830ms Scroll indicator fades in (0.5s)

2600ms  Preloader fully gone. Focus released to #main-content.

3300ms  R3F Canvas fully opaque

~4130ms All hero entrance animations complete
        Page is fully "arrived"
```

**Total time from first paint to fully resolved hero: ~4 seconds.**

### 6.2 Return Visit Sequence (Session Revisit)

```
Time    Event
─────   ──────────────────────────────────────────────────
0ms     sessionStorage.v2_preloader_shown = "true" detected
        Preloader skipped entirely
        Hero text entrance animation plays immediately
        R3F Canvas loads in background, fades in when ready
```

### 6.3 Reduced Motion Sequence

```
Time    Event
─────   ──────────────────────────────────────────────────
0ms     prefers-reduced-motion detected
        No preloader particle animation — static SVG icon
        No R3F canvas loaded — CSS gradient fallback only
        Hero text renders in final position immediately (no SplitText)
        No Lenis smooth scroll — native browser scroll

800ms   Preloader fades out (300ms, opacity only, no scale)

Scroll  No ScrollTrigger animations — all sections visible
        No per-character hover effects
        Page transitions: instant opacity swap (150ms)
```

### 6.4 Scroll Animation Map

Every section below the hero uses GSAP ScrollTrigger reveals:

```
Scroll Position          Animation
────────────────         ─────────────────────────────────────
Hero bottom              Header transitions: transparent -> solid
(Intersection Observer)  Scroll indicator fades out

Services Teaser top      4 service items stagger in (100ms apart)
hits 85% viewport        Each: opacity 0->1, y 40->0, 0.8s, power2.out

Portfolio heading        Overline + heading ST-reveal
hits 85%                 Then 4 cards stagger in (100ms apart)
                         Each card: opacity 0->1, y 40->0, 0.8s

Client logos strip       Entire flex container fades in as one unit
hits 85%                 (logos appear together, not individually)

Differentiators top      Each of 4 items staggers in (100ms apart)
hits 85%                 Number: x -20->0, opacity 0->0.15
                         Title+copy: opacity 0->1, y 40->0

Testimonials top         2 testimonial cards stagger in (100ms apart)
hits 85%                 Standard ST-reveal

CTA heading              SplitText-chars (30ms stagger per character)
hits 85%                 Subtext + button fade up (100ms stagger)
```

**Principle:** One orchestrated entrance per section. No continuous scroll-linked animations (parallax, scrub). No reverse on scroll-up (`once: true`). Elements arrive and stay.

### 6.5 Hover Animations (Always Active, CSS + GSAP)

| Element | Animation | Library | Touch Behavior |
|---------|-----------|---------|----------------|
| Header links | Color to `text-brand-red`, 150ms | CSS | N/A (header links hidden on mobile) |
| Service teaser names | Per-char color shift to red, 30ms stagger | GSAP SplitText | `:active` flash only |
| Service teaser arrows | `translateX(4px)` + color red, 200ms | CSS | Hidden on mobile |
| Portfolio card images | `scale(1.03)`, 400ms | CSS | Disabled (no hover) |
| Portfolio cards | `translateY(-4px)` + border red/30, 200ms | CSS | Disabled (no hover) |
| Client logos | Grayscale(0%) + opacity 1, 400ms | CSS | Always colorized on touch |
| CTA button | `bg-brand-red-hover`, standard timing | CSS | `:active` state |
| Custom cursor | State changes per element type | JS (lerp) | Hidden entirely |
| Menu links | Per-char color shift, 30ms stagger | GSAP SplitText | `:active` flash |

**Client logos on touch:** Since there's no hover on touch devices, logos should render at full color (not grayscale) by default. The grayscale-to-color interaction is desktop-only:

```css
@media (pointer: fine) {
  .client-logo { filter: grayscale(100%) brightness(0.6); opacity: 0.5; }
  .client-logo:hover { filter: grayscale(0%) brightness(1); opacity: 1; }
}
@media (pointer: coarse) {
  .client-logo { filter: grayscale(0%) brightness(1); opacity: 0.7; }
}
```

---

## 7. Responsive Strategy

### 7.1 Breakpoint Behavior

| Section | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) |
|---------|-----------------|--------------------|--------------------|
| **Header** | Logo + menu toggle only | Logo + menu toggle only | Logo + 3 text links + menu toggle |
| **Hero text** | Centered, full width, dark overlay behind text | Left-aligned, 75% width | Left-aligned, 58% width (~cols 1-7) |
| **Hero CTAs** | Stacked, full-width buttons | Horizontal row | Horizontal row |
| **Hero 3D** | Tier-appropriate (150 particles, no wireframes on low-end). Gyroscope drift or auto-drift. | Same as mobile | Full scene. Mouse parallax + particle attraction. |
| **Scroll indicator** | Hidden | Visible | Visible |
| **Services Teaser** | Full-width, no arrow, no SplitText hover | Full-width, arrow visible | Left text, right arrow, SplitText hover |
| **Portfolio Grid** | Single column | 2-col equal | 2-col asymmetric zigzag |
| **Client Logos** | 2 rows of 3, 36px height, full color | Single row, 44px height | Single row, 48px height, grayscale->color hover |
| **Differentiators** | Single column (number above title) | 2-col (number left, text right) | 2-col with generous space |
| **Testimonials** | Single column | 2-col grid | 2-col grid |
| **CTA** | Centered, stacked | Centered | Centered |
| **Footer** | Single column | 2x2 grid | 4-col grid |
| **Menu** | Full-screen overlay | Full-screen overlay | 400px sidebar panel |
| **Custom Cursor** | Hidden | Hidden | Visible |
| **FAB** | Visible | Visible | Visible |

### 7.2 Critical Mobile Dimensions

| Device | Width | Hero font-size (clamp) | Notes |
|--------|-------|----------------------|-------|
| iPhone SE | 375px | ~3.4rem (54px) | Smallest mainstream. 3 lines for headline. |
| iPhone 14 | 390px | ~3.5rem (56px) | Standard. 2-3 lines. |
| iPhone 14 Pro Max | 430px | ~3.7rem (59px) | Large. 2 lines. |
| iPad Mini | 768px | ~4.4rem (70px) | Tablet breakpoint. Left-aligned kicks in. |
| iPad Pro 11" | 834px | ~4.6rem (73px) | Comfortable. |
| Desktop 1280px | 1280px | ~5.5rem (88px) | Clamp maximum reached. |

The clamp formula `clamp(3rem, 5vw + 1rem, 5.5rem)` scales smoothly across all these sizes. At no point is the headline less than 3rem (48px) — always large enough to command the viewport.

---

## 8. Performance Budget

### 8.1 Critical Rendering Path

```
                           ┌─ CSS (globals.css + Tailwind, <15KB gzipped)
HTML ──────────────────────┤
(static, pre-rendered)     ├─ Fonts (Albert Sans + Manrope, ~60KB total)
                           ├─ Hero gradient + text (visible immediately)
                           └─ Preloader overlay (visible immediately)

                           LCP fires here (~1.2-1.5s)

After hydration:           ┌─ R3F bundle (~150-200KB gzipped)
Dynamic imports ───────────┤  loaded via next/dynamic, ssr: false
(non-blocking)             ├─ GSAP + ScrollTrigger (~45KB gzipped)
                           ├─ Lenis (~8KB gzipped)
                           ├─ detect-gpu (~5KB gzipped)
                           └─ noise.png texture (<5KB)
```

**Target:** LCP = hero headline text. This renders from static HTML before any JS loads. The 3D scene is progressive enhancement.

### 8.2 Bundle Splitting Strategy

| Bundle | Contents | Load Trigger | Size Estimate |
|--------|----------|-------------|---------------|
| **Main** | React, Next.js runtime, Tailwind, layout components | Immediate | ~100KB gzipped |
| **Homepage** | Preloader, HeroContent, ServicesTeaser, PortfolioHighlights, ClientLogos, Differentiators, CTASection | Route: `/` | ~30KB gzipped |
| **R3F Scene** | @react-three/fiber, drei, postprocessing, hero-scene + children, detect-gpu | `next/dynamic`, `ssr: false` | ~180KB gzipped |
| **GSAP** | gsap, ScrollTrigger, SplitText | First scroll or hero entrance | ~45KB gzipped |
| **Lenis** | lenis | Root layout mount | ~8KB gzipped |

### 8.3 Performance Targets

| Metric | Target | Risk | Mitigation |
|--------|--------|------|------------|
| LCP | < 2.5s | Low | Hero text is static HTML |
| FID/INP | < 200ms | Medium | R3F hydration | `startTransition` for canvas mount |
| CLS | < 0.1 | Low | All sizes explicit | Font `size-adjust` prevents FOUT shift |
| Total JS (homepage) | < 400KB gzipped | Medium | Code splitting separates R3F |
| 3D scene FPS | 60fps desktop, 30fps+ mobile | High | GPU tier detection + particle reduction |
| Lighthouse Performance | 90+ | Medium | Progressive loading, font preload |

### 8.4 Font Loading Strategy

Fonts are the second-largest blocking resource after CSS. Strategy:

1. **Preload critical fonts** in `<head>`: Albert Sans 300 (headlines) and Manrope 400 (body).
2. Use `font-display: swap` for all weights — text renders in fallback immediately, swaps when font loads.
3. Use `size-adjust` on the fallback stack to minimize CLS during swap:
   ```css
   @font-face {
     font-family: 'Albert Sans Fallback';
     src: local('Arial');
     size-adjust: 104%;
     ascent-override: 95%;
   }
   ```
4. Only load Albert Sans 700 and Manrope 600 after initial paint (used for bold accents, not critical path).

---

## 9. Custom Cursor States on Homepage

The custom cursor (`docs/pages/_globals.md` G8) has state changes per element type. Here are all cursor states triggered by homepage elements:

| Element | Cursor State | Visual |
|---------|-------------|--------|
| **Default** (anywhere) | Default | 8px circle, `border: 1.5px solid foreground`, transparent fill |
| **Hero CTAs** | Link/Button | 48px circle, contains "View" text |
| **Service teaser rows** | Link/Button | 48px circle, contains "View" text |
| **Portfolio cards** | Link/Button | 48px circle, contains "View" text |
| **Portfolio card images** | Image | 4px filled dot (shrinks) |
| **Client logos** | Interactive | 40px circle, `foreground/10` fill, `mix-blend-mode: difference` |
| **CTA button** | Link/Button | 48px circle, contains "Start" text |
| **Header links** | Link/Button | 48px circle, transparent |
| **Menu toggle** | Interactive | 40px circle |
| **FAB** | Interactive | 40px circle |
| **Scroll indicator** | Default | No change (it's not interactive) |
| **Footer links** | Link/Button | 48px circle |

**Implementation:** The cursor component reads `data-cursor` attributes on elements:

```tsx
// On interactive elements:
<a data-cursor="link" data-cursor-label="View" href="/portfolio/">...</a>
<button data-cursor="interactive">...</button>
<img data-cursor="image" />

// Cursor component reads these via mouseover event delegation:
document.addEventListener('mouseover', (e) => {
  const target = (e.target as HTMLElement).closest('[data-cursor]');
  setCursorState(target?.dataset.cursor ?? 'default');
  setCursorLabel(target?.dataset.cursorLabel ?? '');
});
```

This avoids per-component cursor logic — the cursor is a global observer.

---

## 10. Content Files — Current State

### Homepage Content (RESOLVED — Gap #6)

All three homepage content files have been rewritten to match the new brand direction:

| File | Status | Key Changes from Old WordPress Content |
|------|--------|---------------------------------------|
| `content/pages/home/en.md` | Updated | Removed old services (social media, PPC, video). Added structured frontmatter with all section data. New hero copy matches blueprint. |
| `content/pages/home/hr.md` | Updated | Complete rewrite. Removed "473+ projects" vanity metrics, old agency services. All section copy translated. |
| `content/pages/home/de.md` | Updated | Complete rewrite. Uses informal "du" address (per decision). All section copy translated. |

**Frontmatter structure** (all languages follow this schema):
```yaml
title: "..."          # <title> tag and OG title
description: "..."    # meta description and OG description
h1: "..."             # Hero headline
overline: "..."       # Hero overline text
subtext: "..."        # Hero subtext paragraph
cta_primary_label/href   # Hero primary CTA
cta_secondary_label/href # Hero secondary CTA
services_teaser: [...]   # 4 service items with name, description, href
differentiators: [...]   # 4 items with number, title, copy
cta_section: { heading, subtext, label, href }  # Bottom CTA
```

The body markdown (`# We build what others can't.`) is minimal — the frontmatter carries all structured content. The body exists as a fallback for any parser that reads markdown content directly.

### Portfolio Data (RESOLVED — Gap #7 structure)

`content/portfolio/portfolio-homepage.json` created with the expected schema. **Updated 2026-03-19:** Now contains 6 real projects (Misha Gashi, Village Homes Drage, Adria Escape, Villa Nadja & Tamaris, Fiore Paklenica, SIMA Office) with real screenshots and i18n data.

### Testimonials Data (RESOLVED — Gap #10)

`content/testimonials.json` created with centralized schema. Tags enable per-page filtering. Homepage uses `tag: "homepage"`. **Updated 2026-03-19:** Now contains 8 real Google Maps reviews (5.0 stars) with trilingual translations. 4 marked as `featured: true` for homepage display.

---

## 11. What Should NOT Be on the Homepage

Explicitly confirmed exclusions (from brand discovery + blueprint):

1. **Blog tease / latest posts** — Blog is SEO/traffic, not homepage content
2. **Tech stack logo grid** — Tech goes in case studies
3. **Generic stats** ("500+ projects") — Removed from old content. No vanity metrics.
4. **Newsletter signup** — No newsletter. Adds burden for zero ROI at this scale.
5. **Map embed** — Contact page only
6. **Pricing teaser** — "Get a Quote" CTA links to pricing page. No prices on homepage.
7. **Team photos** — About page handles this
8. **Awards / certifications** — Not yet relevant
9. **Animated counters** — Differentiators section uses editorial content instead
10. **Video background** — 3D scene IS the background
11. **Old agency services** — Social media, PPC, video, photography are DROPPED. Old content removed.
12. **"Trusted by" / "Our Clients" label** — Logos speak for themselves

---

## 12. What Could Be Added (Post-Launch Consideration)

These are NOT for v1. Ideas to evaluate after launch:

1. **Micro-case-study in portfolio cards** — On hover, card could show a key metric or tech highlight
2. **Sound design** — Subtle ambient or UI sounds (opt-in). Reference: Unseen Studio, Dogstudio.
3. **Scroll progress indicator** — Thin red line at viewport top, fills as you scroll
4. **Dynamic testimonial rotation** — Crossfade between 4+ quotes every 6s
5. **Live project count** — "5 Projects" overline updated from content directory at build time
6. **Parallax depth on portfolio cards** — Subtle perspective tilt on mouse move (desktop only)

---

## 13. Component Dependency Tree

```
page.tsx (homepage)
├── <Preloader onExitStart={} />                   [layout/preloader.tsx]
│   ├── 2D Canvas particle animation
│   ├── Progress bar
│   └── "Skip loading" button (sr-only, a11y)
│
├── <section id="hero" data-theme="dark">            [HERO — always dark]
│   ├── CSS gradient fallback <div>
│   ├── Mobile contrast overlay <div> (md:hidden)
│   ├── <HeroScene                                  [scenes/hero-scene.tsx]
│   │     onReady={}
│   │     startFadeIn={preloaderExiting} />
│   │   ├── <HeroLighting />                        [scenes/hero-lighting.tsx]
│   │   ├── <HeroObjects />                         [scenes/hero-objects.tsx]
│   │   ├── <HeroParticles                          [scenes/hero-particles.tsx]
│   │   │     useGyroscope={isTouchDevice} />
│   │   └── <HeroEffects />                         [scenes/hero-effects.tsx]
│   └── <HeroContent                                [home/hero-content.tsx]
│         startEntrance={preloaderExiting}
│         entranceDelay={300} />
│       ├── Overline <span>
│       ├── <h1> headline (GSAP SplitText target)
│       ├── Red accent line <div>
│       ├── Subtext <p>
│       ├── <Button variant="primary" /> -> /portfolio/
│       ├── <Button variant="secondary" /> -> /pricing/
│       └── Scroll indicator <div>
│
├── <Section variant="dark" id="services">            [SERVICES TEASER]
│   └── <ServicesTeaser                              [home/services-teaser.tsx]
│         services={frontmatter.services_teaser} />
│       └── 4x <a> service items (name + one-liner + arrow)
│           └── data-cursor="link" data-cursor-label="View"
│
├── <Section variant="dark">                          [PORTFOLIO]
│   └── <PortfolioHighlights                         [home/portfolio-highlights.tsx]
│         projects={portfolioData.featured} />
│       ├── Overline "Selected Work" + heading
│       ├── 4x portfolio cards (asymmetric grid)
│       │   └── data-cursor="link" data-cursor-label="View"
│       └── "View All Projects" ghost button -> /portfolio/
│
├── <Section variant="dark" padding="reduced" noGrain> [CLIENT LOGOS]
│   └── <ClientLogos />                              [home/client-logos.tsx]
│       └── 6x <img> logos (grayscale on pointer:fine only)
│
├── <Section variant="dark">                          [DIFFERENTIATORS]
│   └── <Differentiators                             [home/differentiators.tsx]
│         items={frontmatter.differentiators} />
│       └── 4x numbered items
│           └── <span aria-hidden="true">01</span> + title + copy
│
├── <Section variant="dark">                          [TESTIMONIALS]
│   └── <Testimonials                                [shared/testimonials.tsx]
│         testimonials={loadTestimonials({tag:'homepage'})} />
│       └── 2x quote cards
│
├── <CTASection                                       [CTA]
│     heading={frontmatter.cta_section.heading}
│     subtext={frontmatter.cta_section.subtext}
│     ctaLabel={frontmatter.cta_section.label}
│     ctaHref={frontmatter.cta_section.href} />     [shared/cta-section.tsx]
│
└── (Footer rendered by root layout with showCTAStrip={false})

Global overlays (rendered in root layout):
├── <Header />                    (Intersection Observer on #hero)
├── <Footer showCTAStrip={false} />
├── <FAB />
├── <CustomCursor />              (reads data-cursor attributes)
├── <CookieConsent />
└── <PageTransition>              wraps page content
```

---

## 14. Implementation Order

| Layer | Homepage Work | Dependencies |
|-------|-------------|-------------|
| **Layer 0** | None | -- |
| **Layer 1** | Design tokens (including light mode section mapping), typography, Button/Section/Container primitives | -- |
| **Layer 2** | Homepage content loaders (parse frontmatter from `en.md`/`hr.md`/`de.md`). Portfolio JSON loader. Testimonials JSON loader. i18n route config for `/`, `/hr/`, `/de/`. | Layer 1 |
| **Layer 3** | Header (4 states + Intersection Observer), Footer (with `showCTAStrip` prop), Menu, PageTransition, Lenis, FAB, CookieConsent, CustomCursor (with `data-cursor` system). Tested with minimal homepage. | Layer 2 |
| **Layer 4c** | All 7 homepage sections. Preloader shell (no particles yet). Hero with CSS gradient fallback only. All sections use real content from frontmatter. Portfolio uses placeholder gradients. | Layer 3 |
| **Layer 5** | Homepage JSON-LD (WebSite + Organization), meta tags, canonical, hreflang, OG image. | Layer 4c |
| **Layer 6** | R3F hero scene (5 files). Preloader particle animation. GPU tier detection. Touch/gyroscope handling. GSAP ScrollTrigger on all sections. SplitText on hero/services/CTA. Custom cursor states. | Layer 4c (can start immediately) |

---

## 15. Gap Resolution Summary

| # | Gap | Status | Resolution |
|---|-----|--------|-----------|
| 1 | Hero height detection | RESOLVED | Intersection Observer on `#hero` section |
| 2 | Light mode section mapping | RESOLVED | Section-by-section mapping added to this doc (Section 2) |
| 3 | Redundant footer CTA | RESOLVED | `showCTAStrip={false}` on homepage |
| 4 | Preloader-to-Canvas timing | RESOLVED | `onExitStart` callback coordinates both (Section 5.1) |
| 5 | V2 icon in 3D scene | RESOLVED | Keep abstract for v1. Post-launch: geometric echo. |
| 6 | Homepage content files | RESOLVED | All 3 files rewritten with structured frontmatter |
| 7 | Portfolio data source | RESOLVED | `content/portfolio/portfolio-homepage.json` created |
| 8 | Image placeholder design | RESOLVED | Per-card gradient variation array defined |
| 9 | Testimonial content | PENDING OWNER | Placeholder schema ready. Need real quotes. |
| 10 | Testimonials data source | RESOLVED | `content/testimonials.json` created with tag system |
| 11 | Mobile hero text contrast | RESOLVED | Radial gradient overlay, `md:hidden` |
| 12 | Touch interaction for 3D | RESOLVED | Gyroscope + auto-drift fallback specified |
| 13 | Preloader keyboard a11y | RESOLVED | Focus trap + "Skip loading" button + aria-live |
| 14 | Incomplete footer legal links | RESOLVED | All 6 legal links now present in site-config.json (updated by parallel agent) |

---

## 16. Open Questions for the Owner

1. **Portfolio projects:** Which 4 projects should be featured? Need: project name, industry, screenshot.
2. **Testimonials:** 2 client quotes needed. Format: quote text, client name, company.
3. **Client logos:** Are these 6 correct? Dubrovnik Republic Gin, Zadar Tehnika, Tamaris, Riva Consulting, LCL Optika, Cardo.
4. **Hero subtext:** Is "Custom websites, web applications, and AI-powered tools. Built from scratch. No templates." final?
