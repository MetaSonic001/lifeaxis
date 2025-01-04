'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const hospitals = [
  { id: 1, name: "City General Hospital", location: "Downtown", specialties: ["Cardiology", "Neurology", "Orthopedics"], avgCost: 1500, rating: 4.5, emergencyServices: true, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Sunrise Medical Center", location: "Uptown", specialties: ["Pediatrics", "Obstetrics", "Oncology"], avgCost: 1800, rating: 4.7, emergencyServices: true, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Green Valley Clinic", location: "Suburbs", specialties: ["Family Medicine", "Dermatology", "Psychiatry"], avgCost: 1200, rating: 4.3, emergencyServices: false, image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Tech Health Institute", location: "Midtown", specialties: ["Cardiology", "Neurology", "Oncology"], avgCost: 2000, rating: 4.8, emergencyServices: true, image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Harbor View Hospital", location: "Waterfront", specialties: ["Orthopedics", "Rehabilitation", "Sports Medicine"], avgCost: 1700, rating: 4.6, emergencyServices: true, image: "/placeholder.svg?height=100&width=100" },
]

export default function FindHospitals() {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('all')
  const [specialty, setSpecialty] = useState('all')

  const filteredHospitals = hospitals.filter(hospital => 
    (hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     hospital.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (location === 'all' || hospital.location === location) &&
    (specialty === 'all' || hospital.specialties.includes(specialty))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find a Hospital</h1>
      
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2">
          <Label htmlFor="search">Search</Label>
          <Input 
            id="search"
            type="text" 
            placeholder="Search by hospital name or specialty" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
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
          <Label htmlFor="specialty">Specialty</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger id="specialty">
              <SelectValue placeholder="Select specialty" />
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img src={hospital.image} alt={hospital.name} className="w-16 h-16 rounded" />
                <div>
                  <CardTitle>{hospital.name}</CardTitle>
                  <p className="text-sm text-gray-500">{hospital.location}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2"><strong>Specialties:</strong> {hospital.specialties.join(', ')}</p>
              <p className="mb-2"><strong>Avg. Cost:</strong> ${hospital.avgCost}</p>
              <p className="mb-2"><strong>Rating:</strong> ⭐ {hospital.rating.toFixed(1)} / 5</p>
              <p><strong>Emergency Services:</strong> {hospital.emergencyServices ? 'Available' : 'Not Available'}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/hospital/${hospital.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

