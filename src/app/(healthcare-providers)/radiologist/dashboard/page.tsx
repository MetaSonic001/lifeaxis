"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ImageIcon, AlertCircle, Clock, Search, TrendingUp, Users, Calendar, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RadiologistDashboard() {
  const [stats, setStats] = useState({
    pendingScans: 0,
    criticalFindings: 0,
    averageReportTime: 0,
    totalPatients: 0,
    completedToday: 0,
    weeklyGrowth: 0,
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, patient: "John Doe", type: "X-ray", status: "Completed", time: "2 hours ago" },
    { id: 2, patient: "Jane Smith", type: "MRI", status: "In Progress", time: "4 hours ago" },
    { id: 3, patient: "Mike Brown", type: "CT Scan", status: "Pending", time: "6 hours ago" },
  ])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats({
        pendingScans: 15,
        criticalFindings: 2,
        averageReportTime: 45,
        totalPatients: 1247,
        completedToday: 8,
        weeklyGrowth: 12,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "emergency":
        alert(
          "🚨 Emergency Cases Dashboard\n\nShowing 2 critical cases requiring immediate attention:\n• Patient A: Possible stroke\n• Patient B: Trauma case",
        )
        break
      case "schedule":
        alert(
          "📅 Today's Schedule\n\n9:00 AM - CT Review Session\n11:00 AM - MRI Analysis\n2:00 PM - Team Meeting\n4:00 PM - Emergency Consultations",
        )
        break
      case "view-all":
        alert("📋 All Activity\n\nRedirecting to comprehensive activity log...")
        break
      default:
        console.log(`Quick action: ${action}`)
    }
  }

  const features = [
    {
      name: "AI Imaging Analysis",
      icon: Search,
      href: "/radiologist/ai-imaging-analysis",
      description: "AI-powered image analysis",
      color: "bg-pastel-blue",
      count: "12 pending",
    },
    {
      name: "Image Archive",
      icon: ImageIcon,
      href: "/radiologist/image-archive",
      description: "Browse medical images",
      color: "bg-pastel-green",
      count: "1,247 images",
    },
    {
      name: "Automated Prioritization",
      icon: AlertCircle,
      href: "/radiologist/auto-prioritization",
      description: "Smart case prioritization",
      color: "bg-pastel-orange",
      count: "5 urgent",
    },
    {
      name: "Medical Imaging",
      icon: TrendingUp,
      href: "/radiologist/medical-imaging",
      description: "Upload and analyze images",
      color: "bg-pastel-purple",
      count: "Ready to use",
    },
  ]

  const handleActivityAction = (activityId: number, action: string) => {
    const activity = recentActivity.find((a) => a.id === activityId)
    if (!activity) return

    switch (action) {
      case "view":
        alert(
          `👁️ View Case\n\nOpening case details for:\n• Patient: ${activity.patient}\n• Type: ${activity.type}\n• Status: ${activity.status}\n• Time: ${activity.time}`,
        )
        break
      case "continue":
        if (activity.status === "In Progress") {
          alert(`▶️ Continue Analysis\n\nResuming analysis for ${activity.patient}\nOpening imaging workstation...`)
        }
        break
      case "complete":
        if (activity.status === "Pending") {
          setRecentActivity((prev) => prev.map((a) => (a.id === activityId ? { ...a, status: "Completed" } : a)))
          alert(`✅ Case Completed\n\nMarked ${activity.patient}'s ${activity.type} as completed!`)
        }
        break
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">Radiologist Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back, Dr. Sarah Johnson</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => handleQuickAction("emergency")}
            variant="outline"
            className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Emergency Cases
          </Button>
          <Button onClick={() => handleQuickAction("schedule")} className="bg-blue-600 hover:bg-blue-700">
            <Calendar className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card className="border-l-4 border-l-blue-400 shadow-sm hover:shadow-md transition-shadow col-span-1 sm:col-span-2 xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Pending Scans</CardTitle>
            <div className="p-2 bg-pastel-blue rounded-lg">
              <ImageIcon className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-800">{stats.pendingScans}</div>
            <p className="text-xs text-slate-600 mt-1">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-400 shadow-sm hover:shadow-md transition-shadow col-span-1 sm:col-span-2 xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Critical Findings</CardTitle>
            <div className="p-2 bg-pastel-pink rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-800">{stats.criticalFindings}</div>
            <p className="text-xs text-slate-600 mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-400 shadow-sm hover:shadow-md transition-shadow col-span-1 sm:col-span-2 xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Avg. Report Time</CardTitle>
            <div className="p-2 bg-pastel-green rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-slate-800">{stats.averageReportTime} min</div>
            <p className="text-xs text-slate-600 mt-1">-5 min from last week</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.totalPatients}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Completed Today</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.completedToday}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Weekly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">+{stats.weeklyGrowth}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Access - Takes 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Quick Access</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            {features.map((feature) => (
              <Link key={feature.name} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 ${feature.color} rounded-xl group-hover:scale-110 transition-transform`}>
                        <feature.icon className="h-6 w-6 text-slate-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg text-slate-800 truncate">{feature.name}</CardTitle>
                        <CardDescription className="text-slate-600 text-sm">{feature.description}</CardDescription>
                        <p className="text-xs text-slate-500 mt-1">{feature.count}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity - Takes 1 column on large screens */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Recent Activity</h2>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">Latest Cases</CardTitle>
              <CardDescription>Your recent imaging cases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{activity.patient}</p>
                    <p className="text-sm text-slate-600">{activity.type}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                  <div className="ml-3 flex flex-col gap-1">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : activity.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs bg-transparent"
                        onClick={() => handleActivityAction(activity.id, "view")}
                      >
                        View
                      </Button>
                      {activity.status === "In Progress" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs bg-blue-50"
                          onClick={() => handleActivityAction(activity.id, "continue")}
                        >
                          Continue
                        </Button>
                      )}
                      {activity.status === "Pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs bg-green-50"
                          onClick={() => handleActivityAction(activity.id, "complete")}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent"
                onClick={() => handleQuickAction("view-all")}
              >
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
