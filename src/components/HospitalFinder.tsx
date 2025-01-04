import React from 'react';
import { Search, MapPin, Star, Phone, Clock, Award, Users, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const hospitals = [
  {
    name: 'Central Hospital',
    location: 'New York',
    rating: 4.8,
    reviews: 1248,
    specialties: ['Cardiology', 'Neurology', 'Oncology'],
    phone: '(212) 555-0123',
    hours: '24/7',
    emergency: true,
    doctors: 150,
    img:"https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: 'City Medical Center',
    location: 'Los Angeles',
    rating: 4.7,
    reviews: 892,
    specialties: ['Pediatrics', 'Orthopedics', 'Surgery'],
    phone: '(310) 555-0124',
    hours: '24/7',
    emergency: true,
    doctors: 200,
    img:"https://images.pexels.com/photos/20242798/pexels-photo-20242798/free-photo-of-corner-of-white-residential-building.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
  },
  {
    name: 'Riverside Health',
    location: 'Chicago',
    rating: 4.9,
    reviews: 1563,
    specialties: ['Internal Medicine', 'Dermatology', 'ENT'],
    phone: '(312) 555-0125',
    hours: '24/7',
    emergency: true,
    doctors: 175,
    img:"https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const features = [
  { icon: Award, title: 'Top-Rated', description: 'Highest rated hospitals in your area' },
  { icon: Users, title: 'Expert Staff', description: 'Experienced healthcare professionals' },
  { icon: Stethoscope, title: 'Specialized Care', description: 'Advanced medical treatments' }
];

export default function HospitalFinder() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find World-Class Hospitals Near You
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover top-rated medical facilities with expert healthcare professionals and specialized treatments
          </p>
          
          <Card className="shadow-xl">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Enter your location"
                    className="pl-10 bg-white"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                  <Search className="mr-2 h-4 w-4" /> Find Hospitals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hospitals.map((hospital) => (
            <Card 
              key={hospital.name} 
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={hospital.img}
                  alt={hospital.name}
                  className="w-full h-56 object-cover"
                />
                {hospital.emergency && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    24/7 Emergency
                  </div>
                )}
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-xl mb-2">{hospital.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> {hospital.location}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 w-5 h-5" />
                    <span className="ml-1 font-semibold">{hospital.rating}</span>
                    <span className="ml-1 text-gray-500">({hospital.reviews})</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{hospital.doctors} Doctors</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" /> {hospital.phone}
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> {hospital.hours}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty) => (
                    <span 
                      key={specialty}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}