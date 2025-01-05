'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, Globe, Search, Filter } from 'lucide-react'

export default function FindDoctors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('all')
  const [location, setLocation] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter(doctor => 
        (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (specialty === 'all' || doctor.specialty === specialty) &&
        (location === 'all' || doctor.location === location)
      )
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience)
        if (sortBy === 'fee') return a.avgFee - b.avgFee
        return 0
      })
  }, [searchTerm, specialty, location, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Best Doctors in Mumbai</h1>
          <p className="text-xl text-blue-100 mb-8">Connect with top healthcare professionals for quality care</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Search by doctor name or specialty..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg w-full bg-white text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="specialty" className="text-sm font-medium text-gray-700">Specialty</Label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger id="specialty" className="w-full mt-1">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                  <SelectItem value="Orthopedic Surgeon">Orthopedic Surgeon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location" className="w-full mt-1">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Bandra">Bandra</SelectItem>
                  <SelectItem value="Andheri West">Andheri West</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sort-by" className="text-sm font-medium text-gray-700">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-full mt-1">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="fee">Fee</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">Found {filteredDoctors.length} doctors</p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 border-2 border-blue-100">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900">{doctor.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">{doctor.specialty}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-semibold">{doctor.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-600">{doctor.experience} exp.</span>
                </div>
                <div className="text-blue-600 font-semibold">
                  ₹{doctor.avgFee} consultation fee
                </div>
              </CardContent>
              <CardFooter className="pt-4 flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">{selectedDoctor?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="flex items-start gap-6">
                        <Avatar className="w-24 h-24 border-2 border-blue-100">
                          <AvatarImage src={selectedDoctor?.image} alt={selectedDoctor?.name} />
                          <AvatarFallback className="bg-blue-600 text-white text-xl">
                            {selectedDoctor?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Badge variant="secondary" className="text-lg">{selectedDoctor?.specialty}</Badge>
                          <h3 className="text-lg text-gray-700">{selectedDoctor?.hospital}</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-yellow-400 mr-1" />
                              <span className="font-semibold">{selectedDoctor?.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-gray-600">{selectedDoctor?.experience} experience</span>
                            <span className="text-blue-600 font-semibold">₹{selectedDoctor?.avgFee}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{selectedDoctor?.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Tabs defaultValue="about" className="mt-6">
                        <TabsList className="grid grid-cols-4 gap-4">
                          <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                            About
                          </TabsTrigger>
                          <TabsTrigger value="education" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                            Education
                          </TabsTrigger>
                          <TabsTrigger value="awards" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                            Awards
                          </TabsTrigger>
                          <TabsTrigger value="testimonials" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                            Reviews
                          </TabsTrigger>
                        </TabsList>
                        
                        <div className="mt-6">
                          <TabsContent value="about">
                            <div className="space-y-4">
                              <p className="text-gray-700 leading-relaxed">{selectedDoctor?.about}</p>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedDoctor?.languages.map(lang => (
                                    <Badge key={lang} variant="outline">{lang}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="education">
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
                                <ul className="space-y-2">
                                  {selectedDoctor?.education.map((edu, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="mr-2">•</span>
                                      <span>{edu}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
                                <ul className="space-y-2">
                                  {selectedDoctor?.services.map((service, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="mr-2">•</span>
                                      <span>{service}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="awards">
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Awards & Recognition</h4>
                                <ul className="space-y-2">
                                  {selectedDoctor?.awards.map((award, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="mr-2">•</span>
                                      <span>{award}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Publications</h4>
                                <ul className="space-y-2">
                                  {selectedDoctor?.publications.map((pub, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="mr-2">•</span>
                                      <span>{pub}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="testimonials">
                            <div className="space-y-4">
                              {selectedDoctor?.testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-gray-900">{testimonial.patient}</span>
                                    <div className="flex items-center">
                                      <Star className="h-4 w-4 text-yellow-400" />
                                      <span className="ml-1">{testimonial.rating}</span>
                                    </div>
                                  </div>
                                  </div>
                        
                                ))}
                                </div>
                                
                              </TabsContent>
                              <Button asChild className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-semibold">
                                <Link href={`/doctor/${doctor.id}`}>Book Appointment</Link>
                              </Button>
                            </div>
                          </Tabs>
                        </div>
                        <Button asChild className="w-full bg-blue-600 text-white">
                    <Link href={`/book-appointment/null/${selectedDoctor?.id}`}>Book Appointment</Link>
                  </Button>
                      </DialogContent>
                    </Dialog>
                    
                  </CardFooter>
                  
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    }
    
    interface Doctor {
      id: number;
      name: string;
      specialty: string;
      hospital: string;
      avgFee: number;
      rating: number;
      location: string;
      image: string;
      experience: string;
      about: string;
      education: string[];
      services: string[];
      languages: string[];
      awards: string[];
      publications: string[];
      testimonials: { patient: string; rating: number; comment: string }[];
    }

    const doctors: Doctor[] = [
      { 
        id: 1, 
        name: "Dr. Priya Sharma", 
        specialty: "Cardiologist", 
        hospital: "Lilavati Hospital", 
        avgFee: 1500, 
        rating: 4.8, 
        location: "Bandra", 
        image: "/placeholder.svg?height=100&width=100", 
        experience: "15 years", 
        about: "Dr. Priya Sharma is a renowned cardiologist with over 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.",
        education: [
          "MBBS, Seth G.S. Medical College, Mumbai",
          "MD in Cardiology, All India Institute of Medical Sciences, New Delhi"
        ],
        services: [
          "Echocardiography",
          "Stress Testing",
          "Holter Monitoring",
          "Cardiac Catheterization"
        ],
        languages: ["English", "Hindi", "Marathi"],
        awards: [
          "Best Cardiologist in Mumbai 2022",
          "Research Excellence Award 2020"
        ],
        publications: [
          "Sharma, P. et al. (2021). 'Advances in Preventive Cardiology in India'. Indian Heart Journal.",
          "Sharma, P. & Patel, A. (2020). 'Long-term Outcomes of Heart Failure Management in Mumbai'. Cardiology Review India."
        ],
        testimonials: [
          { patient: "Rahul D.", rating: 5, comment: "Dr. Sharma is extremely knowledgeable and caring. She took the time to explain everything in detail." },
          { patient: "Sunita M.", rating: 4, comment: "Very professional and thorough. The wait time was a bit long, but the care was excellent." }
        ]
      },
      { 
        id: 2, 
        name: "Dr. Amit Desai", 
        specialty: "Orthopedic Surgeon", 
        hospital: "Kokilaben Dhirubhai Ambani Hospital", 
        avgFee: 2000, 
        rating: 4.7, 
        location: "Andheri West", 
        image: "/placeholder.svg?height=100&width=100", 
        experience: "12 years", 
        about: "Dr. Amit Desai is a highly skilled orthopedic surgeon specializing in sports medicine and joint replacement. With 12 years of experience, he has helped numerous patients regain mobility and improve their quality of life.",
        education: [
          "MBBS, KEM Hospital and Seth G.S. Medical College, Mumbai",
          "MS in Orthopedic Surgery, Lokmanya Tilak Municipal Medical College, Mumbai"
        ],
        services: [
          "Joint Replacement Surgery",
          "Arthroscopic Surgery",
          "Sports Injury Treatment",
          "Fracture Care"
        ],
        languages: ["English", "Hindi", "Gujarati"],
        awards: [
          "Innovative Surgical Techniques Award 2021",
          "Patient's Choice Award 2019"
        ],
        publications: [
          "Desai, A. et al. (2022). 'Advancements in Minimally Invasive Joint Replacement in India'. Journal of Orthopedic Surgery India.",
          "Desai, A. & Mehta, S. (2021). 'Rehabilitation Protocols for Sports Injuries in Mumbai'. Sports Medicine Review India."
        ],
        testimonials: [
          { patient: "Anjali R.", rating: 5, comment: "Dr. Desai's expertise in sports medicine is unparalleled. He helped me recover from a severe knee injury and return to professional sports." },
          { patient: "Deepak T.", rating: 4, comment: "Excellent surgeon with a great bedside manner. The recovery process was exactly as he described." }
        ]
      },
    ]
    