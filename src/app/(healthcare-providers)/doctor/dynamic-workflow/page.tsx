'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import React, { useEffect, useState } from 'react'

type Specialist = {
  id: number
  name: string
  specialty: string
  availability: 'Available' | 'Busy' | 'Offline'
}

type CollaborationRequest = {
  id: number
  patientName: string
  requestingDoctor: string
  specialty: string
  status: 'Pending' | 'Accepted' | 'Completed'
}

type Appointment = {
  id: number
  patientName: string
  time: string
  priority: 'Low' | 'Medium' | 'High' | 'Emergency'
  type: 'In-person' | 'Teleconsultation' | 'Surgery'
  specialistId?: number
}

export default function MedicalCollaborationHub() {
  const [specialists, setSpecialists] = useState<Specialist[]>([
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', availability: 'Available' },
    { id: 2, name: 'Dr. Michael Lee', specialty: 'Neurology', availability: 'Busy' },
    { id: 3, name: 'Dr. Emily Chen', specialty: 'Oncology', availability: 'Available' },
    { id: 4, name: 'Dr. David Brown', specialty: 'Orthopedics', availability: 'Offline' },
  ])

  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: 'John Doe', time: '09:00', priority: 'Medium', type: 'In-person', specialistId: 1 },
    { id: 2, patientName: 'Jane Smith', time: '10:00', priority: 'High', type: 'Teleconsultation', specialistId: 2 },
    { id: 3, patientName: 'Bob Johnson', time: '11:00', priority: 'Low', type: 'In-person', specialistId: 3 },
    { id: 4, patientName: 'Alice Brown', time: '13:00', priority: 'Emergency', type: 'Surgery', specialistId: 4 },
  ])

  const [currentTime, setCurrentTime] = useState(new Date())
  const [newRequest, setNewRequest] = useState({
    patientName: '',
    specialty: '',
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const handleSubmitCollaborationRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const newCollaborationRequest: CollaborationRequest = {
      id: collaborationRequests.length + 1,
      patientName: newRequest.patientName,
      requestingDoctor: 'Dr. Current User',
      specialty: newRequest.specialty,
      status: 'Pending',
    }
    setCollaborationRequests([...collaborationRequests, newCollaborationRequest])
    setNewRequest({ patientName: '', specialty: '' })
  }

  const handleUpdateCollaborationRequestStatus = (id: number, newStatus: CollaborationRequest['status']) => {
    setCollaborationRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    )
  }

  const handleUpdateAppointmentPriority = (id: number, newPriority: Appointment['priority']) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === id ? { ...appointment, priority: newPriority } : appointment
      )
    )
  }

  const sortedAppointments = [...appointments].sort((a, b) => {
    const priorityOrder = { Emergency: 0, High: 1, Medium: 2, Low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className="bg-black text-white p-6 space-y-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Medical Collaboration & Workflow Management</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Available Specialists Card */}
        <Card className="bg-black border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Available Specialists</CardTitle>
            <CardDescription className="text-white/70">Specialists currently ready for collaboration</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Specialty</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specialists.map(specialist => (
                  <TableRow key={specialist.id} className="border-white/10">
                    <TableCell className="text-white">{specialist.name}</TableCell>
                    <TableCell className="text-white">{specialist.specialty}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded ${
                          specialist.availability === 'Available' ? 'bg-white text-black' :
                          specialist.availability === 'Busy' ? 'bg-white/30 text-white' :
                          'bg-red-500 text-white'
                        }`}
                      >
                        {specialist.availability}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Appointments Card */}
        <Card className="bg-black border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Current Workflow</CardTitle>
            <CardDescription className="text-white/70">Current Time: {currentTime.toLocaleTimeString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-white">Time</TableHead>
                  <TableHead className="text-white">Patient</TableHead>
                  <TableHead className="text-white">Priority</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAppointments.map(appointment => (
                  <TableRow 
                    key={appointment.id} 
                    className={`border-white/10 ${
                      appointment.priority === 'Emergency' ? 'bg-red-900/30' :
                      appointment.priority === 'High' ? 'bg-yellow-900/30' :
                      appointment.priority === 'Medium' ? 'bg-blue-900/30' :
                      'bg-green-900/30'
                    }`}
                  >
                    <TableCell className="text-white">{appointment.time}</TableCell>
                    <TableCell className="text-white">{appointment.patientName}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded ${
                          appointment.priority === 'Emergency' ? 'bg-red-500 text-white' :
                          appointment.priority === 'High' ? 'bg-yellow-500 text-black' :
                          appointment.priority === 'Medium' ? 'bg-blue-500 text-white' :
                          'bg-green-500 text-white'
                        }`}
                      >
                        {appointment.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={appointment.priority}
                        onValueChange={(value: Appointment['priority']) => 
                          handleUpdateAppointmentPriority(appointment.id, value)
                        }
                      >
                        <SelectTrigger className="w-[120px] bg-white/10 text-white border-white/20">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20">
                          <SelectItem value="Low" className="text-white hover:bg-white/10">Low</SelectItem>
                          <SelectItem value="Medium" className="text-white hover:bg-white/10">Medium</SelectItem>
                          <SelectItem value="High" className="text-white hover:bg-white/10">High</SelectItem>
                          <SelectItem value="Emergency" className="text-white hover:bg-white/10">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Collaboration Requests Section */}
      <Card className="bg-black border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Collaboration Requests</CardTitle>
          <CardDescription className="text-white/70">Submit and manage inter-departmental collaboration requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Request Submission Form */}
            <div>
              <form onSubmit={handleSubmitCollaborationRequest} className="space-y-4">
                <div>
                  <Label className="text-white">Patient Name</Label>
                  <Input
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-white/50"
                    value={newRequest.patientName}
                    onChange={(e) => setNewRequest({ ...newRequest, patientName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label className="text-white">Required Specialty</Label>
                  <Input
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-white/50"
                    value={newRequest.specialty}
                    onChange={(e) => setNewRequest({ ...newRequest, specialty: e.target.value })}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-white text-black hover:bg-white/80"
                >
                  Submit Collaboration Request
                </Button>
              </form>
            </div>

            {/* Requests Table */}
            <div>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white">Patient</TableHead>
                    <TableHead className="text-white">Specialty</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collaborationRequests.map(request => (
                    <TableRow key={request.id} className="border-white/10">
                      <TableCell className="text-white">{request.patientName}</TableCell>
                      <TableCell className="text-white">{request.specialty}</TableCell>
                      <TableCell>
                        <span 
                          className={`px-2 py-1 rounded ${
                            request.status === 'Pending' ? 'bg-white/30 text-white' :
                            request.status === 'Accepted' ? 'bg-white text-black' :
                            'bg-green-500 text-white'
                          }`}
                        >
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={request.status}
                          onValueChange={(value: CollaborationRequest['status']) => 
                            handleUpdateCollaborationRequestStatus(request.id, value)
                          }
                        >
                          <SelectTrigger className="w-[120px] bg-white/10 text-white border-white/20">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-white/20">
                            <SelectItem value="Pending" className="text-white hover:bg-white/10">Pending</SelectItem>
                            <SelectItem value="Accepted" className="text-white hover:bg-white/10">Accepted</SelectItem>
                            <SelectItem value="Completed" className="text-white hover:bg-white/10">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}