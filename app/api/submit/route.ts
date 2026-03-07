import { NextRequest, NextResponse } from 'next/server'
import { getKv } from '@/app/lib/kv'

export async function POST(request: NextRequest) {
  try {
    const { specs } = await request.json()

    if (!specs || typeof specs !== 'string' || !specs.trim()) {
      return NextResponse.json({ error: 'No specs provided' }, { status: 400 })
    }

    const id = `rt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    await getKv().set(`rt:spec:${id}`, { specs: specs.trim(), submittedAt: Date.now() }, { ex: 60 * 60 * 24 * 30 })

    return NextResponse.json({ id })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Failed to save specs' }, { status: 500 })
  }
}
