# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Anthropic APAC Enterprise CSM Dashboard** - a production-grade demonstration application showcasing enterprise customer success management. It's designed to demonstrate deep understanding of:

- Multi-product AI portfolio management (Claude API, Claude Enterprise, Claude Code)
- Enterprise SaaS metrics and customer health scoring
- APAC regional market dynamics and time zone considerations
- Strategic account planning and expansion opportunity identification

**Purpose:** Demonstration application for an Anthropic APAC Enterprise CSM role application

**Key Users:**
- Enterprise Customer Success Managers managing 8-12 strategic APAC accounts
- APAC Regional Leadership tracking portfolio-level KPIs and performance

## Architecture Overview

### Technology Stack

**Frontend:**
- React 18+ with TypeScript
- Tailwind CSS with shadcn/ui components
- Recharts or Chart.js for data visualization
- React Router v6 for routing
- React Context API or Zustand for state management
- React Hook Form + Zod for form handling

**Backend/Data:**
- Mock implementation (JSON Server or MSW) - no real backend required
- Faker.js for realistic dummy data generation
- Browser localStorage or IndexedDB for client-side persistence

**Deployment:**
- Frontend: Vercel, Netlify, or GitHub Pages
- Target URL: anthropic-csm-demo.vercel.app (or similar)

### Data Model

Core entities:
- **Account** - Customer companies with tier (Strategic/Enterprise/Growth), health score, ARR, contracts, products
- **Stakeholder** - Company contacts with relationship mapping (Champion/Supporter/Neutral/Blocker)
- **UsageData** - Product consumption metrics for Claude API, Claude Enterprise, Claude Code
- **Interaction** - Logged activities (meetings, calls, emails) with topics and action items
- **Opportunity** - Expansion deals in pipeline with probability and stage
- **FeatureRequest** - Customer feature requests tracked with Anthropic response
- **UseCase** - Documented success stories with quantified business outcomes

See the PRD (anthropic-csm-dashboard-prd.md) section 7.2 for detailed TypeScript schemas.

### Key Metrics & Calculations

**Portfolio-Level KPIs:**
- **NRR (Net Revenue Retention):** (Starting ARR + Expansion - Contraction - Churn) / Starting ARR
  - Target: 115-120% (SaaS industry benchmark)
- **GRR (Gross Revenue Retention):** (Starting ARR - Contraction - Churn) / Starting ARR
  - Target: >90%
- **Health Score:** Weighted composite (0-100):
  - Product Usage: 30%
  - Engagement: 25%
  - Business Outcomes: 20%
  - Support Health: 15%
  - Relationship Strength: 10%
- **Expansion Pipeline:** Identified upsell/cross-sell opportunities by stage (Identified, Qualified, Proposal, Negotiation)

**Account-Level Metrics:**
- ARR (Annual Recurring Revenue)
- Account-level NRR
- Health score breakdown by component
- Days to next renewal
- Usage metrics by product

### Dummy Data

**10-12 Strategic APAC Accounts:**

**Strategic Tier (4):**
- Commonwealth Bank of Australia (Financial, Sydney) - $850K ARR
- Tokopedia (E-commerce, Jakarta) - $720K ARR
- Samsung Electronics (Technology, Seoul) - $1.2M ARR
- DBS Bank (Financial, Singapore) - $950K ARR

**Enterprise Tier (5):**
- Atlassian (Software, Sydney) - $480K ARR
- Grab (Technology, Singapore) - $520K ARR
- Rakuten (E-commerce, Tokyo) - $410K ARR
- Telstra (Telecom, Melbourne) - $380K ARR
- HCL Technologies (IT Services, Noida) - $350K ARR

**Growth Tier (4):**
- Canva (Software, Sydney) - $180K ARR
- GoJek (Technology, Jakarta) - $220K ARR
- Seek (Job Platform, Melbourne) - $150K ARR
- REA Group (PropTech, Melbourne) - $190K ARR

**Data Characteristics:**
- Health mix: 2-3 red (<60), 3-4 yellow (60-79), 5-6 green (80-100)
- Product mix variety: API-only, Enterprise-only, multi-product accounts
- Different expansion stages and contract renewal dates
- Regional distribution: Australia 40%, Singapore 20%, Japan 15%, South Korea 10%, Indonesia 10%, Malaysia 5%
- Maturity stages: New (<6mo), Growing (6-18mo), Mature (18+mo)

## Feature Implementation Guide

### Phase 1: MVP (Core CSM Workflows)
1. **Dashboard:** Portfolio overview with key metrics (ARR, NRR, Health Score, Accounts at Risk)
2. **Accounts List:** Filterable table with sorting, searching
3. **Account Detail Page:** Single showcase account (Commonwealth Bank) with core tabs
4. **Mock Salesforce Integration:** Display account data with SF logos
5. **Usage Metrics:** Basic Claude API, Enterprise, Code usage visualizations
6. **Health Score:** Breakdown by 5 components with sparkline trends
7. **Tasks/Next Steps:** Simple list for account action items
8. **Deploy:** Live URL accessible

### Phase 2: Enhanced Features
- Complete data for all 10-12 accounts
- Stakeholder directory with org charts
- Feature requests pipeline
- Use case documentation with ROI calculations
- Expansion opportunities tracker
- QBR management with auto-generated summaries
- Analytics/Reports section with cohort analysis

### Phase 3: Polish
- Professional UI/UX refinement
- Comprehensive realistic scenarios in dummy data
- Regional APAC map visualization
- Demo walkthrough script
- Landing page explaining demo context

## Critical Implementation Notes

### Regional Considerations (APAC-Specific)
1. **Time Zone Management:**
   - Display meeting times with multiple APAC zones (JST, SGT, AEDT, IST, etc.)
   - Track "peak engagement times" by region
   - Include time zone in stakeholder profiles

