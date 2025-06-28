"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Activity,
  Thermometer,
  Droplet,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Bell,
  RefreshCw,
  Search,
} from "lucide-react"
import { useState, useEffect } from "react"

type Patient = {
  id: number
  name: string
  room: string
  age: number
  condition: string
  heartRate: number
  bloodPressure: string
  temperature: number
  oxygenSaturation: number
  status: "stable" | "critical" | "warning"
  lastUpdated: string
  trend: "up" | "down" | "stable"
}

const mockPatients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    room: "101A",
    age: 65,
    condition: "Post-operative",
    heartRate: 78,
    bloodPressure: "120/80",
    temperature: 98.6,
    oxygenSaturation: 98,
    status: "stable",
    lastUpdated: "2 min ago",
    trend: "stable",
  },
  {
    id: 2,
    name: "Jane Smith",
    room: "102B",
    age: 45,
    condition: "Cardiac monitoring",
    heartRate: 105,
    bloodPressure: "140/90",
    temperature: 99.2,
    oxygenSaturation: 94,
    status: "warning",
    lastUpdated: "1 min ago",
    trend: "up",
  },
  {
    id: 3,
    name: "Bob Johnson",
    room: "103C",
    age: 72,
    condition: "Respiratory distress",
    heartRate: 120,
    bloodPressure: "160/95",
    temperature: 101.4,
    oxygenSaturation: 89,
    status: "critical",
    lastUpdated: "30 sec ago",
    trend: "down",
  },
  {
    id: 4,
    name: "Alice Brown",
    room: "104A",
    age: 58,
    condition: "Recovery",
    heartRate: 72,
    bloodPressure: "118/76",
    temperature: 98.4,
    oxygenSaturation: 99,
    status: "stable",
    lastUpdated: "3 min ago",
    trend: "stable",
  },
]

