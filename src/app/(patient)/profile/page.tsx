
"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  User,
  Heart,
  Pill,
  MessageCircle,
  Activity,
  Thermometer,
  Weight,
  Plus,
  Video,
  MapPin,
  Eye,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function PatientDashboard() {
  const [healthScore, setHealthScore] = useState(85);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentVitals, setRecentVitals] = useState([]);
  const [todayMedications, setTodayMedications] = useState([]);

  useEffect(() => {
    // Load data from localStorage or API
    const loadDashboardData = () => {
      const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      const vitals = JSON.parse(localStorage.getItem("vitals") || "[]");
      const medications = JSON.parse(localStorage.getItem("medications") || "[]");

      setUpcomingAppointments(appointments.slice(0, 3));
      setRecentVitals(vitals.slice(0, 4));
      setTodayMedications(medications.filter(med => med.dueToday));
    };

    loadDashboardData();
  }, []);

  const vitalsData = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", icon: Heart, color: "text-green-600" },
    { label: "Heart Rate", value: "72", unit: "bpm", status: "normal", icon: Activity, color: "text-green-600" },
    { label: "Temperature", value: "98.6", unit: "°F", status: "normal", icon: Thermometer, color: "text-green-600" },
    { label: "Weight", value: "165", unit: "lbs", status: "normal", icon: Weight, color: "text-green-600" },
  ];

  const quickActions = [
    { label: "Schedule Appointment", href: "/profile/appointments", icon: Calendar, color: "bg-blue-500" },
    { label: "Check Symptoms", href: "/profile/symptom-checker", icon: Activity, color: "bg-purple-500" },
    { label: "Message Doctor", href: "/profile/messages", icon: MessageCircle, color: "bg-green-500" },
    { label: "View Test Results", href: "/profile/test-results", icon: FileText, color: "bg-orange-500" },
  ];

  const healthMetrics = [
    { label: "Medication Adherence", value: 92, color: "bg-green-500" },
    { label: "Exercise Goals", value: 68, color: "bg-blue-500" },
    { label: "Sleep Quality", value: 78, color: "bg-purple-500" },
    { label: "Stress Management", value: 85, color: "bg-teal-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, John!</h2>
            <p className="text-blue-100 text-sm sm:text-base">Here's your health overview for {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{healthScore}</div>
            <div className="text-sm text-blue-200">Health Score</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="p-4 rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-md cursor-pointer group">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900">{action.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            Health Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  <span className="text-sm font-bold text-gray-900">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Next Appointment</p>
                <p className="text-xl font-bold text-green-700">2 days</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Test Results</p>
                <p className="text-xl font-bold text-blue-700">2 new</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Medications</p>
                <p className="text-xl font-bold text-purple-700">3 today</p>
              </div>
              <Pill className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Messages</p>
                <p className="text-xl font-bold text-orange-700">1 unread</p>
              </div>
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Vitals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Recent Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {vitalsData.map((vital, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg border hover:shadow-sm transition-shadow">
                <vital.icon className={`w-8 h-8 mx-auto mb-2 ${vital.color}`} />
                <p className="text-sm text-gray-600 font-medium">{vital.label}</p>
                <p className="text-xl font-bold text-gray-900">{vital.value}</p>
                <p className="text-xs text-gray-500">{vital.unit}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  Normal
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Upcoming Appointments
          </CardTitle>
          <Link href="/profile/appointments">
            <Button size="sm" variant="outline">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((apt) => (
              <div key={apt} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dr. Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Cardiology</p>
                    <p className="text-sm text-gray-500">July 2, 2025 at 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="default">
                    <MapPin className="w-3 h-3 mr-1" />
                    In-person
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Health Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <Pill className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Take morning medication</span>
              </div>
              <Badge variant="secondary">Due now</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Complete daily exercise</span>
              </div>
              <Badge variant="outline">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
