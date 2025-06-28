"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Users, UserPlus, Calendar, Clock, TrendingUp, Award, Target, AlertTriangle, Zap } from "lucide-react"

type Employee = {
  id: number
  name: string
  position: string
  department: string
  shift: "Morning" | "Afternoon" | "Night"
  status: "Active" | "On Leave" | "Sick Leave"
  performance: number
  hoursWorked: number
  overtime: number
}

type Shift = {
  id: number
  date: string
  shift: "Morning" | "Afternoon" | "Night"
  department: string
  requiredStaff: number
  assignedStaff: number
  status: "Fully Staffed" | "Understaffed" | "Overstaffed"
}

type LeaveRequest = {
  id: number
  employeeName: string
  type: "Vacation" | "Sick" | "Personal" | "Emergency"
  startDate: string
  endDate: string
  status: "Pending" | "Approved" | "Rejected"
  reason: string
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    position: "Senior Doctor",
    department: "Emergency",
    shift: "Morning",
    status: "Active",
    performance: 95,
    hoursWorked: 160,
    overtime: 12,
  },
  {
    id: 2,
    name: "Nurse Mike Chen",
    position: "Head Nurse",
    department: "ICU",
    shift: "Night",
    status: "Active",
    performance: 88,
    hoursWorked: 168,
    overtime: 8,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    position: "Pediatrician",
    department: "Pediatrics",
    shift: "Afternoon",
    status: "On Leave",
    performance: 92,
    hoursWorked: 140,
    overtime: 0,
  },
  {
    id: 4,
    name: "Nurse David Kim",
    position: "Staff Nurse",
    department: "Surgery",
    shift: "Morning",
    status: "Active",
    performance: 85,
    hoursWorked: 152,
    overtime: 16,
  },
  {
    id: 5,
    name: "Dr. James Wilson",
    position: "Cardiologist",
    department: "Cardiology",
    shift: "Afternoon",
    status: "Sick Leave",
    performance: 90,
    hoursWorked: 120,
    overtime: 4,
  },
]

const initialShifts: Shift[] = [
  {
    id: 1,
    date: "2024-01-25",
    shift: "Morning",
    department: "Emergency",
    requiredStaff: 8,
    assignedStaff: 7,
    status: "Understaffed",
  },
  {
    id: 2,
    date: "2024-01-25",
    shift: "Afternoon",
    department: "ICU",
    requiredStaff: 6,
    assignedStaff: 6,
    status: "Fully Staffed",
  },
  {
    id: 3,
    date: "2024-01-25",
    shift: "Night",
    department: "General Ward",
    requiredStaff: 4,
    assignedStaff: 5,
    status: "Overstaffed",
  },
  {
    id: 4,
    date: "2024-01-26",
    shift: "Morning",
    department: "Surgery",
    requiredStaff: 10,
    assignedStaff: 8,
    status: "Understaffed",
  },
]

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeName: "Dr. Sarah Johnson",
    type: "Vacation",
    startDate: "2024-02-01",
    endDate: "2024-02-07",
    status: "Pending",
    reason: "Family vacation",
  },
  {
    id: 2,
    employeeName: "Nurse Mike Chen",
    type: "Sick",
    startDate: "2024-01-26",
    endDate: "2024-01-28",
    status: "Approved",
    reason: "Flu symptoms",
  },
  {
    id: 3,
    employeeName: "Dr. Emily Rodriguez",
    type: "Personal",
    startDate: "2024-02-15",
    endDate: "2024-02-16",
    status: "Pending",
    reason: "Personal matters",
  },
]

const performanceData = [
  { department: "Emergency", performance: 92, satisfaction: 88 },
  { department: "ICU", performance: 89, satisfaction: 91 },
  { department: "Surgery", performance: 94, satisfaction: 87 },
  { department: "Pediatrics", performance: 91, satisfaction: 93 },
  { department: "Cardiology", performance: 88, satisfaction: 89 },
]

