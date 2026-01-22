import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Account } from '@/types'
import { formatCurrency } from '@/lib/calculations'
import {
  AlertTriangle,
  TrendingDown,
  Calendar,
  Users,
  BarChart3,
  MessageSquare,
  Clock,
  ArrowRight,
  Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PrioritizationViewProps {
  accounts: Account[]
}

interface PrioritizedAccount extends Account {
  priorityScore: number
  topActions: { action: string; priority: 'high' | 'medium' | 'low'; icon: React.ReactNode }[]
}

export function PrioritizationView({ accounts }: PrioritizationViewProps) {
  // Calculate priority score: inverse health × ARR (lower health + higher ARR = higher priority)
  const prioritizedAccounts: PrioritizedAccount[] = accounts
    .map(account => {
      // Priority score: (100 - health) × (ARR / 100000)
      // This gives higher priority to unhealthy accounts with high ARR
      const healthFactor = 100 - account.healthScore.overall
      const arrFactor = account.arr / 100000
      const priorityScore = healthFactor * arrFactor

      // Generate top actions based on account state
      const topActions: { action: string; priority: 'high' | 'medium' | 'low'; icon: React.ReactNode }[] = []

      // Health-related actions
      if (account.healthScore.overall < 60) {
        topActions.push({
          action: 'Schedule urgent health review call',
          priority: 'high',
          icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
        })
      }

      // Usage decline
      const latestUsage = account.usageHistory[account.usageHistory.length - 1]
      const previousUsage = account.usageHistory[account.usageHistory.length - 2]
      if (latestUsage?.api && previousUsage?.api) {
        const usageChange = (latestUsage.api.totalTokens - previousUsage.api.totalTokens) / previousUsage.api.totalTokens
        if (usageChange < -0.2) {
          topActions.push({
            action: 'Investigate API usage decline (-20%+)',
            priority: 'high',
            icon: <TrendingDown className="h-4 w-4 text-orange-500" />,
          })
        }
      }

      // Renewal approaching
      const renewalDate = new Date(account.contractEnd)
      const daysToRenewal = Math.floor((renewalDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      if (daysToRenewal <= 90 && daysToRenewal > 0) {
        topActions.push({
          action: `Prepare renewal (${daysToRenewal} days)`,
          priority: daysToRenewal <= 30 ? 'high' : 'medium',
          icon: <Calendar className="h-4 w-4 text-blue-500" />,
        })
      }

      // Stakeholder engagement
      const daysSinceContact = account.stakeholders.reduce((min, s) => {
        const days = Math.floor((Date.now() - new Date(s.lastContact).getTime()) / (1000 * 60 * 60 * 24))
        return Math.min(min, days)
      }, Infinity)
      if (daysSinceContact > 30) {
        topActions.push({
          action: `Re-engage stakeholders (${daysSinceContact}d since contact)`,
          priority: daysSinceContact > 60 ? 'high' : 'medium',
          icon: <Users className="h-4 w-4 text-purple-500" />,
        })
      }

      // QBR due
      const upcomingQBR = account.qbrs.find(q => q.status !== 'Completed')
      if (!upcomingQBR) {
        topActions.push({
          action: 'Schedule next QBR',
          priority: 'medium',
          icon: <Calendar className="h-4 w-4 text-green-500" />,
        })
      }

      // Feature requests pending
      const pendingRequests = account.featureRequests.filter(f => f.status === 'Under Review')
      if (pendingRequests.length > 0) {
        topActions.push({
          action: `Follow up on ${pendingRequests.length} feature request(s)`,
          priority: 'low',
          icon: <MessageSquare className="h-4 w-4 text-gray-500" />,
        })
      }

      // Expansion opportunity
      const activeOpportunities = account.opportunities.filter(
        o => !['Closed Won', 'Closed Lost'].includes(o.stage)
      )
      if (activeOpportunities.length > 0) {
        topActions.push({
          action: `Advance ${activeOpportunities.length} expansion deal(s)`,
          priority: 'medium',
          icon: <Target className="h-4 w-4 text-green-500" />,
        })
      }

      return {
        ...account,
        priorityScore,
        topActions: topActions.slice(0, 5), // Top 5 actions
      }
    })
    .sort((a, b) => b.priorityScore - a.priorityScore)

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600 bg-green-100'
    if (health >= 60) return 'text-yellow-600 bg-yellow-100'
    if (health >= 40) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      case 'low': return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Priority Actions</h2>
          <p className="text-sm text-muted-foreground">
            Accounts sorted by risk-weighted priority (Health × ARR)
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Updated just now
        </Badge>
      </div>

      {/* Prioritized Account Cards */}
      <div className="space-y-4">
        {prioritizedAccounts.map((account, index) => (
          <Card
            key={account.id}
            className={cn(
              "transition-all hover:shadow-md",
              index === 0 && account.healthScore.overall < 60 && "border-red-300"
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Link
                        to={`/accounts/${account.id}`}
                        className="hover:text-primary hover:underline"
                      >
                        {account.name}
                      </Link>
                      <Badge variant="outline">{account.tier}</Badge>
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {account.industry} • {account.country}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold">{formatCurrency(account.arr, true)}</div>
                    <div className="text-xs text-muted-foreground">ARR</div>
                  </div>
                  <Badge className={cn("text-lg px-3 py-1", getHealthColor(account.healthScore.overall))}>
                    {account.healthScore.overall}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Top Actions */}
              <div className="space-y-2 mb-4">
                {account.topActions.length === 0 ? (
                  <p className="text-sm text-green-600">✓ No urgent actions required</p>
                ) : (
                  account.topActions.map((action, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-md text-sm border",
                        getPriorityColor(action.priority)
                      )}
                    >
                      {action.icon}
                      <span className="flex-1">{action.action}</span>
                      <Badge
                        variant={action.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {action.priority}
                      </Badge>
                    </div>
                  ))
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/accounts/${account.id}?tab=usage`}>
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Usage
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/accounts/${account.id}?tab=stakeholders`}>
                    <Users className="h-4 w-4 mr-1" />
                    Stakeholders
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/accounts/${account.id}?tab=plan`}>
                    <Calendar className="h-4 w-4 mr-1" />
                    Plan
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="ml-auto" asChild>
                  <Link to={`/accounts/${account.id}`}>
                    View Account
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
