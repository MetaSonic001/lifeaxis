import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import RadiologyAISidebar from "../radiologist/components/radiologist-sidebar"

const sidebarItems = [
  { name: "Dashboard", href: "/radiologist/dashboard" },
  { name: "AI Imaging Analysis", href: "/radiologist/ai-imaging-analysis" },
  { name: "Image Archive", href: "/radiologist/image-archive" },
  { name: "Automated Prioritization", href: "/radiologist/auto-prioritization" },
  { name: "Medical Imaging", href: "/radiologist/medical-imaging" },
]

export default function RadiologistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <RadiologyAISidebar items={sidebarItems} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  )
}
