import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X, MessageSquare, Phone, Mail, Video, Users, Check } from 'lucide-react'

interface LogInteractionModalProps {
  isOpen: boolean
  onClose: () => void
  accountName: string
}

const interactionTypes = [
  { value: 'meeting', label: 'Meeting', icon: Users },
  { value: 'call', label: 'Call', icon: Phone },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'video', label: 'Video Call', icon: Video },
]

export default function LogInteractionModal({
  isOpen,
  onClose,
  accountName,
}: LogInteractionModalProps) {
  const [type, setType] = useState('meeting')
  const [subject, setSubject] = useState('')
  const [notes, setNotes] = useState('')
  const [attendees, setAttendees] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
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
      setType('meeting')
      setSubject('')
      setNotes('')
      setAttendees('')
      setDate(new Date().toISOString().split('T')[0])
    }, 1500)
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
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Log Interaction</h2>
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
            <h3 className="text-lg font-medium mb-2">Interaction Logged</h3>
            <p className="text-muted-foreground text-sm">
              Your interaction with {accountName} has been recorded.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Recording interaction for <span className="font-medium text-foreground">{accountName}</span>
            </div>

            {/* Interaction Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <div className="flex flex-wrap gap-2">
                {interactionTypes.map((t) => {
                  const Icon = t.icon
                  return (
                    <Badge
                      key={t.value}
                      variant={type === t.value ? 'default' : 'outline'}
                      className="cursor-pointer py-1.5 px-3"
                      onClick={() => setType(t.value)}
                    >
                      <Icon className="h-3.5 w-3.5 mr-1.5" />
                      {t.label}
                    </Badge>
                  )
                })}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input
                placeholder="e.g., Q1 Business Review"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            {/* Attendees */}
            <div>
              <label className="text-sm font-medium mb-2 block">Attendees</label>
              <Input
                placeholder="e.g., John Smith, Jane Doe"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium mb-2 block">Notes</label>
              <textarea
                className="w-full min-h-[100px] px-3 py-2 text-sm border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Key discussion points, outcomes, action items..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Log Interaction
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
