'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type ScreenshotGalleryProps = {
  images: string[]
  alt?: string
}

function ScreenshotGallery({ images, alt = 'Project screenshot' }: ScreenshotGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrevious = useCallback(() => {
    setLightboxIndex((current) =>
      current !== null ? (current - 1 + images.length) % images.length : null
    )
  }, [images.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((current) =>
      current !== null ? (current + 1) % images.length : null
    )
  }, [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') goToPrevious()
      if (event.key === 'ArrowRight') goToNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, closeLightbox, goToPrevious, goToNext])

  if (images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden rounded-lg border border-line-subtle bg-raised transition-all hover:border-brand-red/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
          >
            <Image
              src={src}
              alt={`${alt} ${index + 1}`}
              width={600}
              height={400}
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-base/0 transition-colors group-hover:bg-base/10" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot lightbox"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
            onKeyDown={(event) => { if (event.key === 'Enter') closeLightbox() }}
            role="button"
            tabIndex={0}
            aria-label="Close lightbox"
          />

          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-raised/80 text-foreground backdrop-blur-sm transition-colors hover:bg-raised"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Previous */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-raised/80 text-foreground backdrop-blur-sm transition-colors hover:bg-raised"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Image */}
          <div className="relative z-10 max-h-[85vh] max-w-[90vw]">
            <Image
              src={images[lightboxIndex]}
              alt={`${alt} ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="h-auto max-h-[85vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-raised/80 text-foreground backdrop-blur-sm transition-colors hover:bg-raised"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-raised/80 px-3 py-1 text-sm text-muted backdrop-blur-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

export { ScreenshotGallery }
export type { ScreenshotGalleryProps }
