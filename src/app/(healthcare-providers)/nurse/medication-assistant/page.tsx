"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pill, Scan, Clock, AlertTriangle, CheckCircle2, Shield, Search, RefreshCw, FileText } from "lucide-react"
import { useState } from "react"

type Medication = {
  id: number
  patientName: string
  patientId: string
  room: string
  medicationName: string
  dosage: string
  route: "oral" | "IV" | "injection" | "topical"
  frequency: string
  scheduledTime: string
  status: "pending" | "administered" | "overdue" | "skipped"
  prescribedBy: string
  notes?: string
  barcode: string
  allergies?: string[]
  interactions?: string[]
}

const mockMedications: Medication[] = [
  {
    id: 1,
    patientName: "John Doe",
    patientId: "P001",
    room: "101A",
    medicationName: "Morphine",
    dosage: "10mg",
    route: "IV",
    frequency: "Every 4 hours",
    scheduledTime: "09:00",
    status: "pending",
    prescribedBy: "Dr. Smith",
    barcode: "123456789012",
    allergies: ["Penicillin"],
    interactions: [],
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientId: "P002",
    room: "102B",
    medicationName: "Lisinopril",
    dosage: "5mg",
    route: "oral",
    frequency: "Once daily",
    scheduledTime: "08:00",
    status: "overdue",
    prescribedBy: "Dr. Johnson",
    barcode: "123456789013",
    allergies: [],
    interactions: ["Potassium supplements"],
  },
  {
    id: 3,
    patientName: "Bob Johnson",
    patientId: "P003",
    room: "103C",
    medicationName: "Insulin",
    dosage: "20 units",
    route: "injection",
    frequency: "Before meals",
    scheduledTime: "12:00",
    status: "pending",
    prescribedBy: "Dr. Brown",
    barcode: "123456789014",
    allergies: [],
    interactions: [],
  },
  {
    id: 4,
    patientName: "Alice Brown",
    patientId: "P004",
    room: "104A",
    medicationName: "Aspirin",
    dosage: "81mg",
    route: "oral",
    frequency: "Once daily",
    scheduledTime: "07:30",
    status: "administered",
    prescribedBy: "Dr. Wilson",
    barcode: "123456789015",
    allergies: [],
    interactions: [],
  },
]

