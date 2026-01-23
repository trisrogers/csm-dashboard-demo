import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Mail,
  Phone,
  Linkedin,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Users,
  Target,
  Brain,
  FileText,
  PenTool,
  MessageSquare,
} from 'lucide-react'

const experiences = [
  {
    period: 'March 2023 - Oct 2025',
    title: 'Delivery Lead / Technical Project Manager',
    company: 'Cognetics (EPI-USE)',
    highlights: [
      'Led delivery of enterprise HCM and RPA automation projects for Australian clients across healthcare, government, and commercial sectors.',
      'Successfully delivered large Dayforce HCM implementation encompassing HR, WFM, Talent Management, Payroll, and go1 Learning integration.',
      'Designed SAP BTP BPA automation proof of concept for Department of Health and Aged Care, automating Paid Parental Leave, Purchased Leave Reconciliation, and Superannuation processes.',
      'Managed multiple concurrent RPA projects, including recruitment and HR process automations, delivering efficiency improvements and cost reduction.',
      'Coordinated technical integrations, data migrations, parallel testing, and user training across multiple workstreams while maintaining stakeholder engagement and project governance.',
    ],
  },
  {
    period: 'Sept 2019 - Dec 2021',
    title: 'Senior Technical Project Manager',
    company: 'Intelerad Medical Systems',
    highlights: [
      'Technical lead for principal projects in Oceania region. Including $50m WA Public Hospital Picture Archive and Communication System (PACS) replacement.',
      'Technical liaison between overseas teams, local PMO and clients, covering integrations, data migration, architecture, deployment, workflow and system configuration.',
      'Developed and documented technical plans for bespoke projects.',
    ],
  },
  {
    period: 'Aug 2016 - Sept 2019',
    title: 'Project Manager',
    company: 'Intelerad',
    highlights: [
      'Led multiple system roll-out projects, including scoping, scheduling, resource management and reporting.',
      'Coordinating multiple parties and liaising with client IT and operations, external software vendors, hardware suppliers, and internal departments.',
      'Delivered Healius PACS replacement for over 150 sites Australia-wide, from solution development to company-wide rollout.',
    ],
  },
  {
    period: 'June 2010 - Aug 2016',
    title: 'Customer Success Manager',
    company: 'Intelerad',
    highlights: [
      'Managed relationships and advocated for 15 clients across Australia / NZ.',
      'Internal sales to address the requirements of my clients. Sales process from solutioning to delivery.',
      'Managing client projects including upgrades, site expansions, workflow changes and systems integrations.',
    ],
  },
]

const earlierRoles = [
  { period: 'Apr 2009 - May 2010', title: 'PACS Field Analyst', company: 'Intelerad' },
  { period: 'Dec 2007 - Mar 2009', title: 'Application Specialist/Trainer', company: 'Intelerad' },
  { period: 'May 2007 - Nov 2007', title: 'Occupational Therapist - Sales', company: 'Northcott Equipment Solutions' },
  { period: 'Aug 2004 - May 2006', title: 'Occupational Therapist - Community', company: 'Harrow Social Services, UK' },
  { period: 'May 2003 - Mar 2004', title: 'Occupational Therapist - Quick Response', company: 'Croydon Social Services, UK' },
  { period: 'Jan 2003 - May 2003', title: 'Occupational Therapist - Home Based Therapy', company: 'Concord Aged and Extended Care, NSW' },
  { period: 'Jan 2002 - Aug 2002', title: 'Rehabilitation Consultant (Occ. Therapy)', company: 'CRS Australia' },
]

const keySkills = [
  { name: 'Stakeholder Engagement', icon: Users },
  { name: 'Problem Solving', icon: Brain },
  { name: 'Continual Learning', icon: Target },
  { name: 'Technical Communication', icon: MessageSquare },
  { name: 'Consensus Building', icon: PenTool },
]

const technicalSkills = [
  'UiPath Studio',
  'MS/Google Office Suite',
  'PM Suites: MS Project, Jira, DevOps, ClickUp',
  'Linux Admin',
  'API Integrations',
  'Data Cleansing / Migration',
  'AI Engineering',
]

export default function AboutMe() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start gap-6 mb-6">
          <img
            src="/profile.jpg"
            alt="Tristan Rogers"
            className="w-32 h-32 rounded-xl object-cover shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-primary mb-2">Tristan Rogers</h1>
            <p className="text-xl text-muted-foreground mb-4">Customer Success Manager</p>

            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href="tel:0433633601"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                0433 633 601
              </a>
              <a
                href="mailto:tristanrogers@outlook.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                tristanrogers@outlook.com
              </a>
              <a
                href="https://linkedin.com/in/tristan-rogers-70b55a93/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Objective */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-base leading-relaxed">
              As a CSM and PM professional with <strong>15+ years of driving adoption and expansion</strong> for complex B2B technology solutions across APAC, I've combined deep CSM experience (Intelerad) with technical project delivery expertise in AI/RPA automation (Cognetics) and healthcare technology. I've proven my ability to <strong>bridge technical teams and executive stakeholders</strong> while managing multimillion-dollar implementations across diverse markets. With a background in Occupational Therapy, I have a unique outlook on understanding clients' requirements and developing the relationships to successfully deliver on projects that bring value.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Experience */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 pb-6 border-l-2 border-primary/20 last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">
                      {exp.period}
                    </Badge>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex gap-2">
                        <span className="text-primary mt-1">-</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Earlier Roles Summary */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Earlier Roles</h4>
                <div className="space-y-2">
                  {earlierRoles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{role.title}</span>
                      <span className="text-muted-foreground text-xs">{role.company} ({role.period})</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Skills & Education */}
        <div className="space-y-6">
          {/* Key Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-5 w-5 text-primary" />
                Key Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keySkills.map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Technical Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Code className="h-5 w-5 text-primary" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium text-sm">Bachelor of Applied Science</p>
                <p className="text-sm text-muted-foreground">(Occupational Therapy)</p>
                <p className="text-xs text-muted-foreground">1998 - 2001</p>
              </div>
            </CardContent>
          </Card>

          {/* Professional Development */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-5 w-5 text-primary" />
                Professional Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-sm">Project Management Complete Guide (PMBOK)</p>
                <p className="text-xs text-muted-foreground">Syd Uni Continuing Ed. 2013</p>
              </div>
              <div>
                <p className="font-medium text-sm">Red Hat Certified Systems Administrator</p>
                <p className="text-xs text-muted-foreground">2010</p>
              </div>
            </CardContent>
          </Card>

          {/* Why Anthropic */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5 text-primary" />
                Why This Dashboard?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This mock CSM Dashboard demonstrates my understanding of enterprise customer success metrics, APAC regional dynamics, and modern web development. Built with React, TypeScript, and Tailwind CSS to showcase technical capability alongside strategic CSM thinking.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
