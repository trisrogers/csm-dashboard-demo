import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account } from '@/types'
import { formatCurrency } from '@/lib/calculations'
import { TrendingUp, ArrowRight, DollarSign } from 'lucide-react'

interface ExpansionOpportunitiesProps {
  accounts: Account[]
}

export default function ExpansionOpportunities({ accounts }: ExpansionOpportunitiesProps) {
  // Collect all expansion opportunities from all accounts
  const allOpportunities = accounts
    .flatMap(account =>
      account.opportunities.map(opp => ({
        ...opp,
        accountName: account.name,
        accountId: account.id,
      }))
    )
    .filter(opp => opp.stage !== 'Closed Won' && opp.stage !== 'Closed Lost')
    .sort((a, b) => b.value * b.probability - a.value * a.probability)
    .slice(0, 5)

  const totalPipelineValue = allOpportunities.reduce((sum, opp) => sum + opp.value, 0)
  const totalWeightedValue = allOpportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0)

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Negotiation':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Proposal':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Qualified':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Identified':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          Expansion Opportunities
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            <DollarSign className="h-3 w-3 mr-1" />
            {formatCurrency(totalWeightedValue, true)} weighted
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {allOpportunities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No active expansion opportunities
          </p>
        ) : (
          <div className="space-y-3">
            {allOpportunities.map((opp) => (
              <Link
                key={opp.id}
                to={`/accounts/${opp.accountId}?tab=expansion`}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm truncate">{opp.name}</span>
                    <Badge variant="outline" className={`text-xs ${getStageColor(opp.stage)}`}>
                      {opp.stage}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {opp.accountName} • {opp.probability}% probability
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(opp.value, true)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(opp.value * opp.probability / 100, true)} weighted
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Summary footer */}
        <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            {allOpportunities.length} active opportunities
          </span>
          <span className="font-medium">
            Total: {formatCurrency(totalPipelineValue, true)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
