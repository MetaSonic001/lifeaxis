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
import { Star, MapPin, Phone, Mail, Globe, Search, Filter, Clock, Check, Award, Heart, Stethoscope, Building2, MessageSquare } from 'lucide-react'


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
  const [selectedDoctor, setSelectedDoctor] = useState<{
    id: number;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    experience: string;
    about: string;
  } | null>(null)
  const params = useParams()
  const router = useRouter()
  const hospitalId = params.id as string
  const hospital = hospitals.find(h => h.id === hospitalId)

  const filteredDoctors = useMemo(() => {
    if (!hospital) return []
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
  }, [hospital, selectedSpecialty, searchTerm, sortBy])

  if (!hospital) {
    return <div>Hospital not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card className="shadow-2xl rounded-xl border-none bg-white">
        {/* Hero Section */}
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl">
          <div className="absolute -bottom-16 left-8 right-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <img 
                src={hospital.image} 
                alt={hospital.name} 
                className="w-32 h-32 rounded-xl object-cover ring-4 ring-white shadow-xl"
              />
              <div className="flex-1 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-3xl font-bold text-gray-900">{hospital.name}</h1>
                  {hospital.emergencyServices && (
                    <Badge variant="destructive" className="text-sm font-semibold">
                      24/7 Emergency Care
                    </Badge>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                    <span className="text-sm">{hospital.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" />
                    <span className="font-medium">{hospital.rating} / 5</span>
                    <span className="text-sm ml-1 text-gray-500">(based on patient reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Average cost: ₹{hospital.avgCost}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="mt-20 pt-8">
          <Tabs defaultValue="about" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-gray-100 rounded-lg">
              {[
                { value: "about", icon: Building2, label: "About" },
                { value: "specialties", icon: Stethoscope, label: "Specialties" },
                { value: "facilities", icon: Award, label: "Facilities" },
                { value: "doctors", icon: Heart, label: "Doctors" },
                { value: "reviews", icon: MessageSquare, label: "Reviews" }
              ].map(tab => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value} 
                  className="text-sm font-medium px-4 py-1 data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">About the Hospital</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{hospital.about}</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Accreditations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {hospital.accreditations.map((accreditation, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Check className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{accreditation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctors" className="space-y-8">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Find a Doctor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="search-doctors" className="text-sm font-medium">Search Doctors</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="search-doctors"
                          className="pl-9 bg-gray-50 border-gray-200"
                          placeholder="Search by name or specialty"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialty-filter" className="text-sm font-medium">Specialty</Label>
                      <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                        <SelectTrigger id="specialty-filter" className="bg-gray-50 border-gray-200">
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
                      <Label htmlFor="sort-by" className="text-sm font-medium">Sort By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sort-by" className="bg-gray-50 border-gray-200">
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

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    {filteredDoctors.map((doctor) => (
                      <Card key={doctor.id} className="hover:shadow-lg transition-shadow border border-gray-100">
                        <CardHeader className="pb-4">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-16 h-16 ring-2 ring-blue-100">
                              <AvatarImage src={doctor.image} alt={doctor.name} />
                              <AvatarFallback className="bg-blue-50 text-blue-600">
                                {doctor.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <CardTitle className="text-lg font-bold">{doctor.name}</CardTitle>
                              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                {doctor.specialty}
                              </Badge>
                              <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-medium">{doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">{doctor.experience} experience</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100" 
                                variant="outline"
                                onClick={() => setSelectedDoctor(doctor)}
                              >
                                View Profile
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">Doctor Profile</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-6 py-4">
                                <div className="flex items-start gap-4">
                                  <Avatar className="w-24 h-24 ring-2 ring-blue-100">
                                    <AvatarImage src={selectedDoctor?.image} alt={selectedDoctor?.name} />
                                    <AvatarFallback className="bg-blue-50 text-blue-600">
                                      {selectedDoctor?.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="space-y-2">
                                    <h3 className="font-bold text-xl">{selectedDoctor?.name}</h3>
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                      {selectedDoctor?.specialty}
                                    </Badge>
                                    <div className="flex items-center space-x-2">
                                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                      <span className="font-medium">{selectedDoctor?.rating} / 5</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-lg">About</h4>
                                  <p className="text-gray-600">{selectedDoctor?.about}</p>
                                </div>
                                <Button 
                                  asChild
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  {/* <Link href={`/book-appointment/${hospital.id}/${selectedDoctor?.id}`}>
                                    Book Appointment
                                  </Link> */}
                                                                    <Link href={`/book-appointment/${hospital.id}/2`}>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Patient Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {hospital.reviews.map((review) => (
                      <Card key={review.id} className="bg-gray-50 border-none">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10 bg-blue-100">
                                <AvatarFallback className="text-blue-600">
                                  {review.patient[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-semibold">{review.patient}</span>
                            </div>
                            <div className="flex items-center bg-white px-3 py-1 rounded-full">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span className="font-medium">{review.rating} / 5</span>
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}