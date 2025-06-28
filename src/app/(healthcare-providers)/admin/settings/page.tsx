import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Bell, Shield, Palette, Globe, Settings, Lock, Database, Wifi, Monitor } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
            <p className="text-sm text-slate-600">Manage your account and system preferences</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-700">All Systems Online</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Main Settings */}
          <div className="lg:col-span-8 space-y-6">
            {/* Account Settings */}
            <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <User className="w-5 h-5 text-indigo-600" />
                  <span>Account Information</span>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Update your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700 font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      defaultValue="Dr. Sarah"
                      className="bg-white/80 border-slate-200 focus:border-indigo-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700 font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      defaultValue="Johnson"
                      className="bg-white/80 border-slate-200 focus:border-indigo-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    defaultValue="sarah.johnson@healthtech.com"
                    className="bg-white/80 border-slate-200 focus:border-indigo-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    defaultValue="+1 (555) 123-4567"
                    className="bg-white/80 border-slate-200 focus:border-indigo-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-slate-700 font-medium">
                    Department
                  </Label>
                  <Input
                    id="department"
                    placeholder="Enter your department"
                    defaultValue="Emergency Medicine"
                    className="bg-white/80 border-slate-200 focus:border-indigo-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                    <div className="space-y-1">
                      <Label htmlFor="emailNotifications" className="text-slate-700 font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <div className="space-y-1">
                      <Label htmlFor="pushNotifications" className="text-slate-700 font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-slate-600">Receive push notifications in browser</p>
                    </div>
                    <Switch id="pushNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <div className="space-y-1">
                      <Label htmlFor="smsNotifications" className="text-slate-700 font-medium">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-slate-600">Receive notifications via SMS</p>
                    </div>
                    <Switch id="smsNotifications" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                    <div className="space-y-1">
                      <Label htmlFor="emergencyAlerts" className="text-slate-700 font-medium">
                        Emergency Alerts
                      </Label>
                      <p className="text-sm text-slate-600">Receive critical emergency notifications</p>
                    </div>
                    <Switch id="emergencyAlerts" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Preferences */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Settings className="w-5 h-5 text-green-600" />
                  <span>System Preferences</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="space-y-1">
                        <Label className="text-slate-700 font-medium text-sm">Auto-Save</Label>
                        <p className="text-xs text-slate-600">Automatically save changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="space-y-1">
                        <Label className="text-slate-700 font-medium text-sm">Dark Mode</Label>
                        <p className="text-xs text-slate-600">Use dark theme</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="space-y-1">
                        <Label className="text-slate-700 font-medium text-sm">Compact Mode</Label>
                        <p className="text-xs text-slate-600">Reduce spacing and padding</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="space-y-1">
                        <Label className="text-slate-700 font-medium text-sm">Sound Effects</Label>
                        <p className="text-xs text-slate-600">Play notification sounds</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Additional Settings */}
          <div className="lg:col-span-4 space-y-6">
            {/* Security Settings */}
            <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Shield className="w-5 h-5 text-red-600" />
                  <span>Security</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Manage your security settings</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-red-50 border-red-200">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-red-50 border-red-200">
                  <Shield className="w-4 h-4 mr-2" />
                  Two-Factor Auth
                </Button>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Last Login</span>
                    <span className="text-sm text-slate-600">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Active Sessions</span>
                    <Badge className="bg-green-100 text-green-700">3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Monitor className="w-5 h-5 text-blue-600" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-700">Database</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-700">Network</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-700">Security</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Secure</Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">CPU Usage</span>
                    <span className="text-sm text-slate-600">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Memory Usage</span>
                    <span className="text-sm text-slate-600">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Palette className="w-5 h-5 text-purple-600" />
                  <span>Appearance</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Customize your interface</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">Theme</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="bg-white text-slate-700 border-slate-200">
                      Light
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 text-white border-slate-600">
                      Dark
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">Color Scheme</Label>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-blue-600"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span>Language & Region</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Language</Label>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/80 text-slate-700 hover:bg-green-50 border-green-200"
                  >
                    English (US)
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Timezone</Label>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/80 text-slate-700 hover:bg-green-50 border-green-200"
                  >
                    UTC-5 (Eastern)
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Date Format</Label>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/80 text-slate-700 hover:bg-green-50 border-green-200"
                  >
                    MM/DD/YYYY
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Settings className="w-5 h-5 text-amber-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-white/80 text-slate-700 hover:bg-amber-50 border-amber-200"
                >
                  Export Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/80 text-slate-700 hover:bg-amber-50 border-amber-200"
                >
                  Import Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/80 text-slate-700 hover:bg-amber-50 border-amber-200"
                >
                  Reset to Default
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-2">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
