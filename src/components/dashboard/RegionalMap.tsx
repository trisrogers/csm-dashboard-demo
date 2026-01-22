import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account } from '@/types'
import { formatCurrency } from '@/lib/calculations'
import { MapPin, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RegionalMapProps {
  accounts: Account[]
}

// APAC country positions (approximate, for visualization)
const countryPositions: Record<string, { x: number; y: number; name: string }> = {
  'Australia': { x: 78, y: 75, name: 'Australia' },
  'Singapore': { x: 55, y: 52, name: 'Singapore' },
  'Japan': { x: 85, y: 25, name: 'Japan' },
  'South Korea': { x: 80, y: 28, name: 'South Korea' },
  'Indonesia': { x: 62, y: 58, name: 'Indonesia' },
  'India': { x: 38, y: 40, name: 'India' },
  'Malaysia': { x: 55, y: 55, name: 'Malaysia' },
  'Thailand': { x: 52, y: 45, name: 'Thailand' },
  'Vietnam': { x: 58, y: 42, name: 'Vietnam' },
  'New Zealand': { x: 92, y: 82, name: 'New Zealand' },
  'Philippines': { x: 70, y: 45, name: 'Philippines' },
}

interface CountryData {
  country: string
  accounts: Account[]
  totalArr: number
  avgHealth: number
  position: { x: number; y: number }
}

export default function RegionalMap({ accounts }: RegionalMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  // Aggregate data by country
  const countryData: CountryData[] = Object.entries(countryPositions)
    .map(([country, position]) => {
      const countryAccounts = accounts.filter(a => a.country === country)
      const totalArr = countryAccounts.reduce((sum, a) => sum + a.arr, 0)
      const avgHealth = countryAccounts.length > 0
        ? Math.round(countryAccounts.reduce((sum, a) => sum + a.healthScore.overall, 0) / countryAccounts.length)
        : 0
      return {
        country,
        accounts: countryAccounts,
        totalArr,
        avgHealth,
        position,
      }
    })
    .filter(d => d.accounts.length > 0)

  // Calculate bubble sizes (normalize to reasonable range)
  const maxArr = Math.max(...countryData.map(d => d.totalArr))
  const getBubbleSize = (arr: number) => {
    const minSize = 20
    const maxSize = 50
    return minSize + (arr / maxArr) * (maxSize - minSize)
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'fill-green-500 stroke-green-600'
    if (health >= 60) return 'fill-yellow-500 stroke-yellow-600'
    if (health >= 40) return 'fill-orange-500 stroke-orange-600'
    return 'fill-red-500 stroke-red-600'
  }

  const getHealthBg = (health: number) => {
    if (health >= 80) return 'bg-green-500'
    if (health >= 60) return 'bg-yellow-500'
    if (health >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const hoveredData = hoveredCountry
    ? countryData.find(d => d.country === hoveredCountry)
    : null

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Regional Performance Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* SVG Map Container */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg"
          >
            {/* Simple APAC outline (stylized) */}
            <path
              d="M 25 20 Q 40 15 55 20 Q 70 18 85 25 Q 90 35 88 50 Q 85 65 80 75 Q 70 85 55 88 Q 40 85 30 75 Q 22 60 25 45 Q 23 30 25 20"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />

            {/* Country bubbles */}
            {countryData.map((data) => {
              const size = getBubbleSize(data.totalArr)
              const isHovered = hoveredCountry === data.country
              return (
                <g key={data.country}>
                  {/* Bubble */}
                  <circle
                    cx={data.position.x}
                    cy={data.position.y}
                    r={size / 4}
                    className={cn(
                      getHealthColor(data.avgHealth),
                      'cursor-pointer transition-all duration-200',
                      isHovered ? 'opacity-100' : 'opacity-70'
                    )}
                    strokeWidth={isHovered ? 2 : 1}
                    onMouseEnter={() => setHoveredCountry(data.country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />
                  {/* Country label */}
                  <text
                    x={data.position.x}
                    y={data.position.y + size / 4 + 4}
                    textAnchor="middle"
                    className="text-[3px] fill-gray-600 font-medium pointer-events-none"
                  >
                    {data.country}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredData && (
            <div className="absolute top-2 left-2 bg-white border rounded-lg shadow-lg p-3 min-w-48 z-10">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{hoveredData.country}</span>
                <Badge className={cn('ml-auto', getHealthBg(hoveredData.avgHealth))}>
                  {hoveredData.avgHealth}
                </Badge>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total ARR:</span>
                  <span className="font-medium">{formatCurrency(hoveredData.totalArr, true)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accounts:</span>
                  <span className="font-medium">{hoveredData.accounts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Health:</span>
                  <span className="font-medium">{hoveredData.avgHealth}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t">
                <div className="text-xs text-muted-foreground mb-1">Accounts:</div>
                <div className="space-y-0.5">
                  {hoveredData.accounts.slice(0, 3).map(account => (
                    <Link
                      key={account.id}
                      to={`/accounts/${account.id}`}
                      className="text-xs text-blue-600 hover:underline block truncate"
                    >
                      {account.name}
                    </Link>
                  ))}
                  {hoveredData.accounts.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{hoveredData.accounts.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs">
            <span className="text-muted-foreground">Health Score:</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>80+</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>60-79</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span>40-59</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>&lt;40</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Bubble size = ARR
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {countryData
            .sort((a, b) => b.totalArr - a.totalArr)
            .slice(0, 4)
            .map(data => (
              <Link
                key={data.country}
                to={`/accounts?country=${encodeURIComponent(data.country)}`}
                className="p-2 border rounded-lg hover:bg-secondary/50 transition-colors text-center"
              >
                <div className="text-xs text-muted-foreground">{data.country}</div>
                <div className="font-semibold text-sm">{formatCurrency(data.totalArr, true)}</div>
                <div className="text-xs">
                  <span className={cn(
                    data.avgHealth >= 80 ? 'text-green-600' :
                    data.avgHealth >= 60 ? 'text-yellow-600' :
                    'text-red-600'
                  )}>
                    Health: {data.avgHealth}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
