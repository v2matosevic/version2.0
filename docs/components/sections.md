# Page Section Components

> Source of truth: `docs/brand-discovery.md`. Design tokens: [../design/](../design/). Page-level specs: [../pages/](../pages/).

---

### Preloader
V2 icon assembling from particles into final shape. Canvas-based 2D particle animation (not R3F — the preloader runs while 3D assets load). ~100 particles, each a 2px dot. Doubles as real asset-loading indicator for the 3D scene. The first brand moment.
- **Scope:** Homepage only. Other pages do not show the preloader (they use standard page transitions).
- **Minimum display:** 800ms (prevents flash on fast connections).
- **Dismiss trigger:** 3D scene Canvas reports readiness via callback. Auto-dismisses after 4s timeout if scene never loads (falls back to static hero).
- **Repeat visits:** Shows once per fresh page load (full page refresh or direct URL entry to homepage). Does NOT show on client-side navigation back to homepage. Tracked via `sessionStorage` key `v2_preloader_shown` — set to `"true"` after first display. Cleared automatically when the browser tab/session ends.

### 3D Hero
The hero IS the portfolio piece. Code-built R3F scene, not image-based. "We build what others can't." in massive Display-scale Albert Sans 300.

#### Camera
- Perspective projection, FOV 50.
- Position: `[0, 0, 8]`, lookAt: `[0, 0, 0]` (center).

#### Lighting
- **Key light:** Warm white with slight red tint. Position `[5, 5, 5]`, intensity `0.6`.
- **Fill light:** Cool tone. Position `[-3, -2, 4]`, intensity `0.3`.
- **Ambient light:** Intensity `0.15`. No pulsing or animation on any light.

#### Geometry
- 3 wireframe polyhedra: icosahedron, octahedron, dodecahedron.
- Spread across the scene at offset positions (not clustered at center).
- Slow continuous rotation (different axis per shape for visual variety).
- Material: `MeshStandardMaterial`, `wireframe: true`, color `var(--color-muted)`, `opacity: 0.3`, `transparent: true`.

#### Particles
- **Desktop (GPU tier 3+):** 300-500 point particles.
- **Mobile / low-end (GPU tier 1-2):** 150 particles.
- Material: `PointsMaterial`, size `1.5px`, color `var(--color-faint)`.
- Animation: gentle drift (sinusoidal position offset over time).
- Mouse interaction: particles within proximity radius experience subtle attraction toward cursor. Lerp factor `0.02` (barely perceptible, not snappy).

#### Mouse Interaction
- Camera parallax: mouse position normalized from `-1` to `1` (both axes).
- Camera offset: `±0.3` units on X and Y from base position.
- Smoothing: `lerp` in `useFrame` (factor ~0.05) for buttery response.

#### Post-Processing
- **Bloom:** intensity `0.3`, threshold `0.8`, radius `0.4`.
- **Vignette:** offset `0.3`, darkness `0.6`.
- **No DOF.** No film grain. Keep it clean.

#### Fallback (No WebGL)
- If WebGL unsupported or GPU tier 0 (detected via `detect-gpu`): render a CSS gradient background.
- Gradient: `radial-gradient(ellipse at center, #1c1c1c 0%, #0c0c0c 70%)`.
- Same text overlay rendered on top (hero text is always HTML, not part of the canvas).

#### Performance Tiers (detect-gpu)
| GPU Tier | Behavior |
|----------|----------|
| Tier 0 (no GPU / unsupported) | No 3D canvas. CSS gradient fallback only. |
| Tier 1-2 (low-mid) | Canvas renders. 150 particles. No wireframe geometry. No antialiasing. DPR capped at 1. |
| Tier 3+ (high) | Full scene: 300-500 particles, 3 wireframe polyhedra, antialiasing enabled. DPR capped at 2. |

#### Progressive Loading
1. Text + CSS gradient background render immediately (SSR/static HTML).
2. R3F Canvas loaded via `next/dynamic` with `ssr: false` — does NOT block initial paint.
3. Canvas fades in over 1s (`opacity: 0` to `1`) when the scene signals readiness.
4. Preloader covers the transition on homepage (see Preloader spec).

#### Reduced Motion
- When `prefers-reduced-motion: reduce` is active: skip 3D entirely. Show CSS gradient fallback with static text. No canvas loaded.

### Services Teaser
3-4 bold typographic statements: "Websites." "Web Apps." "E-Commerce." "AI." Each on its own line, Albert Sans 300 at H2 scale. One-line Manrope description below each. Staggered scroll entrance (100ms delay between items). Each links to its individual service page. Layout: left-aligned, generous vertical spacing (gap-12 or more). NOT a card grid. NOT icons. The typography IS the design element.

### Portfolio Highlights
3-4 best projects. Hover interactions, large type, inline previews.
Links to full case study pages.

### Client Logos
4-5 recognizable brand logos. Understated presentation. Desaturated/grayscale with color
on hover. No "Trusted by" label.

### Differentiators
In-house. Custom-built. Ships fast. Enterprise integrations.
Visual section with animation/illustration. NOT a bullet list.

### CTA Section
Direct. "Let's build something." Links to contact or pricing.
Reusable across pages. Variants: `default` (full section padding, H2 heading) and `compact` (reduced padding `py-12 md:py-16`, H3 heading — used at end of blog posts).

### Testimonials
Clean, minimal. Quote + client name + company. No star ratings. No photos required.
Placed on: homepage (1-2), portfolio case studies (per-project), service pages (relevant quotes).

## Related Files
- [layout.md](layout.md) — Layout components (Header, Footer, Menu, PageTransition)
- [features.md](features.md) — Feature components (FAB, AI Chat, Pricing Tool, etc.)
- [ui-primitives.md](ui-primitives.md) — UI primitive components (Button, Card, Input, etc.)
- [registry.md](registry.md) — Complete component registry with file paths and props
- [../pages/_globals.md](../pages/_globals.md) — Detailed visual specs for global components
