# Product Requirements Document
## Anthropic APAC Enterprise CSM Dashboard & Tracker

**Version:** 1.0  
**Date:** January 21, 2026  
**Author:** Tristan Rogers 
**Purpose:** Demonstration application for Anthropic APAC Enterprise CSM role application

---

## Executive Summary

The Anthropic APAC Enterprise CSM Dashboard is a comprehensive web application designed to demonstrate enterprise customer success management capabilities for AI product portfolios across the Asia-Pacific-Japan region. This demo application showcases the strategic, operational, and analytical skills required for an Enterprise CSM role by providing real-time visibility into customer health, usage patterns, revenue metrics, and relationship management across a portfolio of high-value enterprise accounts.

The application serves two primary user personas:
1. **Enterprise Customer Success Manager** - Managing day-to-day account health, engagement, and expansion
2. **Anthropic Regional Leadership** - Strategic oversight of portfolio performance, KPI tracking, and resource allocation

---

## Product Vision & Goals

### Vision Statement
Create a production-quality demonstration of enterprise customer success management tooling that reflects deep understanding of:
- Multi-product AI portfolio management (Claude API, Claude Enterprise, Claude Code)
- APAC regional market complexity and cultural considerations
- Enterprise SaaS metrics and customer health scoring
- Strategic account planning and expansion opportunity identification

### Primary Goals
1. **Demonstrate CSM competency** through realistic feature set reflecting actual enterprise customer success workflows
2. **Showcase technical capability** with modern web technologies and data visualization
3. **Reflect regional expertise** through APAC-specific company examples and market considerations
4. **Prove analytical skills** with meaningful KPI tracking and health scoring models

### Success Metrics for Demo Application
- Comprehensive feature coverage of CSM responsibilities
- Realistic dummy data reflecting actual APAC enterprise customers
- Professional UI/UX meeting enterprise software standards
- Functional integrations demonstrating technical understanding (Salesforce mock, usage APIs)

---

## User Personas

### Primary Persona: Enterprise CSM (You)
**Background:** 5-7 years enterprise customer success experience, technical fluency with APIs and LLMs, APAC regional expertise

**Goals:**
- Monitor health across 8-12 strategic enterprise accounts
- Identify expansion opportunities and at-risk accounts proactively
- Track engagement, product adoption, and customer outcomes
- Manage complex stakeholder relationships across technical and business buyers
- Document customer interactions, feature requests, and next steps
- Prepare for Quarterly Business Reviews with data-driven insights

**Pain Points:**
- Context switching between multiple tools (CRM, usage analytics, support tickets)
- Difficulty quantifying customer ROI and business outcomes
- Tracking feature requests across accounts to influence product roadmap
- Managing time zones and relationship cadences across APAC region

### Secondary Persona: APAC Regional Leadership
**Background:** Director/VP Customer Success overseeing APAC CSM team and portfolio

**Goals:**
- Portfolio-level visibility into health, retention risk, and expansion pipeline
- KPI tracking against targets (NRR, GRR, expansion %, customer health)
- Resource allocation decisions based on account tier and risk
- Regional performance reporting to global leadership
- Identify patterns across accounts to inform strategy

---

## Core Features & Requirements

## 1. Dashboard (Home Page) - Executive Overview

### 1.1 Portfolio Summary Cards
**Requirements:**
- **Total ARR** - Current annual recurring revenue across all accounts
- **Net Revenue Retention (NRR)** - Trailing 12 months, target 115-120%
- **Gross Revenue Retention (GRR)** - Trailing 12 months, target >90%
- **Expansion Pipeline** - Identified upsell/cross-sell opportunities in $
- **Average Customer Health Score** - Portfolio-wide health (0-100 scale)
- **Accounts at Risk** - Count of accounts with health score <60

**Visual Design:**
- Large metric cards with current value, trend indicator (↑↓), and sparkline showing 6-month and 12-month trends
- Color coding: Green (healthy/on-target), Yellow (warning), Red (critical)
- Click-through to filtered views of underlying accounts

### 1.2 Regional Performance Map
**Requirements:**
- Interactive APAC map showing customer distribution by country
- Bubble size represents ARR, color represents health score
- Countries: Australia, Singapore, Japan, South Korea, Brunei, Malaysia, New Zealand, Thailand, Vietnam, Indonesia,
- Tooltip shows: Company name, ARR, health score, primary product
- Click-through to country-filtered account list

### 1.3 Account Health Distribution
**Requirements:**
- Visual breakdown of accounts by health tier:
  - **Healthy (80-100):** Green - Strong engagement, expanding
  - **Stable (60-79):** Yellow - Solid but not growing
  - **At Risk (40-59):** Orange - Warning signs present
  - **Critical (<40):** Red - Immediate intervention needed
