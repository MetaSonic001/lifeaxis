'use client'

import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart } from '@/components/ui/line-chart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockRevenue, mockHospitals } from '@/lib/data'

const revenueData = mockRevenue.reduce((acc, rev) => {
  const date = rev.date.toISOString().split('T')[0]
  if (!acc[date]) {
    acc[date] = 0
  }
  acc[date] += rev.amount
  return acc
}, {} as Record<string, number>)

const chartData = Object.entries(revenueData).map(([date, amount]) => ({
  name: date,
  value: amount
})).sort((a, b) => a.name.localeCompare(b.name))

export default function RevenuePage() {
  return (
    <AdminLayout activePage="/admin/revenue">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart title="" data={chartData} className="h-[300px]" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRevenue.map((rev) => (
                <TableRow key={rev.id}>
                  <TableCell>{rev.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {mockHospitals.find(h => h.id === rev.hospitalId)?.name}
                  </TableCell>
                  <TableCell>${rev.amount.toLocaleString()}</TableCell>
                  <TableCell className="capitalize">{rev.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

