'use client'

import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, Globe } from 'lucide-react'

const hospitals = [
  {
    id: "1",
    name: "Lilavati Hospital",
    location: "A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology"],
    avgCost: 2500,
    rating: 4.5,
    emergencyServices: true,
    image: "/placeholder.svg?height=300&width=300",
    about: "Lilavati Hospital is a leading multi-specialty healthcare provider in Mumbai, offering state-of-the-art medical facilities and a team of experienced healthcare professionals. Established in 1978, we have been at the forefront of medical innovation and patient care for over four decades.",
    facilities: [
      "24/7 Emergency Care",
      "Intensive Care Unit",
      "Advanced Diagnostic Imaging Center",
      "Robotic Surgery Unit",
      "Comprehensive Cancer Care Center",
      "Neonatal Intensive Care Unit",
      "Cardiac Catheterization Lab",
      "Dialysis Center"
    ],
    accreditations: [
      "National Accreditation Board for Hospitals & Healthcare Providers (NABH)",
      "Joint Commission International (JCI) Accreditation",
      "ISO 9001:2015 Certification"
    ],
    doctors: [
      { id: 1, name: "Dr. Priya Sharma", specialty: "Cardiologist", image: "/placeholder.svg?height=100&width=100", rating: 4.8, experience: "15 years", about: "Dr. Priya Sharma is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management." },
      { id: 2, name: "Dr. Rajesh Mehta", specialty: "Neurologist", image: "/placeholder.svg?height=100&width=100", rating: 4.7, experience: "12 years", about: "Dr. Rajesh Mehta is a highly skilled neurologist specializing in the diagnosis and treatment of complex neurological disorders. With 12 years of experience, he has helped numerous patients manage conditions such as epilepsy, stroke, and neurodegenerative diseases." },
      { id: 3, name: "Dr. Anjali Desai", specialty: "Orthopedic Surgeon", image: "/placeholder.svg?height=100&width=100", rating: 4.9, experience: "18 years", about: "Dr. Anjali Desai is an experienced orthopedic surgeon with 18 years of practice. She specializes in joint replacement surgeries, sports medicine, and minimally invasive procedures, helping patients regain mobility and improve their quality of life." },
      { id: 4, name: "Dr. Sunil Patel", specialty: "Pediatrician", image: "/placeholder.svg?height=100&width=100", rating: 4.6, experience: "10 years", about: "Dr. Sunil Patel is a compassionate pediatrician with 10 years of experience in providing comprehensive care for children from infancy through adolescence. He is known for his gentle approach and expertise in childhood development and preventive care." },
      { id: 5, name: "Dr. Meera Reddy", specialty: "Oncologist", image: "/placeholder.svg?height=100&width=100", rating: 4.9, experience: "20 years", about: "Dr. Meera Reddy is a highly respected oncologist with 20 years of experience in cancer diagnosis and treatment. She specializes in personalized cancer care, utilizing the latest advancements in targeted therapies and immunotherapy to provide the best possible outcomes for her patients." },
    ],
    reviews: [
      { id: 1, patient: "Rahul D.", rating: 5, comment: "Excellent care and friendly staff. The facilities are top-notch and I felt well taken care of throughout my stay." },
      { id: 2, patient: "Sunita M.", rating: 4, comment: "Good experience overall. The doctors are highly skilled and attentive. Wait times can be long, but the care is great." },
      { id: 3, patient: "Amit L.", rating: 5, comment: "I've been coming to Lilavati Hospital for years and have always received exceptional care. The new cancer center is impressive." },
    ]
  },
]

export default function HospitalProfile() {
  const params = useParams()
  const router = useRouter()
  const hospitalId = params.id as string
  const hospital = hospitals.find(h => h.id === hospitalId)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  if (!hospital) {
    return <div>Hospital not found</div>
  }

  const filteredDoctors = useMemo(() => {
    return hospital.doctors
      .filter(doctor => 
        (selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty) &&
        (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience)
        return 0
      })
  }, [hospital.doctors, selectedSpecialty, searchTerm, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img src={hospital.image} alt={hospital.name} className="w-48 h-48 rounded" />
            <div>
              <CardTitle className="text-3xl mb-2">{hospital.name}</CardTitle>
              <CardDescription className="text-xl mb-2">
                <MapPin className="inline mr-2 h-4 w-4" />
                {hospital.location}
              </CardDescription>
              <p className="mb-2">⭐ {hospital.rating} / 5</p>
              <p>{hospital.emergencyServices ? '24/7 Emergency Services Available' : 'No Emergency Services'}</p>
              <p className="mt-2"><strong>Average Cost:</strong> ₹{hospital.avgCost}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="specialties">Specialties</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="doctors">Doctors</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <h3 className="text-xl font-semibold mb-2">About</h3>
              <p className="mb-4">{hospital.about}</p>
              <h4 className="text-lg font-semibold mb-2">Accreditations</h4>
              <ul className="list-disc pl-5">
                {hospital.accreditations.map((accreditation, index) => (
                  <li key={index}>{accreditation}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specialties">
              <h3 className="text-xl font-semibold mb-2">Specialties</h3>
              <ul className="list-disc pl-5">
                {hospital.specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="facilities">
              <h3 className="text-xl font-semibold mb-2">Facilities</h3>
              <ul className="list-disc pl-5">
                {hospital.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="doctors">
              <h3 className="text-xl font-semibold mb-4">Doctors</h3>
              <div className="space-y-4 mb-4">
                <div>
                  <Label htmlFor="search-doctors">Search Doctors</Label>
                  <Input
                    id="search-doctors"
                    placeholder="Search by name or specialty"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="specialty-filter">Filter by Specialty</Label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger id="specialty-filter">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        {hospital.specialties.map((specialty, index) => (
                          <SelectItem key={index} value={specialty}>{specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="sort-by">Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort-by">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="experience">Experience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={doctor.image} alt={doctor.name} />
                          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{doctor.name}</CardTitle>
                          <CardDescription>{doctor.specialty}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>⭐ {doctor.rating} / 5</p>
                      <p>{doctor.experience} of experience</p>
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" onClick={() => setSelectedDoctor(doctor)}>View Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{selectedDoctor?.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-24 h-24">
                                <AvatarImage src={selectedDoctor?.image} alt={selectedDoctor?.name} />
                                <AvatarFallback>{selectedDoctor?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{selectedDoctor?.specialty}</h3>
                                <p>{hospital.name}</p>
                                <p>{hospital.location}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">About</h4>
                              <p>{selectedDoctor?.about}</p>
                            </div>
                            <div>
                              <p><strong>Experience:</strong> {selectedDoctor?.experience}</p>
                              <p><strong>Rating:</strong> ⭐ {selectedDoctor?.rating.toFixed(1)} / 5</p>
                            </div>
                          </div>
                          <Button asChild className="w-full">
                            <Link href={`/book-appointment/${hospital.id}/${selectedDoctor?.id}`}>Book Appointment</Link>
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <h3 className="text-xl font-semibold mb-2">Patient Reviews</h3>
              {hospital.reviews.map((review) => (
                <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <p><strong>{review.patient}</strong> - ⭐ {review.rating} / 5</p>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

