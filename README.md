# Anthropic APAC Enterprise CSM Dashboard

A production-grade demonstration application showcasing enterprise customer success management for Anthropic's AI product portfolio (Claude API, Claude Enterprise, Claude Code) across the APAC region.

**Live Demo:** [https://anthropic-csm-demo.vercel.app](https://anthropic-csm-demo.vercel.app)

## Overview

This dashboard demonstrates deep understanding of:
- Multi-product AI portfolio management
- Enterprise SaaS metrics and customer health scoring
- APAC regional market dynamics and time zone considerations
- Strategic account planning and expansion opportunity identification

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Charts | Recharts |
| Routing | React Router v6 |
| State | Zustand |
| Build | Vite |
| Deployment | Vercel |

## Features

### Portfolio Dashboard
- **Key Metrics**: Total ARR, NRR, GRR, Accounts at Risk
- **Health Distribution**: Visual breakdown of account health scores
- **Revenue by Product**: Stacked visualization of Claude API, Enterprise, and Code revenue
- **Recent Activity**: Timeline of customer interactions

### Accounts Management
- **Filterable List**: Search, filter by tier, health status, country, product
- **Sortable Columns**: ARR, health score, renewal date
- **Health Indicators**: Color-coded badges (Green/Yellow/Orange/Red)

### Account Detail
- **Overview Tab**: Health score breakdown, contract details, Salesforce integration
- **Usage Tab**: API token consumption, Enterprise seat utilization, Code developer metrics
- **Stakeholder Tab**: Relationship mapping and influence tracking
- **Feature Requests**: Customer feedback pipeline
- **Use Cases**: ROI-documented success stories
- **Expansion**: Pipeline and opportunity tracking
- **QBR Management**: Quarterly business review summaries

### APAC-Specific Features
- Multi-timezone support (JST, SGT, AEDT, IST)
- Regional compliance tracking
- Cultural nuance considerations (Nemawashi process, relationship-building)

## Sample Accounts

**Strategic Tier ($500K+ ARR):**
- Commonwealth Bank of Australia (Sydney) - $850K
- DBS Bank (Singapore) - $950K
- Samsung Electronics (Seoul) - $1.2M
- Tokopedia (Jakarta) - $720K

**Enterprise Tier ($300-500K ARR):**
- Atlassian (Sydney) - $480K
- Grab (Singapore) - $520K
- Rakuten (Tokyo) - $410K
- Telstra (Melbourne) - $380K
- HCL Technologies (Noida) - $350K

**Growth Tier ($100-300K ARR):**
- Canva (Sydney) - $180K
- GoJek (Jakarta) - $220K
- Seek (Melbourne) - $150K
- REA Group (Melbourne) - $190K

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Header, MainLayout
│   ├── dashboard/       # Portfolio metrics components
│   ├── accounts/        # Account list components
│   └── account-detail/  # Account detail tab components
├── data/
│   └── accounts/        # Mock account data
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and calculations
├── pages/               # Route pages
└── types/               # TypeScript interfaces
```

## Key Metrics Explained

**NRR (Net Revenue Retention):** Measures revenue retention including expansion
- Formula: (Starting ARR + Expansion - Contraction - Churn) / Starting ARR
- Target: 115-120%

**GRR (Gross Revenue Retention):** Measures revenue retention excluding expansion
- Formula: (Starting ARR - Contraction - Churn) / Starting ARR
- Target: >90%

**Health Score:** Weighted composite (0-100)
- Product Usage: 30%
- Engagement: 25%
- Business Outcomes: 20%
- Support Health: 15%
- Relationship Strength: 10%

## Development

This project uses:
- **Vite** for fast HMR and builds
- **TypeScript** for type safety
- **Tailwind CSS v4** with the new Vite plugin
- **shadcn/ui** for accessible UI components
- **Recharts** for data visualization

## License

MIT - For demonstration purposes only.

---

Built as a demonstration of enterprise customer success management expertise for Anthropic APAC.
