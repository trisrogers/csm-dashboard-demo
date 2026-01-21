import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
  sparklineData?: number[]
  variant?: 'default' | 'success' | 'warning' | 'danger'
  icon?: React.ReactNode
  onClick?: () => void
}

export default function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  sparklineData,
  variant = 'default',
  icon,
  onClick,
}: MetricCardProps) {
  const variantColors = {
    default: '',
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-yellow-500',
    danger: 'border-l-4 border-l-red-500',
  }

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    stable: 'text-gray-500',
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  const chartData = sparklineData?.map((value, index) => ({ value, index }))

  return (
    <Card
      className={cn(
        'transition-shadow hover:shadow-md',
        variantColors[variant],
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold">{value}</div>
            {(trend || trendValue) && (
              <div className={cn('flex items-center gap-1 text-xs', trend && trendColors[trend])}>
                {trend && <TrendIcon className="h-3 w-3" />}
                {trendValue && <span>{trendValue}</span>}
              </div>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {sparklineData && sparklineData.length > 0 && (
            <div className="h-12 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      trend === 'up' ? '#16a34a' : trend === 'down' ? '#dc2626' : '#6b7280'
                    }
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
