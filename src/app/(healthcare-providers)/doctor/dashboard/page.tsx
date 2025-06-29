"use client"

import { HospitalOverview } from "@/components/doctor/hospital-overview"
import { RevenuePanel } from "@/components/doctor/revenue-panel"
import { MedicalRecords } from "@/components/doctor/medical-records"
import { MedicalTests } from "@/components/doctor/medical-tests"
import { PatientRequests } from "@/components/doctor/patient-requests"
import { TaskManagement } from "@/components/doctor/task-management"
import { AppointmentList } from "@/components/doctor/appointment-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download, Bell, TrendingUp, Users, Calendar, Activity } from "lucide-react"
import { useState } from "react"

interface OverviewMetric {
  title: string
  value: string | number
  subtitle: string
  bgColor: string
}

const QuickOverview = () => {
  const metrics: OverviewMetric[] = [
    {
      title: "Total Patients",
      value: "1,234",
      subtitle: "+20% from last month",
      bgColor: "bg-blue-100"
    },
    {
      title: "Appointments Today",
      value: "12",
      subtitle: "2 more than yesterday",
      bgColor: "bg-green-100"
    },
    {
      title: "Average Consultation Time",
      value: "24m",
      subtitle: "-2m from last week",
      bgColor: "bg-purple-100"
    },
    {
      title: "Revenue This Month",
      value: "$12,345",
      subtitle: "+15% from last month",
      bgColor: "bg-orange-100"
    }
  ]

  return (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-xl lg:text-2xl font-semibold text-slate-800 mb-4 lg:mb-6">
        Quick Overview
      </h2>
      
      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-4 xl:gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
            <CardHeader className={`${metric.bgColor} rounded-t-lg pb-3`}>
              <CardTitle className="text-slate-700 text-sm xl:text-base font-medium">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 xl:p-6">
              <div className="text-2xl xl:text-3xl font-bold text-slate-800 mb-2">
                {metric.value}
              </div>
              <p className="text-slate-600 text-sm xl:text-base">
                {metric.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden space-y-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-white border-0 shadow-md">
            <CardHeader className={`${metric.bgColor} rounded-t-lg pb-3`}>
              <CardTitle className="text-slate-700 text-sm sm:text-base font-medium">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-slate-800">
                  {metric.value}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm text-right">
                  {metric.subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ElementType
  gradientFrom: string
  gradientTo: string
}

const StatCard = ({ title, value, subtitle, icon: Icon, gradientFrom, gradientTo }: StatCardProps) => (
  <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
    <CardHeader className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-t-lg pb-3 lg:pb-4`}>
      <CardTitle className="text-slate-700 flex items-center gap-2 text-sm sm:text-base lg:text-lg font-medium">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
        <span className="truncate">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 sm:p-6 lg:p-8">
      <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-700 mb-2 lg:mb-3">{value}</div>
      <p className="text-slate-600 text-xs sm:text-sm lg:text-base">{subtitle}</p>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [notifications, setNotifications] = useState(5)

  const handleRefreshDashboard = async () => {
    setIsRefreshing(true)
    try {
      // Simulate API call to refresh dashboard data
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Dashboard refreshed successfully")
      // In a real app, you'd show a toast notification instead of alert
      alert("Dashboard data refreshed successfully!")
    } catch (error) {
      console.error("Error refreshing dashboard:", error)
      alert("Failed to refresh dashboard. Please try again.")
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
      a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)

      console.log("Data exported successfully")
      alert("Dashboard data exported successfully!")
    } catch (error) {
      console.error("Error exporting data:", error)
      alert("Failed to export data. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const handleClearNotifications = () => {
    setNotifications(0)
    console.log("Notifications cleared")
    alert("All notifications have been cleared!")
  }

  const statsData = [
    {
      title: "Today's Appointments",
      value: 8,
      subtitle: "2 pending confirmations",
      icon: Calendar,
      gradientFrom: "from-blue-100",
      gradientTo: "to-cyan-100"
    },
    {
      title: "Total Patients",
      value: 156,
      subtitle: "+8 this week",
      icon: Users,
      gradientFrom: "from-green-100",
      gradientTo: "to-emerald-100"
    },
    {
      title: "Active Cases",
      value: 23,
      subtitle: "3 critical",
      icon: Activity,
      gradientFrom: "from-purple-100",
      gradientTo: "to-pink-100"
    },
    {
      title: "Monthly Revenue",
      value: "$18.2K",
      subtitle: "+12% from last month",
      icon: TrendingUp,
      gradientFrom: "from-orange-100",
      gradientTo: "to-red-100"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 xl:p-12 max-w-8xl">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
                Comprehensive view of your medical practice
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3 lg:gap-4">
              <Button
                variant="outline"
                size="default"
                onClick={handleClearNotifications}
                className="relative border-slate-200 hover:bg-slate-50 bg-white/80 backdrop-blur-sm lg:px-4 lg:py-2"
                disabled={notifications === 0}
                aria-label={`${notifications} notifications`}
              >
                <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                    {notifications > 99 ? '99+' : notifications}
                  </Badge>
                )}
                <span className="sr-only">Clear notifications</span>
              </Button>
              
              <Button
                variant="outline"
                size="default"
                onClick={handleRefreshDashboard}
                disabled={isRefreshing}
                className="border-slate-200 hover:bg-slate-50 bg-white/80 backdrop-blur-sm hidden sm:flex lg:px-4 lg:py-2"
              >
                <RefreshCw className={`w-4 h-4 lg:w-5 lg:h-5 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                <span className="lg:text-base">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </Button>
              
              <Button
                size="default"
                onClick={handleExportData}
                disabled={isExporting}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg lg:px-6 lg:py-2"
              >
                <Download className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                <span className="hidden sm:inline lg:text-base">
                  {isExporting ? "Exporting..." : "Export Data"}
                </span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
          
          {/* Mobile Refresh Button */}
          <div className="mt-4 sm:hidden">
            <Button
              variant="outline"
              size="default"
              onClick={handleRefreshDashboard}
              disabled={isRefreshing}
              className="w-full border-slate-200 hover:bg-slate-50 bg-white/80 backdrop-blur-sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing Dashboard..." : "Refresh Dashboard"}
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Dashboard Components */}
        <div className="space-y-8 lg:space-y-12">
          {/* Hospital Overview */}
          <div className="grid grid-cols-1">
            <HospitalOverview />
          </div>

          {/* Quick Overview - Below Hospital Overview */}
          <div className="grid grid-cols-1">
            <QuickOverview />
          </div>

          {/* Revenue and Medical Records */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <RevenuePanel />
            <MedicalRecords />
          </div>

          {/* Medical Tests, Patient Requests, and Task Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            <MedicalTests />
            <PatientRequests />
            <TaskManagement />
          </div>

          {/* Appointment List - Full Width */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8">
            <AppointmentList />
          </div>
        </div>
      </div>
    </div>
  )
}