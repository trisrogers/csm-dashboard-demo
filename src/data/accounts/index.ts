import type { Account } from '@/types'
import { commonwealthBank } from './commonwealth-bank'
import {
  generateStakeholders,
  generateUsageHistory,
  generateInteractions,
  generateTasks,
  generateFeatureRequests,
  generateUseCases,
  generateSupportTickets,
  generateQBR,
} from '../generators'

// Base account data - will be populated with generated data
const dbsBankBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'dbs',
  name: 'DBS Bank',
  industry: 'Financial Services',
  country: 'Singapore',
  region: 'APAC',
  city: 'Singapore',
  employeeCount: 33000,
  website: 'https://www.dbs.com',
  tier: 'Strategic',
  healthScore: {
    overall: 78,
    productUsage: 82,
    engagement: 75,
    businessOutcomes: 80,
    supportHealth: 72,
    relationshipStrength: 78,
    trend: 'stable',
    lastCalculated: '2026-01-20',
  },
  arr: 950000,
  nrr: 112.3,
  grr: 94.1,
  contractStart: '2024-01-15',
  contractEnd: '2027-01-14',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Expansion',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'dbs-api-001', product: 'api', name: 'Claude API Enterprise', quantity: 60000000, unit: 'tokens/month', unitPrice: 0.008, totalValue: 480000, startDate: '2024-01-15', endDate: '2027-01-14', autoRenewal: true }] },
    { type: 'enterprise', name: 'Claude Enterprise', active: true, contracts: [{ id: 'dbs-ent-001', product: 'enterprise', name: 'Claude Enterprise Seats', quantity: 600, unit: 'seats', unitPrice: 650, totalValue: 390000, startDate: '2024-06-01', endDate: '2027-05-31', autoRenewal: true }] },
    { type: 'code', name: 'Claude Code', active: true, contracts: [{ id: 'dbs-code-001', product: 'code', name: 'Claude Code Licenses', quantity: 80, unit: 'licenses', unitPrice: 1000, totalValue: 80000, startDate: '2025-03-01', endDate: '2027-02-28', autoRenewal: true }] },
  ],
  opportunities: [
    { id: 'dbs-opp-001', accountId: 'dbs', name: 'API volume increase', description: 'Increase API commitment for wealth management division', products: ['api'], value: 150000, probability: 60, stage: 'Qualified', expectedCloseDate: '2026-03-30', champion: '', championName: 'Wei Ming Tan', nextSteps: 'Technical review with wealth management team', createdDate: '2026-01-01', lastUpdated: '2026-01-15' },
    { id: 'dbs-opp-002', accountId: 'dbs', name: 'Enterprise expansion to retail banking', description: 'Expand Claude Enterprise seats to retail banking division', products: ['enterprise'], value: 200000, probability: 45, stage: 'Identified', expectedCloseDate: '2026-06-30', champion: '', championName: 'Li Hua Chen', nextSteps: 'Executive presentation to retail banking head', createdDate: '2026-01-10', lastUpdated: '2026-01-18' },
  ],
  salesforce: { accountId: 'dbs', sfAccountId: '0015000000DEF456', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000DEF456/view' },
}

const samsungBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'samsung',
  name: 'Samsung Electronics',
  industry: 'Technology',
  country: 'South Korea',
  region: 'APAC',
  city: 'Seoul',
  employeeCount: 267000,
  website: 'https://www.samsung.com',
  tier: 'Strategic',
  healthScore: {
    overall: 92,
    productUsage: 95,
    engagement: 88,
    businessOutcomes: 94,
    supportHealth: 90,
    relationshipStrength: 92,
    trend: 'up',
    lastCalculated: '2026-01-20',
  },
  arr: 1200000,
  nrr: 125.4,
  grr: 98.2,
  contractStart: '2023-06-01',
  contractEnd: '2026-05-31',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Expansion',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'sam-api-001', product: 'api', name: 'Claude API Enterprise', quantity: 100000000, unit: 'tokens/month', unitPrice: 0.007, totalValue: 700000, startDate: '2023-06-01', endDate: '2026-05-31', autoRenewal: true }] },
    { type: 'enterprise', name: 'Claude Enterprise', active: true, contracts: [{ id: 'sam-ent-001', product: 'enterprise', name: 'Claude Enterprise Seats', quantity: 500, unit: 'seats', unitPrice: 700, totalValue: 350000, startDate: '2024-01-01', endDate: '2026-12-31', autoRenewal: true }] },
    { type: 'code', name: 'Claude Code', active: true, contracts: [{ id: 'sam-code-001', product: 'code', name: 'Claude Code Licenses', quantity: 150, unit: 'licenses', unitPrice: 1000, totalValue: 150000, startDate: '2025-01-01', endDate: '2026-12-31', autoRenewal: true }] },
  ],
  opportunities: [
    { id: 'sam-opp-001', accountId: 'samsung', name: 'Global rollout to EU divisions', description: 'Expand Claude deployment to European R&D centers', products: ['enterprise', 'api'], value: 500000, probability: 75, stage: 'Proposal', expectedCloseDate: '2026-04-15', champion: '', championName: 'Min-jun Kim', nextSteps: 'Executive presentation to global IT leadership', createdDate: '2025-12-01', lastUpdated: '2026-01-18' },
    { id: 'sam-opp-002', accountId: 'samsung', name: 'Claude Code for mobile division', description: 'Claude Code rollout to mobile software teams', products: ['code'], value: 200000, probability: 80, stage: 'Negotiation', expectedCloseDate: '2026-02-28', champion: '', championName: 'Ji-hoon Lee', nextSteps: 'Finalize contract terms', createdDate: '2025-11-15', lastUpdated: '2026-01-20' },
  ],
  salesforce: { accountId: 'samsung', sfAccountId: '0015000000GHI789', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000GHI789/view' },
  tags: ['Strategic', 'Multi-Product', 'Global Expansion'],
}

const tokopediaBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'tokopedia',
  name: 'Tokopedia',
  industry: 'E-commerce',
  country: 'Indonesia',
  region: 'APAC',
  city: 'Jakarta',
  employeeCount: 5500,
  website: 'https://www.tokopedia.com',
  tier: 'Strategic',
  healthScore: {
    overall: 71,
    productUsage: 75,
    engagement: 68,
    businessOutcomes: 72,
    supportHealth: 70,
    relationshipStrength: 72,
    trend: 'down',
    lastCalculated: '2026-01-20',
  },
  arr: 720000,
  nrr: 105.8,
  grr: 91.5,
  contractStart: '2024-04-01',
  contractEnd: '2027-03-31',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Adoption',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'tok-api-001', product: 'api', name: 'Claude API Enterprise', quantity: 80000000, unit: 'tokens/month', unitPrice: 0.006, totalValue: 480000, startDate: '2024-04-01', endDate: '2027-03-31', autoRenewal: true }] },
    { type: 'enterprise', name: 'Claude Enterprise', active: true, contracts: [{ id: 'tok-ent-001', product: 'enterprise', name: 'Claude Enterprise Seats', quantity: 400, unit: 'seats', unitPrice: 600, totalValue: 240000, startDate: '2024-07-01', endDate: '2027-06-30', autoRenewal: true }] },
  ],
  opportunities: [],
  salesforce: { accountId: 'tokopedia', sfAccountId: '0015000000JKL012', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000JKL012/view' },
  tags: ['At Risk', 'Needs Attention'],
}

const atlassianBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'atlassian',
  name: 'Atlassian',
  industry: 'Software',
  country: 'Australia',
  region: 'APAC',
  city: 'Sydney',
  employeeCount: 11000,
  website: 'https://www.atlassian.com',
  tier: 'Enterprise',
  healthScore: {
    overall: 88,
    productUsage: 92,
    engagement: 85,
    businessOutcomes: 88,
    supportHealth: 85,
    relationshipStrength: 88,
    trend: 'up',
    lastCalculated: '2026-01-20',
  },
  arr: 480000,
  nrr: 122.5,
  grr: 96.8,
  contractStart: '2024-02-01',
  contractEnd: '2026-01-31',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Renewal',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'atl-api-001', product: 'api', name: 'Claude API Enterprise', quantity: 30000000, unit: 'tokens/month', unitPrice: 0.006, totalValue: 180000, startDate: '2024-02-01', endDate: '2026-01-31', autoRenewal: true }] },
    { type: 'code', name: 'Claude Code', active: true, contracts: [{ id: 'atl-code-001', product: 'code', name: 'Claude Code Licenses', quantity: 300, unit: 'licenses', unitPrice: 1000, totalValue: 300000, startDate: '2024-08-01', endDate: '2026-07-31', autoRenewal: true }] },
  ],
  opportunities: [
    { id: 'atl-opp-001', accountId: 'atlassian', name: 'Claude Enterprise rollout', description: 'Add Claude Enterprise for product and design teams', products: ['enterprise'], value: 200000, probability: 80, stage: 'Negotiation', expectedCloseDate: '2026-02-15', champion: '', championName: 'James Mitchell', nextSteps: 'Contract review and final approval', createdDate: '2025-11-01', lastUpdated: '2026-01-20' },
  ],
  salesforce: { accountId: 'atlassian', sfAccountId: '0015000000MNO345', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000MNO345/view' },
  tags: ['Renewal Due', 'Expansion Ready'],
}

const grabBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'grab',
  name: 'Grab',
  industry: 'Technology',
  country: 'Singapore',
  region: 'APAC',
  city: 'Singapore',
  employeeCount: 8500,
  website: 'https://www.grab.com',
  tier: 'Enterprise',
  healthScore: {
    overall: 82,
    productUsage: 85,
    engagement: 80,
    businessOutcomes: 82,
    supportHealth: 80,
    relationshipStrength: 82,
    trend: 'stable',
    lastCalculated: '2026-01-20',
  },
  arr: 520000,
  nrr: 115.2,
  grr: 94.5,
  contractStart: '2024-03-15',
  contractEnd: '2027-03-14',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Expansion',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'grb-api-001', product: 'api', name: 'Claude API Enterprise', quantity: 50000000, unit: 'tokens/month', unitPrice: 0.006, totalValue: 300000, startDate: '2024-03-15', endDate: '2027-03-14', autoRenewal: true }] },
    { type: 'enterprise', name: 'Claude Enterprise', active: true, contracts: [{ id: 'grb-ent-001', product: 'enterprise', name: 'Claude Enterprise Seats', quantity: 350, unit: 'seats', unitPrice: 600, totalValue: 210000, startDate: '2024-09-01', endDate: '2027-08-31', autoRenewal: true }] },
  ],
  opportunities: [
    { id: 'grb-opp-001', accountId: 'grab', name: 'Claude Code for engineering', description: 'Claude Code deployment for Grab engineering teams', products: ['code'], value: 120000, probability: 55, stage: 'Qualified', expectedCloseDate: '2026-05-15', champion: '', championName: 'Kumar Krishnan', nextSteps: 'Technical evaluation with engineering leads', createdDate: '2026-01-05', lastUpdated: '2026-01-18' },
  ],
  salesforce: { accountId: 'grab', sfAccountId: '0015000000PQR678', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000PQR678/view' },
}

const rakutenBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'rakuten',
  name: 'Rakuten',
  industry: 'E-commerce',
  country: 'Japan',
  region: 'APAC',
  city: 'Tokyo',
  employeeCount: 28000,
  website: 'https://www.rakuten.com',
  tier: 'Enterprise',
  healthScore: {
    overall: 75,
    productUsage: 78,
    engagement: 72,
    businessOutcomes: 75,
    supportHealth: 74,
    relationshipStrength: 76,
    trend: 'stable',
    lastCalculated: '2026-01-20',
  },
  arr: 410000,
  nrr: 108.5,
  grr: 92.3,
  contractStart: '2024-05-01',
  contractEnd: '2027-04-30',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Adoption',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'rak-api-001', product: 'api', name: 'Claude API Enterprise', quantity: 40000000, unit: 'tokens/month', unitPrice: 0.006, totalValue: 240000, startDate: '2024-05-01', endDate: '2027-04-30', autoRenewal: true }] },
    { type: 'enterprise', name: 'Claude Enterprise', active: true, contracts: [{ id: 'rak-ent-001', product: 'enterprise', name: 'Claude Enterprise Seats', quantity: 280, unit: 'seats', unitPrice: 600, totalValue: 168000, startDate: '2024-10-01', endDate: '2027-09-30', autoRenewal: true }] },
  ],
  opportunities: [
    { id: 'rak-opp-001', accountId: 'rakuten', name: 'Marketplace AI expansion', description: 'Expand Claude API usage for marketplace recommendations', products: ['api'], value: 100000, probability: 50, stage: 'Qualified', expectedCloseDate: '2026-06-30', champion: '', championName: 'Takeshi Yamamoto', nextSteps: 'Nemawashi process with stakeholders', createdDate: '2026-01-08', lastUpdated: '2026-01-19' },
  ],
  salesforce: { accountId: 'rakuten', sfAccountId: '0015000000STU901', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000STU901/view' },
}

const telstraBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'telstra',
  name: 'Telstra',
  industry: 'Telecommunications',
  country: 'Australia',
  region: 'APAC',
  city: 'Melbourne',
  employeeCount: 29000,
  website: 'https://www.telstra.com.au',
  tier: 'Enterprise',
  healthScore: {
    overall: 55,
    productUsage: 52,
    engagement: 58,
    businessOutcomes: 55,
    supportHealth: 54,
    relationshipStrength: 60,
    trend: 'down',
    lastCalculated: '2026-01-20',
  },
  arr: 380000,
  nrr: 95.2,
  grr: 88.5,
  contractStart: '2024-01-01',
  contractEnd: '2026-12-31',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Renewal',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'tel-api-001', product: 'api', name: 'Claude API Enterprise', quantity: 45000000, unit: 'tokens/month', unitPrice: 0.006, totalValue: 270000, startDate: '2024-01-01', endDate: '2026-12-31', autoRenewal: false }] },
    { type: 'enterprise', name: 'Claude Enterprise', active: true, contracts: [{ id: 'tel-ent-001', product: 'enterprise', name: 'Claude Enterprise Seats', quantity: 180, unit: 'seats', unitPrice: 600, totalValue: 108000, startDate: '2024-06-01', endDate: '2026-05-31', autoRenewal: false }] },
  ],
  opportunities: [],
  salesforce: { accountId: 'telstra', sfAccountId: '0015000000VWX234', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000VWX234/view' },
  tags: ['At Risk', 'Churn Risk', 'Needs Executive Engagement'],
}

const hclBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'hcl',
  name: 'HCL Technologies',
  industry: 'IT Services',
  country: 'India',
  region: 'APAC',
  city: 'Noida',
  employeeCount: 210000,
  website: 'https://www.hcltech.com',
  tier: 'Enterprise',
  healthScore: {
    overall: 80,
    productUsage: 82,
    engagement: 78,
    businessOutcomes: 80,
    supportHealth: 79,
    relationshipStrength: 81,
    trend: 'up',
    lastCalculated: '2026-01-20',
  },
  arr: 350000,
  nrr: 118.2,
  grr: 95.0,
  contractStart: '2024-07-01',
  contractEnd: '2027-06-30',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Expansion',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'hcl-api-001', product: 'api', name: 'Claude API Enterprise', quantity: 35000000, unit: 'tokens/month', unitPrice: 0.005, totalValue: 175000, startDate: '2024-07-01', endDate: '2027-06-30', autoRenewal: true }] },
    { type: 'code', name: 'Claude Code', active: true, contracts: [{ id: 'hcl-code-001', product: 'code', name: 'Claude Code Licenses', quantity: 175, unit: 'licenses', unitPrice: 1000, totalValue: 175000, startDate: '2024-10-01', endDate: '2027-09-30', autoRenewal: true }] },
  ],
  opportunities: [
    { id: 'hcl-opp-001', accountId: 'hcl', name: 'Enterprise deployment for client services', description: 'Claude Enterprise for client-facing consulting teams', products: ['enterprise'], value: 150000, probability: 55, stage: 'Qualified', expectedCloseDate: '2026-05-01', champion: '', championName: 'Priya Patel', nextSteps: 'Technical POC with delivery teams', createdDate: '2026-01-10', lastUpdated: '2026-01-18' },
  ],
  salesforce: { accountId: 'hcl', sfAccountId: '0015000000YZA567', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000YZA567/view' },
}

const canvaBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'canva',
  name: 'Canva',
  industry: 'Software',
  country: 'Australia',
  region: 'APAC',
  city: 'Sydney',
  employeeCount: 4500,
  website: 'https://www.canva.com',
  tier: 'Growth',
  healthScore: {
    overall: 90,
    productUsage: 94,
    engagement: 88,
    businessOutcomes: 90,
    supportHealth: 87,
    relationshipStrength: 90,
    trend: 'up',
    lastCalculated: '2026-01-20',
  },
  arr: 180000,
  nrr: 135.5,
  grr: 98.0,
  contractStart: '2025-01-01',
  contractEnd: '2026-12-31',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Expansion',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'can-api-001', product: 'api', name: 'Claude API Growth', quantity: 20000000, unit: 'tokens/month', unitPrice: 0.006, totalValue: 120000, startDate: '2025-01-01', endDate: '2026-12-31', autoRenewal: true }] },
    { type: 'code', name: 'Claude Code', active: true, contracts: [{ id: 'can-code-001', product: 'code', name: 'Claude Code Licenses', quantity: 60, unit: 'licenses', unitPrice: 1000, totalValue: 60000, startDate: '2025-06-01', endDate: '2026-12-31', autoRenewal: true }] },
  ],
  opportunities: [
    { id: 'can-opp-001', accountId: 'canva', name: 'Upgrade to Enterprise tier', description: 'Move from Growth to Enterprise with expanded API and new Enterprise seats', products: ['api', 'enterprise'], value: 300000, probability: 70, stage: 'Proposal', expectedCloseDate: '2026-03-01', champion: '', championName: 'Sophie Taylor', nextSteps: 'Business case presentation to leadership', createdDate: '2025-12-15', lastUpdated: '2026-01-15' },
  ],
  salesforce: { accountId: 'canva', sfAccountId: '0015000000BCD890', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000BCD890/view' },
  tags: ['High Growth', 'Expansion Ready'],
}

const gojekBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'gojek',
  name: 'GoJek',
  industry: 'Technology',
  country: 'Indonesia',
  region: 'APAC',
  city: 'Jakarta',
  employeeCount: 6000,
  website: 'https://www.gojek.com',
  tier: 'Growth',
  healthScore: {
    overall: 76,
    productUsage: 78,
    engagement: 74,
    businessOutcomes: 76,
    supportHealth: 75,
    relationshipStrength: 77,
    trend: 'stable',
    lastCalculated: '2026-01-20',
  },
  arr: 220000,
  nrr: 110.5,
  grr: 93.0,
  contractStart: '2024-09-01',
  contractEnd: '2026-08-31',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Adoption',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'goj-api-001', product: 'api', name: 'Claude API Growth', quantity: 25000000, unit: 'tokens/month', unitPrice: 0.006, totalValue: 150000, startDate: '2024-09-01', endDate: '2026-08-31', autoRenewal: true }] },
    { type: 'enterprise', name: 'Claude Enterprise', active: true, contracts: [{ id: 'goj-ent-001', product: 'enterprise', name: 'Claude Enterprise Seats', quantity: 120, unit: 'seats', unitPrice: 580, totalValue: 69600, startDate: '2025-03-01', endDate: '2026-08-31', autoRenewal: true }] },
  ],
  opportunities: [],
  salesforce: { accountId: 'gojek', sfAccountId: '0015000000EFG123', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000EFG123/view' },
}

const seekBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'seek',
  name: 'Seek',
  industry: 'Job Platform',
  country: 'Australia',
  region: 'APAC',
  city: 'Melbourne',
  employeeCount: 2800,
  website: 'https://www.seek.com.au',
  tier: 'Growth',
  healthScore: {
    overall: 68,
    productUsage: 65,
    engagement: 70,
    businessOutcomes: 68,
    supportHealth: 70,
    relationshipStrength: 69,
    trend: 'down',
    lastCalculated: '2026-01-20',
  },
  arr: 150000,
  nrr: 98.5,
  grr: 90.0,
  contractStart: '2024-11-01',
  contractEnd: '2025-10-31',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Renewal',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'seek-api-001', product: 'api', name: 'Claude API Growth', quantity: 20000000, unit: 'tokens/month', unitPrice: 0.006, totalValue: 120000, startDate: '2024-11-01', endDate: '2025-10-31', autoRenewal: true }] },
    { type: 'enterprise', name: 'Claude Enterprise', active: true, contracts: [{ id: 'seek-ent-001', product: 'enterprise', name: 'Claude Enterprise Seats', quantity: 50, unit: 'seats', unitPrice: 600, totalValue: 30000, startDate: '2025-02-01', endDate: '2025-10-31', autoRenewal: true }] },
  ],
  opportunities: [],
  salesforce: { accountId: 'seek', sfAccountId: '0015000000HIJ456', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000HIJ456/view' },
  tags: ['Renewal Due'],
}