export default function ManagementSystem() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [shifts, setShifts] = useState<Shift[]>(initialShifts)
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "",
    shift: "Morning" as Employee["shift"],
  })

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.department) {
      const employeeToAdd: Employee = {
        id: employees.length + 1,
        name: newEmployee.name,
        position: newEmployee.position,
        department: newEmployee.department,
        shift: newEmployee.shift,
        status: "Active",
        performance: 85,
        hoursWorked: 160,
        overtime: 0,
      }
      setEmployees([...employees, employeeToAdd])
      setNewEmployee({ name: "", position: "", department: "", shift: "Morning" })
    }
  }

  const handleLeaveRequestAction = (id: number, action: "Approved" | "Rejected") => {
    setLeaveRequests(leaveRequests.map((request) => (request.id === id ? { ...request, status: action } : request)))
  }

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "Active":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200"
      case "On Leave":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200"
      case "Sick Leave":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getShiftStatusColor = (status: Shift["status"]) => {
    switch (status) {
      case "Fully Staffed":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200"
      case "Understaffed":
        return "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200"
      case "Overstaffed":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getLeaveStatusColor = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200"
      case "Pending":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200"
      case "Rejected":
        return "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const activeEmployees = employees.filter((emp) => emp.status === "Active").length
  const avgPerformance = Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length)
  const totalOvertime = employees.reduce((sum, emp) => sum + emp.overtime, 0)
  const pendingLeaves = leaveRequests.filter((req) => req.status === "Pending").length

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Workforce Management</h1>
            <p className="text-sm text-slate-600">Comprehensive staff management and scheduling system</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-lg">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{activeEmployees} Active</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-amber-100 rounded-lg">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">{pendingLeaves} Pending</span>
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
              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Staff</p>
                      <p className="text-2xl font-bold text-slate-800">{employees.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Active Staff</p>
                      <p className="text-2xl font-bold text-slate-800">{activeEmployees}</p>
                    </div>
                    <UserPlus className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Avg Performance</p>
                      <p className="text-2xl font-bold text-slate-800">{avgPerformance}%</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Overtime</p>
                      <p className="text-2xl font-bold text-slate-800">{totalOvertime}h</p>
                    </div>
                    <Clock className="w-8 h-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="employees" className="space-y-6">
              <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200 p-1">
                <TabsTrigger
                  value="employees"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Employee Management
                </TabsTrigger>
                <TabsTrigger
                  value="scheduling"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  Shift Scheduling
                </TabsTrigger>
                <TabsTrigger
                  value="leaves"
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                >
                  Leave Management
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Performance
                </TabsTrigger>
              </TabsList>

              {/* Employee Management Tab */}
              <TabsContent value="employees">
                <div className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2 text-slate-800">
                        <UserPlus className="w-5 h-5 text-green-600" />
                        <span>Add New Employee</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input
                          placeholder="Full Name"
                          value={newEmployee.name}
                          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                          className="bg-white/80 border-green-200 focus:border-green-400"
                        />
                        <Input
                          placeholder="Position"
                          value={newEmployee.position}
                          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                          className="bg-white/80 border-green-200 focus:border-green-400"
                        />
                        <Input
                          placeholder="Department"
                          value={newEmployee.department}
                          onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                          className="bg-white/80 border-green-200 focus:border-green-400"
                        />
                        <Select
                          value={newEmployee.shift}
                          onValueChange={(value) =>
                            setNewEmployee({ ...newEmployee, shift: value as Employee["shift"] })
                          }
                        >
                          <SelectTrigger className="bg-white/80 border-green-200">
                            <SelectValue placeholder="Shift" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-sm">
                            <SelectItem value="Morning">Morning</SelectItem>
                            <SelectItem value="Afternoon">Afternoon</SelectItem>
                            <SelectItem value="Night">Night</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={handleAddEmployee}
                        className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Employee
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50 rounded-t-lg">
                      <CardTitle className="text-slate-800">Employee Directory</CardTitle>
                      <CardDescription className="text-slate-600">Manage staff information and status</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gradient-to-r from-slate-100 to-green-100">
                              <TableHead className="text-slate-700 font-semibold">Employee</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Position</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Department</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Shift</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Performance</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Hours</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {employees.map((employee) => (
                              <TableRow
                                key={employee.id}
                                className="bg-white/40 hover:bg-green-50/50 transition-colors"
                              >
                                <TableCell className="font-medium">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                                      <span className="text-green-700 font-semibold text-sm">
                                        {employee.name.charAt(0)}
                                      </span>
                                    </div>
                                    <span className="text-slate-800">{employee.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-slate-600">{employee.position}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="border-slate-200 text-slate-700">
                                    {employee.department}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                                    {employee.shift}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Progress value={employee.performance} className="w-16 h-2" />
                                    <span className="text-sm font-medium text-slate-600">{employee.performance}%</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  {employee.hoursWorked}h
                                  {employee.overtime > 0 && (
                                    <span className="text-amber-600 text-xs ml-1">(+{employee.overtime}h OT)</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Shift Scheduling Tab */}
              <TabsContent value="scheduling">
                <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2 text-slate-800">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Shift Schedule</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600">Manage staff scheduling and coverage</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-slate-100 to-blue-100">
                            <TableHead className="text-slate-700 font-semibold">Date</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Shift</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Department</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Required</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Assigned</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Coverage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {shifts.map((shift) => {
                            const coverage = (shift.assignedStaff / shift.requiredStaff) * 100
                            return (
                              <TableRow key={shift.id} className="bg-white/40 hover:bg-blue-50/50 transition-colors">
                                <TableCell className="font-medium text-slate-800">{shift.date}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                                    {shift.shift}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-slate-600">{shift.department}</TableCell>
                                <TableCell className="text-slate-600">{shift.requiredStaff}</TableCell>
                                <TableCell className="text-slate-600">{shift.assignedStaff}</TableCell>
                                <TableCell>
                                  <Badge className={getShiftStatusColor(shift.status)}>{shift.status}</Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Progress value={coverage} className="w-16 h-2" />
                                    <span className="text-sm font-medium text-slate-600">{coverage.toFixed(0)}%</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Leave Management Tab */}
              <TabsContent value="leaves">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2 text-slate-800">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span>Leave Requests</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Review and manage employee leave requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-slate-100 to-purple-100">
                            <TableHead className="text-slate-700 font-semibold">Employee</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Type</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Start Date</TableHead>
                            <TableHead className="text-slate-700 font-semibold">End Date</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leaveRequests.map((request) => (
                            <TableRow key={request.id} className="bg-white/40 hover:bg-purple-50/50 transition-colors">
                              <TableCell className="font-medium text-slate-800">{request.employeeName}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-slate-200 text-slate-700">
                                  {request.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-slate-600">{request.startDate}</TableCell>
                              <TableCell className="text-slate-600">{request.endDate}</TableCell>
                              <TableCell>
                                <Badge className={getLeaveStatusColor(request.status)}>{request.status}</Badge>
                              </TableCell>
                              <TableCell>
                                {request.status === "Pending" && (
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      onClick={() => handleLeaveRequestAction(request.id, "Approved")}
                                      className="bg-green-500 hover:bg-green-600 text-white"
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleLeaveRequestAction(request.id, "Rejected")}
                                      className="border-red-200 text-red-700 hover:bg-red-50"
                                    >
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance">
                <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2 text-slate-800">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      <span>Department Performance</span>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Performance metrics and satisfaction scores by department
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={performanceData}>
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
                        <Bar dataKey="performance" fill="#f59e0b" name="Performance %" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="satisfaction" fill="#3b82f6" name="Satisfaction %" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Staff Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Staff Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Total Employees</span>
                  <span className="text-lg font-bold text-slate-800">{employees.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Active Staff</span>
                  <span className="text-lg font-bold text-green-600">{activeEmployees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">On Leave</span>
                  <span className="text-lg font-bold text-blue-600">
                    {employees.filter((emp) => emp.status === "On Leave").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Sick Leave</span>
                  <span className="text-lg font-bold text-amber-600">
                    {employees.filter((emp) => emp.status === "Sick Leave").length}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Attendance Rate</span>
                    <Badge className="bg-green-100 text-green-700">
                      {Math.round((activeEmployees / employees.length) * 100)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shift Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Shift Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shifts
                  .filter((shift) => shift.status === "Understaffed")
                  .map((shift) => (
                    <div key={shift.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-800">
                            {shift.department} - {shift.shift} Shift
                          </p>
                          <p className="text-xs text-red-700">
                            {shift.assignedStaff}/{shift.requiredStaff} staff assigned
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {shifts.filter((shift) => shift.status === "Understaffed").length === 0 && (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-slate-500">All shifts adequately staffed</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span>Performance Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Average Performance</span>
                    <span className="text-sm font-medium text-slate-800">{avgPerformance}%</span>
                  </div>
                  <Progress value={avgPerformance} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Top Performers</span>
                    <span className="text-sm font-medium text-slate-800">
                      {employees.filter((emp) => emp.performance >= 90).length}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Needs Improvement</span>
                    <span className="text-sm font-medium text-slate-800">
                      {employees.filter((emp) => emp.performance < 80).length}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Total Overtime</span>
                    <span className="text-sm text-slate-600">{totalOvertime} hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span>Pending Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div>
                    <p className="text-sm font-medium text-amber-800">Leave Requests</p>
                    <p className="text-xs text-amber-700">{pendingLeaves} pending approval</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700">{pendingLeaves}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Performance Reviews</p>
                    <p className="text-xs text-blue-700">3 reviews due this month</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">3</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="text-sm font-medium text-green-800">Training Sessions</p>
                    <p className="text-xs text-green-700">2 sessions scheduled</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">2</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Zap className="w-5 h-5 text-slate-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-white/80 text-slate-700 hover:bg-green-50 border-green-200"
                >
                  Generate Schedule
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/80 text-slate-700 hover:bg-blue-50 border-blue-200"
                >
                  Export Staff Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/80 text-slate-700 hover:bg-purple-50 border-purple-200"
                >
                  Performance Review
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
