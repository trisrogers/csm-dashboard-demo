import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account, Stakeholder } from '@/types'
import { Users, Mail, Phone, Calendar, Linkedin, MessageSquare } from 'lucide-react'

interface StakeholdersTabProps {
  account: Account
}

const relationshipColors: Record<Stakeholder['relationshipStrength'], string> = {
  Champion: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Supporter: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  Blocker: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const influenceColors: Record<Stakeholder['influenceLevel'], string> = {
  High: 'text-orange-600',
  Medium: 'text-yellow-600',
  Low: 'text-gray-500',
}

export function StakeholdersTab({ account }: StakeholdersTabProps) {
  const { stakeholders } = account

  // Group by relationship strength for org chart-like view
  const champions = stakeholders.filter(s => s.relationshipStrength === 'Champion')
  const supporters = stakeholders.filter(s => s.relationshipStrength === 'Supporter')
  const neutrals = stakeholders.filter(s => s.relationshipStrength === 'Neutral')
  const blockers = stakeholders.filter(s => s.relationshipStrength === 'Blocker')

  const executives = stakeholders.filter(s => s.stakeholderType === 'Executive')
  const technical = stakeholders.filter(s => s.stakeholderType === 'Technical')
  const business = stakeholders.filter(s => s.stakeholderType === 'Business')

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{champions.length}</div>
              <div className="text-sm text-muted-foreground">Champions</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{supporters.length}</div>
              <div className="text-sm text-muted-foreground">Supporters</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{neutrals.length}</div>
              <div className="text-sm text-muted-foreground">Neutral</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{blockers.length}</div>
              <div className="text-sm text-muted-foreground">Blockers</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Org Chart by Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Organization Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {/* Executives */}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                Executive ({executives.length})
              </h4>
              <div className="space-y-3">
                {executives.map(stakeholder => (
                  <StakeholderCard key={stakeholder.id} stakeholder={stakeholder} />
                ))}
              </div>
            </div>

            {/* Technical */}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                Technical ({technical.length})
              </h4>
              <div className="space-y-3">
                {technical.map(stakeholder => (
                  <StakeholderCard key={stakeholder.id} stakeholder={stakeholder} />
                ))}
              </div>
            </div>

            {/* Business */}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                Business ({business.length})
              </h4>
              <div className="space-y-3">
                {business.map(stakeholder => (
                  <StakeholderCard key={stakeholder.id} stakeholder={stakeholder} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Stakeholder List */}
      <Card>
        <CardHeader>
          <CardTitle>All Stakeholders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stakeholders.map(stakeholder => (
              <div key={stakeholder.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stakeholder.name}</span>
                    {stakeholder.decisionMaker && (
                      <Badge variant="outline" className="text-xs">Decision Maker</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{stakeholder.title}</div>
                  <div className="text-sm text-muted-foreground">{stakeholder.department}</div>

                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <a href={`mailto:${stakeholder.email}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                      <Mail className="h-3 w-3" />
                      Email
                    </a>
                    {stakeholder.phone && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {stakeholder.phone}
                      </span>
                    )}
                    {stakeholder.linkedIn && (
                      <a href={stakeholder.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                        <Linkedin className="h-3 w-3" />
                        LinkedIn
                      </a>
                    )}
                  </div>

                  {stakeholder.notes && (
                    <p className="text-sm text-muted-foreground mt-2 italic">"{stakeholder.notes}"</p>
                  )}
                </div>

                <div className="text-right space-y-2">
                  <Badge className={relationshipColors[stakeholder.relationshipStrength]}>
                    {stakeholder.relationshipStrength}
                  </Badge>
                  <div className={`text-sm font-medium ${influenceColors[stakeholder.influenceLevel]}`}>
                    {stakeholder.influenceLevel} Influence
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Last: {stakeholder.lastContact}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare className="h-3 w-3" />
                    Prefers: {stakeholder.preferredCommunication}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StakeholderCard({ stakeholder }: { stakeholder: Stakeholder }) {
  return (
    <div className="p-3 border rounded-lg bg-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium text-sm">{stakeholder.name}</div>
          <div className="text-xs text-muted-foreground">{stakeholder.title}</div>
        </div>
        <Badge className={`text-xs ${relationshipColors[stakeholder.relationshipStrength]}`}>
          {stakeholder.relationshipStrength.charAt(0)}
        </Badge>
      </div>
      <div className={`text-xs mt-1 ${influenceColors[stakeholder.influenceLevel]}`}>
        {stakeholder.influenceLevel} Influence
      </div>
    </div>
  )
}
