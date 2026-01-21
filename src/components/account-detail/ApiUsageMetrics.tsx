import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import type { ApiUsageMetrics as ApiMetrics } from '@/types'
import { formatCurrency } from '@/lib/calculations'
import { Zap, TrendingUp, AlertCircle } from 'lucide-react'

interface ApiUsageMetricsProps {
  data: ApiMetrics
  previousData?: ApiMetrics
}

export default function ApiUsageMetrics({ data, previousData }: ApiUsageMetricsProps) {
  // Calculate MoM growth
  const tokenGrowth = previousData
    ? ((data.totalTokens - previousData.totalTokens) / previousData.totalTokens) * 100
    : 0

  // Mock monthly trend data
  const trendData = [
    { month: 'Aug', tokens: 35000000 },
    { month: 'Sep', tokens: 38000000 },
    { month: 'Oct', tokens: 40000000 },
    { month: 'Nov', tokens: 42000000 },
    { month: 'Dec', tokens: 42000000 },
    { month: 'Jan', tokens: data.totalTokens },
  ]

  const modelColors = {
    'opus-4.5': '#8b5cf6',
    'sonnet-4.5': '#3b82f6',
    'haiku-4.5': '#06b6d4',
  }

  const totalCost = data.byModel.reduce((sum, m) => sum + m.cost, 0)

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-sm">Total Tokens</span>
            </div>
            <div className="text-2xl font-bold">
              {(data.totalTokens / 1000000).toFixed(1)}M
            </div>
            {tokenGrowth !== 0 && (
              <div className={`flex items-center gap-1 text-xs ${tokenGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="h-3 w-3" />
                {tokenGrowth > 0 ? '+' : ''}{tokenGrowth.toFixed(1)}% MoM
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Requests</div>
            <div className="text-2xl font-bold">
              {(data.requests / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Error Rate</span>
            </div>
            <div className="text-2xl font-bold">{(data.errorRate * 100).toFixed(2)}%</div>
            <div className={`text-xs ${data.errorRate < 0.01 ? 'text-green-600' : data.errorRate < 0.05 ? 'text-yellow-600' : 'text-red-600'}`}>
              {data.errorRate < 0.01 ? 'Excellent' : data.errorRate < 0.05 ? 'Normal' : 'High'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Avg Latency</div>
            <div className="text-2xl font-bold">{data.avgLatencyMs}ms</div>
            <div className="text-xs text-muted-foreground">p50 response time</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Usage Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Token Usage Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${((value as number) / 1000000).toFixed(1)}M tokens`, 'Tokens']}
                  />
                  <Line
                    type="monotone"
                    dataKey="tokens"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Usage by Model */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usage by Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.byModel} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="model"
                    tick={{ fontSize: 12 }}
                    width={80}
                    tickFormatter={(value) => value.replace('-4.5', '')}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === 'tokens') return [`${((value as number) / 1000000).toFixed(1)}M`, 'Tokens']
                      return [(value as number).toLocaleString(), name as string]
                    }}
                  />
                  <Bar dataKey="tokens" fill="#3b82f6">
                    {data.byModel.map((entry) => (
                      <Cell
                        key={entry.model}
                        fill={modelColors[entry.model as keyof typeof modelColors]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
              {data.byModel.map((model) => (
                <div key={model.model}>
                  <div className="font-medium">{model.model.replace('-4.5', '')}</div>
                  <div className="text-muted-foreground">{formatCurrency(model.cost)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t text-center">
              <span className="text-muted-foreground">Total Cost: </span>
              <span className="font-bold">{formatCurrency(totalCost)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peak Usage Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Peak Usage Hours (AEDT)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  tickFormatter={(h) => `${h}:00`}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value) => [`${((value as number) / 1000000).toFixed(2)}M tokens`, 'Usage']}
                  labelFormatter={(h) => `${h}:00 - ${h}:59`}
                />
                <Bar dataKey="tokens" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Peak hours: 9-11 AM and 2-3 PM AEDT (business hours)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
