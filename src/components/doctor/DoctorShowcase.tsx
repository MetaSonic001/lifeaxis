"use client"

import { Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

const doctors = [
  {
    id: "1",
    name: "Dr. Emily Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    image: "/placeholder.svg?height=256&width=256",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.8,
    image: "/placeholder.svg?height=256&width=256",
  },
  {
    id: "3",
    name: "Dr. Sarah Patel",
    specialty: "Pediatrician",
    rating: 4.7,
    image: "/placeholder.svg?height=256&width=256",
  },
]

export default function DoctorShowcase() {
  const handleBookAppointment = (doctorName: string, doctorId: string) => {
    toast({
      title: "Book Appointment",
      description: `Booking appointment with ${doctorName}`,
    })
    // In a real app, this would open booking modal or navigate to booking page
    setTimeout(() => {
      window.location.href = `/doctors/${doctorId}/book`
    }, 1000)
  }

  const handleViewAll = () => {
    toast({
      title: "View All Doctors",
      description: "Loading all available doctors...",
    })
    setTimeout(() => {
      window.location.href = "/doctors"
    }, 500)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 sm:mb-0">
            Top Rated Doctors
          </h2>
          <Button onClick={handleViewAll} variant="link" className="text-blue-600 hover:text-blue-700 font-medium">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-0"
            >
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-slate-700">{doctor.name}</h3>
                <p className="text-blue-600 mb-3 font-medium">{doctor.specialty}</p>
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-400 w-5 h-5 fill-current" />
                  <span className="ml-1 text-slate-600 font-medium">{doctor.rating}</span>
                </div>
                <Button
                  onClick={() => handleBookAppointment(doctor.name, doctor.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
