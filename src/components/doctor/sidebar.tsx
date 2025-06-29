"use client"

import {
  BarChart2,
  Bot,
  Calendar,
  ChevronDown,
  ChevronRight,
  Home,
  Lightbulb,
  Settings,
  Users,
  Video,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const sidebarItems = [
  { name: "Home", href: "/doctor/dashboard", icon: Home },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Analytics", href: "/doctor/analytics", icon: BarChart2 },
  { name: "Video Consultation", href: "/doctor/video-consultation", icon: Video },
  { name: "Dynamic Workflow", href: "/doctor/dynamic-workflow", icon: Video },
  { name: "Patient Insights", href: "/doctor/patient-insights", icon: Video },
  { name: "Settings", href: "/doctor/settings", icon: Settings },
]

const aiTools = [
  { name: "AI Chatbot", href: "/doctor/ai-tools/chatbot", icon: Bot },
  { name: "AI Diagnostics", href: "/doctor/ai-tools/ai-diagnostics", icon: Lightbulb },
  { name: "Case Summary", href: "/doctor/ai-tools/case-summary", icon: Bot },
  { name: "Clinical Decision", href: "/doctor/ai-tools/clinical-decision", icon: Bot },
  { name: "Early Detection", href: "/doctor/ai-tools/early-detection", icon: Bot },
]

export function Sidebar() {
  const pathname = usePathname()
  const [aiToolsOpen, setAiToolsOpen] = useState(false)

  return (
    <div className="flex h-full w-16 flex-col justify-between bg-white/80 backdrop-blur-sm border-r border-slate-200 md:w-64 shadow-lg">
      <div className="flex flex-col space-y-2 py-4">
        <div className="px-3 py-2">
          <div className="mb-6 hidden px-4 md:block">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LifeAxis
            </h2>
            <p className="text-xs text-slate-500">Doctor's Dashboard</p>
          </div>

          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={`w-full justify-start transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline-block">{item.name}</span>
                </Link>
              </Button>
            ))}

            <Collapsible open={aiToolsOpen} onOpenChange={setAiToolsOpen} className="w-full">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200"
                  onClick={() => setAiToolsOpen(!aiToolsOpen)}
                >
                  <span className="flex items-center">
                    <Bot className="mr-2 h-4 w-4" />
                    <span className="hidden md:inline-block">AI Tools</span>
                  </span>
                  {aiToolsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                {aiTools.map((tool) => (
                  <Button
                    key={tool.name}
                    asChild
                    variant={pathname === tool.href ? "secondary" : "ghost"}
                    className={`w-full justify-start pl-6 transition-all duration-200 ${
                      pathname === tool.href
                        ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                  >
                    <Link href={tool.href}>
                      <tool.icon className="mr-2 h-4 w-4" />
                      <span className="hidden md:inline-block">{tool.name}</span>
                    </Link>
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg p-3 hidden md:block">
          <p className="text-xs text-slate-600 text-center">Need help? Contact support</p>
        </div>
      </div>
    </div>
  )
}
