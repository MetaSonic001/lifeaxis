"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    videoConsultation: true,
    multilingualSupport: false,
    aiServices: true,
    blockchainEnabled: false,
    emergencyServices: true,
    telemedicine: true,
    appointmentReminders: true,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <AdminLayout activePage="/admin/settings">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Manage platform-wide settings and feature toggles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label
              htmlFor="video-consultation"
              className="flex flex-col space-y-1"
            >
              <span>Video Consultation</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enable video consultations between doctors and patients
              </span>
            </Label>
            <Switch
              id="video-consultation"
              checked={settings.videoConsultation}
              onCheckedChange={() => handleToggle("videoConsultation")}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label
              htmlFor="multilingual-support"
              className="flex flex-col space-y-1"
            >
              <span>Multilingual Support</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enable support for multiple languages across the platform
              </span>
            </Label>
            <Switch
              id="multilingual-support"
              checked={settings.multilingualSupport}
              onCheckedChange={() => handleToggle("multilingualSupport")}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="ai-services" className="flex flex-col space-y-1">
              <span>AI Services</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enable AI-powered features and recommendations
              </span>
            </Label>
            <Switch
              id="ai-services"
              checked={settings.aiServices}
              onCheckedChange={() => handleToggle("aiServices")}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label
              htmlFor="blockchain-enabled"
              className="flex flex-col space-y-1"
            >
              <span>Blockchain Integration</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enable blockchain-based features for secure data management
              </span>
            </Label>
            <Switch
              id="blockchain-enabled"
              checked={settings.blockchainEnabled}
              onCheckedChange={() => handleToggle("blockchainEnabled")}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label
              htmlFor="emergency-services"
              className="flex flex-col space-y-1"
            >
              <span>Emergency Services</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enable 24/7 emergency consultation services
              </span>
            </Label>
            <Switch
              id="emergency-services"
              checked={settings.emergencyServices}
              onCheckedChange={() => handleToggle("emergencyServices")}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="telemedicine" className="flex flex-col space-y-1">
              <span>Telemedicine</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enable remote medical services and consultations
              </span>
            </Label>
            <Switch
              id="telemedicine"
              checked={settings.telemedicine}
              onCheckedChange={() => handleToggle("telemedicine")}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label
              htmlFor="appointment-reminders"
              className="flex flex-col space-y-1"
            >
              <span>Appointment Reminders</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enable automated appointment reminders via email and SMS
              </span>
            </Label>
            <Switch
              id="appointment-reminders"
              checked={settings.appointmentReminders}
              onCheckedChange={() => handleToggle("appointmentReminders")}
            />
          </div>
          <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
