import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ComplianceCard } from './ComplianceCard'
import type { Account, SupportTicket } from '@/types'
import {
  TicketCheck,
  AlertCircle,
  Clock,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Headphones,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

interface SupportTabProps {
  account: Account
}

export function SupportTab({ account }: SupportTabProps) {
  const tickets = account.supportTickets || []

  // Calculate metrics
  const openTickets = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress')
  const closedTickets = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed')
  const escalatedTickets = tickets.filter(t => t.escalated)

  // Severity distribution
  const severityDistribution = [
    { name: 'P0 - Critical', value: tickets.filter(t => t.severity === 'P0').length, color: '#ef4444' },
    { name: 'P1 - High', value: tickets.filter(t => t.severity === 'P1').length, color: '#f97316' },
    { name: 'P2 - Medium', value: tickets.filter(t => t.severity === 'P2').length, color: '#eab308' },
    { name: 'P3 - Low', value: tickets.filter(t => t.severity === 'P3').length, color: '#22c55e' },
  ].filter(s => s.value > 0)

  // Category distribution
  const categories = tickets.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categoryData = Object.entries(categories)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)

  // Calculate average resolution time
  const resolvedWithDates = closedTickets.filter(t => t.resolvedDate && t.createdDate)
  const avgResolutionDays = resolvedWithDates.length > 0
    ? Math.round(resolvedWithDates.reduce((sum, t) => {
        const created = new Date(t.createdDate)
        const resolved = new Date(t.resolvedDate!)
        return sum + (resolved.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
      }, 0) / resolvedWithDates.length)
    : 0

  const getSeverityColor = (severity: SupportTicket['severity']) => {
    switch (severity) {
      case 'P0': return 'bg-red-100 text-red-700 border-red-200'
      case 'P1': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'P2': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'P3': return 'bg-green-100 text-green-700 border-green-200'
    }
  }

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-700'
      case 'In Progress': return 'bg-yellow-100 text-yellow-700'
      case 'Resolved': return 'bg-green-100 text-green-700'
      case 'Closed': return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Technical engagement data (mock)
  const technicalEngagement = {
    technicalCalls: 4,
    trainingsSessions: 2,
    officeHoursAttended: 3,
    documentationViews: 156,
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TicketCheck className="h-4 w-4" />
              <span className="text-sm">Open Tickets</span>
            </div>
            <div className="text-2xl font-bold">{openTickets.length}</div>
            <div className="text-xs text-muted-foreground">
              {escalatedTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length} escalated
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Resolved (90d)</span>
            </div>
            <div className="text-2xl font-bold">{closedTickets.length}</div>
            <div className="text-xs text-muted-foreground">
              of {tickets.length} total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Avg Resolution</span>
            </div>
            <div className="text-2xl font-bold">{avgResolutionDays} days</div>
            <div className="flex items-center text-xs">
              {avgResolutionDays <= 3 ? (
                <>
                  <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600">Good</span>
                </>
              ) : (
                <>
                  <TrendingUp className="h-3 w-3 text-red-600 mr-1" />
                  <span className="text-red-600">Needs improvement</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Escalations</span>
            </div>
            <div className="text-2xl font-bold">{escalatedTickets.length}</div>
            <div className="text-xs text-muted-foreground">
              {tickets.length > 0 ? Math.round(escalatedTickets.length / tickets.length * 100) : 0}% escalation rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Headphones className="h-4 w-4" />
              <span className="text-sm">Support Health</span>
            </div>
            <div className={cn(
              "text-2xl font-bold",
              account.healthScore.supportHealth >= 80 ? 'text-green-600' :
              account.healthScore.supportHealth >= 60 ? 'text-yellow-600' : 'text-red-600'
            )}>
              {account.healthScore.supportHealth}
            </div>
            <div className="text-xs text-muted-foreground">Health component</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ticket Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {severityDistribution.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No tickets recorded</p>
            ) : (
              <div className="flex items-center gap-4">
                <div className="h-48 w-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={severityDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {severityDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {severityDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                      <span className="font-medium ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tickets by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No tickets recorded</p>
            ) : (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="category" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Technical Engagement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" />
            Technical Stakeholder Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{technicalEngagement.technicalCalls}</div>
              <div className="text-xs text-muted-foreground">Technical Calls (90d)</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{technicalEngagement.trainingsSessions}</div>
              <div className="text-xs text-muted-foreground">Training Sessions</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{technicalEngagement.officeHoursAttended}</div>
              <div className="text-xs text-muted-foreground">Office Hours Attended</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{technicalEngagement.documentationViews}</div>
              <div className="text-xs text-muted-foreground">Doc Views (30d)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance */}
      <ComplianceCard account={account} />

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Recent Support Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No support tickets recorded</p>
          ) : (
            <div className="space-y-3">
              {tickets
                .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
                .slice(0, 5)
                .map((ticket) => (
                  <div
                    key={ticket.id}
                    className={cn(
                      "p-3 border rounded-lg",
                      ticket.escalated && "border-red-200 bg-red-50"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={getSeverityColor(ticket.severity)}>
                            {ticket.severity}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          {ticket.escalated && (
                            <Badge variant="destructive">Escalated</Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-sm">{ticket.title}</h4>
                        <div className="text-xs text-muted-foreground mt-1">
                          {ticket.category} • Created: {formatDate(ticket.createdDate)}
                          {ticket.resolvedDate && ` • Resolved: ${formatDate(ticket.resolvedDate)}`}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <div>Assignee:</div>
                        <div className="font-medium">{ticket.assignee}</div>
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
