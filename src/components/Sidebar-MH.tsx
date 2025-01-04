'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarProps = {
  items: {
    name: string
    href: string
  }[]
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-gray-800 h-screen">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold">Healthcare Portal</span>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 py-4">
          {items.map((item) => (
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
  )
}

