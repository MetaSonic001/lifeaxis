'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Calendar, Clipboard, Droplet, Moon, Package, Phone, Pill, Thermometer } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NurseDashboard() {
  const [patientCount, setPatientCount] = useState(0)
  const [criticalPatients, setCriticalPatients] = useState(0)
  const [medicationAlerts, setMedicationAlerts] = useState(0)

  useEffect(() => {
    // Simulating data fetching
    setPatientCount(30)
    setCriticalPatients(3)
    setMedicationAlerts(2)
  }, [])

  const features = [
    { name: 'Patient Monitoring', icon: Activity, href: '/nurse/patient-monitoring' },
    { name: 'Inventory Tracking', icon: Package, href: '/nurse/inventory-tracking' },
    { name: 'Workflow Optimizer', icon: Calendar, href: '/nurse/workflow-optimizer' },
    { name: 'Rounding Assistant', icon: Clipboard, href: '/nurse/rounding-assistant' },
    { name: 'Wound Care Monitor', icon: Thermometer, href: '/nurse/wound-care' },
    // { name: 'Shift Fatigue Monitor', icon: Moon, href: '/nurse/shift-fatigue' },
    { name: 'IV Fluid Monitor', icon: Droplet, href: '/nurse/iv-fluid' },
    { name: 'Medication Assistant', icon: Pill, href: '/nurse/medication-assistant' },
    { name: 'Teleconsultation', icon: Phone, href: '/nurse/teleconsultation' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Nurse Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Patients</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Patients</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalPatients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medication Alerts</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicationAlerts}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Quick Access</h2>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
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

