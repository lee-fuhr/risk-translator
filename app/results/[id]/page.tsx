'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface RiskAnalysis {
  spec: string;
  riskMitigation: string;
  costOfFailure: string;
  whyCheaperFails: string;
  severity: 'high' | 'medium' | 'low';
}

export default function Results() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isPaid, setIsPaid] = useState(false);
  const [analyses, setAnalyses] = useState<RiskAnalysis[]>([]);

  useEffect(() => {
    // Check if paid
    const paid = localStorage.getItem(`paid-${id}`);
    if (!paid) {
      router.push(`/preview/${id}`);
      return;
    }

    setIsPaid(true);

    // Mock full analysis
    const fullAnalyses: RiskAnalysis[] = [
      {
        spec: '304 stainless steel construction',
        riskMitigation: 'Corrosion resistance prevents premature failure in harsh environments, chemical exposure, and high-humidity conditions. 304 stainless maintains structural integrity for 15-20 years in industrial settings vs. 3-5 years for carbon steel alternatives.',
        costOfFailure: 'Replacement costs average $12,000-$45,000 depending on installation complexity. Downtime during replacement: 2-5 business days at $5,000/day average. Total risk exposure: $22,000-$70,000 per failure event.',
        whyCheaperFails: '201/202 stainless steel shows 3x higher failure rates in corrosive environments. Carbon steel requires protective coatings that degrade, adding $2,000-$4,000 in maintenance every 2-3 years. Initial savings of $3,000-$5,000 evaporate within first replacement cycle.',
        severity: 'high'
      },
      {
        spec: 'IP67 waterproof rating',
        riskMitigation: 'Protection against water ingress that accounts for 34% of field failures in this equipment category. Prevents moisture damage to internal components, electrical shorts, and corrosion of sensitive parts. Maintains operation in washdown environments and outdoor installations.',
        costOfFailure: 'Water damage repair averages $8,000 per incident plus 3-7 days downtime. Warranty typically void if moisture intrusion detected. Insurance claims for water damage average $15,000 including business interruption losses.',
        whyCheaperFails: 'IP65 rating allows fine dust and low-pressure water jets but fails under sustained spray or immersion scenarios common in real-world use. IP54 alternatives show 5x higher failure rates in outdoor installations. Gap between IP65 and IP67 represents $8,000-$15,000 in preventable damage.',
        severity: 'high'
      },
      {
        spec: '10-year manufacturer warranty',
        riskMitigation: 'Risk transfer: vendor assumes liability for defects, failures, and performance issues over product lifecycle. Protects against premature component failure, manufacturing defects, and design flaws. Vendor financial stability ensures warranty remains valid throughout term.',
        costOfFailure: 'Without warranty, unplanned replacement costs fall entirely on buyer. Average out-of-warranty failure occurs at 7-year mark, requiring full unit replacement at current market prices (typically 15-20% higher than original purchase). Self-insurance cost: $2,000-$5,000 annually.',
        whyCheaperFails: '2-3 year warranties signal manufacturer\'s lack of confidence in product longevity. Vendors offering short warranties typically undercapitalized and may not exist at failure point. Extended warranty worth $15,000-$35,000 in risk protection over product life.',
        severity: 'medium'
      },
      {
        spec: 'UL certified components',
        riskMitigation: 'Compliance with electrical safety standards required for insurance coverage and regulatory approval. Third-party validation reduces liability exposure. Prevents electrical fires, shock hazards, and equipment damage from component failures.',
        costOfFailure: 'Insurance claims denied without UL certification, exposing company to full liability (average: $50,000-$250,000 for electrical fire incidents). Regulatory fines for non-compliant equipment: $5,000-$25,000. Premium increases for inadequate safety measures: 15-30% annually.',
        whyCheaperFails: 'Non-certified components void insurance policies and create unquantified liability. "CE marked" or "meets UL standards" language is not equivalent to UL certification. Self-certification carries zero third-party validation. Risk exposure: $50,000-$250,000 per incident.',
        severity: 'medium'
      },
      {
        spec: 'Temperature range: -40°F to 140°F',
        riskMitigation: 'Operational continuity across extreme weather conditions. Prevents thermal shutdowns, component degradation from temperature cycling, and brittleness failures in cold conditions. Maintains performance in unconditioned spaces and outdoor installations.',
        costOfFailure: 'Thermal-related failures average 2-3 per year in equipment with inadequate range, at $1,500-$3,000 per service call. Seasonal downtime: 5-15 days annually in regions with temperature extremes. Lost productivity: $8,000-$20,000 annually.',
        whyCheaperFails: 'Standard 32°F to 100°F equipment fails in real-world conditions. Cold-weather failures spike in winter months (Nov-Feb). Heat-related shutdowns common in summer peak (June-Aug) in non-climate-controlled environments. Annual failure costs exceed initial equipment savings within 2-3 years.',
        severity: 'low'
      }
    ];

    setAnalyses(fullAnalyses);
  }, [id, router]);

  const handleDownload = () => {
    alert('Download functionality would generate a PDF of this analysis');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isPaid) {
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">Risk-justified analysis</h1>
            <p className="text-xl text-[var(--muted-foreground)]">
              Your technical specifications translated into purchasing-approved language
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={handlePrint} className="btn btn-secondary">
              Print
            </button>
            <button onClick={handleDownload} className="btn btn-primary">
              Download PDF
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="card mb-12 bg-gradient-to-br from-[var(--muted)] to-[var(--background)]">
          <h2 className="text-2xl font-bold mb-6">Executive summary</h2>
          <div className="space-y-4 text-[var(--muted-foreground)]">
            <p>
              This specification represents a risk-managed approach that reduces total cost of ownership by 40% over the product lifecycle compared to lower-cost alternatives.
            </p>
            <p>
              The technical requirements outlined address the five highest-frequency failure modes in this equipment category, collectively representing $100,000-$400,000 in preventable costs over a 10-year operational period.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Key risk mitigations:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Material specification prevents $22,000-$70,000 in corrosion-related failures</li>
              <li>Environmental protection eliminates $8,000-$15,000 in water damage exposure</li>
              <li>Warranty coverage transfers $15,000-$35,000 in replacement risk to vendor</li>
              <li>Safety certification maintains insurance coverage and regulatory compliance</li>
              <li>Temperature range ensures operational continuity across all climate conditions</li>
            </ul>
            <p className="pt-4 text-[var(--foreground)] font-semibold">
              Initial cost premium: $8,000-$12,000<br />
              Risk-adjusted savings: $100,000-$400,000 over 10 years<br />
              ROI: 833% to 3,333%
            </p>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-8 mb-12">
          <h2 className="text-3xl font-bold">Detailed risk analysis</h2>

          {analyses.map((analysis, index) => (
            <div
              key={index}
              className="card border-l-4"
              style={{
                borderLeftColor:
                  analysis.severity === 'high'
                    ? 'var(--danger)'
                    : analysis.severity === 'medium'
                    ? 'var(--warning)'
                    : 'var(--success)'
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl font-bold">{analysis.spec}</h3>
                <span
                  className={`badge ${
                    analysis.severity === 'high'
                      ? 'badge-danger'
                      : analysis.severity === 'medium'
                      ? 'badge-warning'
                      : 'badge-success'
                  }`}
                >
                  {analysis.severity.toUpperCase()} PRIORITY
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[var(--accent)] mb-2">Risk mitigation</h4>
                  <p className="text-[var(--muted-foreground)]">{analysis.riskMitigation}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--danger)] mb-2">Cost of failure</h4>
                  <p className="text-[var(--muted-foreground)]">{analysis.costOfFailure}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--warning)] mb-2">Why cheaper alternatives fail</h4>
                  <p className="text-[var(--muted-foreground)]">{analysis.whyCheaperFails}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Framework */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold mb-6">Comparison framework</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4">Criteria</th>
                  <th className="text-left py-3 px-4">This specification</th>
                  <th className="text-left py-3 px-4">Lower-cost alternative</th>
                  <th className="text-left py-3 px-4">10-year impact</th>
                </tr>
              </thead>
              <tbody className="text-[var(--muted-foreground)]">
                <tr className="border-b border-[var(--border)]">
                  <td className="py-3 px-4">Initial cost</td>
                  <td className="py-3 px-4">$35,000</td>
                  <td className="py-3 px-4 text-[var(--success)]">$23,000</td>
                  <td className="py-3 px-4">-</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-3 px-4">Corrosion failures</td>
                  <td className="py-3 px-4 text-[var(--success)]">0-1 events</td>
                  <td className="py-3 px-4 text-[var(--danger)]">3-5 events</td>
                  <td className="py-3 px-4 text-[var(--danger)]">+$66,000-$210,000</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-3 px-4">Water damage</td>
                  <td className="py-3 px-4 text-[var(--success)]">Protected</td>
                  <td className="py-3 px-4 text-[var(--danger)]">2-3 incidents</td>
                  <td className="py-3 px-4 text-[var(--danger)]">+$16,000-$45,000</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-3 px-4">Warranty coverage</td>
                  <td className="py-3 px-4 text-[var(--success)]">10 years</td>
                  <td className="py-3 px-4 text-[var(--warning)]">2 years</td>
                  <td className="py-3 px-4 text-[var(--danger)]">+$15,000-$35,000</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-3 px-4">Insurance impact</td>
                  <td className="py-3 px-4 text-[var(--success)]">No change</td>
                  <td className="py-3 px-4 text-[var(--danger)]">+15-30% premium</td>
                  <td className="py-3 px-4 text-[var(--danger)]">+$8,000-$18,000</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-4 px-4 text-[var(--foreground)]">Total 10-year cost</td>
                  <td className="py-4 px-4 text-[var(--success)]">$35,000-$50,000</td>
                  <td className="py-4 px-4 text-[var(--danger)]">$128,000-$331,000</td>
                  <td className="py-4 px-4 text-[var(--success)]">Save $93,000-$281,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">How to use this analysis</h2>
          <div className="space-y-4 text-[var(--muted-foreground)]">
            <p>
              <strong className="text-[var(--foreground)]">1. Share the executive summary</strong> with purchasing managers and decision-makers who need the high-level business case.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">2. Reference specific risk mitigations</strong> when questions arise about individual specifications or cost premiums.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">3. Use the comparison framework</strong> to show total cost of ownership vs. lower-cost alternatives.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">4. Print or download</strong> this analysis as supporting documentation for your purchase requisition.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center gap-4 mt-12">
          <button onClick={handlePrint} className="btn btn-secondary">
            Print analysis
          </button>
          <button onClick={handleDownload} className="btn btn-primary">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
