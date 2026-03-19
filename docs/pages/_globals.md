# Global Persistent Components

> These components wrap or overlay every page. For ARIA specs and behavioral details, see [../components/layout.md](../components/layout.md).
> Design tokens referenced here are defined in [../design/](../design/).

## G1. Header

| Property | Specification |
|----------|---------------|
| **Element** | `<header>`, `position: fixed`, `top: 0`, `left: 0`, `width: 100%` |
| **Z-index** | `var(--z-header)` = 30 |
| **Height** | 64px mobile, 72px desktop |
| **Inner layout** | Container. `flex items-center justify-between` |
| **Left** | V2 logo. SVG. Height 28px mobile, 32px desktop. `<a>` to homepage (language-aware: `/`, `/hr/`, `/de/`). |
| **Right (desktop lg+)** | Text links: "Portfolio" \| "Pricing" \| "Contact". MR400, Body size, `text-foreground`. `gap-8` between links. Hover: `text-brand-red`, transition 150ms `ease-smooth`. After links: Menu toggle button (Lucide `Menu` icon, 24px). `gap-6` between last link and toggle. |
| **Right (mobile <lg)** | Menu toggle button only (Lucide `Menu`, 24px). No text links. |
| **State 1 -- Transparent** | `background: transparent`. Active when viewport is within hero section (scrollY < hero height). Logo and links in `text-foreground`. |
| **State 2 -- Solid** | `background: var(--color-base)/90` + `backdrop-filter: blur(8px)`. Active when scrolled past hero. `border-bottom: 1px solid var(--color-line-subtle)`. |
| **State 3 -- Hidden on scroll down** | `transform: translateY(-100%)`. Triggered when `scrollDirection === 'down'` AND `scrollY > heroHeight`. Transition 200ms `ease-out`. |
| **State 4 -- Revealed on scroll up** | `transform: translateY(0)`. Triggered when `scrollDirection === 'up'`. Transition 200ms `ease-out`. |
| **Background transition** | 300ms `ease-smooth`. |
| **ARIA** | Menu toggle: `<button aria-expanded="true\|false" aria-controls="menu-panel">`. Enter/Space to toggle. |
| **Component** | `<Header />` |

## G2. Desktop Menu (Sidebar Panel)

| Property | Specification |
|----------|---------------|
| **Trigger** | Header menu toggle button |
| **Width** | 400px. Slides in from right edge of viewport. |
| **Height** | 100vh. `position: fixed`, `top: 0`, `right: 0`. |
| **Z-index** | `var(--z-menu)` = 50 |
| **Background** | `bg-sunken` (`#0c0c0c`). V2 icon SVG watermark centered, `opacity: 0.03`, `width: 60%`, `pointer-events: none`. |
| **Backdrop** | `position: fixed`, full viewport, `background: rgba(0,0,0,0.5)`, z-index 49 (behind panel). Click to close. |
| **Entry animation** | Panel: `translateX(100%)` to `translateX(0)`, 400ms, `ease-out`. Backdrop: opacity 0 to 1, 300ms. |
| **Exit animation** | Panel: `translateX(0)` to `translateX(100%)`, 300ms, `ease-in`. Backdrop: opacity 1 to 0, 200ms. |
| **Close triggers** | X button (Lucide `X`, 24px, top-right of panel, 24px from edges). Escape key. Backdrop click. |
| **Content order (top to bottom)** | (1) Close button. (2) Navigation links. (3) Social links. (4) Contact info. (5) Language switcher. (6) Theme toggle. |
| **Nav links** | AS300, H3 scale (`clamp(1.5rem, 1.5vw + 0.5rem, 2rem)`). Vertical stack, `gap-2`. Items: Home, Services (collapsible sub-menu with 5 service links at Body size), Portfolio, Pricing, About, Analysis, Blog, Career, Contact. Each link `py-2` for touch. |
| **Nav link hover** | Per-character color shift from `text-foreground` to `text-brand-red`, 30ms stagger between characters. GSAP `SplitText` on hover enter, reverse on hover leave. |
| **Services sub-menu** | Chevron rotates 180deg on expand. Child links indented `pl-6`. AS300, Body size, `text-muted`, hover `text-foreground`. Height animation 200ms `ease-out`. |
| **Social links** | Horizontal row. Lucide icons: Facebook, Instagram, X, TikTok. 20px. `text-faint`, hover `text-foreground`. `gap-4`. |
| **Contact info** | Email: `info@version2.hr`. Phone: `+385 99 561 7706`. MR400, Small size, `text-muted`. Clickable `mailto:` / `tel:`. |
| **Language switcher** | EN / HR / DE. `role="radiogroup"`, `aria-label="Language"`. Each: `role="radio"`, `aria-checked`. Active: `text-foreground bg-raised rounded-md px-2 py-1`. Inactive: `text-faint`. |
| **Theme toggle** | Sun/moon icon button. 20px. `text-muted`, hover `text-foreground`. Toggles `html.light` class. Persists to `localStorage.v2_theme`. |
| **Padding** | `p-8` inner padding. |
| **ARIA** | Panel: `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"`. Focus trap: Tab cycles within panel only. On open, focus moves to first nav link. On close via Escape, focus returns to menu toggle button. |
| **Component** | `<DesktopMenu />` |

