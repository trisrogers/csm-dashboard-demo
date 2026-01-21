import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Account } from '@/types'
import { formatCurrency, daysUntil } from '@/lib/calculations'
import { FileText, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContractDetailsProps {
  account: Account
}

export default function ContractDetails({ account }: ContractDetailsProps) {
  const allContracts = account.products.flatMap((p) =>
    p.contracts.map((c) => ({ ...c, productType: p.type }))
  )

  const totalContractValue = allContracts.reduce((sum, c) => sum + c.totalValue, 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Active Contracts
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Total: <span className="font-medium">{formatCurrency(totalContractValue)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Auto-Renew</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allContracts.map((contract) => {
              const daysToEnd = daysUntil(contract.endDate)
              const isExpiring = daysToEnd <= 90

              return (
                <TableRow key={contract.id}>
                  <TableCell>
                    <div>
                      <Badge
                        variant="outline"
                        className={cn(
                          contract.productType === 'api' && 'border-blue-200 text-blue-700',
                          contract.productType === 'enterprise' &&
                            'border-purple-200 text-purple-700',
                          contract.productType === 'code' && 'border-cyan-200 text-cyan-700'
                        )}
                      >
                        {contract.productType === 'api'
                          ? 'API'
                          : contract.productType === 'enterprise'
                          ? 'Enterprise'
                          : 'Code'}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {contract.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">
                        {contract.quantity.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground ml-1">{contract.unit}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(contract.unitPrice)}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(contract.totalValue)}
                  </TableCell>
                  <TableCell>
                    <div className={isExpiring ? 'text-orange-600' : ''}>
                      <div className="text-sm">
                        {new Date(contract.startDate).toLocaleDateString('en-AU', {
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        -{' '}
                        {new Date(contract.endDate).toLocaleDateString('en-AU', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      {isExpiring && (
                        <div className="text-xs">Expires in {daysToEnd} days</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {contract.autoRenewal ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {/* Features */}
        {allContracts.some((c) => c.features && c.features.length > 0) && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm font-medium mb-2">Included Features</div>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                new Set(allContracts.flatMap((c) => c.features || []))
              ).map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
