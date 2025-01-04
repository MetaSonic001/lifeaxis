"use client"
import React, { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin, Ambulance, CheckCircle, AlertTriangle, Clock, Radio } from "lucide-react"

// Simulating real-time data updates
const generateRealisticEmergencies = () => [
  { 
    id: 1, 
    type: "Cardiac Arrest", 
    location: "Room 302, Central Hospital", 
    status: "In Progress", 
    eta: "2 min", 
    severity: "high" as 'high',
    responders: [
      { name: "Dr. Emily Chen", role: "Lead Physician" },
      { name: "Paramedic Jake Rodriguez", role: "Emergency Response" }
    ],
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  { 
    id: 2, 
    type: "Severe Trauma", 
    location: "ER Bay 1, Metropolitan Hospital", 
    status: "Pending", 
    eta: "5 min", 
    severity: "critical" as 'critical',
    responders: [
      { name: "Dr. Michael Thompson", role: "Trauma Surgeon" }
    ],
    coordinates: { lat: 37.7833, lng: -122.4167 }
  },
  { 
    id: 3, 
    type: "Stroke", 
    location: "ICU, Northern Medical Center", 
    status: "Resolved", 
    eta: "-", 
    severity: "moderate" as 'moderate',
    responders: [],
    coordinates: { lat: 37.7894, lng: -122.4001 }
  }
]

export default function EmergencyResponseDashboard() {
  const [activeEmergencies, setActiveEmergencies] = useState<Emergency[]>(generateRealisticEmergencies())
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  interface Responder {
    name: string;
    role: string;
  }

  interface Emergency {
    id: number;
    type: string;
    location: string;
    status: string;
    eta: string;
    severity: 'critical' | 'high' | 'moderate';
    responders: Responder[];
    coordinates: {
      lat: number;
      lng: number;
    };
  }

  const handleResolve = (id: number) => {
    setActiveEmergencies(activeEmergencies.map((emergency: Emergency) => 
      emergency.id === id 
        ? { ...emergency, status: "Resolved", eta: "-" } 
        : emergency
    ))
  }

  interface SeverityColors {
    [key: string]: string;
  }

  const getSeverityColor = (severity: string): string => {
    const severityColors: SeverityColors = {
      'high': 'bg-red-500',
      'critical': 'bg-red-700',
      'moderate': 'bg-yellow-500',
      'default': 'bg-gray-500'
    };

    return severityColors[severity] || severityColors['default'];
  }

  const getMostCriticalEmergency = () => {
    return activeEmergencies
      .filter(e => e.status !== "Resolved")
      .sort((a, b) => {
        const severityOrder = { 'critical': 3, 'high': 2, 'moderate': 1 }
        return severityOrder[b.severity] - severityOrder[a.severity];
      })[0]
  }

  const criticalEmergency = getMostCriticalEmergency()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-black">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800">Emergency Response Center</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-5 h-5" />
          <span>Elapsed Time: {timeElapsed} sec</span>
        </div>
      </div>

      {criticalEmergency && (
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-red-800">Active Emergency Alert</AlertTitle>
          <AlertDescription>
            {criticalEmergency.type} reported at {criticalEmergency.location}. 
            ETA for response team: {criticalEmergency.eta}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Active Emergencies</CardTitle>
            <CardDescription>Real-time emergency situation tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Emergency Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeEmergencies.map((emergency) => (
                  <TableRow 
                    key={emergency.id} 
                    onClick={() => setSelectedEmergency(emergency)}
                    className="cursor-pointer hover:bg-black"
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <Ambulance className="mr-2 w-5 h-5" />
                        {emergency.type}
                      </div>
                    </TableCell>
                    <TableCell>{emergency.location}</TableCell>
                    <TableCell>
                      <Badge variant={emergency.status === "Resolved" ? "secondary" : "destructive"}>
                        {emergency.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded text-white text-xs ${getSeverityColor(emergency.severity)}`}
                      >
                        {emergency.severity}
                      </span>
                    </TableCell>
                    <TableCell>{emergency.eta}</TableCell>
                    <TableCell>
                      {emergency.status !== "Resolved" && (
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleResolve(emergency.id)
                          }}
                        >
                          <CheckCircle className="mr-2 w-4 h-4" /> Resolve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Details</CardTitle>
            <CardDescription>Detailed emergency information</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedEmergency ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-red-500" />
                  <span className="font-semibold">{selectedEmergency.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Radio className="w-6 h-6 text-blue-500" />
                  <span>Responders:</span>
                </div>
                {selectedEmergency.responders.length > 0 ? (
                  <ul className="pl-6 list-disc">
                    {selectedEmergency.responders.map((responder, index) => (
                      <li key={index}>
                        {responder.name} - {responder.role}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No responders assigned</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center">Select an emergency for details</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for actual Google Maps integration */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Response Map</CardTitle>
          <CardDescription>Real-time tracking of ambulances and emergency personnel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-black h-[400px] flex items-center justify-center">
            <p>Google Maps Integration Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}