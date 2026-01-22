import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { EnterpriseUsageMetrics as EnterpriseMetrics } from '@/types'
import { Users, Activity, Briefcase, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EnterpriseUsageMetricsProps {
  data: EnterpriseMetrics
}

export default function EnterpriseUsageMetrics({ data }: EnterpriseUsageMetricsProps) {
  const utilizationRate = (data.activeSeats / data.totalSeats) * 100
  const dauMauRatio = data.mau > 0 ? (data.dau / data.mau) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">Seat Utilization</span>
            </div>
            <div className="text-2xl font-bold">{utilizationRate.toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">
              {data.activeSeats} of {data.totalSeats} seats active
            </div>
            {/* Utilization bar */}
            <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full',
                  utilizationRate >= 80 ? 'bg-green-500' :
                  utilizationRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                )}
                style={{ width: `${utilizationRate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Activity className="h-4 w-4" />
              <span className="text-sm">Daily Active Users</span>
            </div>
            <div className="text-2xl font-bold">{data.dau}</div>
            <div className="text-xs text-muted-foreground">
              {dauMauRatio.toFixed(0)}% DAU/MAU stickiness
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm">Active Projects</span>
            </div>
            <div className="text-2xl font-bold">{data.activeProjects}</div>
            <div className="text-xs text-muted-foreground">
              {data.projectsCreated} total created
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Monthly Active Users</div>
            <div className="text-2xl font-bold">{data.mau}</div>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users by Department - Stacked Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Users by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.departmentBreakdown.map((dept) => {
                const utilization = dept.users > 0 ? (dept.activeUsers / dept.users) * 100 : 0
                const isLowUtilization = utilization < 60
                return (
                  <div key={dept.department} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className={cn(
                        "font-medium",
                        isLowUtilization && "text-red-600"
                      )}>
                        {dept.department}
                      </span>
                      <span className={cn(
                        "text-xs",
                        isLowUtilization ? "text-red-600 font-medium" : "text-muted-foreground"
                      )}>
                        {utilization.toFixed(0)}% active ({dept.activeUsers}/{dept.users})
                      </span>
                    </div>
                    {/* Stacked bar */}
                    <div className={cn(
                      "relative h-6 rounded-md overflow-hidden",
                      isLowUtilization ? "bg-red-100" : "bg-gray-100"
                    )}>
                      {/* Active users (filled portion) */}
                      <div
                        className={cn(
                          "absolute h-full rounded-md transition-all",
                          isLowUtilization ? "bg-red-500" : "bg-blue-500"
                        )}
                        style={{ width: `${utilization}%` }}
                      />
                      {/* Labels inside bar */}
                      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
                        <span className={cn(
                          "font-medium",
                          utilization > 30 ? "text-white" : (isLowUtilization ? "text-red-700" : "text-gray-600")
                        )}>
                          {dept.activeUsers} active
                        </span>
                        <span className={cn(
                          utilization < 70 ? (isLowUtilization ? "text-red-700" : "text-gray-600") : "text-white/70"
                        )}>
                          {dept.users} total
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded bg-blue-500" />
                <span>Active (≥60%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded bg-red-500" />
                <span>Low Utilization (&lt;60%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Adoption */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Feature Adoption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.featureAdoption.map((feature) => (
                <div key={feature.feature} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Check className={cn(
                        'h-4 w-4',
                        feature.adoptionRate >= 50 ? 'text-green-600' : 'text-muted-foreground'
                      )} />
                      {feature.feature}
                    </span>
                    <span className="font-medium">{feature.adoptionRate}%</span>
                  </div>
                  <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'absolute h-full rounded-full',
                        feature.adoptionRate >= 70 && 'bg-green-500',
                        feature.adoptionRate >= 40 && feature.adoptionRate < 70 && 'bg-blue-500',
                        feature.adoptionRate < 40 && 'bg-gray-400'
                      )}
                      style={{ width: `${feature.adoptionRate}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {feature.usageCount.toLocaleString()} uses
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
              <div className="text-sm font-medium mb-2">Adoption Recommendations</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {data.featureAdoption
                  .filter(f => f.adoptionRate < 50)
                  .slice(0, 2)
                  .map(f => (
                    <li key={f.feature}>
                      • Increase {f.feature} adoption (currently {f.adoptionRate}%)
                    </li>
                  ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
