import { AppointmentDetails } from "@/components/doctor/appointment-details"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from 'react'

interface AppointmentListItem {
  id: number;
  time: string;
  patient: {
    id: number;
    name: string;
    lastConsultation: string;
    hospital: string;
    type: string;
    age: number;
    gender: string;
    contact: string;
    priority: string;
    dob: string;
    address: string;
  };
  hospital: string;
  type: string;
}

const appointments: AppointmentListItem[] = [
  { id: 1, time: "09:00 AM", patient: { id: 1, name: "John Doe", lastConsultation: "2023-01-01", hospital: "City Hospital", type: "In-person", age: 30, gender: "Male", contact: "1234567890", priority: "critical", dob: "1993-01-01", address: "123 Main St" }, hospital: "City Hospital", type: "In-person" },
  { id: 2, time: "10:30 AM", patient: { id: 2, name: "Jane Smith", lastConsultation: "2023-02-01", hospital: "Metro Clinic", type: "Online", age: 25, gender: "Female", contact: "0987654321", priority: "chronic", dob: "1998-02-01", address: "456 Elm St" }, hospital: "Metro Clinic", type: "Online" },
  { id: 3, time: "02:00 PM", patient: { id: 3, name: "Bob Johnson", lastConsultation: "2023-03-01", hospital: "Central Hospital", type: "In-person", age: 40, gender: "Male", contact: "1122334455", priority: "regular", dob: "1983-03-01", address: "789 Oak St" }, hospital: "Central Hospital", type: "In-person" },
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
  
  interface AppointmentListItem {
    id: number;
    time: string;
    patient: {
      id: number;
      name: string;
      lastConsultation: string;
      hospital: string;
      type: string;
      age: number;
      gender: string;
      contact: string;
      priority: string;
      dob: string;
      address: string;
    };
    hospital: string;
    type: string;
  }
  
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentListItem | null>(null)

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

