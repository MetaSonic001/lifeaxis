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
import { Search, Plus, Download, RefreshCw, Eye, Edit, Phone, Mail, Calendar, X } from "lucide-react"

type Patient = {
  id: number
  name: string
  age: number
  gender: string
  phone: string
  email: string
  lastVisit: string
  condition: string
  status: "Active" | "Inactive" | "Critical"
}

const mockPatients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "+1 234 567 8900",
    email: "john.doe@email.com",
    lastVisit: "2024-01-15",
    condition: "Hypertension",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    phone: "+1 234 567 8901",
    email: "jane.smith@email.com",
    lastVisit: "2024-01-10",
    condition: "Diabetes",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 58,
    gender: "Male",
    phone: "+1 234 567 8902",
    email: "michael.j@email.com",
    lastVisit: "2024-01-08",
    condition: "Heart Disease",
    status: "Critical",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    age: 29,
    gender: "Female",
    phone: "+1 234 567 8903",
    email: "sarah.wilson@email.com",
    lastVisit: "2024-01-12",
    condition: "Asthma",
    status: "Active",
  },
  {
    id: 5,
    name: "Robert Brown",
    age: 67,
    gender: "Male",
    phone: "+1 234 567 8904",
    email: "robert.brown@email.com",
    lastVisit: "2023-12-20",
    condition: "Arthritis",
    status: "Inactive",
  },
]

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [genderFilter, setGenderFilter] = useState<string>("all")
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    condition: "",
  })

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterPatients(term, statusFilter, genderFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterPatients(searchTerm, status, genderFilter)
  }

  const handleGenderFilter = (gender: string) => {
    setGenderFilter(gender)
    filterPatients(searchTerm, statusFilter, gender)
  }

  const filterPatients = (search: string, status: string, gender: string) => {
    let filtered = patients

    if (search) {
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(search.toLowerCase()) ||
          patient.condition.toLowerCase().includes(search.toLowerCase()) ||
          patient.email.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((patient) => patient.status.toLowerCase() === status.toLowerCase())
    }

    if (gender !== "all") {
      filtered = filtered.filter((patient) => patient.gender.toLowerCase() === gender.toLowerCase())
    }

    setFilteredPatients(filtered)
  }

  const handleAddPatient = async () => {
    if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.phone) {
      alert("Please fill in all required fields")
      return
    }

    setIsAddingPatient(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const patient: Patient = {
        id: patients.length + 1,
        name: newPatient.name,
        age: Number.parseInt(newPatient.age),
        gender: newPatient.gender,
        phone: newPatient.phone,
        email: newPatient.email,
        lastVisit: new Date().toISOString().split("T")[0],
        condition: newPatient.condition || "General Checkup",
        status: "Active",
      }

      const updatedPatients = [...patients, patient]
      setPatients(updatedPatients)
      setFilteredPatients(updatedPatients)

      setNewPatient({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        condition: "",
      })

      console.log("Patient added successfully")
      alert("Patient added successfully!")
    } catch (error) {
      console.error("Error adding patient:", error)
      alert("Error adding patient. Please try again.")
    } finally {
      setIsAddingPatient(false)
    }
  }

  const handleRefreshPatients = async () => {
    setIsRefreshing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Simulate data refresh
      console.log("Patient data refreshed")
    } catch (error) {
      console.error("Error refreshing patients:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleExportPatients = async () => {
    setIsExporting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const csvData = [
        "Name,Age,Gender,Phone,Email,Last Visit,Condition,Status",
        ...filteredPatients.map(
          (p) => `${p.name},${p.age},${p.gender},${p.phone},${p.email},${p.lastVisit},${p.condition},${p.status}`,
        ),
      ].join("\n")

      const blob = new Blob([csvData], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "patients-list.csv"
      a.click()
      URL.revokeObjectURL(url)

      console.log("Patient data exported successfully")
    } catch (error) {
      console.error("Error exporting patients:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setGenderFilter("all")
    setFilteredPatients(patients)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200"
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200"
      case "Inactive":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-blue-100 text-blue-700 border-blue-200"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Patients
          </h1>
          <p className="text-slate-600">Manage your patient records and information</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleRefreshPatients}
            disabled={isRefreshing}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            variant="outline"
            onClick={handleExportPatients}
            disabled={isExporting}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>Enter the patient's information to add them to your records.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patientName" className="text-slate-700 font-medium">
                    Name *
                  </Label>
                  <Input
                    id="patientName"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient((prev) => ({ ...prev, name: e.target.value }))}
                    className="mt-1 border-slate-200 focus:border-green-400"
                    placeholder="Enter patient name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientAge" className="text-slate-700 font-medium">
                      Age *
                    </Label>
                    <Input
                      id="patientAge"
                      type="number"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient((prev) => ({ ...prev, age: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-green-400"
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientGender" className="text-slate-700 font-medium">
                      Gender *
                    </Label>
                    <Select
                      value={newPatient.gender}
                      onValueChange={(value) => setNewPatient((prev) => ({ ...prev, gender: value }))}
                    >
                      <SelectTrigger className="mt-1 border-slate-200 focus:border-green-400">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="patientPhone" className="text-slate-700 font-medium">
                    Phone *
                  </Label>
                  <Input
                    id="patientPhone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient((prev) => ({ ...prev, phone: e.target.value }))}
                    className="mt-1 border-slate-200 focus:border-green-400"
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
                    value={newPatient.email}
                    onChange={(e) => setNewPatient((prev) => ({ ...prev, email: e.target.value }))}
                    className="mt-1 border-slate-200 focus:border-green-400"
                    placeholder="patient@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="patientCondition" className="text-slate-700 font-medium">
                    Condition
                  </Label>
                  <Input
                    id="patientCondition"
                    value={newPatient.condition}
                    onChange={(e) => setNewPatient((prev) => ({ ...prev, condition: e.target.value }))}
                    className="mt-1 border-slate-200 focus:border-green-400"
                    placeholder="Primary condition or reason for visit"
                  />
                </div>
                <Button
                  onClick={handleAddPatient}
                  disabled={isAddingPatient}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                >
                  {isAddingPatient ? "Adding Patient..." : "Add Patient"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <TabsTrigger
            value="list"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-blue-100"
          >
            Patient List
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-blue-100"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-700">Patient Records</CardTitle>
                  <CardDescription className="text-slate-600">
                    {filteredPatients.length} of {patients.length} patients
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 w-64 border-slate-200 focus:border-green-400"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={handleStatusFilter}>
                    <SelectTrigger className="w-32 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={genderFilter} onValueChange={handleGenderFilter}>
                    <SelectTrigger className="w-32 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Gender</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {(searchTerm || statusFilter !== "all" || genderFilter !== "all") && (
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
                    <TableHead className="text-slate-700">Name</TableHead>
                    <TableHead className="text-slate-700">Age</TableHead>
                    <TableHead className="text-slate-700">Gender</TableHead>
                    <TableHead className="text-slate-700">Contact</TableHead>
                    <TableHead className="text-slate-700">Last Visit</TableHead>
                    <TableHead className="text-slate-700">Condition</TableHead>
                    <TableHead className="text-slate-700">Status</TableHead>
                    <TableHead className="text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-700">{patient.name}</TableCell>
                      <TableCell className="text-slate-600">{patient.age}</TableCell>
                      <TableCell className="text-slate-600">{patient.gender}</TableCell>
                      <TableCell className="text-slate-600">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span className="text-xs">{patient.phone}</span>
                          </div>
                          {patient.email && (
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span className="text-xs">{patient.email}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{patient.lastVisit}</TableCell>
                      <TableCell className="text-slate-600">{patient.condition}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(patient.status)}>{patient.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPatient(patient)}
                            className="border-slate-200 hover:bg-slate-50"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => console.log(`Edit patient ${patient.id}`)}
                            className="border-slate-200 hover:bg-slate-50"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                            onClick={() => console.log(`Schedule appointment for ${patient.name}`)}
                          >
                            <Calendar className="w-3 h-3" />
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

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg pb-3">
                <CardTitle className="text-slate-700 text-lg">Total Patients</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-slate-700">{patients.length}</div>
                <p className="text-slate-600 text-sm">Registered patients</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg pb-3">
                <CardTitle className="text-slate-700 text-lg">Active Patients</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-slate-700">
                  {patients.filter((p) => p.status === "Active").length}
                </div>
                <p className="text-slate-600 text-sm">Currently active</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100 rounded-t-lg pb-3">
                <CardTitle className="text-slate-700 text-lg">Critical Cases</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-slate-700">
                  {patients.filter((p) => p.status === "Critical").length}
                </div>
                <p className="text-slate-600 text-sm">Require attention</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg pb-3">
                <CardTitle className="text-slate-700 text-lg">Average Age</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-slate-700">
                  {Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)}
                </div>
                <p className="text-slate-600 text-sm">Years old</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Patient Details</span>
                <Badge className={getStatusBadgeColor(selectedPatient.status)}>{selectedPatient.status}</Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label className="text-slate-700 font-medium">Full Name</Label>
                  <p className="text-slate-600">{selectedPatient.name}</p>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Age</Label>
                  <p className="text-slate-600">{selectedPatient.age} years old</p>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Gender</Label>
                  <p className="text-slate-600">{selectedPatient.gender}</p>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Primary Condition</Label>
                  <p className="text-slate-600">{selectedPatient.condition}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-slate-700 font-medium">Phone Number</Label>
                  <p className="text-slate-600">{selectedPatient.phone}</p>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Email Address</Label>
                  <p className="text-slate-600">{selectedPatient.email || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Last Visit</Label>
                  <p className="text-slate-600">{selectedPatient.lastVisit}</p>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Patient Status</Label>
                  <p className="text-slate-600">{selectedPatient.status}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => console.log(`Edit ${selectedPatient.name}`)}
                className="border-slate-200 hover:bg-slate-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Patient
              </Button>
              <Button
                onClick={() => console.log(`Schedule appointment for ${selectedPatient.name}`)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