- Chart types: Donut chart with count/ARR per segment
- Ability to click into each segment to see accounts

### 1.4 Revenue Metrics
**Requirements:**
- **Monthly Recurring Revenue (MRR) Trend** - 12-month line chart
- **ARR by Product** - Stacked bar: Claude API, Claude Enterprise, Claude Code
- **Expansion vs. Contraction** - Waterfall chart showing monthly expansion, contraction, churn
- **Revenue Concentration** - Top 5 accounts by ARR with % of total portfolio

### 1.5 Engagement & Activity Feed
**Requirements:**
- Recent customer interactions across all accounts (last 30 days)
- Activity types: Meetings, QBRs, Support Escalations, Feature Requests, Expansion Discussions
- Filter by: Account, Activity Type, Date Range, CSM Owner
- Quick action buttons: Log new activity, Schedule follow-up

### 1.6 KPI Scorecard
**Requirements:**
- Target vs. Actual for key metrics:
  - NRR Target: 115% | Actual: [calculated]
  - GRR Target: 92% | Actual: [calculated]
  - Expansion Target: $2M quarterly | Actual: [calculated]
  - Customer Health Target: 75 average | Actual: [calculated]
  - QBR Completion: 100% quarterly | Actual: [calculated]
- Visual progress bars with RAG status
- Quarterly and annual views

---

## 2. Accounts List View

### 2.1 Filterable Account Table
**Requirements:**
- **Columns:**
  - Company Name & Logo
  - Health Score (colored indicator + numeric)
  - ARR (current)
  - NRR (account-level, trailing 12mo)
  - Primary Product(s)
  - Country/Region
  - Account Tier (Strategic, Enterprise, Growth)
  - CSM Owner
  - Last Interaction Date
  - Next QBR Date
  - Status Tags (Expanding, Stable, At Risk, In Renewal)

**Filters:**
- Health Score range
- ARR range
- Country/Region multi-select
- Product multi-select
- Account Tier
- CSM Owner
- Status Tags
- Sort by any column

**Actions:**
- Click row to open Account Detail Page
- Bulk actions: Schedule QBR, Export to CSV, Tag accounts
- Quick view modal showing summary without full navigation

### 2.2 Account Prioritization View
**Requirements:**
- Alternative view optimizing for CSM daily prioritization
- Sorted by: Health Score × ARR (risk-weighted prioritization)
- Shows: Top 5 actions needed per account
- Quick links: Schedule meeting, Log interaction, View usage data

---

## 3. Account Detail Page (Individual Customer)

### 3.1 Account Overview Header
**Requirements:**
- **Company Information:**
  - Company logo, name, industry, employee count
  - Headquarters location, primary APAC offices
  - Website link, LinkedIn company page
  - Account tier badge (Strategic/Enterprise/Growth)
  
- **Relationship Summary:**
  - Primary stakeholders with roles and last contact date
  - Customer lifecycle stage (Onboarding, Adoption, Expansion, Renewal)
  - Contract details: Start date, renewal date, term length
  - CSM owner with photo and contact info

- **Key Metrics Summary:**
  - Current ARR with MoM/YoY growth %
  - Account-level NRR
  - Health Score with trend (↑↓) and last calculated date
  - Days to next renewal

### 3.2 Health Score Breakdown
**Requirements:**
- **Overall Health Score (0-100)** - Weighted composite metric
- **Component Scores:**
  - Product Usage (30% weight): API calls, active users, feature adoption
  - Engagement (25% weight): Meeting frequency, QBR completion, response times
  - Business Outcomes (20% weight): Documented ROI, use case success
  - Support Health (15% weight): Ticket volume, escalations, resolution satisfaction
  - Relationship Strength (10% weight): Stakeholder engagement, champion presence

- Visual: Radial/spider chart showing each component
- Trend: 12-month line chart of overall health
- AI-generated insights: "Health declining due to reduced API usage (-35% MoM) and missed last QBR"

### 3.3 Product Usage & Consumption

#### 3.3.1 Claude API Usage
**Requirements:**
- **Token consumption metrics:**
  - Total tokens (input + output) - daily, weekly, monthly views
  - Tokens by model: Claude Opus 4.5, Sonnet 4.5, Haiku 4.5
  - Cost per model tier
  - Average tokens per request
  - Peak usage times (by hour/day) - important for APAC time zones

- **API performance:**
  - Request volume and error rates
  - Latency percentiles (p50, p95, p99)
  - Rate limit usage (% of quota)

