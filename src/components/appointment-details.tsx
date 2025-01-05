import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientProfile } from "@/components/patient-profile"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Appointment {
  patient: {
    name: string;
    id: string;
    dob: string;
    contact: string;
    address: string;
  };
  time: string;
  hospital: string;
  type: string;
}

interface AppointmentDetailsProps {
  appointment: Appointment;
  onClose: () => void;
}

export function AppointmentDetails({ appointment, onClose }: AppointmentDetailsProps) {
  const [showPatientDetails, setShowPatientDetails] = useState(false)
  const [prescription, setPrescription] = useState("")
  const [reportSummary, setReportSummary] = useState("")

  const handleSavePrescription = () => {
    // Here you would typically save the prescription to your backend
    console.log("Saving prescription:", prescription)
    console.log("Saving report summary:", reportSummary)
    alert("Prescription and report summary saved!")
  }

  return (
    <Dialog open={!!appointment} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            {appointment.patient.name} - {appointment.time}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="prescription">Prescription</TabsTrigger>
            <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="space-y-2">
              <p><strong>Hospital:</strong> {appointment.hospital}</p>
              <p><strong>Type:</strong> {appointment.type}</p>
              {appointment.type === "Online" && (
                <Button variant="outline">Join Video Call</Button>
              )}
              <Button onClick={() => setShowPatientDetails(true)}>View Patient Details</Button>
            </div>
          </TabsContent>
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
              <div>
                <Label htmlFor="report-summary">Report Summary</Label>
                <Textarea
                  id="report-summary"
                  placeholder="Enter detailed report summary here..."
                  value={reportSummary}
                  onChange={(e) => setReportSummary(e.target.value)}
                  rows={5}
                />
              </div>
              <Button onClick={handleSavePrescription}>Save Prescription and Report</Button>
            </div>
          </TabsContent>
          <TabsContent value="medical-records">
            <p>Medical records and case papers will be displayed here.</p>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
      {showPatientDetails && (
        <PatientProfile
          patient={appointment.patient}
          onClose={() => setShowPatientDetails(false)}
        />
      )}
    </Dialog>
  )
}

