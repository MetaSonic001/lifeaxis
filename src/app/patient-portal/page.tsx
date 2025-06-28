"use client";
import React, { useState } from 'react';
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
  Plus,
  Eye,
  Edit,
  Trash2,
  Video,
  Search,
  Filter,
  Activity,
  Thermometer,
  Weight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Practice",
      date: "2025-07-05",
      time: "2:00 PM",
      type: "Video Call",
      location: "Virtual Consultation",
      status: "pending"
    }
  ];

  const recentResults = [
    {
      id: 1,
      test: "Blood Panel",
      date: "2025-06-25",
      status: "Available",
      doctor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      test: "Chest X-Ray",
      date: "2025-06-20",
      status: "Available",
      doctor: "Dr. Michael Chen"
    }
  ];

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Johnson",
      refillsLeft: 2,
      nextRefill: "2025-07-15"
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Michael Chen",
      refillsLeft: 0,
      nextRefill: "Contact doctor"
    }
  ];

  const vitals = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", icon: Heart },
    { label: "Heart Rate", value: "72", unit: "bpm", status: "normal", icon: Activity },
    { label: "Temperature", value: "98.6", unit: "°F", status: "normal", icon: Thermometer },
    { label: "Weight", value: "165", unit: "lbs", status: "normal", icon: Weight }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'medical-records', label: 'Medical Records', icon: FileText },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'test-results', label: 'Test Results', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User }
  ];

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
                    <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={apt.type === 'Video Call' ? 'secondary' : 'default'}>
                    {apt.type === 'Video Call' ? <Video className="w-3 h-3 mr-1" /> : <MapPin className="w-3 h-3 mr-1" />}
                    {apt.type}
                  </Badge>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
                        {apt.type === 'Video Call' ? <Video className="w-4 h-4 mr-1" /> : <MapPin className="w-4 h-4 mr-1" />}
                        {apt.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={apt.status === 'confirmed' ? 'default' : 'secondary'}>
                    {apt.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    {apt.type === 'Video Call' ? 'Join Call' : 'View Details'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

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
                    <p className="text-gray-600">{med.dosage} - {med.frequency}</p>
                    <p className="text-sm text-gray-500">Prescribed by {med.prescribedBy}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Refills left: {med.refillsLeft}</p>
                  <p className="text-sm text-gray-500">Next refill: {med.nextRefill}</p>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline">Request Refill</Button>
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
  );

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
  );

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
  );

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
              <p><span className="font-semibold">Provider:</span> Blue Cross Blue Shield</p>
              <p><span className="font-semibold">Plan:</span> Premium Health Plan</p>
              <p><span className="font-semibold">Member ID:</span> BC123456789</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

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
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'appointments': return renderAppointments();
      case 'medications': return renderMedications();
      case 'test-results': return renderTestResults();
      case 'messages': return renderMessages();
      case 'billing': return renderBilling();
      case 'profile': return renderProfile();
      default: return renderDashboard();
    }
  };

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
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
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
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
