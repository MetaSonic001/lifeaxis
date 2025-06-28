"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, TrendingUp, TrendingDown, Plus, Calculator, Target, AlertTriangle, Clock, Zap } from 'lucide-react'

type BudgetItem = {
  id: number
  category: string
  allocated: number
  spent: number
  remaining: number
  department: string
  priority: "High" | "Medium" | "Low"
}

type Expense = {
  id: number
  description: string
  amount: number
  category: string
  date: string
  status: "Approved" | "Pending" | "Rejected"
}

const initialBudgetItems: BudgetItem[] = [
  {
    id: 1,
    category: "Medical Equipment",
    allocated: 500000,
    spent: 320000,
    remaining: 180000,
    department: "General",
    priority: "High",
  },
  {
    id: 2,
    category: "Staff Salaries",
    allocated: 2000000,
    spent: 1800000,
    remaining: 200000,
    department: "HR",
    priority: "High",
  },
  {
    id: 3,
    category: "Medications",
    allocated: 300000,
    spent: 180000,
    remaining: 120000,
    department: "Pharmacy",
    priority: "High",
  },
  {
    id: 4,
    category: "Facility Maintenance",
    allocated: 150000,
    spent: 95000,
    remaining: 55000,
    department: "Facilities",
    priority: "Medium",
  },
  {
    id: 5,
    category: "IT Infrastructure",
    allocated: 200000,
    spent: 140000,
    remaining: 60000,
    department: "IT",
    priority: "Medium",
  },
  {
    id: 6,
    category: "Training & Development",
    allocated: 75000,
    spent: 35000,
    remaining: 40000,
    department: "HR",
    priority: "Low",
  },
]

const initialExpenses: Expense[] = [
  {
    id: 1,
    description: "MRI Machine Maintenance",
    amount: 15000,
    category: "Medical Equipment",
    date: "2024-01-15",
    status: "Approved",
  },
  {
    id: 2,
    description: "Nursing Staff Overtime",
    amount: 8500,
    category: "Staff Salaries",
    date: "2024-01-14",
    status: "Approved",
  },
  {
    id: 3,
    description: "Emergency Medications",
    amount: 12000,
    category: "Medications",
    date: "2024-01-13",
    status: "Pending",
  },
  {
    id: 4,
    description: "HVAC System Repair",
    amount: 6500,
    category: "Facility Maintenance",
    date: "2024-01-12",
    status: "Approved",
  },
  {
    id: 5,
    description: "Network Security Upgrade",
    amount: 18000,
    category: "IT Infrastructure",
    date: "2024-01-11",
    status: "Pending",
  },
]

const monthlyData = [
  { month: "Jan", budget: 450000, actual: 420000, forecast: 440000 },
  { month: "Feb", budget: 450000, actual: 465000, forecast: 455000 },
  { month: "Mar", budget: 450000, actual: 435000, forecast: 445000 },
  { month: "Apr", budget: 450000, actual: 480000, forecast: 470000 },
  { month: "May", budget: 450000, actual: 445000, forecast: 450000 },
  { month: "Jun", budget: 450000, actual: 455000, forecast: 460000 },
]

