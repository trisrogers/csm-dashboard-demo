import type { Interaction, Account, Task, FeatureRequest, UseCase, SupportTicket, QBR } from '@/types'

const interactionTopics = [
  ['Product Feedback', 'Roadmap Review'],
  ['Expansion Discussion', 'Use Case Review'],
  ['Technical Support', 'Integration Review'],
  ['Executive Engagement', 'QBR Prep'],
  ['Onboarding', 'Training'],
  ['Renewal Discussion', 'Contract Review'],
]

const sentiments: Interaction['sentiment'][] = ['Positive', 'Positive', 'Positive', 'Neutral', 'Neutral']

export function generateInteractions(account: Account): Interaction[] {
  const interactions: Interaction[] = []
  const stakeholderIds = account.stakeholders.map(s => s.id)

  // Generate 3-6 recent interactions
  const count = account.tier === 'Strategic' ? 6 : account.tier === 'Enterprise' ? 4 : 3

  for (let i = 0; i < count; i++) {
    const daysAgo = i * 7 + Math.floor(Math.random() * 5)
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)

    const topics = interactionTopics[i % interactionTopics.length]
    const type: Interaction['type'] = i % 3 === 0 ? 'Meeting' : i % 3 === 1 ? 'Call' : 'Email'

    interactions.push({
      id: `${account.id}-int-${String(i + 1).padStart(3, '0')}`,
      accountId: account.id,
      date: date.toISOString().split('T')[0],
      type,
      participants: [stakeholderIds[i % stakeholderIds.length]],
      internalParticipants: ['Tristan Rogers', i % 2 === 0 ? 'Solutions Architect' : undefined].filter(Boolean) as string[],
      summary: generateInteractionSummary(account, topics, type),
      topics,
      actionItems: i < 2 ? [{
        id: `${account.id}-ai-${String(i + 1).padStart(3, '0')}`,
        description: `Follow up on ${topics[0].toLowerCase()} discussion`,
        owner: 'Tristan Rogers',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: i === 0 ? 'In Progress' : 'Not Started',
      }] : [],
      sentiment: sentiments[i % sentiments.length],
      duration: type === 'Meeting' ? 60 : type === 'Call' ? 30 : undefined,
    })
  }

  return interactions
}

function generateInteractionSummary(account: Account, topics: string[], type: Interaction['type']): string {
  const summaries: Record<string, string[]> = {
    'Product Feedback': [
      `Discussed ${account.name}'s feedback on recent product updates. Team is excited about new features.`,
      `Reviewed ${account.name}'s product experience. Positive feedback on performance improvements.`,
    ],
    'Expansion Discussion': [
      `Explored expansion opportunities with ${account.name}. Interested in adding more seats/capacity.`,
      `${account.name} showing interest in expanding to additional teams and departments.`,
    ],
    'Technical Support': [
      `Technical deep-dive session with ${account.name}'s engineering team. Resolved integration questions.`,
      `Addressed technical concerns and provided best practices guidance for ${account.name}.`,
    ],
    'Executive Engagement': [
      `Executive check-in with ${account.name} leadership. Reviewed strategic priorities for the quarter.`,
      `Strategic alignment meeting with ${account.name}. Confirmed commitment to AI initiatives.`,
    ],
    'QBR Prep': [
      `QBR preparation call with ${account.name}. Aligned on agenda and key metrics to present.`,
      `Finalized QBR materials and confirmed attendee list with ${account.name}.`,
    ],
    'Use Case Review': [
      `Reviewed active use cases at ${account.name}. Strong ROI metrics across implementations.`,
      `Use case performance review with ${account.name}. Identified opportunities for optimization.`,
    ],
  }

  const topicSummaries = summaries[topics[0]] || [`${type} with ${account.name} team regarding ${topics.join(', ')}.`]
  return topicSummaries[Math.floor(Math.random() * topicSummaries.length)]
}

