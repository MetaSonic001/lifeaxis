"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, AlertTriangle, Search, Plus, Minus, BarChart3, RefreshCw, ShoppingCart, Clock } from "lucide-react"
import { useState } from "react"

type InventoryItem = {
  id: number
  name: string
  category: "medication" | "supplies" | "equipment" | "consumables"
  currentStock: number
  minThreshold: number
  maxCapacity: number
  unit: string
  location: string
  lastRestocked: string
  expiryDate?: string
  status: "in-stock" | "low" | "critical" | "expired"
  cost: number
}

const mockInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Morphine 10mg",
    category: "medication",
    currentStock: 45,
    minThreshold: 20,
    maxCapacity: 100,
    unit: "vials",
    location: "Pharmacy-A1",
    lastRestocked: "2024-01-15",
    expiryDate: "2024-06-15",
    status: "in-stock",
    cost: 25.5,
  },
  {
    id: 2,
    name: "Surgical Gloves",
    category: "supplies",
    currentStock: 15,
    minThreshold: 50,
    maxCapacity: 500,
    unit: "boxes",
    location: "Supply-B2",
    lastRestocked: "2024-01-10",
    status: "critical",
    cost: 12.99,
  },
  {
    id: 3,
    name: "IV Bags (Saline)",
    category: "supplies",
    currentStock: 85,
    minThreshold: 30,
    maxCapacity: 200,
    unit: "bags",
    location: "Supply-C1",
    lastRestocked: "2024-01-18",
    status: "in-stock",
    cost: 8.75,
  },
  {
    id: 4,
    name: "Blood Pressure Cuff",
    category: "equipment",
    currentStock: 8,
    minThreshold: 5,
    maxCapacity: 15,
    unit: "units",
    location: "Equipment-D1",
    lastRestocked: "2023-12-20",
    status: "in-stock",
    cost: 145.0,
  },
  {
    id: 5,
    name: "Disposable Syringes",
    category: "consumables",
    currentStock: 25,
    minThreshold: 100,
    maxCapacity: 1000,
    unit: "packs",
    location: "Supply-A3",
    lastRestocked: "2024-01-12",
    status: "low",
    cost: 15.25,
  },
]

