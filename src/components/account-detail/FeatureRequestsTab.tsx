import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account, FeatureRequest } from '@/types'
import { Lightbulb, DollarSign, Calendar, User, ArrowUpRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

interface FeatureRequestsTabProps {
  account: Account
}

const statusConfig: Record<FeatureRequest['status'], { color: string; icon: React.ReactNode }> = {
  'New': { color: 'bg-blue-100 text-blue-800', icon: <Lightbulb className="h-3 w-3" /> },
  'Under Review': { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-3 w-3" /> },
  'Planned': { color: 'bg-purple-100 text-purple-800', icon: <Calendar className="h-3 w-3" /> },
  'In Development': { color: 'bg-orange-100 text-orange-800', icon: <ArrowUpRight className="h-3 w-3" /> },
  'Shipped': { color: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="h-3 w-3" /> },
  'Declined': { color: 'bg-red-100 text-red-800', icon: <AlertCircle className="h-3 w-3" /> },
}

const priorityColors: Record<FeatureRequest['priority'], string> = {
  Critical: 'bg-red-500 text-white',
  High: 'bg-orange-500 text-white',
  Medium: 'bg-yellow-500 text-black',
  Low: 'bg-gray-400 text-white',
}

export function FeatureRequestsTab({ account }: FeatureRequestsTabProps) {
  const { featureRequests } = account

  // Group by status
  const byStatus = {
    active: featureRequests.filter(fr => !['Shipped', 'Declined'].includes(fr.status)),
    shipped: featureRequests.filter(fr => fr.status === 'Shipped'),
    declined: featureRequests.filter(fr => fr.status === 'Declined'),
  }

  const totalRevenueImpact = featureRequests.reduce((sum, fr) => sum + (fr.revenueImpact || 0), 0)
  const criticalCount = featureRequests.filter(fr => fr.priority === 'Critical').length
  const churnRiskCount = featureRequests.filter(fr => fr.churnRisk).length

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{featureRequests.length}</div>
              <div className="text-sm text-muted-foreground">Total Requests</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
              <div className="text-sm text-muted-foreground">Critical Priority</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${(totalRevenueImpact / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-muted-foreground">Revenue Impact</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{churnRiskCount}</div>
              <div className="text-sm text-muted-foreground">Churn Risk</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Active Feature Requests ({byStatus.active.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {byStatus.active.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No active feature requests</p>
          ) : (
            <div className="space-y-4">
              {byStatus.active.map(request => (
                <FeatureRequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipped Requests */}
      {byStatus.shipped.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Shipped ({byStatus.shipped.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {byStatus.shipped.map(request => (
                <FeatureRequestCard key={request.id} request={request} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function FeatureRequestCard({ request }: { request: FeatureRequest }) {
  const statusStyle = statusConfig[request.status]

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{request.title}</h4>
            {request.churnRisk && (
              <Badge variant="destructive" className="text-xs">Churn Risk</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{request.description}</p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{request.requestedByName}</span>
              <span className="text-muted-foreground">({request.department})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {request.dateRequested}
            </div>
          </div>

          {request.businessCase && (
            <p className="text-sm italic text-muted-foreground">
              "{request.businessCase}"
            </p>
          )}

          {request.expectedDelivery && (
            <div className="text-sm text-purple-600">
              Expected: {request.expectedDelivery}
            </div>
          )}
        </div>

        <div className="text-right space-y-2 ml-4">
          <Badge className={`${statusStyle.color} flex items-center gap-1`}>
            {statusStyle.icon}
            {request.status}
          </Badge>
          <Badge className={priorityColors[request.priority]}>
            {request.priority}
          </Badge>
          {request.revenueImpact && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <DollarSign className="h-3 w-3" />
              ${(request.revenueImpact / 1000).toFixed(0)}K impact
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
