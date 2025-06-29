"use client"

import { PatientProfile } from "@/components/doctor/patient-profile"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const getMedicalRecords = () => [
  {
    id: "1",
    date: "2023-06-15",
    time: "14:30",
    title: "Annual Check-up Report",
    pdfLink: "/pdfs/annual-checkup-2023.pdf",
    patientId: "101",
    patientName: "John Doe",
  },
  {
    id: "2",
    date: "2023-03-10",
    time: "10:15",
    title: "Blood Test Results",
    pdfLink: "/pdfs/blood-test-2023.pdf",
    patientId: "102",
    patientName: "Jane Smith",
  },
  {
    id: "3",
    date: "2022-12-05",
    time: "16:45",
    title: "Allergy Test Results",
    pdfLink: "/pdfs/allergy-test-2022.pdf",
    patientId: "103",
    patientName: "Bob Johnson",
  },
  {
    id: "4",
    date: "2022-09-20",
    time: "09:00",
    title: "X-Ray Report",
    pdfLink: "/pdfs/x-ray-2022.pdf",
    patientId: "101",
    patientName: "John Doe",
  },
]

interface Patient {
  id: number
  name: string
  lastConsultation: string
  hospital: string
  type: string
  priority: string
  age: number
  gender: string
  dob: string
  contact: string
  address: string
}

export function MedicalRecords({ patientId }: { patientId?: string }) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const allRecords = getMedicalRecords()
  const medicalRecords = patientId ? allRecords.filter((record) => record.patientId === patientId) : allRecords

  return (
    <>
      <div className="rounded-lg overflow-hidden border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
              <TableHead className="text-slate-700 font-medium">Date</TableHead>
              <TableHead className="text-slate-700 font-medium">Time</TableHead>
              <TableHead className="text-slate-700 font-medium">Title</TableHead>
              <TableHead className="text-slate-700 font-medium">Patient</TableHead>
              <TableHead className="text-slate-700 font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicalRecords.map((record) => (
              <TableRow key={record.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-700">{record.date}</TableCell>
                <TableCell className="text-slate-600">{record.time}</TableCell>
                <TableCell className="text-slate-700">{record.title}</TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() =>
                      setSelectedPatient({
                        id: Number(record.patientId),
                        name: record.patientName,
                        lastConsultation: "",
                        hospital: "",
                        type: "",
                        priority: "",
                        age: 0,
                        gender: "",
                        dob: "",
                        contact: "",
                        address: "",
                      })
                    }
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
                  >
                    {record.patientName}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-sm"
                  >
                    <a href={record.pdfLink} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
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
