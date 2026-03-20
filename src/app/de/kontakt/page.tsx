import type { Metadata } from 'next'
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { JsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { ContactForm } from '@/components/shared/contact-form'
import { BookingWidget } from '@/components/booking/booking-widget'

export const metadata: Metadata = buildPageMetadata({
  title: 'Kontakt',
  description: 'Kontaktieren Sie Version2. Lassen Sie uns über Ihr nächstes Webprojekt sprechen.',
  routeKey: 'contact',
})

export default function DeContactPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Kontakt', url: `${SITE_URL}/de/kontakt/` },
      ]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Kontakt — Version2',
        description: 'Kontaktieren Sie Version2. Lassen Sie uns über Ihr nächstes Webprojekt sprechen.',
        url: `${SITE_URL}/de/kontakt/`,
        mainEntity: { '@id': `${SITE_URL}/#business` },
      }} />
      <PageHero
        headline="Haben Sie ein Projekt? Eine Frage? Eine Idee?"
        subtext="Wir antworten innerhalb von 24 Stunden. Meistens schneller."
      />
      <ContentSection background="raised" heading="Senden Sie uns eine Nachricht" id="contact-form">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">
          <ContactForm lang="de" />
          <div className="flex flex-col gap-6 lg:pt-20">
            <a href="mailto:info@version2.hr" className="flex items-start gap-3 hover:opacity-80 transition-opacity">
              <Mail size={20} className="text-brand-red shrink-0 mt-0.5" />
              <span className="text-foreground">info@version2.hr</span>
            </a>
            <a href="tel:+385995617706" className="flex items-start gap-3 hover:opacity-80 transition-opacity">
              <Phone size={20} className="text-brand-red shrink-0 mt-0.5" />
              <span className="text-foreground">+385 99 561 7706</span>
            </a>
            <a href="https://wa.me/385995617706" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:opacity-80 transition-opacity">
              <MessageCircle size={20} className="text-brand-red shrink-0 mt-0.5" />
              <span className="text-foreground">WhatsApp Nachricht senden</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-brand-red shrink-0 mt-0.5" />
              <span className="text-muted">Novigradska 21, 23000 Zadar, Kroatien</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-brand-red shrink-0 mt-0.5" />
              <span className="text-muted">Mo-Fr, 08:00-16:00 MEZ</span>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection background="base">
        <BookingWidget lang="de" />
      </ContentSection>
    </main>
  )
}
