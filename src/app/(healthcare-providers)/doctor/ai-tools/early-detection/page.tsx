"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Define types
type Patient = {
  id: number
  name: string
  age: number
  riskScore: number
  condition: string
  additionalDetails?: string
}

const mockPatientData: Patient[] = [
  { id: 1, name: "John Doe", age: 45, riskScore: 0.8, condition: "Sepsis" },
  { id: 2, name: "Jane Smith", age: 62, riskScore: 0.6, condition: "Cardiac Arrest" },
  { id: 3, name: "Mike Johnson", age: 55, riskScore: 0.4, condition: "Respiratory Failure" },
]

const mockVitalsData = [
  { time: "00:00", heartRate: 72, bloodPressure: 120, oxygenSaturation: 98 },
  { time: "04:00", heartRate: 75, bloodPressure: 122, oxygenSaturation: 97 },
  { time: "08:00", heartRate: 80, bloodPressure: 126, oxygenSaturation: 96 },
  { time: "12:00", heartRate: 78, bloodPressure: 124, oxygenSaturation: 97 },
  { time: "16:00", heartRate: 76, bloodPressure: 121, oxygenSaturation: 98 },
  { time: "20:00", heartRate: 74, bloodPressure: 119, oxygenSaturation: 99 },
]

// Utility function to clean generated output
const sanitizeOutput = (text: string) => {
  return text.replace(/\*\*|[^a-zA-Z0-9.,:;()\s-]/g, "").trim()
}

export default function EarlyDetection() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patientDetails, setPatientDetails] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchPatientInsights = async (patient: Patient) => {
    setIsLoading(true)
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        const mockInsights = `Comprehensive Medical Risk Assessment for ${patient.name}:

1. Potential Underlying Risk Factors:
   - Age-related cardiovascular changes (${patient.age} years)
   - Elevated inflammatory markers suggesting ${patient.condition}
   - Previous medical history indicates increased susceptibility

2. Recommended Immediate Medical Interventions:
   - Continuous cardiac monitoring
   - IV fluid resuscitation if indicated
   - Blood pressure stabilization
   - Oxygen therapy as needed

3. Diagnostic Tests to Consider:
   - Complete blood count with differential
   - Comprehensive metabolic panel
   - Arterial blood gas analysis
   - Chest X-ray and ECG
   - Blood cultures if infection suspected

4. Potential Treatment Approaches:
   - Evidence-based protocol for ${patient.condition}
   - Multidisciplinary team consultation
   - Risk stratification based on severity scores

5. Long-term Management Strategies:
   - Regular follow-up appointments
   - Patient education on warning signs
   - Lifestyle modifications as appropriate
   - Medication adherence monitoring

Risk Score: ${patient.riskScore} indicates ${patient.riskScore > 0.6 ? "HIGH" : "MODERATE"} priority for immediate attention.`

        setPatientDetails(mockInsights)
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error("Error generating patient insights:", error)
      setPatientDetails("Unable to generate detailed insights. Please try again.")
      setIsLoading(false)
    }
  }

  const getRiskBadgeColor = (riskScore: number) => {
    if (riskScore > 0.7) return "bg-red-100 text-red-700 border-red-200"
    if (riskScore > 0.5) return "bg-orange-100 text-orange-700 border-orange-200"
    return "bg-green-100 text-green-700 border-green-200"
  }

  const getRiskLevel = (riskScore: number) => {
    if (riskScore > 0.7) return "Critical"
    if (riskScore > 0.5) return "High"
    return "Moderate"
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          AI-Powered Early Detection
        </h1>
        <p className="text-slate-600">Advanced predictive analytics for critical condition detection</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-100 data-[state=active]:to-pink-100"
          >
            Risk Overview
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-100 data-[state=active]:to-pink-100"
          >
            Detailed Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100 rounded-t-lg">
              <CardTitle className="text-slate-700">Patient Risk Analysis</CardTitle>
              <CardDescription className="text-slate-600">
                AI-powered early detection of critical conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-slate-700">Patient Name</TableHead>
                    <TableHead className="text-slate-700">Age</TableHead>
                    <TableHead className="text-slate-700">Risk Score</TableHead>
                    <TableHead className="text-slate-700">Risk Level</TableHead>
                    <TableHead className="text-slate-700">Potential Condition</TableHead>
                    <TableHead className="text-slate-700">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPatientData.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-700">{patient.name}</TableCell>
                      <TableCell className="text-slate-600">{patient.age}</TableCell>
                      <TableCell className="text-slate-600">{patient.riskScore.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getRiskBadgeColor(patient.riskScore)}>
                          {getRiskLevel(patient.riskScore)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">{patient.condition}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setSelectedPatient(patient)
                            fetchPatientInsights(patient)
                          }}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
                        >
                          {isLoading && selectedPatient?.id === patient.id ? "Loading..." : "View Details"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          {selectedPatient ? (
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 rounded-t-lg">
                  <CardTitle className="text-slate-700">{selectedPatient.name} - Detailed Analysis</CardTitle>
                  <CardDescription className="text-slate-600">
                    Risk Score: {selectedPatient.riskScore.toFixed(2)} - Potential Condition:{" "}
                    {selectedPatient.condition}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Alert variant={selectedPatient.riskScore > 0.5 ? "destructive" : "default"} className="mb-6">
                    <AlertTitle className="text-slate-700">
                      {selectedPatient.riskScore > 0.5 ? "High Risk Detected" : "Moderate Risk"}
                    </AlertTitle>
                    <AlertDescription className="text-slate-600">
                      This patient shows signs of {selectedPatient.condition}.
                      {selectedPatient.riskScore > 0.5 && " Immediate attention is recommended."}
                    </AlertDescription>
                  </Alert>

                  {patientDetails && (
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-slate-700">AI-Generated Insights</h3>
                      <pre className="whitespace-pre-line text-slate-700 text-sm leading-relaxed">{patientDetails}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
                  <CardTitle className="text-slate-700">Vitals Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockVitalsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="time" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Line type="monotone" dataKey="heartRate" stroke="#3b82f6" name="Heart Rate" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="bloodPressure"
                        stroke="#10b981"
                        name="Blood Pressure"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="oxygenSaturation"
                        stroke="#f59e0b"
                        name="Oxygen Saturation"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
                  </div>
                  <p className="text-slate-600">Select a patient from the Risk Overview to view detailed analysis.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
