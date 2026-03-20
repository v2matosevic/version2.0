'use client'

import { useState, useEffect } from 'react'
import { DateGrid } from './date-grid'
import { TimeSlotSelector } from './time-slot-selector'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { AvailableSlot } from '@/lib/booking-availability'

type BookingWidgetProps = {
  lang: string
}

type BookingStatus = 'idle' | 'loading' | 'sending' | 'success' | 'error'

const LABELS = {
  en: {
    heading: 'Book a Free Consultation',
    subtext: 'Wednesday–Friday, 14:00–17:00 CET. 30-minute call.',
    name: 'Name',
    email: 'Email',
    contactMethod: 'Preferred Contact',
    description: 'What would you like to discuss?',
    submit: 'Book Consultation',
    sending: 'Booking...',
    successTitle: 'Booking Confirmed!',
    successText: 'Check your email for confirmation and calendar invite.',
    downloadIcs: 'Add to Calendar',
    error: 'Something went wrong. Please try again.',
    slotTaken: 'This slot is no longer available. Please pick another.',
    loading: 'Loading available times...',
    methods: { email: 'Email', whatsapp: 'WhatsApp', phone: 'Phone' },
  },
  hr: {
    heading: 'Rezervirajte besplatnu konzultaciju',
    subtext: 'Srijeda–petak, 14:00–17:00. Poziv od 30 minuta.',
    name: 'Ime',
    email: 'Email',
    contactMethod: 'Preferirani kontakt',
    description: 'O čemu biste htjeli razgovarati?',
    submit: 'Rezerviraj',
    sending: 'Rezerviram...',
    successTitle: 'Rezervacija potvrđena!',
    successText: 'Provjerite email za potvrdu i pozivnicu za kalendar.',
    downloadIcs: 'Dodaj u kalendar',
    error: 'Nešto je pošlo po krivu. Pokušajte ponovno.',
    slotTaken: 'Ovaj termin više nije dostupan. Odaberite drugi.',
    loading: 'Učitavanje dostupnih termina...',
    methods: { email: 'Email', whatsapp: 'WhatsApp', phone: 'Telefon' },
  },
  de: {
    heading: 'Buchen Sie eine kostenlose Beratung',
    subtext: 'Mittwoch–Freitag, 14:00–17:00 MEZ. 30-Minuten-Gespräch.',
    name: 'Name',
    email: 'E-Mail',
    contactMethod: 'Bevorzugter Kontakt',
    description: 'Worüber möchten Sie sprechen?',
    submit: 'Beratung buchen',
    sending: 'Wird gebucht...',
    successTitle: 'Buchung bestätigt!',
    successText: 'Prüfen Sie Ihre E-Mail für die Bestätigung und Kalendereinladung.',
    downloadIcs: 'Zum Kalender hinzufügen',
    error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    slotTaken: 'Dieser Termin ist nicht mehr verfügbar. Bitte wählen Sie einen anderen.',
    loading: 'Verfügbare Zeiten werden geladen...',
    methods: { email: 'E-Mail', whatsapp: 'WhatsApp', phone: 'Telefon' },
  },
} as const

const CONTACT_METHODS = ['email', 'whatsapp', 'phone'] as const

function BookingWidget({ lang }: BookingWidgetProps) {
  const t = LABELS[lang as keyof typeof LABELS] ?? LABELS.en
  const [slots, setSlots] = useState<AvailableSlot[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [contactMethod, setContactMethod] = useState<string>('email')
  const [status, setStatus] = useState<BookingStatus>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [icsUrl, setIcsUrl] = useState<string | null>(null)

  useEffect(() => {
    const today = new Date()
    const from = new Date(today)
    from.setDate(from.getDate() + 2)
    const to = new Date(today)
    to.setDate(to.getDate() + 14)

    const fromStr = from.toISOString().split('T')[0]
    const toStr = to.toISOString().split('T')[0]

    fetch(`/api/booking/slots/?from=${fromStr}&to=${toStr}`)
      .then((res) => res.json())
      .then((data: { slots: AvailableSlot[] }) => {
        setSlots(data.slots)
        setStatus('idle')
      })
      .catch(() => {
        setStatus('error')
        setErrorMessage(t.error)
      })
  }, [t.error])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedDate || !selectedTime) return

    setStatus('sending')
    setErrorMessage('')

    const formData = new FormData(event.currentTarget)

    const body = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      date: selectedDate,
      time: selectedTime,
      contactMethod,
      description: (formData.get('description') as string) || undefined,
      _honey: (formData.get('_honey') as string) ?? '',
      language: lang,
    }

    try {
      const response = await fetch('/api/booking/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setStatus('success')
        setIcsUrl(result.icsUrl)
      } else if (response.status === 409) {
        setStatus('error')
        setErrorMessage(t.slotTaken)
      } else {
        setStatus('error')
        setErrorMessage(t.error)
      }
    } catch {
      setStatus('error')
      setErrorMessage(t.error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="py-8 text-center text-muted">
        <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-line border-t-brand-red" />
        {t.loading}
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-800/30 bg-green-900/10 p-8 text-center">
        <h3 className="mb-2 text-lg font-semibold text-foreground">{t.successTitle}</h3>
        <p className="mb-6 text-muted">{t.successText}</p>
        {icsUrl && (
          <a
            href={icsUrl}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-light"
          >
            {t.downloadIcs}
          </a>
        )}
      </div>
    )
  }

  const selectedSlot = slots.find((s) => s.date === selectedDate)

  return (
    <div id="book-a-call">
      <h3
        className="mb-2 font-heading text-foreground"
        style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
      >
        {t.heading}
      </h3>
      <p className="mb-8 text-muted" style={{ fontSize: 'var(--text-body)' }}>
        {t.subtext}
      </p>

      {status === 'error' && errorMessage && (
        <div className="mb-6 rounded-lg border border-red-800/30 bg-red-900/10 p-4 text-red-400">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="absolute left-[-9999px] opacity-0 h-0 pointer-events-none" aria-hidden="true">
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
        </div>

        <DateGrid
          slots={slots}
          selectedDate={selectedDate}
          onSelectDate={(date) => { setSelectedDate(date); setSelectedTime(null) }}
          lang={lang}
        />

        {selectedSlot && (
          <TimeSlotSelector
            slots={selectedSlot.times}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
            lang={lang}
          />
        )}

        {selectedDate && selectedTime && (
          <div className="flex flex-col gap-6">
            <Input name="name" label={t.name} required minLength={2} maxLength={100} disabled={status === 'sending'} />
            <Input name="email" type="email" label={t.email} required maxLength={254} disabled={status === 'sending'} />

            <div>
              <p className="mb-2 text-sm font-medium text-foreground">{t.contactMethod}</p>
              <div className="flex gap-3">
                {CONTACT_METHODS.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setContactMethod(method)}
                    className={[
                      'rounded-lg border px-4 py-2 text-sm transition-all',
                      contactMethod === method
                        ? 'border-brand-red bg-brand-red/10 text-foreground'
                        : 'border-line bg-sunken text-muted hover:border-brand-red/50',
                    ].join(' ')}
                  >
                    {t.methods[method]}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              name="description"
              label={t.description}
              rows={3}
              maxLength={5000}
              disabled={status === 'sending'}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={status === 'sending'}
              className="w-full sm:w-auto"
            >
              {status === 'sending' ? t.sending : t.submit}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export { BookingWidget }
