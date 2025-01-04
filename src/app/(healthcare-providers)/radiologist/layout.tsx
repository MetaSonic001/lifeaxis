import Sidebar from '@/components/Sidebar-MH'
import { ThemeProvider } from '@/components/theme-provider'

const sidebarItems = [
  { name: 'Dashboard', href: '/radiologist/dashboard' },
  { name: 'AI Imaging Analysis', href: '/radiologist/ai-imaging-analysis' },
  { name: 'Image Archive', href: '/radiologist/image-archive' },
  { name: 'Automated Prioritization', href: '/radiologist/auto-prioritization' },
  { name: 'Medical Imaging', href: '/radiologist/medical-imaging' },
]

export default function RadiologistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen ">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 overflow-y-auto p-6">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        </ThemeProvider>
        </main>
    </div>
  )
}