- **Usage patterns:**
  - Use cases identified from API metadata (summarization, code generation, analysis, etc.)
  - Department/team breakdown if multi-user API keys
  - Growth trend: Month-over-month usage change

**Visuals:**
- Line chart: Token usage over time with model breakdown
- Heatmap: Usage by day-of-week and hour (APAC time zones)
- Bar chart: Top use cases by volume

#### 3.3.2 Claude Enterprise Usage
**Requirements:**
- **Seat utilization:**
  - Total seats purchased vs. active users
  - Active users (last 30 days): Daily active users (DAU), Monthly active users (MAU)
  - Department breakdown of users
  - Power users vs. casual users

- **Feature adoption:**
  - Projects usage: # created, avg collaborators, active projects
  - Native integrations: Which enabled (Slack, GitHub, Google Workspace, etc.), usage frequency
  - Skills adoption: # skills configured, usage frequency
  - Knowledge base documents uploaded

- **Collaboration metrics:**
  - Messages sent per user
  - Shared projects and cross-department collaboration
  - Most used integrations

**Visuals:**
- Gauge chart: Seat utilization %
- Stacked area: Active users over time by department
- Bar chart: Feature adoption rates

#### 3.3.3 Claude Code Usage
**Requirements:**
- **Developer metrics:**
  - Active developers using Claude Code
  - Coding sessions per week
  - Languages used (Python, JavaScript, Go, etc.)
  - Tool / Integrations used.
  - Repository integrations (GitHub, GitLab, Bitbucket)

- **Productivity metrics:**
  - Code generated (lines, functions, files)
  - Tests written/executed
  - Documentation generated
  - Time saved estimates

**Visuals:**
- Bar chart: Sessions per developer
- Pie chart: Language distribution
- Line chart: Productivity trend

### 3.4 Revenue & Commercial Tracking

#### 3.4.1 Revenue Timeline
**Requirements:**
- Historical ARR over customer lifetime
- Expansion events: Date, $ amount, product/feature added, reason
- Contraction events: Date, $ reduced, reason
- Payment history: Invoice dates, amounts, payment status
- Renewal history: Past renewals with % change

**Visual:**
- Waterfall or area chart showing ARR evolution with annotations for major events

#### 3.4.2 Current Contracts & Licenses
**Requirements:**
- **Active contracts table:**
  - Product/SKU
  - Quantity (API tokens committed, seats, Claude Code licenses)
  - Unit price
  - Total value
  - Start date / End date
  - Auto-renewal status

- **Purchased features/add-ons:**
  - Extended context (1M tokens)
  - Zero Data Retention
  - Dedicated support
  - Custom integration support
  - Training credits

- **Commitment tracking:**
  - Minimum commit vs. actual usage (for consumption-based)
  - Overage charges (if applicable)
  - True-up projections for annual commits

#### 3.4.3 Expansion Opportunities
**Requirements:**
- **Identified opportunities:**
  - Opportunity name/description
  - Product(s) involved
  - Estimated ARR value
  - Probability (%)
  - Expected close date
  - Stage (Identified, Qualified, Proposal, Negotiation)
  - Champion stakeholder
  - Next steps

- **Expansion playbooks:**
  - Suggested expansions based on usage patterns:
    - "API usage exceeding commit by 40% - propose tier upgrade"
    - "Only 3 departments using Enterprise - expand to Marketing & Legal"
    - "Developers using API for code tasks - introduce Claude Code"

- **Cross-sell opportunities:**
  - If only API → Claude Enterprise for business users
  - If only Enterprise → Claude Code for developers
  - Feature add-ons based on use cases (extended context for document analysis)

**Visual:**
- Pipeline funnel showing opportunities by stage
- Table with sort/filter capabilities

### 3.5 Stakeholder Management (CRM Integration)

#### 3.5.1 Stakeholder Directory
**Requirements:**
- **Contact information:**
  - Name, photo (if available), title, department
  - Email, phone, LinkedIn profile
  - Location/office, time zone
  - Preferred communication method

- **Relationship metadata:**
  - Relationship strength (Champion, Supporter, Neutral, Blocker)
  - Influence level (High, Medium, Low)
  - Technical vs. Business stakeholder
  - Decision-making authority
  - Last contact date and method (email, call, meeting)
  - Next scheduled interaction

- **Engagement history:**
  - Timeline of interactions (meetings, emails, events)
  - Topics discussed
  - Action items from meetings
  - Sentiment tracking (Positive, Neutral, Negative)

**Visual:**
- Stakeholder map: Influence/Support matrix positioning stakeholders
- Timeline view of interactions
- Org chart view showing relationships

