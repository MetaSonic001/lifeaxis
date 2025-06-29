"use client"
import { PatientProfile } from "@/components/doctor/patient-profile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { CalendarDays, Users, Activity, TrendingUp, RefreshCw, Download, Plus, Bell } from "lucide-react"
import { useState } from "react"

const patientPriorityData = [
  { name: "Critical", value: 5, color: "#f87171" },
  { name: "Chronic", value: 15, color: "#fbbf24" },
  { name: "Regular", value: 80, color: "#60a5fa" },
]

export default function DoctorMainPage() {
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [notifications, setNotifications] = useState(3)

  const handleRefreshDashboard = async () => {
    setIsRefreshing(true)
    try {
      // Simulate API call to refresh dashboard data
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh dashboard. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      // Simulate data export
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Create and download CSV
      const csvData = "Date,Patients,Appointments,Revenue\n2024-01-01,45,38,5200\n2024-01-02,52,41,6100"
      const blob = new Blob([csvData], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "dashboard-data.csv"
      a.click()
      URL.revokeObjectURL(url)

      toast({
        title: "Export Complete",
        description: "Dashboard data has been exported successfully.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleQuickAction = (action: string) => {
    toast({
      title: "Quick Action",
      description: `${action} feature will be available soon.`,
    })
    // Add specific functionality for each quick action
    switch (action) {
      case "new-appointment":
        // Navigate to appointment creation
        break
      case "view-patients":
        // Navigate to patients page
        break
      case "emergency":
        // Handle emergency protocol
        break
      default:
        break
    }
  }

  const handleClearNotifications = () => {
    setNotifications(0)
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared.",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Doctor Dashboard
          </h1>
          <p className="text-slate-600">Welcome back! Here's your practice overview</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleClearNotifications}
            className="relative border-slate-200 hover:bg-slate-50 bg-transparent"
            disabled={notifications === 0}
          >
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                {notifications}
              </Badge>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleRefreshDashboard}
            disabled={isRefreshing}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            onClick={handleExportData}
            disabled={isExporting}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : "Export Data"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-purple-100"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="quick-actions"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-purple-100"
          >
            Quick Actions
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-purple-100"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg pb-3">
                <CardTitle className="text-slate-700 flex items-center space-x-2">
                  <CalendarDays className="w-5 h-5" />
                  <span>Today's Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-slate-700 mb-2">12</div>
                <p className="text-slate-600 text-sm">3 pending confirmations</p>
                <Progress value={75} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg pb-3">
                <CardTitle className="text-slate-700 flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Active Patients</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-slate-700 mb-2">248</div>
                <p className="text-slate-600 text-sm">+12 this week</p>
                <Progress value={85} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg pb-3">
                <CardTitle className="text-slate-700 flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Health Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-slate-700 mb-2">94%</div>
                <p className="text-slate-600 text-sm">Patient satisfaction</p>
                <Progress value={94} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 rounded-t-lg pb-3">
                <CardTitle className="text-slate-700 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Monthly Revenue</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-slate-700 mb-2">$24.5K</div>
                <p className="text-slate-600 text-sm">+8% from last month</p>
                <Progress value={68} className="mt-3" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quick-actions">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Patient Management</CardTitle>
                <CardDescription className="text-slate-600">Quick patient actions</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button
                  onClick={() => handleQuickAction("new-appointment")}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Appointment
                </Button>
                <Button
                  onClick={() => handleQuickAction("view-patients")}
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Users className="w-4 h-4 mr-2" />
                  View All Patients
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Medical Records</CardTitle>
                <CardDescription className="text-slate-600">Access patient records</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button
                  onClick={() => handleQuickAction("recent-records")}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  Recent Records
                </Button>
                <Button
                  onClick={() => handleQuickAction("search-records")}
                  variant="outline"
                  className="w-full border-green-200 text-green-600 hover:bg-green-50"
                >
                  Search Records
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Emergency</CardTitle>
                <CardDescription className="text-slate-600">Emergency protocols</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button
                  onClick={() => handleQuickAction("emergency")}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                >
                  Emergency Protocol
                </Button>
                <Button
                  onClick={() => handleQuickAction("urgent-care")}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  Urgent Care
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
              <CardTitle className="text-slate-700">Practice Analytics</CardTitle>
              <CardDescription className="text-slate-600">Detailed insights into your practice</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700">Patient Demographics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Age 18-30</span>
                      <span className="font-medium text-slate-700">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Age 31-50</span>
                      <span className="font-medium text-slate-700">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Age 51+</span>
                      <span className="font-medium text-slate-700">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700">Appointment Types</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Consultation</span>
                      <span className="font-medium text-slate-700">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Follow-up</span>
                      <span className="font-medium text-slate-700">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Emergency</span>
                      <span className="font-medium text-slate-700">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedPatient && <PatientProfile patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </div>
  )
}
