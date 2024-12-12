import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AppointmentBooking() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Health, Our Priority</h2>
        <p className="text-xl text-gray-600 mb-8">
          Take the first step towards better health. Book your appointment now and experience healthcare reimagined.
        </p>
        <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 text-lg">
          <Calendar className="w-6 h-6 mr-2" />
          Schedule Your Visit Today
        </Button>
      </div>
    </section>
  )
}

