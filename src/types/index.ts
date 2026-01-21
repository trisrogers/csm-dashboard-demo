// Core enums
export type AccountTier = 'Strategic' | 'Enterprise' | 'Growth'
export type HealthStatus = 'healthy' | 'stable' | 'at-risk' | 'critical'
export type RelationshipStrength = 'Champion' | 'Supporter' | 'Neutral' | 'Blocker'
export type InfluenceLevel = 'High' | 'Medium' | 'Low'
export type StakeholderType = 'Technical' | 'Business' | 'Executive'
export type InteractionType = 'Meeting' | 'Call' | 'Email' | 'Event' | 'QBR'
export type Sentiment = 'Positive' | 'Neutral' | 'Negative'
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
export type FeatureStatus = 'New' | 'Under Review' | 'Planned' | 'In Development' | 'Shipped' | 'Declined'
export type OpportunityStage = 'Identified' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost'
export type TaskStatus = 'Not Started' | 'In Progress' | 'Blocked' | 'Complete'
export type ProductType = 'api' | 'enterprise' | 'code'
export type ClaudeModel = 'opus-4.5' | 'sonnet-4.5' | 'haiku-4.5'

// Health score component weights
export interface HealthScoreWeights {
  productUsage: number      // 30%
  engagement: number        // 25%
  businessOutcomes: number  // 20%
  supportHealth: number     // 15%
  relationshipStrength: number // 10%
}

export interface HealthScoreBreakdown {
  overall: number
  productUsage: number
  engagement: number
  businessOutcomes: number
  supportHealth: number
  relationshipStrength: number
  trend: 'up' | 'down' | 'stable'
  lastCalculated: string
}

// Contract and product information
export interface Contract {
  id: string
  product: ProductType
  name: string
  quantity: number
  unit: string
  unitPrice: number
  totalValue: number
  startDate: string
  endDate: string
  autoRenewal: boolean
  features?: string[]
}

export interface Product {
  type: ProductType
  name: string
  active: boolean
  contracts: Contract[]
}

// Stakeholder
export interface Stakeholder {
  id: string
  accountId: string
  name: string
  title: string
  email: string
  phone?: string
  department: string
  relationshipStrength: RelationshipStrength
  influenceLevel: InfluenceLevel
  stakeholderType: StakeholderType
  decisionMaker: boolean
  lastContact: string
  nextScheduledInteraction?: string
  timezone: string
  preferredCommunication: 'Email' | 'Phone' | 'Video' | 'In-person'
  linkedIn?: string
  notes?: string
}

// Usage data
export interface ApiUsageMetrics {
  totalTokens: number
  inputTokens: number
  outputTokens: number
  requests: number
  errorRate: number
  avgLatencyMs: number
  byModel: {
    model: ClaudeModel
    tokens: number
    requests: number
    cost: number
  }[]
  peakHours: { hour: number; tokens: number }[]
}

export interface EnterpriseUsageMetrics {
  totalSeats: number
  activeSeats: number
  dau: number
  mau: number
  projectsCreated: number
  activeProjects: number
  featureAdoption: {
    feature: string
    adoptionRate: number
    usageCount: number
  }[]
  departmentBreakdown: {
    department: string
    users: number
    activeUsers: number
  }[]
}

export interface CodeUsageMetrics {
  activeDevelopers: number
  totalSessions: number
  avgSessionsPerDev: number
  languages: { language: string; percentage: number }[]
  linesGenerated: number
  testsWritten: number
  timeSavedHours: number
  repositories: number
}

export interface UsageData {
  accountId: string
  period: string // YYYY-MM
  api?: ApiUsageMetrics
  enterprise?: EnterpriseUsageMetrics
  code?: CodeUsageMetrics
}

// Interactions
export interface ActionItem {
  id: string
  description: string
  owner: string
  dueDate: string
  status: TaskStatus
  completedDate?: string
}

export interface Interaction {
  id: string
  accountId: string
  date: string
  type: InteractionType
  participants: string[] // stakeholder IDs
  internalParticipants: string[]
  summary: string
  topics: string[]
  actionItems: ActionItem[]
  sentiment: Sentiment
  duration?: number // minutes
  attachments?: string[]
}

// Feature requests
export interface FeatureRequest {
  id: string
  accountId: string
  title: string
  description: string
  requestedBy: string // stakeholder ID
  requestedByName: string
  department: string
  dateRequested: string
  priority: Priority
  status: FeatureStatus
  anthropicPriority?: Priority
  productTeamContact?: string
  expectedDelivery?: string
  workaround?: string
  businessCase: string
  revenueImpact?: number
  churnRisk?: boolean
  relatedAccounts?: string[]
}

