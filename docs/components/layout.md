# Layout Components

> Source of truth: `docs/brand-discovery.md`. Design tokens: [../design/](../design/). Page-level specs: [../pages/](../pages/).

---

### Skip to Content
First focusable element in the DOM. Visually hidden (`sr-only`) until focused — on focus, appears as a visible link at top of page. Text: "Skip to main content". Links to `#main-content` (an `id` on the `<main>` element). Styled with `bg-brand-red text-white` for visibility when focused.

### Header
- **Left:** Version2 logo (links to homepage).
- **Right:** Portfolio | Pricing | Contact (text links) + Menu toggle (hamburger icon).
- **Behavior:** Transparent over hero (3D scene goes edge-to-edge) -> solid backdrop on scroll past hero -> hides on scroll down, reappears on scroll up.
- Language switcher lives inside the menu, NOT in the header bar.
- **ARIA/Keyboard:**
  - Menu toggle button: `aria-expanded="true|false"`, `aria-controls="menu-panel"`. Enter/Space to toggle.

### Footer
Content-rich. Not minimal. 4-column CSS grid (lg+), 2 columns (md), stacked (mobile).
- **Column 1 — Services:** Web Design, Web Applications, E-Commerce, AI Integration, SEO (links to respective service pages).
- **Column 2 — Company:** About, Portfolio, Blog, Career (links to respective pages).
- **Column 3 — Legal:** Legal Notice, Privacy Policy, Cookies, Terms, Refund Policy, Accessibility + Cookie Settings button (re-opens consent banner).
- **Column 4 — Contact:** Email (`info@version2.hr`), phone, WhatsApp link, address. Social icons: Facebook, Instagram, X, TikTok. Language switcher (EN / HR / DE).
- **Copyright line** below all columns.
- **Optional CTA strip above:** "Have a project? Let's talk." + "Start a Project" button linking to `/contact/`.

### PageTransition
Wraps page content for enter/exit animations during client-side navigation.
- **Library:** Motion (`motion/react`) — `AnimatePresence` + `motion.div`
- **Animation:** Opacity fade (1 → 0 → 1) + subtle vertical slide. Exit: `translateY(0)` → `translateY(-8px)`, 150ms, ease-in. Enter: `translateY(16px)` → `translateY(0)`, 200ms, ease-out. Combined duration <300ms.
- **Trigger:** Route change detected via Next.js `usePathname()`.
- **Reduced motion:** When `prefers-reduced-motion: reduce` is active, animation reduces to an instant swap (no translate, no fade).
- **Location:** Wraps the `{children}` in the root layout, outside the Header/Footer (those don't animate on navigation).
- **Z-index:** Below Header, above Footer during transition.

### Desktop Menu
Sidebar panel sliding in from the right (NOT full-screen overlay).
- **Width:** 400px on desktop, 100% on mobile (becomes full-screen — see Mobile Menu).
- **Background:** `var(--color-sunken)`. V2 icon watermark centered in background at `opacity: 0.03`.
- **Entry animation:** `translateX(100%)` to `translateX(0)`, duration 400ms, `ease-out`.
- **Exit animation:** reverse (`translateX(0)` to `translateX(100%)`), duration 300ms, `ease-in`.
- **Backdrop:** Semi-transparent overlay `rgba(0,0,0,0.5)` behind the panel. Click backdrop to close.
- **Close triggers:** X button (top-right corner of panel), Escape key, backdrop click.
- **Content (top to bottom):**
  - Large nav links at H3 scale (Albert Sans 300). Home, Services (collapsible submenu with 5 service items), Portfolio, Pricing, About, Analysis, Blog, Career, Contact.
  - Social links row: Facebook, Instagram, TikTok, X.
  - Contact info: email, phone.
  - Language switcher (EN / HR / DE).
  - Theme toggle (sun/moon icon).
- **Nav link hover:** Per-character color shift to `var(--color-brand-red)`, 30ms stagger between characters.
- **ARIA/Keyboard:**
  - Menu toggle button: `aria-expanded="true|false"`, `aria-controls="menu-panel"`. Enter/Space to toggle.
  - Menu panel: `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"`.
  - Focus trap: Tab cycles through panel links and controls only. Focus moves to first link on open.
  - Escape key closes the panel and returns focus to the menu toggle button.

### Mobile Menu
Full-screen overlay. Same content as desktop menu, adapted for touch.
- **Dimensions:** `100vw` x `100vh` (full viewport).
- **Entry animation:** Fade in (`opacity: 0` to `1`, 300ms) + content slides up (`translateY(20px)` to `0`).
- **Touch targets:** Minimum 44x44px for all interactive elements.
- **Nav links:** H2 scale (larger than desktop for comfortable touch).
- **Scroll:** Content scrolls if it overflows (Services submenu can add height). `overflow-y: auto`.
- **Safe areas:** `padding-bottom: env(safe-area-inset-bottom)` for devices with home indicators.
- **ARIA/Keyboard:** Same as Desktop Menu — `role="dialog"`, `aria-modal="true"`, focus trap, Escape to close.

## Related Files
- [sections.md](sections.md) — Page section components (Hero, Services Teaser, etc.)
- [features.md](features.md) — Feature components (FAB, AI Chat, Pricing Tool, etc.)
- [ui-primitives.md](ui-primitives.md) — UI primitive components (Button, Card, Input, etc.)
- [registry.md](registry.md) — Complete component registry with file paths and props
- [../pages/_globals.md](../pages/_globals.md) — Detailed visual specs for global components
