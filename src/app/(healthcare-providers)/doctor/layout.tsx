import { Notifications } from "@/components/doctor/notifications"
import { Sidebar } from "@/components/doctor/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import "../../globals.css"


export const metadata: Metadata = {
  title: "HealthSync - Doctor's Dashboard",
  description: "Streamline your medical practice with DocDial",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         <div>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex justify-end p-4">
              <Notifications />
            </div>
            <main className="flex-1 overflow-y-auto bg-background">
              {children}
            </main>
          </div>
          </div>
        </ThemeProvider>
        </>
  )
}

