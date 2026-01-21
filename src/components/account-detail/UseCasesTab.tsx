import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Account } from '@/types'
import { Target, TrendingUp, Calendar, Users, Award, FileText } from 'lucide-react'

interface UseCasesTabProps {
  account: Account
}

export function UseCasesTab({ account }: UseCasesTabProps) {
  const { useCases } = account

  const totalUsers = useCases.reduce((sum, uc) => sum + uc.usersInvolved, 0)
  const avgRoi = useCases.length > 0
    ? Math.round(useCases.reduce((sum, uc) => sum + (uc.roi || 0), 0) / useCases.length)
    : 0
  const caseStudyCandidates = useCases.filter(uc => uc.caseStudyPotential).length

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{useCases.length}</div>
              <div className="text-sm text-muted-foreground">Active Use Cases</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
              <div className="text-sm text-muted-foreground">Users Involved</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{avgRoi}%</div>
              <div className="text-sm text-muted-foreground">Average ROI</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{caseStudyCandidates}</div>
              <div className="text-sm text-muted-foreground">Case Study Candidates</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Use Cases List */}
      <div className="space-y-4">
        {useCases.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">No documented use cases yet</p>
            </CardContent>
          </Card>
        ) : (
          useCases.map(useCase => (
            <Card key={useCase.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {useCase.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{useCase.department}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {useCase.caseStudyPotential && (
                      <Badge className="bg-purple-100 text-purple-800">
                        <Award className="h-3 w-3 mr-1" />
                        Case Study Candidate
                      </Badge>
                    )}
                    {useCase.roi && (
                      <Badge className="bg-green-100 text-green-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {useCase.roi}% ROI
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Problem & Solution */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Problem Solved</h4>
                    <p className="text-sm text-muted-foreground">{useCase.problemSolved}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Implementation</h4>
                    <p className="text-sm text-muted-foreground">{useCase.implementation}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{useCase.usersInvolved} users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Live since {useCase.goLiveDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Products: {useCase.products.join(', ')}</span>
                  </div>
                </div>

                {/* Outcomes */}
                {useCase.outcomes && useCase.outcomes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Business Outcomes</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {useCase.outcomes.map((outcome, idx) => (
                        <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">
                            {typeof outcome.value === 'number' && outcome.value > 1000
                              ? `${(outcome.value / 1000).toFixed(0)}K`
                              : outcome.value}
                            {outcome.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">{outcome.metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {useCase.testimonial && (
                  <blockquote className="border-l-2 border-primary pl-4 italic text-sm text-muted-foreground">
                    {useCase.testimonial}
                  </blockquote>
                )}

                {/* Replicability */}
                {useCase.replicabilityScore && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Replicability Score:</span>
                    <div className="flex-1 max-w-[200px] bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${useCase.replicabilityScore}%` }}
                      />
                    </div>
                    <span className="font-medium">{useCase.replicabilityScore}%</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
