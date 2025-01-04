"use client"

import { PatientList } from "@/components/patient-list"
import { PatientVitals } from "@/components/patient-vitals"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PatientMonitoring() {
  interface Patient {
    id: number;
    name: string;
    // Add other patient properties as needed
  }

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  interface Alert {
    id: number;
    patientName: string;
    message: string;
    timestamp: string;
  }
  
  const [alerts, setAlerts] = useState<Alert[]>([])

  // Simulating real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving a new alert
      if (Math.random() > 0.7) {
        setAlerts(prev => [...prev, {
          id: Date.now(),
          patientName: "John Doe",
          message: "Abnormal heart rate detected",
          timestamp: new Date().toLocaleTimeString()
        }])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Patient Monitoring</h2>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Alerts ({alerts.length})
        </Button>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Real-Time Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Critical Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Heart Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72 bpm</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Blood Pressure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120/80 mmHg</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Patient List</CardTitle>
              </CardHeader>
              <CardContent>
                <PatientList onSelectPatient={setSelectedPatient} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Patient Vitals</CardTitle>
                <CardDescription>
                  {selectedPatient ? `Monitoring ${selectedPatient.name}` : 'Select a patient to view vitals'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPatient && <PatientVitals patient={selectedPatient} />}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Alerts</CardTitle>
              <CardDescription>Recent alerts from patient monitoring systems</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <Alert key={alert.id}>
                      <AlertTitle>{alert.patientName}</AlertTitle>
                      <AlertDescription>
                        {alert.message} - {alert.timestamp}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              ) : (
                <p>No recent alerts</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

