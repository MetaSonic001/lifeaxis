'use client'

import { AdminLayout } from '@/components/admin-layout'
import { StatCard } from '@/components/ui/stat-card'
import { LineChart } from '@/components/ui/line-chart'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Building2, CalendarIcon, DollarSign } from 'lucide-react'
import { mockStats } from '@/lib/data'

const revenueData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout activePage="/admin">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={mockStats.totalPatients}
          icon={Users}
          change={{ value: 2.14, trend: 'up' }}
        />
        <StatCard
          title="Total Doctors"
          value={mockStats.totalDoctors}
          icon={Users}
          change={{ value: 3.78, trend: 'up' }}
        />
        <StatCard
          title="Appointments"
          value={mockStats.totalAppointments}
          icon={CalendarIcon}
          change={{ value: 1.56, trend: 'down' }}
        />
        <StatCard
          title="Revenue"
          value={`$${(mockStats.totalRevenue / 1000).toFixed(1)}k`}
          icon={DollarSign}
          change={{ value: 1.64, trend: 'up' }}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-2 lg:col-span-5">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              title=""
              data={revenueData}
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* We'll implement this with real data later */}
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium">Dr. Sarah Wilson</p>
                  <p className="text-sm text-gray-500">Today at 2:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hospital Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* We'll implement this with real data later */}
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium">City General Hospital</p>
                  <p className="text-sm text-gray-500">45 appointments today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

