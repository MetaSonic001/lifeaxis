"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  Thermometer,
  Droplets,
  Users,
  Activity,
  Zap,
  Shield,
  Wifi,
  Clock,
  Target,
  Settings,
  TrendingUp,
} from "lucide-react"
import { useEffect, useState } from "react"

const mockAreas = [
  {
    id: 1,
    name: "Emergency Room",
    occupancy: 75,
    temperature: 22,
    humidity: 45,
    airQuality: 85,
    powerStatus: "Normal",
  },
  { id: 2, name: "ICU", occupancy: 90, temperature: 21, humidity: 50, airQuality: 90, powerStatus: "Normal" },
  { id: 3, name: "General Ward", occupancy: 60, temperature: 23, humidity: 40, airQuality: 88, powerStatus: "Normal" },
  {
    id: 4,
    name: "Operating Room",
    occupancy: 40,
    temperature: 20,
    humidity: 55,
    airQuality: 95,
    powerStatus: "Backup",
  },
  { id: 5, name: "Pediatrics", occupancy: 55, temperature: 24, humidity: 42, airQuality: 87, powerStatus: "Normal" },
  { id: 6, name: "Radiology", occupancy: 30, temperature: 19, humidity: 38, airQuality: 92, powerStatus: "Normal" },
]

const mockSystems = [
  { id: 1, name: "HVAC System", status: "Operational", efficiency: 92, lastMaintenance: "2024-01-15" },
  { id: 2, name: "Fire Safety", status: "Operational", efficiency: 98, lastMaintenance: "2024-01-20" },
  { id: 3, name: "Security System", status: "Operational", efficiency: 95, lastMaintenance: "2024-01-18" },
  { id: 4, name: "Network Infrastructure", status: "Warning", efficiency: 78, lastMaintenance: "2024-01-10" },
  { id: 5, name: "Backup Power", status: "Operational", efficiency: 88, lastMaintenance: "2024-01-22" },
]

