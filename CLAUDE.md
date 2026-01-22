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
- **Live URL:** https://csm-dashboard-demo.vercel.app

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

### Phase 1: MVP (Core CSM Workflows) - COMPLETE
- **Dashboard:** Portfolio metrics (ARR, NRR, GRR, Health Distribution) - IMPLEMENTED
- **Accounts List:** Advanced filtering (tier, health, country, product) - IMPLEMENTED
- **Account Detail Page:** Commonwealth Bank showcase with tabs - IMPLEMENTED
- **Mock Salesforce Integration:** Account Owner, Account Executive display - IMPLEMENTED
- **Usage Metrics:** API, Enterprise, Code consumption visualizations - IMPLEMENTED
- **Health Score:** 5-component breakdown with radar chart - IMPLEMENTED
- **Tasks/Next Steps:** Action items and stakeholder tasks - IMPLEMENTED
- **Deployment Config:** vercel.json for SPA routing - IMPLEMENTED

### Phase 2: Enhanced Features - COMPLETE
- **Complete Mock Data:** All 13 APAC accounts with realistic details - IMPLEMENTED
- **Stakeholders Tab:** Org chart with relationship mapping (Champion/Supporter/Neutral/Blocker) - IMPLEMENTED
- **Feature Requests Tab:** Pipeline tracking (Identified/Qualified/Proposal/Negotiation) - IMPLEMENTED
- **Use Cases Tab:** Success stories with ROI calculations - IMPLEMENTED
- **Expansion Tab:** Opportunity pipeline with funnel visualization - IMPLEMENTED
- **QBR Tab:** Auto-generated quarterly summaries and preparation checklists - IMPLEMENTED
- **Analytics Page:** 8 chart visualizations with comparison tables - IMPLEMENTED

### Phase 3: Polish - COMPLETE
- **Settings Page:** Profile, notifications, regional, security, integrations settings - IMPLEMENTED
- **Professional UI/UX:** Enterprise data-dense layout with Tailwind/shadcn/ui - IMPLEMENTED
- **Realistic Dummy Data:** 13 accounts with varied health, products, regions - IMPLEMENTED
- **Build Verification:** Production build passing successfully - IMPLEMENTED
- **TypeScript Strict Mode:** Full type safety implementation - IMPLEMENTED

### Phase 4: High-Priority Features - COMPLETE
- **Regional Performance Map:** Interactive APAC map with ARR bubble sizing and health coloring - IMPLEMENTED
- **Support & Technical Health Tab:** Support ticket metrics, engagement tracking, severity/category charts - IMPLEMENTED
- **Safety & Compliance Section:** SOC2, ISO27001, GDPR, HIPAA, PCI DSS tracking with regional standards (APRA, MAS) - IMPLEMENTED
- **Strategic Account Plan:** Goals tracking with progress, key initiatives, risk factors, success criteria - IMPLEMENTED
- **Account Prioritization View:** Risk-weighted sorting (Health × ARR), top 5 actions per account - IMPLEMENTED
- **v0.6 Dashboard Enhancements:** Expansion Opportunities card, interactive tasks, department usage stacking - IMPLEMENTED

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

**Implemented with Vite:**
```bash
npm install              # Install dependencies
npm run dev              # Start dev server (Vite with HMR)
npm run build            # Production build (TypeScript + Vite)
npm run preview          # Preview production build locally
npm run lint             # Lint TypeScript and JSX
```

**Build Status:**
- Production build: PASSING
- Output: 999KB minified JS + 51KB minified CSS
- All TypeScript checks pass with strict mode
- Deployed to Vercel with auto-deployment on push
- All APAC map SVG assets loading efficiently

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

## Implementation Status

### Completed
✅ All core CSM workflows represented (account management, health scoring, pipeline tracking)
✅ Realistic APAC company data for 13 accounts with regional considerations
✅ Professional enterprise UI with Tailwind CSS + shadcn/ui
✅ Mock Salesforce integration with account ownership
✅ All visualizations (charts, tables, cards) and filters fully functional
✅ Comprehensive Analytics page with 8 visualizations
✅ Settings page with user preferences
✅ Clean, TypeScript codebase with strict type checking
✅ Production build passing successfully (999KB JS + 51KB CSS)
✅ Deployed to Vercel: https://csm-dashboard-demo.vercel.app
✅ GitHub repository public: https://github.com/trisrogers/csm-dashboard-demo
✅ Regional Performance Map with APAC visualization
✅ Support & Technical Health tracking with metrics
✅ Safety & Compliance section with multi-standard tracking
✅ Strategic Account Planning with goals and initiatives
✅ Account Prioritization by risk-weighted scoring
✅ Comprehensive feature documentation (DEMO_GUIDE.md, TECHNICAL_DECISIONS.md)
✅ Demonstrates deep understanding of Enterprise CSM metrics and APAC dynamics
✅ PRD audit completed (79% coverage of original requirements)

