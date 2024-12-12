import { Button } from '@/components/ui/button'
import { Search, Calendar, Video, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your Health, Our Priority
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Experience healthcare reimagined with DocDial. Find top doctors, book appointments, and manage your health with ease.
            </p>
            <div className="bg-white rounded-lg p-2 mb-6">
              <div className="flex">
                <Input
                  type="search"
                  placeholder="Search doctors, specialties, hospitals..."
                  className="flex-grow border-none focus:ring-0 text-gray-800"
                />
                <Button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Calendar className="mr-2 h-5 w-5" /> Book Appointment
              </Button>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Video className="mr-2 h-5 w-5" /> Virtual Consultation
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="/hero-doctor.png" 
              alt="Professional Doctor" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 right-4 bg-blue-800 rounded-lg p-4 shadow-xl">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-green-400 mr-3" />
                <div>
                  <p className="text-xl font-bold">24/7</p>
                  <p className="text-sm">Medical Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </section>
  )
}

