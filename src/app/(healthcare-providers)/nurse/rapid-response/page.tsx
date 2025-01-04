'use client'

import { useState } from 'react'
import { AlertTriangle, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Alert = {
  id: number
  patientName: string
  roomNumber: string
  vitalSigns: string
  timestamp: string
}

export default function RapidResponseTrigger() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [newAlert, setNewAlert] = useState({ patientName: '', roomNumber: '', vitalSigns: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const alert: Alert = {
      id: Date.now(),
      ...newAlert,
      timestamp: new Date().toLocaleString()
    }
    setAlerts([alert, ...alerts])
    setNewAlert({ patientName: '', roomNumber: '', vitalSigns: '' })
  }

  const handleResolve = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Rapid Response Trigger System</h1>

      <Card>
        <CardHeader>
          <CardTitle>Trigger Rapid Response</CardTitle>
          <CardDescription>Enter patient details to alert the rapid response team</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={newAlert.patientName}
                  onChange={(e) => setNewAlert({ ...newAlert, patientName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  value={newAlert.roomNumber}
                  onChange={(e) => setNewAlert({ ...newAlert, roomNumber: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vitalSigns">Concerning Vital Signs</Label>
              <Input
                id="vitalSigns"
                value={newAlert.vitalSigns}
                onChange={(e) => setNewAlert({ ...newAlert, vitalSigns: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Trigger Rapid Response</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold">Active Alerts</h2>
      <div className="space-y-4">
        {alerts.map(alert => (
          <Card key={alert.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{alert.patientName} - Room {alert.roomNumber}</CardTitle>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <p><strong>Vital Signs:</strong> {alert.vitalSigns}</p>
              <p><strong>Triggered at:</strong> {alert.timestamp}</p>
              <Button onClick={() => handleResolve(alert.id)} className="mt-2">
                <Check className="mr-2 h-4 w-4" /> Resolve
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

