import { Heart, Brain, Bone, Eye, Ear, Stethoscope, Baby, Syringe } from 'lucide-react'

const categories = [
  { name: 'Cardiology', icon: Heart, color: 'bg-red-100 text-red-600' },
  { name: 'Neurology', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { name: 'Orthopedics', icon: Bone, color: 'bg-orange-100 text-orange-600' },
  { name: 'Ophthalmology', icon: Eye, color: 'bg-green-100 text-green-600' },
  { name: 'ENT', icon: Ear, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'General Medicine', icon: Stethoscope, color: 'bg-blue-100 text-blue-600' },
  { name: 'Pediatrics', icon: Baby, color: 'bg-pink-100 text-pink-600' },
  { name: 'Vaccination', icon: Syringe, color: 'bg-teal-100 text-teal-600' },
]

export default function ServiceCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Medical Specialties</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`${category.color} rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <category.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

