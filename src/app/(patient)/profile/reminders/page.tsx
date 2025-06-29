
"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  Bell,
  Plus,
  Edit,
  Trash2,
  Check,
  AlertTriangle,
  Pill,
  Calendar,
  Volume2,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newReminder, setNewReminder] = useState({
    medicationName: "",
    dosage: "",
    frequency: "daily",
    times: ["08:00"],
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    notes: "",
    isActive: true,
  });

  useEffect(() => {
    // Initialize with sample reminders
    const sampleReminders = [
      {
        id: 1,
        medicationName: "Lisinopril",
        dosage: "10mg",
        frequency: "daily",
        times: ["08:00"],
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        notes: "Take with food",
        isActive: true,
        lastTaken: null,
        streak: 25,
      },
      {
        id: 2,
        medicationName: "Metformin",
        dosage: "500mg",
        frequency: "twice-daily",
        times: ["08:00", "20:00"],
        startDate: "2025-01-15",
        endDate: "2025-12-31",
        notes: "Take with meals",
        isActive: true,
        lastTaken: "2025-06-28 08:00",
        streak: 15,
      },
      {
        id: 3,
        medicationName: "Vitamin D",
        dosage: "2000 IU",
        frequency: "daily",
        times: ["08:00"],
        startDate: "2025-06-01",
        endDate: "",
        notes: "Take with breakfast",
        isActive: true,
        lastTaken: null,
        streak: 0,
      },
    ];
    
    setReminders(sampleReminders);
  }, []);

  const addReminder = () => {
    const reminder = {
      ...newReminder,
      id: Date.now(),
      lastTaken: null,
      streak: 0,
    };
    
    setReminders([...reminders, reminder]);
    setNewReminder({
      medicationName: "",
      dosage: "",
      frequency: "daily",
      times: ["08:00"],
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      notes: "",
      isActive: true,
    });
    setShowAddDialog(false);
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    ));
  };

  const markAsTaken = (id, time) => {
    const now = new Date();
    const timeString = `${now.toISOString().split("T")[0]} ${time}`;
    
    setReminders(reminders.map(reminder =>
      reminder.id === id 
        ? { 
            ...reminder, 
            lastTaken: timeString,
            streak: reminder.streak + 1
          } 
        : reminder
    ));
  };

  const updateFrequency = (frequency) => {
    let times = ["08:00"];
    
    switch (frequency) {
      case "twice-daily":
        times = ["08:00", "20:00"];
        break;
      case "three-times":
        times = ["08:00", "14:00", "20:00"];
        break;
      case "four-times":
        times = ["06:00", "12:00", "18:00", "22:00"];
        break;
      case "weekly":
        times = ["08:00"];
        break;
      default:
        times = ["08:00"];
    }
    
    setNewReminder({ ...newReminder, frequency, times });
  };

  const addTimeSlot = () => {
    setNewReminder({
      ...newReminder,
      times: [...newReminder.times, "12:00"]
    });
  };

  const removeTimeSlot = (index) => {
    setNewReminder({
      ...newReminder,
      times: newReminder.times.filter((_, i) => i !== index)
    });
  };

  const updateTimeSlot = (index, time) => {
    const updatedTimes = [...newReminder.times];
    updatedTimes[index] = time;
    setNewReminder({ ...newReminder, times: updatedTimes });
  };

  const getTodaysReminders = () => {
    const today = new Date().toISOString().split("T")[0];
    const todaysReminders = [];
    
    reminders.forEach(reminder => {
      if (reminder.isActive) {
        reminder.times.forEach(time => {
          const reminderTime = new Date(`${today} ${time}`);
          const now = new Date();
          const isOverdue = reminderTime < now;
          const isTaken = reminder.lastTaken && 
            reminder.lastTaken.includes(today) && 
            reminder.lastTaken.includes(time);
          
          todaysReminders.push({
            ...reminder,
            scheduledTime: time,
            isOverdue,
            isTaken,
            reminderDateTime: reminderTime,
          });
        });
      }
    });
    
    return todaysReminders.sort((a, b) => a.reminderDateTime - b.reminderDateTime);
  };

  const getStreakColor = (streak) => {
    if (streak >= 30) return "text-green-600";
    if (streak >= 14) return "text-blue-600";
    if (streak >= 7) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Bell className="w-8 h-8 mr-3 text-blue-600" />
            Medication Reminders
          </h1>
          <p className="text-gray-600 mt-2">Set up and manage your medication reminders</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Medication Reminder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Medication Name</label>
                  <Input
                    value={newReminder.medicationName}
                    onChange={(e) => setNewReminder({ ...newReminder, medicationName: e.target.value })}
                    placeholder="e.g., Lisinopril"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dosage</label>
                  <Input
                    value={newReminder.dosage}
                    onChange={(e) => setNewReminder({ ...newReminder, dosage: e.target.value })}
                    placeholder="e.g., 10mg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Frequency</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newReminder.frequency}
                  onChange={(e) => updateFrequency(e.target.value)}
                >
                  <option value="daily">Once daily</option>
                  <option value="twice-daily">Twice daily</option>
                  <option value="three-times">Three times daily</option>
                  <option value="four-times">Four times daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Reminder Times</label>
                <div className="space-y-2">
                  {newReminder.times.map((time, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => updateTimeSlot(index, e.target.value)}
                      />
                      {newReminder.times.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeTimeSlot(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {newReminder.frequency === "custom" && (
                    <Button size="sm" variant="outline" onClick={addTimeSlot}>
                      Add Time
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={newReminder.startDate}
                    onChange={(e) => setNewReminder({ ...newReminder, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date (Optional)</label>
                  <Input
                    type="date"
                    value={newReminder.endDate}
                    onChange={(e) => setNewReminder({ ...newReminder, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <Input
                  value={newReminder.notes}
                  onChange={(e) => setNewReminder({ ...newReminder, notes: e.target.value })}
                  placeholder="e.g., Take with food"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={addReminder}>Create Reminder</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Today's Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Today's Medication Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getTodaysReminders().length === 0 ? (
              <div className="text-center py-8">
                <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No medications scheduled for today</p>
              </div>
            ) : (
              getTodaysReminders().map((reminder, index) => (
                <div
                  key={`${reminder.id}-${reminder.scheduledTime}`}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    reminder.isTaken
                      ? "bg-green-50 border-green-200"
                      : reminder.isOverdue
                        ? "bg-red-50 border-red-200"
                        : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      reminder.isTaken
                        ? "bg-green-100"
                        : reminder.isOverdue
                          ? "bg-red-100"
                          : "bg-blue-100"
                    }`}>
                      {reminder.isTaken ? (
                        <Check className="w-6 h-6 text-green-600" />
                      ) : reminder.isOverdue ? (
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      ) : (
                        <Pill className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {reminder.medicationName} - {reminder.dosage}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Scheduled for {reminder.scheduledTime}
                      </p>
                      {reminder.notes && (
                        <p className="text-sm text-gray-500 italic">{reminder.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {reminder.isTaken ? (
                      <Badge className="bg-green-100 text-green-800">Taken</Badge>
                    ) : reminder.isOverdue ? (
                      <Badge className="bg-red-100 text-red-800">Overdue</Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
                    )}
                    {!reminder.isTaken && (
                      <Button
                        size="sm"
                        onClick={() => markAsTaken(reminder.id, reminder.scheduledTime)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Mark Taken
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>All Medication Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className={`${!reminder.isActive ? "opacity-60" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Pill className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {reminder.medicationName} - {reminder.dosage}
                        </h3>
                        <p className="text-gray-600 capitalize">
                          {reminder.frequency.replace("-", " ")} at {reminder.times.join(", ")}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Since {reminder.startDate}
                          </div>
                          <div className={`flex items-center ${getStreakColor(reminder.streak)}`}>
                            <span className="font-semibold">{reminder.streak} day streak</span>
                          </div>
                        </div>
                        {reminder.notes && (
                          <p className="text-sm text-gray-500 italic mt-1">{reminder.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={reminder.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {reminder.isActive ? "Active" : "Paused"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleReminder(reminder.id)}
                      >
                        {reminder.isActive ? "Pause" : "Resume"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-purple-600" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Reminder Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span>Push Notifications</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-green-600" />
                    <span>Sound Alerts</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-purple-600" />
                    <span>Email Reminders</span>
                  </div>
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Reminder Timing</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Remind me before</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="0">At the scheduled time</option>
                    <option value="5">5 minutes before</option>
                    <option value="15">15 minutes before</option>
                    <option value="30">30 minutes before</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Snooze duration</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
