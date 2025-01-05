'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Briefcase, Clock, FileText, Map, Truck } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ParamedicDashboard() {
  const [activeIncidents, setActiveIncidents] = useState(0)
  const [averageResponseTime, setAverageResponseTime] = useState(0)
  const [availableUnits, setAvailableUnits] = useState(0)

  useEffect(() => {
    // Simulating data fetching
    setActiveIncidents(3)
    setAverageResponseTime(8.5)
    setAvailableUnits(5)
  }, [])

  const features = [
    { name: 'Smart Dispatch System', icon: Truck, href: '/paramedic/smart-dispatch' },
    { name: 'Dynamic GPS Navigation', icon: Map, href: '/paramedic/gps-navigation' },
    { name: 'Portable Diagnostic Kit', icon: Briefcase, href: '/paramedic/diagnostic-kit' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Paramedic Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeIncidents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageResponseTime} min</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Units</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableUnits}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Quick Access</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

