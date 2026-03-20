'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Package, Truck, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { TrackingStatus, TrackingEvent } from '@/lib/scrapers/types'

type TrackingPageContentProps = {
  lang: string
}

const LABELS = {
  en: {
    heading: 'Track Your Package',
    subtext: 'Enter your tracking number to see the status of your delivery.',
    placeholder: 'Enter tracking number',
    search: 'Track',
    searching: 'Tracking...',
    notFound: 'Tracking number not found. Please check the number and try again.',
    error: 'Something went wrong. Please try again.',
    carrier: 'Carrier',
    status: 'Current Status',
    events: 'Tracking History',
    stages: {
      info_received: 'Info Received',
      in_transit: 'In Transit',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      exception: 'Exception',
    },
  },
  hr: {
    heading: 'Pratite svoju pošiljku',
    subtext: 'Unesite broj za praćenje kako biste vidjeli status vaše dostave.',
    placeholder: 'Unesite broj za praćenje',
    search: 'Prati',
    searching: 'Tražim...',
    notFound: 'Broj za praćenje nije pronađen. Molimo provjerite broj.',
    error: 'Nešto je pošlo po krivu. Pokušajte ponovno.',
    carrier: 'Dostavljač',
    status: 'Trenutni status',
    events: 'Povijest praćenja',
    stages: {
      info_received: 'Informacije primljene',
      in_transit: 'U tranzitu',
      out_for_delivery: 'Na isporuci',
      delivered: 'Dostavljeno',
      exception: 'Iznimka',
    },
  },
  de: {
    heading: 'Sendung verfolgen',
    subtext: 'Geben Sie Ihre Sendungsnummer ein, um den Lieferstatus zu sehen.',
    placeholder: 'Sendungsnummer eingeben',
    search: 'Verfolgen',
    searching: 'Wird verfolgt...',
    notFound: 'Sendungsnummer nicht gefunden. Bitte überprüfen Sie die Nummer.',
    error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    carrier: 'Zustelldienst',
    status: 'Aktueller Status',
    events: 'Sendungsverlauf',
    stages: {
      info_received: 'Informationen erhalten',
      in_transit: 'Unterwegs',
      out_for_delivery: 'Zustellung',
      delivered: 'Zugestellt',
      exception: 'Ausnahme',
    },
  },
} as const

const CARRIER_NAMES: Record<string, string> = {
  'hrvatska-posta': 'Hrvatska Pošta',
  'gls': 'GLS',
  'dpd': 'DPD',
}

const STATUS_ORDER: TrackingStatus[] = ['info_received', 'in_transit', 'out_for_delivery', 'delivered']

type TrackingData = {
  trackingNumber: string
  carrier: string
  customerName: string
  currentStatus: string
  events: TrackingEvent[]
}

function StatusProgressBar({ currentStatus, lang }: { currentStatus: string; lang: string }) {
  const t = LABELS[lang as keyof typeof LABELS] ?? LABELS.en
  const currentIndex = STATUS_ORDER.indexOf(currentStatus as TrackingStatus)
  const isException = currentStatus === 'exception'
  const icons = [Package, Truck, MapPin, CheckCircle]

  return (
    <div className="flex items-center justify-between gap-2">
      {STATUS_ORDER.map((stage, index) => {
        const Icon = icons[index]
        const isActive = index <= currentIndex && !isException
        const isCurrent = index === currentIndex && !isException
        return (
          <div key={stage} className="flex flex-col items-center flex-1">
            <div
              className={[
                'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                isException && index === currentIndex
                  ? 'border-red-500 bg-red-500/10 text-red-500'
                  : isActive
                    ? 'border-brand-red bg-brand-red/10 text-brand-red'
                    : 'border-line bg-sunken text-faint',
                isCurrent ? 'ring-2 ring-brand-red/30' : '',
              ].join(' ')}
            >
              {isException && index === currentIndex ? <AlertCircle size={18} /> : <Icon size={18} />}
            </div>
            <span className={`mt-2 text-xs text-center ${isActive ? 'text-foreground' : 'text-faint'}`}>
              {t.stages[stage]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function TrackingPageContent({ lang }: TrackingPageContentProps) {
  const t = LABELS[lang as keyof typeof LABELS] ?? LABELS.en
  const searchParams = useSearchParams()
  const [trackingNumber, setTrackingNumber] = useState(searchParams?.get('q') ?? '')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'not_found'>('idle')
  const [data, setData] = useState<TrackingData | null>(null)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!trackingNumber.trim()) return

    setStatus('loading')

    try {
      const response = await fetch(`/api/tracking/${encodeURIComponent(trackingNumber.trim())}/`)
      const result = await response.json()

      if (response.ok) {
        setData(result)
        setStatus('success')
      } else if (response.status === 404) {
        setStatus('not_found')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1
        className="mb-3 font-heading text-foreground"
        style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)' } as React.CSSProperties}
      >
        {t.heading}
      </h1>
      <p className="mb-8 text-muted" style={{ fontSize: 'var(--text-body-lg)' }}>
        {t.subtext}
      </p>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <div className="flex-1">
          <Input
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder={t.placeholder}
            disabled={status === 'loading'}
          />
        </div>
        <Button type="submit" variant="primary" size="md" loading={status === 'loading'}>
          <Search size={16} className="mr-2" />
          {status === 'loading' ? t.searching : t.search}
        </Button>
      </form>

      {status === 'not_found' && (
        <div className="rounded-lg border border-yellow-800/30 bg-yellow-900/10 p-4 text-yellow-400">
          {t.notFound}
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-lg border border-red-800/30 bg-red-900/10 p-4 text-red-400">
          {t.error}
        </div>
      )}

      {status === 'success' && data && (
        <div className="flex flex-col gap-8">
          <div className="rounded-xl border border-line bg-raised p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted">{t.carrier}</span>
                <p className="text-foreground font-medium">{CARRIER_NAMES[data.carrier] ?? data.carrier}</p>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wide text-muted">{t.status}</span>
                <p className="text-foreground font-medium">{t.stages[data.currentStatus as TrackingStatus] ?? data.currentStatus}</p>
              </div>
            </div>

            <StatusProgressBar currentStatus={data.currentStatus} lang={lang} />
          </div>

          {data.events.length > 0 && (
            <div>
              <h2 className="mb-4 text-sm uppercase tracking-wide text-muted font-medium">{t.events}</h2>
              <div className="flex flex-col gap-4">
                {data.events.map((event, i) => (
                  <div
                    key={i}
                    className="flex gap-4 pl-4 border-l-2 border-line"
                  >
                    <div className="flex-1">
                      <p className="text-foreground text-sm">{event.description}</p>
                      <p className="text-xs text-muted mt-1">
                        {event.location && <span>{event.location} — </span>}
                        {event.eventTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { TrackingPageContent }
