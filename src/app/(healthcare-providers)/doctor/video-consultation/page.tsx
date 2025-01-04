"use client"

import { AppointmentList } from "@/components/doctor/appointment-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from 'react'
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VideoConsultationPage() {
  const [isCallActive, setIsCallActive] = useState(false)
  interface Appointment {
    patient: {
      name: string;
    };
    // Add other properties as needed
  }

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [prescription, setPrescription] = useState("")
  const [casePaper, setCasePaper] = useState("")

  useEffect(() => {
    if (isCallActive) {
      const timer = setTimeout(() => {
        alert("Video call connected!")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isCallActive])

  const handleSaveCasePaper = () => {
    // Here you would typically save the case paper to your backend
    console.log("Saving case paper:", { prescription, casePaper })
    alert("Case paper saved!")
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Video Consultation</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Video Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted flex items-center justify-center">
              {isCallActive ? (
                <p>Video call is active</p>
              ) : (
                <p>Video feed will appear here when the call starts</p>
              )}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <Button onClick={() => setIsCallActive(!isCallActive)}>
                {isCallActive ? "End Call" : "Start Call"}
              </Button>
              <Button variant="outline">Mute</Button>
              <Button variant="outline">Turn Off Camera</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Video Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentList
              onSelectAppointment={setSelectedAppointment}
              onSelectPatient={() => {}}
            />
          </CardContent>
        </Card>
        {selectedAppointment && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Case Paper for {selectedAppointment.patient.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="prescription">
                <TabsList>
                  <TabsTrigger value="prescription">Prescription</TabsTrigger>
                  <TabsTrigger value="case-details">Case Details</TabsTrigger>
                </TabsList>
                <TabsContent value="prescription">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="prescription">Prescription</Label>
                      <Textarea
                        id="prescription"
                        placeholder="Enter prescription here..."
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        rows={5}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="case-details">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="case-paper">Case Details</Label>
                      <Textarea
                        id="case-paper"
                        placeholder="Enter detailed case information here..."
                        value={casePaper}
                        onChange={(e) => setCasePaper(e.target.value)}
                        rows={10}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <Button onClick={handleSaveCasePaper} className="mt-4">Save Case Paper</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

