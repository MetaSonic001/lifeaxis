'use client'

import { useState, useEffect } from 'react'
import { Activity, Heart, Thermometer, Droplet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Patient = {
  id: number
  name: string
  roomNumber: string
  heartRate: number
  bloodPressure: string
  temperature: number
  oxygenSaturation: number
}

export default function CentralizedMonitoring() {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      setPatients(prevPatients => 
        prevPatients.map(patient => ({
          ...patient,
          heartRate: Math.floor(Math.random() * (100 - 60 + 1) + 60),
          bloodPressure: `${Math.floor(Math.random() * (140 - 110 + 1) + 110)}/${Math.floor(Math.random() * (90 - 70 + 1) + 70)}`,
          temperature: +(Math.random() * (99.5 - 97.5) + 97.5).toFixed(1),
          oxygenSaturation: Math.floor(Math.random() * (100 - 95 + 1) + 95),
        }))
      )
    }, 5000)

    // Initial mock data
    setPatients([
      { id: 1, name: 'John Doe', roomNumber: '101', heartRate: 72, bloodPressure: '120/80', temperature: 98.6, oxygenSaturation: 98 },
      { id: 2, name: 'Jane Smith', roomNumber: '102', heartRate: 68, bloodPressure: '118/76', temperature: 98.2, oxygenSaturation: 99 },
      { id: 3, name: 'Bob Johnson', roomNumber: '103', heartRate: 75, bloodPressure: '130/85', temperature: 99.1, oxygenSaturation: 97 },
    ])

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Centralized Patient Monitoring System</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map(patient => (
          <Card key={patient.id}>
            <CardHeader>
              <CardTitle>{patient.name}</CardTitle>
              <CardDescription>Room {patient.roomNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>{patient.heartRate} bpm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <span>{patient.bloodPressure} mmHg</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-5 w-5 text-yellow-500" />
                  <span>{patient.temperature}°F</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplet className="h-5 w-5 text-green-500" />
                  <span>{patient.oxygenSaturation}% SpO2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button>View Detailed Reports</Button>
    </div>
  )
}

