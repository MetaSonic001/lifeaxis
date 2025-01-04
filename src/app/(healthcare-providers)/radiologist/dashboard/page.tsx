'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Image, AlertCircle, Clock, Users, Search, Share2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RadiologistDashboard() {
  const [pendingScans, setPendingScans] = useState(0)
  const [criticalFindings, setCriticalFindings] = useState(0)
  const [averageReportTime, setAverageReportTime] = useState(0)

  useEffect(() => {
    // Simulating data fetching
    setPendingScans(15)
    setCriticalFindings(2)
    setAverageReportTime(45)
  }, [])

  const features = [
    { name: 'AI Imaging Analysis', icon: Search, href: '/radiologist/ai-imaging-analysis' },
    { name: 'Image Archive', icon: Image, href: '/radiologist/image-archive' },
    { name: 'Automated Prioritization', icon: AlertCircle, href: '/radiologist/auto-prioritization' },
    { name: 'Peer Review Platform', icon: Share2, href: '/radiologist/peer-review' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Radiologist Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Scans</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingScans}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalFindings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Report Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageReportTime} min</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Quick Access</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link key={feature.name} href={feature.href}>
            <Button variant="outline" className="w-full h-full">
              <feature.icon className="mr-2 h-4 w-4" />
              {feature.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

