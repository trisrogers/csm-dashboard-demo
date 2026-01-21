import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account } from '@/types'
import { Calendar, Users, CheckCircle2, Circle, FileText, Clock, TrendingUp, Target } from 'lucide-react'

interface QBRTabProps {
  account: Account
}

export function QBRTab({ account }: QBRTabProps) {
  const { qbrs, stakeholders, usageHistory, healthScore, opportunities, useCases } = account

  const upcomingQBR = qbrs.find(q => q.status !== 'Completed')
  const completedQBRs = qbrs.filter(q => q.status === 'Completed')

  // Get latest usage data for QBR summary
  const latestUsage = usageHistory[usageHistory.length - 1]
  const previousUsage = usageHistory[usageHistory.length - 2]

  // Calculate metrics for auto-generated summary
  const apiGrowth = latestUsage?.api && previousUsage?.api
    ? Math.round((latestUsage.api.totalTokens - previousUsage.api.totalTokens) / previousUsage.api.totalTokens * 100)
    : 0

  const seatUtilization = latestUsage?.enterprise
    ? Math.round((latestUsage.enterprise.activeSeats / latestUsage.enterprise.totalSeats) * 100)
    : 0

  const totalPipelineValue = opportunities
    .filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage))
    .reduce((sum, o) => sum + o.value, 0)

  return (
    <div className="space-y-6">
      {/* Upcoming QBR */}
      {upcomingQBR ? (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming QBR
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Scheduled for {upcomingQBR.date} ({upcomingQBR.timezone})
                </p>
              </div>
              <Badge className={
                upcomingQBR.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                upcomingQBR.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }>
                {upcomingQBR.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Attendees */}
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Attendees
              </h4>
              <div className="flex flex-wrap gap-2">
                {upcomingQBR.attendees.map(attendeeId => {
                  const stakeholder = stakeholders.find(s => s.id === attendeeId)
                  return stakeholder ? (
                    <Badge key={attendeeId} variant="outline">
                      {stakeholder.name} ({stakeholder.title})
                    </Badge>
                  ) : null
                })}
                {upcomingQBR.internalAttendees.map((name, idx) => (
                  <Badge key={idx} variant="secondary">
                    {name} (Anthropic)
                  </Badge>
                ))}
              </div>
            </div>

            {/* Preparation Checklist */}
            {upcomingQBR.preparationChecklist && (
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Preparation Checklist
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {upcomingQBR.preparationChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      {item.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={item.completed ? 'text-muted-foreground line-through' : ''}>
                        {item.item}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {upcomingQBR.preparationChecklist.filter(i => i.completed).length} of {upcomingQBR.preparationChecklist.length} complete
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">No QBR scheduled</p>
          </CardContent>
        </Card>
      )}

      {/* Auto-Generated QBR Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Auto-Generated QBR Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Executive Summary */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">Executive Summary</h4>
            <p className="text-sm text-muted-foreground">
              {account.name} is currently in <strong>{account.lifecycleStage}</strong> stage with an overall health score of{' '}
              <strong className={healthScore.overall >= 80 ? 'text-green-600' : healthScore.overall >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                {healthScore.overall}
              </strong>{' '}
              (trend: {healthScore.trend}).
              {healthScore.overall >= 80 && ' The account is performing well across all key metrics.'}
              {healthScore.overall >= 60 && healthScore.overall < 80 && ' Some areas require attention to improve overall health.'}
              {healthScore.overall < 60 && ' Immediate action is required to address declining metrics.'}
            </p>
          </div>

          {/* Key Metrics */}
          <div>
            <h4 className="font-semibold mb-3">Key Metrics</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold">${(account.arr / 1000).toFixed(0)}K</div>
                <div className="text-xs text-muted-foreground">Current ARR</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className={`text-2xl font-bold ${account.nrr >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                  {account.nrr}%
                </div>
                <div className="text-xs text-muted-foreground">NRR</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className={`text-2xl font-bold ${apiGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {apiGrowth >= 0 ? '+' : ''}{apiGrowth}%
                </div>
                <div className="text-xs text-muted-foreground">API Growth (MoM)</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-2xl font-bold">{seatUtilization}%</div>
                <div className="text-xs text-muted-foreground">Seat Utilization</div>
              </div>
            </div>
          </div>

          {/* Health Score Breakdown */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Health Score Breakdown
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Product Usage', value: healthScore.productUsage, weight: 30 },
                { label: 'Engagement', value: healthScore.engagement, weight: 25 },
                { label: 'Business Outcomes', value: healthScore.businessOutcomes, weight: 20 },
                { label: 'Support Health', value: healthScore.supportHealth, weight: 15 },
                { label: 'Relationship', value: healthScore.relationshipStrength, weight: 10 },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-sm w-36">{item.label} ({item.weight}%)</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.value >= 80 ? 'bg-green-500' : item.value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-10">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expansion Pipeline */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Expansion Pipeline
            </h4>
            {opportunities.length > 0 ? (
              <div className="space-y-2">
                {opportunities.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage)).map(opp => (
                  <div key={opp.id} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                    <span>{opp.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{opp.stage}</Badge>
                      <span className="font-medium">${(opp.value / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                ))}
                <div className="pt-2 text-sm font-medium">
                  Total Pipeline: ${(totalPipelineValue / 1000).toFixed(0)}K
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No active expansion opportunities</p>
            )}
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="font-semibold mb-3">Documented Use Cases ({useCases.length})</h4>
            {useCases.length > 0 ? (
              <div className="space-y-1">
                {useCases.map(uc => (
                  <div key={uc.id} className="flex items-center justify-between text-sm">
                    <span>{uc.name} ({uc.department})</span>
                    {uc.roi && <span className="text-green-600 font-medium">{uc.roi}% ROI</span>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No documented use cases</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Past QBRs */}
      {completedQBRs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Past QBRs ({completedQBRs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {completedQBRs.map(qbr => (
                <div key={qbr.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{qbr.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {qbr.attendees.length} attendees
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
