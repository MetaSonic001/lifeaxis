"use client"

import { PatientProfile } from "@/components/doctor/patient-profile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const getMedicalTests = () => [
  {
    id: "1",
    date: "2023-06-20",
    testName: "Complete Blood Count",
    status: "Completed",
    result: "Normal",
    patientId: "101",
    patientName: "John Doe",
  },
  {
    id: "2",
    date: "2023-06-18",
    testName: "Lipid Panel",
    status: "Pending",
    result: "",
    patientId: "102",
    patientName: "Jane Smith",
  },
  {
    id: "3",
    date: "2023-06-15",
    testName: "Thyroid Function",
    status: "Submitted",
    result: "",
    patientId: "103",
    patientName: "Bob Johnson",
  },
  {
    id: "4",
    date: "2023-06-10",
    testName: "Urinalysis",
    status: "Completed",
    result: "Abnormal",
    patientId: "101",
    patientName: "John Doe",
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-700 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "submitted":
      return "bg-blue-100 text-blue-700 border-blue-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export function MedicalTests() {
  const [selectedPatient, setSelectedPatient] = useState<{
    id: number
    name: string
    dob: string
    contact: string
    address: string
    lastConsultation: string
    hospital: string
    type: string
    priority: string
  } | null>(null)
  const medicalTests = getMedicalTests()

  return (
    <>
      <div className="rounded-lg overflow-hidden border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
              <TableHead className="text-slate-700 font-medium">Date</TableHead>
              <TableHead className="text-slate-700 font-medium">Test Name</TableHead>
              <TableHead className="text-slate-700 font-medium">Status</TableHead>
              <TableHead className="text-slate-700 font-medium">Result</TableHead>
              <TableHead className="text-slate-700 font-medium">Patient</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicalTests.map((test) => (
              <TableRow key={test.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-700">{test.date}</TableCell>
                <TableCell className="text-slate-700">{test.testName}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                </TableCell>
                <TableCell className="text-slate-600">{test.result || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() =>
                      setSelectedPatient({
                        id: Number(test.patientId),
                        name: test.patientName,
                        dob: "N/A",
                        contact: "N/A",
                        address: "N/A",
                        lastConsultation: "N/A",
                        hospital: "N/A",
                        type: "N/A",
                        priority: "N/A",
                      })
                    }
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
                  >
                    {test.patientName}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="sm:max-w-[900px] bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <DialogHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg p-6 -m-6 mb-6">
              <DialogTitle className="text-slate-700">{selectedPatient.name}</DialogTitle>
            </DialogHeader>
            <PatientProfile patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
