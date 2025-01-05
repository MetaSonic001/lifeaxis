import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Video, Clock, Star, Shield, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function HeroSection() {
  const stats = [
    { icon: Users, label: "Patients Served", value: "100k+" },
    { icon: Star, label: "Rating", value: "4.9/5" },
    { icon: Shield, label: "Verified Doctors", value: "1000+" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-800/50 rounded-full">
                <span className="text-blue-200 font-medium">🏥 #1 Healthcare Platform</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">Our Priority</span>
              </h1>
              <p className="text-xl text-blue-100">
                Experience healthcare reimagined with LifeAxis. Connect with top doctors, schedule appointments, and take control of your health journey.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="search"
                  placeholder="Search doctors, specialties, hospitals..."
                  className="flex-grow border-none bg-white/90 text-gray-800 placeholder:text-gray-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6">
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg transform transition hover:-translate-y-1">
                <Calendar className="mr-2 h-5 w-5" /> Book Appointment
              </Button>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 shadow-lg transform transition hover:-translate-y-1">
                <Video className="mr-2 h-5 w-5" /> Virtual Consultation
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                  <p className="font-bold text-xl">{value}</p>
                  <p className="text-sm text-blue-200">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8376232/pexels-photo-8376232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Professional Doctor"
                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
              />
              <Card className="absolute -bottom-6 -right-6 w-64 bg-white/10 backdrop-blur-xl border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Clock className="w-10 h-10 text-green-400 mr-4" />
                    <div>
                      <p className="text-2xl font-bold">24/7</p>
                      <p className="text-sm text-blue-200">Medical Support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-green-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
    </section>
  );
}