'use client'
import { AppointmentList } from "@/components/appointment-list"
import { HospitalOverview } from "@/components/hospital-overview"
import { MedicalRecords } from "@/components/medical-records"
import { MedicalTests } from "@/components/medical-tests"
import { PatientProfile } from "@/components/patient-profile"
import { PatientRequests } from "@/components/patient-requests"
import { QuickOverview } from "@/components/quick-overview"
import { RevenuePanel } from "@/components/revenue-panel"
import { TaskManagement } from "@/components/task-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'

const patientPriorityData = [
  { name: 'Critical', value: 5, color: '#ef4444' },
  { name: 'Chronic', value: 15, color: '#f97316' },
  { name: 'Regular', value: 80, color: '#3b82f6' },
]

export default function Home() {
  const [selectedPatient, setSelectedPatient] = useState(null)
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Welcome, Dr. Smith</h1>
      <QuickOverview />
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentList onSelectPatient={setSelectedPatient} onSelectAppointment={() => {}} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Priority Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientPriorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {patientPriorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <TaskManagement />
        <Card>
          <CardHeader>
            <CardTitle>Patient Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <PatientRequests />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hospital Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <HospitalOverview />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <MedicalRecords />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Medical Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <MedicalTests />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenuePanel />
          </CardContent>
        </Card>
      </div>
      {selectedPatient && (
        <PatientProfile
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  )
}

