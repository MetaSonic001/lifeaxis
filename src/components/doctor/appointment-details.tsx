"use client"

import { PatientProfile } from "@/components/doctor/patient-profile"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

interface Appointment {
  patient: {
    id: number
    name: string
    lastConsultation: string
    hospital: string
    type: string
    age: number
    gender: string
    contact: string
    priority: string
    dob: string
    address: string
  }
  time: string
  hospital: string
  type: string
}

interface AppointmentDetailsProps {
  appointment: Appointment
  onClose: () => void
}

export function AppointmentDetails({ appointment, onClose }: AppointmentDetailsProps) {
  const [showPatientDetails, setShowPatientDetails] = useState(false)
  const [prescription, setPrescription] = useState("")
  const [reportSummary, setReportSummary] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isJoiningCall, setIsJoiningCall] = useState(false)

  const handleSavePrescription = async () => {
    if (!prescription.trim() && !reportSummary.trim()) {
      toast({
        title: "Error",
        description: "Please enter prescription or report summary before saving.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Saving prescription:", prescription)
      console.log("Saving report summary:", reportSummary)

      toast({
        title: "Success",
        description: "Prescription and report summary saved successfully!",
      })

      // Clear forms after successful save
      setPrescription("")
      setReportSummary("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save prescription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleJoinVideoCall = async () => {
    setIsJoiningCall(true)
    try {
      // Simulate joining video call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Video Call",
        description: "Connecting to video call...",
      })

      // In a real app, this would open the video call interface
      window.open(`/video-call/${appointment.patient.id}`, "_blank")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join video call. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsJoiningCall(false)
    }
  }

  const handleViewPatientDetails = () => {
    setShowPatientDetails(true)
    toast({
      title: "Patient Profile",
      description: `Opening profile for ${appointment.patient.name}`,
    })
  }

  return (
    <Dialog open={!!appointment} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <DialogHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg p-6 -m-6 mb-6">
          <DialogTitle className="text-slate-700 text-xl">Appointment Details</DialogTitle>
          <DialogDescription className="text-slate-600">
            {appointment.patient.name} - {appointment.time}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100">
            <TabsTrigger value="details" className="data-[state=active]:bg-white">
              Details
            </TabsTrigger>
            <TabsTrigger value="prescription" className="data-[state=active]:bg-white">
              Prescription
            </TabsTrigger>
            <TabsTrigger value="medical-records" className="data-[state=active]:bg-white">
              Medical Records
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-6">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Hospital:</span>
                <span className="text-slate-600">{appointment.hospital}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Type:</span>
                <span className="text-slate-600">{appointment.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Patient Priority:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.patient.priority === "critical"
                      ? "bg-red-100 text-red-700"
                      : appointment.patient.priority === "chronic"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {appointment.patient.priority}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {appointment.type === "Online" && (
                <Button
                  onClick={handleJoinVideoCall}
                  disabled={isJoiningCall}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg disabled:opacity-50"
                >
                  {isJoiningCall ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Joining...</span>
                    </div>
                  ) : (
                    "Join Video Call"
                  )}
                </Button>
              )}
              <Button
                onClick={handleViewPatientDetails}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
              >
                View Patient Details
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="prescription" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="prescription" className="text-slate-700 font-medium">
                  Prescription
                </Label>
                <Textarea
                  id="prescription"
                  placeholder="Enter prescription here..."
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  rows={5}
                  className="mt-2 border-slate-200 focus:border-blue-400"
                />
              </div>
              <div>
                <Label htmlFor="report-summary" className="text-slate-700 font-medium">
                  Report Summary
                </Label>
                <Textarea
                  id="report-summary"
                  placeholder="Enter detailed report summary here..."
                  value={reportSummary}
                  onChange={(e) => setReportSummary(e.target.value)}
                  rows={5}
                  className="mt-2 border-slate-200 focus:border-blue-400"
                />
              </div>
              <Button
                onClick={handleSavePrescription}
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Prescription and Report"
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="medical-records" className="mt-6">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg text-center">
              <p className="text-slate-600 mb-4">Medical records and case papers will be displayed here.</p>
              <Button
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Medical records integration is being developed.",
                  })
                }}
                variant="outline"
                className="border-slate-300 text-slate-600 hover:bg-slate-50 bg-transparent"
              >
                Load Medical Records
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6 pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-300 text-slate-600 hover:bg-slate-50 bg-transparent"
          >
            Close
          </Button>
        </div>
      </DialogContent>

      {showPatientDetails && (
        <PatientProfile patient={appointment.patient} onClose={() => setShowPatientDetails(false)} />
      )}
    </Dialog>
  )
}
