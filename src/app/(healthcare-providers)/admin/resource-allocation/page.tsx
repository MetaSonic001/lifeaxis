'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Types
type Staff = {
  id: number
  name: string
  role: 'Doctor' | 'Nurse' | 'Admin'
  shift: 'Morning' | 'Afternoon' | 'Night'
  department: string
}

type Resource = {
  id: number
  name: string
  type: 'Bed' | 'Ventilator' | 'Wheelchair' | 'Medical Equipment'
  status: 'Available' | 'In Use' | 'Maintenance'
  location: string
  specialization?: string
}

type Alert = {
  id: number
  type: 'low_staff' | 'equipment_shortage' | 'maintenance_needed'
  message: string
  severity: 'low' | 'medium' | 'high'
}

export default function HospitalResourceManagement() {
  // Mock Data with more comprehensive information
  const [staffSchedule, setStaffSchedule] = useState<Staff[]>([
    { id: 1, name: "Dr. Smith", role: "Doctor", shift: "Morning", department: "ER" },
    { id: 2, name: "Nurse Johnson", role: "Nurse", shift: "Afternoon", department: "ICU" },
    { id: 3, name: "Dr. Williams", role: "Doctor", shift: "Night", department: "Pediatrics" },
    { id: 4, name: "Nurse Brown", role: "Nurse", shift: "Morning", department: "Surgery" },
    { id: 5, name: "Dr. Lee", role: "Doctor", shift: "Night", department: "Cardiology" },
  ])

  const [resources, setResources] = useState<Resource[]>([
    { id: 1, name: 'Bed 101', type: 'Bed', status: 'Available', location: 'Ward A', specialization: 'General' },
    { id: 2, name: 'Ventilator 1', type: 'Ventilator', status: 'In Use', location: 'ICU', specialization: 'Critical Care' },
    { id: 3, name: 'Wheelchair 3', type: 'Wheelchair', status: 'Maintenance', location: 'Storage' },
    { id: 4, name: 'Ultrasound Machine', type: 'Medical Equipment', status: 'Available', location: 'Radiology', specialization: 'Diagnostic' },
    { id: 5, name: 'CT Scan', type: 'Medical Equipment', status: 'In Use', location: 'Imaging Center', specialization: 'Advanced Imaging' },
  ])

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, type: 'low_staff', message: 'Low staffing in ER during night shift', severity: 'high' },
    { id: 2, type: 'equipment_shortage', message: 'Limited ventilators available', severity: 'medium' },
  ])

  const [workloadData, setWorkloadData] = useState([
    { department: "ER", current: 80, predicted: 95 },
    { department: "ICU", current: 70, predicted: 75 },
    { department: "Pediatrics", current: 50, predicted: 60 },
    { department: "Surgery", current: 60, predicted: 55 },
  ])

  // Optimization Functions
  const optimizeSchedule = () => {
    setStaffSchedule(staffSchedule.map(staff => ({
      ...staff,
      shift: ['Morning', 'Afternoon', 'Night'][Math.floor(Math.random() * 3)] as 'Morning' | 'Afternoon' | 'Night'
    })))
  }

  const handleResourceStatusChange = (id: number, newStatus: Resource['status']) => {
    setResources(prevResources =>
      prevResources.map(resource =>
        resource.id === id ? { ...resource, status: newStatus } : resource
      )
    )
    // Simulate adding an alert when status changes
    if (newStatus === 'Maintenance') {
      const newAlert: Alert = {
        id: alerts.length + 1,
        type: 'maintenance_needed',
        message: `${resources.find(r => r.id === id)?.name} requires maintenance`,
        severity: 'medium'
      }
      setAlerts([...alerts, newAlert])
    }
  }

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Hospital Resource Management System</h2>
      
      <Tabs defaultValue="staffing" className="text-white">
        <TabsList className="bg-gray-900 text-white">
          <TabsTrigger value="staffing" className="text-white">Staff Scheduling</TabsTrigger>
          <TabsTrigger value="resources" className="text-white">Resource Management</TabsTrigger>
          <TabsTrigger value="workload" className="text-white">Workload Prediction</TabsTrigger>
          <TabsTrigger value="alerts" className="text-white">Alerts</TabsTrigger>
        </TabsList>

        {/* Staff Scheduling Tab */}
        <TabsContent value="staffing">
          <Card className="bg-gray-900 text-white border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Staff Schedule</CardTitle>
              <CardDescription className="text-gray-400">AI-optimized staff allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="text-white">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Role</TableHead>
                    <TableHead className="text-white">Shift</TableHead>
                    <TableHead className="text-white">Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffSchedule.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.shift}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={optimizeSchedule} className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                Optimize Schedule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resource Management Tab */}
        <TabsContent value="resources">
          <Card className="bg-gray-900 text-white border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Resource Inventory</CardTitle>
              <CardDescription className="text-gray-400">Manage hospital resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="text-white">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Type</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Location</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>{resource.name}</TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell>{resource.status}</TableCell>
                      <TableCell>{resource.location}</TableCell>
                      <TableCell>
                        <Select 
                          onValueChange={(value) => handleResourceStatusChange(resource.id, value as Resource['status'])}
                          value={resource.status}
                        >
                          <SelectTrigger className="w-[180px] bg-gray-800 text-white">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 text-white">
                            <SelectItem value="Available" className="text-white hover:bg-gray-800">Available</SelectItem>
                            <SelectItem value="In Use" className="text-white hover:bg-gray-800">In Use</SelectItem>
                            <SelectItem value="Maintenance" className="text-white hover:bg-gray-800">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workload Prediction Tab */}
        <TabsContent value="workload">
          <Card className="bg-gray-900 text-white border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Workload Prediction</CardTitle>
              <CardDescription className="text-gray-400">Current and predicted workload by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workloadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="department" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', color: '#fff' }} 
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="current" fill="#8884d8" name="Current Workload" />
                  <Bar dataKey="predicted" fill="#82ca9d" name="Predicted Workload" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts">
          <Card className="bg-gray-900 text-white border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">System Alerts</CardTitle>
              <CardDescription className="text-gray-400">Critical notifications and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 mb-2 rounded ${
                    alert.severity === 'high' ? 'bg-red-900' : 
                    alert.severity === 'medium' ? 'bg-yellow-900' : 'bg-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{alert.message}</span>
                    <Button 
                      onClick={() => removeAlert(alert.id)} 
                      className="bg-transparent hover:bg-white/10 text-white"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
              {alerts.length === 0 && (
                <p className="text-gray-500">No active alerts</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}