## G3. Mobile Menu (Full-Screen Overlay)

| Property | Specification |
|----------|---------------|
| **Breakpoint** | Replaces Desktop Menu below `lg` (1024px) |
| **Dimensions** | `100vw x 100vh`. `position: fixed`, `inset: 0`. |
| **Z-index** | `var(--z-menu)` = 50 |
| **Background** | `bg-sunken` |
| **Entry animation** | Fade in: opacity 0 to 1, 300ms. Content slides up: `translateY(20px)` to `translateY(0)`, 300ms, `ease-out`. |
| **Nav links** | AS300, H2 scale. Vertical stack, centered. `gap-3`. |
| **Touch targets** | Minimum 44x44px on all interactive elements. |
| **Scroll** | `overflow-y: auto` if content overflows (Services sub-menu can add height). |
| **Safe areas** | `padding-bottom: env(safe-area-inset-bottom)` for home indicator devices. |
| **All other content** | Same as Desktop Menu (social, contact, language, theme). |
| **ARIA** | Same as Desktop Menu. |
| **Component** | `<MobileMenu />` |

## G4. Floating Action Button (FAB)

| Property | Specification |
|----------|---------------|
| **Position** | `position: fixed`, `bottom: 24px`, `right: 24px` |
| **Z-index** | `var(--z-fab)` = 40 |
| **Size** | 56px circle |
| **Style** | `bg-brand-red`. Icon: Lucide `Plus` (collapsed) / `X` (expanded), 24px, white. |
| **Shadow** | `var(--shadow-md)` at rest. `var(--shadow-glow)` on hover. |
| **Hidden during** | Preloader (z-index 100 covers it). Also hidden on mobile when menu is open. |
| **Expand behavior** | On click, 3 action buttons fan upward with 60px vertical spacing. Entry: stagger 50ms between buttons, each `scale(0) opacity(0)` to `scale(1) opacity(1)`, 200ms, `ease-bounce`. |
| **Action 1 (bottom)** | Contact. Lucide `Mail`, 20px. White icon on `bg-raised` circle (44px). Links to contact page (language-aware). |
| **Action 2 (middle)** | WhatsApp. Lucide `MessageCircle`, 20px. White icon on `bg-raised` circle (44px). Links to `https://wa.me/385995617706`. |
| **Action 3 (top)** | AI Chat. Lucide `Bot`, 20px. White icon on `bg-raised` circle (44px). Opens `<AIChatPanel />`. |
| **Action button hover** | `bg-brand-red` background, `shadow-glow`. 150ms. |
| **Collapse triggers** | Click outside expanded actions. Escape key. Click FAB trigger again. |
| **ARIA** | Trigger: `aria-expanded`, `aria-haspopup="true"`. Escape closes and returns focus to trigger. Tab cycles through action buttons when expanded. |
| **Reduced motion** | Actions appear instantly (no scale/stagger). |
| **Component** | `<FAB />` |

## G5. Cookie Consent Banner

| Property | Specification |
|----------|---------------|
| **Position** | `position: fixed`, `bottom: 0`, `left: 0`, `width: 100%` |
| **Z-index** | `var(--z-cookie)` = 70 |
| **Background** | `bg-raised`. `border-top: 1px solid var(--color-line)`. `shadow-lg`. |
| **Layout** | Container. Desktop: `flex items-center justify-between gap-4`. Text left, buttons right. Mobile: `flex-col gap-3`, everything stacked, buttons full-width. |
| **Padding** | `py-4 px-4 sm:px-6 lg:px-8` |
| **Text** | "We use cookies for analytics to improve your experience." MR400, Body size, `text-foreground`. |
| **Buttons** | (1) "Accept All" -- Button primary, sm size. (2) "Decline" -- Button ghost, sm size. (3) "Customize" -- text link, MR400, Small size, `text-muted`, `underline`. |
| **Customize panel** | Expands inline below the main bar. Toggle switches: "Analytics" (off by default, toggleable) and "Functional" (always on, no toggle, just label "Always active"). Each: label + switch. |
| **Toggle switch style** | Track: 40x20px, `bg-line`, border-radius full. Active: `bg-brand-red`. Thumb: 16px white circle. |
| **Storage** | `localStorage` key `v2_cookie_consent`. Value: `{ version: 1, analytics: boolean, timestamp: "ISO-8601" }`. |
| **Re-consent** | If stored version < code version, re-display. Footer "Cookie Settings" link re-opens. |
| **Show condition** | On first visit (no stored consent). Hidden after any choice. |
| **ARIA** | `role="dialog"`, `aria-label="Cookie preferences"`. Focus trap when Customize panel expanded. Tab cycles buttons/toggles. Enter/Space activates. |
| **Component** | `<CookieConsent />` |

