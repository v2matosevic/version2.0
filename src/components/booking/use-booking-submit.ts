import { useState } from 'react'
import type { BookingLabels } from './booking-labels'

type BookingSubmitState = {
  status: 'idle' | 'sending' | 'success' | 'error'
  errorMessage: string
  icsUrl: string | null
}

type BookingSubmitActions = BookingSubmitState & {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  setError: (message: string) => void
}

function useBookingSubmit(
  selectedDate: string | null,
  selectedTime: string | null,
  contactMethod: string,
  lang: string,
  labels: BookingLabels,
): BookingSubmitActions {
  const [status, setStatus] = useState<BookingSubmitState['status']>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [icsUrl, setIcsUrl] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
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
        setErrorMessage(labels.slotTaken)
      } else {
        setStatus('error')
        setErrorMessage(labels.error)
      }
    } catch {
      setStatus('error')
      setErrorMessage(labels.error)
    }
  }

  return { status, errorMessage, icsUrl, handleSubmit, setError: setErrorMessage }
}

export { useBookingSubmit }
