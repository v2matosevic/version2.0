import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')
const EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png'] as const
const MIME_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  const { slug } = await params
  const assetsDir = path.join(CONTENT_DIR, slug, 'assets')

  for (const ext of EXTENSIONS) {
    const filePath = path.join(assetsDir, `featured${ext}`)
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath)
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': MIME_TYPES[ext],
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
  }

  return NextResponse.json({ error: 'Image not found' }, { status: 404 })
}
