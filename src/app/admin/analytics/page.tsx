'use client'

import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart } from '@/components/ui/line-chart'
import { mockStats } from '@/lib/data'

const appointmentTrendData = mockStats.appointmentTrends.map(trend => ({
  name: trend.date.toLocaleDateString(),
  value: trend.count
}))

export default function AnalyticsPage() {
  return (
    <AdminLayout activePage="/admin/analytics">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalPatients + mockStats.totalDoctors}</div>
            <p className="text-xs text-muted-foreground">Total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointment Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">Total appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total revenue</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Appointment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart title="" data={appointmentTrendData} className="h-[300px]" />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Age Group</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {Object.entries(mockStats.appointmentsByAgeGroup).map(([group, count]) => (
                <li key={group} className="flex justify-between py-1">
                  <span className="capitalize">{group}</span>
                  <span>{count}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {mockStats.revenueByHospital.slice(0, 5).map((item, index) => (
                <li key={item.hospitalId} className="flex justify-between py-1">
                  <span>Hospital {index + 1}</span>
                  <span>${item.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

