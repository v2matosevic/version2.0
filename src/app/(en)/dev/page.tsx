'use client'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { useTheme } from '@/lib/utils/use-theme'

const COLOR_SWATCHES = [
  { name: 'brand-red', css: 'bg-brand-red' },
  { name: 'brand-red-light', css: 'bg-brand-red-light' },
  { name: 'brand-red-dark', css: 'bg-brand-red-dark' },
  { name: 'base', css: 'bg-base' },
  { name: 'raised', css: 'bg-raised' },
  { name: 'sunken', css: 'bg-sunken' },
  { name: 'foreground', css: 'bg-foreground' },
  { name: 'muted', css: 'bg-muted' },
  { name: 'faint', css: 'bg-faint' },
  { name: 'line', css: 'bg-line' },
  { name: 'line-subtle', css: 'bg-line-subtle' },
] as const

const TYPE_LEVELS = [
  { name: 'Display', cssVar: '--text-display', leading: '--leading-display', tracking: '--tracking-display', font: 'heading', text: 'Display Text' },
  { name: 'H1', cssVar: '--text-h1', leading: '--leading-display', tracking: '--tracking-h1', font: 'heading', text: 'Heading Level 1' },
  { name: 'H2', cssVar: '--text-h2', leading: '--leading-tight', tracking: '--tracking-h2', font: 'heading', text: 'Heading Level 2' },
  { name: 'H3', cssVar: '--text-h3', leading: '--leading-tight', tracking: '--tracking-heading', font: 'heading', text: 'Heading Level 3' },
  { name: 'H4', cssVar: '--text-h4', leading: '--leading-snug', tracking: '--tracking-heading', font: 'heading-bold', text: 'Heading Level 4' },
  { name: 'Body Large', cssVar: '--text-body-lg', leading: '--leading-body', tracking: '--tracking-body', font: 'body', text: 'Body large text example for lead paragraphs.' },
  { name: 'Body', cssVar: '--text-body', leading: '--leading-body', tracking: '--tracking-body', font: 'body', text: 'Body text example — the default reading size. Supports Croatian diacritics: č, ć, š, ž, đ.' },
  { name: 'Small', cssVar: '--text-small', leading: '1.5', tracking: '--tracking-body', font: 'body', text: 'Small text for captions and metadata.' },
  { name: 'Overline', cssVar: '--text-overline', leading: '1.5', tracking: '--tracking-overline', font: 'body-semibold', text: 'OVERLINE LABEL TEXT' },
] as const

function DevKitchenSink() {
  const { theme } = useTheme()

  return (
    <main id="main-content" className="flex-1">
      {/* Header */}
      <Section background="sunken">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h1
              className="font-heading text-foreground"
              style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-h1)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
            >
              Design System
            </h1>
            <div className="flex items-center gap-4">
              <Badge>{theme} mode</Badge>
              <ThemeToggle />
            </div>
          </div>
          <p className="text-muted">Kitchen sink — all tokens and primitives.</p>
        </Container>
      </Section>

      {/* Colors */}
      <Section>
        <Container>
          <h2
            className="font-heading text-foreground mb-8"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
          >
            Colors
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {COLOR_SWATCHES.map((swatch) => (
              <div key={swatch.name} className="flex flex-col gap-2">
                <div className={`w-full h-20 rounded-lg border border-line ${swatch.css}`} />
                <span className="text-sm text-muted font-body">{swatch.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Typography */}
      <Section background="raised">
        <Container>
          <h2
            className="font-heading text-foreground mb-8"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
          >
            Typography
          </h2>
          <div className="flex flex-col gap-8">
            {TYPE_LEVELS.map((level) => (
              <div key={level.name} className="flex flex-col gap-1">
                <span
                  className="text-xs uppercase text-muted font-body"
                  style={{ letterSpacing: 'var(--tracking-overline)', fontWeight: 'var(--font-weight-body-semibold)' } as React.CSSProperties}
                >
                  {level.name}
                </span>
                <span
                  className={level.font.startsWith('heading') ? 'font-heading text-foreground' : 'font-body text-foreground'}
                  style={{
                    fontSize: `var(${level.cssVar})`,
                    lineHeight: level.leading.startsWith('--') ? `var(${level.leading})` : level.leading,
                    letterSpacing: level.tracking.startsWith('--') ? `var(${level.tracking})` : level.tracking,
                    fontWeight: level.font === 'heading-bold'
                      ? 'var(--font-weight-headline-bold)'
                      : level.font === 'heading'
                        ? 'var(--font-weight-headline)'
                        : level.font === 'body-semibold'
                          ? 'var(--font-weight-body-semibold)'
                          : 'var(--font-weight-body)',
                  } as React.CSSProperties}
                >
                  {level.text}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section>
        <Container>
          <h2
            className="font-heading text-foreground mb-8"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
          >
            Buttons
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm text-muted mb-3 uppercase" style={{ letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}>Variants</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-muted mb-3 uppercase" style={{ letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}>Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-muted mb-3 uppercase" style={{ letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}>States</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Badges */}
      <Section background="raised">
        <Container>
          <h2
            className="font-heading text-foreground mb-8"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
          >
            Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge>Web Design</Badge>
            <Badge>SEO</Badge>
            <Badge>E-Commerce</Badge>
          </div>
        </Container>
      </Section>

      {/* Form Inputs */}
      <Section>
        <Container>
          <h2
            className="font-heading text-foreground mb-8"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
          >
            Form Inputs
          </h2>
          <div className="max-w-md flex flex-col gap-6">
            <Input label="Name" placeholder="Enter your name" />
            <Input label="Email" type="email" placeholder="name@example.com" hint="We will never share your email." />
            <Input label="With Error" error="This field is required." />
            <Textarea label="Message" placeholder="Tell us about your project..." />
          </div>
        </Container>
      </Section>

      {/* Section Backgrounds */}
      <Section background="sunken">
        <Container>
          <h2
            className="font-heading text-foreground mb-4"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
          >
            Section: Sunken
          </h2>
          <p className="text-muted">bg-sunken background for inset areas and heroes.</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2
            className="font-heading text-foreground mb-4"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
          >
            Section: Base
          </h2>
          <p className="text-muted">bg-base background — the default.</p>
        </Container>
      </Section>

      <Section background="raised">
        <Container>
          <h2
            className="font-heading text-foreground mb-4"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
          >
            Section: Raised
          </h2>
          <p className="text-muted">bg-raised background for elevated content.</p>
        </Container>
      </Section>
    </main>
  )
}

export { DevKitchenSink as default }
