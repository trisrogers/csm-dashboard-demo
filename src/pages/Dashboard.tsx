import { DollarSign, Percent, TrendingUp, Activity, AlertTriangle, Building2 } from 'lucide-react'
import MetricCard from '@/components/dashboard/MetricCard'
import HealthDistributionChart from '@/components/dashboard/HealthDistributionChart'
import RevenueByProductChart from '@/components/dashboard/RevenueByProductChart'
import KPIScorecard from '@/components/dashboard/KPIScorecard'
import AccountsAtRisk from '@/components/dashboard/AccountsAtRisk'
import RecentActivity from '@/components/dashboard/RecentActivity'
import ExpansionOpportunities from '@/components/dashboard/ExpansionOpportunities'
import RegionalMap from '@/components/dashboard/RegionalMap'
import { accounts } from '@/data/accounts'
import { calculatePortfolioMetrics, formatCurrency, formatPercentage } from '@/lib/calculations'

export default function Dashboard() {
  const metrics = calculatePortfolioMetrics(accounts)

  // Generate mock sparkline data (12 months)
  const arrSparkline = [4.2, 4.5, 4.8, 5.0, 5.2, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0]
  const nrrSparkline = [112, 114, 113, 115, 116, 115, 117, 118, 117, 118, 116, 117]
  const healthSparkline = [78, 79, 80, 79, 81, 80, 82, 81, 80, 81, 80, 81]

  const kpiItems = [
    {
      label: 'Net Revenue Retention',
      actual: metrics.nrr,
      target: metrics.nrrTarget,
      format: 'percentage' as const,
    },
    {
      label: 'Gross Revenue Retention',
      actual: metrics.grr,
      target: metrics.grrTarget,
      format: 'percentage' as const,
    },
    {
      label: 'Expansion Pipeline',
      actual: metrics.expansionPipeline,
      target: 500000,
      format: 'currency' as const,
      unit: 'quarterly',
    },
    {
      label: 'Average Health Score',
      actual: metrics.avgHealthScore,
      target: 75,
      format: 'number' as const,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
          <p className="text-muted-foreground">APAC Enterprise Customer Success Overview</p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString('en-AU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
          <p>Q1 2026</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total ARR"
          value={formatCurrency(metrics.totalArr, true)}
          trend="up"
          trendValue={`+${metrics.arrChange}% YoY`}
          sparklineData={arrSparkline}
          icon={<DollarSign className="h-4 w-4" />}
          infoTooltip="Annual Recurring Revenue - total contracted value across all accounts"
        />
        <MetricCard
          title="Net Revenue Retention"
          value={formatPercentage(metrics.nrr)}
          trend={metrics.nrr >= 115 ? 'up' : metrics.nrr >= 100 ? 'stable' : 'down'}
          trendValue={`Target: ${metrics.nrrTarget}%`}
          sparklineData={nrrSparkline}
          variant={metrics.nrr >= 115 ? 'success' : metrics.nrr >= 100 ? 'warning' : 'danger'}
          icon={<Percent className="h-4 w-4" />}
          infoTooltip="Measures revenue growth including expansion, upsells, and cross-sells. Target: 115-120%"
        />
        <MetricCard
          title="Gross Revenue Retention"
          value={formatPercentage(metrics.grr)}
          trend={metrics.grr >= 92 ? 'up' : 'stable'}
          trendValue={`Target: ${metrics.grrTarget}%`}
          variant={metrics.grr >= 92 ? 'success' : 'warning'}
          icon={<Percent className="h-4 w-4" />}
          infoTooltip="Measures revenue retention excluding expansion - core retention health. Target: >90%"
        />
        <MetricCard
          title="Expansion Pipeline"
          value={formatCurrency(metrics.expansionPipeline, true)}
          trend="up"
          trendValue="Weighted value"
          icon={<TrendingUp className="h-4 w-4" />}
          infoTooltip="Total weighted value of identified upsell and cross-sell opportunities"
        />
        <MetricCard
          title="Avg Health Score"
          value={metrics.avgHealthScore}
          trend={metrics.avgHealthScore >= 75 ? 'up' : 'stable'}
          trendValue="Target: 75"
          sparklineData={healthSparkline}
          variant={metrics.avgHealthScore >= 80 ? 'success' : metrics.avgHealthScore >= 60 ? 'warning' : 'danger'}
          icon={<Activity className="h-4 w-4" />}
          infoTooltip="Weighted composite of Usage (30%), Engagement (25%), Outcomes (20%), Support (15%), Relationships (10%)"
        />
        <MetricCard
          title="Accounts at Risk"
          value={metrics.accountsAtRisk}
          subtitle={`of ${metrics.totalAccounts} accounts`}
          variant={metrics.accountsAtRisk > 2 ? 'danger' : metrics.accountsAtRisk > 0 ? 'warning' : 'success'}
          icon={<AlertTriangle className="h-4 w-4" />}
          infoTooltip="Accounts with health score below 60 requiring immediate attention"
        />
      </div>

      {/* Regional Map & Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <RegionalMap accounts={accounts} />
        <HealthDistributionChart data={metrics.accountsByHealth} accounts={accounts} />
        <KPIScorecard items={kpiItems} />
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueByProductChart data={metrics.arrByProduct} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AccountsAtRisk accounts={accounts} />
        <ExpansionOpportunities accounts={accounts} />
        <RecentActivity accounts={accounts} />
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Accounts by Tier</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Strategic</span>
              <span className="font-medium">{metrics.accountsByTier.strategic}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Enterprise</span>
              <span className="font-medium">{metrics.accountsByTier.enterprise}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Growth</span>
              <span className="font-medium">{metrics.accountsByTier.growth}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Top Countries by ARR</span>
          </div>
          <div className="space-y-2">
            {metrics.arrByCountry.slice(0, 4).map((item) => (
              <div key={item.country} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.country}</span>
                <span className="font-medium">{formatCurrency(item.arr, true)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Health Distribution</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Healthy (80+)</span>
              <span className="font-medium">{metrics.accountsByHealth.healthy}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-600">Stable (60-79)</span>
              <span className="font-medium">{metrics.accountsByHealth.stable}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">At Risk (40-59)</span>
              <span className="font-medium">{metrics.accountsByHealth.atRisk}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Critical (&lt;40)</span>
              <span className="font-medium">{metrics.accountsByHealth.critical}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
