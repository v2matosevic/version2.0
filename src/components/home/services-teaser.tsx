import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { StaggerReveal } from '@/components/animations'

type ServiceTeaserItem = {
  name: string
  description: string
  href: string
}

type ServicesTeaserProps = {
  services: ServiceTeaserItem[]
}

function ServicesTeaser({ services }: ServicesTeaserProps) {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-base">
      <Container>
        <h2 className="sr-only">Services</h2>
        <StaggerReveal stagger={0.1}>
          {services.map((service, index) => (
            <Link
              key={service.href}
              href={service.href}
              className="group relative block py-8 md:py-10 transition-colors"
              style={{
                borderBottom: index < services.length - 1
                  ? '1px solid var(--color-line-subtle)'
                  : 'none',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="max-w-lg">
                  <h3
                    className="font-heading text-foreground group-hover:text-brand-red transition-colors"
                    style={{
                      fontSize: 'var(--text-h2)',
                      fontWeight: 'var(--font-weight-headline)',
                      lineHeight: 'var(--leading-tight)',
                      letterSpacing: 'var(--tracking-h2)',
                      transitionDuration: 'var(--duration-normal)',
                    } as React.CSSProperties}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="mt-2 text-muted"
                    style={{
                      fontSize: 'var(--text-body-lg)',
                      lineHeight: 'var(--leading-body)',
                    } as React.CSSProperties}
                  >
                    {service.description}
                  </p>
                </div>
                <ArrowRight
                  size={24}
                  className="hidden md:block text-faint group-hover:text-brand-red group-hover:translate-x-1 transition-all shrink-0 ml-8"
                  style={{ transitionDuration: 'var(--duration-normal)' } as React.CSSProperties}
                />
              </div>
            </Link>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  )
}

export { ServicesTeaser }
export type { ServicesTeaserProps, ServiceTeaserItem }
