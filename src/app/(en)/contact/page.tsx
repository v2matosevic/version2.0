import type { Metadata } from 'next'
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
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
    </main>
  )
}
