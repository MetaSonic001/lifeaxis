'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, Calendar, Clock, User, Building } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for appointments
const appointments = [
  {
    id: '1',
    doctorName: 'Dr. John Doe',
    hospitalName: 'City General Hospital',
    date: '2023-07-15',
    time: '10:00 AM',
    status: 'upcoming',
    location: '123 Main St, Cityville',
  },
  {
    id: '2',
    doctorName: 'Dr. Jane Smith',
    hospitalName: 'Central Medical Center',
    date: '2023-06-30',
    time: '2:00 PM',
    status: 'completed',
    location: '456 Oak Ave, Townsburg',
  },
  // Add more mock appointments as needed
]

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const router = useRouter()

  const filteredAppointments = appointments.filter(app => 
    (activeTab === 'upcoming' && app.status === 'upcoming') ||
    (activeTab === 'completed' && app.status === 'completed') ||
    (activeTab === 'cancelled' && app.status === 'cancelled')
  )

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="mb-4">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-500">{appointment.hospitalName}</p>
                      </div>
                      {appointment.status === 'upcoming' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive">Cancel</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cancel Appointment</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to cancel this appointment? A cancellation fee may apply.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Keep Appointment</Button>
                              <Button variant="destructive">Cancel Appointment</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{appointment.location}</span>
                      </div>
                      <div>
                        <Button variant="outline" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appointment.location)}`)}>
                          Show on Maps
                        </Button>
                      </div>
                    </div>
                    {appointment.status === 'completed' && (
                      <div className="mt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Leave Feedback</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Leave Feedback</DialogTitle>
                              <DialogDescription>
                                Please rate your experience and leave a comment.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div>
                                <Label htmlFor="doctor-rating">Doctor Rating</Label>
                                <Input id="doctor-rating" type="number" min="1" max="5" />
                              </div>
                              <div>
                                <Label htmlFor="hospital-rating">Hospital Rating</Label>
                                <Input id="hospital-rating" type="number" min="1" max="5" />
                              </div>
                              <div>
                                <Label htmlFor="comment">Comment</Label>
                                <Input id="comment" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Submit Feedback</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

