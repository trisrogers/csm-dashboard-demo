import type { UsageData, Account } from '@/types'

// Generate usage data based on account ARR and products
export function generateUsageHistory(account: Account, months: number = 6): UsageData[] {
  const history: UsageData[] = []
  const hasApi = account.products.some(p => p.type === 'api')
  const hasEnterprise = account.products.some(p => p.type === 'enterprise')
  const hasCode = account.products.some(p => p.type === 'code')

  // Get contract quantities for scaling
  const apiContract = account.products.find(p => p.type === 'api')?.contracts[0]
  const enterpriseContract = account.products.find(p => p.type === 'enterprise')?.contracts[0]
  const codeContract = account.products.find(p => p.type === 'code')?.contracts[0]

  const baseTokens = apiContract?.quantity || 30000000
  const baseSeats = enterpriseContract?.quantity || 100
  const baseLicenses = codeContract?.quantity || 50

  for (let i = 0; i < months; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const period = date.toISOString().slice(0, 7)

    // Apply growth/decline trend based on health score trend
    const trendMultiplier = account.healthScore.trend === 'up' ? 1 + (0.05 * (months - i)) :
                           account.healthScore.trend === 'down' ? 1 - (0.03 * (months - i)) : 1

    // Add some randomness
    const variance = () => 0.85 + Math.random() * 0.3

    const usage: UsageData = {
      accountId: account.id,
      period,
    }

    if (hasApi) {
      const tokens = Math.round(baseTokens * trendMultiplier * variance())
      const inputTokens = Math.round(tokens * 0.4)
      const outputTokens = tokens - inputTokens
      const requests = Math.round(tokens / 50)

      usage.api = {
        totalTokens: tokens,
        inputTokens,
        outputTokens,
        requests,
        errorRate: 0.01 + Math.random() * 0.02,
        avgLatencyMs: 200 + Math.floor(Math.random() * 100),
        byModel: [
          { model: 'opus-4.5', tokens: Math.round(tokens * 0.25), requests: Math.round(requests * 0.2), cost: Math.round(tokens * 0.25 * 0.01) },
          { model: 'sonnet-4.5', tokens: Math.round(tokens * 0.55), requests: Math.round(requests * 0.6), cost: Math.round(tokens * 0.55 * 0.0015) },
          { model: 'haiku-4.5', tokens: Math.round(tokens * 0.2), requests: Math.round(requests * 0.2), cost: Math.round(tokens * 0.2 * 0.0005) },
        ],
        peakHours: [
          { hour: 9, tokens: Math.round(tokens * 0.12) },
          { hour: 10, tokens: Math.round(tokens * 0.14) },
          { hour: 11, tokens: Math.round(tokens * 0.13) },
          { hour: 14, tokens: Math.round(tokens * 0.12) },
          { hour: 15, tokens: Math.round(tokens * 0.11) },
        ],
      }
    }

    if (hasEnterprise) {
      const activeRate = (account.healthScore.productUsage / 100) * variance()
      const activeSeats = Math.round(baseSeats * activeRate)
      const dau = Math.round(activeSeats * 0.7 * variance())

      usage.enterprise = {
        totalSeats: baseSeats,
        activeSeats,
        dau,
        mau: activeSeats,
        projectsCreated: Math.round(activeSeats * 0.3),
        activeProjects: Math.round(activeSeats * 0.15),
        featureAdoption: [
          { feature: 'Projects', adoptionRate: Math.round(70 + Math.random() * 20), usageCount: Math.round(activeSeats * 25) },
          { feature: 'Slack Integration', adoptionRate: Math.round(50 + Math.random() * 25), usageCount: Math.round(activeSeats * 18) },
          { feature: 'Google Workspace', adoptionRate: Math.round(35 + Math.random() * 20), usageCount: Math.round(activeSeats * 10) },
          { feature: 'Skills', adoptionRate: Math.round(20 + Math.random() * 20), usageCount: Math.round(activeSeats * 5) },
        ],
        departmentBreakdown: [
          { department: 'Engineering', users: Math.round(baseSeats * 0.35), activeUsers: Math.round(baseSeats * 0.35 * activeRate) },
          { department: 'Product', users: Math.round(baseSeats * 0.2), activeUsers: Math.round(baseSeats * 0.2 * activeRate) },
          { department: 'Operations', users: Math.round(baseSeats * 0.2), activeUsers: Math.round(baseSeats * 0.2 * activeRate) },
          { department: 'Other', users: Math.round(baseSeats * 0.25), activeUsers: Math.round(baseSeats * 0.25 * activeRate) },
        ],
      }
    }

    if (hasCode) {
      const activeRate = (account.healthScore.productUsage / 100) * variance()
      const activeDevelopers = Math.round(baseLicenses * activeRate)
      const sessionsPerDev = 25 + Math.round(Math.random() * 15)

      usage.code = {
        activeDevelopers,
        totalSessions: activeDevelopers * sessionsPerDev,
        avgSessionsPerDev: sessionsPerDev,
        languages: [
          { language: 'Python', percentage: 30 + Math.round(Math.random() * 15) },
          { language: 'TypeScript', percentage: 20 + Math.round(Math.random() * 15) },
          { language: 'Java', percentage: 15 + Math.round(Math.random() * 10) },
          { language: 'Go', percentage: 10 + Math.round(Math.random() * 10) },
          { language: 'Other', percentage: 10 + Math.round(Math.random() * 5) },
        ],
        linesGenerated: activeDevelopers * 1200 + Math.round(Math.random() * 500 * activeDevelopers),
        testsWritten: activeDevelopers * 20 + Math.round(Math.random() * 10 * activeDevelopers),
        timeSavedHours: activeDevelopers * 15 + Math.round(Math.random() * 5 * activeDevelopers),
        repositories: Math.round(activeDevelopers * 0.3) + 5,
      }
    }

    history.push(usage)
  }

  return history.reverse() // Oldest first
}
