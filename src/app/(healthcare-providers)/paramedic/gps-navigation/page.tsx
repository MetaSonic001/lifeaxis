"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation, MapPin, Route, Clock, Play, Square, RotateCcw, Zap } from "lucide-react"

export default function GPSNavigation() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentRoute, setCurrentRoute] = useState("Standard Route")
  const [eta, setEta] = useState("12 minutes")
  const [distance, setDistance] = useState("3.2 miles")

  const handleStartNavigation = () => {
    setIsNavigating(true)
    console.log("Navigation started")
    alert("Navigation started! Following optimal route to destination.")
  }

  const handleStopNavigation = () => {
    setIsNavigating(false)
    console.log("Navigation stopped")
    alert("Navigation stopped.")
  }

  const handleRecalculateRoute = () => {
    console.log("Recalculating route...")
    // Simulate route recalculation
    const newEta = Math.floor(Math.random() * 10) + 8
    const newDistance = (Math.random() * 2 + 2).toFixed(1)
    setEta(`${newEta} minutes`)
    setDistance(`${newDistance} miles`)
    setCurrentRoute("Optimized Route")
    alert(`Route recalculated! New ETA: ${newEta} minutes`)
  }

  const handleEmergencyRoute = () => {
    console.log("Switching to emergency route...")
    setCurrentRoute("Emergency Route")
    setEta("8 minutes")
    setDistance("2.8 miles")
    alert("Switched to emergency route with priority traffic signals!")
  }

  const handleViewTraffic = () => {
    alert("Traffic conditions: Light traffic on main routes. No major delays reported.")
  }

  const handleNearbyHospitals = () => {
    alert(
      "Nearby hospitals:\n• City General Hospital - 2.1 miles\n• St. Mary's Medical Center - 3.5 miles\n• Emergency Care Center - 1.8 miles",
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GPS Navigation
          </h1>
          <p className="text-slate-600 mt-2">Real-time navigation and route optimization</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={`${isNavigating ? "bg-green-500" : "bg-gray-500"} text-white`}>
            {isNavigating ? "Navigating" : "Standby"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              <span>Current Route</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <p className="text-slate-600 mb-2">Interactive map will be displayed here</p>
                <Badge variant="outline" className="bg-white/80">
                  {currentRoute}
                </Badge>
              </div>
              {isNavigating && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">ETA: {eta}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Route className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700 font-medium">{distance}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
          <CardHeader>
            <CardTitle>Navigation Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isNavigating ? (
              <Button
                onClick={handleStartNavigation}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Navigation
              </Button>
            ) : (
              <Button
                onClick={handleStopNavigation}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Navigation
              </Button>
            )}

            <Button
              onClick={handleRecalculateRoute}
              variant="outline"
              className="w-full bg-white hover:bg-blue-50 border-blue-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Recalculate Route
            </Button>

            <Button
              onClick={handleEmergencyRoute}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              Emergency Route
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Controls */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button
          onClick={handleViewTraffic}
          variant="outline"
          className="bg-white hover:bg-yellow-50 border-yellow-200 text-yellow-700"
        >
          View Traffic
        </Button>

        <Button
          onClick={handleNearbyHospitals}
          variant="outline"
          className="bg-white hover:bg-green-50 border-green-200 text-green-700"
        >
          Nearby Hospitals
        </Button>

        <Button
          onClick={() => alert("Voice guidance activated")}
          variant="outline"
          className="bg-white hover:bg-purple-50 border-purple-200 text-purple-700"
        >
          Voice Guidance
        </Button>

        <Button
          onClick={() => alert("Settings panel opened")}
          variant="outline"
          className="bg-white hover:bg-gray-50 border-gray-200"
        >
          Settings
        </Button>
      </div>
    </div>
  )
}
