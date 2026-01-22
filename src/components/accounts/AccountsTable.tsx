import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import HealthScoreBadge from './HealthScoreBadge'
import type { Account } from '@/types'
import type { AccountFilters } from '@/hooks/useAccountFilters'
import { formatCurrency, formatPercentage, daysUntil } from '@/lib/calculations'
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccountsTableProps {
  accounts: Account[]
  filters: AccountFilters
  toggleSort: (column: AccountFilters['sortBy']) => void
  onFilterByTier?: (tier: string) => void
  onFilterByCountry?: (country: string) => void
  onFilterByProduct?: (product: string) => void
}

export default function AccountsTable({
  accounts,
  filters,
  toggleSort,
  onFilterByTier,
  onFilterByCountry,
  onFilterByProduct,
}: AccountsTableProps) {
  const SortIcon = ({ column }: { column: AccountFilters['sortBy'] }) => {
    if (filters.sortBy !== column) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground/50" />
    }
    return filters.sortOrder === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    )
  }

  const getTierBadgeVariant = (tier: string): 'default' | 'secondary' | 'outline' => {
    switch (tier) {
      case 'Strategic':
        return 'default'
      case 'Enterprise':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getProductBadges = (account: Account) => {
    return account.products
      .filter((p) => p.active)
      .map((p) => (
        <Badge
          key={p.type}
          variant="outline"
          className={cn(
            'text-xs cursor-pointer hover:opacity-80 transition-opacity',
            p.type === 'api' && 'border-blue-200 text-blue-700 hover:bg-blue-50',
            p.type === 'enterprise' && 'border-purple-200 text-purple-700 hover:bg-purple-50',
            p.type === 'code' && 'border-cyan-200 text-cyan-700 hover:bg-cyan-50'
          )}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            onFilterByProduct?.(p.type)
          }}
          title={`Filter by ${p.type === 'api' ? 'API' : p.type === 'enterprise' ? 'Enterprise' : 'Code'}`}
        >
          {p.type === 'api' ? 'API' : p.type === 'enterprise' ? 'Enterprise' : 'Code'}
        </Badge>
      ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getDaysToRenewalColor = (days: number) => {
    if (days <= 30) return 'text-red-600'
    if (days <= 90) return 'text-yellow-600'
    return 'text-muted-foreground'
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => toggleSort('name')}
              >
                Account
                <SortIcon column="name" />
              </button>
            </TableHead>
            <TableHead className="w-[80px]">
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => toggleSort('healthScore')}
              >
                Health
                <SortIcon column="healthScore" />
              </button>
            </TableHead>
            <TableHead className="w-[100px]">
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => toggleSort('arr')}
              >
                ARR
                <SortIcon column="arr" />
              </button>
            </TableHead>
            <TableHead className="w-[80px]">
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => toggleSort('nrr')}
              >
                NRR
                <SortIcon column="nrr" />
              </button>
            </TableHead>
            <TableHead className="w-[150px]">Products</TableHead>
            <TableHead className="w-[120px]">
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => toggleSort('country')}
              >
                Country
                <SortIcon column="country" />
              </button>
            </TableHead>
            <TableHead className="w-[100px]">Tier</TableHead>
            <TableHead className="w-[120px]">
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => toggleSort('contractEnd')}
              >
                Renewal
                <SortIcon column="contractEnd" />
              </button>
            </TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No accounts match your filters
              </TableCell>
            </TableRow>
          ) : (
            accounts.map((account) => {
              const daysToRenewal = daysUntil(account.contractEnd)
              return (
                <TableRow key={account.id} className="cursor-pointer">
                  <TableCell>
                    <Link
                      to={`/accounts/${account.id}`}
                      className="block hover:underline"
                    >
                      <div className="font-medium">{account.name}</div>
                      <div className="text-xs text-muted-foreground">{account.industry}</div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <HealthScoreBadge
                      score={account.healthScore.overall}
                      trend={account.healthScore.trend}
                      size="sm"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(account.arr, true)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'font-medium',
                        account.nrr >= 115
                          ? 'text-green-600'
                          : account.nrr >= 100
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      )}
                    >
                      {formatPercentage(account.nrr)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">{getProductBadges(account)}</div>
                  </TableCell>
                  <TableCell>
                    <span
                      className="cursor-pointer hover:text-primary hover:underline transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        onFilterByCountry?.(account.country)
                      }}
                      title={`Filter by ${account.country}`}
                    >
                      {account.country}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getTierBadgeVariant(account.tier)}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        onFilterByTier?.(account.tier)
                      }}
                      title={`Filter by ${account.tier}`}
                    >
                      {account.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={getDaysToRenewalColor(daysToRenewal)}>
                      <div className="text-sm">{formatDate(account.contractEnd)}</div>
                      <div className="text-xs">
                        {daysToRenewal > 0 ? `${daysToRenewal}d` : 'Overdue'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/accounts/${account.id}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
