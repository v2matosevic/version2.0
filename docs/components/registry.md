# Component Registry

> Complete registry of all components with file paths, usage locations, and key props.
> For detailed specs, see individual component files in this directory and [../pages/](../pages/).

| Component | File Path | Used On | Key Props |
|-----------|-----------|---------|-----------|
| `<Header />` | `src/components/layout/header.tsx` | All pages | -- |
| `<DesktopMenu />` | `src/components/layout/desktop-menu.tsx` | All pages (lg+) | `isOpen`, `onClose` |
| `<MobileMenu />` | `src/components/layout/mobile-menu.tsx` | All pages (<lg) | `isOpen`, `onClose` |
| `<Footer />` | `src/components/layout/footer.tsx` | All pages | -- |
| `<PageTransition />` | `src/components/layout/page-transition.tsx` | Root layout | `children` |
| `<Preloader />` | `src/components/layout/preloader.tsx` | Homepage only | `onComplete` |
| `<FAB />` | `src/components/layout/fab.tsx` | All pages | -- |
| `<CookieConsent />` | `src/components/layout/cookie-consent.tsx` | All pages (conditional) | -- |
| `<CustomCursor />` | `src/components/layout/custom-cursor.tsx` | All pages (desktop) | -- |
| `<HeroScene />` | `src/components/scenes/hero-scene.tsx` | Homepage | `onReady` |
| `<HeroContent />` | `src/components/home/hero-content.tsx` | Homepage | -- |
| `<ServicesTeaser />` | `src/components/home/services-teaser.tsx` | Homepage | -- |
| `<PortfolioHighlights />` | `src/components/home/portfolio-highlights.tsx` | Homepage | `projects[]` |
| `<ClientLogos />` | `src/components/home/client-logos.tsx`, also About | Homepage, About | `count?: number` |
| `<Differentiators />` | `src/components/home/differentiators.tsx` | Homepage | -- |
| `<Testimonials />` | `src/components/shared/testimonials.tsx` | Homepage, Case Study, Service Detail | `testimonials[]` |
| `<CTASection />` | `src/components/shared/cta-section.tsx` | All pages | `heading`, `subtext`, `ctaLabel`, `ctaHref`, `variant?: 'default' \| 'compact'` |
| `<Section />` | `src/components/shared/section.tsx` | All pages | `variant: 'dark' \| 'light' \| 'neutral'`, `id?`, `className?`, `noGrain?`, `padding?: 'default' \| 'reduced' \| 'none'` |
| `<Container />` | `src/components/shared/container.tsx` | All pages | `max?: 'default' \| 'narrow' \| 'wide'` (`default`=7xl, `narrow`=4xl, `wide`=full) |
| `<Button />` | `src/components/ui/button.tsx` | All pages | `variant: 'primary' \| 'secondary' \| 'ghost'`, `size: 'sm' \| 'md' \| 'lg'`, `loading?`, `disabled?`, `icon?` |
| `<Badge />` | `src/components/ui/badge.tsx` | Blog, Pricing, Service, Career | `variant?: 'default' \| 'brand'`, `children` |
| `<Input />` | `src/components/ui/input.tsx` | Contact, Career, Analysis, Booking | Standard input props + `error?` |
| `<Textarea />` | `src/components/ui/textarea.tsx` | Contact, Career, Analysis, Booking | Standard textarea props + `error?` |
| `<Accordion />` | `src/components/shared/accordion.tsx` | Service FAQ, Pricing customizer | `items[]`, `singleExpand?` |
| `<StepIndicator />` | `src/components/pricing/step-indicator.tsx` | Pricing | `steps: number`, `current: number`, `labels?: string[]` |
| `<BlogSearch />` | `src/components/blog/blog-search.tsx` | Blog Listing, Blog Post | `compact?: boolean` |
| `<BlogPostCard />` | `src/components/blog/blog-post-card.tsx` | Blog Listing, Related Posts | `post: BlogPostMeta` |
| `<PortfolioCard />` | `src/components/portfolio/portfolio-card.tsx` | Homepage, Portfolio, Case Study | `project` |
| `<Breadcrumbs />` | `src/components/shared/breadcrumbs.tsx` | Service Detail, Blog Post, Legal, Case Study | `items: { label: string, href?: string }[]` |
| `<ScrollReveal />` | `src/components/shared/scroll-reveal.tsx` | Wrapper component | `children`, `delay?`, `stagger?`, `direction?: 'up' \| 'left'` |
| `<LegalPageTemplate />` | `src/components/pages/legal-template.tsx` | All 6 legal pages | `title`, `lastUpdated`, `content` |
| `<PricingWizard />` | `src/components/pricing/pricing-wizard.tsx` | Pricing page | -- |
| `<SkipToContent />` | `src/components/layout/skip-to-content.tsx` | Root layout | -- |
| `<AIChatPanel />` | `src/components/features/ai-chat-panel.tsx` | All pages (via FAB) | `isOpen`, `onClose` |
| `<LanguageSwitcher />` | `src/components/shared/language-switcher.tsx` | Menu (desktop + mobile) | `current: Language` |
| `<Modal />` | `src/components/ui/modal.tsx` | Various | `isOpen`, `onClose`, `title?`, `children` |
| `<Tabs />` | `src/components/ui/tabs.tsx` | Various | `items[]`, `activeIndex`, `onChange` |
| `<Select />` | `src/components/ui/select.tsx` | Forms | Standard select props + `error?` |
| `<Card />` | `src/components/ui/card.tsx` | Various | `variant?: 'default' \| 'elevated' \| 'bordered' \| 'interactive'`, `children` |

## Related Files
- [layout.md](layout.md) — Layout components (Header, Footer, Menu, PageTransition)
- [sections.md](sections.md) — Page section components (Hero, Services Teaser, etc.)
- [features.md](features.md) — Feature components (FAB, AI Chat, Pricing Tool, etc.)
- [ui-primitives.md](ui-primitives.md) — UI primitive components (Button, Card, Input, etc.)
- [../pages/_globals.md](../pages/_globals.md) — Detailed visual specs for global components
