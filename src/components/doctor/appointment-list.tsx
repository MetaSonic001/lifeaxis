"use client"

import { AppointmentDetails } from "@/components/doctor/appointment-details"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

interface AppointmentListItem {
  id: number
  time: string
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
  hospital: string
  type: string
}

const appointments: AppointmentListItem[] = [
  {
    id: 1,
    time: "09:00 AM",
    patient: {
      id: 1,
      name: "John Doe",
      lastConsultation: "2023-01-01",
      hospital: "City Hospital",
      type: "In-person",
      age: 30,
      gender: "Male",
      contact: "1234567890",
      priority: "critical",
      dob: "1993-01-01",
      address: "123 Main St",
    },
    hospital: "City Hospital",
    type: "In-person",
  },
  {
    id: 2,
    time: "10:30 AM",
    patient: {
      id: 2,
      name: "Jane Smith",
      lastConsultation: "2023-02-01",
      hospital: "Metro Clinic",
      type: "Online",
      age: 25,
      gender: "Female",
      contact: "0987654321",
      priority: "chronic",
      dob: "1998-02-01",
      address: "456 Elm St",
    },
    hospital: "Metro Clinic",
    type: "Online",
  },
  {
    id: 3,
    time: "02:00 PM",
    patient: {
      id: 3,
      name: "Bob Johnson",
      lastConsultation: "2023-03-01",
      hospital: "Central Hospital",
      type: "In-person",
      age: 40,
      gender: "Male",
      contact: "1122334455",
      priority: "regular",
      dob: "1983-03-01",
      address: "789 Oak St",
    },
    hospital: "Central Hospital",
    type: "In-person",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "critical":
      return "bg-red-100 text-red-700 border-red-200"
    case "chronic":
      return "bg-orange-100 text-orange-700 border-orange-200"
    case "regular":
      return "bg-blue-100 text-blue-700 border-blue-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

interface AppointmentListProps {
  onSelectAppointment?: (appointment: any) => void
  onSelectPatient?: (patient: any) => void
}

export function AppointmentList({ onSelectAppointment, onSelectPatient }: AppointmentListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentListItem | null>(null)
  const [loadingAppointmentId, setLoadingAppointmentId] = useState<number | null>(null)

  const handleViewAppointment = async (appointment: AppointmentListItem) => {
    setLoadingAppointmentId(appointment.id)
    try {
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 500))

      setSelectedAppointment(appointment)
      if (onSelectAppointment) {
        onSelectAppointment(appointment)
      }

      toast({
        title: "Appointment Details",
        description: `Loading details for ${appointment.patient.name}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load appointment details.",
        variant: "destructive",
      })
    } finally {
      setLoadingAppointmentId(null)
    }
  }

  const handleSelectPatient = (patient: any) => {
    if (onSelectPatient) {
      onSelectPatient(patient)
    }
    toast({
      title: "Patient Selected",
      description: `Opening profile for ${patient.name}`,
    })
  }

  return (
    <>
      <div className="rounded-lg overflow-hidden border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
              <TableHead className="text-slate-700 font-medium">Time</TableHead>
              <TableHead className="text-slate-700 font-medium">Patient</TableHead>
              <TableHead className="text-slate-700 font-medium">Priority</TableHead>
              <TableHead className="text-slate-700 font-medium">Hospital</TableHead>
              <TableHead className="text-slate-700 font-medium">Type</TableHead>
              <TableHead className="text-slate-700 font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-700">{appointment.time}</TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() => handleSelectPatient(appointment.patient)}
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
                  >
                    {appointment.patient.name}
                  </Button>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(appointment.patient.priority)}>
                    {appointment.patient.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">{appointment.hospital}</TableCell>
                <TableCell className="text-slate-600">{appointment.type}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleViewAppointment(appointment)}
                    disabled={loadingAppointmentId === appointment.id}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-sm disabled:opacity-50"
                  >
                    {loadingAppointmentId === appointment.id ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading</span>
                      </div>
                    ) : (
                      "View"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedAppointment && (
        <AppointmentDetails appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
      )}
    </>
  )
}
