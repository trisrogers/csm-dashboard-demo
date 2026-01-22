import type { Stakeholder, Account } from '@/types'

// Industry-specific role templates
const rolesByIndustry: Record<string, { title: string; department: string; type: Stakeholder['stakeholderType'] }[]> = {
  'Financial Services': [
    { title: 'Chief Technology Officer', department: 'Technology', type: 'Executive' },
    { title: 'Head of Digital Banking', department: 'Digital', type: 'Executive' },
    { title: 'VP Engineering', department: 'Engineering', type: 'Technical' },
    { title: 'Chief Risk Officer', department: 'Risk & Compliance', type: 'Executive' },
    { title: 'Director of AI/ML', department: 'Technology', type: 'Technical' },
    { title: 'Head of Customer Experience', department: 'Customer Experience', type: 'Business' },
  ],
  'Technology': [
    { title: 'Chief Technology Officer', department: 'Engineering', type: 'Executive' },
    { title: 'VP of Product', department: 'Product', type: 'Executive' },
    { title: 'Engineering Director', department: 'Engineering', type: 'Technical' },
    { title: 'Head of Platform', department: 'Platform', type: 'Technical' },
    { title: 'Director of ML/AI', department: 'AI/ML', type: 'Technical' },
    { title: 'VP Operations', department: 'Operations', type: 'Business' },
  ],
  'E-commerce': [
    { title: 'Chief Technology Officer', department: 'Technology', type: 'Executive' },
    { title: 'VP of Engineering', department: 'Engineering', type: 'Technical' },
    { title: 'Head of Marketplace', department: 'Marketplace', type: 'Business' },
    { title: 'Director of Customer Support', department: 'Customer Support', type: 'Business' },
    { title: 'Senior Engineering Manager', department: 'Engineering', type: 'Technical' },
    { title: 'Head of Data Science', department: 'Data', type: 'Technical' },
  ],
  'Software': [
    { title: 'Chief Technology Officer', department: 'Engineering', type: 'Executive' },
    { title: 'VP of Engineering', department: 'Engineering', type: 'Executive' },
    { title: 'Principal Engineer', department: 'Engineering', type: 'Technical' },
    { title: 'Director of Product', department: 'Product', type: 'Business' },
    { title: 'Head of Developer Experience', department: 'DevEx', type: 'Technical' },
    { title: 'Engineering Manager', department: 'Engineering', type: 'Technical' },
  ],
  'Telecommunications': [
    { title: 'Chief Digital Officer', department: 'Digital', type: 'Executive' },
    { title: 'VP Technology', department: 'Technology', type: 'Executive' },
    { title: 'Director of Network Operations', department: 'Operations', type: 'Technical' },
    { title: 'Head of Customer Service', department: 'Customer Service', type: 'Business' },
    { title: 'Senior Architect', department: 'Architecture', type: 'Technical' },
    { title: 'IT Director', department: 'IT', type: 'Technical' },
  ],
  'IT Services': [
    { title: 'Chief Technology Officer', department: 'Technology', type: 'Executive' },
    { title: 'Head of AI Practice', department: 'AI Practice', type: 'Executive' },
    { title: 'Delivery Director', department: 'Delivery', type: 'Business' },
    { title: 'Technical Architect', department: 'Architecture', type: 'Technical' },
    { title: 'Practice Lead', department: 'Consulting', type: 'Business' },
    { title: 'Engineering Manager', department: 'Engineering', type: 'Technical' },
  ],
  'Job Platform': [
    { title: 'Chief Technology Officer', department: 'Technology', type: 'Executive' },
    { title: 'VP Product', department: 'Product', type: 'Executive' },
    { title: 'Head of Search & Matching', department: 'Engineering', type: 'Technical' },
    { title: 'Director of AI', department: 'AI', type: 'Technical' },
    { title: 'Product Manager', department: 'Product', type: 'Business' },
    { title: 'Senior Engineer', department: 'Engineering', type: 'Technical' },
  ],
  'PropTech': [
    { title: 'Chief Technology Officer', department: 'Technology', type: 'Executive' },
    { title: 'VP Engineering', department: 'Engineering', type: 'Executive' },
    { title: 'Head of Data', department: 'Data', type: 'Technical' },
    { title: 'Product Director', department: 'Product', type: 'Business' },
    { title: 'Engineering Manager', department: 'Engineering', type: 'Technical' },
    { title: 'AI/ML Lead', department: 'AI', type: 'Technical' },
  ],
}

