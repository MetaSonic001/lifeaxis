import { Overview } from "@/components/overview"
import { RecentAlerts } from "@/components/recent-alerts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  AlertTriangle,
  Brain,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  Heart,
  Stethoscope,
  Pill,
  Bed,
  UserCheck,
  Zap,
  Shield,
  Bell,
  MapPin,
  Phone,
  Mail,
  BarChart3,
  PieChart,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-sm text-slate-600">Welcome back! Here's your hospital overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>{currentTime}</span>
            </div>
            <Button variant="outline" size="sm" className="bg-white/80">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Total Patients</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">1,234</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +180 from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Critical Patients</CardTitle>
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">23</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                    -2 from yesterday
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Active Staff</CardTitle>
                  <div className="p-2 bg-green-100 rounded-full">
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">164</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +6 from last shift
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Burnout Risk</CardTitle>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Brain className="h-4 w-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">12%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                    -2% from last week
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Patient Admissions</span>
                  </CardTitle>
                  <CardDescription>Monthly admission trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <Overview />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <PieChart className="w-5 h-5 text-green-600" />
                    <span>Department Occupancy</span>
                  </CardTitle>
                  <CardDescription>Current capacity by department</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Emergency</span>
                      <span className="text-sm text-slate-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">ICU</span>
                      <span className="text-sm text-slate-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">General Ward</span>
                      <span className="text-sm text-slate-600">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Surgery</span>
                      <span className="text-sm text-slate-600">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Emergency Response</span>
                  </CardTitle>
                  <CardDescription>1 active emergency</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/emergency-response">
                    <Button className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white">
                      Manage Response
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Resource Allocation</span>
                  </CardTitle>
                  <CardDescription>AI optimization ready</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/resource-allocation">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                      Optimize Schedule
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-800">
                    <Pill className="w-5 h-5 text-green-600" />
                    <span>Medication Management</span>
                  </CardTitle>
                  <CardDescription>2 low stock alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/medication-management">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                      View Inventory
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Additional Panels */}
          <div className="lg:col-span-4 space-y-6">
            {/* Recent Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Bell className="w-5 h-5 text-amber-600" />
                  <span>Recent Alerts</span>
                </CardTitle>
                <CardDescription>3 unread notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentAlerts />
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>System Status</span>
                </CardTitle>
                <CardDescription>All systems operational</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Network</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Database</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Backup</span>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700">Running</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Security</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Secure</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Activity className="w-5 h-5 text-purple-600" />
                  <span>Today's Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-slate-700">Surgeries</span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Stethoscope className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-700">Consultations</span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bed className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-700">Admissions</span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-slate-700">Discharges</span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">18</span>
                </div>
              </CardContent>
            </Card>

            {/* Weather & Environment */}
            <Card className="bg-white/80 backdrop-blur-sm border-cyan-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Zap className="w-5 h-5 text-cyan-600" />
                  <span>Environment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Temperature</span>
                  <span className="text-sm font-medium text-slate-800">22°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Humidity</span>
                  <span className="text-sm font-medium text-slate-800">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Air Quality</span>
                  <Badge className="bg-green-100 text-green-700">Good</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Power Usage</span>
                  <span className="text-sm font-medium text-slate-800">78%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Phone className="w-5 h-5 text-slate-600" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Phone className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Emergency</p>
                    <p className="text-xs text-slate-600">911</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Security</p>
                    <p className="text-xs text-slate-600">Ext. 2345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">IT Support</p>
                    <p className="text-xs text-slate-600">Ext. 1234</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
