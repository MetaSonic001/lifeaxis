"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  Package,
  Calendar,
  Clipboard,
  Thermometer,
  Droplet,
  Pill,
  Phone,
  Moon,
  AlertTriangle,
  Monitor,
  LayoutDashboard,
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"

const sidebarItems = [
  { name: "Dashboard", href: "/nurse/dashboard", icon: LayoutDashboard, color: "text-blue-600" },
  { name: "Patient Monitoring", href: "/nurse/patient-monitoring", icon: Activity, color: "text-emerald-600" },
  { name: "Centralized Monitoring", href: "/nurse/centralized-monitoring", icon: Monitor, color: "text-purple-600" },
  { name: "Inventory Tracking", href: "/nurse/inventory-tracking", icon: Package, color: "text-amber-600" },
  { name: "Workflow Optimizer", href: "/nurse/workflow-optimizer", icon: Calendar, color: "text-indigo-600" },
  { name: "Rounding Assistant", href: "/nurse/rounding-assistant", icon: Clipboard, color: "text-teal-600" },
  { name: "Wound Care Monitor", href: "/nurse/wound-care", icon: Thermometer, color: "text-rose-600" },
  { name: "IV Fluid Monitor", href: "/nurse/iv-fluid", icon: Droplet, color: "text-cyan-600" },
  { name: "Medication Assistant", href: "/nurse/medication-assistant", icon: Pill, color: "text-violet-600" },
  { name: "Shift Fatigue Monitor", href: "/nurse/shift-fatigue", icon: Moon, color: "text-slate-600" },
  { name: "Rapid Response", href: "/nurse/rapid-response", icon: AlertTriangle, color: "text-red-600" },
  { name: "Teleconsultation", href: "/nurse/teleconsultation", icon: Phone, color: "text-green-600" },
]

export default function NurseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)

  // Handle mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNotificationClick = () => {
    alert(`You have ${notifications} new notifications`)
    setNotifications(0)
  }

  const handleSettingsClick = () => {
    alert("Settings panel would open here")
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logout functionality would be implemented here")
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-20" : "w-72"} ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed md:relative z-50 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-xl border-r border-slate-200/50 h-full`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          {!sidebarCollapsed && (
            <div>
              <h1 className="font-bold text-lg">HealthCare Portal</h1>
              <p className="text-xs text-blue-100">Nurse Dashboard</p>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors hidden md:block"
          >
            <LayoutDashboard className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <div className="space-y-1 px-3">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <div
                    className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-200/50"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${isActive ? item.color : "text-slate-400 group-hover:text-slate-600"} transition-colors`}
                    />
                    {!sidebarCollapsed && <span className="ml-3 font-medium text-sm">{item.name}</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User Profile */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Sarah Johnson</p>
                <p className="text-xs text-slate-500">Registered Nurse</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200/50 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                {sidebarItems.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h2>
              <p className="text-sm text-slate-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNotificationClick}
              className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button
              onClick={handleSettingsClick}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
