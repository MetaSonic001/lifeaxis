import { Search, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const hospitals = [
  { name: 'Central Hospital', location: 'New York', rating: 4.8, image: '/hospital1.jpg' },
  { name: 'City Medical Center', location: 'Los Angeles', rating: 4.7, image: '/hospital2.jpg' },
  { name: 'Riverside Health', location: 'Chicago', rating: 4.9, image: '/hospital3.jpg' },
]

export default function HospitalFinder() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Find Hospitals Near You</h2>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <Input
              type="search"
              placeholder="Enter your location"
              className="flex-grow border-none bg-transparent focus:ring-0"
            />
            <Button className="ml-2 bg-blue-800 hover:bg-blue-900">
              <Search className="mr-2 h-4 w-4" /> Find Hospitals
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {hospitals.map((hospital) => (
            <div key={hospital.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={hospital.image} alt={hospital.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{hospital.name}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> {hospital.location}
                </p>
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-400 w-5 h-5" />
                  <span className="ml-1 text-gray-600">{hospital.rating}</span>
                </div>
                <Button className="w-full bg-blue-800 hover:bg-blue-900">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

