import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const hospitals = [
  { name: "City Hospital", tasks: 3 },
  { name: "Metro Clinic", tasks: 1 },
  { name: "Central Hospital", tasks: 2 },
]

export function HospitalOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {hospitals.map((hospital) => (
        <Card key={hospital.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{hospital.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospital.tasks}</div>
            <p className="text-xs text-muted-foreground">Pending tasks</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

