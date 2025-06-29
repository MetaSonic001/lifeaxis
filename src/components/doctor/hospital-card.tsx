import { Phone, MapPin } from "lucide-react"
import Link from "next/link"

interface HospitalCardProps {
  id: string
  name: string
  image: string
  contactNumber: string
  location: string
}

export function HospitalCard({ id, name, image, contactNumber, location }: HospitalCardProps) {
  return (
    <Link href={`/hospitals/${id}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-0">
        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-4 mb-4">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover rounded-lg shadow-sm" />
        </div>

        <h3 className="font-semibold text-lg mb-3 text-slate-700">{name}</h3>

        <div className="space-y-2">
          <div className="flex items-center text-slate-600">
            <Phone className="w-4 h-4 mr-3 text-emerald-600" />
            <span className="text-sm">{contactNumber}</span>
          </div>
          <div className="flex items-center text-slate-600">
            <MapPin className="w-4 h-4 mr-3 text-emerald-600" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
