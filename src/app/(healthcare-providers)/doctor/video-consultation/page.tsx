"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Settings, Save, Clock, User, FileText } from "lucide-react"

export default function VideoConsultationPage() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [casePaper, setCasePaper] = useState("")
  const [isSavingCase, setIsSavingCase] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected")

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartCall = async () => {
    setIsConnecting(true)
    setConnectionStatus("connecting")

    try {
      // Simulate connection process
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setIsCallActive(true)
      setConnectionStatus("connected")
      setCallDuration(0)
      console.log("Video call started successfully")
    } catch (error) {
      console.error("Error starting call:", error)
      setConnectionStatus("disconnected")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleEndCall = async () => {
    setIsCallActive(false)
    setConnectionStatus("disconnected")
    setCallDuration(0)
    console.log("Video call ended")
  }

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    console.log(`Video ${!isVideoOn ? "enabled" : "disabled"}`)
  }

  const handleToggleMic = () => {
    setIsMicOn(!isMicOn)
    console.log(`Microphone ${!isMicOn ? "enabled" : "disabled"}`)
  }

  const handleSaveCase = async () => {
    if (!casePaper.trim()) {
      alert("Please enter case details before saving")
      return
    }

    setIsSavingCase(true)
    try {
      // Simulate saving case paper
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Case paper saved successfully")
      alert("Case paper saved successfully!")
    } catch (error) {
      console.error("Error saving case paper:", error)
      alert("Error saving case paper. Please try again.")
    } finally {
      setIsSavingCase(false)
    }
  }

  const handleSettings = () => {
    console.log("Opening video call settings")
    // Open settings modal or navigate to settings
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Video Consultation
        </h1>
        <p className="text-slate-600">Connect with patients through secure video calls</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video Call Interface */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-700 flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>Video Call</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {connectionStatus === "connected" && (
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {formatDuration(callDuration)}</span>
                      </div>
                    )}
                  </CardDescription>
                </div>
                <Badge
                  className={
                    connectionStatus === "connected"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : connectionStatus === "connecting"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                  }
                >
                  {connectionStatus === "connected"
                    ? "Connected"
                    : connectionStatus === "connecting"
                      ? "Connecting..."
                      : "Disconnected"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Video Display Area */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg aspect-video mb-6 flex items-center justify-center">
                {isCallActive ? (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-slate-600">Patient Video Feed</p>
                    <p className="text-sm text-slate-500">Call in progress...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Video className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">No active video call</p>
                  </div>
                )}
              </div>

              {/* Call Controls */}
              <div className="flex items-center justify-center space-x-4">
                {!isCallActive ? (
                  <Button
                    onClick={handleStartCall}
                    disabled={isConnecting}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {isConnecting ? "Connecting..." : "Start Call"}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleToggleVideo}
                      variant={isVideoOn ? "default" : "destructive"}
                      className={
                        isVideoOn
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                          : ""
                      }
                    >
                      {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>

                    <Button
                      onClick={handleToggleMic}
                      variant={isMicOn ? "default" : "destructive"}
                      className={
                        isMicOn
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                          : ""
                      }
                    >
                      {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>

                    <Button
                      onClick={handleSettings}
                      variant="outline"
                      className="border-slate-200 hover:bg-slate-50 bg-transparent"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>

                    <Button onClick={handleEndCall} variant="destructive">
                      <PhoneOff className="w-4 h-4 mr-2" />
                      End Call
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Case Documentation */}
        <div>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
              <CardTitle className="text-slate-700 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Case Documentation</span>
              </CardTitle>
              <CardDescription className="text-slate-600">Document consultation details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="casePaper" className="text-slate-700 font-medium">
                    Case Paper
                  </Label>
                  <Textarea
                    id="casePaper"
                    placeholder="Enter consultation notes, diagnosis, treatment plan, and follow-up instructions..."
                    value={casePaper}
                    onChange={(e) => setCasePaper(e.target.value)}
                    className="mt-2 min-h-[200px] border-slate-200 focus:border-purple-400 resize-none"
                    rows={8}
                  />
                </div>

                <Button
                  onClick={handleSaveCase}
                  disabled={isSavingCase || !casePaper.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSavingCase ? "Saving..." : "Save Case Paper"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Patient Information */}
      <Card className="mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
          <CardTitle className="text-slate-700">Current Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-indigo-100"
              >
                Patient Details
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-indigo-100"
              >
                Medical History
              </TabsTrigger>
              <TabsTrigger
                value="vitals"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-indigo-100"
              >
                Vitals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Name:</span>
                      <span className="text-slate-700">John Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Age:</span>
                      <span className="text-slate-700">45 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gender:</span>
                      <span className="text-slate-700">Male</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Contact:</span>
                      <span className="text-slate-700">+1 234 567 8900</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Appointment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <span className="text-slate-700">Follow-up</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Duration:</span>
                      <span className="text-slate-700">30 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status:</span>
                      <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <h5 className="font-medium text-slate-700">Previous Conditions</h5>
                  <p className="text-sm text-slate-600 mt-1">Hypertension, Type 2 Diabetes</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <h5 className="font-medium text-slate-700">Current Medications</h5>
                  <p className="text-sm text-slate-600 mt-1">Metformin 500mg, Lisinopril 10mg</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <h5 className="font-medium text-slate-700">Allergies</h5>
                  <p className="text-sm text-slate-600 mt-1">Penicillin, Shellfish</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vitals">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Blood Pressure:</span>
                    <span className="font-medium text-slate-700">120/80 mmHg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Heart Rate:</span>
                    <span className="font-medium text-slate-700">72 bpm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Temperature:</span>
                    <span className="font-medium text-slate-700">98.6°F</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Weight:</span>
                    <span className="font-medium text-slate-700">180 lbs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Height:</span>
                    <span className="font-medium text-slate-700">5'10"</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">BMI:</span>
                    <span className="font-medium text-slate-700">25.8</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
