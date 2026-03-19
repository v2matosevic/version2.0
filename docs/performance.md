# Performance & Accessibility

## Performance Targets

This is a web development studio site. If our own site is slow, nobody will hire us.

### Core Web Vitals

| Metric | Target | What It Measures |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | How fast the main content loads |
| FID/INP (Interaction to Next Paint) | < 200ms | How fast the page responds to interaction |
| CLS (Cumulative Layout Shift) | < 0.1 | How stable the layout is during load |

### Lighthouse Scores

All pages must score **90+** across all categories:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

Pages with heavy 3D/WebGL content (hero, portfolio) may require careful optimization to hit these targets. Profile early and often on these routes.

### Bundle Size

The site uses Three.js/R3F, GSAP, Lenis, and Motion, which add significant bundle weight. Three.js/R3F alone adds ~150-200KB gzipped.

Mitigation strategies:
- **Dynamic imports for 3D scenes** — only load R3F and Three.js on pages that need them (homepage hero, portfolio). Other pages ship zero WebGL code.
- **Tree-shake Three.js** — import only the geometries, materials, and utilities actually used. Never import the full library.
- **Code-split by route** — Next.js does this by default, but verify that heavy libraries are not pulled into shared chunks.
- **Lazy load non-critical animation libraries** — GSAP ScrollTrigger plugins and secondary animation code can load after initial paint.
- No unused CSS in production build (Tailwind purges automatically).

Target per-route JS: < 300KB gzipped for 3D-heavy pages, < 150KB gzipped for content pages (blog, about, legal).

## WebGL Performance

R3F/Three.js scenes must enhance the experience without blocking it.

### Progressive Loading
- Show styled content (text, layout) first. The 3D scene loads and fades in on top.
- Use React Suspense boundaries around Canvas components with meaningful fallbacks (not blank space).
- Preloader doubles as a real asset-loading indicator for the 3D scene.

### Device Adaptation
- **Desktop:** Full 3D experience with particle effects, mouse-reactive scenes, high-fidelity geometry.
- **Mobile:** Lighter 3D — reduce particle counts, simplify geometry, lower resolution. Static fallbacks where GPU cannot handle it.
- **Low-end devices:** Detect via GPU tier (e.g., `detect-gpu` library) and degrade gracefully. Show a static or CSS-animated alternative rather than a janky 3D scene.

### WebGL Error Boundaries

Every `<Canvas>` component is wrapped in a React Error Boundary that catches:
- WebGL context lost events (GPU driver crash, tab backgrounded too long)
- Shader compilation failures (unsupported GPU features)
- GPU out-of-memory errors
- Any uncaught Three.js/R3F exceptions

**Fallback rendering:** When an error boundary catches, it renders a styled static image or CSS gradient that matches the scene's color palette. Never show a blank space, a broken canvas, or a React error screen. The fallback should feel intentional, not broken.

**GPU tier detection:** The `detect-gpu` library (see Device Adaptation above) runs once on mount and stores the GPU tier in React context:
- **Tier 0 (no GPU / software renderer):** Skip `<Canvas>` entirely. Render the static fallback from the start. No WebGL code is even loaded (the dynamic import is conditional).
- **Tier 1–2 (low-end / integrated GPU):** Reduced quality — fewer particles, simpler geometry, lower resolution canvas.
- **Tier 3+ (dedicated GPU):** Full experience with all effects.

The tier check happens before the Canvas mounts, so low-end devices never attempt to initialize WebGL at all.

### Browser Testing
- Safari WebGL requires specific testing. R3F/Three.js can behave differently in WebKit.
- Monitor GPU memory usage — dispose of geometries, materials, and textures when scenes unmount.

## Animation Performance

### GSAP
- Use GPU-accelerated properties only: `transform` (translate, scale, rotate) and `opacity`. Avoid animating `width`, `height`, `top`, `left`, `margin`, or `padding`.
- ScrollTrigger instances must be cleaned up on route change to prevent memory leaks.
- Batch DOM reads and writes to avoid layout thrashing in complex timelines.
- SplitText: wrap text elements only after fonts are loaded (`document.fonts.ready`) to prevent layout recalculation on font swap. Revert splits on unmount to preserve accessibility and SEO (screen readers read the original DOM).

