"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  Phone,
  Clock,
  User,
  MapPin,
  Activity,
  Heart,
  Zap,
  CheckCircle2,
  Timer,
  Users,
  Siren,
} from "lucide-react"
import { useState, useEffect } from "react"

type EmergencyAlert = {
  id: number
  patientName: string
  patientId: string
  room: string
  alertType: "cardiac-arrest" | "respiratory-distress" | "stroke" | "trauma" | "sepsis" | "other"
  severity: "critical" | "urgent" | "high"
  description: string
  reportedBy: string
  timestamp: string
  status: "active" | "responding" | "resolved" | "cancelled"
  responseTime?: number
  assignedTeam?: string[]
  vitals?: {
    heartRate?: number
    bloodPressure?: string
    oxygenSat?: number
    temperature?: number
  }
}

const mockAlerts: EmergencyAlert[] = [
  {
    id: 1,
    patientName: "John Doe",
    patientId: "P001",
    room: "ICU-101",
    alertType: "cardiac-arrest",
    severity: "critical",
    description: "Patient unresponsive, no pulse detected",
    reportedBy: "Nurse Sarah Johnson",
    timestamp: "2 min ago",
    status: "active",
    vitals: {
      heartRate: 0,
      bloodPressure: "0/0",
      oxygenSat: 85,
    },
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientId: "P002",
    room: "ER-205",
    alertType: "respiratory-distress",
    severity: "urgent",
    description: "Severe breathing difficulty, oxygen saturation dropping",
    reportedBy: "Dr. Michael Brown",
    timestamp: "5 min ago",
    status: "responding",
    responseTime: 3,
    assignedTeam: ["Dr. Wilson", "Nurse Kate", "RT Johnson"],
    vitals: {
      heartRate: 120,
      bloodPressure: "160/95",
      oxygenSat: 88,
      temperature: 101.2,
    },
  },
  {
    id: 3,
    patientName: "Bob Johnson",
    patientId: "P003",
    room: "Ward-301",
    alertType: "stroke",
    severity: "critical",
    description: "Sudden onset facial drooping, speech difficulty",
    reportedBy: "Nurse Lisa Davis",
    timestamp: "8 min ago",
    status: "resolved",
    responseTime: 4,
    assignedTeam: ["Dr. Smith", "Nurse Tom", "Neuro Team"],
  },
]