2. **Cultural Nuances to Reflect:**
   - Nemawashi (consensus-building) process steps for Japanese accounts
   - Relationship-building importance (in-person visits, dinners tracked)
   - Stakeholder hierarchy and influence mapping
   - Preferred communication methods by culture

3. **Regional Compliance:**
   - Note data residency requirements by country
   - Track compliance standards (SOC2, HIPAA, etc.) per account
   - Color-code compliance status (Green/Yellow/Red)
   - Reference https://trust.anthropic.com/ for Anthropic compliance details

### Product Portfolio Details
1. **Claude API** - Consumption-based, tiered by model (Opus 4.5, Sonnet 4.5, Haiku 4.5)
   - Token counting: Input + Output tokens tracked
   - Rate limiting and quota management
   - Error rates and performance metrics
   - Peak usage times by hour (APAC zones matter)

2. **Claude Enterprise** - Seat-based SaaS with Projects, native integrations, Skills
   - Track seat utilization (total vs. active)
   - Monitor feature adoption (Projects, Slack, GitHub, Google Workspace integrations, Skills)
   - Department-level breakdown of users
   - Power user vs. casual user segmentation

3. **Claude Code** - Developer tool with VM environments, Git integration
   - Developer metrics: sessions/week, languages used, repository integration
   - Productivity: lines of code, tests written, time saved estimates

### Mock Salesforce Integration
- Don't attempt real API connection
- Use realistic JSON structures matching Salesforce schema
- Label all SF data with Salesforce logo
- Show Account Owner, Account Executive from mock SF data
- Opportunity stages: Prospecting → Qualification → Proposal → Negotiation → Closed
- Include mock SF record links for drill-through

### Health Score Calculation
Weighted composite of 5 components (see architecture section above):
- Calculate monthly, track 12-month trend
- Auto-generate AI-like insights: "Health declining due to 35% API usage drop and missed QBR"
- Visual: Radial/spider chart showing component breakdown
- Trigger alerts when health drops >10 points

### QBR (Quarterly Business Review) Management
Auto-generate QBR reports pulling:
- Usage trends
- Health score changes
- Business outcomes achieved
- Upcoming expansion opportunities
- Executive summary with key metrics
- Exportable as PDF/PPTX

## Design Standards

### Visual Hierarchy
- Data density over whitespace (enterprise software style)
- Clear color coding: Green=healthy, Yellow=stable, Orange=at-risk, Red=critical
- Colorblind-friendly palettes
- Metric cards with large readable numbers, trend indicators (↑↓), sparklines

### Navigation Structure
**Top Navigation:**
- Logo & App Name
- Dashboard
- Accounts
- Analytics
- Settings
- User Profile dropdown

**Account Detail Tabs:**
- Overview
- Usage & Products
- Revenue & Expansion
- Stakeholders
- Feature Requests
- Use Cases
- Support & Technical
- Plan & Tasks
- QBR

### Responsive Design
- Desktop-first (primary CSM use)
- Tablet support (iPad for executives)
- Mobile-friendly (lower priority)
- Minimum: 1280x720, Optimized: 1920x1080

### Performance Targets
- Initial load: <3 seconds
- Page navigation: <500ms
- Chart rendering: <1 second
- Filter/search: <300ms
- 60fps animations

## Browser Support
- Chrome 100+
- Firefox 100+
- Safari 15+
- Edge 100+

## Build & Development Commands

The actual build/test commands will depend on the final tech setup chosen. Update this section once framework is selected.

**Expected commands (typical React setup):**
```bash
npm install              # Install dependencies
npm start               # Start dev server
npm run build           # Production build
npm test                # Run tests
npm run lint            # Lint code
npm run format          # Format code
```

## Deployment

Deployed as static frontend (no backend server required):
- Vercel: Connect GitHub repo for auto-deployment on push
- Environment: Production URL should be accessible publicly
- Data: All mock data generated client-side

## Testing Strategy

- Realistic dummy data for all 10-12 accounts
- Cross-browser testing on supported browsers
- Responsive design testing on tablet/desktop
- Performance profiling (ensure <3s initial load)
- All charts and filters working correctly
- Mock API responses match expected schema

## Documentation & Deliverables

**Required:**
1. **README.md** - Project overview, tech stack, setup, architecture, live demo link
2. **DEMO_GUIDE.md** - Feature walkthrough with key user flows
3. **TECHNICAL_DECISIONS.md** - Architecture choices and trade-offs

**Demo Presentation:**
- One-page PDF summary linking to live URL
- Reference in job application

## Key Success Criteria

✅ All core CSM workflows represented (account management, health scoring, pipeline tracking)
✅ Realistic APAC company data with regional considerations
✅ Professional enterprise UI meeting industry standards
✅ Working mock Salesforce integration
✅ All visualizations and filters functional
✅ Demonstrates deep understanding of Enterprise CSM role
✅ Deployed and publicly accessible
✅ Clean, TypeScript codebase with component reusability

## Code Organization Best Practices

- Keep components small and focused (single responsibility)
- Use context/state management for global data (health scores, filters)
- Separate concerns: UI components, data layer, utilities
- Consistent naming: CamelCase for components, camelCase for functions
- Type all React props with TypeScript
- Mock data generation separate from component code

## Notes for Future Development

- APAC regional nuances (time zones, compliance, cultural considerations) must be explicitly coded, not assumed
- Health score calculations are core - test thoroughly
- Dummy data should feel real: realistic use case descriptions, actual APAC company names/contexts
- QBR generation is complex - prioritize accuracy of metrics pulled in
- Stakeholder relationship mapping is key CSM differentiator - invest in good visualization
- Performance matters for CSMs managing multiple accounts simultaneously
