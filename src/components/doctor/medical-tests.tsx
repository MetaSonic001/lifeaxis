import { PatientProfile } from "@/components/doctor/patient-profile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from 'react'

const getMedicalTests = () => [
  { id: '1', date: '2023-06-20', testName: 'Complete Blood Count', status: 'Completed', result: 'Normal', patientId: '101', patientName: 'John Doe' },
  { id: '2', date: '2023-06-18', testName: 'Lipid Panel', status: 'Pending', result: '', patientId: '102', patientName: 'Jane Smith' },
  { id: '3', date: '2023-06-15', testName: 'Thyroid Function', status: 'Submitted', result: '', patientId: '103', patientName: 'Bob Johnson' },
  { id: '4', date: '2023-06-10', testName: 'Urinalysis', status: 'Completed', result: 'Abnormal', patientId: '101', patientName: 'John Doe' },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'bg-green-500'
    case 'pending': return 'bg-yellow-500'
    case 'submitted': return 'bg-blue-500'
    default: return 'bg-gray-500'
  }
}

export function MedicalTests() {
  const [selectedPatient, setSelectedPatient] = useState<{ id: number, name: string, dob: string, contact: string, address: string, lastConsultation: string, hospital: string, type: string, priority: string } | null>(null)
  const medicalTests = getMedicalTests()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Tests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Patient</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicalTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.date}</TableCell>
                <TableCell>{test.testName}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                </TableCell>
                <TableCell>{test.result || '-'}</TableCell>
                <TableCell>
                  <Button variant="link" onClick={() => setSelectedPatient({ id: Number(test.patientId), name: test.patientName, dob: 'N/A', contact: 'N/A', address: 'N/A', lastConsultation: 'N/A', hospital: 'N/A', type: 'N/A', priority: 'N/A' })}>
                    {test.patientName}
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

