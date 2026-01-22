import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X, ClipboardList, Check, AlertCircle, AlertTriangle, Minus, ChevronDown } from 'lucide-react'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  accountName: string
}

const priorities = [
  { value: 'Critical', label: 'Critical', icon: AlertCircle, color: 'text-red-600 bg-red-50 border-red-200' },
  { value: 'High', label: 'High', icon: AlertTriangle, color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { value: 'Medium', label: 'Medium', icon: Minus, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  { value: 'Low', label: 'Low', icon: ChevronDown, color: 'text-gray-600 bg-gray-50 border-gray-200' },
]

const taskTypes = [
  'Follow-up',
  'QBR Preparation',
  'Health Check',
  'Expansion Discussion',
  'Technical Review',
  'Stakeholder Outreach',
  'Contract Review',
  'Other',
]

export default function CreateTaskModal({
  isOpen,
  onClose,
  accountName,
}: CreateTaskModalProps) {
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [taskType, setTaskType] = useState('Follow-up')
  const [dueDate, setDueDate] = useState('')
  const [owner, setOwner] = useState('Tristan Rogers')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission - in real app would save to backend
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
      // Reset form
      setDescription('')
      setPriority('Medium')
      setTaskType('Follow-up')
      setDueDate('')
      setOwner('Tristan Rogers')
    }, 1500)
  }

  // Set default due date to 7 days from now
  const getDefaultDueDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toISOString().split('T')[0]
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Create Task</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Task Created</h3>
            <p className="text-muted-foreground text-sm">
              Your task for {accountName} has been added.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Creating task for <span className="font-medium text-foreground">{accountName}</span>
            </div>

            {/* Task Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Task Type</label>
              <div className="flex flex-wrap gap-2">
                {taskTypes.map((t) => (
                  <Badge
                    key={t}
                    variant={taskType === t ? 'default' : 'outline'}
                    className="cursor-pointer py-1 px-2 text-xs"
                    onClick={() => setTaskType(t)}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <textarea
                className="w-full min-h-[80px] px-3 py-2 text-sm border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="What needs to be done?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <div className="flex flex-wrap gap-2">
                {priorities.map((p) => {
                  const Icon = p.icon
                  return (
                    <Badge
                      key={p.value}
                      variant="outline"
                      className={`cursor-pointer py-1.5 px-3 ${
                        priority === p.value ? p.color : ''
                      }`}
                      onClick={() => setPriority(p.value)}
                    >
                      <Icon className="h-3.5 w-3.5 mr-1.5" />
                      {p.label}
                    </Badge>
                  )
                })}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="text-sm font-medium mb-2 block">Due Date</label>
              <Input
                type="date"
                value={dueDate || getDefaultDueDate()}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            {/* Owner */}
            <div>
              <label className="text-sm font-medium mb-2 block">Owner</label>
              <Input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Create Task
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
