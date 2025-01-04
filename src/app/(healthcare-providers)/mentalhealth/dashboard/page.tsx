'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Calendar, FileText, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MentalHealthDashboard() {
  const [activePatients, setActivePatients] = useState(0)
  const [upcomingSessions, setUpcomingSessions] = useState(0)
  const [averageMoodScore, setAverageMoodScore] = useState(0)

  useEffect(() => {
    // Simulating data fetching
    setActivePatients(25)
    setUpcomingSessions(8)
    setAverageMoodScore(6.7)
  }, [])

  const features = [
    { name: 'AI Therapy Assistant', icon: Brain, href: '/mentalhealth/therapy-assistant' },
    { name: 'Mood Tracker', icon: FileText, href: '/mentalhealth/mood-tracker' },
    // { name: 'Patient Records', icon: Users, href: '/mentalhealth/patient-records' },
    // { name: 'Appointment Scheduler', icon: Calendar, href: '/mentalhealth/appointments' },
    // { name: 'Teletherapy Portal', icon: MessageSquare, href: '/mentalhealth/teletherapy' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mental Health Professional Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePatients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood Score</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageMoodScore.toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Quick Access</h2>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {features.map((feature) => (
          <Link key={feature.name} href={feature.href}>
            <Button variant="outline" className="w-full h-full">
              <feature.icon className="mr-2 h-4 w-4" />
              {feature.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

