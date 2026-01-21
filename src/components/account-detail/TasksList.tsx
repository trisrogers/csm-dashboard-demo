import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Task } from '@/types'
import { CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TasksListProps {
  tasks: Task[]
  showAll?: boolean
}

export default function TasksList({ tasks, showAll = false }: TasksListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by status (incomplete first), then by due date
    const statusOrder = { 'Not Started': 0, 'In Progress': 1, Blocked: 2, Complete: 3 }
    const statusDiff = statusOrder[a.status] - statusOrder[b.status]
    if (statusDiff !== 0) return statusDiff
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'Complete':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'Blocked':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>
      case 'High':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">High</Badge>
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    }
    return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })
  }

  const incompleteTasks = sortedTasks.filter((t) => t.status !== 'Complete')
  const completedTasks = sortedTasks.filter((t) => t.status === 'Complete')

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Tasks & Next Steps</CardTitle>
        <Badge variant="outline">
          {incompleteTasks.length} open
        </Badge>
      </CardHeader>
      <CardContent>
        {sortedTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No tasks for this account
          </p>
        ) : (
          <div className="space-y-4">
            {/* Incomplete tasks */}
            {incompleteTasks.length > 0 && (
              <div className="space-y-2">
                {incompleteTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg border',
                      isOverdue(task.dueDate) &&
                        task.status !== 'Complete' &&
                        'border-red-200 bg-red-50'
                    )}
                  >
                    <div className="mt-0.5">{getStatusIcon(task.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{task.description}</span>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Owner: {task.owner}</span>
                        <span
                          className={cn(
                            isOverdue(task.dueDate) && task.status !== 'Complete'
                              ? 'text-red-600 font-medium'
                              : ''
                          )}
                        >
                          Due: {formatDueDate(task.dueDate)}
                          {isOverdue(task.dueDate) && task.status !== 'Complete' && ' (Overdue)'}
                        </span>
                        {task.relatedType && (
                          <span className="capitalize">Related: {task.relatedType}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed tasks */}
            {completedTasks.length > 0 && (
              <div className="pt-4 border-t">
                <div className="text-xs text-muted-foreground mb-2">
                  Completed ({completedTasks.length})
                </div>
                <div className="space-y-2">
                  {(showAll ? completedTasks : completedTasks.slice(0, 3)).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 opacity-60"
                    >
                      {getStatusIcon(task.status)}
                      <span className="text-sm line-through">{task.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
