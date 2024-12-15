"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doctors, reviews } from "@/lib/data";
import { motion } from "framer-motion";
import {
  Award,
  Building2,
  CalendarIcon,
  Clock,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Star,
  Video,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DoctorProfilePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTab, setSelectedTab] = useState("overview");
  const router = useRouter();
  const params = useParams();
  const [doctor, setDoctor] = useState(doctors[0]);

  useEffect(() => {
    const doctorId = params.id as string;
    const foundDoctor = doctors.find((d) => d.id === doctorId);
    if (foundDoctor) {
      setDoctor(foundDoctor);
    } else {
      // Handle case when doctor is not found
      router.push("/404");
    }
  }, [params.id, router]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
              <div className="flex-1">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                  <p className="text-blue-800 text-lg font-medium mb-2">
                    {doctor.title}
                  </p>
                  <p className="text-gray-600 mb-4">{doctor.qualifications}</p>
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-2 font-semibold">{doctor.rating}</span>
                    <span className="text-gray-600 ml-2">
                      ({doctor.totalReviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-5 h-5 mr-2" />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{doctor.experience}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Languages className="w-5 h-5 mr-2" />
                    <span>{doctor.languages.join(", ")}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button
                    className="flex-1 bg-blue-800 hover:bg-blue-900 text-white"
                    size="lg"
                    onClick={() =>
                      router.push(`/appointments/book?doctorId=${doctor.id}`)
                    }
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="flex-1" size="lg">
                    <Video className="mr-2 h-5 w-5" />
                    Video Consultation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{doctor.about}</p>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-4">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-4">Education</h3>
                    <div className="space-y-4">
                      {doctor.education.map((edu) => (
                        <div key={edu.degree} className="flex items-start">
                          <GraduationCap className="w-5 h-5 mr-2 mt-1 text-gray-400" />
                          <div>
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-gray-600">
                              {edu.institution} • {edu.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-4">Awards & Recognition</h3>
                    <div className="space-y-4">
                      {doctor.awards.map((award) => (
                        <div key={award} className="flex items-start">
                          <Award className="w-5 h-5 mr-2 mt-1 text-gray-400" />
                          <p>{award}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hospital Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Building2 className="w-5 h-5 mr-2 mt-1 text-gray-400" />
                      <div>
                        <p className="font-medium">{doctor.hospital}</p>
                        <p className="text-gray-600">
                          Multi-Specialty Hospital
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-2 mt-1 text-gray-400" />
                      <p className="text-gray-600">
                        123 Medical Center Drive, New York, NY 10001
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-2 mt-1 text-gray-400" />
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-2 mt-1 text-gray-400" />
                      <p className="text-gray-600">contact@hospital.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Appointment</CardTitle>
                <CardDescription>
                  Select a date and time for your appointment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-4">Available Time Slots</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "9:00 AM",
                        "10:00 AM",
                        "11:00 AM",
                        "2:00 PM",
                        "3:00 PM",
                        "4:00 PM",
                      ].map((time) => (
                        <Button key={time} variant="outline" className="w-full">
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Patient Reviews</CardTitle>
                <CardDescription>
                  Read what other patients have to say
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{review.name}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
