import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from 'lucide-react'

const notifications = [
  { id: 1, type: 'appointment', message: 'Upcoming appointment with John Doe in 30 minutes' },
  { id: 2, type: 'message', message: 'New message from Jane Smith' },
  { id: 3, type: 'lab', message: 'Lab results for patient Bob Johnson are ready' },
]

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id}>
            {notification.message}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

