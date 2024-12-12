import { Button } from '@/components/ui/button'
import { Clock, Star, Video } from 'lucide-react'

export default function OnlineConsultationSection() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Online Consultations</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Why Choose Online Consultations?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Video className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" />
                <span>Connect with top specialists from the comfort of your home</span>
              </li>
              <li className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" />
                <span>Save time with reduced wait times and no travel</span>
              </li>
              <li className="flex items-start">
                <Star className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" />
                <span>Access a wider range of specialists and get second opinions easily</span>
              </li>
            </ul>
            <Button size="lg" className="mt-6">Schedule a Video Consultation</Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Patient Testimonial</h3>
            <p className="text-gray-600 mb-4">
              &quot;I was amazed by how easy and convenient the online consultation was. The doctor was very attentive and provided great advice. It saved me so much time!&quot;
            </p>
            <div className="flex items-center">
              <img src="/placeholder.svg" alt="Patient" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold">Sarah Thompson</p>
                <p className="text-sm text-gray-500">Online Consultation Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

