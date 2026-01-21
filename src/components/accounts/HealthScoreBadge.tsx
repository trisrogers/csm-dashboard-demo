import { cn } from '@/lib/utils'
import { getHealthStatus, getHealthStatusColor } from '@/lib/calculations'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface HealthScoreBadgeProps {
  score: number
  trend?: 'up' | 'down' | 'stable'
  size?: 'sm' | 'md' | 'lg'
  showTrend?: boolean
}

export default function HealthScoreBadge({
  score,
  trend,
  size = 'md',
  showTrend = true,
}: HealthScoreBadgeProps) {
  const status = getHealthStatus(score)
  const colors = getHealthStatusColor(status)

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor =
    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-400'

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={cn(
          'rounded-full flex items-center justify-center font-bold',
          colors.bg,
          colors.text,
          sizeClasses[size]
        )}
      >
        {score}
      </div>
      {showTrend && trend && (
        <TrendIcon className={cn('h-3 w-3', trendColor)} />
      )}
    </div>
  )
}
