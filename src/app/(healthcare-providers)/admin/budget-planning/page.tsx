'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

// Helper function to format numbers into 'k' format
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return `${num}` // Ensure the return type is always string
}

type BudgetItem = {
  category: string
  amount: number
}

type ForecastData = {
  month: string
  revenue: number
  expenses: number
}

export default function BudgetPlanning() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { category: 'Staff Salaries', amount: 500000 },
    { category: 'Equipment', amount: 200000 },
    { category: 'Medications', amount: 150000 },
    { category: 'Facilities', amount: 100000 },
    { category: 'Other', amount: 50000 },
  ])

  const [newItem, setNewItem] = useState({ category: '', amount: 0 })

  const [forecastData] = useState<ForecastData[]>([
    { month: 'Jan', revenue: 1000000, expenses: 900000 },
    { month: 'Feb', revenue: 1100000, expenses: 950000 },
    { month: 'Mar', revenue: 1200000, expenses: 1000000 },
    { month: 'Apr', revenue: 1300000, expenses: 1100000 },
    { month: 'May', revenue: 1400000, expenses: 1200000 },
    { month: 'Jun', revenue: 1500000, expenses: 1300000 },
  ])

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    setBudgetItems([...budgetItems, newItem])
    setNewItem({ category: '', amount: 0 })
  }

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="w-full min-h-screen bg-[rgb(24,24,27)] text-white p-6 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Header */}
      <header className="w-full text-center mb-8 md:col-span-2">
        <h1 className="text-3xl sm:text-4xl font-bold">AI-Driven Budget Planning</h1>
      </header>

      {/* Budget Allocation Pie Chart */}
      <Card className="bg-[rgba(24,24,27,0.6)] backdrop-blur-lg border border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Current Budget Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={budgetItems}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ value }) => formatNumber(value)}
              >
                {budgetItems.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatNumber(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Financial Forecast Line Chart */}
      <Card className="bg-[rgba(24,24,27,0.6)] backdrop-blur-lg border border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">6-Month Financial Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatNumber(value)} />
              <Tooltip formatter={(value: number) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Add Budget Item */}
      <Card className="bg-[rgba(24,24,27,0.6)] backdrop-blur-lg border border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Add Budget Item</CardTitle>
          <CardDescription>Enter a new budget category and amount</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newItem.amount}
                  onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full sm:w-auto">Add Item</Button>
          </form>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      <Card className="bg-[rgba(24,24,27,0.6)] backdrop-blur-lg border border-gray-700 shadow-lg md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-center">
            Total Budget: {formatNumber(totalBudget)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}