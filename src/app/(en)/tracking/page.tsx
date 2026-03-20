import type { Metadata } from 'next'
import { Suspense } from 'react'
import { buildPageMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { TrackingPageContent } from '@/components/tracking/tracking-page-content'

export const metadata: Metadata = buildPageMetadata({
  title: 'Track Your Package',
  description: 'Track your delivery status in real time.',
  routeKey: 'tracking',
})

export default function TrackingPage() {
  return (
    <main id="main-content" className="flex-1">
      <section className="py-16 md:py-24 lg:py-32">
        <Container>
          <Suspense fallback={<div className="text-center text-muted">Loading...</div>}>
            <TrackingPageContent lang="en" />
          </Suspense>
        </Container>
      </section>
    </main>
  )
}
