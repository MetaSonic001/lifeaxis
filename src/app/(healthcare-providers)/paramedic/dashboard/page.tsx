"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Briefcase, Clock, Map, Truck, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ParamedicDashboard() {
  const [activeIncidents, setActiveIncidents] = useState(0)
  const [averageResponseTime, setAverageResponseTime] = useState(0)
  const [availableUnits, setAvailableUnits] = useState(0)
  const [lastClicked, setLastClicked] = useState<string>("")

  useEffect(() => {
    // Simulating data fetching
    setActiveIncidents(3)
    setAverageResponseTime(8.5)
    setAvailableUnits(5)
  }, [])

  const features = [
    {
      name: "Smart Dispatch System",
      icon: Truck,
      href: "/paramedic/smart-dispatch",
      description: "Manage emergency calls and dispatch teams",
      color: "from-blue-400 to-cyan-400",
    },
    {
      name: "Dynamic GPS Navigation",
      icon: Map,
      href: "/paramedic/gps-navigation",
      description: "Real-time navigation and routing",
      color: "from-green-400 to-emerald-400",
    },
    {
      name: "Portable Diagnostic Kit",
      icon: Briefcase,
      href: "/paramedic/diagnostic-kit",
      description: "Digital diagnostic tools and reports",
      color: "from-purple-400 to-pink-400",
    },
  ]

  const stats = [
    {
      title: "Active Incidents",
      value: activeIncidents,
      icon: AlertCircle,
      color: "from-red-400 to-pink-400",
      bgColor: "from-red-50 to-pink-50",
      textColor: "text-red-700",
    },
    {
      title: "Avg. Response Time",
      value: `${averageResponseTime} min`,
      icon: Clock,
      color: "from-amber-400 to-orange-400",
      bgColor: "from-amber-50 to-orange-50",
      textColor: "text-amber-700",
    },
    {
      title: "Available Units",
      value: availableUnits,
      icon: Truck,
      color: "from-green-400 to-emerald-400",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700",
    },
  ]

  const handleFeatureClick = (featureName: string) => {
    setLastClicked(featureName)
    console.log(`Navigating to ${featureName}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Paramedic Dashboard
          </h1>
          <p className="text-slate-600 mt-2">Monitor and manage emergency response operations</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 font-medium text-sm">System Online</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+12% from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-800">Quick Access</h2>
          <span className="text-sm text-slate-500">Click to navigate to features</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className="group"
              onClick={() => handleFeatureClick(feature.name)}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{feature.description}</p>
                      <div className="flex items-center mt-3 text-blue-600 text-sm font-medium">
                        <span>Access now</span>
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      {lastClicked && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Last accessed: {lastClicked}</p>
        </div>
      )}
    </div>
  )
}