export default function MedicationAssistant() {
  const [medications, setMedications] = useState<Medication[]>(mockMedications)
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null)
  const [scanMode, setScanMode] = useState(false)
  const [scannedBarcode, setScannedBarcode] = useState("")
  const [filter, setFilter] = useState<"all" | "pending" | "overdue" | "administered">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleAdminister = (id: number, notes?: string) => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === id
          ? {
              ...med,
              status: "administered" as const,
              notes: notes || med.notes,
            }
          : med,
      ),
    )
    setSelectedMed(null)
    alert("Medication administered successfully!")
  }

  const handleSkip = (id: number, reason: string) => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === id
          ? {
              ...med,
              status: "skipped" as const,
              notes: `Skipped: ${reason}`,
            }
          : med,
      ),
    )
    setSelectedMed(null)
  }

  const handleBarcodeScanner = () => {
    setScanMode(true)
    // Simulate barcode scanning
    setTimeout(() => {
      const randomBarcode = medications[Math.floor(Math.random() * medications.length)].barcode
      setScannedBarcode(randomBarcode)
      const foundMed = medications.find((med) => med.barcode === randomBarcode)
      if (foundMed) {
        setSelectedMed(foundMed)
        alert(`Medication found: ${foundMed.medicationName} for ${foundMed.patientName}`)
      }
      setScanMode(false)
    }, 2000)
  }

  const filteredMedications = medications.filter((med) => {
    const matchesFilter = filter === "all" || med.status === filter
    const matchesSearch =
      med.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.room.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "administered":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "skipped":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRouteColor = (route: string) => {
    switch (route) {
      case "IV":
        return "bg-purple-100 text-purple-800"
      case "oral":
        return "bg-blue-100 text-blue-800"
      case "injection":
        return "bg-red-100 text-red-800"
      case "topical":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingCount = medications.filter((med) => med.status === "pending").length
  const overdueCount = medications.filter((med) => med.status === "overdue").length
  const administeredCount = medications.filter((med) => med.status === "administered").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Medication Administration Assistant</h1>
            <p className="text-slate-600">Barcode verification and medication tracking system</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleBarcodeScanner} disabled={scanMode} className="bg-blue-600 hover:bg-blue-700">
              {scanMode ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Scan className="h-4 w-4 mr-2" />
                  Scan Barcode
                </>
              )}
            </Button>
            <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Pending</p>
                <p className="text-2xl font-bold text-blue-800">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Overdue</p>
                <p className="text-2xl font-bold text-red-800">{overdueCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Administered</p>
                <p className="text-2xl font-bold text-green-800">{administeredCount}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total Meds</p>
                <p className="text-2xl font-bold text-purple-800">{medications.length}</p>
              </div>
              <Pill className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search patients or medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="administered">Administered</option>
          </select>
        </div>
      </div>

      {/* Medication List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMedications.map((med) => (
          <Card
            key={med.id}
            className="bg-white shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold text-slate-800 mb-2">{med.medicationName}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={`${getStatusColor(med.status)} border text-xs`}>{med.status.toUpperCase()}</Badge>
                    <Badge className={`${getRouteColor(med.route)} text-xs`}>{med.route.toUpperCase()}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">
                    {med.patientName} • Room {med.room}
                  </p>
                </div>
                {med.status === "overdue" && <AlertTriangle className="h-5 w-5 text-red-500" />}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Dosage</p>
                  <p className="font-medium text-slate-800">{med.dosage}</p>
                </div>
                <div>
                  <p className="text-slate-600">Scheduled Time</p>
                  <p className="font-medium text-slate-800">{med.scheduledTime}</p>
                </div>
                <div>
                  <p className="text-slate-600">Frequency</p>
                  <p className="font-medium text-slate-800">{med.frequency}</p>
                </div>
                <div>
                  <p className="text-slate-600">Prescribed By</p>
                  <p className="font-medium text-slate-800">{med.prescribedBy}</p>
                </div>
              </div>

              {med.allergies && med.allergies.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Shield className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Allergies</span>
                  </div>
                  <p className="text-sm text-red-600">{med.allergies.join(", ")}</p>
                </div>
              )}

              {med.interactions && med.interactions.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700">Drug Interactions</span>
                  </div>
                  <p className="text-sm text-amber-600">{med.interactions.join(", ")}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">Barcode: {med.barcode}</p>
                <div className="flex space-x-2">
                  {med.status === "pending" || med.status === "overdue" ? (
                    <Button size="sm" onClick={() => setSelectedMed(med)} className="bg-green-600 hover:bg-green-700">
                      <Pill className="h-4 w-4 mr-1" />
                      Administer
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setSelectedMed(med)}>
                      <FileText className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Administration Modal */}
      {selectedMed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medication Administration: {selectedMed.medicationName}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedMed(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Patient</p>
                    <p className="text-lg text-slate-800">{selectedMed.patientName}</p>
                    <p className="text-sm text-slate-600">ID: {selectedMed.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Room</p>
                    <p className="text-lg text-slate-800">{selectedMed.room}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Medication</p>
                    <p className="text-lg text-slate-800">{selectedMed.medicationName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Dosage</p>
                    <p className="text-lg text-slate-800">{selectedMed.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Route</p>
                    <Badge className={`${getRouteColor(selectedMed.route)} mt-1`}>
                      {selectedMed.route.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Scheduled Time</p>
                    <p className="text-lg text-slate-800">{selectedMed.scheduledTime}</p>
                  </div>
                </div>

                {selectedMed.allergies && selectedMed.allergies.length > 0 && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-700">Patient Allergies</span>
                    </div>
                    <p className="text-red-600">{selectedMed.allergies.join(", ")}</p>
                  </div>
                )}

                {selectedMed.interactions && selectedMed.interactions.length > 0 && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <span className="font-medium text-amber-700">Drug Interactions</span>
                    </div>
                    <p className="text-amber-600">{selectedMed.interactions.join(", ")}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Administration Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter any notes about the administration..."
                  />
                </div>

                {selectedMed.status === "pending" || selectedMed.status === "overdue" ? (
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => handleAdminister(selectedMed.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Confirm Administration
                    </Button>
                    <Button
                      onClick={() => handleSkip(selectedMed.id, "Patient refused")}
                      variant="outline"
                      className="flex-1"
                    >
                      Skip Dose
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-700">
                        Medication {selectedMed.status === "administered" ? "Administered" : "Skipped"}
                      </span>
                    </div>
                    {selectedMed.notes && <p className="text-sm text-green-600 mt-2">Notes: {selectedMed.notes}</p>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
