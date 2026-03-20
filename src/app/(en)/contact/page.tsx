import type { Metadata } from 'next'
import { Mail, Phone, MessageCircle, MapPin, Clock, ExternalLink } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { JsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { ContactForm } from '@/components/shared/contact-form'
import { BookingWidget } from '@/components/booking/booking-widget'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact',
  description: "Get in touch with Version2. Let's discuss your next web project.",
  routeKey: 'contact',
})

type ContactInfoItem = {
  icon: LucideIcon
  label: string
  href?: string
  accent: boolean
  external?: boolean
}

const CONTACT_INFO: ContactInfoItem[] = [
  { icon: Mail, label: 'info@version2.hr', href: 'mailto:info@version2.hr', accent: true },
  { icon: Phone, label: '+385 99 561 7706', href: 'tel:+385995617706', accent: true },
  { icon: MessageCircle, label: 'Send a WhatsApp', href: 'https://wa.me/385995617706', accent: true, external: true },
  { icon: MapPin, label: 'Novigradska 21, 23000 Zadar, Croatia', accent: false },
  { icon: Clock, label: 'Mon-Fri, 08:00-16:00 CET', accent: false },
]

export default function ContactPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Contact', url: `${SITE_URL}/contact/` },
      ]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Version2',
        description: "Get in touch with Version2. Let's discuss your next web project.",
        url: `${SITE_URL}/contact/`,
        mainEntity: { '@id': `${SITE_URL}/#business` },
      }} />
      <PageHero
        headline="Got a project? Got a question? Got an idea?"
        subtext="We respond within 24 hours. Usually faster."
      />

      <ScrollReveal>
      <ContentSection background="raised" heading="Send Us a Message" id="contact-form">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">
          <ContactForm lang="en" />

          <div className="flex flex-col gap-6 lg:pt-20">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-3">
                  <Icon size={20} className="text-brand-red shrink-0 mt-0.5" />
                  <span
                    className={item.accent ? 'text-foreground' : 'text-muted'}
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    {item.label}
                  </span>
                </div>
              )

              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hover:opacity-80 transition-opacity"
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {content}
                  </a>
                )
              }

              return <div key={item.label}>{content}</div>
            })}
          </div>
        </div>
      </ContentSection>
      </ScrollReveal>

      <ScrollReveal>
      <ContentSection background="base">
        <BookingWidget lang="en" />
      </ContentSection>
      </ScrollReveal>

      <ScrollReveal>
      <section className="py-16 md:py-24 bg-sunken">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            {/* Map visual */}
            <div
              className="relative overflow-hidden rounded-xl border border-line-subtle"
              style={{ aspectRatio: '4 / 3' }}
            >
              {/* Layered gradient simulating a dark map */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #1a1917 0%, #1e1d1a 30%, #22201d 50%, #1a1917 80%, #151412 100%)',
                }}
              />
              {/* Grid lines suggesting cartography */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              {/* Subtle radial glow for the pin location */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 55% 45%, rgba(153, 23, 23, 0.15) 0%, transparent 50%)',
                }}
              />
              {/* Adriatic coast suggestion — organic shape */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  background: 'linear-gradient(200deg, transparent 40%, rgba(100, 160, 200, 0.6) 55%, transparent 70%)',
                }}
              />
              {/* Map pin indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-4 animate-ping rounded-full bg-brand-red/10" style={{ animationDuration: '3s' }} />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-brand-red/30 bg-brand-red/10 backdrop-blur-sm">
                      <MapPin size={22} className="text-brand-red" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div
                    className="rounded-md bg-base/80 px-3 py-1.5 backdrop-blur-sm border border-line-subtle/50"
                  >
                    <p className="text-foreground text-sm font-body" style={{ fontWeight: 'var(--font-weight-body-semibold)' } as React.CSSProperties}>
                      Zadar, Croatia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address info */}
            <div className="flex flex-col gap-6 lg:pl-8">
              <p
                className="mb-1 uppercase text-muted font-body"
                style={{
                  fontSize: 'var(--text-overline)',
                  fontWeight: 'var(--font-weight-body-semibold)',
                  letterSpacing: 'var(--tracking-overline)',
                } as React.CSSProperties}
              >
                Our Location
              </p>
              <h2
                className="font-heading text-foreground"
                style={{
                  fontSize: 'var(--text-h3)',
                  fontWeight: 'var(--font-weight-headline)',
                  lineHeight: 'var(--leading-tight)',
                } as React.CSSProperties}
              >
                Zadar, Croatia
              </h2>
              <p
                className="text-muted max-w-md"
                style={{
                  fontSize: 'var(--text-body-lg)',
                  lineHeight: 'var(--leading-body)',
                }}
              >
                On the Adriatic coast. European quality, competitive pricing. Same timezone as Berlin, Paris, and Rome.
              </p>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-red shrink-0 mt-1" />
                <address className="text-foreground not-italic" style={{ fontSize: 'var(--text-body)' }}>
                  Novigradska 21<br />
                  23000 Zadar, Croatia
                </address>
              </div>
              <a
                href="https://maps.google.com/?q=Novigradska+21,+Zadar,+Croatia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-red hover:text-brand-red-light transition-colors"
                style={{ fontSize: 'var(--text-body)' }}
              >
                Open in Google Maps
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </main>
  )
}
