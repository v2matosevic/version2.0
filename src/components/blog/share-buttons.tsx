'use client'

import { useState, useCallback } from 'react'

type ShareButtonsProps = {
  url: string
  title: string
  label?: string
}

const ICON_SIZE = 18

function TwitterIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.07 1.373.14V7.89a8 8 0 0 0-.73-.024c-1.036 0-1.436.39-1.436 1.413v2.765h2.06l-.354 3.667h-1.706v8.137C18.395 23.278 21.645 19.986 22.87 15.96H20.11c-.992 2.92-3.535 5.067-6.62 5.76v-8.07h2.06l.354-3.667h-2.414V8.28c0-1.024.4-1.413 1.436-1.413.258 0 .52.008.73.024V3.626c-.283-.07-.972-.14-1.373-.14-4.01 0-5.858 1.893-5.858 5.978v1.58H6.627v3.667h2.474v7.98z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ShareButtons({ url, title, label = 'Share this article' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard API may be unavailable */
    }
  }, [url])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const buttonBase =
    'inline-flex items-center justify-center w-10 h-10 rounded-lg border border-line text-muted transition-colors hover:text-foreground hover:border-brand-red cursor-pointer'

  return (
    <div>
      <p
        className="text-muted mb-3 font-body"
        style={{
          fontSize: 'var(--text-small)',
          fontWeight: 'var(--font-weight-body-semibold)',
        }}
      >
        {label}
      </p>
      <div className="flex gap-2">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonBase}
          aria-label="Share on X (Twitter)"
        >
          <TwitterIcon />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonBase}
          aria-label="Share on Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonBase}
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <button
          onClick={handleCopy}
          className={buttonBase}
          aria-label={copied ? 'Link copied' : 'Copy link'}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  )
}

export { ShareButtons }
export type { ShareButtonsProps }
