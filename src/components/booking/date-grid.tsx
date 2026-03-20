'use client'

import type { AvailableSlot } from '@/lib/booking-availability'

type DateGridProps = {
  slots: AvailableSlot[]
  selectedDate: string | null
  onSelectDate: (date: string) => void
  lang: string
}

const DAY_NAMES: Record<string, string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hr: ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
  de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
}

const MONTH_NAMES: Record<string, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  hr: ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'],
  de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
}

function DateGrid({ slots, selectedDate, onSelectDate, lang }: DateGridProps) {
  const days = DAY_NAMES[lang] ?? DAY_NAMES.en
  const months = MONTH_NAMES[lang] ?? MONTH_NAMES.en

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      {slots.map((slot) => {
        const date = new Date(slot.date + 'T12:00:00Z')
        const dayName = days[date.getUTCDay()]
        const monthName = months[date.getUTCMonth()]
        const dayNum = date.getUTCDate()
        const hasAvailable = slot.times.some((t) => t.available)
        const isSelected = selectedDate === slot.date

        return (
          <button
            key={slot.date}
            type="button"
            onClick={() => hasAvailable && onSelectDate(slot.date)}
            disabled={!hasAvailable}
            className={[
              'rounded-lg border p-3 text-center transition-all',
              hasAvailable ? 'cursor-pointer hover:border-brand-red/50' : 'cursor-not-allowed opacity-40',
              isSelected
                ? 'border-brand-red bg-brand-red/10 text-foreground'
                : 'border-line bg-sunken text-muted',
            ].join(' ')}
          >
            <div className="text-xs uppercase tracking-wide">{dayName}</div>
            <div className="mt-1 text-lg font-semibold text-foreground">{dayNum}</div>
            <div className="text-xs">{monthName}</div>
          </button>
        )
      })}
    </div>
  )
}

export { DateGrid }
