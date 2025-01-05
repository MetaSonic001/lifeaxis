import { Users, Building, Stethoscope, Activity } from 'lucide-react'

const stats = [
  { title: 'Patients Served', value: '100,000+', icon: Users, color: 'bg-blue-100 text-blue-800' },
  { title: 'Hospitals', value: '500+', icon: Building, color: 'bg-green-100 text-green-800' },
  { title: 'Doctors', value: '5,000+', icon: Stethoscope, color: 'bg-purple-100 text-purple-800' },
  { title: 'Consultations', value: '1M+', icon: Activity, color: 'bg-yellow-100 text-yellow-800' },
]

export default function Statistics() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Transforming Healthcare Together</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.title} className={`${stat.color} rounded-lg p-8 text-center shadow-lg transition-transform hover:scale-105`}>
              <stat.icon className="w-12 h-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-lg font-medium">{stat.title}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xl text-gray-600 mt-12">
          Join the growing community of patients and healthcare providers who trust LifeAxis for their medical needs.
        </p>
      </div>
    </section>
  )
}