// Country-specific names
const namesByCountry: Record<string, { first: string; last: string }[]> = {
  'Australia': [
    { first: 'James', last: 'Mitchell' }, { first: 'Sarah', last: 'Thompson' },
    { first: 'Michael', last: 'Anderson' }, { first: 'Emma', last: 'Williams' },
    { first: 'David', last: 'Brown' }, { first: 'Sophie', last: 'Taylor' },
  ],
  'Singapore': [
    { first: 'Wei Ming', last: 'Tan' }, { first: 'Li Hua', last: 'Chen' },
    { first: 'Kumar', last: 'Krishnan' }, { first: 'Mei Ling', last: 'Wong' },
    { first: 'Raj', last: 'Sharma' }, { first: 'Yi Lin', last: 'Lim' },
  ],
  'South Korea': [
    { first: 'Min-jun', last: 'Kim' }, { first: 'Seo-yeon', last: 'Park' },
    { first: 'Ji-hoon', last: 'Lee' }, { first: 'Eun-ji', last: 'Choi' },
    { first: 'Hyun-woo', last: 'Jung' }, { first: 'Su-min', last: 'Kang' },
  ],
  'Indonesia': [
    { first: 'Budi', last: 'Santoso' }, { first: 'Dewi', last: 'Putri' },
    { first: 'Agus', last: 'Prasetyo' }, { first: 'Siti', last: 'Rahayu' },
    { first: 'Andi', last: 'Wijaya' }, { first: 'Rina', last: 'Kusuma' },
  ],
  'Japan': [
    { first: 'Takeshi', last: 'Yamamoto' }, { first: 'Yuki', last: 'Tanaka' },
    { first: 'Kenji', last: 'Suzuki' }, { first: 'Akiko', last: 'Sato' },
    { first: 'Hiroshi', last: 'Nakamura' }, { first: 'Mika', last: 'Watanabe' },
  ],
  'India': [
    { first: 'Rahul', last: 'Sharma' }, { first: 'Priya', last: 'Patel' },
    { first: 'Vikram', last: 'Singh' }, { first: 'Ananya', last: 'Gupta' },
    { first: 'Arun', last: 'Kumar' }, { first: 'Neha', last: 'Verma' },
  ],
}

const timezoneByCountry: Record<string, string> = {
  'Australia': 'Australia/Sydney',
  'Singapore': 'Asia/Singapore',
  'South Korea': 'Asia/Seoul',
  'Indonesia': 'Asia/Jakarta',
  'Japan': 'Asia/Tokyo',
  'India': 'Asia/Kolkata',
}

export function generateStakeholders(account: Account): Stakeholder[] {
  const roles = rolesByIndustry[account.industry] || rolesByIndustry['Technology']
  const names = namesByCountry[account.country] || namesByCountry['Australia']
  const timezone = timezoneByCountry[account.country] || 'Australia/Sydney'

  // Generate 4-6 stakeholders based on tier
  const count = account.tier === 'Strategic' ? 6 : account.tier === 'Enterprise' ? 5 : 4
  const stakeholders: Stakeholder[] = []

  const relationshipStrengths: Stakeholder['relationshipStrength'][] = ['Champion', 'Champion', 'Supporter', 'Supporter', 'Neutral', 'Neutral']
  const communications: Stakeholder['preferredCommunication'][] = ['Video', 'Video', 'Email', 'In-person', 'Video', 'Email']

  for (let i = 0; i < count; i++) {
    const role = roles[i % roles.length]
    const name = names[i % names.length]
    // Use fake domain to avoid accidental emails to real addresses
    const emailDomain = 'fal.se'

    const daysAgo = Math.floor(Math.random() * 30) + 1
    const lastContactDate = new Date()
    lastContactDate.setDate(lastContactDate.getDate() - daysAgo)

    stakeholders.push({
      id: `${account.id}-sh-${String(i + 1).padStart(3, '0')}`,
      accountId: account.id,
      name: `${name.first} ${name.last}`,
      title: role.title,
      email: `${name.first.toLowerCase()}.${name.last.toLowerCase()}@${emailDomain}`,
      phone: '+' + (account.country === 'Australia' ? '61 2' : account.country === 'Singapore' ? '65' : account.country === 'South Korea' ? '82 2' : account.country === 'Indonesia' ? '62 21' : account.country === 'Japan' ? '81 3' : '91') + ' XXXX XXXX',
      department: role.department,
      relationshipStrength: relationshipStrengths[i % relationshipStrengths.length],
      influenceLevel: i < 2 ? 'High' : i < 4 ? 'Medium' : 'Low',
      stakeholderType: role.type,
      decisionMaker: i < 2,
      lastContact: lastContactDate.toISOString().split('T')[0],
      timezone,
      preferredCommunication: communications[i % communications.length],
      notes: i === 0 ? 'Primary executive sponsor. Key decision maker for AI initiatives.' :
             i === 1 ? 'Technical champion. Drives adoption and integration.' :
             'Active participant in regular check-ins.',
    })
  }

  return stakeholders
}
