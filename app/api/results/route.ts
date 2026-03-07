import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@/app/lib/kv'

interface AnalysisResult {
  status: string
  preview: unknown[]
  full: unknown[]
  analyzedAt: number
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const [analysis, paidFlag] = await Promise.all([
    kv.get<AnalysisResult>(`rt:analysis:${id}`),
    kv.get(`rt:paid:${id}`),
  ])

  if (!analysis || analysis.status !== 'complete') {
    return NextResponse.json({ paid: false, error: 'Analysis not found' }, { status: 404 })
  }

  if (!paidFlag) {
    return NextResponse.json({ paid: false })
  }

  return NextResponse.json({
    paid: true,
    full: analysis.full,
    analyzedAt: analysis.analyzedAt,
  })
}
