'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState('Analyzing technical specifications...');

  useEffect(() => {
    if (!id) {
      router.push('/');
      return;
    }

    const steps = [
      { progress: 20, text: 'Analyzing technical specifications...', duration: 800 },
      { progress: 40, text: 'Identifying risk factors...', duration: 1000 },
      { progress: 60, text: 'Calculating cost-of-failure scenarios...', duration: 900 },
      { progress: 80, text: 'Generating risk-justified framework...', duration: 1100 },
      { progress: 100, text: 'Complete!', duration: 500 },
    ];

    let currentStep = 0;

    const runStep = () => {
      if (currentStep < steps.length) {
        const { progress: newProgress, text, duration } = steps[currentStep];
        setProgress(newProgress);
        setStep(text);
        currentStep++;
        setTimeout(runStep, duration);
      } else {
        // Navigate to preview
        setTimeout(() => {
          router.push(`/preview/${id}`);
        }, 500);
      }
    };

    runStep();
  }, [id, router]);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <h1 className="text-3xl font-bold mb-8">Processing your specifications</h1>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-[var(--border)] rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">{progress}%</p>
          </div>

          {/* Current Step */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-[var(--background)] px-6 py-4 rounded-lg">
              <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              <p className="text-lg">{step}</p>
            </div>
          </div>

          {/* What's Happening */}
          <div className="text-left bg-[var(--background)] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">What we&apos;re analyzing</h2>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>• Material specifications and failure rates</li>
              <li>• Certification requirements and compliance risks</li>
              <li>• Warranty coverage and liability transfer</li>
              <li>• Environmental ratings and damage prevention</li>
              <li>• Industry benchmarks and cost comparisons</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Processing() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    }>
      <ProcessingContent />
    </Suspense>
  );
}