export function generateTasks(account: Account): Task[] {
  const tasks: Task[] = []
  const now = new Date()

  // Generate 2-4 tasks
  const taskTemplates = [
    { desc: 'Prepare quarterly business review materials', priority: 'High' as const, status: 'In Progress' as const },
    { desc: 'Follow up on expansion opportunity', priority: 'High' as const, status: 'Not Started' as const },
    { desc: 'Schedule executive sync with CTO', priority: 'Medium' as const, status: 'Not Started' as const },
    { desc: 'Document new use case ROI metrics', priority: 'Medium' as const, status: 'In Progress' as const },
  ]

  const count = account.tier === 'Strategic' ? 4 : account.tier === 'Enterprise' ? 3 : 2

  for (let i = 0; i < count; i++) {
    const template = taskTemplates[i]
    const dueDate = new Date(now)
    dueDate.setDate(dueDate.getDate() + 7 + i * 5)

    tasks.push({
      id: `${account.id}-task-${String(i + 1).padStart(3, '0')}`,
      accountId: account.id,
      description: template.desc,
      owner: 'Tristan Rogers',
      dueDate: dueDate.toISOString().split('T')[0],
      priority: template.priority,
      status: template.status,
      relatedType: 'general',
    })
  }

  return tasks
}

export function generateFeatureRequests(account: Account): FeatureRequest[] {
  const requests: FeatureRequest[] = []
  if (account.stakeholders.length === 0) return requests

  const templates = [
    {
      title: 'Enhanced SSO integration',
      description: 'Support for additional identity providers and SAML configuration options.',
      priority: 'High' as const,
      status: 'Planned' as const,
      businessCase: 'Would simplify onboarding and improve security compliance.',
    },
    {
      title: 'Custom analytics dashboard',
      description: 'Ability to create custom views of usage metrics and export reports.',
      priority: 'Medium' as const,
      status: 'Under Review' as const,
      businessCase: 'Better visibility into usage patterns for internal reporting.',
    },
    {
      title: 'Bulk user management',
      description: 'Tools for managing large numbers of users including bulk provisioning.',
      priority: 'Medium' as const,
      status: 'Shipped' as const,
      businessCase: 'Reduce administrative overhead for IT team.',
    },
  ]

  const count = account.tier === 'Strategic' ? 3 : account.tier === 'Enterprise' ? 2 : 1

  for (let i = 0; i < count; i++) {
    const template = templates[i]
    const requestDate = new Date()
    requestDate.setMonth(requestDate.getMonth() - 2 - i)
    const stakeholder = account.stakeholders[i % account.stakeholders.length]

    requests.push({
      id: `${account.id}-fr-${String(i + 1).padStart(3, '0')}`,
      accountId: account.id,
      title: template.title,
      description: template.description,
      requestedBy: stakeholder.id,
      requestedByName: stakeholder.name,
      department: stakeholder.department,
      dateRequested: requestDate.toISOString().split('T')[0],
      priority: template.priority,
      status: template.status,
      businessCase: template.businessCase,
      revenueImpact: template.priority === 'High' ? 50000 : 25000,
    })
  }

  return requests
}

