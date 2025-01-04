import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'


import "../../globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HealthTech Innovate',
  description: 'Empowering Healthcare Workers with AI and IoT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          // defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex h-screen">
              <AppSidebar />
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

