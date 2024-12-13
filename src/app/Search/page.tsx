'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { DoctorCard } from '@/components/doctor-card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'

const specialties = [
  'ALL',
  'CARDIOLOGY',
  'NEUROLOGY',
  'ORTHOPEDICS',
  'DERMATOLOGY',
  'GYNECOLOGY',
]

const doctors = [
  {
    id: '1',
    name: 'Dr. Topon Kumar',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.8,
    specialty: 'NEUROLOGY',
  },
  {
    id: '2',
    name: 'Dr. Albert Miles',
    image: '/placeholder.svg?height=200&width=200',
    rating: 5.0,
    specialty: 'CARDIOLOGY',
  },
  {
    id: '3',
    name: 'Dr. Gabriel Holt',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.8,
    specialty: 'NEUROLOGY',
  },
  {
    id: '4',
    name: 'Dr. Owen Larson',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.9,
    specialty: 'DERMATOLOGY',
  },
  {
    id: '5',
    name: 'Dr. Teresa Schwartz',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.5,
    specialty: 'GYNECOLOGY',
  },
  {
    id: '6',
    name: 'Dr. Mary Garcia',
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.6,
    specialty: 'NEUROLOGY',
  },
]

export default function Home() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDoctors = doctors.filter((doctor) =>
    (selectedSpecialty === 'ALL' || doctor.specialty === selectedSpecialty) &&
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      className="flex min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Sidebar activePage="doctors" />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Search for Doctors</h1>
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

          <Tabs value={selectedSpecialty} onValueChange={setSelectedSpecialty} className="mb-8">
            <TabsList className="w-full justify-start">
              {specialties.map((specialty) => (
                <TabsTrigger
                  key={specialty}
                  value={specialty}
                  className="px-4 py-2 data-[state=active]:bg-blue-800 data-[state=active]:text-white"
                >
                  {specialty}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  )
}

