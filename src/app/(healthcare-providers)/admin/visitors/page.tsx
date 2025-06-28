"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Filter,
  LogOut,
  Search,
  UserPlus,
  Users,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Mail,
  AlertTriangle,
} from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"

type Visitor = {
  id: number
  name: string
  contactNumber: string
  visitingPatient: string
  patientRoom: string
  checkInTime: string
  checkOutTime: string | null
  purpose: "Family" | "Medical" | "Other"
  status: "Checked In" | "Checked Out"
  photo?: string
}

const initialVisitors: Visitor[] = [
  {
    id: 1,
    name: "Alice Brown",
    contactNumber: "555-123-4567",
    visitingPatient: "John Doe",
    patientRoom: "204B",
    checkInTime: "09:30",
    checkOutTime: null,
    purpose: "Family",
    status: "Checked In",
  },
  {
    id: 2,
    name: "Bob Wilson",
    contactNumber: "555-987-6543",
    visitingPatient: "Jane Smith",
    patientRoom: "305C",
    checkInTime: "10:15",
    checkOutTime: "11:00",
    purpose: "Medical",
    status: "Checked Out",
  },
  {
    id: 3,
    name: "Carol Davis",
    contactNumber: "555-456-7890",
    visitingPatient: "Mike Johnson",
    patientRoom: "102A",
    checkInTime: "14:20",
    checkOutTime: null,
    purpose: "Family",
    status: "Checked In",
  },
]

