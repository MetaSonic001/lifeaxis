'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, Award, GraduationCap, Globe, Stethoscope } from 'lucide-react'

const doctors = [
  { id: "1", name: "Dr. Emily Johnson", specialty: "Cardiologist", hospital: "City Heart Center", avgFee: 150, rating: 4.8, image: "/placeholder.svg?height=200&width=200", experience: "15 years", about: "Dr. Emily Johnson is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.", education: "MD in Cardiology, Harvard Medical School", languages: ["English", "Spanish"], awards: ["Best Cardiologist 2022", "Research Excellence Award 2020"] },
  { id: "2", name: "Dr. Anjali Desai", specialty: "Orthopedic Surgeon", hospital: "Central Hospital", avgFee: 180, rating: 4.7, image: "/placeholder.svg?height=200&width=200", experience: "12 years", about: "Dr. Michael Lee is a highly skilled orthopedic surgeon specializing in sports medicine and joint replacement. With 12 years of experience, he has helped numerous patients regain mobility and improve their quality of life.", education: "MD in Orthopedic Surgery, Johns Hopkins University", languages: ["English", "Mandarin"], awards: ["Innovative Surgical Techniques Award 2021", "Patient's Choice Award 2019"] },
]

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading doctor information...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Book an Appointment
          </CardTitle>
          <CardDescription className="text-lg">
            Select a date and time to book your appointment with {doctor.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-6 bg-blue-50 p-6 rounded-xl">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback className="text-2xl">{doctor.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{doctor.name}</h2>
                  <div className="flex items-center space-x-2">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600 font-medium">{doctor.specialty}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">{doctor.rating} Rating</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    About the Doctor
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    Education & Experience
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">{doctor.education}</p>
                    <p className="text-gray-700">{doctor.experience} of Experience</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang: string) => (
                      <Badge key={lang} variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Schedule Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border w-full"
                    classNames={{
                      day_selected: "bg-blue-600 text-white hover:bg-blue-600",
                      day_today: "bg-blue-100 text-blue-900"
                    }}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Available Time Slots</h3>
                    <Select disabled={!selectedDate} value={selectedSlot} onValueChange={setSelectedSlot}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSlots.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id.toString()}>
                            <div className="flex justify-between items-center w-full">
                              <span>{slot.time}</span>
                              <span className="text-blue-600 font-medium">${slot.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleBooking} 
                    disabled={!selectedDate || !selectedSlot} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-medium"
                  >
                    Proceed to Details
                  </Button>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Awards and Recognitions
                </h3>
                <ul className="space-y-2">
                  {doctor.awards.map((award: string) => (
                    <li key={award} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-700">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}