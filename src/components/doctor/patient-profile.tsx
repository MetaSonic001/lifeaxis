import { MedicalRecords } from "@/components/doctor/medical-records"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'

interface Patient {

  id: number;

  name: string;

  lastConsultation: string;

  hospital: string;

  type: string;

  priority: string;

  dob: string;

  contact: string;

  address: string;

}


interface PatientProfileProps {
  patient: Patient | null;
  onClose: () => void;
}

export function PatientProfile({ patient, onClose }: PatientProfileProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Doctor', message: 'Hello, how can I help you today?' },
    { sender: 'Patient', message: 'I have been experiencing headaches lately.' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: 'Doctor', message: newMessage }])
      setNewMessage('')
    }
  }

  // Mock data for medical history, prescriptions, and appointments
  const medicalHistory = {
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    surgeries: [
      { date: '2020-05-15', procedure: 'Appendectomy' },
      { date: '2018-11-03', procedure: 'Tonsillectomy' },
    ],
    familyHistory: [
      { relation: 'Father', condition: 'Heart Disease' },
      { relation: 'Mother', condition: 'Breast Cancer' },
    ],
  }

  const prescriptionHistory = [
    { date: '2023-06-15', medication: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily', duration: '7 days', pdfLink: '/pdfs/prescription-2023-06-15.pdf' },
    { date: '2023-03-10', medication: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '10 days', pdfLink: '/pdfs/prescription-2023-03-10.pdf' },
    { date: '2022-12-05', medication: 'Loratadine', dosage: '10mg', frequency: 'Once daily', duration: '30 days', pdfLink: '/pdfs/prescription-2022-12-05.pdf' },
  ]

  const appointmentHistory = [
    { date: '2023-06-15', reason: 'Annual check-up', doctor: 'Dr. Smith', notes: 'Patient reported feeling well. No significant issues found.' },
    { date: '2023-03-10', reason: 'Sore throat', doctor: 'Dr. Johnson', notes: 'Diagnosed with strep throat. Prescribed antibiotics.' },
    { date: '2022-12-05', reason: 'Allergy consultation', doctor: 'Dr. Lee', notes: 'Conducted allergy tests. Prescribed antihistamines.' },
  ]

  return (
    <Dialog open={!!patient} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{patient?.name}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ehr">EHR</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>View and edit patient details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={patient?.name} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" defaultValue={patient?.dob} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contact">Contact</Label>
                  <Input id="contact" defaultValue={patient?.contact} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue={patient?.address} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ehr">
            <Card>
              <CardHeader>
                <CardTitle>Electronic Health Records</CardTitle>
                <CardDescription>View patient's health records</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Medical History</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Allergies</h4>
                    <ul className="list-disc list-inside">
                      {medicalHistory.allergies.map((allergy, index) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Chronic Conditions</h4>
                    <ul className="list-disc list-inside">
                      {medicalHistory.chronicConditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Surgeries</h4>
                    <ul className="list-disc list-inside">
                      {medicalHistory.surgeries.map((surgery, index) => (
                        <li key={index}>{surgery.date}: {surgery.procedure}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Family History</h4>
                    <ul className="list-disc list-inside">
                      {medicalHistory.familyHistory.map((history, index) => (
                        <li key={index}>{history.relation}: {history.condition}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle>Prescription History</CardTitle>
                <CardDescription>View patient's prescription history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescriptionHistory.map((prescription, index) => (
                      <TableRow key={index}>
                        <TableCell>{prescription.date}</TableCell>
                        <TableCell>{prescription.medication}</TableCell>
                        <TableCell>{prescription.dosage}</TableCell>
                        <TableCell>{prescription.frequency}</TableCell>
                        <TableCell>{prescription.duration}</TableCell>
                        <TableCell>
                          <Button asChild variant="link">
                            <a href={prescription.pdfLink} target="_blank" rel="noopener noreferrer">View PDF</a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Appointment History</CardTitle>
                <CardDescription>View patient's previous appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointmentHistory.map((appointment, index) => (
                      <TableRow key={index}>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell>{appointment.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medical-records">
            <MedicalRecords patientId={patient?.id?.toString()} />
          </TabsContent>
          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Chat</CardTitle>
                <CardDescription>Communicate with the patient</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === 'Doctor' ? 'text-right' : 'text-left'}`}>
                      <span className="inline-block bg-primary text-primary-foreground rounded px-2 py-1">
                        {msg.message}
                      </span>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex mt-4">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