#### 3.5.2 Interaction Log
**Requirements:**
- **Logged interactions:**
  - Date/time with time zone
  - Type (Meeting, Call, Email, Event)
  - Participants (internal & customer)
  - Duration
  - Summary/notes
  - Topics/tags (Technical Support, Feature Request, QBR, Expansion, Renewal)
  - Action items with owners and due dates
  - Attachments (meeting notes, presentations)

- **Filters:**
  - Date range
  - Interaction type
  - Participants
  - Topics/tags

- **Quick actions:**
  - Log new interaction
  - Schedule follow-up
  - Email stakeholder (mailto link)
  - Create task from action item

### 3.6 Feature Requests & Product Feedback

**Requirements:**
- **Feature request tracking:**
  - Request title and detailed description
  - Requesting stakeholder and department
  - Date submitted
  - Business case/justification
  - Priority (Critical, High, Medium, Low) - from customer perspective
  - Anthropic priority/status (Planned, Under Review, Not Planned, Shipped)
  - Product team contact assigned
  - Expected delivery (if planned)
  - Workaround (if available)

- **Product feedback categories:**
  - Feature Requests
  - Bug Reports
  - Performance Issues
  - Documentation Gaps
  - Integration Requests
  - UI/UX Improvements

- **Impact tracking:**
  - # of other customers requesting same feature
  - Revenue impact if delivered (expansion potential)
  - Churn risk if not delivered

- **Actions:**
  - Submit new feature request
  - Update status from Product team
  - Link to other accounts with same request
  - Add to QBR agenda

**Visual:**
- Table with status pipeline view
- Tag cloud of common themes

### 3.7 Use Cases & Success Stories

**Requirements:**
- **Documented use cases:**
  - Use case name/title
  - Department/team using
  - Problem being solved
  - Claude product(s) used
  - Implementation details (prompts, integrations, workflow)
  - Users involved
  - Date implemented / Go-live

- **Business outcomes:**
  - Quantified impact:
    - Time saved (hours per week/month)
    - Cost reduction ($)
    - Revenue increase ($)
    - Quality improvement (%)
    - User satisfaction score
  - Qualitative benefits
  - ROI calculation

- **Replicability score:**
  - Potential to expand to other departments
  - Potential to showcase as case study
  - Competitive differentiation value

- **Supporting materials:**
  - Screenshots/demos
  - Customer testimonials/quotes
  - Video walkthrough
  - ROI calculation spreadsheet

**Visual:**
- Card-based layout showcasing use cases
- ROI summary dashboard
- Success metrics charts

### 3.8 Support & Technical Health

**Requirements:**
- **Support ticket metrics:**
  - Open tickets: Count and age
  - Closed tickets (last 90 days): Count and avg resolution time
  - Ticket severity distribution (P0-P3)
  - Escalated tickets: Count and reason
  - CSAT scores from ticket resolution

- **Technical issues:**
  - Recurring issues/patterns
  - API errors or performance degradation
  - Integration problems
  - Configuration issues

- **Technical stakeholder engagement:**
  - Technical calls/workshops held
  - Training sessions completed
  - Office hours participation
  - Developer community engagement

**Visual:**
  - Ticket trend line chart
  - Severity distribution pie chart
  - Resolution time box plot

### 3.8.2 Safety alignment

**Requirements:**
- **Reglatory compliance:**
  - list of Compliance standards required by customer SOC2, HIPA, etc per product.
  - Colour code indication of compliance (Green = Meet, Yellow = In Progress, Red = Not meet)
  - Anthropic compliance details here: https://trust.anthropic.com/

### 3.9 Account Plan & Next Steps

#### 3.9.1 Strategic Account Plan
**Requirements:**
- **Account goals:**
  - Revenue target (next quarter, next year)
  - Product adoption goals
  - Relationship milestones
  - Risk mitigation objectives

- **Account strategy:**
  - Key initiatives to drive adoption/expansion
  - Stakeholder engagement plan
  - Competitive positioning
  - Risk factors and mitigation plans

- **Success criteria:**
  - Measurable outcomes to track
  - Timeline/milestones

#### 3.9.2 Next Steps / Tasks
**Requirements:**
- **Task list:**
  - Task description
  - Owner (CSM, Account Exec, Solutions Architect, etc.)
  - Due date with overdue highlighting
  - Priority (High, Medium, Low)
  - Status (Not Started, In Progress, Blocked, Complete)
  - Related to (e.g., expansion opportunity, feature request, QBR prep)
  - Completion notes

- **Filters/views:**
  - My tasks
  - Overdue tasks
  - This week's tasks
  - By priority
  - By related object (e.g., all tasks for upcoming QBR)

