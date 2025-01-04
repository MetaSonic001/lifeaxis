import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight, Search } from 'lucide-react'

const popularTests = [
  "Complete Blood Count",
  "Lipid Profile",
  "Thyroid Function Test",
  "Vitamin D Test",
  "HbA1c",
  "Liver Function Test",
]

export default function MedicalTestsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Laboratory Services & Health Check-ups</h2>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for tests or health packages..."
              className="w-full pl-10 pr-4 py-3 rounded-full border-gray-300 focus:border-blue-800 focus:ring-blue-800"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Comprehensive Health Check</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-blue-800 mr-2" />
                Full body check-up
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-blue-800 mr-2" />
                Cardiac risk assessment
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-blue-800 mr-2" />
                Diabetes screening
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-blue-800 mr-2" />
                Cancer markers
              </li>
            </ul>
            <Button className="w-full bg-blue-800 text-white hover:bg-blue-900">Book Now</Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Womens Wellness Package</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-green-700 mr-2" />
                Gynecological exam
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-green-700 mr-2" />
                Mammography
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-green-700 mr-2" />
                Pap smear
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-green-700 mr-2" />
                Bone density scan
              </li>
            </ul>
            <Button className="w-full bg-green-700 hover:bg-green-800 text-white">Book Now</Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Senior Citizen Health Package</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-purple-700 mr-2" />
                Comprehensive geriatric assessment
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-purple-700 mr-2" />
                Vision and hearing tests
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-purple-700 mr-2" />
                Bone health assessment
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="w-5 h-5 text-purple-700 mr-2" />
                Cognitive function evaluation
              </li>
            </ul>
            <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white">Book Now</Button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Popular Individual Tests</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {popularTests.map((test, index) => (
              <Button key={index} variant="outline" className="justify-start text-blue-800 border-blue-800 hover:bg-blue-50">
                <ChevronRight className="w-5 h-5 mr-2" />
                {test}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">General Health Checkup</h3>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Complete Blood Count</li>
              <li>Lipid Profile</li>
              <li>Liver Function Test</li>
              <li>Kidney Function Test</li>
            </ul>
            <Button className="w-full">Book Now</Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Cardiac Screening</h3>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>ECG</li>
              <li>Echocardiogram</li>
              <li>Stress Test</li>
              <li>Lipid Profile</li>
            </ul>
            <Button className="w-full">Book Now</Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Diabetes Management</h3>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Fasting Blood Sugar</li>
              <li>HbA1c</li>
              <li>Kidney Function Test</li>
              <li>Lipid Profile</li>
            </ul>
            <Button className="w-full">Book Now</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

