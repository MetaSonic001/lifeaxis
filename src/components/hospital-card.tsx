import { Phone, MapPin } from "lucide-react";
import Link from "next/link";

interface HospitalCardProps {
  id: string;
  name: string;
  image: string;
  contactNumber: string;
  location: string;
}

export function HospitalCard({
  id,
  name,
  image,
  contactNumber,
  location,
}: HospitalCardProps) {
  return (
    <Link href={`/hospitals/${id}`}>
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Phone className="w-4 h-4 mr-2" />
          <span>{contactNumber}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{location}</span>
        </div>
      </div>
    </Link>
  );
}