## G6. Page Transitions

| Property | Specification |
|----------|---------------|
| **Library** | Motion (`motion/react`). `<AnimatePresence>` wrapping `{children}` in root layout. |
| **Trigger** | Route change via `usePathname()`. |
| **Exit** | `opacity: 1 -> 0`, `translateY: 0 -> -8px`. Duration 150ms. Ease: `ease-in`. |
| **Enter** | `opacity: 0 -> 1`, `translateY: 16px -> 0`. Duration 200ms. Ease: `ease-out`. |
| **Total** | Under 300ms combined. |
| **Z-index** | Below Header (30), above Footer during transition. |
| **Reduced motion** | Instant swap. No translate, no fade. Simple CSS display change. |
| **Scope** | Header and Footer do NOT animate on navigation. Only page content. |
| **Component** | `<PageTransition />` wrapping `{children}` in `src/app/layout.tsx`. |

## G7. Footer

| Property | Specification |
|----------|---------------|
| **Background** | `bg-sunken` (`#0c0c0c`). `border-top: 1px solid var(--color-line)`. |
| **Optional CTA strip** | Above main footer. `bg-base`. `py-8`. Text: "Have a project? Let's talk." (AS300, H3 scale, `text-foreground`, centered). Button: "Start a Project" primary, md. Links to `/contact/`. |
| **Layout** | Container. 4-column CSS grid on desktop: `grid-template-columns: repeat(4, 1fr)`, `gap-8`. |
| **Column 1: Services** | Heading: "Services" (MR600, Small, uppercase, `tracking-overline`, `text-muted`, `mb-4`). Links: Web Design, Web Applications, E-Commerce, AI Integration, SEO. Each link: MR400, Body, `text-faint`. Hover: `text-foreground`. `py-1.5` per link. |
| **Column 2: Company** | Heading: "Company". Links: About, Portfolio, Blog, Career. Same styling. |
| **Column 3: Legal** | Heading: "Legal". Links: Legal Notice, Privacy Policy, Cookies, Terms & Conditions, Refund Policy, Accessibility. Same styling. Plus: "Cookie Settings" link (re-opens consent banner). |
| **Column 4: Contact** | Email: `info@version2.hr` (Lucide `Mail` 16px + text, `mailto:`). Phone: `+385 99 561 7706` (Lucide `Phone` 16px + text, `tel:`). WhatsApp: "Send a message" (Lucide `MessageCircle` 16px + text, `wa.me`). Address: "Novigradska 21, 23000 Zadar, Croatia" (Lucide `MapPin` 16px + text). Each: MR400, Small, `text-faint`, hover `text-foreground`. `gap-3` between items. Social icons below: Facebook, Instagram, X, TikTok. Lucide icons 20px. `text-faint`, hover `text-foreground`. `gap-4`. Horizontal row. |
| **Language switcher** | Below columns, separated by `border-top: 1px solid var(--color-line-subtle)`, `pt-6`. EN / HR / DE. Same radiogroup spec as menu. |
| **Copyright** | "2024 Version2 j.d.o.o. All rights reserved." MR400, Small, `text-faint`. Bottom of footer. `mt-4`. |
| **Section padding** | `py-12 md:py-16 lg:py-20` (lighter than content sections). |
| **Responsive** | Desktop: 4 columns. Tablet (md): 2x2 grid. Mobile (<md): single column stack, `gap-8` between column groups. CTA strip text/button stacks vertically. |
| **Data source** | `content/site-config.json` -- `navigation.footer.services`, `navigation.footer.company`, `navigation.footer.legal` for links. `contact` object for email/phone/whatsapp. `social` object for social URLs. `business.address` for address. |
| **Component** | `<Footer />` |

## G8. Custom Cursor (Desktop Only)

| Property | Specification |
|----------|---------------|
| **Visibility** | Desktop only. Hidden on touch devices (`@media (pointer: coarse)`). |
| **Z-index** | `var(--z-cursor)` = 80 |
| **Default state** | 8px circle, `border: 1.5px solid var(--color-foreground)`, `background: transparent`. Follows cursor with lerp 0.15 (slight lag for buttery feel). |
| **Hover interactive** | Grows to 40px circle. `background: var(--color-foreground)/10`. `mix-blend-mode: difference`. |
| **Hover link/button** | Grows to 48px. Shows contextual text inside: "View", "Open", etc. MR600, Overline size. |
| **Hover image** | Shrinks to 4px filled dot. |
| **Click** | Momentary scale to 0.8, then back to 1.0. 100ms. |
| **Component** | `<CustomCursor />`, rendered in root layout, outside `<PageTransition />`. |

## Related Files

- [_conventions.md](_conventions.md) -- Notation and shorthand used in specs
- [../components/layout.md](../components/layout.md) -- Component behavior and ARIA details
