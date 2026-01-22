import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account } from '@/types'
import {
  Target,
  TrendingUp,
  Users,
  Shield,
  Calendar,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/calculations'

interface StrategicPlanProps {
  account: Account
}

export function StrategicPlan({ account }: StrategicPlanProps) {
  // Calculate derived goals based on account data
  const currentQuarter = 'Q1 2026'
  const currentYear = 2026

  // Revenue target: aim for 20% growth
  const revenueTargetNextQuarter = Math.round(account.arr * 1.05)
  const revenueTargetNextYear = Math.round(account.arr * 1.20)

  // Product adoption goals based on current state
  const hasAPI = account.products.some(p => p.type === 'api')
  const hasEnterprise = account.products.some(p => p.type === 'enterprise')
  const hasCode = account.products.some(p => p.type === 'code')

  const accountGoals = [
    {
      category: 'Revenue',
      icon: TrendingUp,
      goals: [
        {
          title: 'Quarterly ARR Target',
          target: formatCurrency(revenueTargetNextQuarter),
          current: formatCurrency(account.arr),
          progress: Math.min(100, Math.round((account.arr / revenueTargetNextQuarter) * 100)),
          dueDate: 'End of Q1 2026',
        },
        {
          title: 'Annual ARR Target',
          target: formatCurrency(revenueTargetNextYear),
          current: formatCurrency(account.arr),
          progress: Math.min(100, Math.round((account.arr / revenueTargetNextYear) * 100)),
          dueDate: 'End of 2026',
        },
      ],
    },
    {
      category: 'Product Adoption',
      icon: Target,
      goals: [
        ...(hasEnterprise ? [{
          title: 'Enterprise Seat Utilization',
          target: '85%',
          current: `${Math.round((account.usageHistory[account.usageHistory.length - 1]?.enterprise?.activeSeats || 0) / (account.usageHistory[account.usageHistory.length - 1]?.enterprise?.totalSeats || 1) * 100)}%`,
          progress: Math.round((account.usageHistory[account.usageHistory.length - 1]?.enterprise?.activeSeats || 0) / (account.usageHistory[account.usageHistory.length - 1]?.enterprise?.totalSeats || 1) * 100),
          dueDate: 'Ongoing',
        }] : []),
        ...(hasAPI ? [{
          title: 'API Usage Growth',
          target: '+25% MoM',
          current: '+15% MoM',
          progress: 60,
          dueDate: 'Q1 2026',
        }] : []),
        ...(!hasCode && (hasAPI || hasEnterprise) ? [{
          title: 'Claude Code Adoption',
          target: 'Pilot with 5 developers',
          current: 'Not started',
          progress: 0,
          dueDate: 'Q2 2026',
        }] : []),
      ],
    },
    {
      category: 'Relationship',
      icon: Users,
      goals: [
        {
          title: 'Executive Sponsor Engagement',
          target: 'Monthly touchpoint',
          current: 'Last contact 2 weeks ago',
          progress: 75,
          dueDate: 'Ongoing',
        },
        {
          title: 'Champion Development',
          target: '3+ internal champions',
          current: `${account.stakeholders.filter(s => s.relationshipStrength === 'Champion').length} champions`,
          progress: Math.min(100, (account.stakeholders.filter(s => s.relationshipStrength === 'Champion').length / 3) * 100),
          dueDate: 'Q2 2026',
        },
      ],
    },
  ]

  const keyInitiatives = [
    {
      title: 'Expand to new departments',
      description: hasEnterprise
        ? 'Identify 2-3 new departments for Claude Enterprise adoption'
        : 'Introduce Claude Enterprise for business users',
      status: 'in_progress' as const,
      owner: 'CSM',
      priority: 'high' as const,
    },
    {
      title: 'Document ROI and use cases',
      description: 'Create 2+ referenceable success stories with quantified business outcomes',
      status: (account.useCases.length >= 2 ? 'complete' : 'in_progress') as 'complete' | 'in_progress' | 'planned',
      owner: 'CSM + Customer',
      priority: 'high' as const,
    },
    {
      title: 'Technical deep-dive workshop',
      description: 'Conduct advanced API/prompt engineering session with technical team',
      status: 'planned' as const,
      owner: 'Solutions Architect',
      priority: 'medium' as const,
    },
    {
      title: 'Executive Business Review',
      description: 'Present value realization and roadmap to C-suite',
      status: 'planned' as const,
      owner: 'CSM + Account Executive',
      priority: 'medium' as const,
    },
  ]

  const riskFactors = [
    ...(account.healthScore.overall < 70 ? [{
      risk: 'Health score below target',
      impact: 'High',
      mitigation: 'Increase engagement frequency and address usage gaps',
    }] : []),
    ...(account.stakeholders.filter(s => s.relationshipStrength === 'Champion').length < 2 ? [{
      risk: 'Limited champion presence',
      impact: 'Medium',
      mitigation: 'Identify and develop additional internal advocates',
    }] : []),
    {
      risk: 'Competitive pressure',
      impact: 'Medium',
      mitigation: 'Demonstrate differentiated value and deepen integrations',
    },
    ...(new Date(account.contractEnd).getTime() - Date.now() < 90 * 24 * 60 * 60 * 1000 ? [{
      risk: 'Renewal approaching',
      impact: 'High',
      mitigation: 'Begin renewal discussions early, prepare business case',
    }] : []),
  ]

  const getStatusBadge = (status: 'complete' | 'in_progress' | 'planned') => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-700">Complete</Badge>
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
      case 'planned':
        return <Badge className="bg-gray-100 text-gray-700">Planned</Badge>
    }
  }

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>
      case 'low':
        return <Badge variant="outline">Low</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Account Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4" />
            Account Goals - {currentQuarter}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {accountGoals.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.category}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{category.category}</span>
                  </div>
                  <div className="space-y-3 ml-6">
                    {category.goals.map((goal, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{goal.title}</span>
                          <span className="text-xs text-muted-foreground">{goal.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs mb-2">
                          <span>Current: <strong>{goal.current}</strong></span>
                          <span>Target: <strong>{goal.target}</strong></span>
                        </div>
                        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "absolute h-full rounded-full transition-all",
                              goal.progress >= 80 ? 'bg-green-500' :
                              goal.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            )}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-right mt-1 text-muted-foreground">
                          {goal.progress}% complete
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Initiatives */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Key Initiatives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {keyInitiatives.map((initiative, idx) => (
              <div key={idx} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {initiative.status === 'complete' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : initiative.status === 'in_progress' ? (
                      <Circle className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="font-medium text-sm">{initiative.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(initiative.priority)}
                    {getStatusBadge(initiative.status)}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground ml-6">{initiative.description}</p>
                <div className="text-xs text-muted-foreground ml-6 mt-1">
                  Owner: {initiative.owner}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk Factors & Mitigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {riskFactors.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No significant risks identified
            </p>
          ) : (
            <div className="space-y-3">
              {riskFactors.map((risk, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-3 border rounded-lg",
                    risk.impact === 'High' && "border-red-200 bg-red-50",
                    risk.impact === 'Medium' && "border-yellow-200 bg-yellow-50"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={cn(
                      "h-4 w-4 mt-0.5",
                      risk.impact === 'High' ? 'text-red-600' : 'text-yellow-600'
                    )} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{risk.risk}</span>
                        <Badge variant={risk.impact === 'High' ? 'destructive' : 'secondary'}>
                          {risk.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <strong>Mitigation:</strong> {risk.mitigation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Success Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Success Criteria - {currentYear}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm font-medium mb-2">Q1-Q2 Milestones</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Achieve 85%+ seat utilization</li>
                <li>• Document 2+ referenceable use cases</li>
                <li>• Identify $100K+ expansion opportunity</li>
                <li>• Maintain health score above 75</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm font-medium mb-2">Q3-Q4 Milestones</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Achieve 20% ARR growth</li>
                <li>• Expand to 3+ new departments</li>
                <li>• Develop 3+ internal champions</li>
                <li>• Complete successful renewal</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
