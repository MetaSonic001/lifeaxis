'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Phone, Clock, Search, Filter, Heart } from 'lucide-react'

export default function FindHospitals() {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('all')
  const [specialty, setSpecialty] = useState('all')
  const hospitals = [
    { id: 1, name: "City General Hospital", location: "Downtown", specialties: ["Cardiology", "Neurology", "Orthopedics"], avgCost: 1500, rating: 4.5, emergencyServices: true, image: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 2, name: "Sunrise Medical Center", location: "Uptown", specialties: ["Pediatrics", "Obstetrics", "Oncology"], avgCost: 1800, rating: 4.7, emergencyServices: true, image: "https://images.pexels.com/photos/20242798/pexels-photo-20242798/free-photo-of-corner-of-white-residential-building.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
    { id: 3, name: "Green Valley Clinic", location: "Suburbs", specialties: ["Family Medicine", "Dermatology", "Psychiatry"], avgCost: 1200, rating: 4.3, emergencyServices: false, image: "https://images.pexels.com/photos/20902709/pexels-photo-20902709/free-photo-of-ambulance-driving-up-to-the-hospital.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 4, name: "Tech Health Institute", location: "Midtown", specialties: ["Cardiology", "Neurology", "Oncology"], avgCost: 2000, rating: 4.8, emergencyServices: true, image: "https://images.pexels.com/photos/668299/pexels-photo-668299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 5, name: "Harbor View Hospital", location: "Waterfront", specialties: ["Orthopedics", "Rehabilitation", "Sports Medicine"], avgCost: 1700, rating: 4.6, emergencyServices: true, image: "https://images.pexels.com/photos/9703033/pexels-photo-9703033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  ]
  
  const filteredHospitals = hospitals.filter(hospital => 
    (hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     hospital.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (location === 'all' || hospital.location === location) &&
    (specialty === 'all' || hospital.specialties.includes(specialty))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Hospitals Near You</h1>
          <p className="text-xl text-blue-100 mb-8">Discover top-rated healthcare facilities in your area</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Search hospitals or specialties..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg w-full bg-white text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location" className="w-full mt-1">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Downtown">Downtown</SelectItem>
                  <SelectItem value="Uptown">Uptown</SelectItem>
                  <SelectItem value="Suburbs">Suburbs</SelectItem>
                  <SelectItem value="Midtown">Midtown</SelectItem>
                  <SelectItem value="Waterfront">Waterfront</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="specialty" className="text-sm font-medium text-gray-700">Specialty</Label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger id="specialty" className="w-full mt-1">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Oncology">Oncology</SelectItem>
                  <SelectItem value="Family Medicine">Family Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">Found {filteredHospitals.length} hospitals</p>
        </div>

        {/* Hospitals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="relative">
                  <img 
                    src={hospital.image} 
                    alt={hospital.name} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {hospital.emergencyServices && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                      24/7 Emergency
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <CardTitle className="text-xl font-bold">{hospital.name}</CardTitle>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{hospital.location}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-semibold">{hospital.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    ${hospital.avgCost} avg/visit
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Key Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-blue-50 text-blue-700"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button 
                  asChild 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Link href={`/hospital/${hospital.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}