"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Users,
  Activity,
  Shield,
  Radio,
  Truck,
  Heart,
  Search,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

type EmergencyAlert = {
  id: string
  type: string
  location: string
  priority: "critical" | "high" | "medium" | "low"
  time: string
  status: "active" | "investigating" | "resolved"
  responder: string
  description?: string
}

type ResponseTeam = {
  name: string
  status: "available" | "active" | "on-call" | "unavailable"
  members: number
  location: string
}

export default function EmergencyResponsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null)
  const [isNewAlertOpen, setIsNewAlertOpen] = useState(false)
  const [isAlertDetailOpen, setIsAlertDetailOpen] = useState(false)
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false)

  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([
    {
      id: "EMG-001",
      type: "Medical Emergency",
      location: "Room 205",
      priority: "critical",
      time: "2 min ago",
      status: "active",
      responder: "Dr. Smith",
      description: "Patient experiencing cardiac arrest",
    },
    {
      id: "EMG-002",
      type: "Fire Alarm",
      location: "East Wing",
      priority: "high",
      time: "15 min ago",
      status: "resolved",
      responder: "Fire Team A",
      description: "False alarm - kitchen smoke detector",
    },
    {
      id: "EMG-003",
      type: "Security Alert",
      location: "Main Entrance",
      priority: "medium",
      time: "1 hour ago",
      status: "investigating",
      responder: "Security Team",
      description: "Unauthorized access attempt",
    },
    {
      id: "EMG-004",
      type: "Power Outage",
      location: "Building B",
      priority: "high",
      time: "2 hours ago",
      status: "resolved",
      responder: "Maintenance",
      description: "Backup power activated successfully",
    },
  ])

  const [responseTeams, setResponseTeams] = useState<ResponseTeam[]>([
    { name: "Medical Team A", status: "available", members: 4, location: "ER" },
    { name: "Fire Safety Team", status: "on-call", members: 6, location: "Station 1" },
    { name: "Security Team", status: "active", members: 3, location: "Patrol" },
    { name: "Maintenance Team", status: "available", members: 2, location: "Workshop" },
  ])

  const [newAlert, setNewAlert] = useState({
    type: "",
    location: "",
    priority: "medium" as EmergencyAlert["priority"],
    description: "",
    responder: "",
  })

  const [broadcastMessage, setBroadcastMessage] = useState({
    message: "",
    priority: "medium" as "critical" | "high" | "medium" | "low",
    recipients: "all" as "all" | "medical" | "security" | "maintenance",
  })

  const emergencyContacts = [
    { name: "Fire Department", number: "911", type: "emergency" },
    { name: "Police", number: "911", type: "emergency" },
    { name: "Hospital Security", number: "(555) 0123", type: "internal" },
    { name: "Facility Manager", number: "(555) 0124", type: "internal" },
  ]

  const filteredAlerts = emergencyAlerts.filter((alert) => {
    const matchesSearch =
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === "all" || alert.priority === filterPriority
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    return matchesSearch && matchesPriority && matchesStatus
  })

  const handleCreateAlert = () => {
    if (newAlert.type && newAlert.location && newAlert.responder) {
      const alert: EmergencyAlert = {
        id: `EMG-${String(emergencyAlerts.length + 1).padStart(3, "0")}`,
        type: newAlert.type,
        location: newAlert.location,
        priority: newAlert.priority,
        time: "Just now",
        status: "active",
        responder: newAlert.responder,
        description: newAlert.description,
      }
      setEmergencyAlerts([alert, ...emergencyAlerts])
      setNewAlert({ type: "", location: "", priority: "medium", description: "", responder: "" })
      setIsNewAlertOpen(false)
    }
  }

  const handleUpdateAlertStatus = (alertId: string, newStatus: "active" | "investigating" | "resolved") => {
    setEmergencyAlerts(emergencyAlerts.map((alert) => (alert.id === alertId ? { ...alert, status: newStatus } : alert)))
  }

  const handleViewAlert = (alert: EmergencyAlert) => {
    setSelectedAlert(alert)
    setIsAlertDetailOpen(true)
  }

  const handleDispatchTeam = (teamName: string, alertId: string) => {
    setResponseTeams(responseTeams.map((team) => (team.name === teamName ? { ...team, status: "active" } : team)))
    alert(`${teamName} dispatched to emergency ${alertId}`)
  }

  const handleBroadcast = () => {
    if (broadcastMessage.message) {
      alert(
        `Broadcasting ${broadcastMessage.priority} priority message to ${broadcastMessage.recipients}: "${broadcastMessage.message}"`,
      )
      setBroadcastMessage({ message: "", priority: "medium", recipients: "all" })
      setIsBroadcastOpen(false)
    }
  }

  const handleCallEmergency = (contact: { name: string; number: string }) => {
    alert(`Calling ${contact.name} at ${contact.number}`)
  }

  const handleSystemTest = (system: string) => {
    alert(`Running system test for ${system}...`)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800 border-red-200"
      case "investigating":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertCircle className="h-4 w-4" />
      case "investigating":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <XCircle className="h-4 w-4" />
    }
  }

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "on-call":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "unavailable":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const activeAlerts = emergencyAlerts.filter((alert) => alert.status === "active").length
  const availableTeams = responseTeams.filter((team) => team.status === "available").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/20 bg-white/30 backdrop-blur-md px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h1 className="text-xl font-semibold text-slate-800">Emergency Response</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area - 8 columns */}
          <div className="col-span-8 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-t-lg">
                  <CardTitle className="text-sm font-medium text-slate-700">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">{activeAlerts}</div>
                  <p className="text-xs text-slate-600">
                    {emergencyAlerts.filter((a) => a.priority === "critical").length} critical,{" "}
                    {emergencyAlerts.filter((a) => a.status === "investigating").length} investigating
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-t-lg">
                  <CardTitle className="text-sm font-medium text-slate-700">Response Teams</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">{responseTeams.length}</div>
                  <p className="text-xs text-slate-600">
                    {availableTeams} available, {responseTeams.filter((t) => t.status === "active").length} active
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-t-lg">
                  <CardTitle className="text-sm font-medium text-slate-700">Avg Response</CardTitle>
                  <Clock className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">3.2m</div>
                  <p className="text-xs text-slate-600">-15% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-t-lg">
                  <CardTitle className="text-sm font-medium text-slate-700">Today's Incidents</CardTitle>
                  <Activity className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">{emergencyAlerts.length}</div>
                  <p className="text-xs text-slate-600">
                    {emergencyAlerts.filter((a) => a.status === "resolved").length} resolved, {activeAlerts} active
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Alerts */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-800">Emergency Alerts</CardTitle>
                    <CardDescription className="text-slate-600">
                      Real-time emergency incidents and responses
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isNewAlertOpen} onOpenChange={setIsNewAlertOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Plus className="h-4 w-4 mr-2" />
                          New Alert
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white/95 backdrop-blur-sm">
                        <DialogHeader>
                          <DialogTitle>Create Emergency Alert</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="alert-type">Emergency Type</Label>
                            <Input
                              id="alert-type"
                              value={newAlert.type}
                              onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                              placeholder="e.g., Medical Emergency, Fire Alarm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="alert-location">Location</Label>
                            <Input
                              id="alert-location"
                              value={newAlert.location}
                              onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                              placeholder="e.g., Room 205, East Wing"
                            />
                          </div>
                          <div>
                            <Label htmlFor="alert-priority">Priority</Label>
                            <Select
                              value={newAlert.priority}
                              onValueChange={(value) =>
                                setNewAlert({ ...newAlert, priority: value as EmergencyAlert["priority"] })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="critical">Critical</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="alert-responder">Assigned Responder</Label>
                            <Input
                              id="alert-responder"
                              value={newAlert.responder}
                              onChange={(e) => setNewAlert({ ...newAlert, responder: e.target.value })}
                              placeholder="e.g., Dr. Smith, Security Team"
                            />
                          </div>
                          <div>
                            <Label htmlFor="alert-description">Description</Label>
                            <Textarea
                              id="alert-description"
                              value={newAlert.description}
                              onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                              placeholder="Additional details about the emergency"
                            />
                          </div>
                          <Button onClick={handleCreateAlert} className="w-full bg-red-600 hover:bg-red-700">
                            Create Alert
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={isBroadcastOpen} onOpenChange={setIsBroadcastOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Radio className="h-4 w-4 mr-2" />
                          Broadcast
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white/95 backdrop-blur-sm">
                        <DialogHeader>
                          <DialogTitle>Broadcast Emergency Message</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="broadcast-message">Message</Label>
                            <Textarea
                              id="broadcast-message"
                              value={broadcastMessage.message}
                              onChange={(e) => setBroadcastMessage({ ...broadcastMessage, message: e.target.value })}
                              placeholder="Enter emergency broadcast message"
                            />
                          </div>
                          <div>
                            <Label htmlFor="broadcast-priority">Priority</Label>
                            <Select
                              value={broadcastMessage.priority}
                              onValueChange={(value) =>
                                setBroadcastMessage({
                                  ...broadcastMessage,
                                  priority: value as "critical" | "high" | "medium" | "low",
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="critical">Critical</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="broadcast-recipients">Recipients</Label>
                            <Select
                              value={broadcastMessage.recipients}
                              onValueChange={(value) =>
                                setBroadcastMessage({
                                  ...broadcastMessage,
                                  recipients: value as "all" | "medical" | "security" | "maintenance",
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Teams</SelectItem>
                                <SelectItem value="medical">Medical Teams</SelectItem>
                                <SelectItem value="security">Security Teams</SelectItem>
                                <SelectItem value="maintenance">Maintenance Teams</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={handleBroadcast} className="w-full">
                            <Radio className="h-4 w-4 mr-2" />
                            Send Broadcast
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Alerts List */}
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 bg-white/40 rounded-lg border border-white/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <AlertTriangle
                            className={`h-6 w-6 ${alert.priority === "critical" ? "text-red-600" : alert.priority === "high" ? "text-orange-600" : "text-yellow-600"}`}
                          />
                          <div className="text-xs text-slate-600 mt-1">{alert.time}</div>
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{alert.type}</div>
                          <div className="text-sm text-slate-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Responder</div>
                          <div className="font-medium text-slate-800">{alert.responder}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getPriorityColor(alert.priority)}>{alert.priority}</Badge>
                        <Select
                          value={alert.status}
                          onValueChange={(value) =>
                            handleUpdateAlertStatus(alert.id, value as "active" | "investigating" | "resolved")
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="investigating">Investigating</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleViewAlert(alert)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {alert.status === "active" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDispatchTeam("Medical Team A", alert.id)}
                            >
                              <Truck className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Teams */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-t-lg">
                <CardTitle className="text-slate-800">Response Teams</CardTitle>
                <CardDescription className="text-slate-600">Current status of emergency response teams</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {responseTeams.map((team) => (
                    <div key={team.name} className="p-4 bg-white/40 rounded-lg border border-white/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-slate-800">{team.name}</div>
                        <Badge className={getTeamStatusColor(team.status)}>{team.status}</Badge>
                      </div>
                      <div className="text-sm text-slate-600 space-y-1 mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {team.members} members
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {team.location}
                        </div>
                      </div>
                      {team.status === "available" && (
                        <Button size="sm" className="w-full" onClick={() => handleDispatchTeam(team.name, "EMG-001")}>
                          <Truck className="h-4 w-4 mr-2" />
                          Dispatch
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - 4 columns */}
          <div className="col-span-4 space-y-6">
            {/* System Status */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-t-lg">
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Fire Alarm System</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>
                      <Button size="sm" variant="ghost" onClick={() => handleSystemTest("Fire Alarm System")}>
                        Test
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Security System</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>
                      <Button size="sm" variant="ghost" onClick={() => handleSystemTest("Security System")}>
                        Test
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Communication</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>
                      <Button size="sm" variant="ghost" onClick={() => handleSystemTest("Communication")}>
                        Test
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Backup Power</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Standby</Badge>
                      <Button size="sm" variant="ghost" onClick={() => handleSystemTest("Backup Power")}>
                        Test
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-t-lg">
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.name} className="flex items-center justify-between p-3 bg-white/40 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-800">{contact.name}</div>
                        <div className="text-sm text-slate-600">{contact.type}</div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleCallEmergency(contact)}>
                        <Phone className="h-4 w-4 mr-2" />
                        {contact.number}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-t-lg">
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium text-slate-800">Fire drill completed</div>
                    <div className="text-slate-600">East Wing - 30 min ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-800">Security patrol check</div>
                    <div className="text-slate-600">All areas - 1 hour ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-800">Equipment maintenance</div>
                    <div className="text-slate-600">Fire suppression - 2 hours ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-t-lg">
                <CardTitle className="text-slate-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setIsNewAlertOpen(true)}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Emergency Alert
                  </Button>
                  <Button className="w-full justify-start" variant="ghost" onClick={() => setIsBroadcastOpen(true)}>
                    <Radio className="h-4 w-4 mr-2" />
                    Broadcast Message
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="ghost"
                    onClick={() => handleDispatchTeam("Medical Team A", "EMERGENCY")}
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Dispatch Team
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="ghost"
                    onClick={() => alert("Activating medical emergency protocol...")}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Medical Emergency
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Alert Detail Dialog */}
      <Dialog open={isAlertDetailOpen} onOpenChange={setIsAlertDetailOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Emergency Alert Details</DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Alert ID</Label>
                  <div className="font-medium">{selectedAlert.id}</div>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge className={getPriorityColor(selectedAlert.priority)}>{selectedAlert.priority}</Badge>
                </div>
                <div>
                  <Label>Type</Label>
                  <div className="font-medium">{selectedAlert.type}</div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedAlert.status)}>
                    {getStatusIcon(selectedAlert.status)}
                    {selectedAlert.status}
                  </Badge>
                </div>
                <div>
                  <Label>Location</Label>
                  <div className="font-medium">{selectedAlert.location}</div>
                </div>
                <div>
                  <Label>Responder</Label>
                  <div className="font-medium">{selectedAlert.responder}</div>
                </div>
                <div className="col-span-2">
                  <Label>Time</Label>
                  <div className="font-medium">{selectedAlert.time}</div>
                </div>
                {selectedAlert.description && (
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <div className="font-medium">{selectedAlert.description}</div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleDispatchTeam("Medical Team A", selectedAlert.id)}>
                  <Truck className="h-4 w-4 mr-2" />
                  Dispatch Team
                </Button>
                <Button variant="outline" onClick={() => setIsBroadcastOpen(true)}>
                  <Radio className="h-4 w-4 mr-2" />
                  Broadcast Update
                </Button>
                {selectedAlert.status === "active" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUpdateAlertStatus(selectedAlert.id, "resolved")
                      setIsAlertDetailOpen(false)
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Resolved
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
