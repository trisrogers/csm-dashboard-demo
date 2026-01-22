import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import HealthScoreBadge from '@/components/accounts/HealthScoreBadge'
import LogInteractionModal from './LogInteractionModal'
import CreateTaskModal from './CreateTaskModal'
import type { Account } from '@/types'
import { formatCurrency, formatPercentage, daysUntil } from '@/lib/calculations'
import {
  ArrowLeft,
  ExternalLink,
  Building2,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
} from 'lucide-react'

interface AccountHeaderProps {
  account: Account
}

export default function AccountHeader({ account }: AccountHeaderProps) {
  const [showInteractionModal, setShowInteractionModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showMeetingToast, setShowMeetingToast] = useState(false)
  const daysToRenewal = daysUntil(account.contractEnd)
  const renewalUrgent = daysToRenewal <= 90

  const getTierBadgeVariant = (): 'default' | 'secondary' | 'outline' => {
    switch (account.tier) {
      case 'Strategic':
        return 'default'
      case 'Enterprise':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <div className="border-b pb-6 mb-6">
      {/* Back link */}
      <Link
        to="/accounts"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Accounts
      </Link>

      <div className="flex items-start justify-between gap-6">
        {/* Left side - Account info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{account.name}</h1>
            <Badge variant={getTierBadgeVariant()}>{account.tier}</Badge>
            <Badge variant="outline">{account.lifecycleStage}</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {account.industry}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {account.city}, {account.country}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {account.employeeCount.toLocaleString()} employees
            </span>
            <a
              href={account.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Website
            </a>
          </div>

          {/* Products */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Products:</span>
            {account.products
              .filter((p) => p.active)
              .map((product) => (
                <Badge
                  key={product.type}
                  variant="outline"
                  className={
                    product.type === 'api'
                      ? 'border-blue-200 text-blue-700'
                      : product.type === 'enterprise'
                      ? 'border-purple-200 text-purple-700'
                      : 'border-cyan-200 text-cyan-700'
                  }
                >
                  {product.name}
                </Badge>
              ))}
          </div>
        </div>

        {/* Right side - Key metrics */}
        <div className="flex gap-6">
          {/* Health Score */}
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Health Score</div>
            <HealthScoreBadge
              score={account.healthScore.overall}
              trend={account.healthScore.trend}
              size="lg"
            />
          </div>

          {/* ARR */}
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">ARR</div>
            <div className="text-2xl font-bold">{formatCurrency(account.arr, true)}</div>
            <div className="flex items-center justify-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              {formatPercentage(account.nrr)} NRR
            </div>
          </div>

          {/* Days to Renewal */}
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Renewal</div>
            <div
              className={`text-2xl font-bold ${renewalUrgent ? 'text-red-600' : ''}`}
            >
              {daysToRenewal}d
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(account.contractEnd).toLocaleDateString('en-AU', {
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-4">
        <Button size="sm" onClick={() => setShowInteractionModal(true)}>
          Log Interaction
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setShowMeetingToast(true)
            setTimeout(() => setShowMeetingToast(false), 3000)
          }}
        >
          Schedule Meeting
        </Button>
        <Button size="sm" variant="outline" onClick={() => setShowTaskModal(true)}>
          Create Task
        </Button>
      </div>

      {/* Toast for Schedule Meeting */}
      {showMeetingToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Calendar className="h-5 w-5 text-blue-400" />
          <div>
            <p className="font-medium text-sm">Calendar Integration</p>
            <p className="text-xs text-gray-300">Google Calendar / Outlook integration coming soon</p>
          </div>
        </div>
      )}

      {/* Modals */}
      <LogInteractionModal
        isOpen={showInteractionModal}
        onClose={() => setShowInteractionModal(false)}
        accountName={account.name}
      />
      <CreateTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        accountName={account.name}
      />
    </div>
  )
}
