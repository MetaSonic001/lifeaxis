import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, Calendar, DollarSign } from "lucide-react"

export function QuickOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-slate-700">1,234</div>
          <p className="text-xs text-slate-500">+20% from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Appointments Today</CardTitle>
          <Calendar className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-slate-700">12</div>
          <p className="text-xs text-slate-500">2 more than yesterday</p>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Average Consultation Time</CardTitle>
          <Activity className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-slate-700">24m</div>
          <p className="text-xs text-slate-500">-2m from last week</p>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">Revenue This Month</CardTitle>
          <DollarSign className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-slate-700">$12,345</div>
          <p className="text-xs text-slate-500">+15% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
