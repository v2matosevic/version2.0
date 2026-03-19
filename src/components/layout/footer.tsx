import Link from 'next/link'
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'

const SERVICES_LINKS = [
  { label: 'Web Design', href: '/services/web-design/' },
  { label: 'Web Applications', href: '/services/web-applications/' },
  { label: 'E-Commerce', href: '/services/e-commerce/' },
  { label: 'AI Integration', href: '/services/ai-integration/' },
  { label: 'SEO', href: '/services/seo/' },
] as const

const COMPANY_LINKS = [
  { label: 'About', href: '/about/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Career', href: '/career/' },
] as const

const LEGAL_LINKS = [
  { label: 'Legal Notice', href: '/legal-notice/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Cookies', href: '/cookies/' },
  { label: 'Terms & Conditions', href: '/terms/' },
  { label: 'Refund Policy', href: '/refund-policy/' },
  { label: 'Accessibility', href: '/accessibility/' },
] as const

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="mb-4 text-xs uppercase text-muted font-body"
        style={{ fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
      >
        {heading}
      </h3>
      {children}
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block py-1.5 text-faint hover:text-foreground transition-colors font-body">
      {children}
    </Link>
  )
}

function Footer() {
  return (
    <footer className="bg-sunken border-t border-line">
      <Container>
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FooterColumn heading="Services">
              {SERVICES_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn heading="Company">
              {COMPANY_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn heading="Legal">
              {LEGAL_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn heading="Contact">
              <div className="flex flex-col gap-3">
                <a href="mailto:info@version2.hr" className="flex items-center gap-2 text-sm text-faint hover:text-foreground transition-colors">
                  <Mail size={16} /> info@version2.hr
                </a>
                <a href="tel:+385995617706" className="flex items-center gap-2 text-sm text-faint hover:text-foreground transition-colors">
                  <Phone size={16} /> +385 99 561 7706
                </a>
                <a href="https://wa.me/385995617706" className="flex items-center gap-2 text-sm text-faint hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} /> Send a message
                </a>
                <span className="flex items-center gap-2 text-sm text-faint">
                  <MapPin size={16} /> Novigradska 21, 23000 Zadar
                </span>
              </div>
            </FooterColumn>
          </div>

          <div className="mt-8 pt-6 border-t border-line-subtle">
            <p className="text-sm text-faint">
              &copy; 2024 Version2 j.d.o.o. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export { Footer }
