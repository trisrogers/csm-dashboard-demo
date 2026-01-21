import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account, Opportunity } from '@/types'
import { TrendingUp, DollarSign, Calendar, User, ArrowRight, Target } from 'lucide-react'

interface ExpansionTabProps {
  account: Account
}

const stageColors: Record<Opportunity['stage'], string> = {
  Identified: 'bg-gray-100 text-gray-800',
  Qualified: 'bg-blue-100 text-blue-800',
  Proposal: 'bg-purple-100 text-purple-800',
  Negotiation: 'bg-orange-100 text-orange-800',
  'Closed Won': 'bg-green-100 text-green-800',
  'Closed Lost': 'bg-red-100 text-red-800',
}

const stageOrder = ['Identified', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']

export function ExpansionTab({ account }: ExpansionTabProps) {
  const { opportunities } = account

  // Calculate pipeline metrics
  const totalPipeline = opportunities
    .filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage))
    .reduce((sum, o) => sum + o.value, 0)

  const weightedPipeline = opportunities
    .filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage))
    .reduce((sum, o) => sum + (o.value * o.probability / 100), 0)

  const activeOpps = opportunities.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage))
  const avgProbability = activeOpps.length > 0
    ? Math.round(activeOpps.reduce((sum, o) => sum + o.probability, 0) / activeOpps.length)
    : 0

  // Group by stage
  const byStage = stageOrder.reduce((acc, stage) => {
    acc[stage] = opportunities.filter(o => o.stage === stage)
    return acc
  }, {} as Record<string, Opportunity[]>)

  return (
    <div className="space-y-6">
      {/* Pipeline Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{activeOpps.length}</div>
              <div className="text-sm text-muted-foreground">Active Opportunities</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${(totalPipeline / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-muted-foreground">Total Pipeline</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${(weightedPipeline / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-muted-foreground">Weighted Pipeline</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{avgProbability}%</div>
              <div className="text-sm text-muted-foreground">Avg Probability</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Expansion Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            {stageOrder.slice(0, 4).map((stage, idx) => {
              const stageOpps = byStage[stage] || []
              const stageValue = stageOpps.reduce((sum, o) => sum + o.value, 0)
              return (
                <div key={stage} className="flex items-center">
                  <div className="text-center">
                    <Badge className={`${stageColors[stage as Opportunity['stage']]} mb-2`}>
                      {stage}
                    </Badge>
                    <div className="text-2xl font-bold">{stageOpps.length}</div>
                    <div className="text-sm text-muted-foreground">
                      ${(stageValue / 1000).toFixed(0)}K
                    </div>
                  </div>
                  {idx < 3 && <ArrowRight className="h-4 w-4 mx-4 text-muted-foreground" />}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Opportunity Details */}
      <Card>
        <CardHeader>
          <CardTitle>Opportunity Details</CardTitle>
        </CardHeader>
        <CardContent>
          {opportunities.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No expansion opportunities identified</p>
          ) : (
            <div className="space-y-4">
              {opportunities.map(opp => (
                <div key={opp.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <h4 className="font-semibold">{opp.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{opp.description}</p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Champion: {opp.championName}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Close: {opp.expectedCloseDate}
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Products: </span>
                        {opp.products.join(', ')}
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Next Steps: </span>
                        {opp.nextSteps}
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <Badge className={stageColors[opp.stage]}>
                        {opp.stage}
                      </Badge>
                      <div className="text-xl font-bold text-green-600 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {(opp.value / 1000).toFixed(0)}K
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {opp.probability}% probability
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Updated: {opp.lastUpdated}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
