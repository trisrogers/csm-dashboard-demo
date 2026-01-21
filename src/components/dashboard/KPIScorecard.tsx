import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KPIItem {
  label: string
  actual: number
  target: number
  unit?: string
  format?: 'percentage' | 'currency' | 'number'
}

interface KPIScorecardProps {
  items: KPIItem[]
}

function formatValue(value: number, format?: 'percentage' | 'currency' | 'number'): string {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`
    case 'currency':
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`
      }
      return `$${value}`
    default:
      return value.toString()
  }
}

export default function KPIScorecard({ items }: KPIScorecardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">KPI Scorecard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => {
          const percentage = (item.actual / item.target) * 100
          const isOnTrack = percentage >= 100
          const isWarning = percentage >= 85 && percentage < 100
          const isDanger = percentage < 85

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">
                  {formatValue(item.actual, item.format)} / {formatValue(item.target, item.format)}
                  {item.unit && ` ${item.unit}`}
                </span>
              </div>
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={cn(
                    'absolute h-full rounded-full transition-all',
                    isOnTrack && 'bg-green-500',
                    isWarning && 'bg-yellow-500',
                    isDanger && 'bg-red-500'
                  )}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span
                  className={cn(
                    isOnTrack && 'text-green-600',
                    isWarning && 'text-yellow-600',
                    isDanger && 'text-red-600'
                  )}
                >
                  {percentage.toFixed(0)}% of target
                </span>
                <span
                  className={cn(
                    isOnTrack && 'text-green-600',
                    isWarning && 'text-yellow-600',
                    isDanger && 'text-red-600'
                  )}
                >
                  {isOnTrack ? 'On Track' : isWarning ? 'Warning' : 'Behind'}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
