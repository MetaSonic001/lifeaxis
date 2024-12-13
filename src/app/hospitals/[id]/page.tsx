'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { DoctorCard } from '@/components/doctor-card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Phone, MapPin } from 'lucide-react'

const hospitals = [
  {
    id: '1',
    name: 'City General Hospital',
    image: '/placeholder.svg?height=300&width=400',
    contactNumber: '+1 (555) 123-4567',
    location: '123 Main St, Cityville, State 12345',
  },
  {
    id: '2',
    name: 'Sunshine Medical Center',
    image: '/placeholder.svg?height=300&width=400',
    contactNumber: '+1 (555) 987-6543',
    location: '456 Oak Ave, Townsburg, State 67890',
  },
  {
    id: '3',
    name: 'Riverside Community Hospital',
    image: '/placeholder.svg?height=300&width=400',
    contactNumber: '+1 (555) 246-8135',
    location: '789 River Rd, Villageton, State 13579',
  },
]

const doctors = [
  {
    name: 'Dr. Topon Kumar',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.8,
    specialty: 'NEUROLOGY',
  },
  {
    name: 'Dr. Albert Miles',
    image: '/placeholder.svg?height=200&width=200',
    rating: 5.0,
    specialty: 'CARDIOLOGY',
  },
  {
    name: 'Dr. Gabriel Holt',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.8,
    specialty: 'NEUROLOGY',
  },
  {
    name: 'Dr. Owen Larson',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.9,
    specialty: 'DERMATOLOGY',
  },
  {
    name: 'Dr. Teresa Schwartz',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.5,
    specialty: 'GYNECOLOGY',
  },
  {
    name: 'Dr. Mary Garcia',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.6,
    specialty: 'NEUROLOGY',
  },
]

const specialties = [
  'ALL',
  'CARDIOLOGY',
  'NEUROLOGY',
  'ORTHOPEDICS',
  'DERMATOLOGY',
  'GYNECOLOGY',
]

export default function HospitalDetailsPage() {
  const params = useParams()
  const hospitalId = params.id as string
  const hospital = hospitals.find((h) => h.id === hospitalId)

  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDoctors = doctors.filter((doctor) =>
    (selectedSpecialty === 'ALL' || doctor.specialty === selectedSpecialty) &&
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!hospital) {
    return <div>Hospital not found</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="hospitals" />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold">{hospital.name}</h2>
                <div className="flex items-center text-gray-600 mt-2">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{hospital.contactNumber}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{hospital.location}</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Doctors at {hospital.name}</h3>

          <div className="flex justify-between items-center mb-8">
            <Tabs value={selectedSpecialty} onValueChange={setSelectedSpecialty} className="mb-8">
              <TabsList className="w-full justify-start">
                {specialties.map((specialty) => (
                  <TabsTrigger
                    key={specialty}
                    value={specialty}
                    className="px-4 py-2"
                  >
                    {specialty}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="relative w-80">
              <Input
                type="text"
                placeholder="Search Doctor"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.name} {...doctor} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

