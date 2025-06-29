"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Plus, Search, RefreshCw, Clock, Phone, Mail, Edit, Trash2, CheckCircle, X } from "lucide-react"

type Appointment = {
  id: number
  patientName: string
  patientPhone: string
  patientEmail: string
  date: string
  time: string
  type: string
  status: "Scheduled" | "Confirmed" | "In Progress" | "Completed" | "Cancelled"
  duration: number
  notes: string
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "John Doe",
    patientPhone: "+1 234 567 8900",
    patientEmail: "john.doe@email.com",
    date: "2024-01-15",
    time: "09:00",
    type: "Consultation",
    status: "Confirmed",
    duration: 30,
    notes: "Regular checkup",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientPhone: "+1 234 567 8901",
    patientEmail: "jane.smith@email.com",
    date: "2024-01-15",
    time: "10:30",
    type: "Follow-up",
    status: "Scheduled",
    duration: 20,
    notes: "Diabetes follow-up",
  },
  {
    id: 3,
    patientName: "Michael Johnson",
    patientPhone: "+1 234 567 8902",
    patientEmail: "michael.j@email.com",
    date: "2024-01-15",
    time: "14:00",
    type: "Emergency",
    status: "In Progress",
    duration: 45,
    notes: "Chest pain evaluation",
  },
  {
    id: 4,
    patientName: "Sarah Wilson",
    patientPhone: "+1 234 567 8903",
    patientEmail: "sarah.wilson@email.com",
    date: "2024-01-16",
    time: "11:00",
    type: "Consultation",
    status: "Scheduled",
    duration: 30,
    notes: "New patient consultation",
  },
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(mockAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    date: "",
    time: "",
    type: "",
    duration: "30",
    notes: "",
  })

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterAppointments(term, statusFilter, typeFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterAppointments(searchTerm, status, typeFilter)
  }

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type)
    filterAppointments(searchTerm, statusFilter, type)
  }

  const filterAppointments = (search: string, status: string, type: string) => {
    let filtered = appointments

    if (search) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.patientName.toLowerCase().includes(search.toLowerCase()) ||
          appointment.patientEmail.toLowerCase().includes(search.toLowerCase()) ||
          appointment.type.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((appointment) => appointment.status.toLowerCase() === status.toLowerCase())
    }

    if (type !== "all") {
      filtered = filtered.filter((appointment) => appointment.type.toLowerCase() === type.toLowerCase())
    }

    setFilteredAppointments(filtered)
  }

  const handleCreateAppointment = async () => {
    if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time || !newAppointment.type) {
      alert("Please fill in all required fields")
      return
    }

    setIsCreatingAppointment(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const appointment: Appointment = {
        id: appointments.length + 1,
        patientName: newAppointment.patientName,
        patientPhone: newAppointment.patientPhone,
        patientEmail: newAppointment.patientEmail,
        date: newAppointment.date,
        time: newAppointment.time,
        type: newAppointment.type,
        status: "Scheduled",
        duration: Number.parseInt(newAppointment.duration),
        notes: newAppointment.notes,
      }

      const updatedAppointments = [...appointments, appointment]
      setAppointments(updatedAppointments)
      setFilteredAppointments(updatedAppointments)

      setNewAppointment({
        patientName: "",
        patientPhone: "",
        patientEmail: "",
        date: "",
        time: "",
        type: "",
        duration: "30",
        notes: "",
      })

      console.log("Appointment created successfully")
      alert("Appointment scheduled successfully!")
    } catch (error) {
      console.error("Error creating appointment:", error)
      alert("Error scheduling appointment. Please try again.")
    } finally {
      setIsCreatingAppointment(false)
    }
  }

  const handleUpdateStatus = async (appointmentId: number, newStatus: Appointment["status"]) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt)))
      setFilteredAppointments((prev) =>
        prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt)),
      )

      console.log(`Appointment ${appointmentId} status updated to ${newStatus}`)
    } catch (error) {
      console.error("Error updating appointment status:", error)
    }
  }

  const handleDeleteAppointment = async (appointmentId: number) => {
    if (!confirm("Are you sure you want to delete this appointment?")) {
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedAppointments = appointments.filter((apt) => apt.id !== appointmentId)
      setAppointments(updatedAppointments)
      setFilteredAppointments(updatedAppointments)

      console.log(`Appointment ${appointmentId} deleted`)
      alert("Appointment deleted successfully!")
    } catch (error) {
      console.error("Error deleting appointment:", error)
      alert("Error deleting appointment. Please try again.")
    }
  }

  const handleRefreshAppointments = async () => {
    setIsRefreshing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Appointments refreshed")
    } catch (error) {
      console.error("Error refreshing appointments:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setTypeFilter("all")
    setFilteredAppointments(appointments)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border-green-200"
      case "Scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "In Progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Completed":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getTodaysAppointments = () => {
    const today = new Date().toISOString().split("T")[0]
    return appointments.filter((apt) => apt.date === today)
  }

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split("T")[0]
    return appointments.filter((apt) => apt.date > today).slice(0, 5)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Appointments
          </h1>
          <p className="text-slate-600">Manage your patient appointments and schedule</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleRefreshAppointments}
            disabled={isRefreshing}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>Create a new appointment for a patient.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patientName" className="text-slate-700 font-medium">
                    Patient Name *
                  </Label>
                  <Input
                    id="patientName"
                    value={newAppointment.patientName}
                    onChange={(e) => setNewAppointment((prev) => ({ ...prev, patientName: e.target.value }))}
                    className="mt-1 border-slate-200 focus:border-blue-400"
                    placeholder="Enter patient name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="appointmentDate" className="text-slate-700 font-medium">
                      Date *
                    </Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment((prev) => ({ ...prev, date: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="appointmentTime" className="text-slate-700 font-medium">
                      Time *
                    </Label>
                    <Input
                      id="appointmentTime"
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment((prev) => ({ ...prev, time: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-blue-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="appointmentType" className="text-slate-700 font-medium">
                      Type *
                    </Label>
                    <Select
                      value={newAppointment.type}
                      onValueChange={(value) => setNewAppointment((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="mt-1 border-slate-200 focus:border-blue-400">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consultation">Consultation</SelectItem>
                        <SelectItem value="Follow-up">Follow-up</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Checkup">Checkup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="appointmentDuration" className="text-slate-700 font-medium">
                      Duration (min)
                    </Label>
                    <Select
                      value={newAppointment.duration}
                      onValueChange={(value) => setNewAppointment((prev) => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger className="mt-1 border-slate-200 focus:border-blue-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="patientPhone" className="text-slate-700 font-medium">
                    Phone
                  </Label>
                  <Input
                    id="patientPhone"
                    value={newAppointment.patientPhone}
                    onChange={(e) => setNewAppointment((prev) => ({ ...prev, patientPhone: e.target.value }))}
                    className="mt-1 border-slate-200 focus:border-blue-400"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <Label htmlFor="patientEmail" className="text-slate-700 font-medium">
                    Email
                  </Label>
                  <Input
                    id="patientEmail"
                    type="email"
                    value={newAppointment.patientEmail}
                    onChange={(e) => setNewAppointment((prev) => ({ ...prev, patientEmail: e.target.value }))}
                    className="mt-1 border-slate-200 focus:border-blue-400"
                    placeholder="patient@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="appointmentNotes" className="text-slate-700 font-medium">
                    Notes
                  </Label>
                  <Input
                    id="appointmentNotes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment((prev) => ({ ...prev, notes: e.target.value }))}
                    className="mt-1 border-slate-200 focus:border-blue-400"
                    placeholder="Additional notes"
                  />
                </div>
                <Button
                  onClick={handleCreateAppointment}
                  disabled={isCreatingAppointment}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                >
                  {isCreatingAppointment ? "Scheduling..." : "Schedule Appointment"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-indigo-100"
          >
            All Appointments
          </TabsTrigger>
          <TabsTrigger
            value="today"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-indigo-100"
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-indigo-100"
          >
            Upcoming
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-700">All Appointments</CardTitle>
                  <CardDescription className="text-slate-600">
                    {filteredAppointments.length} of {appointments.length} appointments
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 w-64 border-slate-200 focus:border-blue-400"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={handleStatusFilter}>
                    <SelectTrigger className="w-32 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={handleTypeFilter}>
                    <SelectTrigger className="w-32 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="checkup">Checkup</SelectItem>
                    </SelectContent>
                  </Select>
                  {(searchTerm || statusFilter !== "all" || typeFilter !== "all") && (
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="border-slate-200 hover:bg-slate-50 bg-transparent"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-slate-700">Patient</TableHead>
                    <TableHead className="text-slate-700">Date & Time</TableHead>
                    <TableHead className="text-slate-700">Type</TableHead>
                    <TableHead className="text-slate-700">Duration</TableHead>
                    <TableHead className="text-slate-700">Status</TableHead>
                    <TableHead className="text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-700">{appointment.patientName}</div>
                          <div className="text-sm text-slate-600 space-y-1">
                            {appointment.patientPhone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>{appointment.patientPhone}</span>
                              </div>
                            )}
                            {appointment.patientEmail && (
                              <div className="flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span>{appointment.patientEmail}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <div>
                            <div className="text-slate-700">{appointment.date}</div>
                            <div className="text-sm text-slate-600">{appointment.time}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{appointment.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-600">{appointment.duration} min</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(appointment.status)}>{appointment.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {appointment.status === "Scheduled" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(appointment.id, "Confirmed")}
                              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                          )}
                          {appointment.status === "Confirmed" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(appointment.id, "In Progress")}
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                            >
                              Start
                            </Button>
                          )}
                          {appointment.status === "In Progress" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(appointment.id, "Completed")}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            >
                              Complete
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedAppointment(appointment)}
                            className="border-slate-200 hover:bg-slate-50"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
              <CardTitle className="text-slate-700">Today's Appointments</CardTitle>
              <CardDescription className="text-slate-600">
                {getTodaysAppointments().length} appointments scheduled for today
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {getTodaysAppointments().length > 0 ? (
                <div className="space-y-4">
                  {getTodaysAppointments().map((appointment) => (
                    <div key={appointment.id} className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-700">{appointment.patientName}</h4>
                          <p className="text-sm text-slate-600">
                            {appointment.time} - {appointment.type}
                          </p>
                          {appointment.notes && <p className="text-sm text-slate-500 mt-1">{appointment.notes}</p>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusBadgeColor(appointment.status)}>{appointment.status}</Badge>
                          <div className="text-sm text-slate-600">{appointment.duration} min</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">No appointments scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
              <CardTitle className="text-slate-700">Upcoming Appointments</CardTitle>
              <CardDescription className="text-slate-600">
                Next {getUpcomingAppointments().length} upcoming appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {getUpcomingAppointments().length > 0 ? (
                <div className="space-y-4">
                  {getUpcomingAppointments().map((appointment) => (
                    <div key={appointment.id} className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-700">{appointment.patientName}</h4>
                          <p className="text-sm text-slate-600">
                            {appointment.date} at {appointment.time} - {appointment.type}
                          </p>
                          {appointment.notes && <p className="text-sm text-slate-500 mt-1">{appointment.notes}</p>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusBadgeColor(appointment.status)}>{appointment.status}</Badge>
                          <div className="text-sm text-slate-600">{appointment.duration} min</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">No upcoming appointments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
