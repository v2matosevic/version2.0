/* ============================================================
   Design Tokens — TypeScript definitions
   CSS custom properties are the source of truth (globals.css).
   These constants provide type-safe references for JS contexts.
   ============================================================ */

export const COLORS = {
  brand: {
    red: '#991717',
    redLight: '#cc2323',
    redDark: '#7a1212',
  },
  dark: {
    base: '#141414',
    raised: '#1c1c1c',
    sunken: '#0c0c0c',
    foreground: '#F0E8E0',
    muted: '#9A918A',
    faint: '#6A625C',
    line: '#2a2a2a',
    lineSubtle: '#1f1f1f',
  },
  light: {
    base: '#F5F0EB',
    raised: '#FFFFFF',
    sunken: '#EDE8E3',
    foreground: '#1A1714',
    muted: '#6B635C',
    faint: '#8A8380',
    line: '#DDD5CC',
    lineSubtle: '#E8E2DB',
  },
} as const

export const TYPOGRAPHY = {
  scale: {
    display: 'clamp(3rem, 5vw + 1rem, 5.5rem)',
    h1: 'clamp(2.5rem, 4vw + 0.5rem, 4rem)',
    h2: 'clamp(2rem, 3vw + 0.5rem, 3rem)',
    h3: 'clamp(1.5rem, 1.5vw + 0.5rem, 2rem)',
    h4: 'clamp(1.25rem, 0.5vw + 1rem, 1.5rem)',
    bodyLg: '1.25rem',
    body: '1rem',
    bodyProse: '1.125rem',
    small: '0.875rem',
    overline: '0.75rem',
  },
  leading: {
    display: 1.1,
    tight: 1.2,
    snug: 1.3,
    body: 1.6,
    prose: 1.75,
  },
  tracking: {
    display: '-0.03em',
    h1: '-0.025em',
    h2: '-0.02em',
    heading: '-0.01em',
    body: '0',
    overline: '0.1em',
  },
} as const

export const SPACING = {
  sectionPadding: {
    mobile: '4rem',
    tablet: '6rem',
    desktop: '8rem',
  },
  containerMaxWidth: '1280px',
  contentMaxWidth: '768px',
  gridGap: '1.5rem',
} as const

export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    page: 200,
  },
  easing: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    inOut: 'cubic-bezier(0.76, 0, 0.24, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  gsap: {
    out: 'power3.out',
    inOut: 'power2.inOut',
    smooth: 'power1.out',
  },
  stagger: {
    character: 0.03,
    word: 0.08,
    element: 0.1,
    section: 0.15,
  },
  scrollReveal: {
    y: 40,
    duration: 0.8,
    ease: 'power2.out',
    start: 'top 85%',
  },
} as const

export const Z_INDEX = {
  base: 0,
  raised: 10,
  canvas: 20,
  header: 30,
  fab: 40,
  menu: 50,
  chat: 55,
  modal: 60,
  cookie: 70,
  cursor: 80,
  preloader: 100,
} as const

export const SHADOWS = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
  md: '0 4px 12px rgba(0, 0, 0, 0.3)',
  lg: '0 8px 30px rgba(0, 0, 0, 0.4)',
  glow: '0 0 20px rgba(153, 23, 23, 0.3)',
} as const
