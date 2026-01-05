# Risk Translator

Turn technical specs into risk-justified decisions that purchasing managers approve.

## Product Overview

**Hook:** "Turn your technical specs into risk-justified decisions that purchasing managers approve"

**Price:** $147 one-time payment

**Core Problem:**
- Engineers know what's right technically but can't get it past purchasing
- Purchasing sees "expensive" not "risk mitigation"
- The competitor's cheaper option looks the same on paper
- Technical superiority doesn't win without business justification

**Solution:**
Transforms technical specifications into risk-justified language that purchasing departments understand and approve.

## Key Features

### Free Preview
- Analyzes uploaded specs
- Identifies risk gaps (what's missing from justification)
- Shows severity levels (high/medium/low)

### Paid Analysis ($147)
- Full risk-justified translations for each spec
- Cost-of-failure calculations with industry data
- Comparison framework (vs. cheaper alternatives)
- Executive summary for purchasing managers
- Downloadable PDF format

## Example Transformations

**Before:** "304 stainless steel"
**After:** "Corrosion resistance preventing $22,000-$70,000 in replacement costs over 10 years"

**Before:** "IP67 rating"
**After:** "Protection against water damage that has caused $8,000-$15,000 in warranty claims industry-wide"

**Before:** "10-year warranty"
**After:** "Risk transfer: vendor assumes liability for failures, protecting against $15,000-$35,000 in unplanned replacement costs"

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- React 19
- Dark theme design system

## Getting Started

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

Server runs on http://localhost:3004

### Build

```bash
npm run build
npm start
```

## Pages

1. **Landing (`/`)** - Upload specs, paste text, or use example
2. **Processing (`/processing?id=[id]`)** - Analysis animation
3. **Preview (`/preview/[id]`)** - Free preview showing risk gaps
4. **Checkout (`/checkout?id=[id]`)** - Payment page ($147)
5. **Results (`/results/[id]`)** - Full risk-justified analysis
6. **Test (`/test`)** - QA dashboard with test flows

## User Flows

### Complete Purchase Flow
1. Landing → upload/paste specs
2. Processing → analysis animation
3. Preview → see risk gaps (free)
4. Checkout → enter payment
5. Results → view full analysis

### Preview-Only Flow
1. Landing → upload/paste specs
2. Processing → analysis animation
3. Preview → see risk gaps
4. Leave without purchasing

## QA Dashboard

Access `/test` for:
- Quick test data loading
- Simulated paid access
- Links to all pages
- Complete flow testing
- QA checklist

### Quick Actions
- **Load test data** - Populates localStorage with sample specs
- **Mark as paid** - Simulates completed payment
- **Clear all data** - Resets all test data

## Data Storage

Currently uses `localStorage` for demo purposes:
- `spec-{id}` - Stores submitted specifications
- `paid-{id}` - Tracks payment status

For production, replace with:
- Database for spec storage
- Stripe for payment processing
- Real AI for risk analysis

## Mock Analysis Engine

The current version uses hardcoded risk analysis for demo purposes. Each spec is analyzed for:
- Risk mitigation value
- Cost of failure scenarios
- Why cheaper alternatives fail
- Severity classification

Replace with real AI analysis in production.

## Design System

### Colors (CSS Variables)
- `--background`: #0a0a0a
- `--foreground`: #ededed
- `--card`: #1a1a1a
- `--border`: #333
- `--primary`: #3b82f6
- `--danger`: #ef4444
- `--warning`: #f59e0b
- `--success`: #10b981

### Components
- `.btn` - Button base styles
- `.btn-primary` - Primary CTA button
- `.btn-secondary` - Secondary button
- `.card` - Card container with hover states
- `.input` / `.textarea` - Form inputs
- `.badge` - Status badges
- `.risk-high/medium/low` - Risk severity indicators

## Next Steps for Production

1. **Payment Integration**
   - Add Stripe checkout
   - Webhook for payment confirmation
   - Email delivery of results

2. **AI Analysis**
   - Replace mock data with real AI
   - Industry-specific risk databases
   - Customizable cost calculations

3. **Database**
   - Store user submissions
   - Save generated analyses
   - Enable re-access with purchase code

4. **PDF Generation**
   - Server-side PDF creation
   - Professional formatting
   - Email delivery

5. **Marketing**
   - SEO optimization
   - Landing page A/B testing
   - Example spec library

## License

Proprietary - Lee Fuhr Inc
