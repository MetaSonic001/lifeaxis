import React from 'react';
import { 
  Heart, Brain, Bone, Eye, Ear, Stethoscope, Baby, Syringe,
  Users, Clock, Calendar, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  { 
    name: 'Cardiology',
    icon: Heart,
    color: 'bg-red-100 text-red-600 hover:bg-red-200',
    border: 'group-hover:border-red-200',
    description: 'Heart and cardiovascular system care',
    stats: { doctors: '45+', waitTime: '< 24hrs' }
  },
  { 
    name: 'Neurology',
    icon: Brain,
    color: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    border: 'group-hover:border-purple-200',
    description: 'Brain and nervous system treatments',
    stats: { doctors: '38+', waitTime: '< 48hrs' }
  },
  { 
    name: 'Orthopedics',
    icon: Bone,
    color: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
    border: 'group-hover:border-orange-200',
    description: 'Bone and joint specialist care',
    stats: { doctors: '42+', waitTime: '< 24hrs' }
  },
  { 
    name: 'Ophthalmology',
    icon: Eye,
    color: 'bg-green-100 text-green-600 hover:bg-green-200',
    border: 'group-hover:border-green-200',
    description: 'Complete eye care services',
    stats: { doctors: '35+', waitTime: '< 24hrs' }
  },
  { 
    name: 'ENT',
    icon: Ear,
    color: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200',
    border: 'group-hover:border-yellow-200',
    description: 'Ear, nose, and throat care',
    stats: { doctors: '32+', waitTime: '< 24hrs' }
  },
  { 
    name: 'General Medicine',
    icon: Stethoscope,
    color: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    border: 'group-hover:border-blue-200',
    description: 'Primary healthcare services',
    stats: { doctors: '50+', waitTime: '< 12hrs' }
  },
  { 
    name: 'Pediatrics',
    icon: Baby,
    color: 'bg-pink-100 text-pink-600 hover:bg-pink-200',
    border: 'group-hover:border-pink-200',
    description: 'Specialized child healthcare',
    stats: { doctors: '40+', waitTime: '< 24hrs' }
  },
  { 
    name: 'Vaccination',
    icon: Syringe,
    color: 'bg-teal-100 text-teal-600 hover:bg-teal-200',
    border: 'group-hover:border-teal-200',
    description: 'Immunization services',
    stats: { doctors: '25+', waitTime: '< 1hr' }
  },
];

export default function ServiceCategories() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Medical Specialties
          </h2>
          <p className="text-lg text-gray-600">
            Expert healthcare services provided by our team of specialized medical professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className="group border hover:border-transparent transition-all duration-300 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 transform group-hover:rotate-6`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                    <span className="text-sm font-medium">{category.stats.doctors}</span>
                    <p className="text-xs text-gray-500">Doctors</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                    <span className="text-sm font-medium">{category.stats.waitTime}</span>
                    <p className="text-xs text-gray-500">Wait Time</p>
                  </div>
                </div>

                <Button 
                  variant="ghost"
                  className="w-full group-hover:bg-gray-50 justify-between"
                >
                  Book Appointment
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white hover:bg-gray-50"
          >
            <Calendar className="mr-2 h-4 w-4" />
            View All Specialties
          </Button>
        </div>
      </div>
    </section>
  );
}