const reaBase: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'> = {
  id: 'rea',
  name: 'REA Group',
  industry: 'PropTech',
  country: 'Australia',
  region: 'APAC',
  city: 'Melbourne',
  employeeCount: 3200,
  website: 'https://www.rea-group.com',
  tier: 'Growth',
  healthScore: {
    overall: 84,
    productUsage: 86,
    engagement: 82,
    businessOutcomes: 85,
    supportHealth: 82,
    relationshipStrength: 83,
    trend: 'up',
    lastCalculated: '2026-01-20',
  },
  arr: 190000,
  nrr: 120.5,
  grr: 95.5,
  contractStart: '2024-08-01',
  contractEnd: '2026-07-31',
  csmOwner: 'Tristan Rogers',
  lifecycleStage: 'Expansion',
  products: [
    { type: 'api', name: 'Claude API', active: true, contracts: [{ id: 'rea-api-001', product: 'api', name: 'Claude API Growth', quantity: 18000000, unit: 'tokens/month', unitPrice: 0.006, totalValue: 108000, startDate: '2024-08-01', endDate: '2026-07-31', autoRenewal: true }] },
    { type: 'enterprise', name: 'Claude Enterprise', active: true, contracts: [{ id: 'rea-ent-001', product: 'enterprise', name: 'Claude Enterprise Seats', quantity: 140, unit: 'seats', unitPrice: 580, totalValue: 81200, startDate: '2025-01-01', endDate: '2026-07-31', autoRenewal: true }] },
  ],
  opportunities: [
    { id: 'rea-opp-001', accountId: 'rea', name: 'Claude Code pilot program', description: 'Claude Code pilot for engineering team', products: ['code'], value: 50000, probability: 65, stage: 'Qualified', expectedCloseDate: '2026-04-01', champion: '', championName: 'Emma Williams', nextSteps: 'Technical evaluation with engineering leads', createdDate: '2026-01-05', lastUpdated: '2026-01-18' },
  ],
  salesforce: { accountId: 'rea', sfAccountId: '0015000000KLM789', accountOwner: 'Rachel Kim', accountExecutive: 'Marcus Johnson', lastSyncTime: '2026-01-21T08:00:00Z', syncStatus: 'success', sfAccountUrl: 'https://anthropic.lightning.force.com/lightning/r/Account/0015000000KLM789/view' },
}

// Helper function to populate account with generated data
function populateAccount(base: Omit<Account, 'stakeholders' | 'usageHistory' | 'interactions' | 'featureRequests' | 'useCases' | 'supportTickets' | 'tasks' | 'qbrs'>): Account {
  // Create partial account for generators that need stakeholders
  const partialAccount = { ...base, stakeholders: [], usageHistory: [], interactions: [], featureRequests: [], useCases: [], supportTickets: [], tasks: [], qbrs: [] } as Account

  // Generate stakeholders first (other generators may depend on them)
  const stakeholders = generateStakeholders(partialAccount)
  const accountWithStakeholders = { ...partialAccount, stakeholders }

  return {
    ...base,
    stakeholders,
    usageHistory: generateUsageHistory(accountWithStakeholders, 6),
    interactions: generateInteractions(accountWithStakeholders),
    featureRequests: generateFeatureRequests(accountWithStakeholders),
    useCases: generateUseCases(accountWithStakeholders),
    supportTickets: generateSupportTickets(accountWithStakeholders),
    tasks: generateTasks(accountWithStakeholders),
    qbrs: generateQBR(accountWithStakeholders),
  }
}

// Populate all accounts
const dbsBank = populateAccount(dbsBankBase)
const samsungElectronics = populateAccount(samsungBase)
const tokopedia = populateAccount(tokopediaBase)
const atlassian = populateAccount(atlassianBase)
const grab = populateAccount(grabBase)
const rakuten = populateAccount(rakutenBase)
const telstra = populateAccount(telstraBase)
const hclTech = populateAccount(hclBase)
const canva = populateAccount(canvaBase)
const gojek = populateAccount(gojekBase)
const seek = populateAccount(seekBase)
const reaGroup = populateAccount(reaBase)

// Export all accounts
export const accounts: Account[] = [
  commonwealthBank,
  dbsBank,
  samsungElectronics,
  tokopedia,
  atlassian,
  grab,
  rakuten,
  telstra,
  hclTech,
  canva,
  gojek,
  seek,
  reaGroup,
]

// Helper to get account by ID
export function getAccountById(id: string): Account | undefined {
  return accounts.find(acc => acc.id === id)
}

// Export individual accounts for direct import
export {
  commonwealthBank,
  dbsBank,
  samsungElectronics,
  tokopedia,
  atlassian,
  grab,
  rakuten,
  telstra,
  hclTech,
  canva,
  gojek,
  seek,
  reaGroup,
}
