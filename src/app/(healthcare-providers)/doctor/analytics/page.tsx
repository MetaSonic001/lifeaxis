"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Activity,
  RefreshCw,
  Download,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react"

// Mock data for analytics
const monthlyData = [
  { month: "Jan", patients: 45, appointments: 52, revenue: 8200 },
  { month: "Feb", patients: 52, appointments: 61, revenue: 9100 },
  { month: "Mar", patients: 48, appointments: 58, revenue: 8800 },
  { month: "Apr", patients: 61, appointments: 72, revenue: 10500 },
  { month: "May", patients: 55, appointments: 65, revenue: 9800 },
  { month: "Jun", patients: 67, appointments: 78, revenue: 11200 },
]

const patientDemographics = [
  { name: "18-30", value: 25, color: "#3b82f6" },
  { name: "31-45", value: 35, color: "#10b981" },
  { name: "46-60", value: 28, color: "#f59e0b" },
  { name: "60+", value: 12, color: "#ef4444" },
]

const appointmentTypes = [
  { name: "Consultation", value: 45, color: "#8b5cf6" },
  { name: "Follow-up", value: 30, color: "#06b6d4" },
  { name: "Emergency", value: 15, color: "#f97316" },
  { name: "Checkup", value: 10, color: "#84cc16" },
]

const weeklyTrends = [
  { day: "Mon", patients: 12, appointments: 15 },
  { day: "Tue", patients: 19, appointments: 22 },
  { day: "Wed", patients: 15, appointments: 18 },
  { day: "Thu", patients: 22, appointments: 25 },
  { day: "Fri", patients: 18, appointments: 21 },
  { day: "Sat", patients: 8, appointments: 10 },
  { day: "Sun", patients: 5, appointments: 6 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Analytics data refreshed")
    } catch (error) {
      console.error("Error refreshing data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const csvData = [
        "Month,Patients,Appointments,Revenue",
        ...monthlyData.map((d) => `${d.month},${d.patients},${d.appointments},${d.revenue}`),
      ].join("\n")

      const blob = new Blob([csvData], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "analytics-data.csv"
      a.click()
      URL.revokeObjectURL(url)

      console.log("Analytics data exported")
    } catch (error) {
      console.error("Error exporting data:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const calculateGrowth = (current: number, previous: number) => {
    return Math.round(((current - previous) / previous) * 100)
  }

  const currentMonthData = monthlyData[monthlyData.length - 1]
  const previousMonthData = monthlyData[monthlyData.length - 2]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600">Comprehensive insights into your practice performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            onClick={handleExportData}
            disabled={isExporting}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg pb-3">
            <CardTitle className="text-slate-700 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Total Patients</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-slate-700 mb-2">{currentMonthData.patients}</div>
            <div className="flex items-center space-x-2">
              <Badge
                className={
                  calculateGrowth(currentMonthData.patients, previousMonthData.patients) > 0
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                {calculateGrowth(currentMonthData.patients, previousMonthData.patients)}%
              </Badge>
              <span className="text-slate-600 text-sm">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg pb-3">
            <CardTitle className="text-slate-700 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-slate-700 mb-2">{currentMonthData.appointments}</div>
            <div className="flex items-center space-x-2">
              <Badge
                className={
                  calculateGrowth(currentMonthData.appointments, previousMonthData.appointments) > 0
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                {calculateGrowth(currentMonthData.appointments, previousMonthData.appointments)}%
              </Badge>
              <span className="text-slate-600 text-sm">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg pb-3">
            <CardTitle className="text-slate-700 flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Revenue</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-slate-700 mb-2">${currentMonthData.revenue.toLocaleString()}</div>
            <div className="flex items-center space-x-2">
              <Badge
                className={
                  calculateGrowth(currentMonthData.revenue, previousMonthData.revenue) > 0
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                {calculateGrowth(currentMonthData.revenue, previousMonthData.revenue)}%
              </Badge>
              <span className="text-slate-600 text-sm">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 rounded-t-lg pb-3">
            <CardTitle className="text-slate-700 flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Avg per Patient</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-slate-700 mb-2">
              ${Math.round(currentMonthData.revenue / currentMonthData.patients)}
            </div>
            <div className="flex items-center space-x-2">
              <Progress value={75} className="flex-1" />
              <span className="text-slate-600 text-sm">75% efficiency</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-blue-100"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-blue-100"
          >
            <LineChartIcon className="w-4 h-4 mr-2" />
            Trends
          </TabsTrigger>
          <TabsTrigger
            value="demographics"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-blue-100"
          >
            <PieChartIcon className="w-4 h-4 mr-2" />
            Demographics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Monthly Performance</CardTitle>
                <CardDescription className="text-slate-600">
                  Patient visits and revenue over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="patients" fill="#3b82f6" name="Patients" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="appointments" fill="#10b981" name="Appointments" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Revenue Trend</CardTitle>
                <CardDescription className="text-slate-600">Monthly revenue growth pattern</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Weekly Trends</CardTitle>
                <CardDescription className="text-slate-600">Patient flow throughout the week</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="patients" stroke="#8b5cf6" strokeWidth={2} name="Patients" />
                    <Line type="monotone" dataKey="appointments" stroke="#06b6d4" strokeWidth={2} name="Appointments" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Performance Metrics</CardTitle>
                <CardDescription className="text-slate-600">Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-700 font-medium">Patient Satisfaction</span>
                      <span className="text-slate-600">94%</span>
                    </div>
                    <Progress value={94} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-700 font-medium">Appointment Completion</span>
                      <span className="text-slate-600">87%</span>
                    </div>
                    <Progress value={87} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-700 font-medium">Revenue Target</span>
                      <span className="text-slate-600">76%</span>
                    </div>
                    <Progress value={76} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-700 font-medium">Patient Retention</span>
                      <span className="text-slate-600">91%</span>
                    </div>
                    <Progress value={91} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Patient Age Distribution</CardTitle>
                <CardDescription className="text-slate-600">Breakdown of patients by age group</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={patientDemographics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {patientDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Appointment Types</CardTitle>
                <CardDescription className="text-slate-600">Distribution of appointment categories</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={appointmentTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {appointmentTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mt-6">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
              <CardTitle className="text-slate-700">Detailed Demographics</CardTitle>
              <CardDescription className="text-slate-600">
                Comprehensive breakdown of patient and appointment data
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-slate-700 mb-4">Patient Age Groups</h4>
                  <div className="space-y-3">
                    {patientDemographics.map((group, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: group.color }}></div>
                          <span className="text-slate-600">{group.name} years</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-slate-700">{group.value}%</span>
                          <div className="w-16">
                            <Progress value={group.value} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-4">Appointment Categories</h4>
                  <div className="space-y-3">
                    {appointmentTypes.map((type, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type.color }}></div>
                          <span className="text-slate-600">{type.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-slate-700">{type.value}%</span>
                          <div className="w-16">
                            <Progress value={type.value} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
