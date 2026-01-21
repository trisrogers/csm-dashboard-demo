# Anthropic APAC CSM Dashboard - Demo Guide

A walkthrough of key features demonstrating enterprise customer success management capabilities.

**Live Demo:** [https://anthropic-csm-demo.vercel.app](https://anthropic-csm-demo.vercel.app)

---

## Quick Tour (5 minutes)

### 1. Portfolio Dashboard (`/`)

The dashboard provides a comprehensive view of your APAC portfolio:

**Key Metrics Strip**
- **Total ARR**: Combined annual recurring revenue across all accounts ($5.8M+)
- **Net Revenue Retention (NRR)**: 117% - showing healthy expansion
- **Gross Revenue Retention (GRR)**: 95% - low churn
- **Accounts at Risk**: Quick count of accounts needing attention

**Health Distribution Chart**
- Donut chart showing account distribution by health status
- Green (80-100), Yellow (60-79), Orange (40-59), Red (<40)

**Revenue by Product**
- Stacked visualization showing Claude API, Enterprise, and Code revenue
- Demonstrates multi-product portfolio management

**Recent Activity**
- Timeline of recent customer interactions
- Quick access to engagement history

---

### 2. Accounts List (`/accounts`)

**Filtering & Search**
- Search by company name
- Filter by:
  - Health status (Healthy, At Risk, Critical)
  - Account tier (Strategic, Enterprise, Growth)
  - Country (Australia, Singapore, Japan, etc.)
  - Product (Claude API, Claude Enterprise, Claude Code)

**Sortable Columns**
- Click column headers to sort by ARR, Health Score, or Renewal Date
- Health badges color-coded for quick scanning

**Click any account** to view detailed information.

---

### 3. Account Detail (Example: Commonwealth Bank)

#### Overview Tab
- **Key Metrics**: ARR, NRR, health score, days to renewal
- **Health Score Breakdown**: Radar chart showing 5 components
  - Product Usage (30%)
  - Engagement (25%)
  - Business Outcomes (20%)
  - Support Health (15%)
  - Relationship Strength (10%)
- **Contract Details**: Product mix, pricing, terms
- **Tasks**: Action items with priority indicators

#### Usage Tab
- **API Metrics**: Token consumption, model breakdown, MoM growth
- **Enterprise Metrics**: Seat utilization gauge, DAU/MAU, feature adoption
- **Code Metrics**: Active developers, sessions, language distribution
- **Usage Heatmap**: Activity by day/hour (APAC timezone aware)

#### Stakeholders Tab
- **Org Chart View**: Decision makers and influencers
- **Relationship Map**: Champion/Supporter/Neutral/Blocker indicators
- **Interaction Timeline**: Recent touchpoints with each contact

#### Feature Requests Tab
- **Pipeline View**: Status tracking (New → Under Review → Planned → Shipped)
- **Priority Indicators**: Customer impact assessment
- **Anthropic Response**: How feature requests are being addressed

#### Use Cases Tab
- **Success Stories**: Documented implementations
- **ROI Metrics**: Quantified business outcomes
- **Departments**: Cross-functional adoption visibility

#### Expansion Tab
- **Pipeline Funnel**: Opportunities by stage
- **AI Suggestions**: Usage-pattern-based expansion recommendations
- **Deal Details**: Value, probability, timeline

#### QBR Tab
- **Quarterly Reviews**: Historical QBR summaries
- **Preparation Checklist**: Interactive pre-QBR tasks
- **Auto-Generated Report**: Metrics-driven executive summary

---

### 4. Analytics (`/analytics`)

**Portfolio Analysis**
- ARR by country distribution
- Health score trends over time
- Product adoption matrix
- NRR cohort analysis

**Regional Insights**
- APAC-specific metrics
- Timezone-aware engagement patterns
- Compliance status overview

---

### 5. Settings (`/settings`)

**Configuration Display**
- Profile: CSM identity and role
- Notifications: Alert preferences
- Regional: Timezone and locale
- Security: SSO/MFA status
- Integrations: Salesforce, Slack, API connections
- Display: Theme and density preferences

---

## Key Scenarios to Demonstrate

### Scenario A: Identifying At-Risk Accounts
1. Start on Dashboard → Note "Accounts at Risk" metric
2. Navigate to Accounts → Filter by "At Risk" health status
3. Click into an at-risk account
4. Review Health Score Breakdown → Identify weak components
5. Check Tasks for remediation actions

### Scenario B: Preparing for QBR
1. Navigate to Account Detail → QBR Tab
2. Review preparation checklist
3. Click "Generate Preview" to see auto-generated report
4. Review key metrics and talking points
5. Check Stakeholders tab for attendee profiles

### Scenario C: Expansion Opportunity Review
1. Navigate to Account Detail → Expansion Tab
2. Review pipeline funnel
3. Note AI-generated suggestions based on usage patterns
4. Cross-reference with Usage tab for supporting data
5. Check Stakeholders for champions to engage

### Scenario D: Multi-Product Account Analysis
1. From Accounts list, find an account with multiple products
2. Navigate to Usage tab
3. Compare metrics across Claude API, Enterprise, and Code
4. Note cross-product adoption patterns
5. Identify expansion opportunities

---

## APAC-Specific Features

- **Multi-Timezone Display**: All times shown with timezone indicators
- **Regional Accounts**: Real APAC companies (CBA, DBS, Samsung, etc.)
- **Cultural Considerations**: Nemawashi process notes, relationship emphasis
- **Compliance Tracking**: Regional data residency and compliance status

---

## Technical Notes

- All data is mock/demonstration data
- Settings do not persist (static display)
- No authentication required
- Optimized for 1920x1080 resolution, responsive down to 1280x720

---

*Built as a demonstration of enterprise CSM capabilities for Anthropic APAC*
