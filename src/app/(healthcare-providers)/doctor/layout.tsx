import type React from "react"
import { Notifications } from "@/components/doctor/notifications"
import { Sidebar } from "@/components/doctor/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import "../../globals.css"

export const metadata: Metadata = {
  title: "HealthSync - Doctor's Dashboard",
  description: "Streamline your medical practice with LifeAxis",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex justify-end p-4">
              <Notifications />
            </div>
            <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-indigo-50/80 backdrop-blur-sm">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}
