import { Shield, Clock, SmartphoneIcon as Mobile, Award } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Secure Health Records',
    description: 'Your medical data is protected with state-of-the-art blockchain technology.',
  },
  {
    icon: Clock,
    title: 'Quick Appointments',
    description: 'Book appointments with top doctors in just a few clicks.',
  },
  {
    icon: Mobile,
    title: 'Telemedicine',
    description: 'Consult with healthcare professionals from the comfort of your home.',
  },
  {
    icon: Award,
    title: 'Quality Care',
    description: 'Access a network of certified and experienced medical professionals.',
  },
]

export default function FeatureHighlights() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose DocDial</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