export default function FacilityMonitoring() {
  const [areas, setAreas] = useState(mockAreas)
  const [systems, setSystems] = useState(mockSystems)
  const [alerts, setAlerts] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setAreas(
        areas.map((area) => ({
          ...area,
          occupancy: Math.min(100, Math.max(0, area.occupancy + Math.floor(Math.random() * 11) - 5)),
          temperature: Math.max(18, Math.min(26, area.temperature + (Math.random() - 0.5))),
          humidity: Math.min(100, Math.max(0, area.humidity + Math.floor(Math.random() * 11) - 5)),
          airQuality: Math.min(100, Math.max(60, area.airQuality + Math.floor(Math.random() * 7) - 3)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [areas])

  useEffect(() => {
    const newAlerts = areas.flatMap((area) => {
      const areaAlerts = []
      if (area.occupancy > 90) areaAlerts.push(`High occupancy in ${area.name} (${area.occupancy}%)`)
      if (area.temperature > 25 || area.temperature < 20)
        areaAlerts.push(`Temperature alert in ${area.name} (${area.temperature.toFixed(1)}°C)`)
      if (area.humidity > 60 || area.humidity < 30)
        areaAlerts.push(`Humidity alert in ${area.name} (${area.humidity}%)`)
      if (area.airQuality < 80) areaAlerts.push(`Poor air quality in ${area.name} (${area.airQuality}%)`)
      return areaAlerts
    })

    const systemAlerts = systems.flatMap((system) => {
      const sysAlerts = []
      if (system.status === "Warning") sysAlerts.push(`${system.name} requires attention`)
      if (system.efficiency < 80) sysAlerts.push(`${system.name} efficiency below threshold (${system.efficiency}%)`)
      return sysAlerts
    })

    setAlerts([...newAlerts, ...systemAlerts])
  }, [areas, systems])

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy > 90) return "text-red-600"
    if (occupancy > 75) return "text-amber-600"
    return "text-green-600"
  }

  const getTemperatureColor = (temp: number) => {
    if (temp > 25 || temp < 20) return "text-red-600"
    if (temp > 24 || temp < 21) return "text-amber-600"
    return "text-green-600"
  }

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200"
      case "Warning":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200"
      case "Critical":
        return "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Facility Monitoring</h1>
            <p className="text-sm text-slate-600">Real-time monitoring of hospital environment and systems</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-teal-100 rounded-lg">
              <Activity className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">{areas.length} Areas</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">{alerts.length} Alerts</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Alerts Section */}
            {alerts.length > 0 && (
              <Alert className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Facility Alerts ({alerts.length})</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 space-y-1">
                    {alerts.slice(0, 3).map((alert, index) => (
                      <div key={index} className="text-red-700 text-sm">
                        • {alert}
                      </div>
                    ))}
                    {alerts.length > 3 && (
                      <div className="text-red-600 text-sm font-medium">+ {alerts.length - 3} more alerts</div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-white/80 backdrop-blur-sm border-teal-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Avg Occupancy</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {Math.round(areas.reduce((acc, area) => acc + area.occupancy, 0) / areas.length)}%
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-teal-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Avg Temperature</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {(areas.reduce((acc, area) => acc + area.temperature, 0) / areas.length).toFixed(1)}°C
                      </p>
                    </div>
                    <Thermometer className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-cyan-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Avg Humidity</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {Math.round(areas.reduce((acc, area) => acc + area.humidity, 0) / areas.length)}%
                      </p>
                    </div>
                    <Droplets className="w-8 h-8 text-cyan-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">System Health</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {Math.round(systems.reduce((acc, sys) => acc + sys.efficiency, 0) / systems.length)}%
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="areas" className="space-y-6">
              <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200 p-1">
                <TabsTrigger value="areas" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                  Area Monitoring
                </TabsTrigger>
                <TabsTrigger value="systems" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  System Status
                </TabsTrigger>
                <TabsTrigger
                  value="environmental"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Environmental
                </TabsTrigger>
              </TabsList>

              {/* Area Monitoring Tab */}
              <TabsContent value="areas">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {areas.map((area) => (
                    <Card
                      key={area.id}
                      className="bg-white/80 backdrop-blur-sm border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
                        <CardTitle className="flex items-center justify-between text-slate-800">
                          <span>{area.name}</span>
                          <div className="flex items-center space-x-1">
                            <div
                              className={`w-3 h-3 rounded-full ${area.powerStatus === "Normal" ? "bg-green-500" : "bg-amber-500"}`}
                            ></div>
                            <Zap className="w-4 h-4 text-slate-500" />
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-700 font-medium">Occupancy:</span>
                          </div>
                          <Badge className={`${getOccupancyColor(area.occupancy)} bg-white border`}>
                            {area.occupancy}%
                          </Badge>
                        </div>
                        <Progress value={area.occupancy} className="w-full h-2" />

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-700 font-medium">Temperature:</span>
                          </div>
                          <Badge className={`${getTemperatureColor(area.temperature)} bg-white border`}>
                            {area.temperature.toFixed(1)}°C
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-700 font-medium">Humidity:</span>
                          </div>
                          <Badge variant="outline" className="border-cyan-200 text-cyan-700">
                            {area.humidity}%
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-700 font-medium">Air Quality:</span>
                          </div>
                          <Badge
                            className={`${area.airQuality >= 85 ? "bg-green-100 text-green-700" : area.airQuality >= 75 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"} border`}
                          >
                            {area.airQuality}%
                          </Badge>
                        </div>

                        <div className="pt-2 border-t border-slate-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Power Status:</span>
                            <Badge
                              className={
                                area.powerStatus === "Normal"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              }
                            >
                              {area.powerStatus}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* System Status Tab */}
              <TabsContent value="systems">
                <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2 text-slate-800">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span>System Status Overview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      {systems.map((system) => (
                        <Card key={system.id} className="bg-white/60 border-slate-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                {system.name.includes("HVAC") && <Thermometer className="w-5 h-5 text-blue-600" />}
                                {system.name.includes("Fire") && <Shield className="w-5 h-5 text-red-600" />}
                                {system.name.includes("Security") && <Shield className="w-5 h-5 text-purple-600" />}
                                {system.name.includes("Network") && <Wifi className="w-5 h-5 text-green-600" />}
                                {system.name.includes("Power") && <Zap className="w-5 h-5 text-amber-600" />}
                                <h4 className="font-semibold text-slate-800">{system.name}</h4>
                              </div>
                              <Badge className={getSystemStatusColor(system.status)}>{system.status}</Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Efficiency:</span>
                                <span className="font-medium text-slate-800">{system.efficiency}%</span>
                              </div>
                              <Progress value={system.efficiency} className="h-2" />
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Last Maintenance:</span>
                                <span className="text-slate-800">{system.lastMaintenance}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Environmental Tab */}
              <TabsContent value="environmental">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2 text-slate-800">
                        <Thermometer className="w-5 h-5 text-green-600" />
                        <span>Temperature Distribution</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {areas.map((area) => (
                          <div
                            key={area.id}
                            className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-slate-200"
                          >
                            <span className="text-slate-700 font-medium">{area.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`font-semibold ${getTemperatureColor(area.temperature)}`}>
                                {area.temperature.toFixed(1)}°C
                              </span>
                              <div
                                className={`w-3 h-3 rounded-full ${area.temperature >= 20 && area.temperature <= 25 ? "bg-green-500" : "bg-red-500"}`}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-cyan-100 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2 text-slate-800">
                        <Droplets className="w-5 h-5 text-cyan-600" />
                        <span>Humidity Levels</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {areas.map((area) => (
                          <div
                            key={area.id}
                            className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-slate-200"
                          >
                            <span className="text-slate-700 font-medium">{area.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-slate-800">{area.humidity}%</span>
                              <Progress value={area.humidity} className="w-16 h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* System Health Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Overall Health</span>
                  <span className="text-lg font-bold text-green-600">
                    {Math.round(systems.reduce((acc, sys) => acc + sys.efficiency, 0) / systems.length)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Systems Online</span>
                  <span className="text-lg font-bold text-slate-800">
                    {systems.filter((s) => s.status === "Operational").length}/{systems.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Warnings</span>
                  <Badge className="bg-amber-100 text-amber-700">
                    {systems.filter((s) => s.status === "Warning").length}
                  </Badge>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Next Maintenance</span>
                    <span className="text-sm text-slate-600">In 3 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Environmental Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.slice(0, 4).map((alert, index) => (
                  <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">{alert}</p>
                        <p className="text-xs text-amber-700">Requires attention</p>
                      </div>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-slate-500">All systems normal</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Energy Efficiency</span>
                    <span className="text-sm font-medium text-slate-800">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Air Quality Index</span>
                    <span className="text-sm font-medium text-slate-800">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Climate Control</span>
                    <span className="text-sm font-medium text-slate-800">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Security Systems</span>
                    <span className="text-sm font-medium text-slate-800">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span>Recent Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">HVAC system optimized</p>
                    <p className="text-xs text-slate-600">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">Temperature alert cleared</p>
                    <p className="text-xs text-slate-600">25 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">Security system updated</p>
                    <p className="text-xs text-slate-600">1 hour ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Settings className="w-5 h-5 text-slate-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-white/80 text-slate-700 hover:bg-blue-50 border-blue-200"
                >
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/80 text-slate-700 hover:bg-green-50 border-green-200"
                >
                  Schedule Maintenance
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/80 text-slate-700 hover:bg-purple-50 border-purple-200"
                >
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
