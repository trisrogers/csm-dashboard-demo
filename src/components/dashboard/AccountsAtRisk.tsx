import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import type { Account } from '@/types'
import { formatCurrency, getHealthStatus, getHealthStatusColor } from '@/lib/calculations'
import { AlertTriangle, TrendingDown } from 'lucide-react'

interface AccountsAtRiskProps {
  accounts: Account[]
}

export default function AccountsAtRisk({ accounts }: AccountsAtRiskProps) {
  // Filter accounts with health score < 70 and sort by health score
  const atRiskAccounts = accounts
    .filter(acc => acc.healthScore.overall < 70)
    .sort((a, b) => a.healthScore.overall - b.healthScore.overall)
    .slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          Accounts Requiring Attention
        </CardTitle>
        <Badge variant="outline" className="text-orange-600 border-orange-200">
          {atRiskAccounts.length} accounts
        </Badge>
      </CardHeader>
      <CardContent>
        {atRiskAccounts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No accounts currently at risk
          </p>
        ) : (
          <div className="space-y-3">
            {atRiskAccounts.map((account) => {
              const status = getHealthStatus(account.healthScore.overall)
              const colors = getHealthStatusColor(status)

              return (
                <Link
                  key={account.id}
                  to={`/accounts/${account.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${colors.bg} ${colors.text}`}
                    >
                      {account.healthScore.overall}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{account.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {account.country} · {account.tier}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(account.arr, true)}</p>
                    {account.healthScore.trend === 'down' && (
                      <div className="flex items-center gap-1 text-xs text-red-600">
                        <TrendingDown className="h-3 w-3" />
                        <span>Declining</span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
