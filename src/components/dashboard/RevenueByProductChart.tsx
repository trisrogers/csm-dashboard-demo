import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatCurrency } from '@/lib/calculations'

interface RevenueByProductChartProps {
  data: {
    api: number
    enterprise: number
    code: number
  }
}

export default function RevenueByProductChart({ data }: RevenueByProductChartProps) {
  const chartData = [
    {
      name: 'ARR by Product',
      'Claude API': data.api,
      'Claude Enterprise': data.enterprise,
      'Claude Code': data.code,
    },
  ]

  const total = data.api + data.enterprise + data.code

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue by Product</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={(value) => formatCurrency(value, true)}
                fontSize={12}
              />
              <YAxis type="category" dataKey="name" hide />
              <Tooltip
                formatter={(value) => formatCurrency(value as number)}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              />
              <Legend />
              <Bar dataKey="Claude API" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Claude Enterprise" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="Claude Code" stackId="a" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-muted-foreground">API</div>
            <div className="text-sm font-medium">{formatCurrency(data.api, true)}</div>
            <div className="text-xs text-muted-foreground">
              {((data.api / total) * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Enterprise</div>
            <div className="text-sm font-medium">{formatCurrency(data.enterprise, true)}</div>
            <div className="text-xs text-muted-foreground">
              {((data.enterprise / total) * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Code</div>
            <div className="text-sm font-medium">{formatCurrency(data.code, true)}</div>
            <div className="text-xs text-muted-foreground">
              {((data.code / total) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
