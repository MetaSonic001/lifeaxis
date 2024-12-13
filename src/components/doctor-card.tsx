import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DoctorCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  specialty: string;
}

export function DoctorCard({
  id,
  name,
  image,
  rating,
  specialty,
}: DoctorCardProps) {
  return (
    <Link href={`/doctors/${id}`} className="block">
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-blue-600 text-sm font-medium">{specialty}</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating.toFixed(1)}
          </span>
        </div>

        <Button className="w-full">Schedule Appointment</Button>
      </div>
    </Link>
  );
}
