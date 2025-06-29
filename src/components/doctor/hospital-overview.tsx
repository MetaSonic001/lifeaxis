import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const hospitals = [
  { name: "City Hospital", tasks: 3 },
  { name: "Metro Clinic", tasks: 1 },
  { name: "Central Hospital", tasks: 2 },
]

export function HospitalOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {hospitals.map((hospital, index) => (
        <Card
          key={hospital.name}
          className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CardHeader
            className={`${
              index === 0
                ? "bg-gradient-to-r from-blue-100 to-indigo-100"
                : index === 1
                  ? "bg-gradient-to-r from-emerald-100 to-teal-100"
                  : "bg-gradient-to-r from-purple-100 to-pink-100"
            } rounded-t-lg flex flex-row items-center justify-between space-y-0 pb-2`}
          >
            <CardTitle className="text-sm font-medium text-slate-700">{hospital.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-slate-700">{hospital.tasks}</div>
            <p className="text-xs text-slate-500">Pending tasks</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
