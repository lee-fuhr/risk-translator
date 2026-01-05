'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mark as paid in localStorage
    localStorage.setItem(`paid-${id}`, 'true');

    // Navigate to results
    router.push(`/results/${id}`);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <h1 className="text-3xl font-bold mb-8">Complete your purchase</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  We&apos;ll send your analysis here
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Card number</label>
                <input
                  type="text"
                  className="input"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="MM / YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVC</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-lg py-4"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Pay $150'}
              </button>

              <p className="text-xs text-center text-[var(--muted-foreground)]">
                Secure payment processing. Your data is encrypted.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card sticky top-8">
              <h2 className="text-xl font-bold mb-6">Order summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-[var(--border)]">
                  <span>Risk Translator Analysis</span>
                  <span className="font-semibold">$150</span>
                </div>
                <div className="flex justify-between text-2xl font-bold pt-2">
                  <span>Total</span>
                  <span>$150</span>
                </div>
              </div>

              <div className="bg-[var(--background)] rounded-lg p-4 space-y-3 text-sm">
                <h3 className="font-semibold">What you&apos;re getting</h3>
                <ul className="space-y-2 text-[var(--muted-foreground)]">
                  <li>✓ Full risk-justified analysis of your specs</li>
                  <li>✓ Cost-of-failure calculations</li>
                  <li>✓ Comparison framework</li>
                  <li>✓ Executive summary for purchasing</li>
                  <li>✓ Instant download</li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <h3 className="font-semibold mb-3">Money-back guarantee</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  If the risk-justified analysis doesn&apos;t help you get your specs approved, we&apos;ll refund your payment. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center">
            <p>Loading checkout...</p>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