- **Actions:**
  - Create new task
  - Assign/reassign task
  - Mark complete
  - Add subtasks
  - Set reminders

### 3.10 QBR (Quarterly Business Review) Management

**Requirements:**
- **QBR schedule:**
  - Next QBR date and time (with time zone)
  - QBR history: Past dates and materials
  - Preparation status (Not Started, In Progress, Ready)

- **QBR preparation checklist:**
  - [ ] Update health score analysis
  - [ ] Prepare usage/adoption metrics
  - [ ] Calculate ROI/business outcomes
  - [ ] Review feature requests status
  - [ ] Identify expansion opportunities
  - [ ] Draft executive summary
  - [ ] Create presentation deck
  - [ ] Share materials with customer
  - [ ] Confirm attendees

- **QBR content generation:**
  - Auto-generated executive summary pulling from:
    - Usage trends
    - Health score changes
    - Business outcomes achieved
    - Upcoming opportunities
  - Export as PDF or PPTX

- **QBR materials:**
  - Presentation deck (upload/link)
  - Shared agenda
  - Meeting notes template
  - Follow-up action items

**Visual:**
- QBR dashboard showing readiness status
- One-click "Generate QBR Report" pulling all key metrics

---

## 4. Analytics & Reports

### 4.1 Portfolio Analytics
**Requirements:**
- **Cohort analysis:**
  - Customer cohorts by: Onboard date, Industry, Country, Initial product
  - Retention curves by cohort
  - Expansion patterns by cohort
  - Time-to-value by cohort

- **Trend analysis:**
  - Health score trends across portfolio
  - Usage trends by product
  - Engagement trends
  - Revenue growth trajectories

- **Segmentation:**
  - Accounts by tier (Strategic, Enterprise, Growth)
  - Accounts by product mix
  - Accounts by maturity stage
  - High-performing vs. struggling accounts

**Visual:**
- Cohort retention heat map
- Multi-line trend charts
- Scatter plots for segmentation

### 4.2 Expansion Analysis
**Requirements:**
- **Expansion patterns:**
  - Time from initial purchase to first expansion
  - Most common expansion paths (e.g., API → Enterprise)
  - Expansion triggers (usage thresholds, use case success, executive sponsorship)
  - Average expansion deal size

- **Land-and-expand metrics:**
  - Initial deal size vs. current ARR
  - Expansion rate by initial product
  - Cross-sell penetration rates

**Visual:**
- Sankey diagram showing expansion paths
- Scatter plot: Initial ARR vs. Current ARR

### 4.3 Regional Insights
**Requirements:**
- **Country-level analysis:**
  - ARR by country
  - Health scores by country
  - Product preference by country
  - Cultural considerations impacting engagement

- **Time zone impact:**
  - Meeting frequency by region
  - Response time patterns
  - Preferred engagement times

### 4.4 Benchmark Comparisons
**Requirements:**
- **Customer benchmarking:**
  - Usage benchmarks by industry/size
  - Adoption rate benchmarks
  - ROI benchmarks

- **Portfolio benchmarks:**
  - NRR vs. SaaS industry standards (115-120%)
  - Health score distribution vs. best practices
  - Expansion rate vs. targets

---

## 5. CRM Integration (Salesforce Mock)

### 5.1 Salesforce Data Sync
**Requirements:**
- **Mock integration** 
- **Data synced from Salesforce:**
  - Account information (name, industry, location, tier)
  - Contact/stakeholder information
  - Opportunity data (expansion pipeline)
  - Activity history (meetings, calls, emails)
  - Contract/product data

- **Sync indicators:**
  - Last sync timestamp
  - Sync status (success, pending, error)
  - Data freshness indicators

- **Two-way sync scenarios:** EXCLUDE for current version as a mock two-way sync has limited benefit. 
  - Health score updates pushed to Salesforce
  - New opportunities created in CSM tool synced to Salesforce
  - Task/activity logging synced bidirectionally

**Implementation Note:** 
Mock implementation should use realistic JSON data structure matching Salesforce API schema, even if not connecting to live Salesforce instance.

### 5.2 CRM Data Display
**Requirements:**
- Clearly label Salesforce-sourced data with a SF logo
- Display Account Owner, Account Executive assignments from SF
- Show Salesforce record links (mock URLs) for drill-through
- Opportunity stage progression following standard SF stages:
  - Prospecting → Qualification → Proposal → Negotiation → Closed Won/Lost

---

## 6. Settings & Configuration

### 6.1 User Profile
**Requirements:**
- CSM user profile with photo, contact info, role
- Add resume for Tristan Rogers with skills match for the Anthropic CSM role.
- Preferences: Time zone, date format, notification preferences
- Region assignment (APAC)
- Single CSM for initial version. No requirement for multiple CSMs

