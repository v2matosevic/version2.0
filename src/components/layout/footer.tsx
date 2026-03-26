import Link from 'next/link'
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import type { Language } from '@/types/i18n'

type FooterProps = {
  lang: Language
  showCTA?: boolean
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="mb-5 uppercase text-brand-red font-body"
        style={{
          fontSize: 'var(--text-overline)',
          fontWeight: 'var(--font-weight-body-semibold)',
          letterSpacing: 'var(--tracking-overline)',
        } as React.CSSProperties}
      >
        {heading}
      </h3>
      {children}
    </div>
  )
}

function FooterNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block py-1.5 text-muted hover:text-foreground transition-colors font-body text-sm"
      style={{ transitionDuration: 'var(--duration-fast)' }}
    >
      {children}
    </Link>
  )
}

function FooterContactLink({ href, icon: Icon, children, external }: {
  href: string
  icon: typeof Mail
  children: React.ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-2.5 text-sm text-muted hover:text-foreground transition-colors"
      style={{ transitionDuration: 'var(--duration-fast)' }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Icon size={14} className="text-faint shrink-0" />
      {children}
    </a>
  )
}

function Footer({ lang, showCTA = true }: FooterProps) {
  const contactHref = lang === 'hr' ? '/hr/kontakt/' : lang === 'de' ? '/de/kontakt/' : '/contact/'

  return (
    <footer className="relative">
      {/* CTA strip */}
      {showCTA && (
        <div
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--color-sunken) 0%, var(--color-base) 50%, var(--color-sunken) 100%)',
          }}
        >
          {/* Red atmospheric glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 70% 50%, rgba(153,23,23,0.06) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />
          {/* Subtle grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />
          <Container>
            <div className="py-16 md:py-20 lg:py-24 flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
              <div className="max-w-lg">
                <h2
                  className="font-heading text-foreground"
                  style={{
                    fontSize: 'var(--text-h2)',
                    fontWeight: 'var(--font-weight-headline)',
                    lineHeight: 'var(--leading-tight)',
                    letterSpacing: 'var(--tracking-h2)',
                  } as React.CSSProperties}
                >
                  {lang === 'hr' ? 'Imate projekt? Razgovarajmo.' : lang === 'de' ? 'Haben Sie ein Projekt? Lassen Sie uns reden.' : 'Have a project? Let\u2019s talk.'}
                </h2>
                <p
                  className="mt-3 text-muted"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
                >
                  {lang === 'hr' ? 'Besplatna konzultacija. Bez obveza.' : lang === 'de' ? 'Kostenlose Beratung. Unverbindlich.' : 'Free consultation. No strings attached.'}
                </p>
              </div>
              <Link href={contactHref} className="shrink-0">
                <Button variant="primary" size="lg">
                  {lang === 'hr' ? 'Započnite projekt' : lang === 'de' ? 'Projekt starten' : 'Start a Project'}
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      )}

      {/* Gradient border transition */}
      <div
        className="h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--color-line) 20%, var(--color-brand-red) 50%, var(--color-line) 80%, transparent 100%)',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      {/* Main footer */}
      <div
        className="relative"
        style={{ background: 'var(--color-sunken)' }}
      >
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <Container>
          <div className="relative py-14 md:py-18 lg:py-24">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
              <FooterColumn heading={lang === 'hr' ? 'Usluge' : lang === 'de' ? 'Dienstleistungen' : 'Services'}>
                <FooterNavLink href={lang === 'hr' ? '/hr/usluge/web-dizajn/' : lang === 'de' ? '/de/dienstleistungen/web-design/' : '/services/web-design/'}>Web Design</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/usluge/web-aplikacije/' : lang === 'de' ? '/de/dienstleistungen/web-anwendungen/' : '/services/web-applications/'}>{lang === 'hr' ? 'Web Aplikacije' : lang === 'de' ? 'Web-Anwendungen' : 'Web Applications'}</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/usluge/e-trgovina/' : lang === 'de' ? '/de/dienstleistungen/e-commerce/' : '/services/e-commerce/'}>{lang === 'hr' ? 'E-Trgovina' : 'E-Commerce'}</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/usluge/ai-integracija/' : lang === 'de' ? '/de/dienstleistungen/ki-integration/' : '/services/ai-integration/'}>{lang === 'hr' ? 'AI Integracija' : lang === 'de' ? 'KI-Integration' : 'AI Integration'}</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/usluge/seo/' : lang === 'de' ? '/de/dienstleistungen/seo/' : '/services/seo/'}>SEO</FooterNavLink>
              </FooterColumn>

              <FooterColumn heading={lang === 'hr' ? 'Tvrtka' : lang === 'de' ? 'Unternehmen' : 'Company'}>
                <FooterNavLink href={lang === 'hr' ? '/hr/o-nama/' : lang === 'de' ? '/de/uber-uns/' : '/about/'}>{lang === 'hr' ? 'O Nama' : lang === 'de' ? 'Über Uns' : 'About'}</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/portfolio/' : lang === 'de' ? '/de/portfolio/' : '/portfolio/'}>Portfolio</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/blog/' : lang === 'de' ? '/de/blog/' : '/blog/'}>Blog</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/karijera/' : lang === 'de' ? '/de/karriere/' : '/career/'}>{lang === 'hr' ? 'Karijera' : lang === 'de' ? 'Karriere' : 'Career'}</FooterNavLink>
              </FooterColumn>

              <FooterColumn heading={lang === 'hr' ? 'Pravno' : lang === 'de' ? 'Rechtliches' : 'Legal'}>
                <FooterNavLink href={lang === 'hr' ? '/hr/pravna-obavijest/' : lang === 'de' ? '/de/impressum/' : '/legal-notice/'}>{lang === 'hr' ? 'Pravna Obavijest' : lang === 'de' ? 'Impressum' : 'Legal Notice'}</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/politika-privatnosti/' : lang === 'de' ? '/de/datenschutz/' : '/privacy-policy/'}>{lang === 'hr' ? 'Politika Privatnosti' : lang === 'de' ? 'Datenschutz' : 'Privacy Policy'}</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/kolacici/' : lang === 'de' ? '/de/cookies/' : '/cookies/'}>{lang === 'hr' ? 'Kolačići' : 'Cookies'}</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/uvjeti-koristenja/' : lang === 'de' ? '/de/nutzungsbedingungen/' : '/terms-and-conditions/'}>{lang === 'hr' ? 'Uvjeti Korištenja' : lang === 'de' ? 'Nutzungsbedingungen' : 'Terms & Conditions'}</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/politika-povrata/' : lang === 'de' ? '/de/widerrufsrecht/' : '/refund-policy/'}>{lang === 'hr' ? 'Politika Povrata' : lang === 'de' ? 'Widerrufsrecht' : 'Refund Policy'}</FooterNavLink>
                <FooterNavLink href={lang === 'hr' ? '/hr/izjava-o-pristupacnosti/' : lang === 'de' ? '/de/barrierefreiheit/' : '/accessibility/'}>{lang === 'hr' ? 'Pristupačnost' : lang === 'de' ? 'Barrierefreiheit' : 'Accessibility'}</FooterNavLink>
              </FooterColumn>

              <FooterColumn heading={lang === 'hr' ? 'Kontakt' : 'Contact'}>
                <div className="flex flex-col gap-3.5">
                  <FooterContactLink href="mailto:info@version2.hr" icon={Mail}>
                    info@version2.hr
                  </FooterContactLink>
                  <FooterContactLink href="tel:+385995617706" icon={Phone}>
                    +385 99 561 7706
                  </FooterContactLink>
                  <FooterContactLink href="https://wa.me/385995617706" icon={MessageCircle} external>
                    {lang === 'hr' ? 'Pošaljite poruku' : lang === 'de' ? 'Nachricht senden' : 'Send a message'}
                  </FooterContactLink>
                  <span className="flex items-center gap-2.5 text-sm text-faint">
                    <MapPin size={14} className="shrink-0" />
                    Novigradska 21, 23000 Zadar
                  </span>
                </div>
              </FooterColumn>
            </div>

            {/* Copyright bar */}
            <div
              className="mt-12 pt-8"
              style={{
                borderTop: '1px solid color-mix(in srgb, var(--color-line) 40%, transparent)',
              } as React.CSSProperties}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-faint">
                  &copy; {new Date().getFullYear()} Version2 j.d.o.o.
                </p>
                <p className="text-sm text-faint" style={{ opacity: 0.6 }}>
                  {lang === 'hr' ? 'Izrađeno s preciznošću u Zadru.' : lang === 'de' ? 'Mit Präzision in Zadar gefertigt.' : 'Crafted with precision in Zadar.'}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export { Footer }
export type { FooterProps }
