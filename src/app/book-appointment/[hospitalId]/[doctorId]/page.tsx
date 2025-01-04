'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for doctors
const doctors = [
  { id: "1", name: "Dr. Emily Johnson", specialty: "Cardiologist", hospital: "City Heart Center", avgFee: 150, rating: 4.8, image: "/placeholder.svg?height=200&width=200", experience: "15 years", about: "Dr. Emily Johnson is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.", education: "MD in Cardiology, Harvard Medical School", languages: ["English", "Spanish"], awards: ["Best Cardiologist 2022", "Research Excellence Award 2020"] },
  { id: "2", name: "Dr. Michael Lee", specialty: "Orthopedic Surgeon", hospital: "Central Hospital", avgFee: 180, rating: 4.7, image: "/placeholder.svg?height=200&width=200", experience: "12 years", about: "Dr. Michael Lee is a highly skilled orthopedic surgeon specializing in sports medicine and joint replacement. With 12 years of experience, he has helped numerous patients regain mobility and improve their quality of life.", education: "MD in Orthopedic Surgery, Johns Hopkins University", languages: ["English", "Mandarin"], awards: ["Innovative Surgical Techniques Award 2021", "Patient's Choice Award 2019"] },
]

// Mock data for available time slots
const availableSlots = [
  { id: 1, time: "09:00 AM", price: 150 },
  { id: 2, time: "10:00 AM", price: 150 },
  { id: 3, time: "11:00 AM", price: 150 },
  { id: 4, time: "02:00 PM", price: 180 },
  { id: 5, time: "03:00 PM", price: 180 },
  { id: 6, time: "04:00 PM", price: 180 },
]

export default function BookAppointment() {
  const params = useParams()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(undefined)
  const [doctor, setDoctor] = useState<any | null>(null)

  useEffect(() => {
    if (params.doctorId === 'null') {
      router.push('/find-doctors')
    } else {
      // In a real application, you would fetch the doctor data from an API
      const foundDoctor = doctors.find(d => d.id === params.doctorId)
      setDoctor(foundDoctor || null)
    }
  }, [params.doctorId, router])

  const handleBooking = () => {
    if (selectedDate && selectedSlot) {
      const slot = availableSlots.find(s => s.id.toString() === selectedSlot)
      router.push(`/appointment-details/${params.hospitalId}/${params.doctorId}?date=${selectedDate.toISOString()}&slot=${slot?.time}&price=${slot?.price}`)
    }
  }

  if (!doctor) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Book an Appointment</CardTitle>
          <CardDescription>Select a date and time to book your appointment with {doctor.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{doctor.name}</h2>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.hospital}</p>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">About the Doctor</h3>
                <p className="text-gray-700">{doctor.about}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-gray-700">{doctor.education}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                <p className="text-gray-700">{doctor.experience}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang: string) => (
                    <Badge key={lang} variant="secondary">{lang}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Awards and Recognitions</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {doctor.awards.map((award: string) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Select a Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <h3 className="text-xl font-semibold my-4">Select a Time Slot</h3>
              <Select disabled={!selectedDate} value={selectedSlot} onValueChange={setSelectedSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id.toString()}>
                      {slot.time} - ${slot.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-8">
                <Button onClick={handleBooking} disabled={!selectedDate || !selectedSlot} className="w-full">
                  Proceed to Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

