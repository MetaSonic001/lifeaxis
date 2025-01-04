"use client"

import { PatientProfile } from "@/components/doctor/patient-profile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"

const patients = [
  { id: 1, name: "John Doe", lastConsultation: "2023-12-15", hospital: "City Hospital", type: "In-person", priority: "critical", dob: "1980-01-01", contact: "123-456-7890", address: "123 Main St" },
  { id: 2, name: "Jane Smith", lastConsultation: "2024-01-05", hospital: "Metro Clinic", type: "Online", priority: "chronic", dob: "1985-02-02", contact: "987-654-3210", address: "456 Elm St" },
  { id: 3, name: "Bob Johnson", lastConsultation: "2024-01-10", hospital: "Central Hospital", type: "In-person", priority: "regular", dob: "1990-03-03", contact: "555-555-5555", address: "789 Oak St" },
]

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical': return 'bg-red-500'
    case 'chronic': return 'bg-orange-500'
    case 'regular': return 'bg-blue-500'
    default: return 'bg-gray-500'
  }
}

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [hospitalFilter, setHospitalFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<{ id: number; name: string; lastConsultation: string; hospital: string; type: string; priority: string; dob: string; contact: string; address: string } | null>(null)

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (hospitalFilter === "all" || patient.hospital === hospitalFilter) &&
    (typeFilter === "all" || patient.type === typeFilter)
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Patients</h1>
      <div className="mb-4 flex flex-wrap gap-4">
        <Input
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={hospitalFilter} onValueChange={setHospitalFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Hospital" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Hospitals</SelectItem>
            <SelectItem value="City Hospital">City Hospital</SelectItem>
            <SelectItem value="Metro Clinic">Metro Clinic</SelectItem>
            <SelectItem value="Central Hospital">Central Hospital</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Consultation Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="In-person">In-person</SelectItem>
            <SelectItem value="Online">Online</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Last Consultation</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.lastConsultation}</TableCell>
              <TableCell>{patient.hospital}</TableCell>
              <TableCell>{patient.type}</TableCell>
              <TableCell>
                <Badge className={getPriorityColor(patient.priority)}>
                  {patient.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>View Profile</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedPatient && (
        <PatientProfile
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  )
}

