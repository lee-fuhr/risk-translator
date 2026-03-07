'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface RiskGap {
  spec: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
}

export default function Preview() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [riskGaps, setRiskGaps] = useState<RiskGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      router.push('/');
      return;
    }

    fetch(`/api/status?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'complete') {
          setRiskGaps(data.preview || []);
        } else if (data.status === 'error') {
          setError(data.error || 'Analysis failed. Please try again.');
        } else {
          // Not done yet — go back to processing
          router.push(`/processing?id=${id}`);
        }
      })
      .catch(() => setError('Failed to load analysis. Please try again.'))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleUnlock = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId: id }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setCheckoutLoading(false);
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--muted-foreground)]">Loading your analysis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6">
        <p className="text-[var(--danger)] mb-4">{error}</p>
        <Link href="/" className="btn btn-primary">Try again</Link>
      </div>
    );
  }

  const highCount = riskGaps.filter(g => g.severity === 'high').length;

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 md:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-label mb-4">RISK TRANSLATOR</p>
          <h1 className="text-display text-4xl md:text-5xl mb-4">Analysis complete</h1>
          <p className="text-body text-xl text-[var(--muted-foreground)]">
            We found{' '}
            <span className="text-[var(--danger)] font-bold">{riskGaps.length} gaps</span>
            {highCount > 0 && (
              <span> — <span className="font-bold">{highCount} high-severity</span></span>
            )}{' '}
            in your risk justification
          </p>
        </div>

        {/* Free preview: risk gaps */}
        <div className="bg-[var(--muted)] p-1 mb-2">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div>
              <h2 className="text-section text-xl mb-1">Risk gaps identified</h2>
              <p className="text-body text-sm text-[var(--muted-foreground)]">What your specs are missing — and why it costs you deals</p>
            </div>
            <span className="text-label text-xs bg-[var(--background)] px-3 py-1">FREE</span>
          </div>
        </div>

        <div className="space-y-3 mb-10">
          {riskGaps.map((gap, i) => (
            <div
              key={i}
              className="bg-[var(--muted)] p-5 border-l-4"
              style={{
                borderLeftColor:
                  gap.severity === 'high'
                    ? 'var(--danger)'
                    : gap.severity === 'medium'
                    ? 'var(--warning)'
                    : 'var(--success)',
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <code className="text-xs bg-[var(--background)] px-2 py-1 font-mono">
                  {gap.spec}
                </code>
                <span
                  className="text-xs font-semibold uppercase shrink-0"
                  style={{
                    color:
                      gap.severity === 'high'
                        ? 'var(--danger)'
                        : gap.severity === 'medium'
                        ? 'var(--warning)'
                        : 'var(--success)',
                  }}
                >
                  {gap.severity}
                </span>
              </div>
              <p className="text-body text-sm text-[var(--muted-foreground)]">{gap.issue}</p>
            </div>
          ))}
        </div>

        {/* Locked teaser */}
        <div className="relative bg-[var(--muted)] p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--muted)]/80 to-[var(--muted)] z-10 flex items-end justify-center pb-8">
            <button
              onClick={handleUnlock}
              disabled={checkoutLoading}
              className="btn btn-primary text-lg px-10 py-4 disabled:opacity-60"
            >
              {checkoutLoading ? 'Redirecting to checkout...' : 'Unlock full analysis — $97 →'}
            </button>
          </div>

          <div className="filter blur-sm pointer-events-none opacity-60">
            <h2 className="text-section text-xl font-bold mb-6">Full risk-justified translations</h2>
            <div className="space-y-6">
              {riskGaps.slice(0, 2).map((gap, i) => (
                <div key={i}>
                  <h3 className="font-semibold mb-2">{gap.spec}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-1"><strong>Risk mitigation:</strong> [hidden until unlocked]</p>
                  <p className="text-sm text-[var(--muted-foreground)] mb-1"><strong>Cost of failure:</strong> $XX,000–$XX,000 per incident...</p>
                  <p className="text-sm text-[var(--muted-foreground)]"><strong>Why cheaper alternatives fail:</strong> [hidden]</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Value props */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { title: 'Risk-justified translations', body: 'Every spec reframed as risk mitigation with real cost data' },
            { title: 'Cost-of-failure math', body: 'Dollar amounts for what happens when customers choose cheaper' },
            { title: 'Copy-paste ready', body: 'Drop directly into proposals and RFP responses' },
          ].map((v, i) => (
            <div key={i} className="bg-[var(--muted)] p-5">
              <h3 className="font-semibold mb-2 text-sm">{v.title}</h3>
              <p className="text-body text-xs text-[var(--muted-foreground)]">{v.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleUnlock}
            disabled={checkoutLoading}
            className="btn btn-primary text-xl px-12 py-5 mb-3 disabled:opacity-60"
          >
            {checkoutLoading ? 'Redirecting...' : 'Get full analysis — $97'}
          </button>
          <p className="text-body text-sm text-[var(--muted-foreground)]">
            One-time payment. Instant access. 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