export default function VisitorManagement() {
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors)
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>(initialVisitors)
  const [newVisitor, setNewVisitor] = useState({
    name: "",
    contactNumber: "",
    visitingPatient: "",
    patientRoom: "",
    purpose: "Family" as Visitor["purpose"],
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"All" | "Checked In" | "Checked Out">("All")

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date()
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const visitorToAdd: Visitor = {
      ...newVisitor,
      id: Date.now(),
      checkInTime: formattedTime,
      checkOutTime: null,
      status: "Checked In",
    }
    setVisitors((prev) => [...prev, visitorToAdd])
    setFilteredVisitors((prev) => [...prev, visitorToAdd])

    setNewVisitor({
      name: "",
      contactNumber: "",
      visitingPatient: "",
      patientRoom: "",
      purpose: "Family",
    })
  }

  const handleCheckOut = (id: number) => {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    setVisitors((prev) =>
      prev.map((visitor) =>
        visitor.id === id ? { ...visitor, checkOutTime: formattedTime, status: "Checked Out" } : visitor,
      ),
    )
    setFilteredVisitors((prev) =>
      prev.map((visitor) =>
        visitor.id === id ? { ...visitor, checkOutTime: formattedTime, status: "Checked Out" } : visitor,
      ),
    )
  }

  useEffect(() => {
    let result = visitors
    if (searchTerm) {
      result = result.filter(
        (visitor) =>
          visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          visitor.visitingPatient.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (filterStatus !== "All") {
      result = result.filter((visitor) => visitor.status === filterStatus)
    }
    setFilteredVisitors(result)
  }, [searchTerm, filterStatus, visitors])

  const activeVisitors = visitors.filter((v) => v.status === "Checked In").length
  const totalVisitorsToday = visitors.length
  const avgVisitDuration = "2.5 hours"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Visitor Management</h1>
            <p className="text-sm text-slate-600">Track and manage hospital visitors</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-lg">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{activeVisitors} Active</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">{totalVisitorsToday} Today</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Check-In Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-slate-800">
                  <UserPlus className="h-6 w-6 text-purple-600" />
                  <span>Quick Check-In</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleCheckIn} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Input
                    placeholder="Visitor Name"
                    value={newVisitor.name}
                    onChange={(e) => setNewVisitor((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-white/80 border-purple-200 focus:border-purple-400"
                  />
                  <Input
                    placeholder="Contact Number"
                    value={newVisitor.contactNumber}
                    onChange={(e) => setNewVisitor((prev) => ({ ...prev, contactNumber: e.target.value }))}
                    required
                    className="bg-white/80 border-purple-200 focus:border-purple-400"
                  />
                  <Input
                    placeholder="Visiting Patient"
                    value={newVisitor.visitingPatient}
                    onChange={(e) => setNewVisitor((prev) => ({ ...prev, visitingPatient: e.target.value }))}
                    required
                    className="bg-white/80 border-purple-200 focus:border-purple-400"
                  />
                  <Input
                    placeholder="Patient Room"
                    value={newVisitor.patientRoom}
                    onChange={(e) => setNewVisitor((prev) => ({ ...prev, patientRoom: e.target.value }))}
                    required
                    className="bg-white/80 border-purple-200 focus:border-purple-400"
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Check In
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search visitors or patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/80 border-slate-200 focus:border-blue-400"
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-white/80 text-slate-700 hover:bg-blue-50 border-blue-200">
                        <Filter className="mr-2 h-4 w-4" /> Filters
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 backdrop-blur-sm border-blue-100">
                      <DialogHeader>
                        <DialogTitle className="text-slate-800">Filter Visitors</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-700 font-medium">Status</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {["All", "Checked In", "Checked Out"].map((status) => (
                              <Button
                                key={status}
                                variant={filterStatus === status ? "default" : "outline"}
                                onClick={() => setFilterStatus(status as "All" | "Checked In" | "Checked Out")}
                                className={
                                  filterStatus === status
                                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                                    : "bg-white text-slate-700 hover:bg-blue-50 border-blue-200"
                                }
                              >
                                {status}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Visitors Table */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-slate-800">Current Visitors</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-slate-100 to-purple-100">
                        <TableHead className="text-slate-700 font-semibold">Visitor</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Contact</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Patient</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Room</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Check-In</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Check-Out</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVisitors.map((visitor) => (
                        <TableRow key={visitor.id} className="bg-white/40 hover:bg-purple-50/50 transition-colors">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-700 font-semibold text-sm">{visitor.name.charAt(0)}</span>
                              </div>
                              <span className="text-slate-800">{visitor.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-600">{visitor.contactNumber}</TableCell>
                          <TableCell className="text-slate-600">{visitor.visitingPatient}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-600">{visitor.patientRoom}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-600">{visitor.checkInTime}</TableCell>
                          <TableCell className="text-slate-600">{visitor.checkOutTime || "—"}</TableCell>
                          <TableCell>
                            <Badge
                              className={`
                              ${
                                visitor.status === "Checked In"
                                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                                  : "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200"
                              }
                            `}
                            >
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${visitor.status === "Checked In" ? "bg-green-500" : "bg-slate-400"}`}
                              ></div>
                              {visitor.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {visitor.status === "Checked In" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCheckOut(visitor.id)}
                                className="bg-white/80 text-slate-700 hover:bg-rose-50 border-rose-200"
                              >
                                <LogOut className="mr-2 h-4 w-4" /> Check Out
                              </Button>
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

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Today's Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Today's Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Total Visitors</span>
                  <span className="text-lg font-bold text-slate-800">{totalVisitorsToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Currently Active</span>
                  <span className="text-lg font-bold text-green-600">{activeVisitors}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Avg Visit Duration</span>
                  <span className="text-lg font-bold text-slate-800">{avgVisitDuration}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Capacity</span>
                    <span className="text-sm text-slate-600">{activeVisitors}/50</span>
                  </div>
                  <Progress value={(activeVisitors / 50) * 100} className="mt-2 h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Visitor Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Visitor Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Extended Visit</p>
                      <p className="text-xs text-amber-700">Alice Brown has been visiting for 4+ hours</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Users className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">High Traffic</p>
                      <p className="text-xs text-blue-700">ICU area approaching visitor limit</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">Carol Davis checked in</p>
                    <p className="text-xs text-slate-600">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">Bob Wilson checked out</p>
                    <p className="text-xs text-slate-600">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">Security alert cleared</p>
                    <p className="text-xs text-slate-600">30 minutes ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Phone className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Security</p>
                    <p className="text-xs text-slate-600">Ext. 911</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Reception</p>
                    <p className="text-xs text-slate-600">Ext. 100</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Information</p>
                    <p className="text-xs text-slate-600">Ext. 200</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