// Opportunities
export interface Opportunity {
  id: string
  accountId: string
  name: string
  description: string
  products: ProductType[]
  value: number
  probability: number
  stage: OpportunityStage
  expectedCloseDate: string
  champion: string // stakeholder ID
  championName: string
  nextSteps: string
  createdDate: string
  lastUpdated: string
}

// Use cases and success stories
export interface BusinessOutcome {
  metric: string
  value: number
  unit: string
  description: string
}

export interface UseCase {
  id: string
  accountId: string
  name: string
  department: string
  problemSolved: string
  products: ProductType[]
  implementation: string
  usersInvolved: number
  goLiveDate: string
  outcomes: BusinessOutcome[]
  roi?: number
  replicabilityScore: number
  caseStudyPotential: boolean
  testimonial?: string
}

// Support
export interface SupportTicket {
  id: string
  accountId: string
  title: string
  severity: 'P0' | 'P1' | 'P2' | 'P3'
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  createdDate: string
  resolvedDate?: string
  assignee: string
  category: string
  escalated: boolean
  csat?: number
}

// Tasks
export interface Task {
  id: string
  accountId: string
  description: string
  owner: string
  dueDate: string
  priority: Priority
  status: TaskStatus
  relatedTo?: string
  relatedType?: 'opportunity' | 'feature_request' | 'qbr' | 'general'
  completionNotes?: string
  subtasks?: Task[]
}

// QBR
export interface QBR {
  id: string
  accountId: string
  date: string
  timezone: string
  status: 'Scheduled' | 'Preparing' | 'Ready' | 'Completed'
  attendees: string[] // stakeholder IDs
  internalAttendees: string[]
  preparationChecklist: {
    item: string
    completed: boolean
  }[]
  materials?: string[]
  notes?: string
  actionItems?: ActionItem[]
}

// Salesforce mock data
export interface SalesforceData {
  accountId: string
  sfAccountId: string
  accountOwner: string
  accountExecutive: string
  lastSyncTime: string
  syncStatus: 'success' | 'pending' | 'error'
  sfAccountUrl: string
}

// Main Account type
export interface Account {
  id: string
  name: string
  logo?: string
  industry: string
  country: string
  region: string
  city: string
  employeeCount: number
  website: string
  linkedIn?: string
  tier: AccountTier
  healthScore: HealthScoreBreakdown
  arr: number
  nrr: number
  grr: number
  contractStart: string
  contractEnd: string
  csmOwner: string
  lifecycleStage: 'Onboarding' | 'Adoption' | 'Expansion' | 'Renewal'
  products: Product[]
  stakeholders: Stakeholder[]
  usageHistory: UsageData[]
  interactions: Interaction[]
  featureRequests: FeatureRequest[]
  opportunities: Opportunity[]
  useCases: UseCase[]
  supportTickets: SupportTicket[]
  tasks: Task[]
  qbrs: QBR[]
  salesforce: SalesforceData
  complianceRequirements?: string[]
  notes?: string
  tags?: string[]
}

// Portfolio summary metrics
export interface PortfolioMetrics {
  totalArr: number
  arrChange: number
  nrr: number
  nrrTarget: number
  grr: number
  grrTarget: number
  expansionPipeline: number
  avgHealthScore: number
  accountsAtRisk: number
  totalAccounts: number
  accountsByTier: {
    strategic: number
    enterprise: number
    growth: number
  }
  accountsByHealth: {
    healthy: number
    stable: number
    atRisk: number
    critical: number
  }
  arrByProduct: {
    api: number
    enterprise: number
    code: number
  }
  arrByCountry: {
    country: string
    arr: number
    count: number
  }[]
}

// Utility functions return types
export interface HealthScoreResult {
  score: number
  status: HealthStatus
  components: HealthScoreBreakdown
}

export function getHealthStatus(score: number): HealthStatus {
  if (score >= 80) return 'healthy'
  if (score >= 60) return 'stable'
  if (score >= 40) return 'at-risk'
  return 'critical'
}

export function getHealthColor(status: HealthStatus): string {
  switch (status) {
    case 'healthy': return 'text-green-600 bg-green-100'
    case 'stable': return 'text-yellow-600 bg-yellow-100'
    case 'at-risk': return 'text-orange-600 bg-orange-100'
    case 'critical': return 'text-red-600 bg-red-100'
  }
}
