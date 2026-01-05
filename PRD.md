# Risk Translator - Product Requirements Document

**Last updated:** 2025-12-31
**Version:** 1.0.0
**Status:** Planning

---

## Overview

Turn technical specs into risk-justified decisions that purchasing managers approve. Upload specs, AI translates into cost-of-failure language. $150 one-time payment.

Target customers: Engineers and project managers who spec the right solution technically but can't get it past purchasing departments.

---

## User Flow

```
Landing page (/)
  → Upload/paste technical specs
  → Processing page (/processing?id=X)
    → Analyzes specs, identifies risk gaps
  → Preview page (/preview/[id])
    → FREE: Risk gap analysis, severity levels (high/medium/low)
    → LOCKED: Full risk-justified translations, cost-of-failure calculations
  → Purchase ($150)
  → Results page (/results/[id])
    → Download risk-justified spec document (PDF)
```

---

## Pages

### Landing (`/`)
- Hero: "Turn your technical specs into risk-justified decisions that purchasing managers approve"
- Problem: Technical superiority doesn't win without business justification
- Solution: Translate specs into risk language
- Upload/paste text area
- Before/after examples
- Price: $150 (gets 1 spec approved = infinite ROI)
- Sample translation

**Uses shared:**
- None (custom landing page)

**Custom:**
- SpecInput component (upload or paste)
- RiskBeforeAfter examples

### Processing (`/processing?id=X`)
- Text analysis progress
- Risk detection
- Checklist:
  - Analyzing specifications
  - Identifying risk factors
  - Calculating cost-of-failure scenarios
  - Generating risk-justified translations
  - Creating comparison framework

**Uses shared:**
- ✓ ProcessingPage (text input variant)
- ✓ ProcessingProgress
- ✓ ProcessingChecklist
- ✓ AnimatedCounter (specs analyzed)

**Custom:**
- Text analysis status

### Preview (`/preview/[id]`)
- Sidebar nav (4 views: Overview, Risk gaps, Translations, Comparison)
- Overview: Risk gap score, what's missing
- Risk gaps view (partial): Shows severity levels (teaser)
- Translations view (locked): Full risk-justified versions
- Comparison view (locked): vs. cheaper alternatives
- Unlock CTA: "Get full translations for $150"

**Uses shared:**
- ✓ AuditLayout (4-view structure)
- ✓ SidebarNav
- ✓ LockedFindings (adapted for risk translations)
- ✗ ScoreModal (using custom risk severity visualization)
- ✓ viewIcons (need custom: gaps, translations, comparison)

**Custom:**
- RiskGapScore component
- RiskSeverityIndicator (high/medium/low)
- RiskTranslationCard
- 4-view structure

### Results (`/results/[id]`)
- Full access to all views
- Download risk-justified spec document (PDF)
- Executive summary for purchasing
- Cost-of-failure calculations
- Comparison framework

**Uses shared:**
- ✓ AuditLayout
- ✓ SidebarNav
- ✓ viewIcons

**Custom:**
- DownloadPDF button
- RiskTranslationDisplay
- ComparisonFramework

### Sample (`/sample`)
- Pre-populated risk translation
- Shows full results (unlocked)
- "Translate your specs" CTA

**Uses shared:**
- Same as results page

**Custom:**
- Hardcoded sample data (304 stainless, IP67, 10-year warranty)

---

## Shared Component Matrix

| Component | Used | Customization |
|-----------|------|---------------|
| ProcessingPage | ✓ | Text input variant (paste specs) |
| AuditLayout | ✓ | 4-view structure (Overview, Gaps, Translations, Comparison) |
| SidebarNav | ✓ | Using as-is |
| LockedFindings | ✓ | Adapted for risk translations |
| ScoreModal | ✗ | Using custom RiskSeverityVisualization |
| AnimatedCounter | ✓ | For specs analyzed count |
| viewIcons | Partial | Need custom icons: gaps, translations, comparison |
| ProcessingProgress | ✓ | Using as-is |
| ProcessingStatus | ✓ | Using as-is |
| ProcessingChecklist | ✓ | Custom checklist items |
| getCommodityScore* | ✗ | N/A (using risk severity instead) |
| formatHostname | ✗ | N/A |

---

## Tool-Specific Components

### Custom Components Needed

1. **SpecInput**
   - Text area for pasting specs
   - File upload (PDF, TXT)
   - Example spec button

2. **RiskGapScore**
   - Shows how many specs lack risk justification
   - Severity breakdown (high/medium/low)
   - Visual indicator

3. **RiskSeverityIndicator**
   - High: Red (critical risk if cheaper alternative fails)
   - Medium: Yellow (notable risk)
   - Low: Gray (minor risk)

4. **RiskTranslationCard**
   - Original spec
   - Risk-justified translation
   - Cost-of-failure calculation
   - Why cheaper alternatives fail
   - Copy button

5. **ComparisonFramework**
   - Your spec vs. cheaper alternative
   - Risk comparison table
   - Cost-of-failure scenarios

6. **RiskBeforeAfter**
   - Example transformations
   - Used in landing page

---

## Scoring System

**Risk Severity (NOT a 0-100 score)**

Each spec is categorized by risk level:

| Severity | Label | Meaning |
|----------|-------|---------|
| High | Critical risk | Failure could cost $15K-$70K |
| Medium | Notable risk | Failure could cost $5K-$15K |
| Low | Minor risk | Failure could cost <$5K |

**Risk Gap Analysis:**
- Count of specs lacking risk justification
- Severity distribution
- Total potential cost-of-failure

---

## Integration Notes

**Shared library version:** 1.0.0

**Estimated integration:** 14-18 hours
- Implement text input flow: 3h
- Integrate ProcessingPage with text variant: 2h
- Adapt AuditLayout for 4-view structure: 2h
- Create RiskSeverityIndicator components: 3h
- Build RiskTranslationCard component: 3h
- Implement PDF export: 4h
- Testing and cleanup: 3h

**Dependencies:**
- None - builds on patterns from website-audit
- May need ProcessingPage text input variant added to shared library
- Need to add risk severity visualization to shared library (different from commodity score)

---

## API Endpoints

### POST `/api/analyze`
**Input:** `{ specs: string }` (pasted text or extracted from upload)
**Output:** `{ success: boolean, analysisId: string, error?: string }`

Starts spec analysis.

### GET `/api/analyze?id={id}`
**Output:**
```json
{
  "success": boolean,
  "analysis": {
    "status": "pending|analyzing|translating|complete|failed",
    "progress": number,
    "message": string,
    "specsAnalyzed": number
  }
}
```

Polls for analysis progress.

### GET `/api/results/[id]`
**Output:** Full risk translation + download link

Returns risk-justified translations.

---

## Example Transformations

**Before:** "304 stainless steel"
**After:** "Corrosion resistance preventing $22,000-$70,000 in replacement costs over 10 years"

**Before:** "IP67 rating"
**After:** "Protection against water damage that has caused $8,000-$15,000 in warranty claims industry-wide"

**Before:** "10-year warranty"
**After:** "Risk transfer: vendor assumes liability for failures, protecting against $15,000-$35,000 in unplanned replacement costs"

---

## Changelog

### 1.0.0 (2025-12-31)
- Initial PRD documenting integration with shared component library
- Defined 4-view risk translation structure
- Established risk severity categorization (not commodity score)
- Defined cost-of-failure framework
