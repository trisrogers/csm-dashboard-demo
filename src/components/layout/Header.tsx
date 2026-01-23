import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Building2, BarChart3, Settings } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/accounts', label: 'Accounts', icon: Building2 },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Header() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-8">
          <svg
            viewBox="0 0 256 176"
            className="h-7 w-auto"
            fill="currentColor"
            style={{ color: '#D97757' }}
          >
            <path d="M144.3 0H111.7L0 176h36.8l22.5-35.5h137.4l22.5 35.5H256L144.3 0zm8.4 108.2H103.3L128 67.8l24.7 40.4z" />
          </svg>
          <span className="font-semibold text-lg">CSM Dashboard</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(item.to))
            const Icon = item.icon

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Profile - Clickable link to About Me */}
        <Link to="/about" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="text-right mr-2">
            <p className="text-sm font-medium">Tristan Rogers</p>
            <p className="text-xs text-muted-foreground">APAC Enterprise CSM</p>
          </div>
          <img
            src="/profile.jpg"
            alt="Tristan Rogers"
            className="h-9 w-9 rounded-full object-cover border-2 border-secondary"
          />
        </Link>
      </div>
    </header>
  )
}
