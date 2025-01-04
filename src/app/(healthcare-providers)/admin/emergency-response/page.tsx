"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper"
// Shadcn UI Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { 
  MapPin, 
  Ambulance, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Radio, 
  Hospital, 
  Cross, 
  Siren 
} from "lucide-react"

// Comprehensive Type Definitions
interface Coordinates {
  lat: number;
  lng: number;
}

interface Responder {
  name: string;
  role: string;
  contactNumber?: string;
  specialization?: string;
}

type EmergencySeverity = 'critical' | 'high' | 'moderate' | 'low';
type EmergencyStatus = 'Pending' | 'In Progress' | 'Resolved';

interface Emergency {
  id: number;
  type: string;
  location: string;
  status: EmergencyStatus;
  eta: string;
  severity: EmergencySeverity;
  responders: Responder[];
  coordinates: Coordinates;
  description?: string;
}

interface HospitalLocation {
  id: number;
  name: string;
  address: string;
  coordinates: Coordinates;
  emergencyCapacity: number;
}

// Map Component
const GoogleMapsComponent: React.FC<{
  center: Coordinates, 
  emergencies: Emergency[], 
  hospitals: HospitalLocation[]
}> = ({ center, emergencies, hospitals }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: center,
        zoom: 12,
        styles: [
          {
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }]
          }
        ]
      })
      setMap(newMap)
    }
  }, [ref, map, center])

  // Add markers for emergencies and hospitals
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    const markers: google.maps.Marker[] = []

    // Add emergency markers
    emergencies.forEach(emergency => {
      const markerIcon = emergency.status !== 'Resolved' 
        ? '/ambulance-emergency.png' 
        : '/ambulance-resolved.png'

      const marker = new google.maps.Marker({
        position: emergency.coordinates,
        map: map,
        title: emergency.type,
        icon: {
          url: markerIcon,
          scaledSize: new google.maps.Size(40, 40)
        }
      })

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="color: black;">
            <h3>${emergency.type}</h3>
            <p>Location: ${emergency.location}</p>
            <p>Status: ${emergency.status}</p>
            <p>Severity: ${emergency.severity}</p>
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      markers.push(marker)
    })

    // Add hospital markers
    hospitals.forEach(hospital => {
      const marker = new google.maps.Marker({
        position: hospital.coordinates,
        map: map,
        title: hospital.name,
        icon: {
          url: '/hospital-icon.png',
          scaledSize: new google.maps.Size(40, 40)
        }
      })

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="color: black;">
            <h3>${hospital.name}</h3>
            <p>Address: ${hospital.address}</p>
            <p>Emergency Capacity: ${hospital.emergencyCapacity}</p>
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      markers.push(marker)
    })

    // Cleanup function
    return () => {
      markers.forEach(marker => marker.setMap(null))
    }
  }, [map, emergencies, hospitals])

  return <div ref={ref} style={{ height: '500px', width: '100%' }} />
}

// Render function for Google Maps
const MapRender: React.FC<{
  status: Status, 
  center: Coordinates, 
  emergencies: Emergency[], 
  hospitals: HospitalLocation[]
}> = ({ status, center, emergencies, hospitals }) => {
  if (status === Status.LOADING) return <p>Loading...</p>
  if (status === Status.FAILURE) return <p>Error loading map</p>
  return <GoogleMapsComponent center={center} emergencies={emergencies} hospitals={hospitals} />
}

// Simulating real-time data updates
const generateRealisticEmergencies = () => [
  { 
    id: 1, 
    type: "Cardiac Arrest", 
    location: "Room 302, Central Hospital", 
    status: "In Progress" as 'In Progress', 
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
    status: "Pending" as 'Pending', 
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
    status: "Resolved" as 'Resolved', 
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
    status: EmergencyStatus;
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
        <h2 className="text-3xl font-bold tracking-tight text-white-800">Emergency Response Center</h2>
        <div className="flex items-center space-x-2 text-white-400">
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
      {/* Google Maps Integration */}
      <Card className="bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" /> Emergency Response Map
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time tracking of ambulances and emergency locations in Mumbai
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Wrapper 
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} 
              render={(status) => (
                <MapRender 
                  status={status} 
                  center={{ lat: 19.0760, lng: 72.8777 }} // Example center coordinates for Mumbai
                  emergencies={activeEmergencies} 
                  hospitals={[]} // Replace with actual hospital data
                />
              )}
            />
          </CardContent>
        </Card>
    </div>
  )
}