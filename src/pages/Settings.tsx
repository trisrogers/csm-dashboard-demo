import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Bell, Globe, Shield, Database, Palette } from 'lucide-react'

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your CSM dashboard preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Tristan Rogers</div>
                <div className="text-sm text-muted-foreground">Enterprise CSM, APAC</div>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Managing 13 strategic APAC accounts
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Health score alerts</span>
              <Badge variant="outline">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Renewal reminders</span>
              <Badge variant="outline">30 days</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Usage anomalies</span>
              <Badge variant="outline">Enabled</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Regional Preferences
            </CardTitle>
            <CardDescription>Time zone and locale settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Primary timezone</span>
              <Badge variant="outline">AEDT (Sydney)</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Date format</span>
              <Badge variant="outline">DD/MM/YYYY</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Currency</span>
              <Badge variant="outline">USD</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Authentication and access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">SSO</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">MFA</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last login</span>
              <span className="text-sm text-muted-foreground">Today, 9:00 AM</span>
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Integrations
            </CardTitle>
            <CardDescription>Connected systems and APIs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Salesforce</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Slack</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Anthropic API</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Display
            </CardTitle>
            <CardDescription>Theme and appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <Badge variant="outline">Light</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dashboard density</span>
              <Badge variant="outline">Comfortable</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Chart animations</span>
              <Badge variant="outline">Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Notice */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              This is a demonstration application showcasing enterprise CSM capabilities for Anthropic APAC.
            </p>
            <p className="text-xs mt-2">
              Settings shown are illustrative and do not persist changes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
