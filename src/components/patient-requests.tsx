import { Button } from "@/components/ui/button"

const requests = [
  { id: 1, patient: "Alice Brown", reason: "Follow-up consultation" },
  { id: 2, patient: "Charlie Davis", reason: "New patient appointment" },
]

export function PatientRequests() {
  return (
    <ul className="space-y-4">
      {requests.map((request) => (
        <li key={request.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{request.patient}</p>
            <p className="text-sm text-muted-foreground">{request.reason}</p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              Approve
            </Button>
            <Button variant="outline" size="sm">
              Reject
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

