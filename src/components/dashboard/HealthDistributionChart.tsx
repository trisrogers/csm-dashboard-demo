import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { Account } from '@/types'
import { getHealthStatus } from '@/lib/calculations'

interface HealthDistributionChartProps {
  data: {
    healthy: number
    stable: number
    atRisk: number
    critical: number
  }
  accounts?: Account[]
}

export default function HealthDistributionChart({ data, accounts = [] }: HealthDistributionChartProps) {
  // Group accounts by health status
  const accountsByStatus = {
    healthy: accounts.filter(a => getHealthStatus(a.healthScore.overall) === 'healthy').map(a => a.name),
    stable: accounts.filter(a => getHealthStatus(a.healthScore.overall) === 'stable').map(a => a.name),
    atRisk: accounts.filter(a => getHealthStatus(a.healthScore.overall) === 'at-risk').map(a => a.name),
    critical: accounts.filter(a => getHealthStatus(a.healthScore.overall) === 'critical').map(a => a.name),
  }

  const chartData = [
    { name: 'Healthy (80-100)', value: data.healthy, color: '#16a34a', accounts: accountsByStatus.healthy },
    { name: 'Stable (60-79)', value: data.stable, color: '#eab308', accounts: accountsByStatus.stable },
    { name: 'At Risk (40-59)', value: data.atRisk, color: '#f97316', accounts: accountsByStatus.atRisk },
    { name: 'Critical (<40)', value: data.critical, color: '#dc2626', accounts: accountsByStatus.critical },
  ].filter(item => item.value > 0)

  const total = data.healthy + data.stable + data.atRisk + data.critical

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; accounts: string[] } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
          <p className="font-medium text-sm mb-1">{data.name}</p>
          <p className="text-sm text-muted-foreground mb-2">{data.value} accounts</p>
          {data.accounts.length > 0 && (
            <div className="border-t pt-2">
              <p className="text-xs text-muted-foreground mb-1">Accounts:</p>
              <ul className="text-xs space-y-0.5">
                {data.accounts.slice(0, 5).map((name, idx) => (
                  <li key={idx} className="truncate">• {name}</li>
                ))}
                {data.accounts.length > 5 && (
                  <li className="text-muted-foreground">...and {data.accounts.length - 5} more</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Account Health Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {total} total accounts
        </div>
      </CardContent>
    </Card>
  )
}