export default function InventoryTracking() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [filter, setFilter] = useState<"all" | "medication" | "supplies" | "equipment" | "consumables">("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "in-stock" | "low" | "critical" | "expired">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [showAddItem, setShowAddItem] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [newItem, setNewItem] = useState({
    name: "",
    category: "supplies" as "medication" | "supplies" | "equipment" | "consumables",
    currentStock: 0,
    minThreshold: 0,
    maxCapacity: 0,
    unit: "",
    location: "",
    cost: 0,
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleStockUpdate = (id: number, change: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, Math.min(item.maxCapacity, item.currentStock + change))
          let newStatus: "in-stock" | "low" | "critical" | "expired" = "in-stock"

          if (newStock === 0) {
            newStatus = "critical"
          } else if (newStock <= item.minThreshold) {
            newStatus = "low"
          }

          return { ...item, currentStock: newStock, status: newStatus }
        }
        return item
      }),
    )
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    const item: InventoryItem = {
      id: inventory.length + 1,
      ...newItem,
      lastRestocked: new Date().toISOString().split("T")[0],
      status: newItem.currentStock <= newItem.minThreshold ? "low" : "in-stock",
    }
    setInventory([...inventory, item])
    setNewItem({
      name: "",
      category: "supplies",
      currentStock: 0,
      minThreshold: 0,
      maxCapacity: 0,
      unit: "",
      location: "",
      cost: 0,
    })
    setShowAddItem(false)
  }

  const handleReorder = (item: InventoryItem) => {
    const orderQuantity = item.maxCapacity - item.currentStock
    alert(
      `Reorder request sent for ${item.name}\nQuantity: ${orderQuantity} ${item.unit}\nEstimated cost: $${(orderQuantity * item.cost).toFixed(2)}`,
    )
  }

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "low":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "expired":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "in-stock":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medication":
        return "bg-blue-100 text-blue-800"
      case "supplies":
        return "bg-green-100 text-green-800"
      case "equipment":
        return "bg-purple-100 text-purple-800"
      case "consumables":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStockPercentage = (item: InventoryItem) => {
    return (item.currentStock / item.maxCapacity) * 100
  }

  const totalItems = inventory.length
  const lowStockItems = inventory.filter((item) => item.status === "low" || item.status === "critical").length
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * item.cost, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Inventory Tracking System</h1>
            <p className="text-slate-600">Monitor and manage medical supplies and equipment</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setShowAddItem(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Items</p>
                <p className="text-2xl font-bold text-blue-800">{totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Low Stock</p>
                <p className="text-2xl font-bold text-red-800">{lowStockItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Value</p>
                <p className="text-2xl font-bold text-green-800">${totalValue.toFixed(0)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Reorders</p>
                <p className="text-2xl font-bold text-purple-800">{lowStockItems}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search items or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="medication">Medication</option>
            <option value="supplies">Supplies</option>
            <option value="equipment">Equipment</option>
            <option value="consumables">Consumables</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low">Low Stock</option>
            <option value="critical">Critical</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInventory.map((item) => (
          <Card
            key={item.id}
            className="bg-white shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold text-slate-800 mb-2">{item.name}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                      {item.category.toUpperCase()}
                    </Badge>
                    <Badge className={`${getStatusColor(item.status)} border text-xs`}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">Location: {item.location}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stock Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Stock Level</span>
                  <span className="text-sm text-slate-600">
                    {item.currentStock} / {item.maxCapacity} {item.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.status === "critical"
                        ? "bg-red-500"
                        : item.status === "low"
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${Math.max(5, getStockPercentage(item))}%` }}
                  ></div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Min Threshold</p>
                  <p className="font-medium text-slate-800">
                    {item.minThreshold} {item.unit}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Unit Cost</p>
                  <p className="font-medium text-slate-800">${item.cost}</p>
                </div>
                <div>
                  <p className="text-slate-600">Last Restocked</p>
                  <p className="font-medium text-slate-800">{item.lastRestocked}</p>
                </div>
                <div>
                  <p className="text-slate-600">Total Value</p>
                  <p className="font-medium text-slate-800">${(item.currentStock * item.cost).toFixed(2)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStockUpdate(item.id, -1)}
                    disabled={item.currentStock === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStockUpdate(item.id, 1)}
                    disabled={item.currentStock >= item.maxCapacity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  {(item.status === "low" || item.status === "critical") && (
                    <Button size="sm" onClick={() => handleReorder(item)} className="bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Reorder
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => setSelectedItem(item)}>
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Item</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAddItem(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddItem} className="space-y-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  required
                />

                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="medication">Medication</option>
                  <option value="supplies">Supplies</option>
                  <option value="equipment">Equipment</option>
                  <option value="consumables">Consumables</option>
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Current Stock"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({ ...newItem, currentStock: Number(e.target.value) })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    min="0"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Min Threshold"
                    value={newItem.minThreshold}
                    onChange={(e) => setNewItem({ ...newItem, minThreshold: Number(e.target.value) })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    min="0"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Max Capacity"
                    value={newItem.maxCapacity}
                    onChange={(e) => setNewItem({ ...newItem, maxCapacity: Number(e.target.value) })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    min="1"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Unit (e.g., boxes)"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Location"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  required
                />

                <input
                  type="number"
                  placeholder="Unit Cost ($)"
                  value={newItem.cost}
                  onChange={(e) => setNewItem({ ...newItem, cost: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  min="0"
                  step="0.01"
                  required
                />

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Add Item
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Item Details: {selectedItem.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Category</p>
                    <Badge className={`${getCategoryColor(selectedItem.category)} mt-1`}>
                      {selectedItem.category.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Status</p>
                    <Badge className={`${getStatusColor(selectedItem.status)} border mt-1`}>
                      {selectedItem.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Location</p>
                    <p className="text-lg text-slate-800">{selectedItem.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Last Restocked</p>
                    <p className="text-lg text-slate-800">{selectedItem.lastRestocked}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Stock Information</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">Current Stock</p>
                      <p className="text-2xl font-bold text-blue-800">{selectedItem.currentStock}</p>
                      <p className="text-xs text-blue-600">{selectedItem.unit}</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <p className="text-sm font-medium text-amber-700">Min Threshold</p>
                      <p className="text-2xl font-bold text-amber-800">{selectedItem.minThreshold}</p>
                      <p className="text-xs text-amber-600">{selectedItem.unit}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Max Capacity</p>
                      <p className="text-2xl font-bold text-green-800">{selectedItem.maxCapacity}</p>
                      <p className="text-xs text-green-600">{selectedItem.unit}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={() => handleReorder(selectedItem)} className="bg-blue-600 hover:bg-blue-700">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Reorder
                  </Button>
                  <Button variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    View History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