### 6.2 Account Configuration
**Requirements:**
- Account tier definitions and thresholds
- Health score weightings (ability to adjust component weights)
- Alert thresholds (e.g., health drop >10 points, usage drop >30%)
- NRR/GRR calculation methodology

### 6.3 Notification Preferences
**Requirements:**
- Email/in-app notification toggles for:
  - Health score drops by more than 10 points
  - Renewal approaching (90/60/30 days)
  - Expansion opportunity identified
  - High-priority support ticket
  - Overdue tasks

---

## Technical Requirements

### 7.1 Technology Stack Recommendations

**Frontend:**
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS with shadcn/ui components for professional enterprise UI
- **Charts/Visualization:** Recharts or Chart.js for data visualization
- **Routing:** React Router v6
- **State Management:** React Context API or Zustand (lightweight)
- **Forms:** React Hook Form with Zod validation

**Backend/API:**
- **Option A (Recommended for demo):** JSON Server or MSW (Mock Service Worker) with realistic API responses
- **Option B:** Node.js/Express with in-memory data store
- **Data Generation:** Faker.js for realistic dummy data generation

**Database (Optional):**
- **Local Storage** for persistence in browser (simplest for demo)
- **IndexedDB** for more sophisticated local data management
- **SQLite** if wanting to show SQL knowledge

**Deployment:**
- **Frontend:** Vercel, Netlify, or GitHub Pages
- **Backend (if separate):** Vercel serverless functions or Railway
- **Demo URL:** Custom domain or subdomain (e.g., anthropic-csm-demo.vercel.app)

### 7.2 Data Architecture

**Core Data Entities:**

```typescript
// Account
{
  id: string;
  name: string;
  logo: string;
  industry: string;
  country: string;
  region: string;
  employeeCount: number;
  tier: 'Strategic' | 'Enterprise' | 'Growth';
  healthScore: number;
  arr: number;
  nrr: number;
  contractStart: Date;
  contractEnd: Date;
  csmOwner: string;
  products: Product[];
  stakeholders: Stakeholder[];
  usageData: UsageData;
  // ... additional fields
}

// Stakeholder
{
  id: string;
  accountId: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
  relationshipStrength: 'Champion' | 'Supporter' | 'Neutral' | 'Blocker';
  influenceLevel: 'High' | 'Medium' | 'Low';
  lastContact: Date;
  timezone: string;
}

// UsageData
{
  accountId: string;
  product: 'api' | 'enterprise' | 'code';
  period: string; // YYYY-MM or YYYY-MM-DD
  metrics: {
    tokens?: number;
    requests?: number;
    activeUsers?: number;
    // ... product-specific metrics
  };
}

// FeatureRequest
{
  id: string;
  accountId: string;
  title: string;
  description: string;
  requestedBy: string; // stakeholder ID
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Planned' | 'Under Review' | 'Not Planned' | 'Shipped';
  dateRequested: Date;
  businessCase: string;
}

// Interaction
{
  id: string;
  accountId: string;
  date: Date;
  type: 'Meeting' | 'Call' | 'Email' | 'Event';
  participants: string[]; // stakeholder IDs
  summary: string;
  topics: string[];
  actionItems: ActionItem[];
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

// Opportunity (Expansion)
{
  id: string;
  accountId: string;
  name: string;
  products: string[];
  value: number;
  probability: number;
  stage: 'Identified' | 'Qualified' | 'Proposal' | 'Negotiation';
  expectedCloseDate: Date;
  champion: string; // stakeholder ID
  nextSteps: string;
}
```

### 7.3 Dummy Data Requirements

**APAC Enterprise Companies (Suggested 10-12 accounts):**

**Tier 1 - Strategic Accounts (3-4):**
- **Commonwealth Bank of Australia** (Financial Services, Sydney) - $850K ARR
- **Tokopedia** (E-commerce, Jakarta) - $720K ARR
- **Samsung Electronics** (Technology, Seoul) - $1.2M ARR
- **DBS Bank** (Financial Services, Singapore) - $950K ARR

**Tier 2 - Enterprise Accounts (4-5):**
- **Atlassian** (Software, Sydney) - $480K ARR
- **Grab** (Technology, Singapore) - $520K ARR
- **Rakuten** (E-commerce, Tokyo) - $410K ARR
- **Telstra** (Telecommunications, Melbourne) - $380K ARR
- **HCL Technologies** (IT Services, Noida) - $350K ARR

