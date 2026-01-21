import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import type { HealthScoreBreakdown as HealthBreakdown } from '@/types'
import { DEFAULT_HEALTH_WEIGHTS, getHealthStatus, getHealthStatusColor } from '@/lib/calculations'
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HealthScoreBreakdownProps {
  healthScore: HealthBreakdown
}

export default function HealthScoreBreakdown({ healthScore }: HealthScoreBreakdownProps) {
  const status = getHealthStatus(healthScore.overall)
  const colors = getHealthStatusColor(status)

  const radarData = [
    { subject: 'Usage', value: healthScore.productUsage, fullMark: 100 },
    { subject: 'Engagement', value: healthScore.engagement, fullMark: 100 },
    { subject: 'Outcomes', value: healthScore.businessOutcomes, fullMark: 100 },
    { subject: 'Support', value: healthScore.supportHealth, fullMark: 100 },
    { subject: 'Relationship', value: healthScore.relationshipStrength, fullMark: 100 },
  ]

  // Mock trend data (12 months)
  const trendData = [
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 80 },
    { month: 'Apr', score: 79 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 81 },
    { month: 'Jul', score: 83 },
    { month: 'Aug', score: 82 },
    { month: 'Sep', score: 84 },
    { month: 'Oct', score: 83 },
    { month: 'Nov', score: 84 },
    { month: 'Dec', score: 85 },
    { month: 'Jan', score: healthScore.overall },
  ]

  const TrendIcon =
    healthScore.trend === 'up'
      ? TrendingUp
      : healthScore.trend === 'down'
      ? TrendingDown
      : Minus

  const components = [
    {
      name: 'Product Usage',
      score: healthScore.productUsage,
      weight: DEFAULT_HEALTH_WEIGHTS.productUsage * 100,
      description: 'API calls, active users, feature adoption',
    },
    {
      name: 'Engagement',
      score: healthScore.engagement,
      weight: DEFAULT_HEALTH_WEIGHTS.engagement * 100,
      description: 'Meeting frequency, QBR completion, response times',
    },
    {
      name: 'Business Outcomes',
      score: healthScore.businessOutcomes,
      weight: DEFAULT_HEALTH_WEIGHTS.businessOutcomes * 100,
      description: 'Documented ROI, use case success',
    },
    {
      name: 'Support Health',
      score: healthScore.supportHealth,
      weight: DEFAULT_HEALTH_WEIGHTS.supportHealth * 100,
      description: 'Ticket volume, escalations, resolution satisfaction',
    },
    {
      name: 'Relationship',
      score: healthScore.relationshipStrength,
      weight: DEFAULT_HEALTH_WEIGHTS.relationshipStrength * 100,
      description: 'Stakeholder engagement, champion presence',
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Overall Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div
              className={cn(
                'inline-flex items-center justify-center h-24 w-24 rounded-full text-4xl font-bold',
                colors.bg,
                colors.text
              )}
            >
              {healthScore.overall}
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <TrendIcon
                className={cn(
                  'h-4 w-4',
                  healthScore.trend === 'up'
                    ? 'text-green-600'
                    : healthScore.trend === 'down'
                    ? 'text-red-600'
                    : 'text-gray-400'
                )}
              />
              <span className="text-sm text-muted-foreground capitalize">
                {healthScore.trend} trend
              </span>
            </div>
          </div>

          {/* Component breakdown list */}
          <div className="space-y-3">
            {components.map((comp) => (
              <div key={comp.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{comp.name}</span>
                  <span className="font-medium">{comp.score}</span>
                </div>
                <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'absolute h-full rounded-full',
                      comp.score >= 80 && 'bg-green-500',
                      comp.score >= 60 && comp.score < 80 && 'bg-yellow-500',
                      comp.score >= 40 && comp.score < 60 && 'bg-orange-500',
                      comp.score < 40 && 'bg-red-500'
                    )}
                    style={{ width: `${comp.score}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {comp.weight}% weight · {comp.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Component Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">12-Month Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Last calculated: {new Date(healthScore.lastCalculated).toLocaleDateString('en-AU')}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
