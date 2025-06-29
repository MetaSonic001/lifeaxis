"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Clock, ImageIcon, Play, Pause, RefreshCw, Settings, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

type ImagingStudy = {
  id: number
  patientName: string
  patientId: string
  studyType: string
  bodyPart: string
  urgency: "Low" | "Medium" | "High"
  aiFindings: string
  timestamp: string
  estimatedTime: number
  priority: number
}

export default function AutomatedImagingPrioritization() {
  const [studies, setStudies] = useState<ImagingStudy[]>([])
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Initial dummy data
  const initialStudies: ImagingStudy[] = [
    {
      id: 1,
      patientName: "Emergency Patient A",
      patientId: "E001",
      studyType: "CT Scan",
      bodyPart: "Head",
      urgency: "High",
      aiFindings: "Possible intracranial hemorrhage detected",
      timestamp: new Date(Date.now() - 300000).toLocaleString(),
      estimatedTime: 5,
      priority: 1,
    },
    {
      id: 2,
      patientName: "John Smith",
      patientId: "P123",
      studyType: "X-ray",
      bodyPart: "Chest",
      urgency: "Medium",
      aiFindings: "Possible pneumonia in right lower lobe",
      timestamp: new Date(Date.now() - 600000).toLocaleString(),
      estimatedTime: 15,
      priority: 2,
    },
    {
      id: 3,
      patientName: "Mary Johnson",
      patientId: "P456",
      studyType: "MRI",
      bodyPart: "Spine",
      urgency: "Low",
      aiFindings: "Mild degenerative changes, routine follow-up",
      timestamp: new Date(Date.now() - 900000).toLocaleString(),
      estimatedTime: 30,
      priority: 3,
    },
  ]

  useEffect(() => {
    // Load initial data
    setStudies(initialStudies)
  }, [])

  useEffect(() => {
    if (!isAutoRefresh) return

    // Simulating incoming imaging studies
    const studyTypes = ["X-ray", "MRI", "CT Scan", "Ultrasound", "Mammography"]
    const bodyParts = ["Chest", "Head", "Abdomen", "Spine", "Pelvis", "Extremities"]
    const urgencyLevels: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"]
    const findings = [
      "Potential abnormality detected",
      "Normal findings within limits",
      "Requires immediate attention",
      "Follow-up recommended",
      "Suspicious lesion identified",
      "Possible fracture detected",
      "Inflammation present",
      "Mass lesion requires evaluation",
    ]

    const interval = setInterval(() => {
      const urgency = urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)]
      const newStudy: ImagingStudy = {
        id: Date.now(),
        patientName: `Patient ${Math.floor(Math.random() * 1000)}`,
        patientId: `P${Math.floor(Math.random() * 9999)
          .toString()
          .padStart(4, "0")}`,
        studyType: studyTypes[Math.floor(Math.random() * studyTypes.length)],
        bodyPart: bodyParts[Math.floor(Math.random() * bodyParts.length)],
        urgency: urgency,
        aiFindings: findings[Math.floor(Math.random() * findings.length)],
        timestamp: new Date().toLocaleString(),
        estimatedTime:
          urgency === "High"
            ? Math.floor(Math.random() * 10) + 5
            : urgency === "Medium"
              ? Math.floor(Math.random() * 20) + 10
              : Math.floor(Math.random() * 40) + 20,
        priority: urgency === "High" ? 1 : urgency === "Medium" ? 2 : 3,
      }

      setStudies((prevStudies) =>
        [...prevStudies, newStudy].sort((a, b) => {
          const urgencyOrder = { High: 0, Medium: 1, Low: 2 }
          return urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
        }),
      )
    }, 15000) // New study every 15 seconds

    return () => clearInterval(interval)
  }, [isAutoRefresh])

  const handleReviewStudy = (id: number) => {
    const study = studies.find((s) => s.id === id)
    if (
      study &&
      confirm(
        `📋 Review Study\n\nPatient: ${study.patientName}\nStudy: ${study.studyType} of ${study.bodyPart}\nUrgency: ${study.urgency}\n\nMark this study as reviewed?`,
      )
    ) {
      setStudies((prevStudies) => prevStudies.filter((study) => study.id !== id))
      alert("✅ Study marked as reviewed and moved to completed queue!")
    }
  }

  const handleRefreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert(
        "🔄 Data Refreshed\n\nUpdated prioritization queue with latest AI analysis results and new incoming studies.",
      )
    }, 1000)
  }

  const handleConfigureSettings = () => {
    alert(
      "⚙️ Prioritization Settings\n\nConfiguration options:\n• AI confidence thresholds\n• Urgency level criteria\n• Auto-refresh intervals\n• Notification preferences\n• Priority scoring weights",
    )
  }

  const handleViewStudyDetails = (study: ImagingStudy) => {
    alert(
      `📋 Study Details\n\nPatient: ${study.patientName} (${study.patientId})\nStudy Type: ${study.studyType}\nBody Part: ${study.bodyPart}\nUrgency: ${study.urgency} Priority\nAI Findings: ${study.aiFindings}\nEstimated Time: ${study.estimatedTime} minutes\nReceived: ${study.timestamp}`,
    )
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "border-l-red-500 bg-gradient-to-r from-red-50 to-white"
      case "Medium":
        return "border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white"
      case "Low":
        return "border-l-green-500 bg-gradient-to-r from-green-50 to-white"
      default:
        return "border-l-gray-500 bg-white"
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Priority</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Priority</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Priority</Badge>
      default:
        return <Badge variant="secondary">{urgency} Priority</Badge>
    }
  }

  const stats = {
    high: studies.filter((s) => s.urgency === "High").length,
    medium: studies.filter((s) => s.urgency === "Medium").length,
    low: studies.filter((s) => s.urgency === "Low").length,
    total: studies.length,
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
            Automated Imaging Prioritization
          </h1>
          <p className="text-slate-600 mt-2">AI-powered case prioritization system</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch checked={isAutoRefresh} onCheckedChange={setIsAutoRefresh} id="auto-refresh" />
            <label htmlFor="auto-refresh" className="text-sm font-medium text-slate-700">
              Auto-refresh
            </label>
            {isAutoRefresh ? <Play className="h-4 w-4 text-green-600" /> : <Pause className="h-4 w-4 text-slate-400" />}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleConfigureSettings}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <Card className="bg-gradient-to-r from-pastel-red to-white border-l-4 border-l-red-400">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">High Priority</p>
                <p className="text-2xl font-bold text-slate-800">{stats.high}</p>
              </div>
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pastel-yellow to-white border-l-4 border-l-yellow-400">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Medium Priority</p>
                <p className="text-2xl font-bold text-slate-800">{stats.medium}</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pastel-green to-white border-l-4 border-l-green-400">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Low Priority</p>
                <p className="text-2xl font-bold text-slate-800">{stats.low}</p>
              </div>
              <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pastel-blue to-white border-l-4 border-l-blue-400">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Cases</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
              <Filter className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Studies List */}
      <div className="space-y-4">
        {studies.map((study) => (
          <Card
            key={study.id}
            className={`border-l-4 shadow-sm hover:shadow-md transition-shadow ${getUrgencyColor(study.urgency)}`}
          >
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-slate-800 truncate">{study.patientName}</CardTitle>
                  <CardDescription className="text-slate-600">
                    ID: {study.patientId} • {study.studyType} of {study.bodyPart}
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  {getUrgencyBadge(study.urgency)}
                  <Badge variant="outline" className="text-xs">
                    ETA: {study.estimatedTime} min
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <ImageIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800">AI Findings</p>
                    <p className="text-slate-600 text-sm">{study.aiFindings}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t gap-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Clock className="h-4 w-4" />
                    <span>Received: {study.timestamp}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewStudyDetails(study)}>
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleReviewStudy(study.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      Review Study
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {studies.length === 0 && (
        <Card className="bg-gradient-to-r from-pastel-green to-white">
          <CardContent className="text-center py-8 sm:py-12">
            <ImageIcon className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No pending studies</h3>
            <p className="text-slate-600">Great job! All cases have been reviewed.</p>
            {!isAutoRefresh && (
              <p className="text-sm text-slate-500 mt-2">Enable auto-refresh to see new incoming studies.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
