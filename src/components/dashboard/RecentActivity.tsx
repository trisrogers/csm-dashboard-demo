import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account, Interaction } from '@/types'
import { Calendar, MessageSquare, Phone, Mail, Users } from 'lucide-react'

interface RecentActivityProps {
  accounts: Account[]
}

interface ActivityItem {
  interaction: Interaction
  accountName: string
  accountId: string
}

export default function RecentActivity({ accounts }: RecentActivityProps) {
  // Flatten all interactions and sort by date
  const allActivities: ActivityItem[] = accounts
    .flatMap(account =>
      account.interactions.map(interaction => ({
        interaction,
        accountName: account.name,
        accountId: account.id,
      }))
    )
    .sort((a, b) => new Date(b.interaction.date).getTime() - new Date(a.interaction.date).getTime())
    .slice(0, 5)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Meeting':
        return <Users className="h-4 w-4" />
      case 'Call':
        return <Phone className="h-4 w-4" />
      case 'Email':
        return <Mail className="h-4 w-4" />
      case 'QBR':
        return <Calendar className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getTypeBadgeVariant = (type: string): 'default' | 'secondary' | 'outline' => {
    switch (type) {
      case 'Meeting':
      case 'QBR':
        return 'default'
      case 'Call':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {allActivities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent interactions logged
          </p>
        ) : (
          <div className="space-y-4">
            {allActivities.map((activity) => (
              <div
                key={activity.interaction.id}
                className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="mt-1 text-muted-foreground">
                  {getTypeIcon(activity.interaction.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getTypeBadgeVariant(activity.interaction.type)} className="text-xs">
                      {activity.interaction.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(activity.interaction.date)}
                    </span>
                  </div>
                  <p className="text-sm font-medium truncate">{activity.accountName}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {activity.interaction.summary}
                  </p>
                  {activity.interaction.topics.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {activity.interaction.topics.slice(0, 3).map((topic, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
