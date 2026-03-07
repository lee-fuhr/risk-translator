'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const STEPS = [
  'Parsing technical specifications...',
  'Identifying risk categories...',
  'Calculating cost-of-failure scenarios...',
  'Generating risk-justified language...',
  'Finalizing your translations...',
];

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState('');
  const analyzeStarted = useRef(false);

  useEffect(() => {
    if (!id) {
      router.push('/');
      return;
    }

    const stepTimer = setInterval(() => {
      setStepIndex(i => (i + 1) % STEPS.length);
    }, 2800);

    const dotTimer = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);

    if (!analyzeStarted.current) {
      analyzeStarted.current = true;
      fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
        .then(res => res.json())
        .then(() => {
          router.push(`/preview/${id}`);
        })
        .catch(() => {
          router.push(`/preview/${id}`);
        });
    }

    return () => {
      clearInterval(stepTimer);
      clearInterval(dotTimer);
    };
  }, [id, router]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center px-6 py-16">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-label mb-4">RISK TRANSLATOR</p>
          <h1 className="text-display text-4xl mb-4">Analyzing your specs</h1>
          <p className="text-body text-[var(--muted-foreground)]">
            This takes 15–30 seconds. Sit tight.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="w-16 h-16 border-4 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
        </div>

        <div className="bg-[var(--muted)] p-6 text-center mb-8">
          <p className="text-body text-lg">
            {STEPS[stepIndex]}{dots}
          </p>
        </div>

        <div className="space-y-3">
          {[
            'Reading each specification line',
            'Mapping specs to failure mode libraries',
            'Generating cost-of-failure estimates',
            'Building risk-justified translations',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-[var(--muted-foreground)] text-sm">
              <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Processing() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--muted-foreground)]">Loading...</p>
      </div>
    }>
      <ProcessingContent />
    </Suspense>
  );
}
