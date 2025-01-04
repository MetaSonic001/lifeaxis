import Sidebar from '@/components/Sidebar-MH'

const sidebarItems = [
  { name: 'Dashboard', href: '/mentalhealth/dashboard' },
  { name: 'AI Therapy Assistant', href: '/mentalhealth/therapy-assistant' },
  { name: 'Mood Tracker', href: '/mentalhealth/mood-tracker' },
  { name: 'Mental Health', href: '/mentalhealth/mental-health' },

]

export default function MentalHealthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen ">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}

