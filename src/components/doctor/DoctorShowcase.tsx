import { Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const doctors = [
  { name: 'Dr. Emily Johnson', specialty: 'Cardiologist', rating: 4.9, image: '/doctor1.jpg' },
  { name: 'Dr. Michael Chen', specialty: 'Neurologist', rating: 4.8, image: '/doctor2.jpg' },
  { name: 'Dr. Sarah Patel', specialty: 'Pediatrician', rating: 4.7, image: '/doctor3.jpg' },
]

export default function DoctorShowcase() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Top Rated Doctors</h2>
          <Button variant="link" className="text-blue-800 hover:text-blue-900">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.name} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
              <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{doctor.name}</h3>
                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-400 w-5 h-5" />
                  <span className="ml-1 text-gray-600">{doctor.rating}</span>
                </div>
                <Button className="w-full bg-blue-800 hover:bg-blue-900">Book Appointment</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

