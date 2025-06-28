"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Monitor,
  Activity,
  AlertTriangle,
  Users,
  Clock,
  Maximize2,
  Volume2,
  VolumeX,
  Settings,
  Filter,
  RefreshCw,
} from "lucide-react"
import { useState, useEffect } from "react"

type MonitoringStation = {
  id: number
  name: string
  room: string
  status: "online" | "offline" | "maintenance"
  patients: number
  alerts: number
  lastUpdate: string
}

type CentralAlert = {
  id: number
  patientName: string
  room: string
  station: string
  type: "critical" | "warning" | "info"
  message: string
  timestamp: string
  acknowledged: boolean
}

const mockStations: MonitoringStation[] = [
  { id: 1, name: "ICU Station 1", room: "ICU-A", status: "online", patients: 8, alerts: 2, lastUpdate: "1 min ago" },
  { id: 2, name: "ICU Station 2", room: "ICU-B", status: "online", patients: 6, alerts: 0, lastUpdate: "30 sec ago" },
  { id: 3, name: "Cardiac Unit", room: "CCU-1", status: "online", patients: 12, alerts: 4, lastUpdate: "2 min ago" },
  { id: 4, name: "Emergency", room: "ER-1", status: "maintenance", patients: 0, alerts: 0, lastUpdate: "15 min ago" },
  { id: 5, name: "General Ward", room: "GW-1", status: "online", patients: 15, alerts: 1, lastUpdate: "45 sec ago" },
  { id: 6, name: "Pediatric", room: "PED-1", status: "online", patients: 4, alerts: 0, lastUpdate: "1 min ago" },
]

const mockAlerts: CentralAlert[] = [
  {
    id: 1,
    patientName: "John Doe",
    room: "ICU-A-101",
    station: "ICU Station 1",
    type: "critical",
    message: "Heart rate critically high: 145 bpm",
    timestamp: "2 min ago",
    acknowledged: false,
  },
  {
    id: 2,
    patientName: "Jane Smith",
    room: "CCU-1-205",
    station: "Cardiac Unit",
    type: "warning",
    message: "Blood pressure elevated: 160/95",
    timestamp: "3 min ago",
    acknowledged: false,
  },
  {
    id: 3,
    patientName: "Bob Johnson",
    room: "ICU-A-103",
    station: "ICU Station 1",
    type: "critical",
    message: "Oxygen saturation low: 87%",
    timestamp: "5 min ago",
    acknowledged: true,
  },
  {
    id: 4,
    patientName: "Alice Brown",
    room: "CCU-1-201",
    station: "Cardiac Unit",
    type: "warning",
    message: "Temperature elevated: 101.2°F",
    timestamp: "7 min ago",
    acknowledged: false,
  },
]

export default function CentralizedMonitoring() {
  const [stations, setStations] = useState<MonitoringStation[]>(mockStations)
  const [alerts, setAlerts] = useState<CentralAlert[]>(mockAlerts)
  const [selectedStation, setSelectedStation] = useState<MonitoringStation | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setStations((prev) =>
        prev.map((station) => ({
          ...station,
          alerts: Math.max(0, station.alerts + Math.floor(Math.random() * 3) - 1),
          lastUpdate: "Just now",
        })),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleAcknowledgeAlert = (alertId: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const handleStationClick = (station: MonitoringStation) => {
    setSelectedStation(station)
  }

  const getStationStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200"
      case "offline":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredAlerts = alerts.filter((alert) => filter === "all" || alert.type === filter)
  const totalPatients = stations.reduce((sum, station) => sum + station.patients, 0)
  const totalAlerts = stations.reduce((sum, station) => sum + station.alerts, 0)
  const onlineStations = stations.filter((s) => s.status === "online").length

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Centralized Monitoring System</h1>
            <p className="text-slate-600">Real-time monitoring across all hospital units</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={soundEnabled ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
              {soundEnabled ? "Sound On" : "Sound Off"}
            </Button>
            <Button onClick={handleRefresh} disabled={isRefreshing} className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Patients</p>
                <p className="text-2xl font-bold text-blue-800">{totalPatients}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Online Stations</p>
                <p className="text-2xl font-bold text-green-800">{onlineStations}</p>
              </div>
              <Monitor className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Active Alerts</p>
                <p className="text-2xl font-bold text-red-800">{totalAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Avg Response</p>
                <p className="text-2xl font-bold text-purple-800">2.3 min</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Stations Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Monitoring Stations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((station) => (
            <Card
              key={station.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200"
              onClick={() => handleStationClick(station)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-slate-800">{station.name}</CardTitle>
                  <Badge className={`${getStationStatusColor(station.status)} border`}>
                    {station.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{station.room}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-800">{station.patients}</p>
                    <p className="text-xs text-blue-600">Patients</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-800">{station.alerts}</p>
                    <p className="text-xs text-red-600">Alerts</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-slate-500">Updated {station.lastUpdate}</p>
                  <Button size="sm" variant="outline">
                    <Maximize2 className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Active Alerts</h2>
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Alerts</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
            <Button size="sm" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                alert.acknowledged ? "bg-gray-50 border-gray-200 opacity-75" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className={`${getAlertTypeColor(alert.type)} border`}>{alert.type.toUpperCase()}</Badge>
                    <span className="font-medium text-slate-800">{alert.patientName}</span>
                    <span className="text-sm text-slate-600">Room {alert.room}</span>
                  </div>
                  <p className="text-slate-700 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>Station: {alert.station}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!alert.acknowledged && (
                    <Button
                      size="sm"
                      onClick={() => handleAcknowledgeAlert(alert.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Acknowledge
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    View Patient
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Station Detail Modal */}
      {selectedStation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Station Details: {selectedStation.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedStation(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-700">Location</p>
                    <p className="text-lg font-bold text-blue-800">{selectedStation.room}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-700">Status</p>
                    <Badge className={`${getStationStatusColor(selectedStation.status)} border mt-1`}>
                      {selectedStation.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-purple-700">Patients</p>
                    <p className="text-lg font-bold text-purple-800">{selectedStation.patients}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-700">Active Alerts</p>
                    <p className="text-lg font-bold text-red-800">{selectedStation.alerts}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Station Controls</h3>
                  <div className="flex space-x-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      View Vitals
                    </Button>
                    <Button variant="outline">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Alert History
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
