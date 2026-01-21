import type {
  Account,
  HealthScoreBreakdown,
  HealthScoreWeights,
  HealthStatus,
  PortfolioMetrics,
  UsageData
} from '@/types'

// Default health score weights as per PRD
export const DEFAULT_HEALTH_WEIGHTS: HealthScoreWeights = {
  productUsage: 0.30,
  engagement: 0.25,
  businessOutcomes: 0.20,
  supportHealth: 0.15,
  relationshipStrength: 0.10,
}

/**
 * Calculate Net Revenue Retention (NRR)
 * NRR = (Starting ARR + Expansion - Contraction - Churn) / Starting ARR
 * Target: 115-120% (SaaS industry benchmark)
 */
export function calculateNRR(
  startingArr: number,
  expansion: number,
  contraction: number,
  churn: number
): number {
  if (startingArr === 0) return 0
  const nrr = ((startingArr + expansion - contraction - churn) / startingArr) * 100
  return Math.round(nrr * 10) / 10
}

/**
 * Calculate Gross Revenue Retention (GRR)
 * GRR = (Starting ARR - Contraction - Churn) / Starting ARR
 * Target: >90%
 */
export function calculateGRR(
  startingArr: number,
  contraction: number,
  churn: number
): number {
  if (startingArr === 0) return 0
  const grr = ((startingArr - contraction - churn) / startingArr) * 100
  return Math.round(grr * 10) / 10
}

/**
 * Calculate weighted health score from components
 */
export function calculateHealthScore(
  components: Omit<HealthScoreBreakdown, 'overall' | 'trend' | 'lastCalculated'>,
  weights: HealthScoreWeights = DEFAULT_HEALTH_WEIGHTS
): number {
  const score =
    (components.productUsage * weights.productUsage) +
    (components.engagement * weights.engagement) +
    (components.businessOutcomes * weights.businessOutcomes) +
    (components.supportHealth * weights.supportHealth) +
    (components.relationshipStrength * weights.relationshipStrength)

  return Math.round(score)
}

/**
 * Determine health status from score
 */
export function getHealthStatus(score: number): HealthStatus {
  if (score >= 80) return 'healthy'
  if (score >= 60) return 'stable'
  if (score >= 40) return 'at-risk'
  return 'critical'
}

/**
 * Get Tailwind classes for health status
 */
export function getHealthStatusColor(status: HealthStatus): {
  bg: string
  text: string
  border: string
} {
  switch (status) {
    case 'healthy':
      return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' }
    case 'stable':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' }
    case 'at-risk':
      return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' }
    case 'critical':
      return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
  }
}

/**
 * Calculate health trend from historical data
 */
export function calculateHealthTrend(
  currentScore: number,
  previousScore: number
): 'up' | 'down' | 'stable' {
  const diff = currentScore - previousScore
  if (diff > 5) return 'up'
  if (diff < -5) return 'down'
  return 'stable'
}

/**
 * Calculate portfolio-level metrics from accounts
 */
export function calculatePortfolioMetrics(accounts: Account[]): PortfolioMetrics {
  const totalArr = accounts.reduce((sum, acc) => sum + acc.arr, 0)

  // Calculate average NRR and GRR
  const nrr = accounts.length > 0
    ? accounts.reduce((sum, acc) => sum + acc.nrr, 0) / accounts.length
    : 0

  const grr = accounts.length > 0
    ? accounts.reduce((sum, acc) => sum + acc.grr, 0) / accounts.length
    : 0

  // Calculate expansion pipeline
  const expansionPipeline = accounts.reduce((sum, acc) => {
    return sum + acc.opportunities
      .filter(opp => !['Closed Won', 'Closed Lost'].includes(opp.stage))
      .reduce((oppSum, opp) => oppSum + (opp.value * opp.probability / 100), 0)
  }, 0)

  // Calculate average health score
  const avgHealthScore = accounts.length > 0
    ? accounts.reduce((sum, acc) => sum + acc.healthScore.overall, 0) / accounts.length
    : 0

  // Count accounts at risk (health < 60)
  const accountsAtRisk = accounts.filter(acc => acc.healthScore.overall < 60).length

  // Accounts by tier
  const accountsByTier = {
    strategic: accounts.filter(acc => acc.tier === 'Strategic').length,
    enterprise: accounts.filter(acc => acc.tier === 'Enterprise').length,
    growth: accounts.filter(acc => acc.tier === 'Growth').length,
  }

  // Accounts by health status
  const accountsByHealth = {
    healthy: accounts.filter(acc => acc.healthScore.overall >= 80).length,
    stable: accounts.filter(acc => acc.healthScore.overall >= 60 && acc.healthScore.overall < 80).length,
    atRisk: accounts.filter(acc => acc.healthScore.overall >= 40 && acc.healthScore.overall < 60).length,
    critical: accounts.filter(acc => acc.healthScore.overall < 40).length,
  }

  // ARR by product
  const arrByProduct = {
    api: 0,
    enterprise: 0,
    code: 0,
  }
  accounts.forEach(acc => {
    acc.products.forEach(product => {
      if (product.active) {
        const productArr = product.contracts.reduce((sum, c) => sum + c.totalValue, 0)
        arrByProduct[product.type] += productArr
      }
    })
  })

  // ARR by country
  const countryMap = new Map<string, { arr: number; count: number }>()
  accounts.forEach(acc => {
    const existing = countryMap.get(acc.country) || { arr: 0, count: 0 }
    countryMap.set(acc.country, {
      arr: existing.arr + acc.arr,
      count: existing.count + 1,
    })
  })
  const arrByCountry = Array.from(countryMap.entries())
    .map(([country, data]) => ({ country, ...data }))
    .sort((a, b) => b.arr - a.arr)

  // Calculate ARR change (would need historical data in real app)
  const arrChange = 12.5 // Mock 12.5% growth

  return {
    totalArr,
    arrChange,
    nrr: Math.round(nrr * 10) / 10,
    nrrTarget: 115,
    grr: Math.round(grr * 10) / 10,
    grrTarget: 92,
    expansionPipeline: Math.round(expansionPipeline),
    avgHealthScore: Math.round(avgHealthScore),
    accountsAtRisk,
    totalAccounts: accounts.length,
    accountsByTier,
    accountsByHealth,
    arrByProduct,
    arrByCountry,
  }
}

/**
 * Format currency for display (USD)
 */
export function formatCurrency(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    }
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Calculate days until date
 */
export function daysUntil(dateString: string): number {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = date.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Get usage growth percentage between periods
 */
export function calculateUsageGrowth(
  current: UsageData | undefined,
  previous: UsageData | undefined,
  metric: 'tokens' | 'requests' | 'activeUsers'
): number | null {
  if (!current || !previous) return null

  let currentValue = 0
  let previousValue = 0

  if (metric === 'tokens' && current.api && previous.api) {
    currentValue = current.api.totalTokens
    previousValue = previous.api.totalTokens
  } else if (metric === 'requests' && current.api && previous.api) {
    currentValue = current.api.requests
    previousValue = previous.api.requests
  } else if (metric === 'activeUsers' && current.enterprise && previous.enterprise) {
    currentValue = current.enterprise.activeSeats
    previousValue = previous.enterprise.activeSeats
  }

  if (previousValue === 0) return null

  const growth = ((currentValue - previousValue) / previousValue) * 100
  return Math.round(growth * 10) / 10
}

/**
 * Generate sparkline data points from historical values
 */
export function generateSparklineData(
  values: number[],
  labels?: string[]
): { value: number; label?: string }[] {
  return values.map((value, index) => ({
    value,
    label: labels?.[index],
  }))
}
