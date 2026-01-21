import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import ApiUsageMetrics from './ApiUsageMetrics'
import EnterpriseUsageMetrics from './EnterpriseUsageMetrics'
import CodeUsageMetrics from './CodeUsageMetrics'
import type { Account } from '@/types'
import { Code, Terminal, Users } from 'lucide-react'

interface UsageTabProps {
  account: Account
}

export default function UsageTab({ account }: UsageTabProps) {
  // Get most recent usage data
  const latestUsage = account.usageHistory[0]
  const previousUsage = account.usageHistory[1]

  // Determine which products have data
  const hasApi = latestUsage?.api !== undefined
  const hasEnterprise = latestUsage?.enterprise !== undefined
  const hasCode = latestUsage?.code !== undefined

  // Determine default tab
  const defaultTab = hasApi ? 'api' : hasEnterprise ? 'enterprise' : hasCode ? 'code' : 'api'

  if (!latestUsage) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No usage data available for this account.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Usage period indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Product Usage Metrics</h3>
          <p className="text-sm text-muted-foreground">
            Data for {new Date(latestUsage.period + '-01').toLocaleDateString('en-AU', {
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex gap-2">
          {hasApi && (
            <Badge variant="outline" className="border-blue-200 text-blue-700">
              <Terminal className="h-3 w-3 mr-1" />
              API
            </Badge>
          )}
          {hasEnterprise && (
            <Badge variant="outline" className="border-purple-200 text-purple-700">
              <Users className="h-3 w-3 mr-1" />
              Enterprise
            </Badge>
          )}
          {hasCode && (
            <Badge variant="outline" className="border-cyan-200 text-cyan-700">
              <Code className="h-3 w-3 mr-1" />
              Code
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList>
          {hasApi && (
            <TabsTrigger value="api" className="flex items-center gap-1.5">
              <Terminal className="h-4 w-4" />
              Claude API
            </TabsTrigger>
          )}
          {hasEnterprise && (
            <TabsTrigger value="enterprise" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              Claude Enterprise
            </TabsTrigger>
          )}
          {hasCode && (
            <TabsTrigger value="code" className="flex items-center gap-1.5">
              <Code className="h-4 w-4" />
              Claude Code
            </TabsTrigger>
          )}
        </TabsList>

        {hasApi && latestUsage.api && (
          <TabsContent value="api" className="mt-6">
            <ApiUsageMetrics
              data={latestUsage.api}
              previousData={previousUsage?.api}
            />
          </TabsContent>
        )}

        {hasEnterprise && latestUsage.enterprise && (
          <TabsContent value="enterprise" className="mt-6">
            <EnterpriseUsageMetrics data={latestUsage.enterprise} />
          </TabsContent>
        )}

        {hasCode && latestUsage.code && (
          <TabsContent value="code" className="mt-6">
            <CodeUsageMetrics data={latestUsage.code} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
