
"use client";

import { useState, useEffect } from "react";
import {
  Video,
  Phone,
  Calendar,
  Clock,
  User,
  MessageCircle,
  FileText,
  Camera,
  Mic,
  MicOff,
  VideoOff,
  PhoneCall,
  Settings,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TelemedicinePage() {
  const [activeCall, setActiveCall] = useState(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Load telemedicine data
    const loadData = () => {
      const storedAppointments = JSON.parse(localStorage.getItem("telemedicine_appointments") || "[]");
      const storedMessages = JSON.parse(localStorage.getItem("telemedicine_messages") || "[]");

      setAppointments(storedAppointments);
      setChatMessages(storedMessages);
    };

    loadData();
  }, []);

  const upcomingTeleAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2025-07-02",
      time: "10:30 AM",
      type: "Video Consultation",
      status: "scheduled",
      meetingLink: "https://meet.example.com/cardio-123"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Practice",
      date: "2025-07-05",
      time: "2:00 PM",
      type: "Phone Consultation",
      status: "confirmed",
      phoneNumber: "+1-555-DOCTOR"
    },
  ];

  const startVideoCall = (appointment) => {
    setActiveCall(appointment);
  };

  const endCall = () => {
    setActiveCall(null);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: "patient",
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      
      const updatedMessages = [...chatMessages, message];
      setChatMessages(updatedMessages);
      localStorage.setItem("telemedicine_messages", JSON.stringify(updatedMessages));
      setNewMessage("");
    }
  };

  if (activeCall) {
    return (
      <div className="h-screen bg-gray-900 text-white relative">
        {/* Video Call Interface */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-20 h-20 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{activeCall.doctor}</h2>
            <p className="text-gray-300 mb-4">{activeCall.specialty}</p>
            <Badge className="bg-green-600">Connected</Badge>
          </div>
        </div>

        {/* Call Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4 bg-gray-800 rounded-full p-4">
            <Button
              variant={micEnabled ? "default" : "destructive"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setMicEnabled(!micEnabled)}
            >
              {micEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </Button>
            
            <Button
              variant={videoEnabled ? "default" : "destructive"}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? <Camera className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>

            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={endCall}
            >
              <PhoneCall className="w-6 h-6" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14"
            >
              <Share2 className="w-6 h-6" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14"
            >
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Call Info */}
        <div className="absolute top-8 left-8">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-300">Duration: 00:05:23</p>
            <p className="text-sm text-gray-300">Quality: HD</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
          <Video className="w-8 h-8 mr-3 text-blue-600" />
          Telemedicine Portal
        </h1>
        <p className="text-gray-600">Connect with your healthcare providers remotely</p>
      </div>

      <Tabs defaultValue="appointments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="consultation">Quick Consultation</TabsTrigger>
          <TabsTrigger value="messages">Secure Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Upcoming Telemedicine Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTeleAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          {appointment.type === "Video Consultation" ? (
                            <Video className="w-8 h-8 text-blue-600" />
                          ) : (
                            <Phone className="w-8 h-8 text-green-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                          <p className="text-gray-600">{appointment.specialty}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {appointment.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                        <Button 
                          onClick={() => startVideoCall(appointment)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {appointment.type === "Video Consultation" ? (
                            <>
                              <Video className="w-4 h-4 mr-2" />
                              Join Call
                            </>
                          ) : (
                            <>
                              <Phone className="w-4 h-4 mr-2" />
                              Call Now
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule New Telemedicine Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Doctor</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Dr. Sarah Johnson - Cardiology</option>
                      <option>Dr. Michael Chen - General Practice</option>
                      <option>Dr. Emily Davis - Dermatology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Appointment Type</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Video Consultation</option>
                      <option>Phone Consultation</option>
                      <option>Chat Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date & Time</label>
                    <Input type="datetime-local" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Reason for Visit</label>
                    <Textarea 
                      placeholder="Please describe the reason for your appointment..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                Quick Consultation Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Available Now</h3>
                  <p className="text-blue-700 text-sm">
                    Connect with an available healthcare provider for urgent, non-emergency questions.
                    Response time: 15-30 minutes.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Consultation Type</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>General Health Question</option>
                        <option>Medication Question</option>
                        <option>Symptom Assessment</option>
                        <option>Mental Health Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Urgency Level</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>Low - General question</option>
                        <option>Medium - Concerned about symptoms</option>
                        <option>High - Urgent but not emergency</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Question</label>
                      <Textarea 
                        placeholder="Please describe your question or concern in detail..."
                        rows={6}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat Consultation
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Request Phone Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
                Secure Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-gray-50">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No messages yet. Start a secure conversation with your healthcare team.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === "patient"
                                ? "bg-blue-600 text-white"
                                : "bg-white border"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-75 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your secure message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button onClick={sendMessage}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
