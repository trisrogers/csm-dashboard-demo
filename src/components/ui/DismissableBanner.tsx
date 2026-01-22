import { useState, useEffect } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { Button } from './button'

const STORAGE_KEY = 'csm-demo-banner-dismissed'

export default function DismissableBanner() {
  const [isDismissed, setIsDismissed] = useState(true) // Start hidden to prevent flash

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    setIsDismissed(dismissed === 'true')
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  if (isDismissed) return null

  return (
    <div className="bg-red-600 text-white px-4 py-3 relative">
      <div className="container mx-auto max-w-7xl flex items-center justify-center gap-3">
        <AlertTriangle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium text-center">
          This project is for a job application. All processes and data have been mocked-up or assumed and there is no client or Anthropic information represented on this site.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-red-700 p-1 h-auto"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  )
}
