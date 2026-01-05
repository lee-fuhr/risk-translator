'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface RiskGap {
  spec: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
}

export default function Preview() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [specs, setSpecs] = useState('');
  const [riskGaps, setRiskGaps] = useState<RiskGap[]>([]);

  useEffect(() => {
    // Retrieve specs from localStorage
    const storedSpecs = localStorage.getItem(`spec-${id}`);
    if (!storedSpecs) {
      router.push('/');
      return;
    }

    setSpecs(storedSpecs);

    // Mock risk gap analysis
    const gaps: RiskGap[] = [
      {
        spec: '304 stainless steel',
        issue: 'No quantification of corrosion resistance savings or replacement cost avoidance',
        severity: 'high'
      },
      {
        spec: 'IP67 rating',
        issue: 'Missing water damage prevention value and industry failure data',
        severity: 'high'
      },
      {
        spec: '10-year warranty',
        issue: 'No risk transfer framing or liability cost comparison',
        severity: 'medium'
      },
      {
        spec: 'UL certification',
        issue: 'Compliance risk and insurance premium impact not mentioned',
        severity: 'medium'
      },
      {
        spec: 'Temperature range',
        issue: 'Environmental failure scenarios and operational continuity not quantified',
        severity: 'low'
      }
    ];

    setRiskGaps(gaps);
  }, [id, router]);

  const handleUnlock = () => {
    router.push(`/checkout?id=${id}`);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Analysis complete</h1>
          <p className="text-xl text-[var(--muted-foreground)]">
            We found <span className="text-[var(--danger)] font-bold">{riskGaps.length} critical gaps</span> in your risk justification
          </p>
        </div>

        {/* Free Preview - Risk Gaps */}
        <div className="card mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Risk gaps identified</h2>
              <p className="text-[var(--muted-foreground)]">These are the weaknesses in your current specifications</p>
            </div>
            <span className="badge badge-success">FREE PREVIEW</span>
          </div>

          <div className="space-y-6">
            {riskGaps.map((gap, index) => (
              <div
                key={index}
                className="bg-[var(--background)] rounded-lg p-6 border-l-4"
                style={{
                  borderLeftColor:
                    gap.severity === 'high'
                      ? 'var(--danger)'
                      : gap.severity === 'medium'
                      ? 'var(--warning)'
                      : 'var(--success)'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-mono text-sm bg-[var(--muted)] px-3 py-1 rounded">
                    {gap.spec}
                  </h3>
                  <span
                    className={`text-xs font-semibold uppercase ${
                      gap.severity === 'high'
                        ? 'risk-high'
                        : gap.severity === 'medium'
                        ? 'risk-medium'
                        : 'risk-low'
                    }`}
                  >
                    {gap.severity} risk
                  </span>
                </div>
                <p className="text-[var(--muted-foreground)]">{gap.issue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Content Teaser */}
        <div className="card relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)] to-[var(--background)] z-10 flex items-end justify-center pb-8">
            <button onClick={handleUnlock} className="btn btn-primary text-lg px-8 py-4">
              Unlock full analysis - $150 →
            </button>
          </div>

          <div className="filter blur-sm pointer-events-none">
            <h2 className="text-2xl font-bold mb-6">Full risk-justified analysis</h2>
            <div className="space-y-8 opacity-60">
              <div>
                <h3 className="text-xl font-semibold mb-3">304 stainless steel construction</h3>
                <div className="space-y-3 text-[var(--muted-foreground)]">
                  <p><strong>Risk mitigation:</strong> Corrosion resistance prevents premature failure in harsh environments...</p>
                  <p><strong>Cost of failure:</strong> Replacement costs average $12,000-$45,000 depending on installation...</p>
                  <p><strong>Why cheaper alternatives fail:</strong> 201/202 stainless steel shows 3x higher failure rates...</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">IP67 waterproof rating</h3>
                <div className="space-y-3 text-[var(--muted-foreground)]">
                  <p><strong>Risk mitigation:</strong> Protection against water ingress that accounts for 34% of field failures...</p>
                  <p><strong>Cost of failure:</strong> Water damage repair averages $8,000 per incident plus downtime...</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Executive summary for purchasing</h3>
                <p className="text-[var(--muted-foreground)]">
                  This specification represents a risk-managed approach that reduces total cost of ownership by 40% over the product lifecycle...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <h3 className="font-bold mb-3">Risk-justified translations</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Every spec reframed as risk mitigation with cost data</p>
          </div>
          <div className="card">
            <h3 className="font-bold mb-3">Cost-of-failure analysis</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Industry data on what happens when you choose cheaper</p>
          </div>
          <div className="card">
            <h3 className="font-bold mb-3">Executive summary</h3>
            <p className="text-sm text-[var(--muted-foreground)]">One-page brief for purchasing managers</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={handleUnlock} className="btn btn-primary text-xl px-12 py-5 mb-4">
            Get full analysis - $150
          </button>
          <p className="text-sm text-[var(--muted-foreground)]">
            One-time payment. Instant access. No subscription.
          </p>
        </div>
      </div>
    </div>
  );
}
