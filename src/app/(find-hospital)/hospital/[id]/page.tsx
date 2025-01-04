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
import { Star, MapPin, Phone, Mail, Globe, Search, Filter, Clock, Check } from 'lucide-react'


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
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const params = useParams()
  const router = useRouter()
  const hospitalId = params.id as string
  const hospital = hospitals.find(h => h.id === hospitalId)

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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card className="shadow-xl rounded-lg">
        <CardHeader className="border-b bg-white">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <img src={hospital.image} alt={hospital.name} className="w-48 h-48 rounded-lg object-cover shadow-md" />
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <CardTitle className="text-4xl font-bold">{hospital.name}</CardTitle>
                {hospital.emergencyServices && (
                  <Badge variant="destructive" className="text-sm">24/7 Emergency</Badge>
                )}
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>{hospital.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{hospital.rating} / 5</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>₹{hospital.avgCost} average cost</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="about" className="text-sm">About</TabsTrigger>
              <TabsTrigger value="specialties" className="text-sm">Specialties</TabsTrigger>
              <TabsTrigger value="facilities" className="text-sm">Facilities</TabsTrigger>
              <TabsTrigger value="doctors" className="text-sm">Doctors</TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-semibold mb-4">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{hospital.about}</p>
                </section>
                <section>
                  <h4 className="text-xl font-semibold mb-4">Accreditations</h4>
                  <div className="grid gap-3">
                    {hospital.accreditations.map((accreditation, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{accreditation}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="doctors">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="search-doctors">Search Doctors</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search-doctors"
                        className="pl-9"
                        placeholder="Search by name or specialty"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty-filter">Specialty</Label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger id="specialty-filter">
                        <SelectValue placeholder="All Specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        {hospital.specialties.map((specialty, index) => (
                          <SelectItem key={index} value={specialty}>{specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort-by">Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort-by">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="experience">Experience</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16 border-2 border-primary/10">
                            <AvatarImage src={doctor.image} alt={doctor.name} />
                            <AvatarFallback className="bg-primary/5">{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{doctor.name}</CardTitle>
                            <CardDescription>{doctor.specialty}</CardDescription>
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{doctor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                      </CardContent>
                      <CardFooter>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full" variant="outline" onClick={() => setSelectedDoctor(doctor)}>
                              View Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Doctor Profile</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="flex items-start gap-4">
                                <Avatar className="w-24 h-24">
                                  <AvatarImage src={selectedDoctor?.image} alt={selectedDoctor?.name} />
                                  <AvatarFallback>{selectedDoctor?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <h3 className="font-semibold text-lg">{selectedDoctor?.name}</h3>
                                  <p className="text-muted-foreground">{selectedDoctor?.specialty}</p>
                                  <div className="flex items-center space-x-2">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span>{selectedDoctor?.rating} / 5</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-semibold">About</h4>
                                <p className="text-sm text-muted-foreground">{selectedDoctor?.about}</p>
                              </div>
                              <Button asChild>
                                <Link href={`/book-appointment/${hospital.id}/${selectedDoctor?.id}`}>
                                  Book Appointment
                                </Link>
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Patient Reviews</h3>
                <div className="grid gap-4">
                  {hospital.reviews.map((review) => (
                    <Card key={review.id} className="bg-muted/50">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{review.patient}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span>{review.rating} / 5</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}