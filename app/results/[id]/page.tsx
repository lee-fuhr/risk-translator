'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface RiskAnalysis {
  spec: string;
  riskMitigation: string;
  costOfFailure: string;
  whyCheaperFails: string;
  severity: 'high' | 'medium' | 'low';
}

function ResultsContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const sessionId = searchParams.get('session_id');
  const [analyses, setAnalyses] = useState<RiskAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!id) {
      router.push('/');
      return;
    }

    // Fetch full results from API
    // The API checks KV for paid flag — set by webhook on Stripe checkout.session.completed
    fetch(`/api/results?id=${id}${sessionId ? `&session_id=${sessionId}` : ''}`)
      .then(res => res.json())
      .then(data => {
        if (data.paid && data.full) {
          setPaid(true);
          setAnalyses(data.full);
        } else {
          // Not paid — redirect to preview
          router.push(`/preview/${id}`);
        }
      })
      .catch(() => setError('Failed to load results. Please try again or contact hi@leefuhr.com'))
      .finally(() => setLoading(false));
  }, [id, sessionId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--muted-foreground)]">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6">
        <p className="text-[var(--danger)] mb-4">{error}</p>
        <Link href="/" className="btn btn-primary">Back to home</Link>
      </div>
    );
  }

  if (!paid) return null;

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 md:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-label mb-4">RISK TRANSLATOR — FULL ANALYSIS</p>
          <h1 className="text-display text-4xl md:text-5xl mb-4">Your risk translations</h1>
          <p className="text-body text-lg text-[var(--muted-foreground)]">
            {analyses.length} specifications translated into cost-of-failure language.
            Copy and paste directly into proposals.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => window.print()}
            className="btn-outline text-sm"
          >
            Print / save PDF
          </button>
          <a href="mailto:hi@leefuhr.com?subject=Risk Translator - I need help" className="btn-outline text-sm">
            Questions? Email Lee
          </a>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {analyses.map((item, i) => {
            const severityColor =
              item.severity === 'high'
                ? 'var(--danger)'
                : item.severity === 'medium'
                ? 'var(--warning)'
                : 'var(--success)';

            return (
              <div key={i} className="bg-[var(--muted)] p-6 border-l-4" style={{ borderLeftColor: severityColor }}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-section font-semibold">{item.spec}</h2>
                  <span
                    className="text-xs font-semibold uppercase shrink-0"
                    style={{ color: severityColor }}
                  >
                    {item.severity} risk
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-label text-xs mb-1">RISK MITIGATION</p>
                    <p className="text-body text-sm">{item.riskMitigation}</p>
                  </div>
                  <div>
                    <p className="text-label text-xs mb-1">COST OF FAILURE</p>
                    <p className="text-body text-sm">{item.costOfFailure}</p>
                  </div>
                  <div>
                    <p className="text-label text-xs mb-1">WHY CHEAPER ALTERNATIVES FAIL</p>
                    <p className="text-body text-sm">{item.whyCheaperFails}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 bg-[var(--accent)] p-8 text-center">
          <h2 className="text-display text-2xl text-[var(--accent-foreground)] mb-3">
            Want this for your full sales process?
          </h2>
          <p className="text-[var(--accent-foreground)] opacity-80 mb-6">
            I work with manufacturers on messaging strategy — positioning, proposals, website copy.
            Starts at $750/month.
          </p>
          <a
            href="mailto:hi@leefuhr.com?subject=Interested in working together — saw Risk Translator"
            className="btn-reversed inline-block"
          >
            Email Lee →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Results() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--muted-foreground)]">Loading...</p>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
