import { useParams, Navigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AccountHeader from '@/components/account-detail/AccountHeader'
import HealthScoreBreakdown from '@/components/account-detail/HealthScoreBreakdown'
import ContractDetails from '@/components/account-detail/ContractDetails'
import SalesforceIntegration from '@/components/account-detail/SalesforceIntegration'
import TasksList from '@/components/account-detail/TasksList'
import UsageTab from '@/components/account-detail/UsageTab'
import { StakeholdersTab } from '@/components/account-detail/StakeholdersTab'
import { FeatureRequestsTab } from '@/components/account-detail/FeatureRequestsTab'
import { UseCasesTab } from '@/components/account-detail/UseCasesTab'
import { ExpansionTab } from '@/components/account-detail/ExpansionTab'
import { QBRTab } from '@/components/account-detail/QBRTab'
import { getAccountById } from '@/data/accounts'
import {
  LayoutDashboard,
  BarChart3,
  DollarSign,
  Users,
  MessageSquare,
  Lightbulb,
  ClipboardList,
  Calendar,
} from 'lucide-react'

export default function AccountDetail() {
  const { accountId } = useParams()
  const account = getAccountById(accountId || '')

  if (!account) {
    return <Navigate to="/accounts" replace />
  }

  const tabItems = [
    { value: 'overview', label: 'Overview', icon: LayoutDashboard },
    { value: 'usage', label: 'Usage & Products', icon: BarChart3 },
    { value: 'expansion', label: 'Expansion', icon: DollarSign },
    { value: 'stakeholders', label: 'Stakeholders', icon: Users },
    { value: 'features', label: 'Feature Requests', icon: MessageSquare },
    { value: 'usecases', label: 'Use Cases', icon: Lightbulb },
    { value: 'plan', label: 'Plan & Tasks', icon: ClipboardList },
    { value: 'qbr', label: 'QBR', icon: Calendar },
  ]

  return (
    <div className="p-6">
      <AccountHeader account={account} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start mb-6 h-auto flex-wrap gap-1">
          {tabItems.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-1.5"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <HealthScoreBreakdown healthScore={account.healthScore} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContractDetails account={account} />
            <div className="space-y-6">
              <SalesforceIntegration salesforce={account.salesforce} />
              <TasksList tasks={account.tasks} />
            </div>
          </div>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage">
          <UsageTab account={account} />
        </TabsContent>

        {/* Expansion Tab */}
        <TabsContent value="expansion">
          <ExpansionTab account={account} />
        </TabsContent>

        {/* Stakeholders Tab */}
        <TabsContent value="stakeholders">
          <StakeholdersTab account={account} />
        </TabsContent>

        {/* Feature Requests Tab */}
        <TabsContent value="features">
          <FeatureRequestsTab account={account} />
        </TabsContent>

        {/* Use Cases Tab */}
        <TabsContent value="usecases">
          <UseCasesTab account={account} />
        </TabsContent>

        {/* Plan & Tasks Tab */}
        <TabsContent value="plan">
          <div className="space-y-6">
            <TasksList tasks={account.tasks} showAll />
          </div>
        </TabsContent>

        {/* QBR Tab */}
        <TabsContent value="qbr">
          <QBRTab account={account} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
