"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Activity,
  Thermometer,
  Stethoscope,
  Zap,
  FileText,
  User,
  Clock,
  CheckCircle,
  Save,
  Send,
  RefreshCw,
  Camera,
  Mic,
  Download,
} from "lucide-react"

type VitalSigns = {
  heartRate: number
  bloodPressure: string
  temperature: number
  oxygenSaturation: number
  respiratoryRate: number
  timestamp: string
}

type DiagnosticTest = {
  id: string
  name: string
  status: "pending" | "in-progress" | "completed" | "failed"
  result?: string
  timestamp: string
}

type PatientInfo = {
  name: string
  age: string
  gender: string
  allergies: string
  medications: string
  chiefComplaint: string
}

export default function PortableDiagnosticKit() {
  const [vitals, setVitals] = useState<VitalSigns>({
    heartRate: 0,
    bloodPressure: "",
    temperature: 0,
    oxygenSaturation: 0,
    respiratoryRate: 0,
    timestamp: "",
  })

  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    age: "",
    gender: "",
    allergies: "",
    medications: "",
    chiefComplaint: "",
  })

  const [diagnosticTests, setDiagnosticTests] = useState<DiagnosticTest[]>([
    { id: "ecg", name: "12-Lead ECG", status: "pending", timestamp: "" },
    { id: "glucose", name: "Blood Glucose", status: "pending", timestamp: "" },
    { id: "pulse-ox", name: "Pulse Oximetry", status: "pending", timestamp: "" },
    { id: "bp", name: "Blood Pressure", status: "pending", timestamp: "" },
  ])

  const [isMonitoring, setIsMonitoring] = useState(false)
  const [selectedTest, setSelectedTest] = useState<string>("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isMonitoring) {
      interval = setInterval(() => {
        // Simulate real-time vital signs monitoring
        setVitals({
          heartRate: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
          bloodPressure: `${Math.floor(Math.random() * 40) + 110}/${Math.floor(Math.random() * 20) + 70}`,
          temperature: Math.round((Math.random() * 2 + 97) * 10) / 10, // 97-99°F
          oxygenSaturation: Math.floor(Math.random() * 5) + 95, // 95-100%
          respiratoryRate: Math.floor(Math.random() * 8) + 12, // 12-20 breaths/min
          timestamp: new Date().toLocaleTimeString(),
        })
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isMonitoring])

  const handleStartMonitoring = () => {
    setIsMonitoring(true)
    console.log("Started vital signs monitoring")
    alert("Vital signs monitoring started")
  }

  const handleStopMonitoring = () => {
    setIsMonitoring(false)
    console.log("Stopped vital signs monitoring")
    alert("Vital signs monitoring stopped")
  }

  const handleRunTest = (testId: string) => {
    setDiagnosticTests((prev) =>
      prev.map((test) =>
        test.id === testId ? { ...test, status: "in-progress", timestamp: new Date().toLocaleTimeString() } : test,
      ),
    )

    // Simulate test completion after 3 seconds
    setTimeout(() => {
      setDiagnosticTests((prev) =>
        prev.map((test) =>
          test.id === testId
            ? {
                ...test,
                status: "completed",
                result: getTestResult(testId),
                timestamp: new Date().toLocaleTimeString(),
              }
            : test,
        ),
      )
      alert(`${getDiagnosticTestName(testId)} completed successfully`)
    }, 3000)

    console.log(`Running test: ${testId}`)
    alert(`Starting ${getDiagnosticTestName(testId)}...`)
  }

  const getTestResult = (testId: string): string => {
    switch (testId) {
      case "ecg":
        return "Normal sinus rhythm, HR 72 bpm"
      case "glucose":
        return "95 mg/dL (Normal)"
      case "pulse-ox":
        return "98% SpO2"
      case "bp":
        return "120/80 mmHg (Normal)"
      default:
        return "Test completed"
    }
  }

  const getDiagnosticTestName = (testId: string): string => {
    const test = diagnosticTests.find((t) => t.id === testId)
    return test?.name || "Unknown Test"
  }

  const handleSavePatientInfo = () => {
    console.log("Saving patient information:", patientInfo)
    alert("Patient information saved successfully")
  }

  const handleSendReport = () => {
    console.log("Sending diagnostic report to hospital")
    alert("Diagnostic report sent to receiving hospital")
  }

  const handleTakePhoto = () => {
    console.log("Taking diagnostic photo")
    alert("Photo captured and added to patient record")
  }

  const handleRecordAudio = () => {
    console.log("Recording audio note")
    alert("Audio note recorded and saved")
  }

  const handleExportReport = () => {
    console.log("Exporting diagnostic report")
    alert("Diagnostic report exported as PDF")
  }

  const getVitalStatus = (vital: string, value: number | string) => {
    switch (vital) {
      case "heartRate":
        const hr = value as number
        if (hr < 60 || hr > 100) return "abnormal"
        return "normal"
      case "temperature":
        const temp = value as number
        if (temp < 97 || temp > 99.5) return "abnormal"
        return "normal"
      case "oxygenSaturation":
        const spo2 = value as number
        if (spo2 < 95) return "abnormal"
        return "normal"
      default:
        return "normal"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-500"
      case "in-progress":
        return "bg-blue-500 animate-pulse"
      case "completed":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portable Diagnostic Kit
          </h1>
          <p className="text-slate-600 mt-2">Advanced field diagnostics and patient monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={`${isMonitoring ? "bg-green-500" : "bg-gray-500"} text-white`}>
            {isMonitoring ? "Monitoring Active" : "Standby"}
          </Badge>
        </div>
      </div>

      {/* Patient Information */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-600" />
            <span>Patient Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="name">Patient Name</Label>
              <Input
                id="name"
                value={patientInfo.name}
                onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={patientInfo.age}
                onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                placeholder="Enter age"
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={patientInfo.gender}
                onValueChange={(value) => setPatientInfo({ ...patientInfo, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="allergies">Known Allergies</Label>
              <Textarea
                id="allergies"
                value={patientInfo.allergies}
                onChange={(e) => setPatientInfo({ ...patientInfo, allergies: e.target.value })}
                placeholder="List any known allergies"
              />
            </div>
            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={patientInfo.medications}
                onChange={(e) => setPatientInfo({ ...patientInfo, medications: e.target.value })}
                placeholder="List current medications"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="complaint">Chief Complaint</Label>
            <Textarea
              id="complaint"
              value={patientInfo.chiefComplaint}
              onChange={(e) => setPatientInfo({ ...patientInfo, chiefComplaint: e.target.value })}
              placeholder="Describe the main complaint or symptoms"
            />
          </div>
          <Button
            onClick={handleSavePatientInfo}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Patient Info
          </Button>
        </CardContent>
      </Card>

      {/* Vital Signs Monitoring */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-red-600" />
              <span>Vital Signs Monitoring</span>
            </div>
            <div className="flex space-x-2">
              {!isMonitoring ? (
                <Button
                  onClick={handleStartMonitoring}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Start Monitoring
                </Button>
              ) : (
                <Button
                  onClick={handleStopMonitoring}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Stop Monitoring
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card
              className={`border ${getVitalStatus("heartRate", vitals.heartRate) === "abnormal" ? "border-red-300 bg-red-50" : "border-green-300 bg-green-50"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Heart Rate</span>
                  </div>
                  <Badge
                    className={
                      getVitalStatus("heartRate", vitals.heartRate) === "abnormal" ? "bg-red-500" : "bg-green-500"
                    }
                  >
                    {getVitalStatus("heartRate", vitals.heartRate)}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mt-2">{vitals.heartRate || "--"} bpm</div>
              </CardContent>
            </Card>

            <Card className="border-blue-300 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Blood Pressure</span>
                  </div>
                  <Badge className="bg-blue-500">normal</Badge>
                </div>
                <div className="text-2xl font-bold mt-2">{vitals.bloodPressure || "--/--"} mmHg</div>
              </CardContent>
            </Card>

            <Card
              className={`border ${getVitalStatus("temperature", vitals.temperature) === "abnormal" ? "border-red-300 bg-red-50" : "border-green-300 bg-green-50"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">Temperature</span>
                  </div>
                  <Badge
                    className={
                      getVitalStatus("temperature", vitals.temperature) === "abnormal" ? "bg-red-500" : "bg-green-500"
                    }
                  >
                    {getVitalStatus("temperature", vitals.temperature)}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mt-2">{vitals.temperature || "--"}°F</div>
              </CardContent>
            </Card>

            <Card
              className={`border ${getVitalStatus("oxygenSaturation", vitals.oxygenSaturation) === "abnormal" ? "border-red-300 bg-red-50" : "border-green-300 bg-green-50"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">SpO2</span>
                  </div>
                  <Badge
                    className={
                      getVitalStatus("oxygenSaturation", vitals.oxygenSaturation) === "abnormal"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }
                  >
                    {getVitalStatus("oxygenSaturation", vitals.oxygenSaturation)}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mt-2">{vitals.oxygenSaturation || "--"}%</div>
              </CardContent>
            </Card>

            <Card className="border-cyan-300 bg-cyan-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5 text-cyan-500" />
                    <span className="font-medium">Respiratory Rate</span>
                  </div>
                  <Badge className="bg-cyan-500">normal</Badge>
                </div>
                <div className="text-2xl font-bold mt-2">{vitals.respiratoryRate || "--"} /min</div>
              </CardContent>
            </Card>

            <Card className="border-gray-300 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Last Update</span>
                </div>
                <div className="text-lg font-bold mt-2">{vitals.timestamp || "--:--:--"}</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Tests */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span>Diagnostic Tests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {diagnosticTests.map((test) => (
              <Card key={test.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{test.name}</h3>
                    <Badge className={`${getStatusColor(test.status)} text-white`}>{test.status}</Badge>
                  </div>
                  {test.result && (
                    <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-800">
                        <strong>Result:</strong> {test.result}
                      </p>
                    </div>
                  )}
                  {test.timestamp && <p className="text-xs text-gray-500 mb-3">Last run: {test.timestamp}</p>}
                  <Button
                    onClick={() => handleRunTest(test.id)}
                    disabled={test.status === "in-progress"}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white disabled:opacity-50"
                  >
                    {test.status === "in-progress" ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Run Test
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button
          onClick={handleTakePhoto}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          <Camera className="w-4 h-4 mr-2" />
          Take Photo
        </Button>

        <Button
          onClick={handleRecordAudio}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          <Mic className="w-4 h-4 mr-2" />
          Record Audio
        </Button>

        <Button
          onClick={handleExportReport}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>

        <Button
          onClick={handleSendReport}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
        >
          <Send className="w-4 h-4 mr-2" />
          Send to Hospital
        </Button>
      </div>
    </div>
  )
}