export function generateUseCases(account: Account): UseCase[] {
  const useCases: UseCase[] = []

  const hasApi = account.products.some(p => p.type === 'api')
  const hasEnterprise = account.products.some(p => p.type === 'enterprise')
  const hasCode = account.products.some(p => p.type === 'code')

  const templates: { name: string; products: ('api' | 'enterprise' | 'code')[]; dept: string; problem: string }[] = [
    { name: 'Customer Support Automation', products: ['api', 'enterprise'], dept: 'Customer Support', problem: 'High volume of support tickets requiring manual triage and response.' },
    { name: 'Content Generation', products: ['enterprise'], dept: 'Marketing', problem: 'Time-consuming content creation process for multiple channels.' },
    { name: 'Code Review Automation', products: ['code'], dept: 'Engineering', problem: 'Manual code reviews creating bottlenecks in development workflow.' },
    { name: 'Document Analysis', products: ['api'], dept: 'Operations', problem: 'Manual processing of large volumes of documents and contracts.' },
  ]

  const filtered = templates.filter(t =>
    t.products.every(p =>
      (p === 'api' && hasApi) || (p === 'enterprise' && hasEnterprise) || (p === 'code' && hasCode)
    )
  )

  const count = Math.min(filtered.length, account.tier === 'Strategic' ? 3 : account.tier === 'Enterprise' ? 2 : 1)

  for (let i = 0; i < count; i++) {
    const template = filtered[i]
    const goLiveDate = new Date()
    goLiveDate.setMonth(goLiveDate.getMonth() - 3 - i * 2)

    useCases.push({
      id: `${account.id}-uc-${String(i + 1).padStart(3, '0')}`,
      accountId: account.id,
      name: template.name,
      department: template.dept,
      problemSolved: template.problem,
      products: template.products,
      implementation: `Implemented using Claude ${template.products.join(', ')} with custom integration.`,
      usersInvolved: 20 + Math.floor(Math.random() * 80),
      goLiveDate: goLiveDate.toISOString().split('T')[0],
      outcomes: [
        { metric: 'Time Saved', value: 30 + Math.floor(Math.random() * 40), unit: '%', description: 'Reduction in manual effort' },
        { metric: 'Quality Improvement', value: 15 + Math.floor(Math.random() * 25), unit: '%', description: 'Increase in output quality' },
      ],
      roi: 150 + Math.floor(Math.random() * 200),
      replicabilityScore: 70 + Math.floor(Math.random() * 25),
      caseStudyPotential: account.tier === 'Strategic',
    })
  }

  return useCases
}

export function generateSupportTickets(account: Account): SupportTicket[] {
  const tickets: SupportTicket[] = []

  const templates = [
    { title: 'API integration question', severity: 'P3' as const, category: 'Integration' },
    { title: 'Performance optimization', severity: 'P2' as const, category: 'Performance' },
    { title: 'Feature configuration help', severity: 'P3' as const, category: 'Configuration' },
  ]

  const count = Math.floor(Math.random() * 2) + 1

  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length]
    const createdDate = new Date()
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 14))
    const resolved = Math.random() > 0.3

    tickets.push({
      id: `${account.id}-st-${String(i + 1).padStart(3, '0')}`,
      accountId: account.id,
      title: template.title,
      severity: template.severity,
      status: resolved ? 'Resolved' : 'In Progress',
      createdDate: createdDate.toISOString().split('T')[0],
      resolvedDate: resolved ? new Date().toISOString().split('T')[0] : undefined,
      assignee: 'Technical Support',
      category: template.category,
      escalated: false,
      csat: resolved ? 4 + Math.floor(Math.random() * 2) : undefined,
    })
  }

  return tickets
}

export function generateQBR(account: Account): QBR[] {
  if (account.tier === 'Growth' || account.stakeholders.length === 0) return []

  const nextQBRDate = new Date()
  nextQBRDate.setMonth(nextQBRDate.getMonth() + 1)

  return [{
    id: `${account.id}-qbr-001`,
    accountId: account.id,
    date: nextQBRDate.toISOString().split('T')[0],
    timezone: account.country === 'Australia' ? 'Australia/Sydney' :
              account.country === 'Singapore' ? 'Asia/Singapore' :
              account.country === 'Japan' ? 'Asia/Tokyo' :
              account.country === 'South Korea' ? 'Asia/Seoul' :
              account.country === 'Indonesia' ? 'Asia/Jakarta' :
              account.country === 'India' ? 'Asia/Kolkata' : 'Australia/Sydney',
    status: 'Preparing',
    attendees: account.stakeholders.slice(0, 3).map(s => s.id),
    internalAttendees: ['Tristan Rogers', 'Account Executive'],
    preparationChecklist: [
      { item: 'Update health score analysis', completed: true },
      { item: 'Prepare usage/adoption metrics', completed: true },
      { item: 'Calculate ROI/business outcomes', completed: false },
      { item: 'Review feature requests status', completed: false },
      { item: 'Identify expansion opportunities', completed: false },
      { item: 'Draft executive summary', completed: false },
      { item: 'Create presentation deck', completed: false },
    ],
  }]
}
