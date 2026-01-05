'use client'

import Link from 'next/link'

export default function SamplePage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-section text-lg text-[var(--foreground)]">
            The Risk Translator
          </Link>
          <Link href="/" className="btn-kinetic text-sm py-2 px-4">
            Translate YOUR specs
          </Link>
        </div>
      </header>

      {/* Sample banner */}
      <section className="py-6 px-6 bg-[var(--accent)]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white text-lg font-semibold mb-2">
            ⚡ FULL SAMPLE REPORT
          </p>
          <p className="text-white/80">
            This is exactly what you get. Real translation of industrial equipment specs.
          </p>
        </div>
      </section>

      {/* Spec header */}
      <section className="py-8 px-6 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-section text-2xl text-[#0A0A0A] mb-2">
            Industrial Control Panel Specifications
          </h1>
          <p className="text-[#525252] text-sm">
            Complete risk-justified translation • 8 specifications analyzed
          </p>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-12 px-6 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-label mb-6">EXECUTIVE SUMMARY</h3>
          <div className="bg-[var(--background)] border-2 border-[var(--border)] p-8">
            <h4 className="text-section text-xl text-[#0A0A0A] mb-4">For Purchasing Decision-Makers</h4>
            <p className="text-[#0A0A0A] text-lg mb-6" style={{fontFamily: 'var(--font-body)'}}>
              This specification package represents <strong>$180,000-$320,000 in quantified risk protection</strong> over a 10-year operational period. The premium over budget alternatives ($8,000-$12,000) is recovered within the first avoided failure event.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--danger)] mb-1">$180K-$320K</p>
                <p className="text-sm text-[#525252]">Total risk exposure mitigated</p>
              </div>
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--success)] mb-1">15-20 yrs</p>
                <p className="text-sm text-[#525252]">Expected service life</p>
              </div>
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--accent)] mb-1">8 specs</p>
                <p className="text-sm text-[#525252]">Risk-justified translations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All translations */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <h3 className="text-label mb-6">COMPLETE RISK TRANSLATIONS</h3>

          {/* Translation 1 - HIGH */}
          <div className="card border-l-4 border-l-[var(--danger)]">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-section text-xl text-[#0A0A0A]">304 stainless steel construction</h4>
              <span className="bg-[var(--danger)]/20 text-[var(--danger)] px-3 py-1 text-sm font-bold">HIGH PRIORITY</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-label mb-1">RISK MITIGATION</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Corrosion resistance prevents premature failure in harsh environments, chemical exposure, and high-humidity conditions. 304 stainless maintains structural integrity for 15-20 years in industrial settings vs. 3-5 years for carbon steel alternatives.
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--danger)]">COST OF FAILURE</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Replacement costs average $12,000-$45,000 depending on installation complexity. Downtime during replacement: 2-5 business days at $5,000/day average. <strong>Total risk exposure: $22,000-$70,000 per failure event.</strong>
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--warning)]">WHY CHEAPER FAILS</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  201/202 stainless steel shows 3x higher failure rates in corrosive environments. Carbon steel requires protective coatings that degrade, adding $2,000-$4,000 in maintenance every 2-3 years.
                </p>
              </div>

              <div className="bg-[var(--muted)] p-4 mt-4">
                <p className="text-label mb-2">TALK TRACK</p>
                <p className="text-[#0A0A0A] italic" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;The stainless construction isn&apos;t about looking nice — it&apos;s about avoiding a $22,000-$70,000 replacement when carbon steel corrodes in 3-5 years. The price difference pays for itself before the first maintenance cycle.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Translation 2 - HIGH */}
          <div className="card border-l-4 border-l-[var(--danger)]">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-section text-xl text-[#0A0A0A]">IP67 waterproof rating</h4>
              <span className="bg-[var(--danger)]/20 text-[var(--danger)] px-3 py-1 text-sm font-bold">HIGH PRIORITY</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-label mb-1">RISK MITIGATION</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Protection against water ingress that accounts for 34% of field failures in this equipment category. Prevents moisture damage to internal components, electrical shorts, and corrosion of sensitive parts.
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--danger)]">COST OF FAILURE</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Water damage repair averages $8,000 per incident plus 3-7 days downtime. Warranty typically void if moisture intrusion detected. <strong>Insurance claims for water damage average $15,000 including business interruption losses.</strong>
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--warning)]">WHY CHEAPER FAILS</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  IP65 rating allows fine dust and low-pressure water jets but fails under sustained spray or immersion scenarios common in real-world use. IP54 alternatives show 5x higher failure rates in outdoor installations.
                </p>
              </div>

              <div className="bg-[var(--muted)] p-4 mt-4">
                <p className="text-label mb-2">TALK TRACK</p>
                <p className="text-[#0A0A0A] italic" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;Water damage is the #1 warranty claim in this category — 34% of field failures. IP67 means we&apos;ve tested this to survive immersion, not just light rain. The warranty stays valid because the protection is real.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Translation 3 - HIGH (was 4) */}
          <div className="card border-l-4 border-l-[var(--danger)]">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-section text-xl text-[#0A0A0A]">UL certified components</h4>
              <span className="bg-[var(--danger)]/20 text-[var(--danger)] px-3 py-1 text-sm font-bold">HIGH PRIORITY</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-label mb-1">RISK MITIGATION</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Independent third-party safety verification. UL certification requires rigorous testing for fire, shock, and mechanical hazards. Meets code requirements for most commercial and industrial installations.
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--danger)]">COST OF FAILURE</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Non-UL equipment can void facility insurance ($50,000+ claims denied). Code violations result in $5,000-$25,000 in remediation costs. <strong>Liability exposure in injury cases: unlimited without proper certification.</strong>
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--warning)]">WHY CHEAPER FAILS</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;CE marked&rdquo; or self-certified alternatives don&apos;t meet US code requirements. Inspector rejection after installation means removal, replacement, and re-inspection fees.
                </p>
              </div>

              <div className="bg-[var(--muted)] p-4 mt-4">
                <p className="text-label mb-2">TALK TRACK</p>
                <p className="text-[#0A0A0A] italic" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;UL certification isn&apos;t optional — it&apos;s what keeps your insurance valid and your inspectors happy. The cheaper option might save $2,000 upfront, but one failed inspection costs $5,000-$25,000 in rework.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Translation 4 - HIGH */}
          <div className="card border-l-4 border-l-[var(--danger)]">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-section text-xl text-[#0A0A0A]">Vibration tested to MIL-STD-810</h4>
              <span className="bg-[var(--danger)]/20 text-[var(--danger)] px-3 py-1 text-sm font-bold">HIGH PRIORITY</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-label mb-1">RISK MITIGATION</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Military-grade vibration testing ensures reliability in high-vibration environments near machinery, HVAC, or vehicle-mounted applications. Verified performance, not marketing claims.
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--danger)]">COST OF FAILURE</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Vibration failures cause component fractures, solder joint failures, and PCB damage — typically requiring full unit replacement. <strong>Vibration-related failures in untested equipment: 23% within first 2 years.</strong>
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--warning)]">WHY CHEAPER FAILS</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;Vibration resistant&rdquo; without MIL-STD certification means untested. Bench-tested equipment fails when installed near real machinery with complex vibration harmonics.
                </p>
              </div>

              <div className="bg-[var(--muted)] p-4 mt-4">
                <p className="text-label mb-2">TALK TRACK</p>
                <p className="text-[#0A0A0A] italic" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;MIL-STD-810 isn&apos;t overkill — it&apos;s the only testing standard that simulates real industrial vibration. Untested alternatives have 23% failure rates in the first two years near heavy machinery.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Translation 5 - MEDIUM */}
          <div className="card border-l-4 border-l-[var(--warning)]">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-section text-xl text-[#0A0A0A]">10-year manufacturer warranty</h4>
              <span className="bg-[var(--warning)]/20 text-[var(--warning)] px-3 py-1 text-sm font-bold">MEDIUM PRIORITY</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-label mb-1">RISK MITIGATION</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Risk transfer: vendor assumes liability for defects, failures, and performance issues over product lifecycle. Protects against premature component failure, manufacturing defects, and design flaws.
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--danger)]">COST OF FAILURE</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Without warranty, unplanned replacement costs fall entirely on buyer. Average out-of-warranty failure occurs at 7-year mark. <strong>Extended warranty worth $15,000-$35,000 in risk protection over product life.</strong>
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--warning)]">WHY CHEAPER FAILS</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  2-3 year warranties signal manufacturer&apos;s lack of confidence in product longevity. Vendors offering short warranties typically undercapitalized and may not exist at failure point.
                </p>
              </div>

              <div className="bg-[var(--muted)] p-4 mt-4">
                <p className="text-label mb-2">TALK TRACK</p>
                <p className="text-[#0A0A0A] italic" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;A 10-year warranty isn&apos;t marketing — it&apos;s a $15,000-$35,000 insurance policy included in the price. When the competitor offers 2 years, ask yourself: what do they know about year 3 that they&apos;re not telling you?&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Translation 5 - MEDIUM */}
          <div className="card border-l-4 border-l-[var(--warning)]">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-section text-xl text-[#0A0A0A]">Temperature range: -40°F to 140°F</h4>
              <span className="bg-[var(--warning)]/20 text-[var(--warning)] px-3 py-1 text-sm font-bold">MEDIUM PRIORITY</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-label mb-1">RISK MITIGATION</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Operational reliability in extreme conditions. Components rated for full range prevent thermal stress failures, condensation damage, and cold-start issues in outdoor or uncontrolled environments.
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--danger)]">COST OF FAILURE</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Temperature-related failures typically catastrophic — full replacement required. Emergency winter repairs: 2x standard labor rates plus expedited shipping. <strong>Average temperature failure costs $18,000-$35,000.</strong>
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--warning)]">WHY CHEAPER FAILS</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Standard components rated 32°F-104°F fail in first cold snap or summer heat wave. &ldquo;Indoor rated&rdquo; equipment installed outdoors has 8x higher failure rate.
                </p>
              </div>

              <div className="bg-[var(--muted)] p-4 mt-4">
                <p className="text-label mb-2">TALK TRACK</p>
                <p className="text-[#0A0A0A] italic" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;This equipment will see -40° in January and 140° inside an enclosure in August. Standard-temp alternatives fail on the first extreme day — and emergency winter repairs cost double.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Translation 6 - MEDIUM */}
          <div className="card border-l-4 border-l-[var(--warning)]">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-section text-xl text-[#0A0A0A]">Industrial-grade connectors</h4>
              <span className="bg-[var(--warning)]/20 text-[var(--warning)] px-3 py-1 text-sm font-bold">MEDIUM PRIORITY</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-label mb-1">RISK MITIGATION</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Vibration-resistant, corrosion-proof connections that maintain signal integrity under harsh conditions. Prevents intermittent failures that cause unpredictable downtime and difficult troubleshooting.
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--danger)]">COST OF FAILURE</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Intermittent connector failures average 4-8 hours troubleshooting time at $150/hr technician rates. False alarms from loose connections: $500-$2,000 per incident. <strong>Annual connector-related costs with cheap alternatives: $3,000-$8,000.</strong>
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--warning)]">WHY CHEAPER FAILS</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Consumer-grade connectors loosen with vibration, corrode with humidity. &ldquo;Gold plated&rdquo; consumer connectors use flash plating that wears through in months.
                </p>
              </div>

              <div className="bg-[var(--muted)] p-4 mt-4">
                <p className="text-label mb-2">TALK TRACK</p>
                <p className="text-[#0A0A0A] italic" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;Those intermittent alarms that take 4 hours to troubleshoot? Usually a $3 connector that loosened from vibration. Industrial connectors cost $15 and never fail. Pick your price.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Translation 8 - MEDIUM */}
          <div className="card border-l-4 border-l-[var(--warning)]">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-section text-xl text-[#0A0A0A]">NEMA 4X rated enclosure</h4>
              <span className="bg-[var(--warning)]/20 text-[var(--warning)] px-3 py-1 text-sm font-bold">MEDIUM PRIORITY</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-label mb-1">RISK MITIGATION</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Complete protection against water (including hose-down), dust, ice, and corrosion. The &ldquo;X&rdquo; designation adds corrosion resistance critical for washdown environments or coastal installations.
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--danger)]">COST OF FAILURE</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  Enclosure breaches expose all internal components to damage. Single water intrusion event typically destroys $5,000-$15,000 in electronics. <strong>Corrosion damage in coastal/chemical environments: $8,000-$25,000 per incident.</strong>
                </p>
              </div>

              <div>
                <p className="text-label mb-1 text-[var(--warning)]">WHY CHEAPER FAILS</p>
                <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  NEMA 1/2/3 enclosures fail in washdown environments. Standard NEMA 4 (without X) corrodes in 1-3 years in salt air or chemical exposure. Aftermarket &ldquo;sealing kits&rdquo; don&apos;t match factory ratings.
                </p>
              </div>

              <div className="bg-[var(--muted)] p-4 mt-4">
                <p className="text-label mb-2">TALK TRACK</p>
                <p className="text-[#0A0A0A] italic" style={{fontFamily: 'var(--font-body)'}}>
                  &ldquo;NEMA 4X means this survives direct hose-down and salt air. Standard enclosures corrode in 1-3 years — then you&apos;re replacing $15,000 in electronics because you saved $800 on the box.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10-Year TCO Comparison */}
      <section className="py-12 px-6 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-label mb-6">10-YEAR TOTAL COST OF OWNERSHIP</h3>
          <div className="bg-[var(--background)] border-2 border-[var(--border)] p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-section text-lg text-[#0A0A0A] mb-4 pb-2 border-b-2 border-[var(--success)]">Premium Specification</h4>
                <div className="space-y-3 text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  <div className="flex justify-between">
                    <span>Purchase price</span>
                    <span className="font-semibold">$18,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected failures (10yr)</span>
                    <span className="font-semibold">0.2 events</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance costs</span>
                    <span className="font-semibold">$2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Downtime costs</span>
                    <span className="font-semibold">$1,500</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[var(--border)] text-lg">
                    <span className="font-bold">10-Year TCO</span>
                    <span className="font-bold text-[var(--success)]">$22,000</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-section text-lg text-[#0A0A0A] mb-4 pb-2 border-b-2 border-[var(--danger)]">Budget Alternative</h4>
                <div className="space-y-3 text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                  <div className="flex justify-between">
                    <span>Purchase price</span>
                    <span className="font-semibold">$10,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected failures (10yr)</span>
                    <span className="font-semibold">2.3 events</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance costs</span>
                    <span className="font-semibold">$12,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Downtime costs</span>
                    <span className="font-semibold">$28,750</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[var(--border)] text-lg">
                    <span className="font-bold">10-Year TCO</span>
                    <span className="font-bold text-[var(--danger)]">$51,250</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-[var(--success)]/10 border border-[var(--success)]/30 text-center">
              <p className="text-[#0A0A0A] text-lg" style={{fontFamily: 'var(--font-body)'}}>
                <strong>Premium specification saves $29,250 over 10 years</strong> — a 133% ROI on the $8,000 price difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[var(--accent)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display text-4xl text-white mb-4">
            Ready to translate YOUR specs?
          </h2>
          <p className="text-white/90 text-xl mb-8">
            Get cost-of-failure math that wins budget approvals.
          </p>
          <Link href="/" className="btn-reversed text-lg">
            Translate my specs →
          </Link>
          <p className="text-white/70 text-sm mt-4">
            Top specs free · No email required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#525252] text-sm" style={{fontFamily: 'var(--font-body)'}}>
            The Risk Translator · Built by <a href="https://leefuhr.com" className="text-[var(--accent)] hover:underline">Lee Fuhr</a> · <Link href="/privacy" className="hover:text-[var(--accent)]">Privacy</Link>
          </p>
        </div>
      </footer>
    </main>
  )
}
