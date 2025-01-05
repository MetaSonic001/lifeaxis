"use client"

import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockProviders = [
  { id: 1, name: 'Dr. Emily Johnson', type: 'Cardiologist', lat: 40.7128, lng: -74.0060 },
  { id: 2, name: 'Central Hospital', type: 'Hospital', lat: 40.7282, lng: -73.9942 },
  { id: 3, name: 'Dr. Michael Chen', type: 'Pediatrician', lat: 40.7589, lng: -73.9851 },
]

export default function InteractiveMap() {
  const [selectedProvider, setSelectedProvider] = useState<{ id: number; name: string; type: string; lat: number; lng: number } | null>(null)

  interface Provider {
    id: number;
    name: string;
    type: string;
    lat: number;
    lng: number;
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // In a real application, this would trigger a search based on the input
    console.log('Searching for providers...')
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Find Healthcare Providers Near You</h2>
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input type="text" placeholder="Enter your location" className="flex-grow" />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
          <div className="aspect-video bg-blue-100 rounded-lg mb-4 relative">
            {/* This div represents the map. In a real application, you'd use a map library like Google Maps or Mapbox */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-blue-800 font-semibold">Interactive Map</p>
            </div>
            {mockProviders.map((provider) => (
              <Button
                key={provider.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${50 + (provider.lat - 40.7128) * 100}%`, left: `${50 + (provider.lng - -74.0060) * 100}%` }}
                onClick={() => setSelectedProvider(provider)}
              >
                <MapPin className="h-4 w-4" />
              </Button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {mockProviders.map((provider) => (
              <div
                key={provider.id}
                className={`p-4 rounded-lg ${
                  selectedProvider?.id === provider.id ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'
                }`}
              >
                <h3 className="font-semibold">{provider.name}</h3>
                <p className="text-sm text-gray-600">{provider.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

