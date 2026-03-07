import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const analysis = await kv.get(`rt:analysis:${id}`)
  if (!analysis) {
    return NextResponse.json({ status: 'pending' })
  }

  return NextResponse.json(analysis)
}
