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
import { Star, MapPin, Phone, Mail, Globe } from 'lucide-react'

const doctors = [
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

export default function FindDoctors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('all')
  const [location, setLocation] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [selectedDoctor, setSelectedDoctor] = useState(null)

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find a Doctor in Mumbai</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input 
            id="search"
            type="text" 
            placeholder="Search by name or specialty" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="specialty">Specialty</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger id="specialty">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="Cardiologist">Cardiologist</SelectItem>
              <SelectItem value="Orthopedic Surgeon">Orthopedic Surgeon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Bandra">Bandra</SelectItem>
              <SelectItem value="Andheri West">Andheri West</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sort-by">Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="fee">Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2"><strong>Hospital:</strong> {doctor.hospital}</p>
              <p className="mb-2"><MapPin className="inline mr-2 h-4 w-4" />{doctor.location}</p>
              <p className="mb-2"><strong>Avg. Fee:</strong> ₹{doctor.avgFee}</p>
              <p className="mb-2"><strong>Rating:</strong> {doctor.rating.toFixed(1)} <Star className="inline-block w-4 h-4 text-yellow-400" /></p>
              <p><strong>Experience:</strong> {doctor.experience}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setSelectedDoctor(doctor)}>View Profile</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{selectedDoctor?.name}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={selectedDoctor?.image} alt={selectedDoctor?.name} />
                        <AvatarFallback>{selectedDoctor?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{selectedDoctor?.specialty}</h3>
                        <p>{selectedDoctor?.hospital}</p>
                        <p><MapPin className="inline mr-2 h-4 w-4" />{selectedDoctor?.location}</p>
                        <p className="mt-2">
                          <strong>Rating:</strong> {selectedDoctor?.rating.toFixed(1)} <Star className="inline-block w-4 h-4 text-yellow-400" />
                        </p>
                        <p><strong>Experience:</strong> {selectedDoctor?.experience}</p>
                        <p><strong>Avg. Fee:</strong> ₹{selectedDoctor?.avgFee}</p>
                      </div>
                    </div>
                    <Tabs defaultValue="about">
                      <TabsList>
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="education">Education & Services</TabsTrigger>
                        <TabsTrigger value="awards">Awards & Publications</TabsTrigger>
                        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                      </TabsList>
                      <TabsContent value="about">
                        <h4 className="font-semibold mb-2">About</h4>
                        <p>{selectedDoctor?.about}</p>
                        <h4 className="font-semibold mt-4 mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedDoctor?.languages.map(lang => (
                            <Badge key={lang} variant="secondary">{lang}</Badge>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="education">
                        <h4 className="font-semibold mb-2">Education</h4>
                        <ul className="list-disc pl-5 mb-4">
                          {selectedDoctor?.education.map((edu, index) => (
                            <li key={index}>{edu}</li>
                          ))}
                        </ul>
                        <h4 className="font-semibold mb-2">Services</h4>
                        <ul className="list-disc pl-5">
                          {selectedDoctor?.services.map((service, index) => (
                            <li key={index}>{service}</li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="awards">
                        <h4 className="font-semibold mb-2">Awards</h4>
                        <ul className="list-disc pl-5 mb-4">
                          {selectedDoctor?.awards.map((award, index) => (
                            <li key={index}>{award}</li>
                          ))}
                        </ul>
                        <h4 className="font-semibold mb-2">Publications</h4>
                        <ul className="list-disc pl-5">
                          {selectedDoctor?.publications.map((pub, index) => (
                            <li key={index}>{pub}</li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="testimonials">
                        <h4 className="font-semibold mb-2">Patient Testimonials</h4>
                        {selectedDoctor?.testimonials.map((testimonial, index) => (
                          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                            <p><strong>{testimonial.patient}</strong> - {testimonial.rating} <Star className="inline-block w-4 h-4 text-yellow-400" /></p>
                            <p className="mt-2">{testimonial.comment}</p>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/book-appointment/null/${selectedDoctor?.id}`}>Book Appointment</Link>
                  </Button>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

