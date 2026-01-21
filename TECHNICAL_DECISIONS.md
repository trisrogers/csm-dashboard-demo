# Technical Decisions

This document explains the key architectural and technical decisions made in building the Anthropic APAC CSM Dashboard.

---

## Framework & Build

### Vite + React 18 + TypeScript

**Decision:** Use Vite as the build tool with React 18 and TypeScript.

**Rationale:**
- **Vite** provides extremely fast HMR (Hot Module Replacement) and build times compared to webpack-based tools like CRA
- **React 18** offers improved concurrent rendering and automatic batching
- **TypeScript** provides type safety critical for enterprise applications with complex data models

**Trade-offs:**
- Requires more upfront type definition work
- Team must be TypeScript-literate
- Worth it for: catching bugs at compile time, better IDE support, self-documenting code

---

## Styling

### Tailwind CSS v4 + shadcn/ui

**Decision:** Use Tailwind CSS v4 with the new Vite plugin, combined with shadcn/ui components.

**Rationale:**
- **Tailwind v4** uses a new oxide engine with better performance and simplified configuration
- **@tailwindcss/vite** plugin eliminates the need for PostCSS configuration
- **shadcn/ui** provides accessible, unstyled component primitives that we customize with Tailwind
- Components are copied into our codebase (not imported from npm), giving full control

**Implementation Details:**
```
src/components/ui/  → shadcn/ui components (button, card, badge, etc.)
src/index.css       → CSS import for Tailwind and CSS variable theming
```

**Trade-offs:**
- Larger HTML with utility classes
- Worth it for: rapid development, consistent design, easy customization

---

## Routing

### React Router v6

**Decision:** Use React Router v6 for client-side routing.

**Rationale:**
- Industry standard for React applications
- v6 provides improved nested routing and data loading patterns
- Small bundle size impact

**Route Structure:**
```
/               → Dashboard (portfolio overview)
/accounts       → Accounts list (filterable table)
/accounts/:id   → Account detail (tabbed interface)
/analytics      → Analytics page (charts and insights)
/settings       → Settings page (configuration display)
```

---

## Data Visualization

### Recharts

**Decision:** Use Recharts for all charts and visualizations.

**Rationale:**
- React-native library (not a wrapper around D3)
- Declarative component API matches React patterns
- Good TypeScript support
- Smaller bundle than alternatives like Victory or Nivo
- Sufficient for our needs (bar, pie, line, radar, composed charts)

**Implementation:**
- All charts use responsive containers
- Consistent color palette across visualizations
- Custom tooltips for detailed hover information

**Trade-offs:**
- Less flexible than D3 for custom visualizations
- Worth it for: faster development, maintainable code, consistent styling

---

## State Management

### React Context + Local Component State

**Decision:** Use React Context for global state (accounts data) and local state for component-specific needs.

**Rationale:**
- Application is read-only (mock data), so complex state management (Redux, Zustand) is unnecessary
- Context provides sufficient data sharing without boilerplate
- Keeps the codebase simple and focused

**Implementation:**
- `AccountsContext` provides portfolio data to all components
- Filter state managed locally in `Accounts.tsx`
- Tab state managed locally in `AccountDetail.tsx`

**When to upgrade:** If the app needed write operations (creating accounts, updating health scores), Zustand would be the recommended next step.

---

## Data Layer

### Generator Functions for Mock Data

**Decision:** Use TypeScript generator functions to create realistic mock data.

**Rationale:**
- Generates contextual data based on account properties (industry, country, health)
- Produces consistent, deterministic data for demos
- Easier to maintain than large JSON files
- Type-safe from the start

**Generator Structure:**
```
src/data/generators/
├── stakeholder-generator.ts  → Industry/country-specific stakeholders
├── usage-generator.ts        → Health-correlated usage patterns
└── interaction-generator.ts  → Interactions, tasks, QBRs, etc.
```

**Key Pattern:**
```typescript
// Stakeholders are generated based on industry
const getIndustryRoles = (industry: string): StakeholderRole[] => {
  if (industry.includes('Financial')) {
    return ['CTO', 'Head of AI', 'Chief Data Officer', ...]
  }
  // ...
}
```

