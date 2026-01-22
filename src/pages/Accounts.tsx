import AccountFilters from '@/components/accounts/AccountFilters'
import AccountsTable from '@/components/accounts/AccountsTable'
import { useAccountFilters } from '@/hooks/useAccountFilters'
import { accounts } from '@/data/accounts'
import { formatCurrency } from '@/lib/calculations'
import { Building2 } from 'lucide-react'
import type { AccountTier, ProductType } from '@/types'

export default function Accounts() {
  const {
    filters,
    filteredAccounts,
    uniqueCountries,
    updateFilter,
    resetFilters,
    toggleSort,
  } = useAccountFilters(accounts)

  // Handlers for clickable tags
  const handleFilterByTier = (tier: string) => {
    updateFilter('tier', tier as AccountTier)
  }

  const handleFilterByCountry = (country: string) => {
    updateFilter('country', country)
  }

  const handleFilterByProduct = (product: string) => {
    updateFilter('product', product as ProductType)
  }

  const totalFilteredArr = filteredAccounts.reduce((sum, acc) => sum + acc.arr, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Accounts
          </h1>
          <p className="text-muted-foreground">Manage your APAC enterprise accounts</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{filteredAccounts.length}</div>
          <div className="text-sm text-muted-foreground">
            {filteredAccounts.length === accounts.length
              ? 'Total accounts'
              : `of ${accounts.length} accounts`}
          </div>
        </div>
      </div>

      {/* Filters */}
      <AccountFilters
        filters={filters}
        uniqueCountries={uniqueCountries}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
      />

      {/* Summary bar */}
      <div className="flex items-center gap-6 py-3 px-4 bg-secondary/30 rounded-lg text-sm">
        <div>
          <span className="text-muted-foreground">Total ARR: </span>
          <span className="font-medium">{formatCurrency(totalFilteredArr, true)}</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div>
          <span className="text-muted-foreground">Showing: </span>
          <span className="font-medium">{filteredAccounts.length} accounts</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div>
          <span className="text-muted-foreground">Sort: </span>
          <span className="font-medium capitalize">
            {filters.sortBy === 'healthScore' ? 'Health Score' : filters.sortBy}{' '}
            ({filters.sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
          </span>
        </div>
      </div>

      {/* Table */}
      <AccountsTable
        accounts={filteredAccounts}
        filters={filters}
        toggleSort={toggleSort}
        onFilterByTier={handleFilterByTier}
        onFilterByCountry={handleFilterByCountry}
        onFilterByProduct={handleFilterByProduct}
      />
    </div>
  )
}
