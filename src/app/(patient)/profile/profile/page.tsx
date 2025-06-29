
"use client";

import { useState, useEffect } from "react";
import {
  User,
  Edit,
  Save,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Lock,
  Heart,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    address: {
      street: "123 Main Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
    },
    emergencyContact: {
      name: "Jane Smith",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    medicalInfo: {
      bloodType: "A+",
      allergies: ["Penicillin", "Shellfish"],
      chronicConditions: ["Hypertension"],
      currentMedications: ["Lisinopril 10mg"],
    },
    preferences: {
      language: "English",
      timezone: "Central Time",
      notifications: {
        email: true,
        sms: true,
        appointments: true,
        medications: true,
        testResults: true,
      },
    },
  });

  const handleSave = () => {
    // Save profile data to localStorage
    localStorage.setItem("patient_profile", JSON.stringify(profile));
    setIsEditing(false);
    console.log("Profile saved:", profile);
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (section, field, index, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item, i) => i === index ? value : item)
      }
    }));
  };

  const addArrayItem = (section, field) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], ""]
      }
    }));
  };

  const removeArrayItem = (section, field, index) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }));
  };

  useEffect(() => {
    // Load profile from localStorage if available
    const savedProfile = localStorage.getItem("patient_profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <User className="w-8 h-8 mr-3 text-blue-600" />
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="medical">Medical Info</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-blue-600" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-gray-600">{profile.email}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Born {profile.dateOfBirth}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {profile.gender}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <Input
                    value={profile.firstName}
                    onChange={(e) => handleInputChange(null, "firstName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <Input
                    value={profile.lastName}
                    onChange={(e) => handleInputChange(null, "lastName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange(null, "email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange(null, "phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <Input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleInputChange(null, "dateOfBirth", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={profile.gender}
                    onChange={(e) => handleInputChange(null, "gender", e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <Input
                  value={profile.address.street}
                  onChange={(e) => handleInputChange("address", "street", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <Input
                    value={profile.address.city}
                    onChange={(e) => handleInputChange("address", "city", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <Input
                    value={profile.address.state}
                    onChange={(e) => handleInputChange("address", "state", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP Code</label>
                  <Input
                    value={profile.address.zipCode}
                    onChange={(e) => handleInputChange("address", "zipCode", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Blood Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={profile.medicalInfo.bloodType}
                  onChange={(e) => handleInputChange("medicalInfo", "bloodType", e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Allergies</label>
                <div className="space-y-2">
                  {profile.medicalInfo.allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={allergy}
                        onChange={(e) => handleArrayChange("medicalInfo", "allergies", index, e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter allergy"
                      />
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeArrayItem("medicalInfo", "allergies", index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addArrayItem("medicalInfo", "allergies")}
                    >
                      Add Allergy
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Chronic Conditions</label>
                <div className="space-y-2">
                  {profile.medicalInfo.chronicConditions.map((condition, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={condition}
                        onChange={(e) => handleArrayChange("medicalInfo", "chronicConditions", index, e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter condition"
                      />
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeArrayItem("medicalInfo", "chronicConditions", index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addArrayItem("medicalInfo", "chronicConditions")}
                    >
                      Add Condition
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Medications</label>
                <div className="space-y-2">
                  {profile.medicalInfo.currentMedications.map((medication, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={medication}
                        onChange={(e) => handleArrayChange("medicalInfo", "currentMedications", index, e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter medication"
                      />
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeArrayItem("medicalInfo", "currentMedications", index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addArrayItem("medicalInfo", "currentMedications")}
                    >
                      Add Medication
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-orange-600" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Name</label>
                <Input
                  value={profile.emergencyContact.name}
                  onChange={(e) => handleInputChange("emergencyContact", "name", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Relationship</label>
                <Input
                  value={profile.emergencyContact.relationship}
                  onChange={(e) => handleInputChange("emergencyContact", "relationship", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input
                  type="tel"
                  value={profile.emergencyContact.phone}
                  onChange={(e) => handleInputChange("emergencyContact", "phone", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-purple-600" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-600">Receive updates via email</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.preferences.notifications.email}
                    onChange={(e) => handleInputChange("preferences", "notifications", {
                      ...profile.preferences.notifications,
                      email: e.target.checked
                    })}
                    disabled={!isEditing}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-gray-600">Receive text message alerts</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.preferences.notifications.sms}
                    onChange={(e) => handleInputChange("preferences", "notifications", {
                      ...profile.preferences.notifications,
                      sms: e.target.checked
                    })}
                    disabled={!isEditing}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Appointment Reminders</div>
                    <div className="text-sm text-gray-600">Get reminded about upcoming appointments</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.preferences.notifications.appointments}
                    onChange={(e) => handleInputChange("preferences", "notifications", {
                      ...profile.preferences.notifications,
                      appointments: e.target.checked
                    })}
                    disabled={!isEditing}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Medication Reminders</div>
                    <div className="text-sm text-gray-600">Get reminded to take medications</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.preferences.notifications.medications}
                    onChange={(e) => handleInputChange("preferences", "notifications", {
                      ...profile.preferences.notifications,
                      medications: e.target.checked
                    })}
                    disabled={!isEditing}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Test Results</div>
                    <div className="text-sm text-gray-600">Get notified when test results are ready</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.preferences.notifications.testResults}
                    onChange={(e) => handleInputChange("preferences", "notifications", {
                      ...profile.preferences.notifications,
                      testResults: e.target.checked
                    })}
                    disabled={!isEditing}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Language</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={profile.preferences.language}
                    onChange={(e) => handleInputChange("preferences", "language", e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time Zone</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={profile.preferences.timezone}
                    onChange={(e) => handleInputChange("preferences", "timezone", e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Eastern Time">Eastern Time</option>
                    <option value="Central Time">Central Time</option>
                    <option value="Mountain Time">Mountain Time</option>
                    <option value="Pacific Time">Pacific Time</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
