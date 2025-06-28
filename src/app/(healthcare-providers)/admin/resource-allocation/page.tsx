"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Users, Calendar, Activity, AlertTriangle, TrendingUp, Clock, Target, Zap, Brain } from 'lucide-react'

type Staff = {
  id: number
  name: string
  role: "Doctor" | "Nurse" | "Admin"
  shift: "Morning" | "Afternoon" | "Night"
  department: string
  efficiency: number
}

type Resource = {
  id: number
  name: string
  type: "Bed" | "Ventilator" | "Wheelchair" | "Medical Equipment"
  status: "Available" | "In Use" | "Maintenance"
  location: string
  specialization?: string
}

type Alert = {
  id: number
  type: "low_staff" | "equipment_shortage" | "maintenance_needed"
  message: string
  severity: "low" | "medium" | "high"
}

export default function HospitalResourceManagement() {
  const [staffSchedule, setStaffSchedule] = useState<Staff[]>([
    { id: 1, name: "Dr. Smith", role: "Doctor", shift: "Morning", department: "ER", efficiency: 92 },
    { id: 2, name: "Nurse Johnson", role: "Nurse", shift: "Afternoon", department: "ICU", efficiency: 88 },
    { id: 3, name: "Dr. Williams", role: "Doctor", shift: "Night", department: "Pediatrics", efficiency: 95 },
    { id: 4, name: "Nurse Brown", role: "Nurse", shift: "Morning", department: "Surgery", efficiency: 90 },
    { id: 5, name: "Dr. Lee", role: "Doctor", shift: "Night", department: "Cardiology", efficiency: 87 },
  ])

  const [resources, setResources] = useState<Resource[]>([
    { id: 1, name: "Bed 101", type: "Bed", status: "Available", location: "Ward A", specialization: "General" },
    {
      id: 2,
      name: "Ventilator 1",
      type: "Ventilator",
      status: "In Use",
      location: "ICU",
      specialization: "Critical Care",
    },
    { id: 3, name: "Wheelchair 3", type: "Wheelchair", status: "Maintenance", location: "Storage" },
    {
      id: 4,
      name: "Ultrasound Machine",
      type: "Medical Equipment",
      status: "Available",
      location: "Radiology",
      specialization: "Diagnostic",
    },
    {
      id: 5,
      name: "CT Scan",
      type: "Medical Equipment",
      status: "In Use",
      location: "Imaging Center",
      specialization: "Advanced Imaging",
    },
  ])

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, type: "low_staff", message: "Low staffing in ER during night shift", severity: "high" },
    { id: 2, type: "equipment_shortage", message: "Limited ventilators available", severity: "medium" },
  ])

  const [workloadData] = useState([
    { department: "ER", current: 80, predicted: 95, capacity: 100 },
    { department: "ICU", current: 70, predicted: 75, capacity: 85 },
    { department: "Pediatrics", current: 50, predicted: 60, capacity: 75 },
    { department: "Surgery", current: 60, predicted: 55, capacity: 80 },
  ])

  const optimizeSchedule = () => {
    setStaffSchedule(
      staffSchedule.map((staff) => ({
        ...staff,
        shift: ["Morning", "Afternoon", "Night"][Math.floor(Math.random() * 3)] as "Morning" | "Afternoon" | "Night",
      })),
    )
  }

  const handleResourceStatusChange = (id: number, newStatus: Resource["status"]) => {
    setResources((prevResources) =>
      prevResources.map((resource) => (resource.id === id ? { ...resource, status: newStatus } : resource)),
    )

    if (newStatus === "Maintenance") {
      const newAlert: Alert = {
        id: alerts.length + 1,
        type: "maintenance_needed",
        message: `${resources.find((r) => r.id === id)?.name} requires maintenance`,
        severity: "medium",
      }
      setAlerts([...alerts, newAlert])
    }
  }

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const getStatusColor = (status: Resource["status"]) => {
    switch (status) {
      case "Available":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200"
      case "In Use":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200"
      case "Maintenance":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-gradient-to-r from-red-100 to-rose-100 border-red-200"
      case "medium":
        return "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200"
      case "low":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200"
      default:
        return "bg-gray-100"
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
            <h1 className="text-2xl font-bold text-slate-800">Resource Management</h1>
            <p className="text-sm text-slate-600">AI-optimized hospital resource allocation and scheduling</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 rounded-lg">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">{staffSchedule.length} Staff</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-lg">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                {resources.filter((r) => r.status === "Available").length} Available
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Staff</p>
                      <p className="text-2xl font-bold text-slate-800">{staffSchedule.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Available Resources</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {resources.filter((r) => r.status === "Available").length}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Active Alerts</p>
                      <p className="text-2xl font-bold text-slate-800">{alerts.length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Avg Efficiency</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {Math.round(staffSchedule.reduce((acc, staff) => acc + staff.efficiency, 0) / staffSchedule.length)}
                        %
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="staffing" className="space-y-6">
              <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200 p-1">
                <TabsTrigger value="staffing" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Staff Scheduling
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  Resource Management
                </TabsTrigger>
                <TabsTrigger value="workload" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  Workload Prediction
                </TabsTrigger>
              </TabsList>

              {/* Staff Scheduling Tab */}
              <TabsContent value="staffing">
                <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2 text-slate-800">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Staff Schedule</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      AI-optimized staff allocation across departments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Button
                        onClick={optimizeSchedule}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      >
                        <Activity className="mr-2 h-4 w-4" />
                        Optimize Schedule
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-slate-100 to-blue-100">
                            <TableHead className="text-slate-700 font-semibold">Staff Member</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Role</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Department</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Shift</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Efficiency</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {staffSchedule.map((staff) => (
                            <TableRow key={staff.id} className="bg-white/40 hover:bg-blue-50/50 transition-colors">
                              <TableCell className="font-medium">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-700 font-semibold text-sm">{staff.name.charAt(0)}</span>
                                  </div>
                                  <span className="text-slate-800">{staff.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    staff.role === "Doctor"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-green-100 text-green-700"
                                  }
                                >
                                  {staff.role}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-slate-600">{staff.department}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-blue-200 text-blue-700">
                                  {staff.shift}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Progress value={staff.efficiency} className="w-16 h-2" />
                                  <span className="text-sm font-medium text-slate-600">{staff.efficiency}%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Resource Management Tab */}
              <TabsContent value="resources">
                <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2 text-slate-800">
                      <Activity className="w-5 h-5 text-green-600" />
                      <span>Resource Inventory</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Manage and track hospital resources and equipment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-slate-100 to-green-100">
                            <TableHead className="text-slate-700 font-semibold">Resource</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Type</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Location</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {resources.map((resource) => (
                            <TableRow key={resource.id} className="bg-white/40 hover:bg-green-50/50 transition-colors">
                              <TableCell className="font-medium text-slate-800">{resource.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-slate-200 text-slate-700">
                                  {resource.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-slate-600">{resource.location}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(resource.status)}>{resource.status}</Badge>
                              </TableCell>
                              <TableCell>
                                <Select
                                  onValueChange={(value) =>
                                    handleResourceStatusChange(resource.id, value as Resource["status"])
                                  }
                                  value={resource.status}
                                >
                                  <SelectTrigger className="w-[140px] bg-white/80 border-slate-200">
                                    <SelectValue placeholder="Change Status" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                                    <SelectItem value="Available">Available</SelectItem>
                                    <SelectItem value="In Use">In Use</SelectItem>
                                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Workload Prediction Tab */}
              <TabsContent value="workload">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2 text-slate-800">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span>Workload Prediction</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Current and predicted workload by department
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={workloadData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="department" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            backdropFilter: "blur(4px)",
                          }}
                        />
                        <Bar dataKey="current" fill="#3b82f6" name="Current Workload" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="predicted" fill="#8b5cf6" name="Predicted Workload" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="capacity" fill="#10b981" name="Capacity" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Optimization Panel */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>AI Optimization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-800">Next Optimization</span>
                    <Badge className="bg-purple-100 text-purple-700">Ready</Badge>
                  </div>
                  <p className="text-xs text-purple-700">Suggested schedule changes available</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Efficiency Gain</span>
                    <span className="text-sm font-bold text-green-600">+12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Cost Reduction</span>
                    <span className="text-sm font-bold text-green-600">$2,400</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white">
                  Apply Optimization
                </Button>
              </CardContent>
            </Card>

            {/* Resource Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Resource Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)} transition-all duration-200`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-slate-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeAlert(alert.id)}
                        className="bg-white/80 hover:bg-red-50 border-red-200"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-slate-500">No active alerts</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Department Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workloadData.map((dept) => (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{dept.department}</span>
                      <Badge variant="outline" className="text-xs">
                        {Math.round((dept.current / dept.capacity) * 100)}%
                      </Badge>
                    </div>
                    <Progress value={(dept.current / dept.capacity) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Current: {dept.current}</span>
                      <span>Capacity: {dept.capacity}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-green-50 border-green-200">
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-blue-50 border-blue-200">
                  Export Schedule
                </Button>
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-purple-50 border-purple-200">
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Resource Utilization */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Activity className="w-5 h-5 text-amber-600" />
                  <span>Resource Utilization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Beds</span>
                    <span className="text-sm font-medium text-slate-800">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Equipment</span>
                    <span className="text-sm font-medium text-slate-800">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Staff</span>
                    <span className="text-sm font-medium text-slate-800">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Operating Rooms</span>
                    <span className="text-sm font-medium text-slate-800">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