**Tier 3 - Growth Accounts (3-4):**
- **Canva** (Software, Sydney) - $180K ARR
- **GoJek** (Technology, Jakarta) - $220K ARR
- **Seek** (Job Platform, Melbourne) - $150K ARR
- **REA Group** (PropTech, Melbourne) - $190K ARR

**Data Characteristics:**
- Mix of health scores: 2-3 red (40-59), 3-4 yellow (60-79), 5-6 green (80-100)
- Variety in product mix: Some API-only, some Enterprise-only, some multi-product
- Different expansion stages: Some with active opportunities, some stable, some at renewal
- Regional distribution across Australia (40%), Singapore (20%), Japan (15%), South Korea (10%), Indonesia (10%), Malaysia (5%)
- Different maturity stages: New customers (<6 months), growing (6-18 months), mature (18+ months)

### 7.4 Responsive Design Requirements
- **Desktop-first** (primary use case for CSMs)
- **Tablet support** for executive dashboard on iPad
- **Mobile-friendly views** for key metrics (optional, lower priority)
- Minimum supported resolution: 1280x720
- Optimized for: 1920x1080 (most common enterprise display)

### 7.5 Performance Requirements
- Initial page load: <3 seconds
- Navigation between pages: <500ms
- Chart rendering: <1 second
- Search/filter operations: <300ms
- Smooth 60fps animations and transitions

### 7.6 Browser Support
- Chrome 100+ (primary)
- Firefox 100+
- Safari 15+
- Edge 100+

---

## User Experience & Design

### 8.1 Design Principles
1. **Data density** - Value information density over whitespace
2. **Scannable hierarchy** - Clear visual hierarchy for quick scanning
3. **Consistent patterns** - Reusable components and interaction patterns
4. **Professional aesthetics** - Clean, modern, trustworthy design
5. **Actionable insights** - Every data point should suggest an action

### 8.2 Navigation Structure

**Primary Navigation (Top Bar):**
- Logo + App Name
- Dashboard
- Accounts
- Analytics
- Settings
- User profile dropdown

**Secondary Navigation (Contextual):**
- Account detail page tabs:
  - Overview
  - Usage & Products
  - Revenue & Expansion
  - Stakeholders
  - Feature Requests
  - Use Cases
  - Support
  - Plan & Tasks
  - QBR

### 8.3 Color Palette