### Lenis (Smooth Scroll)
- Degrades gracefully on low-powered devices. If frame rate drops below threshold, disable smooth scroll and fall back to native scrolling.
- Lighter configuration on mobile (reduced lerp/duration values).
- Does not interfere with native scroll behaviors (form focus, anchor links, accessibility).

### Motion (formerly Framer Motion)
- Page transitions kept under 300ms. Quick crossfade + subtle slide. Near-zero performance cost.
- AnimatePresence for route transitions must not cause CLS.
- Layout animations used sparingly — they trigger layout recalculation.
- Package: `motion`. Import from `motion/react`.

### Reduced Motion
- All animations (GSAP, Motion, Lenis, R3F) respect `prefers-reduced-motion`.
- When reduced motion is active: no scroll animations, no per-character effects, no smooth scroll, static 3D fallback or simplified scene, page transitions reduced to simple crossfade.

## Image Optimization

### Strategy: Build-Time Optimization

With standalone mode on VPS, `next/image` provides native on-demand image optimization (AVIF/WebP, resizing). For content images stored in `content/`, a build-time optimization script handles pre-processing.

**Decision:** A `scripts/optimize-images.ts` script runs Sharp before `next build` as a prebuild step. It processes content images and outputs optimized variants alongside the originals. `next/image` handles runtime optimization for remote images.

**What the script does:**
1. Scans `content/` for image files (JPEG, PNG, WebP)
2. Converts all images to WebP format
3. Generates srcset variants: **600w** (thumbnails/cards), **1200w** (blog featured), **1920w** (hero/full-width)
4. Output alongside originals with suffixes: `-600w.webp`, `-1200w.webp`, `-1920w.webp`
5. Generates an image manifest JSON mapping original paths to optimized variants (consumed by a helper component at build time)

**Rationale:** Pre-optimization ensures consistent image quality at build time. `next/image` handles on-demand optimization for remote/dynamic images. The combination provides the best of both worlds — deterministic build-time results for content images, and runtime optimization for everything else.

**Build script integration:**
```json
{
  "scripts": {
    "prebuild": "tsx scripts/optimize-images.ts",
    "build": "next build"
  }
}
```

npm automatically runs `prebuild` before `build`. No manual chaining needed.

### Format
- WebP as primary format (already most images are WebP)
- JPEG fallback for older browsers if needed
- PNG only for logos and graphics with transparency
- SVG for icons and simple graphics

### Sizing
- Provide multiple sizes for responsive images (srcset)
- Hero images: max 1920px wide
- Blog featured images: max 1200px wide
- Thumbnails/cards: max 600px wide
- Client logos: max 200px wide

### Lazy Loading
- All images below the fold: `loading="lazy"`
- Hero images and above-fold content: `loading="eager"` or `priority` prop

## Font Loading

- Use `next/font` for zero-layout-shift font loading
- Self-host (no Google Fonts CDN)
- Subset to needed character sets (Latin + Latin Extended for Croatian)
- `display: swap` to prevent invisible text during load

## CSS

- Tailwind CSS handles purging unused styles in production
- No custom CSS files unless absolutely necessary
- Inline critical CSS (Next.js handles this automatically)

## Accessibility

### Targets
- WCAG 2.1 Level AA compliance
- Lighthouse Accessibility score 90+

### Requirements
- Semantic HTML (proper heading hierarchy, landmarks, lists)
- All images have descriptive alt text
- Color contrast ratios meet AA standards (4.5:1 for normal text, 3:1 for large)
- Keyboard navigation works for all interactive elements
- Focus indicators visible on all focusable elements
- Skip-to-content link for screen readers
- Form inputs have associated labels
- Error messages are announced to screen readers
- Language attributes on HTML element and language-specific content
- `prefers-reduced-motion` respected for all animations (see Animation Performance section above)

### Testing
- Lighthouse accessibility audit on every page
- Manual keyboard navigation test
- Screen reader test on key flows (navigation, contact form, pricing tool)
