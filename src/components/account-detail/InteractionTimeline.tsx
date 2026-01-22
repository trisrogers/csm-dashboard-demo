import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Interaction } from '@/types'
import { Calendar, Users, Phone, Mail, Video, Coffee, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InteractionTimelineProps {
  interactions: Interaction[]
}

export default function InteractionTimeline({ interactions }: InteractionTimelineProps) {
  // Sort by date descending (most recent first)
  const sortedInteractions = [...interactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const getTypeIcon = (type: Interaction['type']) => {
    switch (type) {
      case 'Meeting':
        return <Users className="h-4 w-4" />
      case 'Call':
        return <Phone className="h-4 w-4" />
      case 'Email':
        return <Mail className="h-4 w-4" />
      case 'QBR':
        return <Video className="h-4 w-4" />
      case 'Event':
        return <Coffee className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: Interaction['type']) => {
    switch (type) {
      case 'Meeting':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Call':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Email':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'QBR':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'Event':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getSentimentColor = (sentiment: Interaction['sentiment']) => {
    switch (sentiment) {
      case 'Positive':
        return 'text-green-600'
      case 'Negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-AU', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatDuration = (minutes?: number) => {
    if (!minutes) return null
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Interaction Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedInteractions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No interactions recorded
          </p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-4">
              {sortedInteractions.map((interaction, index) => (
                <div key={interaction.id} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={cn(
                    "absolute left-2 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center",
                    index === 0 ? "bg-primary" : "bg-muted"
                  )}>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      index === 0 ? "bg-white" : "bg-muted-foreground"
                    )} />
                  </div>

                  {/* Interaction card */}
                  <div className="p-3 border rounded-lg hover:bg-secondary/30 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn("flex items-center gap-1", getTypeColor(interaction.type))}>
                          {getTypeIcon(interaction.type)}
                          {interaction.type}
                        </Badge>
                        {interaction.duration && (
                          <span className="text-xs text-muted-foreground">
                            {formatDuration(interaction.duration)}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(interaction.date)}
                      </span>
                    </div>

                    <p className="text-sm mb-2">{interaction.summary}</p>

                    {/* Topics */}
                    {interaction.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {interaction.topics.map((topic, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Action items */}
                    {interaction.actionItems.length > 0 && (
                      <div className="mt-2 pt-2 border-t">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <ArrowRight className="h-3 w-3" />
                          Action Items ({interaction.actionItems.length})
                        </div>
                        <ul className="text-xs space-y-0.5">
                          {interaction.actionItems.slice(0, 2).map((item) => (
                            <li key={item.id} className={cn(
                              "flex items-start gap-1",
                              item.status === 'Complete' && "line-through text-muted-foreground"
                            )}>
                              <span className="text-muted-foreground">•</span>
                              <span>{item.description}</span>
                            </li>
                          ))}
                          {interaction.actionItems.length > 2 && (
                            <li className="text-muted-foreground">
                              +{interaction.actionItems.length - 2} more
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Sentiment indicator */}
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Sentiment:</span>
                      <span className={cn("font-medium", getSentimentColor(interaction.sentiment))}>
                        {interaction.sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
