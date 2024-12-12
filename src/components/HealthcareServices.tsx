import { Button } from '@/components/ui/button'
import { Hospital, Microscope, Pill, Ambulance, AmbulanceIcon as FirstAid, Activity } from 'lucide-react'

const services = [
  { name: 'Hospital Care', icon: Hospital, description: 'World-class inpatient and outpatient care' },
  { name: 'Diagnostic Services', icon: Microscope, description: 'Advanced testing and imaging facilities' },
  { name: 'Pharmacy', icon: Pill, description: 'Full-service pharmacy with home delivery' },
  { name: 'Emergency Services', icon: Ambulance, description: '24/7 emergency medical assistance' },
  { name: 'Home Healthcare', icon: FirstAid, description: 'Professional medical care in the comfort of your home' },
  { name: 'Preventive Care', icon: Activity, description: 'Comprehensive health check-ups and screenings' },
]

export default function HealthcareServices() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Comprehensive Healthcare Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.name} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <service.icon className="w-12 h-12 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Button variant="outline" className="w-full text-blue-800 border-blue-800 hover:bg-blue-50">Learn More</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

