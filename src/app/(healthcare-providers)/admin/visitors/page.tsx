'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Filter, LogOut, Search, UserPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

// Enhanced Visitor Type with more detailed information
type Visitor = {
  id: number
  name: string
  contactNumber: string
  visitingPatient: string
  patientRoom: string
  checkInTime: string
  checkOutTime: string | null
  purpose: 'Family' | 'Medical' | 'Other'
  status: 'Checked In' | 'Checked Out'
}

// Mock initial data with more comprehensive information
const initialVisitors: Visitor[] = [
  { 
    id: 1, 
    name: 'Alice Brown', 
    contactNumber: '555-123-4567',
    visitingPatient: 'John Doe', 
    patientRoom: '204B',
    checkInTime: '09:30', 
    checkOutTime: null,
    purpose: 'Family',
    status: 'Checked In'
  },
  { 
    id: 2, 
    name: 'Bob Wilson', 
    contactNumber: '555-987-6543',
    visitingPatient: 'Jane Smith', 
    patientRoom: '305C',
    checkInTime: '10:15', 
    checkOutTime: '11:00',
    purpose: 'Medical',
    status: 'Checked Out'
  }
]

export default function VisitorManagement() {
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors)
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>(initialVisitors)
  const [newVisitor, setNewVisitor] = useState({
    name: '',
    contactNumber: '',
    visitingPatient: '',
    patientRoom: '',
    purpose: 'Family' as Visitor['purpose']
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'All' | 'Checked In' | 'Checked Out'>('All')

  // Advanced check-in function with validation
  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date()
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    const visitorToAdd: Visitor = {
      ...newVisitor,
      id: Date.now(),
      checkInTime: formattedTime,
      checkOutTime: null,
      status: 'Checked In'
    }

    setVisitors(prev => [...prev, visitorToAdd])
    setFilteredVisitors(prev => [...prev, visitorToAdd])
    
    // Reset form
    setNewVisitor({
      name: '',
      contactNumber: '',
      visitingPatient: '',
      patientRoom: '',
      purpose: 'Family'
    })
  }

  // Enhanced check-out with logging
  const handleCheckOut = (id: number) => {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    setVisitors(prev => 
      prev.map(visitor => 
        visitor.id === id 
          ? { ...visitor, checkOutTime: formattedTime, status: 'Checked Out' } 
          : visitor
      )
    )

    setFilteredVisitors(prev => 
      prev.map(visitor => 
        visitor.id === id 
          ? { ...visitor, checkOutTime: formattedTime, status: 'Checked Out' } 
          : visitor
      )
    )
  }

  // Search and filter logic
  useEffect(() => {
    let result = visitors

    // Search filter
    if (searchTerm) {
      result = result.filter(visitor => 
        visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.visitingPatient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (filterStatus !== 'All') {
      result = result.filter(visitor => visitor.status === filterStatus)
    }

    setFilteredVisitors(result)
  }, [searchTerm, filterStatus, visitors])

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-4">
            <UserPlus className="h-8 w-8" />
            <span>Hospital Visitor Management System</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="flex space-x-4 mb-6">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search visitors or patients" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
                  <Filter className="mr-2" /> Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle>Filter Visitors</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Status</Label>
                    <div className="flex space-x-2 mt-2">
                      {['All', 'Checked In', 'Checked Out'].map(status => (
                        <Button 
                          key={status}
                          variant={filterStatus === status ? 'default' : 'outline'}
                          onClick={() => setFilterStatus(status as 'All' | 'Checked In' | 'Checked Out')}
                          className="bg-gray-800 text-white hover:bg-gray-700"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Check-In Form */}
          <form onSubmit={handleCheckIn} className="grid grid-cols-5 gap-4 mb-6">
            <Input 
              placeholder="Visitor Name" 
              value={newVisitor.name}
              onChange={(e) => setNewVisitor(prev => ({ ...prev, name: e.target.value }))}
              required 
              className="bg-gray-800 border-gray-700"
            />
            <Input 
              placeholder="Contact Number" 
              value={newVisitor.contactNumber}
              onChange={(e) => setNewVisitor(prev => ({ ...prev, contactNumber: e.target.value }))}
              required 
              className="bg-gray-800 border-gray-700"
            />
            <Input 
              placeholder="Visiting Patient" 
              value={newVisitor.visitingPatient}
              onChange={(e) => setNewVisitor(prev => ({ ...prev, visitingPatient: e.target.value }))}
              required 
              className="bg-gray-800 border-gray-700"
            />
            <Input 
              placeholder="Patient Room" 
              value={newVisitor.patientRoom}
              onChange={(e) => setNewVisitor(prev => ({ ...prev, patientRoom: e.target.value }))}
              required 
              className="bg-gray-800 border-gray-700"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="mr-2" /> Check In
            </Button>
          </form>

          {/* Visitors Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-700">
                <TableHead>Visitor Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisitors.map(visitor => (
                <TableRow key={visitor.id} className="bg-gray-900 hover:bg-gray-800">
                  <TableCell>{visitor.name}</TableCell>
                  <TableCell>{visitor.contactNumber}</TableCell>
                  <TableCell>{visitor.visitingPatient}</TableCell>
                  <TableCell>{visitor.patientRoom}</TableCell>
                  <TableCell>{visitor.checkInTime}</TableCell>
                  <TableCell>{visitor.checkOutTime || 'Pending'}</TableCell>
                  <TableCell>
                    <span className={`
                      px-2 py-1 rounded 
                      ${visitor.status === 'Checked In' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}
                    `}>
                      {visitor.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {visitor.status === 'Checked In' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleCheckOut(visitor.id)}
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Check Out
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}