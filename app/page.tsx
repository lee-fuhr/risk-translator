'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [specs, setSpecs] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!specs.trim()) return;

    setIsUploading(true);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ specs }),
      });

      if (!res.ok) throw new Error('Failed to submit specs');

      const { id } = await res.json();

      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('Specs Submitted');
      }

      router.push(`/processing?id=${id}`);
    } catch {
      setIsUploading(false);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setSpecs(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setSpecs(text);
      };
      reader.readAsText(file);
    }
  };

  const loadTestData = () => {
    setSpecs(`- 304 stainless steel construction
- IP67 waterproof rating
- 10-year manufacturer warranty
- UL certified components
- Temperature range: -40°F to 140°F
- Industrial-grade connectors
- Vibration tested to MIL-STD-810
- NEMA 4X rated enclosure`);
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-center px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Headline */}
            <div>
              <p className="text-label mb-4">RISK TRANSLATOR</p>
              <h1 className="text-display text-[clamp(2.25rem,6vw,5rem)] mb-6">
                Engineers love
                <br />
                your specs.
                <br />
                <span className="text-[var(--accent)]">Purchasing</span>
                <br />
                kills the deal.
              </h1>
              <p className="text-body text-xl md:text-2xl max-w-xl mb-6">
                Your specs are technically superior. But purchasing sees &ldquo;expensive.&rdquo; I translate your specifications into risk language — the cost-of-failure math that <strong>gets budgets approved.</strong>
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
                <span>2 minutes</span>
                <span>·</span>
                <span>Cost-of-failure math</span>
                <span>·</span>
                <span>Top 3 free</span>
              </div>
            </div>

            {/* Right: Upload box */}
            <div>
              <div className="bg-[var(--accent)] p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!specs ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
                      className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4 text-[var(--accent-foreground)]">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      <p className="text-[var(--accent-foreground)] text-lg font-semibold mb-2">
                        Drop your spec sheet here
                      </p>
                      <p className="text-white/80 text-sm">
                        Or paste specs below
                      </p>
                      <label className="mt-4 text-[var(--accent-foreground)] underline text-sm cursor-pointer">
                        browse files
                        <input
                          type="file"
                          accept=".txt,.doc,.docx,.pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="bg-[var(--background)] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[var(--foreground)] font-semibold text-sm">
                          Specs loaded
                        </p>
                        <button
                          type="button"
                          onClick={() => setSpecs('')}
                          className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm"
                        >
                          Clear
                        </button>
                      </div>
                      <p className="text-[var(--muted-foreground)] text-sm">
                        {specs.split('\n').length} specifications ready for analysis
                      </p>
                    </div>
                  )}

                  <textarea
                    className="w-full min-h-[120px] bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] font-mono text-sm placeholder:text-[var(--muted-foreground)]"
                    placeholder="Or paste your specs here:&#10;- 304 stainless steel&#10;- IP67 waterproof rating&#10;- 10-year warranty"
                    value={specs}
                    onChange={(e) => setSpecs(e.target.value)}
                  />

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={loadTestData}
                      className="text-[var(--accent-foreground)] underline text-sm"
                    >
                      Load test data
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn-reversed w-full text-lg"
                    disabled={!specs.trim() || isUploading}
                  >
                    {isUploading ? 'Processing...' : 'TRANSLATE MY SPECS →'}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/30">
                  <p className="text-xs text-white/70 text-center">
                    🔒 Your specs are analyzed securely and never stored
                  </p>
                </div>
              </div>

              {/* Sample CTA - prominent secondary action */}
              <div className="mt-4 text-center">
                <Link href="/sample" className="btn-outline w-full text-base">
                  Or see a full sample translation first →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakes strip */}
      <section className="bg-[var(--accent)] py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-section text-base md:text-lg text-white">Superior specs</span>
            <span className="text-white">→</span>
            <span className="text-section text-base md:text-lg text-white">Purchasing sees &quot;expensive&quot;</span>
            <span className="text-white">→</span>
            <span className="text-section text-base md:text-lg text-white">Competitor wins on price</span>
            <span className="text-white">→</span>
            <span className="text-section text-base md:text-lg text-white">You lose the deal</span>
            <span className="text-white text-xl">✗</span>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-label mb-4 flex items-center gap-2">
              THE PROBLEM
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </p>
              <h2 className="text-section text-4xl md:text-5xl lg:text-6xl mb-8">
                You know what&apos;s
                <br />
                technically right.
                <br />
                <span className="text-[var(--foreground)]">But you can&apos;t get it past purchasing.</span>
              </h2>
              <p className="text-body text-xl md:text-2xl">
                Purchasing sees &quot;expensive,&quot; not &quot;risk mitigation.&quot; The competitor&apos;s cheaper option looks the same on paper. Technical superiority doesn&apos;t win without business justification.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--danger)]">
                <p className="text-label mb-2">BEFORE:</p>
                <p className="text-body text-lg">&quot;304 stainless steel construction&quot;</p>
                <p className="text-[var(--muted-foreground)] text-sm mt-2">Purchasing thinks: &quot;Why not the cheaper option?&quot;</p>
              </div>
              <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--success)]">
                <p className="text-label mb-2">AFTER:</p>
                <p className="text-body text-lg">&quot;Corrosion resistance preventing $22,000-$70,000 in replacement costs over 10 years&quot;</p>
                <p className="text-[var(--muted-foreground)] text-sm mt-2">Purchasing thinks: &quot;This is actually cheaper long-term.&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Paid */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4 text-center flex items-center justify-center gap-2">
            HOW IT WORKS
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-4 h-4" stroke="currentColor" strokeWidth="1">
              <circle cx="8" cy="8" r="2.5"/>
              <path d="M9.796 1.343c-0.527-1.79-3.065-1.79-3.592 0l-0.094 0.319a0.873 0.873 0 0 1-1.255 0.52l-0.292-0.16c-1.64-0.892-3.433 0.902-2.54 2.541l0.159 0.292a0.873 0.873 0 0 1-0.52 1.255l-0.319 0.094c-1.79 0.527-1.79 3.065 0 3.592l0.319 0.094a0.873 0.873 0 0 1 0.52 1.255l-0.16 0.292c-0.892 1.64 0.901 3.434 2.541 2.54l0.292-0.159a0.873 0.873 0 0 1 1.255 0.52l0.094 0.319c0.527 1.79 3.065 1.79 3.592 0l0.094-0.319a0.873 0.873 0 0 1 1.255-0.52l0.292 0.16c1.64 0.893 3.434-0.902 2.54-2.541l-0.159-0.292a0.873 0.873 0 0 1 0.52-1.255l0.319-0.094c1.79-0.527 1.79-3.065 0-3.592l-0.319-0.094a0.873 0.873 0 0 1-0.52-1.255l0.16-0.292c0.893-1.64-0.902-3.433-2.541-2.54l-0.292 0.159a0.873 0.873 0 0 1-1.255-0.52z"/>
            </svg>
          </p>
          <h2 className="text-section text-4xl md:text-5xl mb-6 text-center">
            Top specs free. <span className="text-[var(--muted-foreground)]">Full translation $97.</span>
          </h2>
          <p className="text-body text-lg text-[var(--muted-foreground)] text-center mb-16 max-w-2xl mx-auto">
            The free preview gives you enough to test in your next meeting. The full translation is what sales engineers pay consultants $5,000+ to create.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Preview */}
            <div className="border-2 border-[var(--success)] p-8 bg-[var(--background)] relative">
              <div className="absolute -top-3 right-8 bg-[var(--success)] text-[var(--background)] px-3 py-1 text-xs font-bold">
                NO CREDIT CARD
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[var(--success)]/20 text-[var(--success)] px-3 py-1 text-sm font-bold">FREE</span>
                <span className="text-section text-xl">Preview</span>
              </div>
              <p className="text-body text-sm text-[var(--muted-foreground)] mb-6">Use this in your next pitch. It&apos;s not a sample.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Top 3 specs translated</strong> — highest impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Cost-of-failure calculations</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Talk tracks</strong> for each translated spec</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Before/after comparison</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--muted-foreground)] text-lg shrink-0">—</span>
                  <span className="text-[var(--muted-foreground)]">Remaining specs locked</span>
                </li>
              </ul>
            </div>

            {/* Full Translation */}
            <div className="border-2 border-[var(--accent)] p-8 bg-[var(--background)] relative">
              <div className="absolute -top-3 right-8 bg-[var(--accent)] text-[var(--accent-foreground)] px-3 py-1 text-xs font-bold">
                COMPLETE
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[var(--accent)] text-[var(--accent-foreground)] px-3 py-1 text-sm font-bold">$97</span>
                <span className="text-section text-xl">Full translation</span>
              </div>
              <p className="text-body text-sm text-[var(--muted-foreground)] mb-6">Close one deal at full price = pays for itself 10×</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body">Everything in free preview</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>All specs translated</strong> — complete sheet</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Executive summary</strong> for purchasing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>10-year TCO comparison</strong> framework</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>PDF export</strong> — presentation ready</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4">WHAT YOU GET FOR $97</p>
          <h2 className="text-section text-4xl md:text-5xl lg:text-6xl mb-12">
            Specs that win budgets.
            <br />
            <span className="text-[var(--foreground)]">Not just technical approval.</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">RISK LANGUAGE</p>
              <p className="text-section text-xl mb-3">Every spec translated</p>
              <p className="text-body">From &quot;IP67 rating&quot; to &quot;protection against water damage that causes 34% of field failures.&quot;</p>
            </div>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">COST CALCULATIONS</p>
              <p className="text-section text-xl mb-3">Failure costs quantified</p>
              <p className="text-body">Show purchasing what happens when the cheap option fails. Make the risk real.</p>
            </div>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">EXECUTIVE SUMMARY</p>
              <p className="text-section text-xl mb-3">One page for decision-makers</p>
              <p className="text-body">The business case for your specs, in language purchasing understands.</p>
            </div>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">TCO COMPARISON</p>
              <p className="text-section text-xl mb-3">10-year cost framework</p>
              <p className="text-body">Show the true cost of ownership, not just purchase price.</p>
            </div>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">TALK TRACKS</p>
              <p className="text-section text-xl mb-3">What to say in meetings</p>
              <p className="text-body">Scripts for the &quot;why is this more expensive?&quot; conversation.</p>
            </div>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">COPY-PASTE READY</p>
              <p className="text-section text-xl mb-3">Use immediately</p>
              <p className="text-body">Drop directly into proposals, quotes, and presentations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro tip */}
      <section className="px-4 md:px-8 lg:px-12 py-16 bg-[var(--muted)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-label mb-4 flex items-center justify-center gap-2">
            PRO TIP
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </p>
          <h2 className="text-section text-3xl md:text-4xl mb-6">
            Lead with cost-of-failure, not features.
          </h2>
          <p className="text-body text-xl">
            When you open with &quot;our product does X,&quot; you&apos;re competing on features. When you open with &quot;here&apos;s what it costs when X fails,&quot; you&apos;re reframing the entire conversation. The risk translation does the reframing for you.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-label mb-4 text-center">FREQUENTLY ASKED</p>
          <h2 className="text-section text-3xl md:text-4xl mb-12 text-center">Common questions</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-section text-xl mb-3">What kind of specs can I translate?</h3>
              <p className="text-body text-lg">
                Any technical specification that justifies your price — material grades, certifications, ratings, tolerances, warranties, testing standards. If you&apos;ve ever lost a deal because purchasing couldn&apos;t see why your spec was worth the premium, that&apos;s the spec we translate.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">How do you calculate cost-of-failure?</h3>
              <p className="text-body text-lg">
                We use industry failure rate data, average repair/replacement costs, typical downtime costs, and insurance claim averages. Real numbers from real failures, not hypotheticals.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">Will this work for my industry?</h3>
              <p className="text-body text-lg">
                If you sell technical products where buyers compare specs and often choose the cheaper option, yes. We&apos;ve translated specs for industrial valves, structural steel, HVAC equipment, electrical components, concrete mixes, roofing systems — anywhere premium specs compete against budget alternatives.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">What if purchasing still says no?</h3>
              <p className="text-body text-lg">
                Some buyers will always choose cheapest. That&apos;s fine — you&apos;ve documented the risk. When the cheap option fails in 18 months, you&apos;re the one who showed them the math. But more often, the conversation shifts. &ldquo;Why so expensive?&rdquo; becomes &ldquo;Help me justify this to my boss.&rdquo; That&apos;s a winnable conversation.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">Won&apos;t this sound like fear-mongering?</h3>
              <p className="text-body text-lg">
                Only if you&apos;re making up numbers. We use industry data — real failure rates, real repair costs, documented downtime averages. You&apos;re not scaring anyone. You&apos;re showing them math they should have seen before making a decision. Most buyers want this information — they just don&apos;t know to ask for it.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">How do you estimate downtime costs if I don&apos;t know them?</h3>
              <p className="text-body text-lg">
                We use industry benchmarks — average hourly downtime costs by sector, typical repair timelines, insurance claim data. You can adjust for your customer, but you&apos;re starting from real data, not guesses.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">Our specs are proprietary. Is this safe?</h3>
              <p className="text-body text-lg">
                Yes. Your specs are analyzed and deleted immediately — we don&apos;t store product specifications, pricing, or any submitted content. The output is yours. We&apos;re translating, not cataloging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4 text-center">THIS IS FOR YOU IF</p>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-[var(--success)] text-xl shrink-0">✓</span>
              <p className="text-body text-lg">You&apos;re an engineer who keeps losing to cheaper alternatives</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--success)] text-xl shrink-0">✓</span>
              <p className="text-body text-lg">You know what&apos;s right technically, but can&apos;t get it past purchasing</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--success)] text-xl shrink-0">✓</span>
              <p className="text-body text-lg">Your superior product loses on &quot;price&quot; even though it&apos;s the better value</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--success)] text-xl shrink-0">✓</span>
              <p className="text-body text-lg">You need to justify premium specs to non-technical decision-makers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-[var(--accent)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display text-4xl mb-4 text-[var(--accent-foreground)]">
            Stop losing to &quot;cheaper&quot; competitors
          </h2>
          <p className="text-[var(--accent-foreground)] text-xl mb-8">
            Paste your specs. Top 3 risk translations free. Full spec sheet $97.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-reversed text-lg"
          >
            See my top translations →
          </button>
          <p className="text-white/80 text-sm mt-4">
            No credit card required · 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer lockup: Credibility + More tools + Footer */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)] border-t-2 border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          {/* Credibility */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="max-w-2xl">
              <p className="text-body text-lg md:text-xl">
                Built by <a href="https://leefuhr.com" className="text-[var(--accent)] underline hover:no-underline">Lee Fuhr</a>. I help manufacturers win against &ldquo;cheaper&rdquo; competitors. The specs are technically superior — but purchasing doesn&apos;t see risk, they see cost. This tool translates your technical advantages into the cost-of-failure math that justifies your price.
              </p>
            </div>
            <Link href="/sample" className="btn-outline min-h-[44px] shrink-0">
              See a sample translation
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* More tools */}
          <p className="text-label mb-6 text-center">MORE TOOLS FOR MANUFACTURERS</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="https://areyougeneric.com" className="bg-[var(--background)] p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-label text-xs mb-1">FREE</p>
              <p className="text-section text-base mb-1">Commodity Test</p>
              <p className="text-body text-xs text-[var(--muted-foreground)]">Score your website messaging in 2 minutes. Free.</p>
            </a>
            <a href="https://websiteaudit.leefuhr.com" className="bg-[var(--background)] p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-label text-xs mb-1 text-[var(--accent)]">$400</p>
              <p className="text-section text-base mb-1">Website Audit</p>
              <p className="text-body text-xs text-[var(--muted-foreground)]">Full messaging audit — every page, prioritized fix list. 48 hours.</p>
            </a>
            <a href="https://proposal-analyzer.vercel.app" className="bg-[var(--background)] p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-label text-xs mb-1 text-[var(--accent)]">$97</p>
              <p className="text-section text-base mb-1">Proposal Analyzer</p>
              <p className="text-body text-xs text-[var(--muted-foreground)]">Spot commodity language in your proposals before the deadline. Get copy-paste fixes.</p>
            </a>
            <a href="https://case-study-extractor.vercel.app" className="bg-[var(--background)] p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-label text-xs mb-1 text-[var(--accent)]">$147</p>
              <p className="text-section text-base mb-1">Case Study Extractor</p>
              <p className="text-body text-xs text-[var(--muted-foreground)]">Turn project photos and invoices into sales-ready case studies in 5 minutes.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-label">
            <a href="https://leefuhr.com" className="text-[var(--accent)] hover:underline">Lee Fuhr Inc</a> © 2025
          </p>

          <nav className="flex gap-8">
            <Link href="/sample" className="text-body text-sm hover:text-[var(--accent)] transition-colors">
              See sample
            </Link>
            <Link href="/privacy" className="text-body text-sm hover:text-[var(--accent)] transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
