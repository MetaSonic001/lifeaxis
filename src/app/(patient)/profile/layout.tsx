
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  FileText,
  User,
  Heart,
  Pill,
  MessageCircle,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Activity,
  Wind,
  Book,
  Brain,
  Stethoscope,
  TrendingUp,
  Phone,
  Camera,
  Shield,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Activity, href: "/profile" },
  { id: "appointments", label: "Appointments", icon: Calendar, href: "/profile/appointments" },
  { id: "messages", label: "Messages", icon: MessageCircle, href: "/profile/messages" },
  { id: "medical-records", label: "Medical Records", icon: FileText, href: "/profile/medical-records" },
  { id: "test-results", label: "Test Results", icon: FileText, href: "/profile/test-results" },
  { id: "medications", label: "Medications", icon: Pill, href: "/profile/medications" },
  { id: "symptom-checker", label: "AI Symptom Checker", icon: Brain, href: "/profile/symptom-checker" },
  { id: "telemedicine", label: "Telemedicine", icon: Phone, href: "/profile/telemedicine" },
  { id: "health-analytics", label: "Health Analytics", icon: TrendingUp, href: "/profile/health-analytics" },
  { id: "breathing-activity", label: "Breathing Exercise", icon: Wind, href: "/profile/breathing-activity" },
  { id: "journal", label: "Health Journal", icon: Book, href: "/profile/journal" },
  { id: "emergency", label: "Emergency Contacts", icon: Shield, href: "/profile/emergency" },
  { id: "reminders", label: "Medication Reminders", icon: Clock, href: "/profile/reminders" },
  { id: "billing", label: "Billing", icon: CreditCard, href: "/profile/billing" },
  { id: "profile", label: "Profile", icon: User, href: "/profile/profile" },
];

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl sm:text-2xl font-bold text-blue-800">LifeAxis Portal</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Notifications</span>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Settings</span>
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "w-64 bg-white shadow-sm h-[calc(100vh-73px)] sticky top-[73px] transition-transform duration-300 ease-in-out z-30",
            "lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <nav className="p-4 overflow-y-auto h-full">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group",
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                        )}
                      />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
