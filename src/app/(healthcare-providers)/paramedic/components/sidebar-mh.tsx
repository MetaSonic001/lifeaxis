"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Home, Navigation, Truck } from "lucide-react"

interface SidebarItem {
  name: string
  href: string
}

interface SidebarProps {
  items: SidebarItem[]
}

const getIcon = (name: string) => {
  switch (name) {
    case "Dashboard":
      return Home
    case "Smart Dispatch System":
      return Truck
    case "GPS Navigation":
      return Navigation
    default:
      return Activity
  }
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gradient-to-b from-slate-50 to-blue-50 border-r border-blue-100 shadow-sm">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MedCare
          </h1>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = getIcon(item.name)
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-sm border border-blue-200"
                    : "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-500 group-hover:text-blue-500"}`}
                />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
