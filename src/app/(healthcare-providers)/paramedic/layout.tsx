import type React from "react"
import Sidebar from "../paramedic/components/sidebar-mh"

const sidebarItems = [
  { name: "Dashboard", href: "/paramedic/dashboard" },
  { name: "Smart Dispatch System", href: "/paramedic/smart-dispatch" },
  { name: "GPS Navigation", href: "/paramedic/gps-navigation" },
  { name: "Portable Diagnostic Kit", href: "/paramedic/diagnostic-kit" },
]

export default function ParamedicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 overflow-y-auto p-8 bg-white/50 backdrop-blur-sm">{children}</main>
    </div>
  )
}
