import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface HealthDistributionChartProps {
  data: {
    healthy: number
    stable: number
    atRisk: number
    critical: number
  }
}

export default function HealthDistributionChart({ data }: HealthDistributionChartProps) {
  const chartData = [
    { name: 'Healthy (80-100)', value: data.healthy, color: '#16a34a' },
    { name: 'Stable (60-79)', value: data.stable, color: '#eab308' },
    { name: 'At Risk (40-59)', value: data.atRisk, color: '#f97316' },
    { name: 'Critical (<40)', value: data.critical, color: '#dc2626' },
  ].filter(item => item.value > 0)

  const total = data.healthy + data.stable + data.atRisk + data.critical

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
              <Tooltip
                formatter={(value) => [`${value} accounts`, '']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              />
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
