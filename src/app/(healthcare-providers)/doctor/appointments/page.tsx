"use client"

import { AppointmentList } from "@/components/doctor/appointment-list"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

type Appointment = {
  id: number
  patientName: string
  doctorName: string
  date: string
  time: string
  duration: number
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
  patient?: {
    name?: string
    // Add other patient details as needed
  }
}

type NewDoctorDialogProps = {
  onAddDoctor: (doctorName: string) => void
}

const mockAppointments: Appointment[] = [
  { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', date: '2023-06-15', time: '09:00', duration: 30, status: 'Scheduled' },
  { id: 2, patientName: 'Jane Smith', doctorName: 'Dr. Johnson', date: '2023-06-15', time: '10:00', duration: 45, status: 'Scheduled' },
  { id: 3, patientName: 'Bob Brown', doctorName: 'Dr. Williams', date: '2023-06-15', time: '11:00', duration: 60, status: 'Scheduled' },
]

const NewDoctorDialog = ({ onAddDoctor }: NewDoctorDialogProps) => {
  const [newDoctorName, setNewDoctorName] = useState('')

  const handleSubmit = () => {
    if (newDoctorName.trim()) {
      onAddDoctor(newDoctorName.trim())
      setNewDoctorName('')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700">
          Add New Doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter the name of the new doctor to add to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input
            type="text"
            value={newDoctorName}
            onChange={(e) => setNewDoctorName(e.target.value)}
            placeholder="Doctor's Name"
            className="w-full p-2 bg-neutral-800 text-white border border-neutral-700 rounded"
          />
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Add Doctor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [doctors, setDoctors] = useState<string[]>(['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      // Simulate appointment progress
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment => {
          const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
          if (now > appointmentDate && appointment.status === 'Scheduled') {
            return { ...appointment, status: 'In Progress' }
          }
          if (now > new Date(appointmentDate.getTime() + appointment.duration * 60000) && appointment.status === 'In Progress') {
            return { ...appointment, status: 'Completed' }
          }
          return appointment
        })
      )
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const handleCancelAppointment = (id: number) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status: 'Cancelled' as const } : appointment
    )
    setAppointments(updatedAppointments)
    setSelectedAppointment(null)
  }

  const handleAddDoctor = (doctorName: string) => {
    if (!doctors.includes(doctorName)) {
      setDoctors([...doctors, doctorName])
    }
  }

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'Scheduled': return 'bg-black text-white border border-white'
      case 'In Progress': return 'bg-neutral-800 text-yellow-300 border border-yellow-300'
      case 'Completed': return 'bg-neutral-800 text-green-300 border border-green-300'
      case 'Cancelled': return 'bg-neutral-800 text-red-300 border border-red-300'
    }
  }

  return (
    <div className="container mx-auto p-6 bg-black text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <NewDoctorDialog onAddDoctor={handleAddDoctor} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-neutral-700 text-white"
              classNames={{
                day_selected: 'bg-white text-black',
                day_today: 'bg-neutral-700 text-white'
              }}
            />
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white">Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentList 
              onSelectAppointment={setSelectedAppointment} 
              onSelectPatient={() => {}} 
            />
          </CardContent>
        </Card>
      </div>

      {/* Appointment Management Table */}
      <Card className="mt-6 bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle>Smart Appointment Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-neutral-400">Current Time: {currentTime.toLocaleString()}</p>
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800">
                <th className="p-2 text-left text-white">Patient</th>
                <th className="p-2 text-left text-white">Doctor</th>
                <th className="p-2 text-left text-white">Date</th>
                <th className="p-2 text-left text-white">Time</th>
                <th className="p-2 text-left text-white">Duration</th>
                <th className="p-2 text-left text-white">Status</th>
                <th className="p-2 text-left text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr 
                  key={appointment.id} 
                  className={`${getStatusColor(appointment.status)} hover:bg-opacity-75 cursor-pointer`}
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <td className="p-2">{appointment.patientName}</td>
                  <td className="p-2">{appointment.doctorName}</td>
                  <td className="p-2">{appointment.date}</td>
                  <td className="p-2">{appointment.time}</td>
                  <td className="p-2">{appointment.duration} min</td>
                  <td className="p-2">{appointment.status}</td>
                  <td className="p-2">
                    {appointment.status === 'Scheduled' && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button 
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-neutral-900 border-neutral-700 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-400">
                              This will cancel the appointment for {appointment.patientName} with {appointment.doctorName}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-neutral-800 text-white hover:bg-neutral-700">
                              No, Keep Appointment
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                              e.stopPropagation()
                              handleCancelAppointment(appointment.id)
                              }}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              Yes, Cancel Appointment
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="bg-neutral-900 border-neutral-700 text-white">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription className="text-neutral-400">
                {selectedAppointment.patientName} - {selectedAppointment.time}
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-neutral-800">
                <TabsTrigger value="details" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Details</TabsTrigger>
                <TabsTrigger value="actions" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="space-y-4">
                  <div>
                    <strong>Patient:</strong> {selectedAppointment.patientName}
                  </div>
                  <div>
                    <strong>Doctor:</strong> {selectedAppointment.doctorName}
                  </div>
                  <div>
                    <strong>Date:</strong> {selectedAppointment.date}
                  </div>
                  <div>
                    <strong>Time:</strong> {selectedAppointment.time}
                  </div>
                  <div>
                    <strong>Duration:</strong> {selectedAppointment.duration} minutes
                  </div>
                  <div>
                    <strong>Status:</strong> {selectedAppointment.status}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="actions">
                {selectedAppointment.status === 'Scheduled' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full bg-red-600 text-white hover:bg-red-700">
                        Cancel Appointment
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-neutral-900 border-neutral-700 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                        <AlertDialogDescription className="text-neutral-400">
                          Are you sure you want to cancel this appointment for {selectedAppointment.patientName}?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-neutral-800 text-white hover:bg-neutral-700">
                          No, Keep Appointment
                        </AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleCancelAppointment(selectedAppointment.id)}
                          className="bg-red-600 text-white hover:bg-red-700"
                        >
                          Yes, Cancel Appointment
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </TabsContent>
            </Tabs>
            <DialogClose />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}