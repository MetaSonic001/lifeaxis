import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewMetric {
  title: string
  value: string | number
  subtitle: string
  bgColor: string
}

export function QuickOverview() {
  const metrics: OverviewMetric[] = [
    {
      title: "Total Patients",
      value: "1,234",
      subtitle: "+20% from last month",
      bgColor: "bg-blue-100"
    },
    {
      title: "Appointments Today",
      value: "12",
      subtitle: "2 more than yesterday",
      bgColor: "bg-green-100"
    },
    {
      title: "Average Consultation Time",
      value: "24m",
      subtitle: "-2m from last week",
      bgColor: "bg-purple-100"
    },
    {
      title: "Revenue This Month",
      value: "$12,345",
      subtitle: "+15% from last month",
      bgColor: "bg-orange-100"
    }
  ]

  return (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-xl lg:text-2xl font-semibold text-slate-800 mb-4 lg:mb-6">
        Quick Overview
      </h2>
      
      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-4 xl:gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
            <CardHeader className={`${metric.bgColor} rounded-t-lg pb-3`}>
              <CardTitle className="text-slate-700 text-sm xl:text-base font-medium">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 xl:p-6">
              <div className="text-2xl xl:text-3xl font-bold text-slate-800 mb-2">
                {metric.value}
              </div>
              <p className="text-slate-600 text-sm xl:text-base">
                {metric.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden space-y-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-white border-0 shadow-md">
            <CardHeader className={`${metric.bgColor} rounded-t-lg pb-3`}>
              <CardTitle className="text-slate-700 text-sm sm:text-base font-medium">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-slate-800">
                  {metric.value}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm text-right">
                  {metric.subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}