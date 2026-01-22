import { Link, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, AlertTriangle, Cloud, Database, Lock, Server } from 'lucide-react'

export default function MockSalesforce() {
  const [searchParams] = useSearchParams()
  const accountId = searchParams.get('accountId')
  const accountName = searchParams.get('accountName')
  const sfId = searchParams.get('sfId')

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00A1E0]/5 to-[#1798C1]/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={accountId ? `/accounts/${accountId}` : '/accounts'}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {accountName || 'Account'}
          </Link>

          <div className="flex items-center gap-4">
            {/* Salesforce logo */}
            <div className="w-12 h-12 rounded-lg bg-[#00A1E0] flex items-center justify-center">
              <Cloud className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#00A1E0]">Salesforce</h1>
              <p className="text-muted-foreground">Customer 360 Platform</p>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <Card className="border-amber-300 bg-amber-50 mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold text-amber-800 mb-2">
                  Mock Integration Notice
                </h2>
                <p className="text-amber-700 mb-4">
                  This is a <strong>demonstration application</strong> and is not connected to any external
                  Salesforce instance or real customer data. All data shown in this CSM Dashboard is
                  mock data generated for demonstration purposes only.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-amber-400 text-amber-700">
                    Demo Mode
                  </Badge>
                  <Badge variant="outline" className="border-amber-400 text-amber-700">
                    No External Connections
                  </Badge>
                  <Badge variant="outline" className="border-amber-400 text-amber-700">
                    Mock Data Only
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mock Account Info */}
        {(accountName || sfId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-base">Account Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accountName && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Account Name</div>
                    <div className="font-medium">{accountName}</div>
                  </div>
                )}
                {sfId && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Salesforce ID</div>
                    <div className="font-mono text-sm text-muted-foreground">{sfId}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* What Would Be Here Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">In a Real Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              In a production environment, clicking "View in Salesforce" would redirect you to the
              actual Salesforce account record where you could:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <Database className="h-8 w-8 text-[#00A1E0] mb-3" />
                <h3 className="font-medium mb-1">View Full CRM Data</h3>
                <p className="text-sm text-muted-foreground">
                  Access complete account history, contacts, and activities
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <Server className="h-8 w-8 text-[#00A1E0] mb-3" />
                <h3 className="font-medium mb-1">Manage Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Update deal stages, values, and close dates
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <Lock className="h-8 w-8 text-[#00A1E0] mb-3" />
                <h3 className="font-medium mb-1">SSO Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Secure single sign-on with enterprise credentials
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            This CSM Dashboard demo was created to showcase enterprise customer success management capabilities.
          </p>
          <p className="mt-1">
            Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  )
}