export default function PatientMonitoring() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "stable">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients((prevPatients) =>
        prevPatients.map((patient) => {
          const newHeartRate = Math.max(60, Math.min(140, patient.heartRate + (Math.random() - 0.5) * 10))
          const newTemp = Math.max(97, Math.min(103, patient.temperature + (Math.random() - 0.5) * 0.5))
          const newOxygen = Math.max(85, Math.min(100, patient.oxygenSaturation + (Math.random() - 0.5) * 3))

          // Determine status based on vitals
          let newStatus: "stable" | "critical" | "warning" = "stable"
          if (newHeartRate > 120 || newTemp > 100.4 || newOxygen < 90) {
            newStatus = "critical"
          } else if (newHeartRate > 100 || newTemp > 99.5 || newOxygen < 95) {
            newStatus = "warning"
          }

          return {
            ...patient,
            heartRate: Math.round(newHeartRate),
            temperature: Math.round(newTemp * 10) / 10,
            oxygenSaturation: Math.round(newOxygen),
            status: newStatus,
            lastUpdated: "Just now",
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const filteredPatients = patients.filter((patient) => {
    const matchesFilter = filter === "all" || patient.status === filter
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.room.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "stable":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getVitalStatus = (vital: string, value: number) => {
    if (vital === "heartRate") {
      if (value > 120 || value < 60) return "critical"
      if (value > 100 || value < 70) return "warning"
      return "normal"
    }
    if (vital === "temperature") {
      if (value > 100.4 || value < 97) return "critical"
      if (value > 99.5) return "warning"
      return "normal"
    }
    if (vital === "oxygen") {
      if (value < 90) return "critical"
      if (value < 95) return "warning"
      return "normal"
    }
    return "normal"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-blue-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient)
  }

  const handleAlertPatient = (patient: Patient) => {
    alert(`Alert sent for ${patient.name} in room ${patient.room}`)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Patients</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="stable">Stable</option>
            </select>
          </div>
          <Button onClick={handleRefresh} disabled={isRefreshing} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Patients</p>
                <p className="text-2xl font-bold text-blue-800">{filteredPatients.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Critical</p>
                <p className="text-2xl font-bold text-red-800">
                  {patients.filter((p) => p.status === "critical").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Warning</p>
                <p className="text-2xl font-bold text-amber-800">
                  {patients.filter((p) => p.status === "warning").length}
                </p>
              </div>
              <Bell className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Stable</p>
                <p className="text-2xl font-bold text-green-800">
                  {patients.filter((p) => p.status === "stable").length}
                </p>
              </div>
              <Heart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card
            key={patient.id}
            className="bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-800">{patient.name}</CardTitle>
                  <p className="text-sm text-slate-600">
                    Room {patient.room} • Age {patient.age}
                  </p>
                </div>
                <Badge className={`${getStatusColor(patient.status)} border`}>{patient.status.toUpperCase()}</Badge>
              </div>
              <p className="text-sm text-slate-600 mt-2">{patient.condition}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Vital Signs Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-lg border ${
                    getVitalStatus("heartRate", patient.heartRate) === "critical"
                      ? "bg-red-50 border-red-200"
                      : getVitalStatus("heartRate", patient.heartRate) === "warning"
                        ? "bg-amber-50 border-amber-200"
                        : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Heart className="h-4 w-4 text-red-600" />
                    {getTrendIcon(patient.trend)}
                  </div>
                  <p className="text-lg font-bold text-slate-800">{patient.heartRate}</p>
                  <p className="text-xs text-slate-600">bpm</p>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-800">{patient.bloodPressure}</p>
                  <p className="text-xs text-slate-600">mmHg</p>
                </div>

                <div
                  className={`p-3 rounded-lg border ${
                    getVitalStatus("temperature", patient.temperature) === "critical"
                      ? "bg-red-50 border-red-200"
                      : getVitalStatus("temperature", patient.temperature) === "warning"
                        ? "bg-amber-50 border-amber-200"
                        : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Thermometer className="h-4 w-4 text-orange-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-800">{patient.temperature.toFixed(1)}</p>
                  <p className="text-xs text-slate-600">°F</p>
                </div>

                <div
                  className={`p-3 rounded-lg border ${
                    getVitalStatus("oxygen", patient.oxygenSaturation) === "critical"
                      ? "bg-red-50 border-red-200"
                      : getVitalStatus("oxygen", patient.oxygenSaturation) === "warning"
                        ? "bg-amber-50 border-amber-200"
                        : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Droplet className="h-4 w-4 text-cyan-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-800">{patient.oxygenSaturation}%</p>
                  <p className="text-xs text-slate-600">SpO2</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-500">Updated {patient.lastUpdated}</p>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePatientClick(patient)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  {patient.status === "critical" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAlertPatient(patient)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Patient Details: {selectedPatient.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Room</p>
                    <p className="text-lg text-slate-800">{selectedPatient.room}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Age</p>
                    <p className="text-lg text-slate-800">{selectedPatient.age}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Condition</p>
                    <p className="text-lg text-slate-800">{selectedPatient.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Status</p>
                    <Badge className={`${getStatusColor(selectedPatient.status)} border`}>
                      {selectedPatient.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Current Vital Signs</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-700">Heart Rate</span>
                      </div>
                      <p className="text-2xl font-bold text-red-800">{selectedPatient.heartRate} bpm</p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-700">Blood Pressure</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-800">{selectedPatient.bloodPressure} mmHg</p>
                    </div>
                    <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Thermometer className="h-5 w-5 text-orange-600" />
                        <span className="font-medium text-orange-700">Temperature</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-800">{selectedPatient.temperature}°F</p>
                    </div>
                    <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Droplet className="h-5 w-5 text-cyan-600" />
                        <span className="font-medium text-cyan-700">Oxygen Saturation</span>
                      </div>
                      <p className="text-2xl font-bold text-cyan-800">{selectedPatient.oxygenSaturation}%</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => alert(`Sending alert for ${selectedPatient.name}`)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Send Alert
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => alert(`Viewing full medical record for ${selectedPatient.name}`)}
                  >
                    View Full Record
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
