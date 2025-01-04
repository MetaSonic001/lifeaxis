import React from 'react';
import { Star, ArrowRight, Calendar, Clock, Users, MessageSquare, Award, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const doctors = [
  {
    name: 'Dr. Emily Johnson',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 428,
    experience: '15+ years',
    education: 'Harvard Medical School',
    availability: 'Mon - Fri',
    nextSlot: 'Tomorrow',
    languages: ['English', 'Spanish'],
    awards: 3,
    patientsServed: '5000+',
    img:"https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    rating: 4.8,
    reviews: 356,
    experience: '12+ years',
    education: 'Stanford Medical School',
    availability: 'Mon - Sat',
    nextSlot: 'Today',
    languages: ['English', 'Mandarin'],
    awards: 2,
    patientsServed: '4000+',
    img:"https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: 'Dr. Sarah Patel',
    specialty: 'Pediatrician',
    rating: 4.7,
    reviews: 392,
    experience: '10+ years',
    education: 'Johns Hopkins Medicine',
    availability: 'Tue - Sat',
    nextSlot: 'Today',
    languages: ['English', 'Hindi'],
    awards: 2,
    patientsServed: '4500+',
    img:"https://images.pexels.com/photos/5452255/pexels-photo-5452255.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const stats = [
  { icon: ThumbsUp, value: '98%', label: 'Satisfaction Rate' },
  { icon: Users, value: '15K+', label: 'Patients Served' },
  { icon: Award, value: '25+', label: 'Medical Awards' }
];

export default function DoctorShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Top Rated Doctors</h2>
            <p className="text-lg text-gray-600">Expert healthcare professionals committed to your well-being</p>
          </div>
          <Button variant="outline" size="lg" className="bg-white">
            View All Doctors <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {doctors.map((doctor) => (
            <Card key={doctor.name} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img 
                  src={doctor.img}
                  alt={doctor.name}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-gray-900">Next: {doctor.nextSlot}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                    <Star className="text-yellow-400 w-4 h-4" />
                    <span className="ml-1 font-semibold">{doctor.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({doctor.reviews})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{doctor.experience}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Patients</p>
                    <p className="font-medium">{doctor.patientsServed}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="font-medium">{doctor.availability}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Languages</p>
                    <p className="font-medium">{doctor.languages.join(', ')}</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  {Array(doctor.awards).fill(0).map((_, i) => (
                    <Award key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Calendar className="mr-2 h-4 w-4" /> Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" /> Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <Card key={label} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{value}</p>
                  <p className="text-gray-600">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}