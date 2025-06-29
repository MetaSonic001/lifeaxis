"use client"

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
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

interface Patient {
  id: number
  name: string
  lastConsultation: string
  hospital: string
  type: string
  priority: string
  dob: string
  contact: string
  address: string
}

interface PatientProfileProps {
  patient: Patient | null
  onClose: () => void
}

export function PatientProfile({ patient, onClose }: PatientProfileProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [chatMessages, setChatMessages] = useState([
    { sender: "Doctor", message: "Hello, how can I help you today?" },
    { sender: "Patient", message: "I have been experiencing headaches lately." },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)

  // Form states
  const [patientData, setPatientData] = useState({
    name: patient?.name || "",
    dob: patient?.dob || "",
    contact: patient?.contact || "",
    address: patient?.address || "",
  })

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    setIsSendingMessage(true)
    try {
      // Simulate sending message
      await new Promise((resolve) => setTimeout(resolve, 500))

      setChatMessages([...chatMessages, { sender: "Doctor", message: newMessage }])
      setNewMessage("")

      toast({
        title: "Message Sent",
        description: "Your message has been sent to the patient.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSendingMessage(false)
    }
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Changes Saved",
        description: "Patient information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const medicalHistory = {
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
    surgeries: [
      { date: "2020-05-15", procedure: "Appendectomy" },
      { date: "2018-11-03", procedure: "Tonsillectomy" },
    ],
    familyHistory: [
      { relation: "Father", condition: "Heart Disease" },
      { relation: "Mother", condition: "Breast Cancer" },
    ],
  }

  const prescriptionHistory = [
    {
      date: "2023-06-15",
      medication: "Ibuprofen",
      dosage: "400mg",
      frequency: "Twice daily",
      duration: "7 days",
      pdfLink: "/pdfs/prescription-2023-06-15.pdf",
    },
    {
      date: "2023-03-10",
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      duration: "10 days",
      pdfLink: "/pdfs/prescription-2023-03-10.pdf",
    },
    {
      date: "2022-12-05",
      medication: "Loratadine",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
      pdfLink: "/pdfs/prescription-2022-12-05.pdf",
    },
  ]

  const appointmentHistory = [
    {
      date: "2023-06-15",
      reason: "Annual check-up",
      doctor: "Dr. Smith",
      notes: "Patient reported feeling well. No significant issues found.",
    },
    {
      date: "2023-03-10",
      reason: "Sore throat",
      doctor: "Dr. Johnson",
      notes: "Diagnosed with strep throat. Prescribed antibiotics.",
    },
    {
      date: "2022-12-05",
      reason: "Allergy consultation",
      doctor: "Dr. Lee",
      notes: "Conducted allergy tests. Prescribed antihistamines.",
    },
  ]

  const handleViewPDF = (pdfLink: string, medication: string) => {
    toast({
      title: "Opening PDF",
      description: `Loading prescription for ${medication}...`,
    })
    // In a real app, this would open the PDF
    window.open(pdfLink, "_blank")
  }

  return (
    <Dialog open={!!patient} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <DialogHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg p-6 -m-6 mb-6">
          <DialogTitle className="text-slate-700 text-xl">{patient?.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-slate-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="ehr" className="data-[state=active]:bg-white text-xs">
              EHR
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="data-[state=active]:bg-white text-xs">
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-white text-xs">
              Appointments
            </TabsTrigger>
            <TabsTrigger value="medical-records" className="data-[state=active]:bg-white text-xs">
              Records
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-white text-xs">
              Chat
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] w-full">
            <TabsContent value="overview" className="mt-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-t-lg">
                  <CardTitle className="text-slate-700">Patient Information</CardTitle>
                  <CardDescription className="text-slate-600">View and edit patient details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-medium">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={patientData.name}
                        onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                        className="border-slate-200 focus:border-emerald-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-slate-700 font-medium">
                        Date of Birth
                      </Label>
                      <Input
                        id="dob"
                        value={patientData.dob}
                        onChange={(e) => setPatientData({ ...patientData, dob: e.target.value })}
                        className="border-slate-200 focus:border-emerald-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-slate-700 font-medium">
                        Contact
                      </Label>
                      <Input
                        id="contact"
                        value={patientData.contact}
                        onChange={(e) => setPatientData({ ...patientData, contact: e.target.value })}
                        className="border-slate-200 focus:border-emerald-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-slate-700 font-medium">
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        value={patientData.address}
                        onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
                        className="border-slate-200 focus:border-emerald-400"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ehr" className="mt-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
                  <CardTitle className="text-slate-700">Electronic Health Records</CardTitle>
                  <CardDescription className="text-slate-600">View patient's health records</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-700 mb-2">Allergies</h4>
                      <ul className="list-disc list-inside text-slate-600">
                        {medicalHistory.allergies.map((allergy, index) => (
                          <li key={index}>{allergy}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-700 mb-2">Chronic Conditions</h4>
                      <ul className="list-disc list-inside text-slate-600">
                        {medicalHistory.chronicConditions.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-700 mb-2">Surgeries</h4>
                      <ul className="list-disc list-inside text-slate-600">
                        {medicalHistory.surgeries.map((surgery, index) => (
                          <li key={index}>
                            {surgery.date}: {surgery.procedure}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-700 mb-2">Family History</h4>
                      <ul className="list-disc list-inside text-slate-600">
                        {medicalHistory.familyHistory.map((history, index) => (
                          <li key={index}>
                            {history.relation}: {history.condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescriptions" className="mt-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-t-lg">
                  <CardTitle className="text-slate-700">Prescription History</CardTitle>
                  <CardDescription className="text-slate-600">View patient's prescription history</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="rounded-lg overflow-hidden border border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                          <TableHead className="text-slate-700 font-medium">Date</TableHead>
                          <TableHead className="text-slate-700 font-medium">Medication</TableHead>
                          <TableHead className="text-slate-700 font-medium">Dosage</TableHead>
                          <TableHead className="text-slate-700 font-medium">Frequency</TableHead>
                          <TableHead className="text-slate-700 font-medium">Duration</TableHead>
                          <TableHead className="text-slate-700 font-medium">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prescriptionHistory.map((prescription, index) => (
                          <TableRow key={index} className="hover:bg-slate-50/50">
                            <TableCell className="text-slate-700">{prescription.date}</TableCell>
                            <TableCell className="text-slate-700">{prescription.medication}</TableCell>
                            <TableCell className="text-slate-600">{prescription.dosage}</TableCell>
                            <TableCell className="text-slate-600">{prescription.frequency}</TableCell>
                            <TableCell className="text-slate-600">{prescription.duration}</TableCell>
                            <TableCell>
                              <Button
                                onClick={() => handleViewPDF(prescription.pdfLink, prescription.medication)}
                                size="sm"
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-sm"
                              >
                                View PDF
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="mt-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
                  <CardTitle className="text-slate-700">Appointment History</CardTitle>
                  <CardDescription className="text-slate-600">View patient's previous appointments</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="rounded-lg overflow-hidden border border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                          <TableHead className="text-slate-700 font-medium">Date</TableHead>
                          <TableHead className="text-slate-700 font-medium">Reason</TableHead>
                          <TableHead className="text-slate-700 font-medium">Doctor</TableHead>
                          <TableHead className="text-slate-700 font-medium">Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointmentHistory.map((appointment, index) => (
                          <TableRow key={index} className="hover:bg-slate-50/50">
                            <TableCell className="text-slate-700">{appointment.date}</TableCell>
                            <TableCell className="text-slate-700">{appointment.reason}</TableCell>
                            <TableCell className="text-slate-600">{appointment.doctor}</TableCell>
                            <TableCell className="text-slate-600">{appointment.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medical-records" className="mt-6">
              <MedicalRecords patientId={patient?.id?.toString()} />
            </TabsContent>

            <TabsContent value="chat" className="mt-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
                  <CardTitle className="text-slate-700">Chat</CardTitle>
                  <CardDescription className="text-slate-600">Communicate with the patient</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ScrollArea className="h-[300px] w-full rounded-md border border-slate-200 p-4 bg-gradient-to-br from-slate-50 to-slate-100">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`mb-3 ${msg.sender === "Doctor" ? "text-right" : "text-left"}`}>
                        <span
                          className={`inline-block rounded-lg px-3 py-2 text-sm ${
                            msg.sender === "Doctor"
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                              : "bg-white text-slate-700 border border-slate-200"
                          }`}
                        >
                          {msg.message}
                        </span>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex mt-4 space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !isSendingMessage && sendMessage()}
                      className="flex-grow border-slate-200 focus:border-green-400"
                      disabled={isSendingMessage}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={isSendingMessage || !newMessage.trim()}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg disabled:opacity-50"
                    >
                      {isSendingMessage ? (
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending</span>
                        </div>
                      ) : (
                        "Send"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-between mt-6 pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-300 text-slate-600 hover:bg-slate-50 bg-transparent"
          >
            Close
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg disabled:opacity-50"
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
