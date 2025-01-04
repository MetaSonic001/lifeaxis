"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from 'react'

const mockAreas = [
  { id: 1, name: "Emergency Room", occupancy: 75, temperature: 22, humidity: 45 },
  { id: 2, name: "ICU", occupancy: 90, temperature: 21, humidity: 50 },
  { id: 3, name: "General Ward", occupancy: 60, temperature: 23, humidity: 40 },
  { id: 4, name: "Operating Room", occupancy: 40, temperature: 20, humidity: 55 },
]

export default function FacilityMonitoring() {
  const [areas, setAreas] = useState(mockAreas)
  const [alerts, setAlerts] = useState<string[]>([])

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setAreas(areas.map(area => ({
        ...area,
        occupancy: Math.min(100, Math.max(0, area.occupancy + Math.floor(Math.random() * 11) - 5)),
        temperature: area.temperature + (Math.random() - 0.5),
        humidity: Math.min(100, Math.max(0, area.humidity + Math.floor(Math.random() * 11) - 5))
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [areas])

  useEffect(() => {
    // Check for alerts
    const newAlerts = areas.flatMap(area => {
      const areaAlerts = []
      if (area.occupancy > 90) areaAlerts.push(`High occupancy in ${area.name}`)
      if (area.temperature > 25 || area.temperature < 20) areaAlerts.push(`Abnormal temperature in ${area.name}`)
      if (area.humidity > 60 || area.humidity < 30) areaAlerts.push(`Abnormal humidity in ${area.name}`)
      return areaAlerts
    })
    setAlerts(newAlerts)
  }, [areas])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Facility Monitoring</h2>
      {alerts.length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Facility Alerts</AlertTitle>
          <AlertDescription>
            <ul>
              {alerts.map((alert, index) => (
                <li key={index}>{alert}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {areas.map((area) => (
          <Card key={area.id}>
            <CardHeader>
              <CardTitle>{area.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Occupancy:</span>
                  <Badge variant={area.occupancy > 80 ? "destructive" : "secondary"}>
                    {area.occupancy}%
                  </Badge>
                </div>
                <Progress value={area.occupancy} className="w-full" />
                <div className="flex justify-between items-center">
                  <span>Temperature:</span>
                  <Badge variant="outline">{area.temperature.toFixed(1)}°C</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Humidity:</span>
                  <Badge variant="outline">{area.humidity}%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

