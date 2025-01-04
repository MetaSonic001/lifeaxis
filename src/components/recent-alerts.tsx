// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// export function RecentAlerts() {
//   const alerts = [
//     {
//       name: "Olivia Martin",
//       email: "olivia.martin@email.com",
//       avatarSrc: "/avatars/01.png",
//       alert: "Critical patient in Room 302",
//     },
//     {
//       name: "Jackson Lee",
//       email: "jackson.lee@email.com",
//       avatarSrc: "/avatars/02.png",
//       alert: "Equipment malfunction in ICU",
//     },
//     {
//       name: "Isabella Nguyen",
//       email: "isabella.nguyen@email.com",
//       avatarSrc: "/avatars/03.png",
//       alert: "Medication shortage alert",
//     },
//     {
//       name: "William Kim",
//       email: "will@email.com",
//       avatarSrc: "/avatars/04.png",
//       alert: "New patient admitted to ER",
//     },
//   ]

//   return (
//     <div className="space-y-8">
//       {alerts.map((alert) => (
//         <div key={alert.email} className="flex items-center">
//           <Avatar className="h-9 w-9">
//             <AvatarImage src={alert.avatarSrc} alt="Avatar" />
//             <AvatarFallback>{alert.name[0]}</AvatarFallback>
//           </Avatar>
//           <div className="ml-4 space-y-1">
//             <p className="text-sm font-medium leading-none">{alert.name}</p>
//             <p className="text-sm text-muted-foreground">{alert.alert}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'

const alerts = [
  {
    id: 1,
    type: "critical",
    message: "Patient in Room 302 needs immediate attention",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "warning",
    message: "Medication stock for Ibuprofen is running low",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "info",
    message: "New patient admitted to Emergency Department",
    time: "1 hour ago",
  },
]

export function RecentAlerts() {
  return (
    <div className="space-y-8">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-center">
          {alert.type === "critical" && (
            <XCircle className="h-8 w-8 text-red-500" />
          )}
          {alert.type === "warning" && (
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          )}
          {alert.type === "info" && (
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          )}
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{alert.message}</p>
            <p className="text-sm text-muted-foreground">{alert.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

