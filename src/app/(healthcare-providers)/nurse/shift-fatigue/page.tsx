"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Coffee,
  Brain,
  Eye,
  RefreshCw,
  Calendar,
} from "lucide-react"
import { useState, useEffect } from "react"

type FatigueMetric = {
  id: number
  nurseName: string
  nurseId: string
  shiftStart: string
  shiftEnd: string
  hoursWorked: number
  fatigueLevel: "low" | "moderate" | "high" | "critical"
  alertnessScore: number
  reactionTime: number
  errorCount: number
  breaksTaken: number
  caffeineIntake: number
  sleepQuality: "poor" | "fair" | "good" | "excellent"
  lastBreak: string
  recommendations: string[]
  status: "active" | "break" | "off-duty"
}

const mockMetrics: FatigueMetric[] = [
  {
    id: 1,
    nurseName: "Sarah Johnson",
    nurseId: "N001",
    shiftStart: "07:00",
    shiftEnd: "19:00",
    hoursWorked: 8.5,
    fatigueLevel: "moderate",
    alertnessScore: 75,
    reactionTime: 450,
    errorCount: 1,
    breaksTaken: 2,
    caffeineIntake: 2,
    sleepQuality: "fair",
    lastBreak: "2 hours ago",
    recommendations: ["Take a 15-minute break", "Consider light exercise"],
    status: "active",
  },
  {
    id: 2,
    nurseName: "Michael Brown",
    nurseId: "N002",
    shiftStart: "19:00",
    shiftEnd: "07:00",
    hoursWorked: 10.0,
    fatigueLevel: "high",
    alertnessScore: 60,
    reactionTime: 580,
    errorCount: 3,
    breaksTaken: 1,
    caffeineIntake: 4,
    sleepQuality: "poor",
    lastBreak: "4 hours ago",
    recommendations: ["Mandatory 30-minute break", "Reduce caffeine intake", "Consider shift reassignment"],
    status: "active",
  },
  {
    id: 3,
    nurseName: "Lisa Davis",
    nurseId: "N003",
    shiftStart: "07:00",
    shiftEnd: "19:00",
    hoursWorked: 6.0,
    fatigueLevel: "low",
    alertnessScore: 90,
    reactionTime: 320,
    errorCount: 0,
    breaksTaken: 3,
    caffeineIntake: 1,
    sleepQuality: "excellent",
    lastBreak: "30 minutes ago",
    recommendations: ["Maintain current routine"],
    status: "break",
  },
  {
    id: 4,
    nurseName: "Tom Wilson",
    nurseId: "N004",
    shiftStart: "23:00",
    shiftEnd: "07:00",
    hoursWorked: 7.5,
    fatigueLevel: "critical",
    alertnessScore: 45,
    reactionTime: 720,
    errorCount: 5,
    breaksTaken: 0,
    caffeineIntake: 6,
    sleepQuality: "poor",
    lastBreak: "Never",
    recommendations: ["Immediate break required", "Consider ending shift early", "Medical evaluation recommended"],
    status: "active",
  },
]

