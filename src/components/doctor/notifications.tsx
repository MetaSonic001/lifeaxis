import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"

const notifications = [
  { id: 1, type: "appointment", message: "Upcoming appointment with John Doe in 30 minutes" },
  { id: 2, type: "message", message: "New message from Jane Smith" },
  { id: 3, type: "lab", message: "Lab results for patient Bob Johnson are ready" },
]

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-slate-50 shadow-sm"
        >
          <Bell className="h-[1.2rem] w-[1.2rem] text-slate-600" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl">
        <DropdownMenuLabel className="text-slate-700 font-medium">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-200" />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="text-slate-600 hover:bg-slate-50 focus:bg-slate-50">
            {notification.message}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
