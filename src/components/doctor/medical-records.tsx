import { PatientProfile } from "@/components/doctor/patient-profile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from 'react'

// This would typically come from an API call based on the patientId
const getMedicalRecords = () => [
  { id: '1', date: '2023-06-15', time: '14:30', title: 'Annual Check-up Report', pdfLink: '/pdfs/annual-checkup-2023.pdf', patientId: '101', patientName: 'John Doe' },
  { id: '2', date: '2023-03-10', time: '10:15', title: 'Blood Test Results', pdfLink: '/pdfs/blood-test-2023.pdf', patientId: '102', patientName: 'Jane Smith' },
  { id: '3', date: '2022-12-05', time: '16:45', title: 'Allergy Test Results', pdfLink: '/pdfs/allergy-test-2022.pdf', patientId: '103', patientName: 'Bob Johnson' },
  { id: '4', date: '2022-09-20', time: '09:00', title: 'X-Ray Report', pdfLink: '/pdfs/x-ray-2022.pdf', patientId: '101', patientName: 'John Doe' },
]

interface Patient {
  id: number;
  name: string;
  lastConsultation: string;
  hospital: string;
  type: string;
  priority: string;
  age: number;
  gender: string;
  dob: string;
  contact: string;
  address: string;
}

export function MedicalRecords({ patientId }: { patientId?: string }) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const allRecords = getMedicalRecords()
  const medicalRecords = patientId ? allRecords.filter(record => record.patientId === patientId) : allRecords

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicalRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                  <Button variant="link" onClick={() => setSelectedPatient({ id: Number(record.patientId), name: record.patientName, lastConsultation: '', hospital: '', type: '', priority: '', age: 0, gender: '', dob: '', contact: '', address: '' })}></Button>
                <TableCell>{record.title}</TableCell>
                <TableCell>
                  <Button variant="link" onClick={() => setSelectedPatient({ id: Number(record.patientId), name: record.patientName, lastConsultation: '', hospital: '', type: '', priority: '', age: 0, gender: '', dob: '', contact: '', address: '' })}>
                    {record.patientName}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button asChild variant="link">
                    <a href={record.pdfLink} target="_blank" rel="noopener noreferrer">View PDF</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>{selectedPatient.name}</DialogTitle>
            </DialogHeader>
            <PatientProfile patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}

