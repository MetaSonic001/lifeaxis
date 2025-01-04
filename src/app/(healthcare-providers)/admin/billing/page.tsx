'use client'

import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  BadgeDollarSign,
  Check,
  Clock,
  Filter,
  Search,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'

// Enhanced Claim Type with more detailed information
type Claim = {
  id: number
  patientName: string
  patientId: string
  service: string
  amount: number
  status: 'Pending' | 'Approved' | 'Rejected'
  claimDate: string
  insuranceProvider?: string
  notes?: string
}

// Mock initial claims with more comprehensive information
const initialClaims: Claim[] = [
  { 
    id: 1, 
    patientName: 'John Doe', 
    patientId: 'P12345',
    service: 'Consultation', 
    amount: 150, 
    status: 'Pending',
    claimDate: '2024-02-15',
    insuranceProvider: 'Blue Cross',
    notes: 'Follow-up required'
  },
  { 
    id: 2, 
    patientName: 'Jane Smith', 
    patientId: 'P67890',
    service: 'X-Ray', 
    amount: 250, 
    status: 'Approved',
    claimDate: '2024-02-10',
    insuranceProvider: 'Aetna'
  },
  { 
    id: 3, 
    patientName: 'Mike Johnson', 
    patientId: 'P54321',
    service: 'Blood Test', 
    amount: 100, 
    status: 'Rejected',
    claimDate: '2024-02-05',
    insuranceProvider: 'Cigna',
    notes: 'Insufficient documentation'
  }
]

export default function BillingAndClaimsManagement() {
  const [claims, setClaims] = useState<Claim[]>(initialClaims)
  const [filteredClaims, setFilteredClaims] = useState<Claim[]>(initialClaims)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<Claim['status'] | 'All'>('All')
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)

  // Advanced claim status change with additional logic
  const handleStatusChange = (id: number, newStatus: Claim['status']) => {
    const updatedClaims = claims.map(claim =>
      claim.id === id ? { ...claim, status: newStatus } : claim
    )
    
    setClaims(updatedClaims)
  }

  // Search and filter logic
  useEffect(() => {
    let result = claims

    // Search filter
    if (searchTerm) {
      result = result.filter(claim => 
        claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.service.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (filterStatus !== 'All') {
      result = result.filter(claim => claim.status === filterStatus)
    }

    setFilteredClaims(result)
  }, [searchTerm, filterStatus, claims])

  // Status badge color mapping
  const getStatusBadgeVariant = (status: Claim['status']) => {
    switch (status) {
      case 'Approved': return 'default'
      case 'Rejected': return 'destructive'
      case 'Pending': return 'secondary'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-4">
            <BadgeDollarSign className="h-8 w-8" />
            <span>Billing and Claims Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search patients, claims, or services" 
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
                  <DialogTitle>Filter Claims</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Status</Label>
                    <div className="flex space-x-2 mt-2">
                      {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                        <Button 
                          key={status}
                          variant={filterStatus === status ? 'default' : 'outline'}
                          onClick={() => setFilterStatus(status as any)}
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

          {/* Claims Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800 hover:bg-gray-700">
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Insurance</TableHead>
                  <TableHead>Claim Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map(claim => (
                  <TableRow key={claim.id} className="bg-gray-900 hover:bg-gray-800">
                    <TableCell>{claim.patientName}</TableCell>
                    <TableCell>{claim.patientId}</TableCell>
                    <TableCell>{claim.service}</TableCell>
                    <TableCell>${claim.amount.toFixed(2)}</TableCell>
                    <TableCell>{claim.insuranceProvider || 'N/A'}</TableCell>
                    <TableCell>{claim.claimDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(claim.status)}>
                        {claim.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={claim.status}
                        onValueChange={(value) => handleStatusChange(claim.id, value as Claim['status'])}
                      >
                        <SelectTrigger className="w-[120px] bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="Pending" className="hover:bg-gray-800">
                            <Clock className="mr-2 h-4 w-4" /> Pending
                          </SelectItem>
                          <SelectItem value="Approved" className="hover:bg-gray-800">
                            <Check className="mr-2 h-4 w-4 text-green-500" /> Approved
                          </SelectItem>
                          <SelectItem value="Rejected" className="hover:bg-gray-800">
                            <X className="mr-2 h-4 w-4 text-red-500" /> Rejected
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
