'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function TestPage() {
  const [testId] = useState('test-123')

  const setupTestData = () => {
    const testSpecs = `- 304 stainless steel construction
- IP67 waterproof rating
- 10-year manufacturer warranty
- UL certified components
- Temperature range: -40°F to 140°F`

    localStorage.setItem(`spec-${testId}`, testSpecs)
    alert('Test data loaded! You can now test the flow.')
  }

  const setupPaidAccess = () => {
    localStorage.setItem(`paid-${testId}`, 'true')
    alert('Marked as paid! You can now access results directly.')
  }

  const clearAllData = () => {
    localStorage.clear()
    alert('All test data cleared!')
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="px-4 md:px-8 lg:px-12 py-12 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--accent)] text-sm font-bold mb-2 tracking-wider">RISK TRANSLATOR</p>
          <h1 className="text-display text-4xl md:text-6xl mb-4">
            QA <span className="text-[var(--accent)]">dashboard</span>
          </h1>
          <p className="text-body text-lg mb-6">
            Test all pages and flows · Port 3003
          </p>
          <Link href="/" className="text-[var(--accent)] hover:underline">
            ← Back to landing page
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Quick actions</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button onClick={setupTestData} className="btn-kinetic text-center">
              Load test data
            </button>
            <button onClick={setupPaidAccess} className="btn-outline text-center">
              Mark as paid
            </button>
            <button onClick={clearAllData} className="btn-outline text-center">
              Clear all data
            </button>
          </div>
          <div className="bg-[var(--muted)] p-4 border-l-4 border-[var(--accent)]">
            <p className="text-body text-sm">
              <strong className="text-[var(--foreground)]">Test ID:</strong> {testId}
            </p>
          </div>
        </div>
      </section>

      {/* Page Flow */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Page flow</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <Link
              href="/"
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">1. HOME</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Landing page</p>
              <p className="text-body text-sm">Paste specs to analyze</p>
            </Link>

            <Link
              href={`/processing?id=${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">2. PROCESSING</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Analysis progress</p>
              <p className="text-body text-sm">Animated progress bar</p>
              <p className="text-[var(--warning)] text-xs mt-2">⚠️ Requires test data</p>
            </Link>

            <Link
              href={`/preview/${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">3. PREVIEW</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Free preview</p>
              <p className="text-body text-sm">Risk gaps identified</p>
              <p className="text-[var(--warning)] text-xs mt-2">⚠️ Requires test data</p>
            </Link>

            <Link
              href={`/checkout?id=${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">4. CHECKOUT</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Payment page</p>
              <p className="text-body text-sm">Mock payment form</p>
              <p className="text-[var(--warning)] text-xs mt-2">⚠️ Requires test data</p>
            </Link>

            <Link
              href={`/results/${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--success)] hover:bg-[var(--success)]/10 transition-colors"
            >
              <p className="text-[var(--success)] text-sm font-bold mb-2">5. RESULTS</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Full analysis</p>
              <p className="text-body text-sm">Translated specs + scripts</p>
              <p className="text-[var(--danger)] text-xs mt-2">⚠️ Requires paid status</p>
            </Link>
          </div>
        </div>
      </section>

      {/* User Flow Tests */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">User flow tests</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <h3 className="text-[var(--foreground)] font-semibold mb-4">Complete purchase flow</h3>
              <ol className="space-y-2 text-body text-sm mb-4">
                <li>1. Go to landing page and paste specs (or click &ldquo;Load test data&rdquo;)</li>
                <li>2. Submit to trigger processing animation</li>
                <li>3. View free preview with risk gaps</li>
                <li>4. Click through to checkout</li>
                <li>5. Complete payment (any values work)</li>
                <li>6. View full results with translated specs</li>
              </ol>
              <Link href="/" className="btn-kinetic inline-block">
                Start flow →
              </Link>
            </div>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <h3 className="text-[var(--foreground)] font-semibold mb-4">Direct results access (paid)</h3>
              <ol className="space-y-2 text-body text-sm mb-4">
                <li>1. Click &ldquo;Load test data&rdquo; above</li>
                <li>2. Click &ldquo;Mark as paid&rdquo;</li>
                <li>3. Go directly to results page</li>
                <li>4. Should see full analysis without checkout</li>
              </ol>
              <div className="flex gap-3">
                <button onClick={() => { setupTestData(); setupPaidAccess(); }} className="btn-outline">
                  Setup paid access
                </button>
                <Link href={`/results/${testId}`} className="btn-kinetic">
                  Go to results →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QA Checklist */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">QA checklist</h2>
          <div className="bg-[var(--background)] p-6 border-2 border-[var(--border)]">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-body text-sm">
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Landing page loads with spec input</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Processing animation runs smoothly</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Preview shows risk gaps with severity</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Locked content is blurred</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Checkout form validates</span>
                </label>
              </div>
              <div className="space-y-2 text-body text-sm">
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Results page shows full translations</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Direct results blocked without payment</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>All CTAs and navigation work</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Mobile responsive (375px, 768px, 1024px)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Dark theme consistent across pages</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Known Limitations */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Known limitations (demo mode)</h2>
          <div className="bg-[var(--warning)]/10 border-2 border-[var(--warning)]/30 p-6">
            <ul className="list-disc list-inside space-y-2 text-body text-sm">
              <li>Analysis uses mock data (no Claude API in demo)</li>
              <li>Payment processing is simulated</li>
              <li>Data stored in localStorage (not persistent)</li>
              <li>Risk cost estimates use placeholder values</li>
              <li>PDF export not implemented</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-label">Risk Translator v1.0 · Port 3003</p>
        </div>
      </footer>
    </main>
  )
}
