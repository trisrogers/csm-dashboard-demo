import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { accounts } from '@/data/accounts'
import { calculatePortfolioMetrics } from '@/lib/calculations'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Globe,
  Building,
} from 'lucide-react'

export default function Analytics() {
  const portfolioMetrics = calculatePortfolioMetrics(accounts)

  // ARR by Tier
  const arrByTier = [
    { tier: 'Strategic', arr: accounts.filter(a => a.tier === 'Strategic').reduce((sum, a) => sum + a.arr, 0) },
    { tier: 'Enterprise', arr: accounts.filter(a => a.tier === 'Enterprise').reduce((sum, a) => sum + a.arr, 0) },
    { tier: 'Growth', arr: accounts.filter(a => a.tier === 'Growth').reduce((sum, a) => sum + a.arr, 0) },
  ]

  // ARR by Country
  const arrByCountry = Object.entries(
    accounts.reduce((acc, a) => {
      acc[a.country] = (acc[a.country] || 0) + a.arr
      return acc
    }, {} as Record<string, number>)
  ).map(([country, arr]) => ({ country, arr })).sort((a, b) => b.arr - a.arr)

  // ARR by Industry
  const arrByIndustry = Object.entries(
    accounts.reduce((acc, a) => {
      acc[a.industry] = (acc[a.industry] || 0) + a.arr
      return acc
    }, {} as Record<string, number>)
  ).map(([industry, arr]) => ({ industry, arr })).sort((a, b) => b.arr - a.arr)

  // Health Score Distribution
  const healthDistribution = [
    { range: 'Critical (<60)', count: accounts.filter(a => a.healthScore.overall < 60).length, color: '#ef4444' },
    { range: 'At Risk (60-69)', count: accounts.filter(a => a.healthScore.overall >= 60 && a.healthScore.overall < 70).length, color: '#f97316' },
    { range: 'Stable (70-79)', count: accounts.filter(a => a.healthScore.overall >= 70 && a.healthScore.overall < 80).length, color: '#eab308' },
    { range: 'Healthy (80-89)', count: accounts.filter(a => a.healthScore.overall >= 80 && a.healthScore.overall < 90).length, color: '#22c55e' },
    { range: 'Excellent (90+)', count: accounts.filter(a => a.healthScore.overall >= 90).length, color: '#10b981' },
  ]

  // NRR Analysis
  const nrrData = accounts.map(a => ({
    name: a.name.split(' ').slice(0, 2).join(' '),
    nrr: a.nrr,
    grr: a.grr,
  })).sort((a, b) => b.nrr - a.nrr)

  // Product Mix
  const productMix = accounts.reduce((acc, a) => {
    a.products.forEach(p => {
      if (p.active) {
        acc[p.type] = (acc[p.type] || 0) + p.contracts.reduce((sum, c) => sum + c.totalValue, 0)
      }
    })
    return acc
  }, {} as Record<string, number>)

  const productMixData = Object.entries(productMix).map(([product, value]) => ({
    product: product === 'api' ? 'Claude API' : product === 'enterprise' ? 'Claude Enterprise' : 'Claude Code',
    value,
  }))

  // Lifecycle Stage Distribution
  const lifecycleData = Object.entries(
    accounts.reduce((acc, a) => {
      acc[a.lifecycleStage] = (acc[a.lifecycleStage] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).map(([stage, count]) => ({ stage, count }))

  // Average Health Components
  const avgHealthComponents = {
    productUsage: Math.round(accounts.reduce((sum, a) => sum + a.healthScore.productUsage, 0) / accounts.length),
    engagement: Math.round(accounts.reduce((sum, a) => sum + a.healthScore.engagement, 0) / accounts.length),
    businessOutcomes: Math.round(accounts.reduce((sum, a) => sum + a.healthScore.businessOutcomes, 0) / accounts.length),
    supportHealth: Math.round(accounts.reduce((sum, a) => sum + a.healthScore.supportHealth, 0) / accounts.length),
    relationshipStrength: Math.round(accounts.reduce((sum, a) => sum + a.healthScore.relationshipStrength, 0) / accounts.length),
  }

  const radarData = [
    { component: 'Product Usage', value: avgHealthComponents.productUsage, fullMark: 100 },
    { component: 'Engagement', value: avgHealthComponents.engagement, fullMark: 100 },
    { component: 'Business Outcomes', value: avgHealthComponents.businessOutcomes, fullMark: 100 },
    { component: 'Support Health', value: avgHealthComponents.supportHealth, fullMark: 100 },
    { component: 'Relationship', value: avgHealthComponents.relationshipStrength, fullMark: 100 },
  ]

  // Pipeline by Stage
  const pipelineByStage = accounts.reduce((acc, a) => {
    a.opportunities.forEach(opp => {
      if (!['Closed Won', 'Closed Lost'].includes(opp.stage)) {
        acc[opp.stage] = (acc[opp.stage] || 0) + opp.value
      }
    })
    return acc
  }, {} as Record<string, number>)

  const pipelineData = Object.entries(pipelineByStage).map(([stage, value]) => ({ stage, value }))

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Portfolio Analytics</h1>
          <p className="text-muted-foreground">Comprehensive view of your APAC portfolio performance</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {accounts.length} Accounts
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">${(portfolioMetrics.totalArr / 1000000).toFixed(2)}M</div>
                <div className="text-xs text-muted-foreground">Total ARR</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{portfolioMetrics.nrr.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Avg NRR</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{portfolioMetrics.grr.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Avg GRR</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{portfolioMetrics.avgHealthScore}</div>
                <div className="text-xs text-muted-foreground">Avg Health</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-cyan-600" />
              <div>
                <div className="text-2xl font-bold">{arrByCountry.length}</div>
                <div className="text-xs text-muted-foreground">Countries</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-pink-600" />
              <div>
                <div className="text-2xl font-bold">{arrByIndustry.length}</div>
                <div className="text-xs text-muted-foreground">Industries</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* ARR by Tier */}
        <Card>
          <CardHeader>
            <CardTitle>ARR by Customer Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={arrByTier}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tier" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`$${((value as number) / 1000).toFixed(0)}K`, 'ARR']} />
                <Bar dataKey="arr" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Health Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Health Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={healthDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                  outerRadius={80}
                  dataKey="count"
                  nameKey="range"
                >
                  {healthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* ARR by Country */}
        <Card>
          <CardHeader>
            <CardTitle>ARR by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={arrByCountry} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <YAxis dataKey="country" type="category" width={100} />
                <Tooltip formatter={(value) => [`$${((value as number) / 1000).toFixed(0)}K`, 'ARR']} />
                <Bar dataKey="arr" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Mix */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={productMixData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${((value as number) / 1000).toFixed(0)}K`}
                  outerRadius={80}
                  dataKey="value"
                  nameKey="product"
                >
                  {productMixData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${((value as number) / 1000).toFixed(0)}K`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-2 gap-6">
        {/* NRR/GRR Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>NRR & GRR by Account</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={nrrData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[80, 140]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="nrr" name="NRR" fill="#3b82f6" />
                <Bar dataKey="grr" name="GRR" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Portfolio Health Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Health Components</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="component" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Average" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 4 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Lifecycle Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Accounts by Lifecycle Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={lifecycleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline by Stage */}
        <Card>
          <CardHeader>
            <CardTitle>Expansion Pipeline by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => [`$${((value as number) / 1000).toFixed(0)}K`, 'Pipeline']} />
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Account Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Account Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Account</th>
                  <th className="text-left p-2">Tier</th>
                  <th className="text-right p-2">ARR</th>
                  <th className="text-right p-2">Health</th>
                  <th className="text-right p-2">NRR</th>
                  <th className="text-right p-2">GRR</th>
                  <th className="text-left p-2">Stage</th>
                  <th className="text-left p-2">Trend</th>
                </tr>
              </thead>
              <tbody>
                {accounts.sort((a, b) => b.arr - a.arr).map(account => (
                  <tr key={account.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{account.name}</td>
                    <td className="p-2">
                      <Badge variant="outline">{account.tier}</Badge>
                    </td>
                    <td className="p-2 text-right">${(account.arr / 1000).toFixed(0)}K</td>
                    <td className="p-2 text-right">
                      <span className={
                        account.healthScore.overall >= 80 ? 'text-green-600' :
                        account.healthScore.overall >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }>
                        {account.healthScore.overall}
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      <span className={account.nrr >= 100 ? 'text-green-600' : 'text-red-600'}>
                        {account.nrr}%
                      </span>
                    </td>
                    <td className="p-2 text-right">{account.grr}%</td>
                    <td className="p-2">{account.lifecycleStage}</td>
                    <td className="p-2">
                      <span className={
                        account.healthScore.trend === 'up' ? 'text-green-600' :
                        account.healthScore.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                      }>
                        {account.healthScore.trend === 'up' ? '↑' : account.healthScore.trend === 'down' ? '↓' : '→'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
