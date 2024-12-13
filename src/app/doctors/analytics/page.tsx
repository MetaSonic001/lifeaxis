"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const consultationData = [
  { name: "Jan", inPerson: 65, online: 35 },
  { name: "Feb", inPerson: 59, online: 41 },
  { name: "Mar", inPerson: 80, online: 20 },
  { name: "Apr", inPerson: 81, online: 19 },
  { name: "May", inPerson: 56, online: 44 },
  { name: "Jun", inPerson: 55, online: 45 },
  { name: "Jul", inPerson: 40, online: 60 },
]

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 4800 },
  { name: "Jun", revenue: 5500 },
  { name: "Jul", revenue: 6000 },
]

const patientDemographics = [
  { name: "0-18", value: 20 },
  { name: "19-35", value: 30 },
  { name: "36-50", value: 25 },
  { name: "51-65", value: 15 },
  { name: "65+", value: 10 },
]

const diagnosisData = [
  { name: "Hypertension", count: 120 },
  { name: "Diabetes", count: 80 },
  { name: "Asthma", count: 60 },
  { name: "Arthritis", count: 40 },
  { name: "Depression", count: 30 },
]

const patientSatisfactionData = [
  { name: "Jan", satisfaction: 4.2 },
  { name: "Feb", satisfaction: 4.3 },
  { name: "Mar", satisfaction: 4.5 },
  { name: "Apr", satisfaction: 4.4 },
  { name: "May", satisfaction: 4.6 },
  { name: "Jun", satisfaction: 4.7 },
  { name: "Jul", satisfaction: 4.8 },
]

const appointmentDurationData = [
  { name: "0-15 min", value: 30 },
  { name: "16-30 min", value: 45 },
  { name: "31-45 min", value: 20 },
  { name: "46+ min", value: 5 },
]

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consultation Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consultationData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inPerson" stackId="a" fill="#8884d8" name="In-person" />
                <Bar dataKey="online" stackId="a" fill="#82ca9d" name="Online" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientDemographics}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Diagnoses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={diagnosisData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Satisfaction Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientSatisfactionData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="satisfaction" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointment Duration Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentDurationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

