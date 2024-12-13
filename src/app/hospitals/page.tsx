'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { HospitalCard } from '@/components/hospital-card'
import { Input } from '@/components/ui/input'

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

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="hospitals" />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Search for Hospitals</h1>
            <div className="relative w-80">
              <Input
                type="text"
                placeholder="Search Hospital"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <HospitalCard key={hospital.id} {...hospital} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

