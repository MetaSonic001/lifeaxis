"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  LineChart,
  DollarSign,
  Settings,
  Menu,
} from "lucide-react";
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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage?: string;
}

const navigation = [
  {
    title: "Overview",
    links: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Management",
    links: [
      { href: "/admin/hospitals", label: "Hospitals", icon: Building2 },
      { href: "/admin/doctors", label: "Doctors", icon: UserCog },
      { href: "/admin/patients", label: "Patients", icon: Users },
    ],
  },
  {
    title: "Analytics",
    links: [
      {
        href: "/admin/analytics",
        label: "Platform Analytics",
        icon: LineChart,
      },
      { href: "/admin/revenue", label: "Revenue", icon: DollarSign },
    ],
  },
  {
    title: "System",
    links: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

export function AdminLayout({ children, activePage }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">LifeAxis</span>
                <span className="text-xs text-gray-500">Admin Dashboard</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {navigation.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.links.map((link) => (
                      <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={activePage === link.href}
                        >
                          <a
                            href={link.href}
                            className="flex items-center gap-2"
                          >
                            <link.icon className="h-4 w-4" />
                            <span>{link.label}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
}
