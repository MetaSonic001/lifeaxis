"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'Patient',
    image: '/testimonial1.jpg',
    quote: 'LifeAxis has revolutionized how I manage my healthcare. The ease of booking appointments and accessing my medical records is incredible.',
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Cardiologist',
    image: '/testimonial2.jpg',
    quote: 'As a healthcare provider, LifeAxis has streamlined my practice and improved patient care. The platform is intuitive and efficient.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Mother of Two',
    image: '/testimonial3.jpg',
    quote: 'The telemedicine feature on LifeAxis has been a lifesaver for my family. We can consult with doctors without leaving our home.',
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-blue-800 rounded-lg p-8 shadow-xl">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-blue-300">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-lg mb-4">"{testimonial.quote}"</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

