"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Package, Plus, Calendar, TrendingDown, Search, Pill, Clock, Target, Zap } from 'lucide-react'
import { useState } from "react"

const mockMedications = [
  { id: 1, name: "Ibuprofen", quantity: 500, expirationDate: "2024-12-31", minStock: 200, category: "Pain Relief" },
  { id: 2, name: "Amoxicillin", quantity: 150, expirationDate: "2023-10-15", minStock: 300, category: "Antibiotic" },
  { id: 3, name: "Lisinopril", quantity: 100, expirationDate: "2025-06-30", minStock: 150, category: "Blood Pressure" },
  { id: 4, name: "Metformin", quantity: 300, expirationDate: "2024-08-31", minStock: 200, category: "Diabetes" },
  { id: 5, name: "Aspirin", quantity: 75, expirationDate: "2024-05-15", minStock: 100, category: "Pain Relief" },
]

export default function MedicationManagement() {
  const [medications, setMedications] = useState(mockMedications)
  const [newMedication, setNewMedication] = useState({
    name: "",
    quantity: "",
    expirationDate: "",
    minStock: "",
    category: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.quantity && newMedication.expirationDate) {
      setMedications([
        ...medications,
        {
          ...newMedication,
          id: Date.now(),
          quantity: Number(newMedication.quantity),
          minStock: Number(newMedication.minStock) || 100,
        },
      ])
      setNewMedication({ name: "", quantity: "", expirationDate: "", minStock: "", category: "" })
    }
  }

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const lowStockMedications = medications.filter((med) => med.quantity <= med.minStock)
  const expiringMedications = medications.filter((med) => {
    const expiryDate = new Date(med.expirationDate)
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return expiryDate <= thirtyDaysFromNow
  })

  const getStockStatus = (quantity: number, minStock: number) => {
    const percentage = (quantity / minStock) * 100
    if (percentage <= 50) return { status: "Critical", color: "bg-red-500", textColor: "text-red-700" }
    if (percentage <= 100) return { status: "Low", color: "bg-amber-500", textColor: "text-amber-700" }
    return { status: "Good", color: "bg-green-500", textColor: "text-green-700" }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Medication Management</h1>
            <p className="text-sm text-slate-600">Smart inventory tracking and medication alerts</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-lg">
              <Package className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{medications.length} Items</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-amber-100 rounded-lg">
              <TrendingDown className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">{lowStockMedications.length} Low Stock</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Alert Section */}
            {(lowStockMedications.length > 0 || expiringMedications.length > 0) && (
              <div className="space-y-4">
                {lowStockMedications.length > 0 && (
                  <Alert className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertTitle className="text-red-800">Low Stock Alert</AlertTitle>
                    <AlertDescription className="text-red-700">
                      {lowStockMedications.length} medication(s) are running low:{" "}
                      {lowStockMedications.map((med) => med.name).join(", ")}
                    </AlertDescription>
                  </Alert>
                )}
                {expiringMedications.length > 0 && (
                  <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">Expiration Alert</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      {expiringMedications.length} medication(s) expiring within 30 days:{" "}
                      {expiringMedications.map((med) => med.name).join(", ")}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Medications</p>
                      <p className="text-2xl font-bold text-slate-800">{medications.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Low Stock</p>
                      <p className="text-2xl font-bold text-slate-800">{lowStockMedications.length}</p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Expiring Soon</p>
                      <p className="text-2xl font-bold text-slate-800">{expiringMedications.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Stock</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {medications.reduce((sum, med) => sum + med.quantity, 0)}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add New Medication */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span>Add New Medication</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Add medications to your inventory</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Input
                    placeholder="Medication Name"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                    className="bg-white/80 border-blue-200 focus:border-blue-400"
                  />
                  <Input
                    placeholder="Category"
                    value={newMedication.category}
                    onChange={(e) => setNewMedication({ ...newMedication, category: e.target.value })}
                    className="bg-white/80 border-blue-200 focus:border-blue-400"
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={newMedication.quantity}
                    onChange={(e) => setNewMedication({ ...newMedication, quantity: e.target.value })}
                    className="bg-white/80 border-blue-200 focus:border-blue-400"
                  />
                  <Input
                    type="number"
                    placeholder="Min Stock"
                    value={newMedication.minStock}
                    onChange={(e) => setNewMedication({ ...newMedication, minStock: e.target.value })}
                    className="bg-white/80 border-blue-200 focus:border-blue-400"
                  />
                  <Input
                    type="date"
                    value={newMedication.expirationDate}
                    onChange={(e) => setNewMedication({ ...newMedication, expirationDate: e.target.value })}
                    className="bg-white/80 border-blue-200 focus:border-blue-400"
                  />
                </div>
                <Button
                  onClick={handleAddMedication}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Medication
                </Button>
              </CardContent>
            </Card>

            {/* Search */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search medications or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80 border-slate-200 focus:border-green-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Current Inventory */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="text-slate-800">Current Inventory</CardTitle>
                <CardDescription className="text-slate-600">Overview of medication stock levels</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-slate-100 to-green-100">
                        <TableHead className="text-slate-700 font-semibold">Medication</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Category</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Stock Level</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Expiration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMedications.map((med) => {
                        const stockStatus = getStockStatus(med.quantity, med.minStock)
                        const isExpiringSoon = expiringMedications.some((expiring) => expiring.id === med.id)

                        return (
                          <TableRow
                            key={med.id}
                            className="bg-white/40 hover:bg-green-50/50 border-b border-slate-100 transition-colors"
                          >
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                                  <Package className="w-4 h-4 text-green-700" />
                                </div>
                                <span className="text-slate-800">{med.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-slate-200 text-slate-700">
                                {med.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className={`font-semibold ${stockStatus.textColor}`}>{med.quantity}</span>
                                  <span className="text-xs text-slate-500">/ {med.minStock} min</span>
                                </div>
                                <Progress value={(med.quantity / med.minStock) * 100} className="h-2 w-24" />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col space-y-1">
                                <Badge className={`${stockStatus.color} text-white text-xs`}>{stockStatus.status}</Badge>
                                {isExpiringSoon && (
                                  <Badge className="bg-amber-100 text-amber-700 text-xs">Expiring Soon</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-600">{med.expirationDate}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Inventory Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Pill className="w-5 h-5 text-blue-600" />
                  <span>Inventory Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Total Value</span>
                  <span className="text-lg font-bold text-slate-800">$45,230</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Categories</span>
                  <span className="text-lg font-bold text-slate-800">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Avg Stock Level</span>
                  <span className="text-lg font-bold text-slate-800">78%</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Reorder Needed</span>
                    <Badge className="bg-amber-100 text-amber-700">{lowStockMedications.length} Items</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critical Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Critical Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lowStockMedications.slice(0, 3).map((med) => (
                  <div key={med.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start space-x-2">
                      <TrendingDown className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">{med.name}</p>
                        <p className="text-xs text-red-700">Only {med.quantity} units remaining</p>
                      </div>
                    </div>
                  </div>
                ))}
                {expiringMedications.slice(0, 2).map((med) => (
                  <div key={med.id} className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start space-x-2">
                      <Calendar className="w-4 h-4 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">{med.name}</p>
                        <p className="text-xs text-amber-700">Expires {med.expirationDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Category Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from(new Set(medications.map((med) => med.category))).map((category) => {
                  const categoryMeds = medications.filter((med) => med.category === category)
                  const totalQuantity = categoryMeds.reduce((sum, med) => sum + med.quantity, 0)
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">{category}</span>
                        <span className="text-sm text-slate-600">{categoryMeds.length} items</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>Total: {totalQuantity} units</span>
                        <Badge variant="outline" className="text-xs">
                          {Math.round((totalQuantity / medications.reduce((sum, med) => sum + med.quantity, 0)) * 100)}%
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">Ibuprofen restocked</p>
                    <p className="text-xs text-slate-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">Amoxicillin low stock alert</p>
                    <p className="text-xs text-slate-600">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">New medication added</p>
                    <p className="text-xs text-slate-600">6 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-amber-50 border-amber-200">
                  Generate Reorder Report
                </Button>
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-blue-50 border-blue-200">
                  Export Inventory
                </Button>
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-green-50 border-green-200">
                  Schedule Audit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
