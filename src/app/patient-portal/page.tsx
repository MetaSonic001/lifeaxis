"use client";

import { useState, useEffect } from "react"
import {
  Calendar,
  FileText,
  User,
  Heart,
  Pill,
  MessageCircle,
  CreditCard,
  Download,
  Bell,
  Settings,
  LogOut,
  Clock,
  MapPin,
  Phone,
  Mail,
  Trash2,
  Plus,
  Eye,
  Edit,
  Video,
  Search,
  Filter,
  Activity,
  Thermometer,
  Weight,
  Brain,
  Book,
  Zap,
  Wind,
  Play,
  Pause,
  RotateCcw,
  Sun,
  Cloud,
  CloudRain,
  Frown,
  Meh,
  Smile,
  Laugh,
  Moon,
  Droplets,
  Flame,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [journalEntry, setJournalEntry] = useState({
    mood: "",
    painLevel: 0,
    hasMigraine: false,
    sleepQuality: "",
    stressLevel: 0,
    notes: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [selectedSymptoms, setSelectedSymptoms] = useState([]) // Moved useState to top level

  // Breathing exercise state
  const [breathingState, setBreathingState] = useState("idle") // idle, inhale, hold, exhale
  const [breathingCount, setBreathingCount] = useState(0)
  const [breathingCycle, setBreathingCycle] = useState(0)
  const [isBreathingActive, setIsBreathingActive] = useState(false)
  const [breathingTimer, setBreathingTimer] = useState(null)

  // Sample data
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2025-07-02",
      time: "10:30 AM",
      type: "In-person",
      location: "Heart Care Center, Room 203",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Practice",
      date: "2025-07-05",
      time: "2:00 PM",
      type: "Video Call",
      location: "Virtual Consultation",
      status: "pending",
    },
  ];

  const recentResults = [
    {
      id: 1,
      test: "Blood Panel",
      date: "2025-06-25",
      status: "Available",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      test: "Chest X-Ray",
      date: "2025-06-20",
      status: "Available",
      doctor: "Dr. Michael Chen",
    },
  ];

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Johnson",
      refillsLeft: 2,
      nextRefill: "2025-07-15",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Michael Chen",
      refillsLeft: 0,
      nextRefill: "Contact doctor",
    },
  ];

  const journalEntries = [
    {
      id: 1,
      date: "2025-06-28",
      mood: "Happy",
      painLevel: 2,
      hasMigraine: false,
      sleepQuality: "Good",
      stressLevel: 3,
      notes: "Had a productive day at work. Feeling optimistic about the week ahead.",
      symptoms: ["energetic", "focused"],
    },
    {
      id: 2,
      date: "2025-06-27",
      mood: "Anxious",
      painLevel: 4,
      hasMigraine: true,
      sleepQuality: "Poor",
      stressLevel: 6,
      notes: "Dealing with a headache today. Need to focus on stress management.",
      symptoms: ["headache", "tired"],
    },
  ];

  const vitals = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", icon: Heart },
    { label: "Heart Rate", value: "72", unit: "bpm", status: "normal", icon: Activity },
    { label: "Temperature", value: "98.6", unit: "°F", status: "normal", icon: Thermometer },
    { label: "Weight", value: "165", unit: "lbs", status: "normal", icon: Weight },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "medical-records", label: "Medical Records", icon: FileText },
    { id: "test-results", label: "Test Results", icon: FileText },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "breathing-activity", label: "Breathing Exercise", icon: Wind },
    { id: "journal", label: "Journal", icon: Book },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "profile", label: "Profile", icon: User },
  ];

  // Mood options with colors and icons
  const moodOptions = [
    { id: "excellent", label: "Excellent", icon: Laugh, color: "bg-green-500", textColor: "text-green-700" },
    { id: "happy", label: "Happy", icon: Smile, color: "bg-blue-500", textColor: "text-blue-700" },
    { id: "calm", label: "Calm", icon: Sun, color: "bg-yellow-500", textColor: "text-yellow-700" },
    { id: "neutral", label: "Neutral", icon: Meh, color: "bg-gray-500", textColor: "text-gray-700" },
    { id: "anxious", label: "Anxious", icon: Cloud, color: "bg-orange-500", textColor: "text-orange-700" },
    { id: "sad", label: "Sad", icon: CloudRain, color: "bg-indigo-500", textColor: "text-indigo-700" },
    { id: "stressed", label: "Stressed", icon: Flame, color: "bg-red-500", textColor: "text-red-700" },
    { id: "tired", label: "Tired", icon: Moon, color: "bg-purple-500", textColor: "text-purple-700" },
  ];

  const sleepOptions = [
    { id: "excellent", label: "Excellent", icon: Sun, color: "bg-green-500" },
    { id: "good", label: "Good", icon: Smile, color: "bg-blue-500" },
    { id: "fair", label: "Fair", icon: Meh, color: "bg-yellow-500" },
    { id: "poor", label: "Poor", icon: Frown, color: "bg-red-500" },
  ];

  const symptomOptions = [
    { id: "headache", label: "Headache", icon: Brain, color: "bg-red-100 text-red-700" },
    { id: "nausea", label: "Nausea", icon: Droplets, color: "bg-green-100 text-green-700" },
    { id: "fatigue", label: "Fatigue", icon: Moon, color: "bg-purple-100 text-purple-700" },
    { id: "dizziness", label: "Dizziness", icon: RotateCcw, color: "bg-blue-100 text-blue-700" },
    { id: "anxiety", label: "Anxiety", icon: Heart, color: "bg-orange-100 text-orange-700" },
    { id: "energetic", label: "Energetic", icon: Zap, color: "bg-yellow-100 text-yellow-700" },
    { id: "focused", label: "Focused", icon: Target, color: "bg-indigo-100 text-indigo-700" },
    { id: "restless", label: "Restless", icon: Wind, color: "bg-gray-100 text-gray-700" },
  ];

  // Breathing exercise functions
  const startBreathingExercise = () => {
    setIsBreathingActive(true)
    setBreathingState("inhale")
    setBreathingCount(4)
    setBreathingCycle(0)

    const timer = setInterval(() => {
      setBreathingCount((prev) => {
        if (prev > 1) {
          return prev - 1
        } else {
          // Move to next phase
          setBreathingState((currentState) => {
            if (currentState === "inhale") {
              setBreathingCount(7)
              return "hold"
            } else if (currentState === "hold") {
              setBreathingCount(8)
              return "exhale"
            } else {
              setBreathingCount(4)
              setBreathingCycle((prev) => prev + 1)
              return "inhale"
            }
          })
          return prev
        }
      })
    }, 1000)

    setBreathingTimer(timer)
  }

  const stopBreathingExercise = () => {
    setIsBreathingActive(false)
    setBreathingState("idle")
    setBreathingCount(0)
    setBreathingCycle(0)
    if (breathingTimer) {
      clearInterval(breathingTimer)
      setBreathingTimer(null)
    }
  }

  const resetBreathingExercise = () => {
    stopBreathingExercise()
  }

  useEffect(() => {
    return () => {
      if (breathingTimer) {
        clearInterval(breathingTimer)
      }
    }
  }, [breathingTimer])

  const renderBreathingActivity = () => {
    const getBreathingInstruction = () => {
      switch (breathingState) {
        case "inhale":
          return "Breathe In"
        case "hold":
          return "Hold"
        case "exhale":
          return "Breathe Out"
        default:
          return "Ready to Begin"
      }
    }

    const getBreathingColor = () => {
      switch (breathingState) {
        case "inhale":
          return "from-blue-400 to-blue-600"
        case "hold":
          return "from-yellow-400 to-yellow-600"
        case "exhale":
          return "from-green-400 to-green-600"
        default:
          return "from-gray-400 to-gray-600"
      }
    }

    const getCircleScale = () => {
      switch (breathingState) {
        case "inhale":
          return "scale-150"
        case "hold":
          return "scale-150"
        case "exhale":
          return "scale-75"
        default:
          return "scale-100"
      }
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">4-7-8 Breathing Exercise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This breathing technique helps reduce anxiety and promote relaxation. Inhale for 4 seconds, hold for 7
            seconds, then exhale for 8 seconds.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center space-y-8">
              {/* Breathing Circle Animation */}
              <div className="relative flex items-center justify-center h-80">
                <div
                  className={`w-64 h-64 rounded-full bg-gradient-to-br ${getBreathingColor()} 
                    transition-all duration-1000 ease-in-out ${getCircleScale()} 
                    flex items-center justify-center shadow-2xl`}
                >
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-2">{getBreathingInstruction()}</div>
                    {isBreathingActive && <div className="text-4xl font-mono">{breathingCount}</div>}
                  </div>
                </div>

                {/* Breathing rings */}
                <div
                  className={`absolute w-80 h-80 rounded-full border-4 border-opacity-30 
                  ${
                    breathingState === "inhale"
                      ? "border-blue-400 animate-ping"
                      : breathingState === "hold"
                        ? "border-yellow-400"
                        : breathingState === "exhale"
                          ? "border-green-400 animate-pulse"
                          : "border-gray-400"
                  }`}
                ></div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <div className="text-lg text-gray-700">
                  {!isBreathingActive
                    ? "Click start to begin your breathing exercise"
                    : `Cycle ${breathingCycle + 1} - ${getBreathingInstruction()}`}
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center space-x-4">
                  {!isBreathingActive ? (
                    <Button
                      onClick={startBreathingExercise}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Exercise
                    </Button>
                  ) : (
                    <>
                      <Button onClick={stopBreathingExercise} variant="outline" className="px-6 py-3 bg-transparent">
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </Button>
                      <Button onClick={resetBreathingExercise} variant="outline" className="px-6 py-3 bg-transparent">
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Reset
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Progress */}
              {isBreathingActive && (
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Completed Cycles</div>
                  <div className="text-2xl font-bold text-blue-600">{breathingCycle}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Card */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Benefits of 4-7-8 Breathing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Reduces anxiety and stress
                </div>
                <div className="flex items-center text-blue-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  Improves sleep quality
                </div>
                <div className="flex items-center text-purple-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                  Lowers blood pressure
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-orange-600">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                  Enhances focus
                </div>
                <div className="flex items-center text-indigo-600">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                  Promotes relaxation
                </div>
                <div className="flex items-center text-teal-600">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                  Improves emotional regulation
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
        <p className="text-blue-100">Here's your health overview for today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Next Appointment</p>
                <p className="text-lg font-semibold">2 days</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Pending Results</p>
                <p className="text-lg font-semibold">2</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Active Medications</p>
                <p className="text-lg font-semibold">4</p>
              </div>
              <Pill className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Unread Messages</p>
                <p className="text-lg font-semibold">3</p>
              </div>
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Vitals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vitals.map((vital, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <vital.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">{vital.label}</p>
                <p className="text-lg font-semibold">{vital.value}</p>
                <p className="text-xs text-gray-500">{vital.unit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Upcoming Appointments</CardTitle>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Schedule New
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.slice(0, 2).map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{apt.doctor}</h4>
                    <p className="text-sm text-gray-600">{apt.specialty}</p>
                    <p className="text-sm text-gray-500">
                      {apt.date} at {apt.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={apt.type === "Video Call" ? "secondary" : "default"}>
                    {apt.type === "Video Call" ? (
                      <Video className="w-3 h-3 mr-1" />
                    ) : (
                      <MapPin className="w-3 h-3 mr-1" />
                    )}
                    {apt.type}
                  </Badge>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Schedule New Appointment
        </Button>
      </div>
      <div className="flex space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search appointments..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>
      <div className="grid gap-4">
        {upcomingAppointments.map((apt) => (
          <Card key={apt.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{apt.doctor}</h3>
                    <p className="text-gray-600">{apt.specialty}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {apt.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {apt.time}
                      </div>
                      <div className="flex items-center">
                        {apt.type === "Video Call" ? (
                          <Video className="w-4 h-4 mr-1" />
                        ) : (
                          <MapPin className="w-4 h-4 mr-1" />
                        )}
                        {apt.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={apt.status === "confirmed" ? "default" : "secondary"}>{apt.status}</Badge>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    {apt.type === "Video Call" ? "Join Call" : "View Details"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderMedications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Medications</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </Button>
      </div>
      <div className="grid gap-4">
        {medications.map((med) => (
          <Card key={med.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Pill className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{med.name}</h3>
                    <p className="text-gray-600">
                      {med.dosage} - {med.frequency}
                    </p>
                    <p className="text-sm text-gray-500">Prescribed by {med.prescribedBy}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Refills left: {med.refillsLeft}</p>
                  <p className="text-sm text-gray-500">Next refill: {med.nextRefill}</p>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline">
                      Request Refill
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderTestResults = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Test Results</h2>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
      </div>
      <div className="grid gap-4">
        {recentResults.map((result) => (
          <Card key={result.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{result.test}</h3>
                    <p className="text-gray-600">Ordered by {result.doctor}</p>
                    <p className="text-sm text-gray-500">{result.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="default">Available</Badge>
                  <Button size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">No messages yet</h3>
            <p className="text-gray-500">Start a conversation with your healthcare team</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Billing & Insurance</h2>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download Statements
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">$0.00</div>
            <p className="text-gray-600">Your account is current</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Insurance Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Provider:</span> Blue Cross Blue Shield
              </p>
              <p>
                <span className="font-semibold">Plan:</span> Premium Health Plan
              </p>
              <p>
                <span className="font-semibold">Member ID:</span> BC123456789
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input defaultValue="John Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <Input type="date" defaultValue="1985-06-15" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input defaultValue="+1 (555) 123-4567" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input defaultValue="john.smith@email.com" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact Name</label>
              <Input defaultValue="Jane Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Relationship</label>
              <Input defaultValue="Spouse" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input defaultValue="+1 (555) 987-6543" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )

  const renderJournal = () => {
    const handleJournalSubmit = () => {
      const entryData = {
        ...journalEntry,
        symptoms: selectedSymptoms,
      }
      console.log("Journal entry saved:", entryData)
      alert("Journal entry saved successfully!")

      // Reset form
      setJournalEntry({
        mood: "",
        painLevel: 0,
        hasMigraine: false,
        sleepQuality: "",
        stressLevel: 0,
        notes: "",
        date: new Date().toISOString().split("T")[0],
      })
      setSelectedSymptoms([])
    }

    const handleInputChange = (fieldName, fieldValue) => {
      setJournalEntry((prev) => ({
        ...prev,
        [fieldName]: fieldValue,
      }))
    }

    const toggleSymptom = (symptomId) => {
      setSelectedSymptoms((prev) =>
        prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId],
      )
    }

    const getMoodColor = (moodValue) => {
      const mood = moodOptions.find((m) => m.id === moodValue.toLowerCase())
      return mood ? mood.textColor + " " + mood.color.replace("bg-", "bg-opacity-20 bg-") : "text-gray-600 bg-gray-50"
    }

    const getPainLevelColor = (painLevel) => {
      if (painLevel <= 3) return "text-green-600"
      if (painLevel <= 6) return "text-yellow-600"
      return "text-red-600"
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Daily Journal</h2>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Entries
          </Button>
        </div>

        {/* Today's Entry Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="w-5 h-5 mr-2 text-blue-600" />
              Today's Entry - {new Date().toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mood Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">How are you feeling today?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => handleInputChange("mood", mood.id)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      journalEntry.mood === mood.id
                        ? `${mood.color} text-white border-transparent shadow-lg`
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <mood.icon
                      className={`w-8 h-8 mx-auto mb-2 ${
                        journalEntry.mood === mood.id ? "text-white" : mood.textColor
                      }`}
                    />
                    <div
                      className={`text-sm font-medium ${
                        journalEntry.mood === mood.id ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep Quality */}
            <div>
              <label className="block text-sm font-medium mb-3">How did you sleep?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sleepOptions.map((sleep) => (
                  <button
                    key={sleep.id}
                    onClick={() => handleInputChange("sleepQuality", sleep.id)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      journalEntry.sleepQuality === sleep.id
                        ? `${sleep.color} text-white border-transparent shadow-lg`
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <sleep.icon
                      className={`w-6 h-6 mx-auto mb-2 ${
                        journalEntry.sleepQuality === sleep.id ? "text-white" : "text-gray-600"
                      }`}
                    />
                    <div
                      className={`text-sm font-medium ${
                        journalEntry.sleepQuality === sleep.id ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {sleep.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pain and Stress Levels */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Pain Level (0-10)</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={journalEntry.painLevel}
                    onChange={(e) => handleInputChange("painLevel", Number.parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className={`font-semibold text-lg ${getPainLevelColor(journalEntry.painLevel)}`}>
                    {journalEntry.painLevel}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stress Level (0-10)</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={journalEntry.stressLevel}
                    onChange={(e) => handleInputChange("stressLevel", Number.parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className={`font-semibold text-lg ${getPainLevelColor(journalEntry.stressLevel)}`}>
                    {journalEntry.stressLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium mb-3">Any symptoms today?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {symptomOptions.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedSymptoms.includes(symptom.id)
                        ? `${symptom.color} border-transparent shadow-md`
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <symptom.icon className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs font-medium">{symptom.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Migraine Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="migraine"
                checked={journalEntry.hasMigraine}
                onChange={(e) => handleInputChange("hasMigraine", e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="migraine" className="text-sm font-medium">
                I experienced a migraine today
              </label>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows={4}
                placeholder="How was your day? Any thoughts or observations..."
                value={journalEntry.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setJournalEntry({
                    mood: "",
                    painLevel: 0,
                    hasMigraine: false,
                    sleepQuality: "",
                    stressLevel: 0,
                    notes: "",
                    date: new Date().toISOString().split("T")[0],
                  })
                  setSelectedSymptoms([])
                }}
              >
                Clear
              </Button>
              <Button onClick={handleJournalSubmit}>
                <Book className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Previous Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Previous Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Book className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{entry.date}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className={`px-2 py-1 rounded ${getMoodColor(entry.mood)}`}>{entry.mood}</span>
                          <span className="text-gray-600">Pain: {entry.painLevel}/10</span>
                          <span className="text-gray-600">Stress: {entry.stressLevel}/10</span>
                          {entry.hasMigraine && <Badge variant="destructive">Migraine</Badge>}
                        </div>
                        {entry.symptoms && entry.symptoms.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {entry.symptoms.map((symptom) => (
                              <Badge key={symptom} variant="outline" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">{entry.notes}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "appointments":
        return renderAppointments();
      case "medications":
        return renderMedications();
      case "test-results":
        return renderTestResults();
      case "messages":
        return renderMessages();
      case "billing":
        return renderBilling();
      case "profile":
        return renderProfile();
      case "breathing-activity":
        return renderBreathingActivity();
      case "journal":
        return renderJournal();
      default:
        return renderDashboard();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-800">LifeAxis Patient Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="p-4">
            <ul className="space-y-0.5">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