export default function BudgetPlanning() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initialBudgetItems)
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [newBudgetItem, setNewBudgetItem] = useState({
    category: "",
    allocated: "",
    department: "",
    priority: "Medium" as BudgetItem["priority"],
  })
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
  })

  const handleAddBudgetItem = () => {
    if (newBudgetItem.category && newBudgetItem.allocated && newBudgetItem.department) {
      const allocated = Number(newBudgetItem.allocated)
      const budgetToAdd: BudgetItem = {
        id: budgetItems.length + 1,
        category: newBudgetItem.category,
        allocated,
        spent: 0,
        remaining: allocated,
        department: newBudgetItem.department,
        priority: newBudgetItem.priority,
      }
      setBudgetItems([...budgetItems, budgetToAdd])
      setNewBudgetItem({ category: "", allocated: "", department: "", priority: "Medium" })
    }
  }

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      const expenseToAdd: Expense = {
        id: expenses.length + 1,
        description: newExpense.description,
        amount: Number(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
      }
      setExpenses([...expenses, expenseToAdd])
      setNewExpense({ description: "", amount: "", category: "" })
    }
  }

  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated, 0)
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0)
  const totalRemaining = budgetItems.reduce((sum, item) => sum + item.remaining, 0)
  const budgetUtilization = (totalSpent / totalAllocated) * 100

  const getPriorityColor = (priority: BudgetItem["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200"
      case "Medium":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200"
      case "Low":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status: Expense["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200"
      case "Pending":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200"
      case "Rejected":
        return "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const pieData = budgetItems.map((item) => ({
    name: item.category,
    value: item.allocated,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
  }))

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Budget Planning</h1>
            <p className="text-sm text-slate-600">AI-driven financial planning and budget management</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-orange-100 rounded-lg">
              <DollarSign className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">${(totalAllocated / 1000000).toFixed(1)}M Budget</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-lg">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{budgetUtilization.toFixed(1)}% Used</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Budget</p>
                      <p className="text-2xl font-bold text-slate-800">${(totalAllocated / 1000000).toFixed(1)}M</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Spent</p>
                      <p className="text-2xl font-bold text-slate-800">${(totalSpent / 1000000).toFixed(1)}M</p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Remaining</p>
                      <p className="text-2xl font-bold text-slate-800">${(totalRemaining / 1000000).toFixed(1)}M</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Utilization</p>
                      <p className="text-2xl font-bold text-slate-800">{budgetUtilization.toFixed(1)}%</p>
                    </div>
                    <Calculator className="w-8 h-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  Budget Overview
                </TabsTrigger>
                <TabsTrigger value="categories" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Budget Categories
                </TabsTrigger>
                <TabsTrigger value="expenses" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  Expense Tracking
                </TabsTrigger>
              </TabsList>

              {/* Budget Overview Tab */}
              <TabsContent value="overview">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                      <CardTitle className="text-slate-800">Monthly Budget vs Actual</CardTitle>
                      <CardDescription className="text-slate-600">Track budget performance over time</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="month" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                              backdropFilter: "blur(4px)",
                            }}
                          />
                          <Line type="monotone" dataKey="budget" stroke="#f59e0b" strokeWidth={2} name="Budget" />
                          <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                          <Line
                            type="monotone"
                            dataKey="forecast"
                            stroke="#10b981"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Forecast"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                      <CardTitle className="text-slate-800">Budget Distribution</CardTitle>
                      <CardDescription className="text-slate-600">Allocation across categories</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, "Budget"]}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                              backdropFilter: "blur(4px)",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Budget Categories Tab */}
              <TabsContent value="categories">
                <div className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2 text-slate-800">
                        <Plus className="w-5 h-5 text-blue-600" />
                        <span>Add Budget Category</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input
                          placeholder="Category Name"
                          value={newBudgetItem.category}
                          onChange={(e) => setNewBudgetItem({ ...newBudgetItem, category: e.target.value })}
                          className="bg-white/80 border-blue-200 focus:border-blue-400"
                        />
                        <Input
                          type="number"
                          placeholder="Allocated Amount"
                          value={newBudgetItem.allocated}
                          onChange={(e) => setNewBudgetItem({ ...newBudgetItem, allocated: e.target.value })}
                          className="bg-white/80 border-blue-200 focus:border-blue-400"
                        />
                        <Input
                          placeholder="Department"
                          value={newBudgetItem.department}
                          onChange={(e) => setNewBudgetItem({ ...newBudgetItem, department: e.target.value })}
                          className="bg-white/80 border-blue-200 focus:border-blue-400"
                        />
                        <Select
                          value={newBudgetItem.priority}
                          onValueChange={(value) =>
                            setNewBudgetItem({ ...newBudgetItem, priority: value as BudgetItem["priority"] })
                          }
                        >
                          <SelectTrigger className="bg-white/80 border-blue-200">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-sm">
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={handleAddBudgetItem}
                        className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Budget Item
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
                      <CardTitle className="text-slate-800">Budget Categories</CardTitle>
                      <CardDescription className="text-slate-600">
                        Manage budget allocation across departments
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gradient-to-r from-slate-100 to-blue-100">
                              <TableHead className="text-slate-700 font-semibold">Category</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Department</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Allocated</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Spent</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Remaining</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Utilization</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Priority</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {budgetItems.map((item) => {
                              const utilization = (item.spent / item.allocated) * 100
                              return (
                                <TableRow key={item.id} className="bg-white/40 hover:bg-blue-50/50 transition-colors">
                                  <TableCell className="font-medium text-slate-800">{item.category}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className="border-slate-200 text-slate-700">
                                      {item.department}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-slate-600">${item.allocated.toLocaleString()}</TableCell>
                                  <TableCell className="text-slate-600">${item.spent.toLocaleString()}</TableCell>
                                  <TableCell className="text-slate-600">${item.remaining.toLocaleString()}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center space-x-2">
                                      <Progress value={utilization} className="w-16 h-2" />
                                      <span className="text-sm font-medium text-slate-600">{utilization.toFixed(1)}%</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Expense Tracking Tab */}
              <TabsContent value="expenses">
                <div className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2 text-slate-800">
                        <Plus className="w-5 h-5 text-green-600" />
                        <span>Add New Expense</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Expense Description"
                          value={newExpense.description}
                          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                          className="bg-white/80 border-green-200 focus:border-green-400"
                        />
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={newExpense.amount}
                          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                          className="bg-white/80 border-green-200 focus:border-green-400"
                        />
                        <Select
                          value={newExpense.category}
                          onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                        >
                          <SelectTrigger className="bg-white/80 border-green-200">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-sm">
                            {budgetItems.map((item) => (
                              <SelectItem key={item.id} value={item.category}>
                                {item.category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={handleAddExpense}
                        className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Expense
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50 rounded-t-lg">
                      <CardTitle className="text-slate-800">Recent Expenses</CardTitle>
                      <CardDescription className="text-slate-600">Track and approve expense requests</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gradient-to-r from-slate-100 to-green-100">
                              <TableHead className="text-slate-700 font-semibold">Description</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Amount</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Category</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Date</TableHead>
                              <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {expenses.map((expense) => (
                              <TableRow key={expense.id} className="bg-white/40 hover:bg-green-50/50 transition-colors">
                                <TableCell className="font-medium text-slate-800">{expense.description}</TableCell>
                                <TableCell className="text-slate-600">${expense.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="border-slate-200 text-slate-700">
                                    {expense.category}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-slate-600">{expense.date}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Budget Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Budget Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Total Allocated</span>
                  <span className="text-lg font-bold text-slate-800">${(totalAllocated / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Total Spent</span>
                  <span className="text-lg font-bold text-red-600">${(totalSpent / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Remaining</span>
                  <span className="text-lg font-bold text-green-600">${(totalRemaining / 1000000).toFixed(1)}M</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Utilization Rate</span>
                    <Badge className="bg-blue-100 text-blue-700">{budgetUtilization.toFixed(1)}%</Badge>
                  </div>
                  <Progress value={budgetUtilization} className="mt-2 h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Budget Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Budget Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {budgetItems
                  .filter((item) => item.spent / item.allocated > 0.8)
                  .map((item) => {
                    const utilization = (item.spent / item.allocated) * 100
                    return (
                      <div
                        key={item.id}
                        className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-slate-800">{item.category}</h4>
                          <Badge className="bg-amber-100 text-amber-700">{utilization.toFixed(1)}% Used</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>Spent: ${item.spent.toLocaleString()}</span>
                          <span>Budget: ${item.allocated.toLocaleString()}</span>
                        </div>
                        <Progress value={utilization} className="mt-2 h-1" />
                      </div>
                    )
                  })}
                {budgetItems.filter((item) => item.spent / item.allocated > 0.8).length === 0 && (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-slate-500">All budgets within limits</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Department Spending */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <span>Department Spending</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from(new Set(budgetItems.map((item) => item.department))).map((department) => {
                  const deptItems = budgetItems.filter((item) => item.department === department)
                  const deptSpent = deptItems.reduce((sum, item) => sum + item.spent, 0)
                  const deptAllocated = deptItems.reduce((sum, item) => sum + item.allocated, 0)
                  const deptUtilization = (deptSpent / deptAllocated) * 100
                  return (
                    <div key={department} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">{department}</span>
                        <span className="text-sm text-slate-600">{deptUtilization.toFixed(1)}%</span>
                      </div>
                      <Progress value={deptUtilization} className="h-2" />
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Spent: ${(deptSpent / 1000).toFixed(0)}K</span>
                        <span>Budget: ${(deptAllocated / 1000).toFixed(0)}K</span>
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
                    <p className="text-sm text-slate-800">Budget approved for IT Infrastructure</p>
                    <p className="text-xs text-slate-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">Medical Equipment budget 80% utilized</p>
                    <p className="text-xs text-slate-600">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">Monthly budget report generated</p>
                    <p className="text-xs text-slate-600">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Zap className="w-5 h-5 text-slate-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-blue-50 border-blue-200">
                  Generate Budget Report
                </Button>
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-green-50 border-green-200">
                  Export Financial Data
                </Button>
                <Button variant="outline" className="w-full bg-white/80 text-slate-700 hover:bg-purple-50 border-purple-200">
                  Schedule Review Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
