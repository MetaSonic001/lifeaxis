'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Clock, MapPin, Navigation } from 'lucide-react'
import { useEffect, useState } from 'react'

type Route = {
  id: number
  destination: string
  estimatedTime: number
  distance: number
  trafficCondition: 'Light' | 'Moderate' | 'Heavy'
}

export default function DynamicGPSNavigation() {
  const [currentLocation, setCurrentLocation] = useState('Central Hospital')
  const [destination, setDestination] = useState('')
  const [routes, setRoutes] = useState<Route[]>([])

  useEffect(() => {
    // Simulating route calculation
    if (destination) {
      const newRoutes: Route[] = [
        {
          id: 1,
          destination,
          estimatedTime: Math.floor(Math.random() * 20) + 5,
          distance: Math.floor(Math.random() * 10) + 1,
          trafficCondition: ['Light', 'Moderate', 'Heavy'][Math.floor(Math.random() * 3)] as 'Light' | 'Moderate' | 'Heavy',
        },
        {
          id: 2,
          destination,
          estimatedTime: Math.floor(Math.random() * 20) + 5,
          distance: Math.floor(Math.random() * 10) + 1,
          trafficCondition: ['Light', 'Moderate', 'Heavy'][Math.floor(Math.random() * 3)] as 'Light' | 'Moderate' | 'Heavy',
        },
      ]
      setRoutes(newRoutes)
    }
  }, [destination])

  const handleStartNavigation = (routeId: number) => {
    // In a real application, this would start turn-by-turn navigation
    console.log(`Starting navigation for route ${routeId}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dynamic GPS Navigation</h1>

      <Card>
        <CardHeader>
          <CardTitle>Current Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <span>{currentLocation}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Set Destination</CardTitle>
          <CardDescription>Enter the address or name of the destination</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <Button onClick={() => setDestination(destination)}>Calculate Routes</Button>
          </div>
        </CardContent>
      </Card>

      {routes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Available Routes</h2>
          {routes.map(route => (
            <Card key={route.id}>
              <CardHeader>
                <CardTitle>Route {route.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5 text-green-500" />
                    <span>{route.distance} miles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span>{route.estimatedTime} minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span>Traffic: {route.trafficCondition}</span>
                  </div>
                </div>
                <Button onClick={() => handleStartNavigation(route.id)} className="mt-4">
                  Start Navigation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

