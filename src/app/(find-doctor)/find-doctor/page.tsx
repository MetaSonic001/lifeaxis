'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FindDoctor() {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('')

  const doctors = [
    { id: 1, name: "Dr. Emily Johnson", specialty: "Cardiologist", hospital: "City Heart Center", rating: 4.8, price: 150, availableTime: "10:00 AM - 4:00 PM", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Dr. Michael Lee", specialty: "Orthopedic Surgeon", hospital: "Central Hospital", rating: 4.7, price: 180, availableTime: "9:00 AM - 3:00 PM", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Dr. Sarah Patel", specialty: "Pediatrician", hospital: "Children's Wellness Clinic", rating: 4.9, price: 130, availableTime: "11:00 AM - 5:00 PM", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Dr. David Chen", specialty: "Dermatologist", hospital: "Skin Care Institute", rating: 4.6, price: 160, availableTime: "2:00 PM - 8:00 PM", image: "/placeholder.svg?height=100&width=100" },
  ]

  const filteredDoctors = doctors.filter(doctor => 
    (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (specialty === '' || doctor.specialty === specialty)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find a Doctor</h1>
      
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-3">
          <Label htmlFor="search">Search</Label>
          <Input 
            id="search"
            type="text" 
            placeholder="Search by name or specialty" 
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
              <SelectItem value="Cardiologist">Cardiologist</SelectItem>
              <SelectItem value="Orthopedic Surgeon">Orthopedic Surgeon</SelectItem>
              <SelectItem value="Pediatrician">Pediatrician</SelectItem>
              <SelectItem value="Dermatologist">Dermatologist</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full" />
                <div>
                  <CardTitle>{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>Hospital:</strong> {doctor.hospital}</p>
              <p className="mb-2"><strong>Rating:</strong> {doctor.rating} / 5</p>
              <p className="mb-2"><strong>Price:</strong> ${doctor.price}</p>
              <p><strong>Available:</strong> {doctor.availableTime}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/doctor/${doctor.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

