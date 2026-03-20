'use client'

import Script from 'next/script'
import { useSyncExternalStore } from 'react'

const CONSENT_KEY = 'v2_cookie_consent'
const GA4_ID = 'GT-NBBTZS5'
const GADS_IDS = ['AW-11213118615', 'AW-16539026255']
const FB_PIXEL_ID = '557616629917733'

function getConsentSnapshot(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return false
    const consent = JSON.parse(raw) as { analytics?: boolean }
    return consent.analytics === true
  } catch {
    return false
  }
}

function subscribeConsent(callback: () => void): () => void {
  const handler = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) callback()
  }
  window.addEventListener('storage', handler)

  // Also listen for custom event from cookie consent component
  const customHandler = () => callback()
  window.addEventListener('v2-consent-change', customHandler)

  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener('v2-consent-change', customHandler)
  }
}

function getServerSnapshot(): boolean {
  return false
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  return getConsentSnapshot()
}

function Analytics() {
  const hasConsent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerSnapshot)

  if (!hasConsent) return null

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');
          ${GADS_IDS.map((id) => `gtag('config', '${id}');`).join('\n')}
        `}
      </Script>

      {/* Facebook Pixel */}
      <Script id="fb-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* Tracking pixel — empty alt is intentional (decorative 1x1 image, not content) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

export { Analytics }
