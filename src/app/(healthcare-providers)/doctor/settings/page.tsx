"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, Download, RefreshCw, User, Bell, Shield, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: "Dr. John",
    lastName: "Smith",
    email: "john.smith@hospital.com",
    phone: "+1 234 567 8900",
    specialization: "Cardiology",
    license: "MD123456",
    bio: "Experienced cardiologist with 15+ years of practice",
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    emergencyAlerts: true,
    systemUpdates: false,
  })

  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
    sessionTimeout: "30",
  })

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Profile saved successfully")
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("Error saving profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Notification settings saved")
      alert("Notification settings updated!")
    } catch (error) {
      console.error("Error saving notifications:", error)
      alert("Error saving notification settings.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!securityData.currentPassword || !securityData.newPassword) {
      alert("Please fill in all password fields")
      return
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("New passwords do not match")
      return
    }

    if (securityData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }

    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Password changed successfully")
      alert("Password changed successfully!")
      setSecurityData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      console.error("Error changing password:", error)
      alert("Error changing password. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleImportSettings = async () => {
    setIsImporting(true)
    try {
      // Simulate file import
      const input = document.createElement("input")
      input.type = "file"
      input.accept = ".json"
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          console.log("Settings imported successfully")
          alert("Settings imported successfully!")
        }
      }
      input.click()
    } catch (error) {
      console.error("Error importing settings:", error)
      alert("Error importing settings.")
    } finally {
      setIsImporting(false)
    }
  }

  const handleExportSettings = async () => {
    setIsExporting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const settingsData = {
        profile: profileData,
        notifications: notifications,
        security: { ...securityData, currentPassword: "", newPassword: "", confirmPassword: "" },
      }

      const blob = new Blob([JSON.stringify(settingsData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "doctor-settings.json"
      a.click()
      URL.revokeObjectURL(url)

      console.log("Settings exported successfully")
    } catch (error) {
      console.error("Error exporting settings:", error)
      alert("Error exporting settings.")
    } finally {
      setIsExporting(false)
    }
  }

  const handleResetSettings = async () => {
    if (!confirm("Are you sure you want to reset all settings to default? This action cannot be undone.")) {
      return
    }

    setIsResetting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Reset to default values
      setNotifications({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        appointmentReminders: true,
        emergencyAlerts: true,
        systemUpdates: false,
      })

      setSecurityData((prev) => ({
        ...prev,
        twoFactorAuth: false,
        sessionTimeout: "30",
      }))

      console.log("Settings reset to defaults")
      alert("Settings have been reset to defaults!")
    } catch (error) {
      console.error("Error resetting settings:", error)
      alert("Error resetting settings.")
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-slate-600">Manage your account and application preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleImportSettings}
            disabled={isImporting}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isImporting ? "Importing..." : "Import"}
          </Button>
          <Button
            variant="outline"
            onClick={handleExportSettings}
            disabled={isExporting}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
          <Button
            variant="outline"
            onClick={handleResetSettings}
            disabled={isResetting}
            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isResetting ? "animate-spin" : ""}`} />
            {isResetting ? "Resetting..." : "Reset"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-blue-100"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-blue-100"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-blue-100"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-t-lg">
              <CardTitle className="text-slate-700">Profile Information</CardTitle>
              <CardDescription className="text-slate-600">
                Update your personal and professional information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-700 font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-700 font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-700 font-medium">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-purple-400"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="specialization" className="text-slate-700 font-medium">
                      Specialization
                    </Label>
                    <Select
                      value={profileData.specialization}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, specialization: value }))}
                    >
                      <SelectTrigger className="mt-1 border-slate-200 focus:border-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Neurology">Neurology</SelectItem>
                        <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="General Medicine">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="license" className="text-slate-700 font-medium">
                      Medical License
                    </Label>
                    <Input
                      id="license"
                      value={profileData.license}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, license: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-slate-700 font-medium">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-purple-400 resize-none"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
              <CardTitle className="text-slate-700">Notification Preferences</CardTitle>
              <CardDescription className="text-slate-600">
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-700 font-medium">Email Notifications</Label>
                    <p className="text-sm text-slate-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-700 font-medium">SMS Notifications</Label>
                    <p className="text-sm text-slate-600">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-700 font-medium">Push Notifications</Label>
                    <p className="text-sm text-slate-600">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-700 font-medium">Appointment Reminders</Label>
                    <p className="text-sm text-slate-600">Get reminders for upcoming appointments</p>
                  </div>
                  <Switch
                    checked={notifications.appointmentReminders}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, appointmentReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-700 font-medium">Emergency Alerts</Label>
                    <p className="text-sm text-slate-600">Receive critical emergency notifications</p>
                  </div>
                  <Switch
                    checked={notifications.emergencyAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emergencyAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-700 font-medium">System Updates</Label>
                    <p className="text-sm text-slate-600">Get notified about system updates</p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, systemUpdates: checked }))}
                  />
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleSaveNotifications}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Notifications"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Change Password</CardTitle>
                <CardDescription className="text-slate-600">
                  Update your account password for better security
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label htmlFor="currentPassword" className="text-slate-700 font-medium">
                      Current Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                        className="border-slate-200 focus:border-red-400 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword" className="text-slate-700 font-medium">
                      New Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData((prev) => ({ ...prev, newPassword: e.target.value }))}
                        className="border-slate-200 focus:border-red-400 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-red-400"
                    />
                  </div>

                  <Button
                    onClick={handleChangePassword}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
                <CardTitle className="text-slate-700">Security Settings</CardTitle>
                <CardDescription className="text-slate-600">
                  Additional security options for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-700 font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={securityData.twoFactorAuth}
                        onCheckedChange={(checked) => setSecurityData((prev) => ({ ...prev, twoFactorAuth: checked }))}
                      />
                      {securityData.twoFactorAuth && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">Enabled</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-700 font-medium">Session Timeout</Label>
                      <p className="text-sm text-slate-600">Automatically log out after inactivity</p>
                    </div>
                    <Select
                      value={securityData.sessionTimeout}
                      onValueChange={(value) => setSecurityData((prev) => ({ ...prev, sessionTimeout: value }))}
                    >
                      <SelectTrigger className="w-32 border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
