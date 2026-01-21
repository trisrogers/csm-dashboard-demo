import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import type { CodeUsageMetrics as CodeMetrics } from '@/types'
import { Code, Clock, FileCode, GitBranch, TestTube } from 'lucide-react'

interface CodeUsageMetricsProps {
  data: CodeMetrics
}

export default function CodeUsageMetrics({ data }: CodeUsageMetricsProps) {
  const languageColors: Record<string, string> = {
    Python: '#3776ab',
    Java: '#f89820',
    TypeScript: '#3178c6',
    Go: '#00add8',
    Other: '#6b7280',
  }

  // Mock weekly session data
  const weeklyData = [
    { day: 'Mon', sessions: 720 },
    { day: 'Tue', sessions: 850 },
    { day: 'Wed', sessions: 890 },
    { day: 'Thu', sessions: 780 },
    { day: 'Fri', sessions: 650 },
    { day: 'Sat', sessions: 120 },
    { day: 'Sun', sessions: 95 },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Code className="h-4 w-4" />
              <span className="text-sm">Active Developers</span>
            </div>
            <div className="text-2xl font-bold">{data.activeDevelopers}</div>
            <div className="text-xs text-muted-foreground">
              {data.avgSessionsPerDev.toFixed(1)} sessions/dev this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Time Saved</span>
            </div>
            <div className="text-2xl font-bold">{data.timeSavedHours.toLocaleString()}h</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileCode className="h-4 w-4" />
              <span className="text-sm">Lines Generated</span>
            </div>
            <div className="text-2xl font-bold">
              {(data.linesGenerated / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">Code lines</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TestTube className="h-4 w-4" />
              <span className="text-sm">Tests Written</span>
            </div>
            <div className="text-2xl font-bold">{data.testsWritten.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.languages}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="percentage"
                    nameKey="language"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {data.languages.map((entry) => (
                      <Cell
                        key={entry.language}
                        fill={languageColors[entry.language] || '#6b7280'}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Usage']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {data.languages.map((lang) => (
                <div key={lang.language} className="flex items-center gap-1.5 text-xs">
                  <div
                    className="h-3 w-3 rounded"
                    style={{ backgroundColor: languageColors[lang.language] || '#6b7280' }}
                  />
                  <span>{lang.language}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Session Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Peak usage on Tuesday-Thursday during business hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Repository Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Repository Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <div className="text-2xl font-bold">{data.repositories}</div>
              <div className="text-sm text-muted-foreground">Connected Repos</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <div className="text-2xl font-bold">{data.totalSessions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Sessions</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <div className="text-2xl font-bold">{data.avgSessionsPerDev.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Avg Sessions/Dev</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <div className="text-2xl font-bold">
                {(data.linesGenerated / data.activeDevelopers / 1000).toFixed(1)}K
              </div>
              <div className="text-sm text-muted-foreground">Lines/Developer</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
