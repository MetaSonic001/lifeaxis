
"use client";

import { useState, useEffect } from "react";
import {
  Pill,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Bell,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export default function MedicationsPage() {
  const [medications, setMedications] = useState([]);
  const [adherenceData, setAdherenceData] = useState({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    timeSlots: [],
    prescribedBy: "",
    startDate: "",
    endDate: "",
    instructions: "",
    refillsLeft: 0,
  });

  useEffect(() => {
    // Load medications from localStorage
    const storedMedications = JSON.parse(localStorage.getItem("medications") || "[]");
    const storedAdherence = JSON.parse(localStorage.getItem("medication_adherence") || "{}");
    
    if (storedMedications.length === 0) {
      // Initialize with sample data
      const sampleMedications = [
        {
          id: 1,
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          timeSlots: ["08:00"],
          prescribedBy: "Dr. Sarah Johnson",
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          instructions: "Take with food",
          refillsLeft: 2,
          status: "active",
        },
        {
          id: 2,
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          timeSlots: ["08:00", "20:00"],
          prescribedBy: "Dr. Michael Chen",
          startDate: "2025-01-15",
          endDate: "2025-12-31",
          instructions: "Take with meals",
          refillsLeft: 0,
          status: "active",
        },
      ];
      setMedications(sampleMedications);
      localStorage.setItem("medications", JSON.stringify(sampleMedications));
    } else {
      setMedications(storedMedications);
    }
    
    setAdherenceData(storedAdherence);
  }, []);

  const addMedication = () => {
    const medication = {
      ...newMedication,
      id: Date.now(),
      status: "active",
    };
    
    const updatedMedications = [...medications, medication];
    setMedications(updatedMedications);
    localStorage.setItem("medications", JSON.stringify(updatedMedications));
    
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "",
      timeSlots: [],
      prescribedBy: "",
      startDate: "",
      endDate: "",
      instructions: "",
      refillsLeft: 0,
    });
    setShowAddDialog(false);
  };

  const markAsTaken = (medicationId, timeSlot) => {
    const today = new Date().toISOString().split("T")[0];
    const key = `${medicationId}_${today}_${timeSlot}`;
    
    const updatedAdherence = {
      ...adherenceData,
      [key]: true,
    };
    
    setAdherenceData(updatedAdherence);
    localStorage.setItem("medication_adherence", JSON.stringify(updatedAdherence));
  };

  const calculateAdherenceRate = (medication) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });

    const totalDoses = last7Days.length * medication.timeSlots.length;
    const takenDoses = last7Days.reduce((count, date) => {
      return count + medication.timeSlots.filter(slot => {
        const key = `${medication.id}_${date}_${slot}`;
        return adherenceData[key];
      }).length;
    }, 0);

    return Math.round((takenDoses / totalDoses) * 100);
  };

  const getTodaysDoses = (medication) => {
    const today = new Date().toISOString().split("T")[0];
    return medication.timeSlots.map(slot => {
      const key = `${medication.id}_${today}_${slot}`;
      return {
        time: slot,
        taken: adherenceData[key] || false,
      };
    });
  };

  const getStatusColor = (refillsLeft) => {
    if (refillsLeft === 0) return "bg-red-100 text-red-800";
    if (refillsLeft <= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Pill className="w-8 h-8 mr-3 text-purple-600" />
            Medications
          </h1>
          <p className="text-gray-600 mt-2">Manage your medications and track adherence</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2">Medication Name</label>
                <Input
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  placeholder="e.g., Lisinopril"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Dosage</label>
                <Input
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                  placeholder="e.g., 10mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <Input
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                  placeholder="e.g., Once daily"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Prescribed By</label>
                <Input
                  value={newMedication.prescribedBy}
                  onChange={(e) => setNewMedication({ ...newMedication, prescribedBy: e.target.value })}
                  placeholder="e.g., Dr. Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="date"
                  value={newMedication.startDate}
                  onChange={(e) => setNewMedication({ ...newMedication, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Refills Left</label>
                <Input
                  type="number"
                  value={newMedication.refillsLeft}
                  onChange={(e) => setNewMedication({ ...newMedication, refillsLeft: parseInt(e.target.value) })}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Instructions</label>
                <Textarea
                  value={newMedication.instructions}
                  onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                  placeholder="Special instructions..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={addMedication}>Add Medication</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Today's Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Today's Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((medication) => {
              const todaysDoses = getTodaysDoses(medication);
              return (
                <div key={medication.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{medication.name}</h3>
                      <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
                    </div>
                    <Badge className={getStatusColor(medication.refillsLeft)}>
                      {medication.refillsLeft} refills left
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {todaysDoses.map((dose, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          dose.taken
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{dose.time}</div>
                            <div className="text-sm text-gray-600">
                              {dose.taken ? "Taken" : "Pending"}
                            </div>
                          </div>
                          {dose.taken ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => markAsTaken(medication.id, dose.time)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Mark Taken
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Medication List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            All Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((medication) => {
              const adherenceRate = calculateAdherenceRate(medication);
              return (
                <div key={medication.id} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Pill className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{medication.name}</h3>
                        <p className="text-gray-600">
                          {medication.dosage} - {medication.frequency}
                        </p>
                        <p className="text-sm text-gray-500">Prescribed by {medication.prescribedBy}</p>
                        {medication.instructions && (
                          <p className="text-sm text-blue-600 italic">{medication.instructions}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">7-day adherence:</span>
                        <Badge variant="outline" className="text-sm">
                          {adherenceRate}%
                        </Badge>
                      </div>
                      <Progress value={adherenceRate} className="w-24 h-2" />
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Bell className="w-4 h-4 mr-1" />
                          Reminders
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Refill Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Refill Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {medications.filter(med => med.refillsLeft <= 2).map((medication) => (
              <div key={medication.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Pill className="w-5 h-5 text-orange-600" />
                  <div>
                    <span className="font-medium">{medication.name}</span>
                    <p className="text-sm text-gray-600">
                      {medication.refillsLeft === 0 ? "No refills remaining" : `${medication.refillsLeft} refills left`}
                    </p>
                  </div>
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Request Refill
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
