import { useState, useMemo } from 'react'
import type { Account, AccountTier, HealthStatus, ProductType } from '@/types'
import { getHealthStatus } from '@/lib/calculations'

export interface AccountFilters {
  search: string
  tier: AccountTier | 'all'
  healthStatus: HealthStatus | 'all'
  country: string
  product: ProductType | 'all'
  sortBy: 'name' | 'healthScore' | 'arr' | 'nrr' | 'country' | 'contractEnd'
  sortOrder: 'asc' | 'desc'
}

const defaultFilters: AccountFilters = {
  search: '',
  tier: 'all',
  healthStatus: 'all',
  country: 'all',
  product: 'all',
  sortBy: 'arr',
  sortOrder: 'desc',
}

export function useAccountFilters(accounts: Account[]) {
  const [filters, setFilters] = useState<AccountFilters>(defaultFilters)

  const filteredAccounts = useMemo(() => {
    let result = [...accounts]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (acc) =>
          acc.name.toLowerCase().includes(searchLower) ||
          acc.industry.toLowerCase().includes(searchLower) ||
          acc.country.toLowerCase().includes(searchLower)
      )
    }

    // Tier filter
    if (filters.tier !== 'all') {
      result = result.filter((acc) => acc.tier === filters.tier)
    }

    // Health status filter
    if (filters.healthStatus !== 'all') {
      result = result.filter(
        (acc) => getHealthStatus(acc.healthScore.overall) === filters.healthStatus
      )
    }

    // Country filter
    if (filters.country !== 'all') {
      result = result.filter((acc) => acc.country === filters.country)
    }

    // Product filter
    if (filters.product !== 'all') {
      result = result.filter((acc) =>
        acc.products.some((p) => p.type === filters.product && p.active)
      )
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'healthScore':
          comparison = a.healthScore.overall - b.healthScore.overall
          break
        case 'arr':
          comparison = a.arr - b.arr
          break
        case 'nrr':
          comparison = a.nrr - b.nrr
          break
        case 'country':
          comparison = a.country.localeCompare(b.country)
          break
        case 'contractEnd':
          comparison = new Date(a.contractEnd).getTime() - new Date(b.contractEnd).getTime()
          break
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  }, [accounts, filters])

  const uniqueCountries = useMemo(() => {
    return Array.from(new Set(accounts.map((acc) => acc.country))).sort()
  }, [accounts])

  const updateFilter = <K extends keyof AccountFilters>(
    key: K,
    value: AccountFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  const toggleSort = (column: AccountFilters['sortBy']) => {
    if (filters.sortBy === column) {
      setFilters((prev) => ({
        ...prev,
        sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
      }))
    } else {
      setFilters((prev) => ({ ...prev, sortBy: column, sortOrder: 'desc' }))
    }
  }

  return {
    filters,
    filteredAccounts,
    uniqueCountries,
    updateFilter,
    resetFilters,
    toggleSort,
  }
}
