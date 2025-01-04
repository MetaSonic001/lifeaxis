'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FindHospital() {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('')

  const hospitals = [
    { id: 1, name: "City General Hospital", specialty: "Multi-specialty", location: "Downtown", rating: 4.5, emergencyServices: true, image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Sunrise Medical Center", specialty: "Cardiology, Neurology", location: "Uptown", rating: 4.7, emergencyServices: true, image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Green Valley Clinic", specialty: "Family Medicine", location: "Suburbs", rating: 4.3, emergencyServices: false, image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Tech Health Institute", specialty: "Orthopedics, Sports Medicine", location: "Midtown", rating: 4.6, emergencyServices: true, image: "/placeholder.svg?height=100&width=100" },
  ]

  const filteredHospitals = hospitals.filter(hospital => 
    (hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     hospital.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (specialty === '' || hospital.specialty.toLowerCase().includes(specialty.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find a Hospital</h1>
      
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-3">
          <Label htmlFor="search">Search</Label>
          <Input 
            id="search"
            type="text" 
            placeholder="Search by hospital name or location" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="specialty">Specialty</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger id="specialty">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Specialties</SelectItem>
              <SelectItem value="Multi-specialty">Multi-specialty</SelectItem>
              <SelectItem value="Cardiology">Cardiology</SelectItem>
              <SelectItem value="Neurology">Neurology</SelectItem>
              <SelectItem value="Family Medicine">Family Medicine</SelectItem>
              <SelectItem value="Orthopedics">Orthopedics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img src={hospital.image} alt={hospital.name} className="w-24 h-24 rounded" />
                <div>
                  <CardTitle>{hospital.name}</CardTitle>
                  <CardDescription>{hospital.location}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>Specialty:</strong> {hospital.specialty}</p>
              <p className="mb-2"><strong>Rating:</strong> {hospital.rating} / 5</p>
              <p><strong>Emergency Services:</strong> {hospital.emergencyServices ? 'Available' : 'Not Available'}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/hospital/${hospital.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

