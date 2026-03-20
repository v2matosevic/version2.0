import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Version2 — Web Design & Development Studio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2525 50%, #1a1a1a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-2px',
            }}
          >
            Version2
          </div>
          <div
            style={{
              width: '60px',
              height: '3px',
              background: '#991717',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              fontWeight: 300,
              color: '#999999',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Web Design & Development Studio
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
