'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
// import { Textarea } from "@/components/ui/textarea"

// Type Definitions
type Employee = {
  id: number
  name: string
  role: string
  department: string
  availability: string[]
  shift: string
  efficiency: number
}

type Shift = {
  id: number
  day: string
  startTime: string
  endTime: string
  assignedTo: number | null
  status: string
}

// Mock Data
const initialEmployees: Employee[] = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    role: 'Nurse', 
    department: 'Emergency', 
    availability: ['Monday', 'Tuesday', 'Wednesday'], 
    shift: 'Morning', 
    efficiency: 85 
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    role: 'Doctor', 
    department: 'Cardiology', 
    availability: ['Thursday', 'Friday', 'Saturday'], 
    shift: 'Evening', 
    efficiency: 92 
  },
  { 
    id: 3, 
    name: 'Carol Williams', 
    role: 'Technician', 
    department: 'Radiology', 
    availability: ['Wednesday', 'Thursday', 'Friday'], 
    shift: 'Night', 
    efficiency: 78 
  },
]

const initialShifts: Shift[] = [
  { id: 1, day: 'Monday', startTime: '08:00', endTime: '16:00', assignedTo: null, status: 'Upcoming' },
  { id: 2, day: 'Tuesday', startTime: '16:00', endTime: '00:00', assignedTo: null, status: 'Upcoming' },
  { id: 3, day: 'Wednesday', startTime: '00:00', endTime: '08:00', assignedTo: null, status: 'Upcoming' },
  { id: 4, day: 'Thursday', startTime: '08:00', endTime: '16:00', assignedTo: null, status: 'Upcoming' },
  { id: 5, day: 'Friday', startTime: '16:00', endTime: '00:00', assignedTo: null, status: 'Upcoming' },
]

export default function HospitalStaffManagement() {
  // State Management
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [shifts, setShifts] = useState<Shift[]>(initialShifts)
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({})

  // Shift Assignment Functions
  const handleAssignShift = (shiftId: number, employeeId: number | null) => {
    setShifts(prevShifts =>
      prevShifts.map(shift =>
        shift.id === shiftId ? { ...shift, assignedTo: employeeId, status: employeeId ? 'Assigned' : 'Upcoming' } : shift
      )
    )
  }

  // Efficiency Management
  const handleEfficiencyChange = (id: number, newEfficiency: number) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === id ? { ...employee, efficiency: newEfficiency } : employee
      )
    )
  }

  // Shift Status Management
  const handleShiftStatus = (shiftId: number, newStatus: string) => {
    setShifts(prevShifts =>
      prevShifts.map(shift =>
        shift.id === shiftId ? { ...shift, status: newStatus } : shift
      )
    )
  }

  // Employee Management
  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.role) {
      const employeeToAdd: Employee = {
        id: employees.length + 1,
        name: newEmployee.name,
        role: newEmployee.role,
        department: newEmployee.department || 'Unassigned',
        availability: newEmployee.availability || [],
        shift: newEmployee.shift || 'Not Scheduled',
        efficiency: newEmployee.efficiency || 50
      }
      setEmployees(prev => [...prev, employeeToAdd])
      setNewEmployee({}) // Reset form
    }
  }

  // Helper Functions
  const getEmployeeName = (employeeId: number | null) => {
    if (employeeId === null) return 'Unassigned'
    const employee = employees.find(e => e.id === employeeId)
    return employee ? employee.name : 'Unknown'
  }

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Hospital Staff Management System</h1>
      
      <Tabs defaultValue="scheduling">
        <TabsList className="mb-4">
          <TabsTrigger value="scheduling">Shift Scheduling</TabsTrigger>
          <TabsTrigger value="workforce">Workforce Optimization</TabsTrigger>
          <TabsTrigger value="workload">Workload Management</TabsTrigger>
        </TabsList>

        {/* Scheduling Tab */}
        <TabsContent value="scheduling">
          <Card>
            <CardHeader>
              <CardTitle>Shift Scheduling</CardTitle>
              <CardDescription>Assign and manage staff shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shifts.map(shift => (
                    <TableRow key={shift.id}>
                      <TableCell>{shift.day}</TableCell>
                      <TableCell>{shift.startTime} - {shift.endTime}</TableCell>
                      <TableCell>{getEmployeeName(shift.assignedTo)}</TableCell>
                      <TableCell>
                        <Select 
                          onValueChange={(value) => 
                            handleAssignShift(shift.id, value ? Number(value) : null)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Assign Staff" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map(employee => (
                              <SelectItem 
                                key={employee.id} 
                                value={employee.id.toString()}
                              >
                                {employee.name} ({employee.role})
                              </SelectItem>
                            ))}
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

        {/* Workforce Optimization Tab */}
        <TabsContent value="workforce">
          <Card>
            <CardHeader>
              <CardTitle>Workforce Optimization</CardTitle>
              <CardDescription>Monitor and adjust staff performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(employee => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.shift}</TableCell>
                      <TableCell>{employee.efficiency}%</TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="0" 
                          max="100" 
                          defaultValue={employee.efficiency}
                          onChange={(e) => 
                            handleEfficiencyChange(
                              employee.id, 
                              parseInt(e.target.value)
                            )
                          }
                          className="w-20"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Add New Employee Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4">Add New Employee</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input 
                        value={newEmployee.name || ''} 
                        onChange={(e) => setNewEmployee(prev => ({...prev, name: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input 
                        value={newEmployee.role || ''} 
                        onChange={(e) => setNewEmployee(prev => ({...prev, role: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label>Department</Label>
                      <Input 
                        value={newEmployee.department || ''} 
                        onChange={(e) => setNewEmployee(prev => ({...prev, department: e.target.value}))}
                      />
                    </div>
                    <Button onClick={handleAddEmployee}>Save Employee</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workload Management Tab */}
        <TabsContent value="workload">
          <Card>
            <CardHeader>
              <CardTitle>Workload Management</CardTitle>
              <CardDescription>Track and manage ongoing shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Assigned Staff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shifts.map(shift => (
                    <TableRow key={shift.id}>
                      <TableCell>{shift.day}</TableCell>
                      <TableCell>{shift.startTime} - {shift.endTime}</TableCell>
                      <TableCell>{getEmployeeName(shift.assignedTo)}</TableCell>
                      <TableCell>{shift.status}</TableCell>
                      <TableCell>
                        <Select 
                          onValueChange={(value) => handleShiftStatus(shift.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Upcoming">Upcoming</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
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
      </Tabs>
    </div>
  )
}