export default function RapidResponse() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(mockAlerts)
  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null)
  const [showNewAlert, setShowNewAlert] = useState(false)
  const [filter, setFilter] = useState<"all" | "active" | "responding" | "resolved">("all")

  const [newAlert, setNewAlert] = useState({
    patientName: "",
    patientId: "",
    room: "",
    alertType: "other" as EmergencyAlert["alertType"],
    severity: "urgent" as EmergencyAlert["severity"],
    description: "",
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prev) =>
        prev.map((alert) => {
          if (alert.status === "active" && Math.random() > 0.8) {
            return { ...alert, status: "responding" as const, responseTime: Math.floor(Math.random() * 5) + 1 }
          }
          return alert
        }),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault()
    const alert: EmergencyAlert = {
      id: alerts.length + 1,
      ...newAlert,
      reportedBy: "Current User",
      timestamp: "Just now",
      status: "active",
    }
    setAlerts([alert, ...alerts])
    setNewAlert({
      patientName: "",
      patientId: "",
      room: "",
      alertType: "other",
      severity: "urgent",
      description: "",
    })
    setShowNewAlert(false)
    alert("Emergency alert created successfully!")
  }

  const handleUpdateStatus = (id: number, status: EmergencyAlert["status"]) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status,
              responseTime: status === "responding" ? Math.floor(Math.random() * 5) + 1 : alert.responseTime,
            }
          : alert,
      ),
    )
  }

  const handleAssignTeam = (id: number) => {
    const teamMembers = ["Dr. Wilson", "Nurse Kate", "RT Johnson", "Pharmacist Lee"]
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, assignedTeam: teamMembers } : alert)))
    alert("Response team assigned successfully!")
  }

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "cardiac-arrest":
        return "bg-red-100 text-red-800 border-red-200"
      case "respiratory-distress":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "stroke":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "trauma":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "sepsis":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "urgent":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "high":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800 border-red-200"
      case "responding":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredAlerts = alerts.filter((alert) => filter === "all" || alert.status === filter)
  const activeAlerts = alerts.filter((alert) => alert.status === "active").length
  const respondingAlerts = alerts.filter((alert) => alert.status === "responding").length
  const avgResponseTime =
    alerts.filter((alert) => alert.responseTime).reduce((sum, alert) => sum + (alert.responseTime || 0), 0) /
      alerts.filter((alert) => alert.responseTime).length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-sm p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Rapid Response System</h1>
            <p className="text-red-100">Emergency alert and response coordination</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setShowNewAlert(true)} className="bg-white text-red-600 hover:bg-red-50">
              <Siren className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
            <Button
              onClick={() => alert("Broadcasting to all units...")}
              variant="outline"
              className="border-white text-black hover:bg-white/80"
            >
              <Phone className="h-4 w-4 mr-2" />
              Broadcast
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Active Alerts</p>
                <p className="text-2xl font-bold text-red-800">{activeAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Responding</p>
                <p className="text-2xl font-bold text-blue-800">{respondingAlerts}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Avg Response</p>
                <p className="text-2xl font-bold text-green-800">{avgResponseTime.toFixed(1)} min</p>
              </div>
              <Timer className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total Today</p>
                <p className="text-2xl font-bold text-purple-800">{alerts.length}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Emergency Alerts</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Alerts</option>
            <option value="active">Active</option>
            <option value="responding">Responding</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card
            key={alert.id}
            className={`shadow-lg border-l-4 transition-all duration-300 hover:shadow-xl ${
              alert.status === "active"
                ? "border-l-red-500 bg-red-50/30"
                : alert.status === "responding"
                  ? "border-l-blue-500 bg-blue-50/30"
                  : "border-l-green-500 bg-white"
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-xl font-bold text-slate-800">{alert.patientName}</CardTitle>
                    <Badge className={`${getStatusColor(alert.status)} border`}>{alert.status.toUpperCase()}</Badge>
                    {alert.status === "active" && <Siren className="h-5 w-5 text-red-500 animate-pulse" />}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>ID: {alert.patientId}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Room: {alert.room}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={`${getAlertTypeColor(alert.alertType)} border text-xs`}>
                      {alert.alertType.replace("-", " ").toUpperCase()}
                    </Badge>
                    <Badge className={`${getSeverityColor(alert.severity)} border text-xs`}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-slate-700 mb-3">{alert.description}</p>
                  <p className="text-sm text-slate-600">Reported by: {alert.reportedBy}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {alert.vitals && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {alert.vitals.heartRate !== undefined && (
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Heart className="h-4 w-4 text-red-600" />
                        <span className="text-xs font-medium text-red-700">Heart Rate</span>
                      </div>
                      <p className="text-lg font-bold text-red-800">{alert.vitals.heartRate} bpm</p>
                    </div>
                  )}
                  {alert.vitals.bloodPressure && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700">BP</span>
                      </div>
                      <p className="text-lg font-bold text-blue-800">{alert.vitals.bloodPressure}</p>
                    </div>
                  )}
                  {alert.vitals.oxygenSat !== undefined && (
                    <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Zap className="h-4 w-4 text-cyan-600" />
                        <span className="text-xs font-medium text-cyan-700">SpO2</span>
                      </div>
                      <p className="text-lg font-bold text-cyan-800">{alert.vitals.oxygenSat}%</p>
                    </div>
                  )}
                  {alert.vitals.temperature !== undefined && (
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Activity className="h-4 w-4 text-orange-600" />
                        <span className="text-xs font-medium text-orange-700">Temp</span>
                      </div>
                      <p className="text-lg font-bold text-orange-800">{alert.vitals.temperature}°F</p>
                    </div>
                  )}
                </div>
              )}

              {alert.assignedTeam && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Assigned Response Team</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {alert.assignedTeam.map((member, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {alert.responseTime && (
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Timer className="h-4 w-4" />
                  <span>Response time: {alert.responseTime} minutes</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex space-x-2">
                  {alert.status === "active" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(alert.id, "responding")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Respond
                      </Button>
                      <Button size="sm" onClick={() => handleAssignTeam(alert.id)} variant="outline">
                        Assign Team
                      </Button>
                    </>
                  )}
                  {alert.status === "responding" && (
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(alert.id, "resolved")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Mark Resolved
                    </Button>
                  )}
                </div>
                <Button size="sm" variant="outline" onClick={() => setSelectedAlert(alert)}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Alert Modal */}
      {showNewAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-red-700">Create Emergency Alert</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowNewAlert(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAlert} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Patient Name"
                    value={newAlert.patientName}
                    onChange={(e) => setNewAlert({ ...newAlert, patientName: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Patient ID"
                    value={newAlert.patientId}
                    onChange={(e) => setNewAlert({ ...newAlert, patientId: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Room Number"
                  value={newAlert.room}
                  onChange={(e) => setNewAlert({ ...newAlert, room: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newAlert.alertType}
                    onChange={(e) => setNewAlert({ ...newAlert, alertType: e.target.value as any })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="cardiac-arrest">Cardiac Arrest</option>
                    <option value="respiratory-distress">Respiratory Distress</option>
                    <option value="stroke">Stroke</option>
                    <option value="trauma">Trauma</option>
                    <option value="sepsis">Sepsis</option>
                    <option value="other">Other</option>
                  </select>

                  <select
                    value={newAlert.severity}
                    onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value as any })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="critical">Critical</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  placeholder="Description of emergency..."
                  value={newAlert.description}
                  onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  required
                />

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  <Siren className="h-4 w-4 mr-2" />
                  Create Emergency Alert
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-3xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Alert Details: {selectedAlert.patientName}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Patient ID</p>
                    <p className="text-lg text-slate-800">{selectedAlert.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Room</p>
                    <p className="text-lg text-slate-800">{selectedAlert.room}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Alert Type</p>
                    <Badge className={`${getAlertTypeColor(selectedAlert.alertType)} border mt-1`}>
                      {selectedAlert.alertType.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Severity</p>
                    <Badge className={`${getSeverityColor(selectedAlert.severity)} border mt-1`}>
                      {selectedAlert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Status</p>
                    <Badge className={`${getStatusColor(selectedAlert.status)} border mt-1`}>
                      {selectedAlert.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Reported By</p>
                    <p className="text-lg text-slate-800">{selectedAlert.reportedBy}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Description</p>
                  <p className="text-slate-800 p-3 bg-slate-50 rounded-lg">{selectedAlert.description}</p>
                </div>

                {selectedAlert.vitals && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Vital Signs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedAlert.vitals.heartRate !== undefined && (
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Heart className="h-5 w-5 text-red-600" />
                            <span className="font-medium text-red-700">Heart Rate</span>
                          </div>
                          <p className="text-2xl font-bold text-red-800">{selectedAlert.vitals.heartRate} bpm</p>
                        </div>
                      )}
                      {selectedAlert.vitals.bloodPressure && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Activity className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-blue-700">Blood Pressure</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-800">{selectedAlert.vitals.bloodPressure}</p>
                        </div>
                      )}
                      {selectedAlert.vitals.oxygenSat !== undefined && (
                        <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="h-5 w-5 text-cyan-600" />
                            <span className="font-medium text-cyan-700">Oxygen Saturation</span>
                          </div>
                          <p className="text-2xl font-bold text-cyan-800">{selectedAlert.vitals.oxygenSat}%</p>
                        </div>
                      )}
                      {selectedAlert.vitals.temperature !== undefined && (
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Activity className="h-5 w-5 text-orange-600" />
                            <span className="font-medium text-orange-700">Temperature</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-800">{selectedAlert.vitals.temperature}°F</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button
                    onClick={() => alert(`Calling response team for ${selectedAlert.patientName}`)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Team
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => alert(`Viewing full medical record for ${selectedAlert.patientName}`)}
                  >
                    View Medical Record
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