export default function ShiftFatigueMonitor() {
  const [metrics, setMetrics] = useState<FatigueMetric[]>(mockMetrics)
  const [selectedNurse, setSelectedNurse] = useState<FatigueMetric | null>(null)
  const [filter, setFilter] = useState<"all" | "low" | "moderate" | "high" | "critical">("all")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate real-time updates
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          hoursWorked: metric.hoursWorked + 0.1,
          alertnessScore: Math.max(30, metric.alertnessScore + (Math.random() - 0.5) * 5),
          reactionTime: Math.max(250, metric.reactionTime + (Math.random() - 0.5) * 20),
        })),
      )
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleTakeBreak = (id: number) => {
    setMetrics((prev) =>
      prev.map((metric) =>
        metric.id === id
          ? {
              ...metric,
              status: "break" as const,
              lastBreak: "Just now",
              breaksTaken: metric.breaksTaken + 1,
              alertnessScore: Math.min(100, metric.alertnessScore + 10),
            }
          : metric,
      ),
    )
    alert("Break started successfully!")
  }

  const handleEndShift = (id: number) => {
    setMetrics((prev) => prev.map((metric) => (metric.id === id ? { ...metric, status: "off-duty" as const } : metric)))
    alert("Shift ended successfully!")
  }

  const getFatigueColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "break":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "off-duty":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSleepQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-amber-100 text-amber-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertnessTrend = (score: number) => {
    if (score >= 80) return { icon: TrendingUp, color: "text-green-600" }
    if (score >= 60) return { icon: Activity, color: "text-amber-600" }
    return { icon: TrendingDown, color: "text-red-600" }
  }

  const filteredMetrics = metrics.filter((metric) => filter === "all" || metric.fatigueLevel === filter)
  const activeNurses = metrics.filter((m) => m.status === "active").length
  const onBreakNurses = metrics.filter((m) => m.status === "break").length
  const criticalFatigue = metrics.filter((m) => m.fatigueLevel === "critical").length
  const avgAlertnessScore = metrics.reduce((sum, m) => sum + m.alertnessScore, 0) / metrics.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Shift Fatigue Monitoring System</h1>
            <p className="text-indigo-100">AI-powered fatigue detection and wellness tracking</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-indigo-200">Current Time</p>
              <p className="text-lg font-semibold">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white text-indigo-600 hover:bg-indigo-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Active Nurses</p>
                <p className="text-2xl font-bold text-blue-800">{activeNurses}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">On Break</p>
                <p className="text-2xl font-bold text-purple-800">{onBreakNurses}</p>
              </div>
              <Coffee className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Critical Fatigue</p>
                <p className="text-2xl font-bold text-red-800">{criticalFatigue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Avg Alertness</p>
                <p className="text-2xl font-bold text-green-800">{avgAlertnessScore.toFixed(0)}%</p>
              </div>
              <Brain className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Nurse Fatigue Levels</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="low">Low Fatigue</option>
            <option value="moderate">Moderate Fatigue</option>
            <option value="high">High Fatigue</option>
            <option value="critical">Critical Fatigue</option>
          </select>
        </div>
      </div>

      {/* Nurse Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMetrics.map((nurse) => {
          const AlertnessTrend = getAlertnessTrend(nurse.alertnessScore)
          return (
            <Card
              key={nurse.id}
              className={`shadow-lg border-l-4 transition-all duration-300 hover:shadow-xl ${
                nurse.fatigueLevel === "critical"
                  ? "border-l-red-500 bg-red-50/30"
                  : nurse.fatigueLevel === "high"
                    ? "border-l-orange-500 bg-orange-50/30"
                    : nurse.fatigueLevel === "moderate"
                      ? "border-l-amber-500 bg-amber-50/30"
                      : "border-l-green-500 bg-white"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl font-bold text-slate-800">{nurse.nurseName}</CardTitle>
                      <Badge className={`${getStatusColor(nurse.status)} border`}>{nurse.status.toUpperCase()}</Badge>
                      {nurse.fatigueLevel === "critical" && (
                        <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                      <span>ID: {nurse.nurseId}</span>
                      <span>
                        Shift: {nurse.shiftStart} - {nurse.shiftEnd}
                      </span>
                      <span>Hours: {nurse.hoursWorked.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className={`${getFatigueColor(nurse.fatigueLevel)} border text-xs`}>
                        {nurse.fatigueLevel.toUpperCase()} FATIGUE
                      </Badge>
                      <Badge className={`${getSleepQualityColor(nurse.sleepQuality)} text-xs`}>
                        {nurse.sleepQuality.toUpperCase()} SLEEP
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Alertness Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">Alertness Score</span>
                      <AlertnessTrend.icon className={`h-4 w-4 ${AlertnessTrend.color}`} />
                    </div>
                    <span className="text-lg font-bold text-slate-800">{nurse.alertnessScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        nurse.alertnessScore >= 80
                          ? "bg-green-500"
                          : nurse.alertnessScore >= 60
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${nurse.alertnessScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Reaction Time</span>
                    </div>
                    <p className="text-lg font-bold text-blue-800">{nurse.reactionTime}ms</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-xs font-medium text-red-700">Errors</span>
                    </div>
                    <p className="text-lg font-bold text-red-800">{nurse.errorCount}</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Coffee className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-700">Caffeine</span>
                    </div>
                    <p className="text-lg font-bold text-purple-800">{nurse.caffeineIntake} cups</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Breaks</span>
                    </div>
                    <p className="text-lg font-bold text-green-800">{nurse.breaksTaken}</p>
                  </div>
                </div>

                {/* Recommendations */}
                {nurse.recommendations.length > 0 && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-700">Recommendations</span>
                    </div>
                    <ul className="space-y-1">
                      {nurse.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-amber-600">
                          • {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500">Last break: {nurse.lastBreak}</p>
                  <div className="flex space-x-2">
                    {nurse.status === "active" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleTakeBreak(nurse.id)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Coffee className="h-4 w-4 mr-1" />
                          Break
                        </Button>
                        {nurse.fatigueLevel === "critical" && (
                          <Button
                            size="sm"
                            onClick={() => handleEndShift(nurse.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            End Shift
                          </Button>
                        )}
                      </>
                    )}
                    <Button size="sm" variant="outline" onClick={() => setSelectedNurse(nurse)}>
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Nurse Detail Modal */}
      {selectedNurse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-3xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Fatigue Analysis: {selectedNurse.nurseName}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedNurse(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Nurse ID</p>
                    <p className="text-lg text-slate-800">{selectedNurse.nurseId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Shift Duration</p>
                    <p className="text-lg text-slate-800">
                      {selectedNurse.shiftStart} - {selectedNurse.shiftEnd}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Hours Worked</p>
                    <p className="text-lg text-slate-800">{selectedNurse.hoursWorked.toFixed(1)} hours</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Fatigue Level</p>
                    <Badge className={`${getFatigueColor(selectedNurse.fatigueLevel)} border mt-1`}>
                      {selectedNurse.fatigueLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Status</p>
                    <Badge className={`${getStatusColor(selectedNurse.status)} border mt-1`}>
                      {selectedNurse.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Sleep Quality</p>
                    <Badge className={`${getSleepQualityColor(selectedNurse.sleepQuality)} mt-1`}>
                      {selectedNurse.sleepQuality.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-700">Alertness</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-800">{selectedNurse.alertnessScore}%</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-purple-700">Reaction Time</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-800">{selectedNurse.reactionTime}ms</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-700">Error Count</span>
                      </div>
                      <p className="text-2xl font-bold text-red-800">{selectedNurse.errorCount}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Coffee className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-700">Breaks Taken</span>
                      </div>
                      <p className="text-2xl font-bold text-green-800">{selectedNurse.breaksTaken}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Recommendations</h3>
                  <div className="space-y-2">
                    {selectedNurse.recommendations.map((rec, index) => (
                      <div key={index} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-amber-700">• {rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => alert(`Sending wellness report for ${selectedNurse.nurseName}`)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => alert(`Scheduling wellness check for ${selectedNurse.nurseName}`)}
                  >
                    Schedule Check-in
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