---

## File Organization

### Feature-Based Structure

**Decision:** Organize code by feature/domain rather than by type.

**Structure:**
```
src/
├── components/
│   ├── ui/              → Reusable shadcn/ui components
│   ├── layout/          → App shell (Header, MainLayout)
│   ├── dashboard/       → Dashboard-specific components
│   ├── accounts/        → Account list components
│   └── account-detail/  → Account detail tab components
├── data/
│   ├── accounts/        → Account definitions
│   └── generators/      → Data generation utilities
├── hooks/               → Custom React hooks
├── lib/                 → Utilities and calculations
├── pages/               → Route-level page components
└── types/               → TypeScript interfaces
```

**Rationale:**
- Related files are co-located
- Easy to find components by feature area
- Scales well as application grows

---

## Type System

### Comprehensive TypeScript Interfaces

**Decision:** Define explicit interfaces for all data structures.

**Key Types:**
```typescript
// Core account with all related data
interface Account {
  id: string
  name: string
  tier: 'Strategic' | 'Enterprise' | 'Growth'
  healthScore: number
  // ... and related entities
  stakeholders: Stakeholder[]
  usageHistory: UsageData[]
  interactions: Interaction[]
}
```

**Rationale:**
- Catches type errors at compile time
- Self-documenting code
- Better IDE autocomplete
- Refactoring safety

---

## Health Score Calculation

### Weighted Component Model

**Decision:** Calculate health scores as weighted average of 5 components.

**Formula:**
```typescript
const weights = {
  productUsage: 0.30,      // 30%
  engagement: 0.25,        // 25%
  businessOutcomes: 0.20,  // 20%
  supportHealth: 0.15,     // 15%
  relationshipStrength: 0.10  // 10%
}
```

**Rationale:**
- Matches industry best practices for customer health scoring
- Product usage is highest weight because it directly indicates value realization
- Allows drill-down into specific components for root cause analysis

**Implementation:** `src/lib/calculations.ts`

---

## WSL Development

### Linux Filesystem Cache

**Decision:** Configure Vite to use `/tmp` for cache directory.

**Rationale:**
- WSL + Dropbox combination causes EACCES permission errors
- Windows filesystem access from WSL has inherent limitations
- Moving cache to native Linux filesystem eliminates the issue

**Configuration:**
```typescript
// vite.config.ts
export default defineConfig({
  cacheDir: '/tmp/vite-cache-csm-dashboard',
  // ...
})
```

---

## Deployment

### Vercel with SPA Configuration

**Decision:** Deploy as static site to Vercel with SPA routing.

**Configuration (`vercel.json`):**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [{ "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }]
}
```

**Rationale:**
- Automatic deployments on git push
- Excellent global CDN performance
- Free tier sufficient for demo
- SPA rewrites ensure React Router works on page refresh

---

## Performance Considerations

### Bundle Size

**Metrics:**
- JavaScript: ~925KB (uncompressed), ~280KB gzipped
- CSS: ~36KB (uncompressed), ~7KB gzipped

**Optimizations:**
- Tree-shaking removes unused code
- Dynamic imports could be added for route-based code splitting
- Recharts is the largest dependency; could lazy-load charts if needed

### Runtime Performance

**Targets:**
- Initial load: <3 seconds
- Page navigation: <500ms
- Chart rendering: <1 second

**Achieved through:**
- Vite's optimized build output
- Minimal re-renders with proper React patterns
- Memoization of calculated values

---

## Future Considerations

### If Adding Real Backend

1. Replace generators with API calls
2. Add React Query for data fetching/caching
3. Implement authentication (consider Auth0 or Clerk)
4. Add optimistic updates for write operations

### If Scaling

1. Add route-based code splitting with React.lazy
2. Implement virtual scrolling for large account lists
3. Consider Zustand for complex state
4. Add service worker for offline support

---

*These decisions prioritize simplicity and maintainability for a demonstration application while following enterprise React best practices.*
