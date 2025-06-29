"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Star } from "lucide-react"
import Link from "next/link"

interface DoctorCardProps {
  id: string
  name: string
  image: string
  rating: number
  specialty: string
}

export function DoctorCard({ id, name, image, rating, specialty }: DoctorCardProps) {
  const handleScheduleAppointment = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent Link navigation
    toast({
      title: "Schedule Appointment",
      description: `Scheduling appointment with ${name}`,
    })
    // In a real app, this would open a scheduling modal or navigate to booking page
    setTimeout(() => {
      window.location.href = `/doctors/${id}/schedule`
    }, 1000)
  }

  return (
    <Link href={`/doctors/${id}`} className="block">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={image || "/placeholder.svg?height=64&width=64"}
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h3 className="font-semibold text-lg text-slate-700">{name}</h3>
              <p className="text-blue-600 text-sm font-medium">{specialty}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-sm text-slate-600">{rating.toFixed(1)}</span>
        </div>

        <Button
          onClick={handleScheduleAppointment}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
        >
          Schedule Appointment
        </Button>
      </div>
    </Link>
  )
}
