import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account } from '@/types'
import { Shield, CheckCircle2, Clock, AlertTriangle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComplianceCardProps {
  account: Account
}

interface ComplianceStandard {
  name: string
  description: string
  status: 'compliant' | 'in_progress' | 'not_compliant'
  products: string[]
  lastAudit?: string
  nextReview?: string
}

export function ComplianceCard({ account }: ComplianceCardProps) {
  // Generate compliance data based on account requirements
  const complianceRequirements = account.complianceRequirements || []

  // Map common compliance standards with their status
  const complianceStandards: ComplianceStandard[] = [
    {
      name: 'SOC 2 Type II',
      description: 'Security, availability, processing integrity, confidentiality, and privacy controls',
      status: 'compliant',
      products: ['Claude API', 'Claude Enterprise', 'Claude Code'],
      lastAudit: '2025-12-15',
      nextReview: '2026-12-15',
    },
    {
      name: 'ISO 27001',
      description: 'Information security management system certification',
      status: 'compliant',
      products: ['Claude API', 'Claude Enterprise', 'Claude Code'],
      lastAudit: '2025-10-01',
      nextReview: '2026-10-01',
    },
    {
      name: 'GDPR',
      description: 'General Data Protection Regulation (EU/UK data protection)',
      status: complianceRequirements.includes('GDPR') ? 'compliant' : 'not_compliant',
      products: ['Claude API', 'Claude Enterprise'],
      lastAudit: '2025-11-20',
    },
    {
      name: 'HIPAA',
      description: 'Health Insurance Portability and Accountability Act',
      status: complianceRequirements.includes('HIPAA') ? 'in_progress' : 'not_compliant',
      products: ['Claude API'],
    },
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      status: complianceRequirements.includes('PCI DSS') ? 'compliant' : 'not_compliant',
      products: ['Claude API'],
      lastAudit: '2025-09-15',
    },
    {
      name: 'APRA CPS 234',
      description: 'Australian Prudential Regulation Authority Information Security',
      status: account.country === 'Australia' && account.industry === 'Financial Services' ? 'compliant' : 'not_compliant',
      products: ['Claude API', 'Claude Enterprise'],
    },
    {
      name: 'MAS TRM',
      description: 'Monetary Authority of Singapore Technology Risk Management',
      status: account.country === 'Singapore' && account.industry === 'Financial Services' ? 'compliant' : 'not_compliant',
      products: ['Claude API', 'Claude Enterprise'],
    },
  ]

  // Filter to relevant standards (compliant or in_progress, plus any explicitly required)
  const relevantStandards = complianceStandards.filter(
    s => s.status !== 'not_compliant' || complianceRequirements.includes(s.name)
  )

  const getStatusIcon = (status: ComplianceStandard['status']) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'not_compliant':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusBadge = (status: ComplianceStandard['status']) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-700">Compliant</Badge>
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>
      case 'not_compliant':
        return <Badge className="bg-red-100 text-red-700">Not Met</Badge>
    }
  }

  const compliantCount = relevantStandards.filter(s => s.status === 'compliant').length
  const inProgressCount = relevantStandards.filter(s => s.status === 'in_progress').length
  const notCompliantCount = relevantStandards.filter(s => s.status === 'not_compliant').length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Safety & Compliance
          </div>
          <a
            href="https://trust.anthropic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-normal"
          >
            Anthropic Trust Center
            <ExternalLink className="h-3 w-3" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{compliantCount}</div>
            <div className="text-xs text-green-700">Compliant</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{inProgressCount}</div>
            <div className="text-xs text-yellow-700">In Progress</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{notCompliantCount}</div>
            <div className="text-xs text-red-700">Required</div>
          </div>
        </div>

        {/* Compliance Standards List */}
        <div className="space-y-3">
          {relevantStandards.map((standard) => (
            <div
              key={standard.name}
              className={cn(
                "p-3 border rounded-lg",
                standard.status === 'compliant' && "border-green-200 bg-green-50/30",
                standard.status === 'in_progress' && "border-yellow-200 bg-yellow-50/30",
                standard.status === 'not_compliant' && "border-red-200 bg-red-50/30"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  {getStatusIcon(standard.status)}
                  <div>
                    <div className="font-medium text-sm">{standard.name}</div>
                    <div className="text-xs text-muted-foreground">{standard.description}</div>
                  </div>
                </div>
                {getStatusBadge(standard.status)}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-muted-foreground">Products:</span>
                {standard.products.map((product) => (
                  <Badge key={product} variant="outline" className="text-xs">
                    {product}
                  </Badge>
                ))}
              </div>
              {standard.lastAudit && (
                <div className="mt-1 text-xs text-muted-foreground">
                  Last audit: {new Date(standard.lastAudit).toLocaleDateString('en-AU', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  {standard.nextReview && (
                    <> • Next review: {new Date(standard.nextReview).toLocaleDateString('en-AU', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}</>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Customer Requirements */}
        {complianceRequirements.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm font-medium mb-2">Customer Requirements</div>
            <div className="flex flex-wrap gap-2">
              {complianceRequirements.map((req) => (
                <Badge key={req} variant="secondary">{req}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
