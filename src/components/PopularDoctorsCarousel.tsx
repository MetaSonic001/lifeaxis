"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const doctors = [
  {
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    rating: 4.9,
    image: '/doctor-4.jpg',
    availableSlot: '10:00 AM - 11:00 AM',
  },
  {
    name: 'Dr. Jane Smith',
    specialty: 'Dermatologist',
    rating: 4.8,
    image: '/doctor-5.jpg',
    availableSlot: '2:00 PM - 3:00 PM',
  },
  {
    name: 'Dr. David Lee',
    specialty: 'Orthopedic Surgeon',
    rating: 4.7,
    image: '/doctor-6.jpg',
    availableSlot: '11:30 AM - 12:30 PM',
  },
  {
    name: 'Dr. Maria Garcia',
    specialty: 'Pediatrician',
    rating: 4.9,
    image: '/doctor-7.jpg',
    availableSlot: '3:30 PM - 4:30 PM',
  },
]

export default function PopularDoctorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + doctors.length) % doctors.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Doctors</h2>
        <div className="relative">
          <div className="flex overflow-hidden">
            {doctors.map((doctor, index) => (
              <div
                key={doctor.name}
                className={`w-full flex-shrink-0 transition-all duration-300 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{doctor.name}</h3>
                    <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                    <div className="flex items-center mb-2">
                      <Star className="text-yellow-400 w-5 h-5" />
                      <span className="ml-1 text-gray-600">{doctor.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Next available: {doctor.availableSlot}</p>
                    <Button className="w-full">Book Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}

