"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Users,
  AlertTriangle,
  Clock,
  TrendingUp,
  Heart,
  Droplet,
  Calendar,
  Pill,
  Phone,
  Package,
  Clipboard,
  Thermometer,
  Monitor,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NurseDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    criticalPatients: 0,
    medicationAlerts: 0,
    completedTasks: 0,
    avgHeartRate: 0,
    avgBloodPressure: "0/0",
    lowInventoryItems: 0,
    upcomingRounds: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching with animation
    const timer = setTimeout(() => {
      setStats({
        totalPatients: 32,
        criticalPatients: 4,
        medicationAlerts: 7,
        completedTasks: 18,
        avgHeartRate: 74,
        avgBloodPressure: "118/76",
        lowInventoryItems: 3,
        upcomingRounds: 5,
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const quickActions = [
    {
      name: "Patient Monitoring",
      href: "/nurse/patient-monitoring",
      icon: Activity,
      description: "Real-time vital signs",
      color: "from-emerald-400 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
    },
    {
      name: "Medication Assistant",
      href: "/nurse/medication-assistant",
      icon: Pill,
      description: "Barcode verification",
      color: "from-violet-400 to-violet-600",
      bgColor: "from-violet-50 to-violet-100",
    },
    {
      name: "IV Fluid Monitor",
      href: "/nurse/iv-fluid",
      icon: Droplet,
      description: "Fluid level tracking",
      color: "from-cyan-400 to-cyan-600",
      bgColor: "from-cyan-50 to-cyan-100",
    },
    {
      name: "Rapid Response",
      href: "/nurse/rapid-response",
      icon: AlertTriangle,
      description: "Emergency alerts",
      color: "from-red-400 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      name: "Workflow Optimizer",
      href: "/nurse/workflow-optimizer",
      icon: Calendar,
      description: "Task prioritization",
      color: "from-indigo-400 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
    },
    {
      name: "Teleconsultation",
      href: "/nurse/teleconsultation",
      icon: Phone,
      description: "Remote consultations",
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      name: "Inventory Tracking",
      href: "/nurse/inventory-tracking",
      icon: Package,
      description: "Supply management",
      color: "from-amber-400 to-amber-600",
      bgColor: "from-amber-50 to-amber-100",
    },
    {
      name: "Wound Care Monitor",
      href: "/nurse/wound-care",
      icon: Thermometer,
      description: "Wound healing progress",
      color: "from-rose-400 to-rose-600",
      bgColor: "from-rose-50 to-rose-100",
    },
    {
      name: "Rounding Assistants",
      href: "/nurse/rounding-assistant",
      icon: Clipboard,
      description: "Patient rounds",
      color: "from-teal-400 to-teal-600",
      bgColor: "from-teal-50 to-teal-100",
    },
  ]

  const recentAlerts = [
    { id: 1, patient: "John Doe", room: "101A", message: "Heart rate elevated", time: "2 min ago", severity: "high" },
    { id: 2, patient: "Jane Smith", room: "102B", message: "Medication due", time: "5 min ago", severity: "medium" },
    { id: 3, patient: "Bob Johnson", room: "103C", message: "IV fluid low", time: "8 min ago", severity: "medium" },
    { id: 4, patient: "Alice Brown", room: "104A", message: "Vital signs stable", time: "12 min ago", severity: "low" },
  ]

  const handleAlertClick = (alertItem: (typeof recentAlerts)[0]) => {
    window.alert(`Alert for ${alertItem.patient} in room ${alertItem.room}: ${alertItem.message}`)
  }

  const handleRefreshData = () => {
    setLoading(true)
    setTimeout(() => {
      setStats((prev) => ({
        ...prev,
        totalPatients: prev.totalPatients + Math.floor(Math.random() * 3) - 1,
        criticalPatients: Math.max(0, prev.criticalPatients + Math.floor(Math.random() * 3) - 1),
        medicationAlerts: Math.max(0, prev.medicationAlerts + Math.floor(Math.random() * 3) - 1),
        completedTasks: prev.completedTasks + Math.floor(Math.random() * 5),
      }))
      setLoading(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white animate-pulse">
          <div className="h-8 bg-white/20 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Nuvia!</h1>
            <p className="text-blue-100 text-lg">
              You have {stats.criticalPatients} critical patients requiring attention today.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleRefreshData}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              Refresh Data
            </Button>
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Activity className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Patients</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">{stats.totalPatients}</div>
            <p className="text-xs text-blue-600 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Critical Patients</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-800">{stats.criticalPatients}</div>
            <p className="text-xs text-red-600 mt-1">Immediate attention required</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Medication Alerts</CardTitle>
            <Pill className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-800">{stats.medicationAlerts}</div>
            <p className="text-xs text-amber-600 mt-1">Due within 2 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Tasks Completed</CardTitle>
            <Clock className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800">{stats.completedTasks}</div>
            <p className="text-xs text-green-600 mt-1">Out of 24 total tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.name} href={action.href}>
              <div
                className={`p-6 rounded-xl bg-gradient-to-br ${action.bgColor} border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} shadow-lg`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-slate-900">{action.name}</h3>
                <p className="text-sm text-slate-600">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Vital Signs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="bg-white shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span>Recent Alerts</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert("View all alerts functionality would be implemented here")}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => handleAlertClick(alert)}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        alert.severity === "high"
                          ? "bg-red-500"
                          : alert.severity === "medium"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium text-slate-800">{alert.patient}</p>
                      <p className="text-sm text-slate-600">{alert.message}</p>
                      <p className="text-xs text-slate-500">Room {alert.room}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs Overview */}
        <Card className="bg-white shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Average Vital Signs</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert("Detailed vital signs report would be shown here")}
              >
                View Details
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-rose-50 border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-700">Heart Rate</span>
                </div>
                <p className="text-2xl font-bold text-red-800">{stats.avgHeartRate} bpm</p>
                <p className="text-xs text-red-600 mt-1">Normal range</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Blood Pressure</span>
                </div>
                <p className="text-2xl font-bold text-blue-800">{stats.avgBloodPressure}</p>
                <p className="text-xs text-blue-600 mt-1">mmHg</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplet className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Hydration</span>
                </div>
                <p className="text-2xl font-bold text-green-800">Good</p>
                <p className="text-xs text-green-600 mt-1">Overall status</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Monitor className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Monitoring</span>
                </div>
                <p className="text-2xl font-bold text-purple-800">24/7</p>
                <p className="text-xs text-purple-600 mt-1">Active patients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
