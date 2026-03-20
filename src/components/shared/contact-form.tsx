'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type ContactFormProps = {
  lang: string
}

function ContactForm({ lang }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const formData = new FormData(event.currentTarget)

    const body = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      _honey: (formData.get('_honey') as string) ?? '',
      language: lang,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setStatus('success')
        ;(event.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
        setErrorMessage(lang === 'hr' ? 'Nešto je pošlo po krivu. Pokušajte ponovno.' : 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage(lang === 'hr' ? 'Nešto je pošlo po krivu. Pokušajte ponovno.' : 'Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-6">
      {status === 'success' && (
        <div className="p-4 rounded-lg bg-green-900/20 border border-green-800/30 text-green-400">
          {lang === 'hr' ? 'Poruka poslana! Javit ćemo vam se u roku 24 sata.' : 'Message sent! We\'ll get back to you within 24 hours.'}
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-900/20 border border-red-800/30 text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="absolute left-[-9999px] opacity-0 h-0 pointer-events-none" aria-hidden="true">
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>

      <Input
        name="name"
        label={lang === 'hr' ? 'Ime' : lang === 'de' ? 'Name' : 'Name'}
        required
        minLength={2}
        maxLength={100}
        disabled={status === 'sending'}
      />
      <Input
        name="email"
        type="email"
        label="Email"
        required
        maxLength={254}
        disabled={status === 'sending'}
      />
      <Textarea
        name="message"
        label={lang === 'hr' ? 'Poruka' : lang === 'de' ? 'Nachricht' : 'Message'}
        required
        minLength={10}
        maxLength={5000}
        rows={5}
        disabled={status === 'sending'}
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        loading={status === 'sending'}
        className="w-full sm:w-auto"
      >
        {status === 'sending'
          ? (lang === 'hr' ? 'Šaljem...' : 'Sending...')
          : (lang === 'hr' ? 'Pošalji' : lang === 'de' ? 'Senden' : 'Send')}
      </Button>
    </form>
  )
}

export { ContactForm }
export type { ContactFormProps }
