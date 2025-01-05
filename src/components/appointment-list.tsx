import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AppointmentDetails } from "@/components/appointment-details"
import { useState } from 'react'
import { Badge } from "@/components/ui/badge"

const appointments = [
  { id: 1, time: "09:00 AM", patient: { id: "1", name: "John Doe", priority: "critical", dob: "01/01/1980", contact: "123-456-7890", address: "123 Main St" }, hospital: "City Hospital", type: "In-person" },
  { id: 2, time: "10:30 AM", patient: { id: "2", name: "Jane Smith", priority: "chronic", dob: "02/02/1990", contact: "987-654-3210", address: "456 Elm St" }, hospital: "Metro Clinic", type: "Online" },
  { id: 3, time: "02:00 PM", patient: { id: "3", name: "Bob Johnson", priority: "regular", dob: "03/03/1975", contact: "555-555-5555", address: "789 Oak St" }, hospital: "Central Hospital", type: "In-person" },
]

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical': return 'bg-red-500'
    case 'chronic': return 'bg-orange-500'
    case 'regular': return 'bg-blue-500'
    default: return 'bg-gray-500'
  }
}

interface AppointmentListProps {
  onSelectAppointment?: (appointment: any) => void;
  onSelectPatient?: (patient: any) => void;
}

export function AppointmentList({ onSelectAppointment, onSelectPatient }: AppointmentListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<null | typeof appointments[0]>(null)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Button variant="link" onClick={() => onSelectPatient && onSelectPatient(appointment.patient)}>
                  {appointment.patient.name}
                </Button>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(appointment.patient.priority)}>
                  {appointment.patient.priority}
                </Badge>
              </TableCell>
              <TableCell>{appointment.hospital}</TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedAppointment(appointment)} variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </>
  )
}

