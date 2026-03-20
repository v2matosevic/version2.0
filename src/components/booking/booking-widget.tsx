'use client'

import { useState, useEffect } from 'react'
import { DateGrid } from './date-grid'
import { TimeSlotSelector } from './time-slot-selector'
import { BookingFormFields } from './booking-form-fields'
import { BookingSuccess } from './booking-success'
import { BOOKING_LABELS } from './booking-labels'
import { useBookingSubmit } from './use-booking-submit'
import type { AvailableSlot } from '@/lib/booking-availability'

type BookingWidgetProps = {
  lang: string
}

function BookingWidget({ lang }: BookingWidgetProps) {
  const t = BOOKING_LABELS[lang as keyof typeof BOOKING_LABELS] ?? BOOKING_LABELS.en
  const [slots, setSlots] = useState<AvailableSlot[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [contactMethod, setContactMethod] = useState<string>('email')
  const [loading, setLoading] = useState(true)

  const { status, errorMessage, icsUrl, handleSubmit, setError } = useBookingSubmit(
    selectedDate, selectedTime, contactMethod, lang, t,
  )

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
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(t.error)
      })
  }, [t.error, setError])

  if (loading) {
    return (
      <div className="py-8 text-center text-muted">
        <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-line border-t-brand-red" />
        {t.loading}
      </div>
    )
  }

  if (status === 'success') {
    return <BookingSuccess labels={t} icsUrl={icsUrl} />
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
      <p className="mb-8 text-muted" style={{ fontSize: 'var(--text-body)' }}>{t.subtext}</p>

      {status === 'error' && errorMessage && (
        <div className="mb-6 rounded-lg border border-red-800/30 bg-red-900/10 p-4 text-red-400">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="sr-only" aria-hidden="true">
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
          <BookingFormFields
            labels={t}
            contactMethod={contactMethod}
            onContactMethodChange={setContactMethod}
            isSending={status === 'sending'}
          />
        )}
      </form>
    </div>
  )
}

export { BookingWidget }
