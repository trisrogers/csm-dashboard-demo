import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { AccountFilters as FilterType } from '@/hooks/useAccountFilters'
import { Search, X } from 'lucide-react'

interface AccountFiltersProps {
  filters: FilterType
  uniqueCountries: string[]
  updateFilter: <K extends keyof FilterType>(key: K, value: FilterType[K]) => void
  resetFilters: () => void
}

export default function AccountFilters({
  filters,
  uniqueCountries,
  updateFilter,
  resetFilters,
}: AccountFiltersProps) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.tier !== 'all' ||
    filters.healthStatus !== 'all' ||
    filters.country !== 'all' ||
    filters.product !== 'all'

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search accounts..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-9 w-64"
        />
      </div>

      {/* Tier Filter */}
      <Select
        value={filters.tier}
        onValueChange={(value) => updateFilter('tier', value as FilterType['tier'])}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Tier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tiers</SelectItem>
          <SelectItem value="Strategic">Strategic</SelectItem>
          <SelectItem value="Enterprise">Enterprise</SelectItem>
          <SelectItem value="Growth">Growth</SelectItem>
        </SelectContent>
      </Select>

      {/* Health Status Filter */}
      <Select
        value={filters.healthStatus}
        onValueChange={(value) => updateFilter('healthStatus', value as FilterType['healthStatus'])}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Health" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Health</SelectItem>
          <SelectItem value="healthy">Healthy (80+)</SelectItem>
          <SelectItem value="stable">Stable (60-79)</SelectItem>
          <SelectItem value="at-risk">At Risk (40-59)</SelectItem>
          <SelectItem value="critical">Critical (&lt;40)</SelectItem>
        </SelectContent>
      </Select>

      {/* Country Filter */}
      <Select
        value={filters.country}
        onValueChange={(value) => updateFilter('country', value)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Countries</SelectItem>
          {uniqueCountries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Product Filter */}
      <Select
        value={filters.product}
        onValueChange={(value) => updateFilter('product', value as FilterType['product'])}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Product" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Products</SelectItem>
          <SelectItem value="api">Claude API</SelectItem>
          <SelectItem value="enterprise">Claude Enterprise</SelectItem>
          <SelectItem value="code">Claude Code</SelectItem>
        </SelectContent>
      </Select>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
