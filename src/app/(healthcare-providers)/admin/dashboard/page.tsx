import { Overview } from "@/components/overview"
import { RecentAlerts } from "@/components/recent-alerts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, Brain } from 'lucide-react'
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Patients
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              -2 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">164</div>
            <p className="text-xs text-muted-foreground">
              +6 from last shift
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Burnout Risk
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12%</div>
            <p className="text-xs text-muted-foreground">
              -2% from last week
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Patient Admissions Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>
              You have 3 unread alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentAlerts />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <Card>
          <CardHeader>
            <CardTitle>Early Detection</CardTitle>
            <CardDescription>AI-powered risk analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>3 patients identified as high risk</p>
            <Link href="/early-detection">
              <Button className="mt-4">View Details</Button>
            </Link>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Response</CardTitle>
            <CardDescription>Active emergencies</CardDescription>
          </CardHeader>
          <CardContent>
            <p>1 active emergency response</p>
            <Link href="/admin/emergency-response">
              <Button className="mt-4">Manage Response</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>AI-optimized staffing</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Next shift optimization ready</p>
            <Link href="/admin/resource-allocation">
              <Button className="mt-4">Optimize Schedule</Button>
            </Link>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Diagnostic Support</CardTitle>
            <CardDescription>AI-powered image analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>5 new scans awaiting analysis</p>
            <Link href="/diagnostic-support">
              <Button className="mt-4">Analyze Scans</Button>
            </Link>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>Medication Management</CardTitle>
            <CardDescription>Smart inventory tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <p>2 medications low in stock</p>
            <Link href="/admin/medication-management">
              <Button className="mt-4">View Inventory</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Facility Monitoring</CardTitle>
            <CardDescription>Real-time environment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>All systems operating normally</p>
            <Link href="/admin/facility-monitoring">
              <Button className="mt-4">View Status</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

