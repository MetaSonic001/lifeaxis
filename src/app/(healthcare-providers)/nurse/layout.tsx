'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  { name: 'Dashboard', href: '/nurse/dashboard' },
  { name: 'Patient Monitoring', href: '/nurse/patient-monitoring' },
  { name: 'Inventory Tracking', href: '/nurse/inventory-tracking' },
  { name: 'Workflow Optimizer', href: '/nurse/workflow-optimizer' },
  { name: 'Rounding Assistant', href: '/nurse/rounding-assistant' },
  { name: 'Wound Care Monitor', href: '/nurse/wound-care' },
  { name: 'IV Fluid Monitor', href: '/nurse/iv-fluid' },
  { name: 'Medication Administration Assistant', href: '/nurse/medication-assistant' },
  { name: 'Teleconsultation', href: '/nurse/teleconsultation' },
]

export default function NurseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-64 bg-[#222222] h-screen">
        <div className="flex items-center justify-center h-16 bg-[#222121]">
          <span className="text-white font-bold">Healthcare Nurse Portal</span>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2 py-4">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <span
                    className={`flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700 hover:text-white ${
                      pathname === item.href ? 'bg-gray-700 text-white' : ''
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="flex-1 overflow-y-auto p-6 bg-black">{children}</main>
    </div>
  )
}