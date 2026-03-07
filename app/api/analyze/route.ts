import { NextRequest, NextResponse } from 'next/server'
import { getKv } from '@/app/lib/kv'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 60

function getClient() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! }) }

interface RiskGap {
  spec: string
  issue: string
  severity: 'high' | 'medium' | 'low'
}

interface RiskAnalysis {
  spec: string
  riskMitigation: string
  costOfFailure: string
  whyCheaperFails: string
  severity: 'high' | 'medium' | 'low'
}

interface AnalysisResult {
  status: 'complete' | 'error'
  preview: RiskGap[]
  full: RiskAnalysis[]
  analyzedAt: number
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    // Return cached result if already analyzed
    const cached = await getKv().get<AnalysisResult>(`rt:analysis:${id}`)
    if (cached?.status === 'complete') {
      return NextResponse.json(cached)
    }

    // Fetch specs
    const specData = await getKv().get<{ specs: string }>(`rt:spec:${id}`)
    if (!specData) {
      return NextResponse.json({ error: 'Specs not found — session may have expired' }, { status: 404 })
    }

    const { specs } = specData

    const prompt = `You are a technical sales expert helping manufacturers justify premium specifications to cost-focused purchasing departments.

Analyze these product specifications and return a JSON object with two arrays:

1. "preview" — for each spec, identify the critical gap in how it's currently stated (missing risk quantification, missing cost-of-failure data, etc). This is the free preview.

2. "full" — for each spec, provide a complete risk-justified translation that sales teams can use directly. This is the paid content.

Specifications to analyze:
${specs}

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "preview": [
    {
      "spec": "exact spec text",
      "issue": "specific gap: what risk/cost data is missing from this spec as currently stated",
      "severity": "high|medium|low"
    }
  ],
  "full": [
    {
      "spec": "exact spec text",
      "riskMitigation": "2-3 sentences: what business risk this spec directly prevents, with specifics",
      "costOfFailure": "2-3 sentences: specific dollar ranges for failure scenarios (replacement, downtime, liability). Use realistic industry data.",
      "whyCheaperFails": "2-3 sentences: how cheaper alternatives fail at this spec, with cost comparison showing false economy",
      "severity": "high|medium|low"
    }
  ]
}

Guidelines:
- Be specific with dollar amounts ($X,000-$Y,000 ranges)
- Focus on manufacturing, industrial, and B2B contexts
- Severity: high = safety/compliance/major downtime risk, medium = significant cost/operational risk, low = efficiency/maintenance risk
- Keep each field concise but data-rich
- The "full" translation should be something a sales engineer can paste into a proposal`

    const response = await getClient().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    let parsed: { preview: RiskGap[]; full: RiskAnalysis[] }
    try {
      parsed = JSON.parse(text)
    } catch {
      // Try to extract JSON from the response
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('No valid JSON in response')
      parsed = JSON.parse(match[0])
    }

    const result: AnalysisResult = {
      status: 'complete',
      preview: parsed.preview || [],
      full: parsed.full || [],
      analyzedAt: Date.now(),
    }

    await getKv().set(`rt:analysis:${id}`, result, { ex: 60 * 60 * 24 * 30 })

    return NextResponse.json(result)
  } catch (err) {
    console.error('Analyze error:', err)
    const errorResult: AnalysisResult = {
      status: 'error',
      preview: [],
      full: [],
      analyzedAt: Date.now(),
      error: err instanceof Error ? err.message : 'Analysis failed',
    }
    return NextResponse.json(errorResult, { status: 500 })
  }
}
