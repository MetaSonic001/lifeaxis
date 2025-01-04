'use client'

import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const doctors = [
{ 
  id: "1", 
  name: "Dr. Emily Johnson", 
  specialty: "Cardiologist", 
  hospital: "City Heart Center", 
  avgFee: 150, 
  rating: 4.8, 
  location: "Downtown", 
  image: "/placeholder.svg?height=300&width=300",
  experience: "15 years",
  education: "MD in Cardiology, Harvard Medical School",
  about: "Dr. Emily Johnson is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.",
  services: [
    "Echocardiography",
    "Stress Testing",
    "Holter Monitoring",
    "Cardiac Catheterization",
  ],
  availability: [
    { day: "Monday", time: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", time: "10:00 AM - 6:00 PM" },
    { day: "Friday", time: "9:00 AM - 3:00 PM" },
  ],
  reviews: [
    { id: 1, patient: "John D.", rating: 5, comment: "Dr. Johnson is extremely knowledgeable and caring. She took the time to explain everything in detail." },
    { id: 2, patient: "Sarah M.", rating: 4, comment: "Very professional and thorough. The wait time was a bit long, but the care was excellent." },
  ],
  languages: ["English", "Spanish"],
  awards: [
    "Best Cardiologist 2022",
    "Research Excellence Award 2020",
    "Patient's Choice Award 2019"
  ],
  publications: [
    "Johnson, E. et al. (2021). 'Advances in Preventive Cardiology'. Journal of Cardiovascular Medicine.",
    "Johnson, E. & Smith, J. (2020). 'Long-term Outcomes of Heart Failure Management'. Cardiology Review."
  ],
  professionalMemberships: [
    "American College of Cardiology",
    "American Heart Association",
    "Society for Cardiovascular Angiography and Interventions"
  ]
},
]

export default function DoctorProfile() {
  const params = useParams()
  const doctorId = params.id as string
  const doctor = doctors.find(d => d.id === doctorId)

  if (!doctor) {
    return <div>Doctor not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl mb-2">{doctor.name}</CardTitle>
              <CardDescription className="text-xl mb-2">{doctor.specialty}</CardDescription>
              <p className="mb-2">{doctor.hospital}</p>
              <p className="mb-2">⭐ {doctor.rating} / 5</p>
              <p>{doctor.experience} of experience</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <h3 className="text-xl font-semibold mb-2">About</h3>
              <p>{doctor.about}</p>
              <h3 className="text-xl font-semibold mt-4 mb-2">Education</h3>
              <p>{doctor.education}</p>
              <h3 className="text-xl font-semibold mt-4 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map(lang => (
                  <Badge key={lang} variant="secondary">{lang}</Badge>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="services">
              <h3 className="text-xl font-semibold mb-2">Services</h3>
              <ul className="list-disc pl-5">
                {doctor.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="availability">
              <h3 className="text-xl font-semibold mb-2">Availability</h3>
              <ul>
                {doctor.availability.map((slot, index) => (
                  <li key={index} className="mb-2">
                    <strong>{slot.day}:</strong> {slot.time}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews">
              <h3 className="text-xl font-semibold mb-2">Patient Reviews</h3>
              {doctor.reviews.map((review) => (
                <div key={review.id} className="mb-4">
                  <p><strong>{review.patient}</strong> - ⭐ {review.rating} / 5</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="qualifications">
              <h3 className="text-xl font-semibold mb-2">Awards and Recognitions</h3>
              <ul className="list-disc pl-5 mb-4">
                {doctor.awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mb-2">Publications</h3>
              <ul className="list-disc pl-5 mb-4">
                {doctor.publications.map((publication, index) => (
                  <li key={index}>{publication}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mb-2">Professional Memberships</h3>
              <ul className="list-disc pl-5">
                {doctor.professionalMemberships.map((membership, index) => (
                  <li key={index}>{membership}</li>
                ))}
              </ul>
            </TabsContent>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/book-appointment/${doctor.hospital}/${doctor.id}`}>Book Appointment</Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
)
}

