import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SalesforceData } from '@/types'
import { ExternalLink, RefreshCw, Check, AlertCircle, Clock } from 'lucide-react'

interface SalesforceIntegrationProps {
  salesforce: SalesforceData
  accountId?: string
  accountName?: string
}

export default function SalesforceIntegration({ salesforce, accountId, accountName }: SalesforceIntegrationProps) {
  const getSyncStatusIcon = () => {
    switch (salesforce.syncStatus) {
      case 'success':
        return <Check className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getSyncStatusBadge = () => {
    switch (salesforce.syncStatus) {
      case 'success':
        return <Badge variant="success">Synced</Badge>
      case 'pending':
        return <Badge variant="warning">Syncing...</Badge>
      case 'error':
        return <Badge variant="danger">Sync Error</Badge>
    }
  }

  const formatSyncTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`
    }
    if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`
    }
    return date.toLocaleDateString('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          {/* Salesforce logo (simplified) */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              fill="#00A1E0"
            />
          </svg>
          Salesforce Integration
        </CardTitle>
        {getSyncStatusBadge()}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Sync status */}
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-2">
              {getSyncStatusIcon()}
              <span className="text-sm">
                Last synced: {formatSyncTime(salesforce.lastSyncTime)}
              </span>
            </div>
            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
          </div>

          {/* Account details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Account Owner</div>
              <div className="text-sm font-medium">{salesforce.accountOwner}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Account Executive</div>
              <div className="text-sm font-medium">{salesforce.accountExecutive}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">SF Account ID</div>
              <div className="text-sm font-mono text-muted-foreground">
                {salesforce.sfAccountId}
              </div>
            </div>
          </div>

          {/* Link to Salesforce (mock page) */}
          <Link
            to={`/salesforce?accountId=${accountId || ''}&accountName=${encodeURIComponent(accountName || '')}&sfId=${salesforce.sfAccountId}`}
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="h-4 w-4" />
            View in Salesforce
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
