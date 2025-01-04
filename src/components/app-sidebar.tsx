"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Activity, AlertTriangle, Brain, Calendar, Eye, Home, Image, Settings, Stethoscope, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Activity, label: 'Billing', href: '/admin/billing' },
  { icon: AlertTriangle, label: 'Emergency Response', href: '/admin/emergency-response' },
  { icon: Brain, label: 'Budget Planning', href: '/admin/budget-planning' },
  { icon: Image, label: 'Medication Management', href: '/admin/medication-management' },
  { icon: Users, label: 'Resource Allocation', href: '/admin/resource-allocation' },
  // { icon: GraduationCap, label: 'Training & Education', href: '/training' },
  // { icon: Ambulance, label: 'Emergency Response', href: '/admin/emergency-response' },
  // { icon: Heart, label: 'Personal Health', href: '/personal-health' },
  { icon: Calendar, label: 'Management System', href: '/admin/management-system' },
  { icon: Eye, label: 'Visitor Management', href: '/admin/visitors' },
  // { icon: Microscope, label: 'Medication Management', href: '/admin/medication-management' },
  { icon: Stethoscope, label: 'Facility Monitoring', href: '/admin/facility-monitoring' },
  // { icon: Zap, label: 'IoT Patient Monitoring', href: '/iot-patient-monitoring' },
  // { icon: Shield, label: 'Secure EHR', href: '/secure-ehr' },
  // { icon: Trash2, label: 'Stress Detection', href: '/stress-detection' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-2xl font-bold">HealthTech Innovate</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

