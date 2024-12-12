import { Heart, SmileIcon as Tooth, Brain, Stethoscope, Ear, Bone, Eye, TreesIcon as Lungs } from 'lucide-react'

const categories = [
  { name: 'Cardiology', icon: Heart },
  { name: 'Dentistry', icon: Tooth },
  { name: 'Neurology', icon: Brain },
  { name: 'General Medicine', icon: Stethoscope },
  { name: 'ENT', icon: Ear },
  { name: 'Orthopedics', icon: Bone },
  { name: 'Ophthalmology', icon: Eye },
  { name: 'Pulmonology', icon: Lungs },
]

export default function CategoryTiles() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Medical Specialties</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-shadow duration-300 hover:shadow-lg"
            >
              <category.icon className="w-12 h-12 text-blue-800 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

