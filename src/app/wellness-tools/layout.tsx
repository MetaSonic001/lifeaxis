    "use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Brain, FileText, Activity, Heart, Home, Menu, ChevronLeft, ChevronRight, BarChart3 } from "lucide-react"

const navigationItems = [
  // {
  //   title: "Overview",
  //   href: "/wellness-tools",
  //   icon: Home,
  //   description: "Wellness tools dashboard",
  // },
  {
    title: "Mindful Minutes",
    href: "/wellness-tools/mindful-minutes",
    icon: Brain,
    description: "Meditation & mindfulness",
  },
  {
    title: "Symptom Journal",
    href: "/wellness-tools/symptom-journal",
    icon: FileText,
    description: "Track daily symptoms",
  },
  // {
  //   title: "Habits Tracker",
  //   href: "/wellness-tools/healthy-habits-tracker",
  //   icon: Activity,
  //   description: "Monitor wellness habits",
  // },
  //   {
  //   title: "First Aid Quiz",
  //   href: "/wellness-tools/first-aid-quiz-game",
  //   icon: Heart,
  //   description: "Learn emergency skills",
  // },
  {
    title: "Go to Main Page",
    href: "/home",
    icon: Home ,
    description: "Keep Exploring",
    bold: true,
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  className?: string
}

function Sidebar({ isCollapsed, onToggle, className = "" }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={`${className} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Wellness Tools</h2>
              <p className="text-xs text-gray-500">LIFEAXIS Platform</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={onToggle} className="p-2 hover:bg-gray-100 transition-colors">
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${isActive ? "text-blue-900" : ""}`}>{item.title}</p>
                    <p className={`text-xs ${isActive ? "text-blue-600" : "text-gray-500"}`}>{item.description}</p>
                  </div>
                )}
                {isActive && !isCollapsed && <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Track your wellness journey</p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <span>4 Tools</span>
              <span>•</span>
              <span>Daily Tracking</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface MobileSidebarProps {
  children: React.ReactNode
}

function MobileSidebar({ children }: MobileSidebarProps) {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Wellness Tools</h2>
                <p className="text-xs text-gray-500">LIFEAXIS Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${isActive ? "text-blue-900" : ""}`}>{item.title}</p>
                      <p className={`text-xs ${isActive ? "text-blue-600" : "text-gray-500"}`}>{item.description}</p>
                    </div>
                    {isActive && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Track your wellness journey</p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                <span>4 Tools</span>
                <span>•</span>
                <span>Daily Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function WellnessToolsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Desktop Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="fixed left-0 top-0 h-full z-30"
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
          {children}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MobileSidebar>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </MobileSidebar>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h1 className="font-semibold text-gray-900">Wellness Tools</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="pb-safe">{children}</div>
      </div>
    </div>
  )
}