**Brand Colors (Anthropic-inspired):**
- Primary: Deep navy/blue (#1E2936 or similar to Anthropic brand)
- Accent: Warm orange/amber (#F59E0B)
- Background: Off-white (#F9FAFB)

**Status Colors:**
- Success/Healthy: Green (#10B981)
- Warning/Stable: Amber (#F59E0B)
- At Risk: Orange (#F97316)
- Critical/Error: Red (#EF4444)
- Neutral: Gray (#6B7280)

**Data Visualization:**
- Use colorblind-friendly palettes
- Consistent color meaning across charts (green=good, red=bad)

### 8.4 Key UI Components

**Metric Cards:**
- Large, readable numbers
- Descriptive labels
- Trend indicators (↑↓ with %)
- Sparklines for historical context
- Click to drill down

**Data Tables:**
- Sortable columns
- Filterable
- Row actions (view, edit, delete)
- Pagination or infinite scroll
- Empty states with helpful messaging

**Charts:**
- Tooltips showing exact values
- Legends
- Axis labels with units
- Responsive sizing
- Export options (PNG, CSV)

**Forms:**
- Clear labels and placeholders
- Validation with helpful error messages
- Save/Cancel actions clearly visible
- Autosave indicators where appropriate

---

## Implementation Phases

### Phase 1: MVP (Core Features) 
**Goal:** Demonstrate understanding of CSM role with essential features

**Deliverables:**
- Dashboard with key portfolio metrics (ARR, NRR, Health Score)
- Accounts list view with filtering
- Single detailed account page (Commonwealth Bank as showcase)
- Mock Salesforce integration showing account data
- Basic usage metrics visualization
- Health score breakdown
- Next steps/tasks list
- Deployed and accessible via URL

### Phase 2: Enhanced Features
**Goal:** Add depth and sophistication

**Deliverables:**
- Complete data for all 10-12 accounts
- Full stakeholder management
- Feature requests tracking
- Use cases documentation
- Expansion opportunities pipeline
- QBR management
- Analytics and reports section
- Regional map visualization

### Phase 3: Polish & Presentation
**Goal:** Production-quality demo ready for application

**Deliverables:**
- Refined UI/UX with professional design
- Smooth interactions and transitions
- Comprehensive dummy data showing realistic scenarios
- Demo script/walkthrough video
- README with technical overview
- Link to GitHub repository (clean, documented code)
- Landing page explaining the demo context

---

## Success Criteria

### Functional Completeness
- [ ] All core CSM workflows represented
- [ ] Realistic dummy data for 10-12 APAC enterprise accounts
- [ ] Working mock Salesforce integration
- [ ] All charts and visualizations rendering correctly
- [ ] Responsive navigation and filtering

### Technical Quality
- [ ] Clean, well-organized code
- [ ] TypeScript for type safety
- [ ] Component reusability
- [ ] Performance benchmarks met
- [ ] Deployed and accessible via public URL
- [ ] GitHub repository with clear README

### Demonstration Value
- [ ] Clearly demonstrates understanding of Enterprise CSM role requirements
- [ ] Showcases APAC regional expertise (companies, time zones, cultural considerations)
- [ ] Reflects actual metrics and KPIs from PRD (NRR, GRR, health scoring)
- [ ] Professional design quality matching enterprise software standards
- [ ] Obvious technical capability and product thinking

### Application Impact
- [ ] Differentiates application from other candidates
- [ ] Demonstrates initiative and commitment
- [ ] Provides concrete talking points for interviews
- [ ] Shows ability to translate requirements into functional product

---

## Open Questions & Future Enhancements

**Open Questions for Refinement:**
1. Should we include a "Competitive Intelligence" section showing competitor displacement opportunities? Not required at this stage.
2. Add customer sentiment analysis from support tickets/interactions using mock AI? Not required. Sentiment analysis is Individual and situational so may not provide accurate insight into the customer account as a whole. ?who can interact with support? Sentiment analysis may be added in the future should the key users for the account be identifiable 
3. Include a "Risk Radar" for proactive churn prediction? Yes, this should be part of the Exec summary page
4. Add team collaboration features (comments, @mentions, shared notes)?

**Future Enhancement Ideas:**
- AI-powered insights: "Next best action" recommendations
- Predictive analytics: Churn probability scoring, expansion likelihood
- Automated QBR report generation with natural language summaries
- Integration with more tools: Slack notifications, Google Calendar for meeting scheduling
- Mobile app mockup for key metrics on-the-go
- Localization for APAC languages (Japanese, Korean, Mandarin)

---

## Documentation & Deliverables

### Required Documentation
1. **README.md** for GitHub repository including:
   - Project overview and purpose
   - Technology stack
   - Setup instructions
   - Architecture overview
   - Demo credentials (if applicable)
   - Link to live demo

2. **DEMO_GUIDE.md** - Walkthrough of key features with screenshots

3. **TECHNICAL_DECISIONS.md** - Explanation of technology choices and trade-offs

### Demo Presentation
- **Video walkthrough** (3-5 minutes) highlighting key features
- **One-pager PDF** summarizing the demo and linking to live URL
- **Application cover letter** referencing the demo as evidence of CSM competency

---

## Appendix: Additional Context

### Enterprise CSM Metrics Reference
- **NRR (Net Revenue Retention):** (Starting ARR + Expansion - Contraction - Churn) / Starting ARR
- **GRR (Gross Revenue Retention):** (Starting ARR - Contraction - Churn) / Starting ARR
- **Health Score Components:** Weighted average of usage, engagement, outcomes, support, relationship
- **Expansion Rate:** Expansion ARR / Total ARR
- **Logo Retention:** % of customers retained (count-based, not revenue)

### APAC Business Culture Notes to Reflect
- **Meeting scheduling:** Include time zone conversions (JST, SGT, AEDT, IST)
- **Relationship building:** Track in-person visits, dinners, relationship milestones
- **Decision-making:** Note consensus-building stages (nemawashi in Japan)
- **Hierarchy:** Stakeholder influence mapping reflects organizational hierarchy
- **Communication style:** Track preferred communication methods by culture

### Anthropic Product Portfolio Details
- **Claude API:** Consumption-based, tiered by model (Opus, Sonnet, Haiku)
- **Claude for Enterprise:** Seat-based SaaS with Projects, integrations, Skills
- **Claude Code:** Developer tool with VM environments, Git integration
- **Add-ons:** Extended context (1M tokens), Zero Data Retention, dedicated support

---

## Contact & Feedback

**Project Owner:** Tristan  
**Purpose:** Demonstration application for Anthropic APAC Enterprise CSM role  
**Timeline:** 2-3 weeks for full implementation  
**Status:** Requirements complete, ready for development with Claude Code

---

## Version History

- **v1.0** (January 21, 2026) - Initial PRD completed
- **Next:** Technical architecture documentation
- **Then:** Sprint 1 development kickoff

---

**END OF PRODUCT REQUIREMENTS DOCUMENT**
