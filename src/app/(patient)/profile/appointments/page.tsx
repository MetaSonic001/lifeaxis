
"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Video,
  Phone,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    type: "In-person",
    location: "",
    reason: "",
    notes: "",
  });

  useEffect(() => {
    // Load appointments from localStorage
    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    
    if (storedAppointments.length === 0) {
      // Initialize with sample data
      const sampleAppointments = [
        {
          id: 1,
          doctor: "Dr. Sarah Johnson",
          specialty: "Cardiology",
          date: "2025-07-02",
          time: "10:30 AM",
          type: "In-person",
          location: "Heart Care Center, Room 203",
          status: "confirmed",
          reason: "Regular checkup",
          notes: "Bring recent lab results",
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
          reason: "Follow-up consultation",
          notes: "Discuss medication side effects",
        },
        {
          id: 3,
          doctor: "Dr. Emily Davis",
          specialty: "Dermatology",
          date: "2025-07-08",
          time: "11:00 AM",
          type: "In-person",
          location: "Skin Care Clinic, Suite 105",
          status: "confirmed",
          reason: "Skin examination",
          notes: "Annual skin cancer screening",
        },
      ];
      setAppointments(sampleAppointments);
      localStorage.setItem("appointments", JSON.stringify(sampleAppointments));
    } else {
      setAppointments(storedAppointments);
    }
  }, []);

  const addAppointment = () => {
    const appointment = {
      ...newAppointment,
      id: Date.now(),
      status: "pending",
    };
    
    const updatedAppointments = [...appointments, appointment];
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    
    setNewAppointment({
      doctor: "",
      specialty: "",
      date: "",
      time: "",
      type: "In-person",
      location: "",
      reason: "",
      notes: "",
    });
    setShowAddDialog(false);
  };

  const deleteAppointment = (id) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-blue-600" />
            Appointments
          </h1>
          <p className="text-gray-600 mt-2">Manage your healthcare appointments</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2">Doctor</label>
                <Input
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  placeholder="Dr. John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Specialty</label>
                <Input
                  value={newAppointment.specialty}
                  onChange={(e) => setNewAppointment({ ...newAppointment, specialty: e.target.value })}
                  placeholder="Cardiology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <Input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                >
                  <option value="In-person">In-person</option>
                  <option value="Video Call">Video Call</option>
                  <option value="Phone Call">Phone Call</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  placeholder="Room 203 or Virtual"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Reason for Visit</label>
                <Textarea
                  value={newAppointment.reason}
                  onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                  placeholder="Regular checkup, follow-up, etc."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Notes</label>
                <Textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  placeholder="Any special instructions or notes"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={addAppointment}>Schedule Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search appointments..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">No appointment found</h3>
              <p className="text-gray-500">Schedule your first appointment to get started</p>
            </CardContent>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      {appointment.type === "Video Call" ? (
                        <Video className="w-8 h-8 text-blue-600" />
                      ) : appointment.type === "Phone Call" ? (
                        <Phone className="w-8 h-8 text-green-600" />
                      ) : (
                        <User className="w-8 h-8 text-blue-600" />
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
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {appointment.location}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Bell className="w-4 h-4 mr-1" />
                      Remind
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteAppointment(appointment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