### Next Session Items (if extending)
- Additional APAC region-specific features (Nemawashi process tracking, cultural preferences)
- Export functionality (PDF/PPTX for QBR reports)
- Real data integration patterns (Salesforce, Segment connectors)
- Mobile app companion or responsive mobile improvements
- Advanced forecasting models for expansion pipeline

## Implemented Project Structure

```
src/
├── components/
│   ├── ui/                              # shadcn/ui base components
│   │   ├── button.tsx, card.tsx, badge.tsx, input.tsx, select.tsx, table.tsx, tabs.tsx
│   ├── layout/
│   │   ├── Header.tsx                   # Main navigation
│   │   └── MainLayout.tsx               # Layout wrapper
│   ├── dashboard/
│   │   ├── MetricCard.tsx               # Reusable metric display
│   │   ├── KPIScorecard.tsx             # ARR, NRR, GRR metrics
│   │   ├── HealthDistributionChart.tsx  # Health score distribution
│   │   ├── RevenueByProductChart.tsx    # Product revenue breakdown
│   │   ├── AccountsAtRisk.tsx           # Low health accounts
│   │   ├── RecentActivity.tsx           # Activity timeline
│   │   ├── RegionalMap.tsx              # APAC map with bubble sizing
│   │   └── ExpansionOpportunities.tsx   # Pipeline visualization
│   ├── accounts/
│   │   ├── AccountsTable.tsx            # Filterable, sortable list
│   │   ├── AccountFilters.tsx           # Advanced filters
│   │   ├── HealthScoreBadge.tsx         # Status badges
│   │   └── PrioritizationView.tsx       # Risk-weighted sorting
│   └── account-detail/
│       ├── AccountHeader.tsx            # Profile header
│       ├── HealthScoreBreakdown.tsx     # Radar chart
│       ├── ContractDetails.tsx          # Contract info
│       ├── SalesforceIntegration.tsx    # SF data display
│       ├── UsageTab.tsx                 # Integrated usage
│       ├── ApiUsageMetrics.tsx          # Token consumption
│       ├── EnterpriseUsageMetrics.tsx   # Seat utilization
│       ├── CodeUsageMetrics.tsx         # Developer metrics
│       ├── StakeholdersTab.tsx          # Org chart
│       ├── FeatureRequestsTab.tsx       # Feature pipeline
│       ├── UseCasesTab.tsx              # Success stories
│       ├── ExpansionTab.tsx             # Opportunities
│       ├── SupportTab.tsx               # Support health metrics
│       ├── ComplianceCard.tsx           # Compliance standards
│       ├── StrategicPlan.tsx            # Account goals/initiatives
│       ├── InteractionTimeline.tsx      # Activity history
│       ├── QBRTab.tsx                   # Business reviews
│       └── TasksList.tsx                # Action items
├── data/
│   ├── accounts/
│   │   ├── commonwealth-bank.ts         # Showcase account
│   │   └── index.ts                     # All 13 accounts
│   └── generators/
│       ├── stakeholder-generator.ts     # Random stakeholders
│       ├── usage-generator.ts           # Usage metrics
│       └── interaction-generator.ts     # Activity logs
├── hooks/
│   └── useAccountFilters.ts             # Filter state management
├── lib/
│   ├── calculations.ts                  # NRR, GRR, health scoring
│   └── utils.ts                         # Formatting utilities
├── pages/
│   ├── Dashboard.tsx
│   ├── Accounts.tsx
│   ├── AccountDetail.tsx
│   ├── Analytics.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── types/
│   └── index.ts                         # TypeScript interfaces
├── App.tsx                              # Router config
└── main.tsx                             # Entry point
```

## Code Organization Best Practices Implemented

- Components keep single responsibility (MetricCard, HealthScoreBadge, etc.)
- Zustand for global state management (filters, account selection)
- Clear separation: UI components, data layer (generators + static data), utilities
- Consistent naming: CamelCase for components, camelCase for functions
- All React props fully typed with TypeScript strict mode
- Mock data generation separated from components
- Reusable utility functions in lib/ directory

## Notes for Future Development

- APAC regional nuances (time zones, compliance, cultural considerations) must be explicitly coded, not assumed
- Health score calculations are core - test thoroughly
- Dummy data should feel real: realistic use case descriptions, actual APAC company names/contexts
- QBR generation is complex - prioritize accuracy of metrics pulled in
- Stakeholder relationship mapping is key CSM differentiator - invest in good visualization
- Performance matters for CSMs managing multiple accounts simultaneously
