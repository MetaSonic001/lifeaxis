"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  DollarSign,
  CreditCard,
  FileText,
  AlertCircle,
  TrendingUp,
  Calendar,
  Download,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Printer,
} from "lucide-react"

type Invoice = {
  id: string
  patient: string
  amount: number
  status: "paid" | "pending" | "overdue"
  date: string
  service: string
}

type Payment = {
  id: string
  amount: number
  method: string
  date: string
}

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false)
  const [isInvoiceDetailOpen, setIsInvoiceDetailOpen] = useState(false)
  const [isEditInvoiceOpen, setIsEditInvoiceOpen] = useState(false)

  const [billingData, setBillingData] = useState<Invoice[]>([
    { id: "INV-001", patient: "John Smith", amount: 2450.0, status: "paid", date: "2024-01-15", service: "Surgery" },
    {
      id: "INV-002",
      patient: "Sarah Johnson",
      amount: 890.5,
      status: "pending",
      date: "2024-01-14",
      service: "Consultation",
    },
    {
      id: "INV-003",
      patient: "Mike Davis",
      amount: 1200.0,
      status: "overdue",
      date: "2024-01-10",
      service: "Treatment",
    },
    { id: "INV-004", patient: "Emily Brown", amount: 650.75, status: "paid", date: "2024-01-12", service: "Lab Tests" },
    {
      id: "INV-005",
      patient: "Robert Wilson",
      amount: 3200.0,
      status: "pending",
      date: "2024-01-13",
      service: "Emergency Care",
    },
  ])

  const [newInvoice, setNewInvoice] = useState({
    patient: "",
    amount: "",
    service: "",
    date: "",
    notes: "",
  })

  const recentPayments: Payment[] = [
    { id: "PAY-001", amount: 2450.0, method: "Insurance", date: "2024-01-15" },
    { id: "PAY-002", amount: 650.75, method: "Credit Card", date: "2024-01-12" },
    { id: "PAY-003", amount: 890.5, method: "Cash", date: "2024-01-11" },
  ]

  const filteredInvoices = billingData.filter((invoice) => {
    const matchesSearch =
      invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleCreateInvoice = () => {
    if (newInvoice.patient && newInvoice.amount && newInvoice.service && newInvoice.date) {
      const invoice: Invoice = {
        id: `INV-${String(billingData.length + 1).padStart(3, "0")}`,
        patient: newInvoice.patient,
        amount: Number.parseFloat(newInvoice.amount),
        status: "pending",
        date: newInvoice.date,
        service: newInvoice.service,
      }
      setBillingData([...billingData, invoice])
      setNewInvoice({ patient: "", amount: "", service: "", date: "", notes: "" })
      setIsNewInvoiceOpen(false)
    }
  }

  const handleUpdateInvoiceStatus = (invoiceId: string, newStatus: "paid" | "pending" | "overdue") => {
    setBillingData(
      billingData.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice)),
    )
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsInvoiceDetailOpen(true)
  }

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setNewInvoice({
      patient: invoice.patient,
      amount: invoice.amount.toString(),
      service: invoice.service,
      date: invoice.date,
      notes: "",
    })
    setIsEditInvoiceOpen(true)
  }

  const handleSaveEdit = () => {
    if (selectedInvoice && newInvoice.patient && newInvoice.amount && newInvoice.service && newInvoice.date) {
      setBillingData(
        billingData.map((invoice) =>
          invoice.id === selectedInvoice.id
            ? {
                ...invoice,
                patient: newInvoice.patient,
                amount: Number.parseFloat(newInvoice.amount),
                service: newInvoice.service,
                date: newInvoice.date,
              }
            : invoice,
        ),
      )
      setIsEditInvoiceOpen(false)
      setSelectedInvoice(null)
      setNewInvoice({ patient: "", amount: "", service: "", date: "", notes: "" })
    }
  }

  const handleExportData = () => {
    const csvContent = [
      ["Invoice ID", "Patient", "Service", "Amount", "Status", "Date"],
      ...filteredInvoices.map((invoice) => [
        invoice.id,
        invoice.patient,
        invoice.service,
        invoice.amount.toString(),
        invoice.status,
        invoice.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "billing_data.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleSendReminder = (invoice: Invoice) => {
    // Simulate sending payment reminder
    alert(`Payment reminder sent to ${invoice.patient} for invoice ${invoice.id}`)
  }

  const handlePrintInvoice = (invoice: Invoice) => {
    // Simulate printing invoice
    alert(`Printing invoice ${invoice.id} for ${invoice.patient}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const totalRevenue = billingData.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0)
  const totalOutstanding = billingData.filter((inv) => inv.status !== "paid").reduce((sum, inv) => sum + inv.amount, 0)
  const totalOverdue = billingData.filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/20 bg-white/30 backdrop-blur-md px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-600" />
          <h1 className="text-xl font-semibold text-slate-800">Billing & Payments</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area - 8 columns */}
          <div className="col-span-8 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-t-lg">
                  <CardTitle className="text-sm font-medium text-slate-700">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">${totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-slate-600">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-t-lg">
                  <CardTitle className="text-sm font-medium text-slate-700">Outstanding</CardTitle>
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">${totalOutstanding.toFixed(2)}</div>
                  <p className="text-xs text-slate-600">
                    {billingData.filter((inv) => inv.status !== "paid").length} pending invoices
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-t-lg">
                  <CardTitle className="text-sm font-medium text-slate-700">Overdue</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">${totalOverdue.toFixed(2)}</div>
                  <p className="text-xs text-slate-600">
                    {billingData.filter((inv) => inv.status === "overdue").length} overdue invoice(s)
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-t-lg">
                  <CardTitle className="text-sm font-medium text-slate-700">This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">${(totalRevenue * 0.3).toFixed(2)}</div>
                  <p className="text-xs text-slate-600">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Billing Management */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-800">Invoice Management</CardTitle>
                    <CardDescription className="text-slate-600">Manage patient billing and invoices</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          New Invoice
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white/95 backdrop-blur-sm">
                        <DialogHeader>
                          <DialogTitle>Create New Invoice</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="patient">Patient Name</Label>
                            <Input
                              id="patient"
                              value={newInvoice.patient}
                              onChange={(e) => setNewInvoice({ ...newInvoice, patient: e.target.value })}
                              placeholder="Enter patient name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="service">Service</Label>
                            <Input
                              id="service"
                              value={newInvoice.service}
                              onChange={(e) => setNewInvoice({ ...newInvoice, service: e.target.value })}
                              placeholder="Enter service description"
                            />
                          </div>
                          <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                              id="amount"
                              type="number"
                              step="0.01"
                              value={newInvoice.amount}
                              onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                              placeholder="Enter amount"
                            />
                          </div>
                          <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={newInvoice.date}
                              onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                              id="notes"
                              value={newInvoice.notes}
                              onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
                              placeholder="Additional notes"
                            />
                          </div>
                          <Button onClick={handleCreateInvoice} className="w-full">
                            Create Invoice
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Invoice Table */}
                <div className="space-y-4">
                  {filteredInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 bg-white/40 rounded-lg border border-white/30"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium text-slate-800">{invoice.id}</div>
                          <div className="text-sm text-slate-600">{invoice.patient}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Service</div>
                          <div className="font-medium text-slate-800">{invoice.service}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Amount</div>
                          <div className="font-medium text-slate-800">${invoice.amount.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Date</div>
                          <div className="font-medium text-slate-800">{invoice.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Select
                          value={invoice.status}
                          onValueChange={(value) =>
                            handleUpdateInvoiceStatus(invoice.id, value as "paid" | "pending" | "overdue")
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(invoice)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditInvoice(invoice)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handlePrintInvoice(invoice)}>
                            <Printer className="h-4 w-4" />
                          </Button>
                          {invoice.status !== "paid" && (
                            <Button variant="ghost" size="sm" onClick={() => handleSendReminder(invoice)}>
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - 4 columns */}
          <div className="col-span-4 space-y-6">
            {/* Payment Summary */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-t-lg">
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Collected</span>
                    <span className="font-semibold text-slate-800">${totalRevenue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Pending</span>
                    <span className="font-semibold text-yellow-600">
                      ${(totalOutstanding - totalOverdue).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Overdue</span>
                    <span className="font-semibold text-red-600">${totalOverdue.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-slate-800">Total Outstanding</span>
                    <span className="font-bold text-slate-800">${totalOutstanding.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-t-lg">
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Recent Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-white/40 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-800">${payment.amount.toFixed(2)}</div>
                        <div className="text-sm text-slate-600">{payment.method}</div>
                      </div>
                      <div className="text-sm text-slate-600">{payment.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-t-lg">
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Insurance</span>
                    <span className="font-semibold text-slate-800">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Credit Card</span>
                    <span className="font-semibold text-slate-800">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cash</span>
                    <span className="font-semibold text-slate-800">8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Other</span>
                    <span className="font-semibold text-slate-800">2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader className="bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-t-lg">
                <CardTitle className="text-slate-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="ghost" onClick={() => setIsNewInvoiceOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="ghost"
                    onClick={() => alert("Generating monthly billing report...")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="ghost"
                    onClick={() => alert("Sending payment reminders to overdue accounts...")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Payment Reminders
                  </Button>
                  <Button className="w-full justify-start" variant="ghost" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Invoice Detail Dialog */}
      <Dialog open={isInvoiceDetailOpen} onOpenChange={setIsInvoiceDetailOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Invoice ID</Label>
                  <div className="font-medium">{selectedInvoice.id}</div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedInvoice.status)}>
                    {getStatusIcon(selectedInvoice.status)}
                    {selectedInvoice.status}
                  </Badge>
                </div>
                <div>
                  <Label>Patient</Label>
                  <div className="font-medium">{selectedInvoice.patient}</div>
                </div>
                <div>
                  <Label>Service</Label>
                  <div className="font-medium">{selectedInvoice.service}</div>
                </div>
                <div>
                  <Label>Amount</Label>
                  <div className="font-medium">${selectedInvoice.amount.toFixed(2)}</div>
                </div>
                <div>
                  <Label>Date</Label>
                  <div className="font-medium">{selectedInvoice.date}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handlePrintInvoice(selectedInvoice)}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                {selectedInvoice.status !== "paid" && (
                  <Button variant="outline" onClick={() => handleSendReminder(selectedInvoice)}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Reminder
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Invoice Dialog */}
      <Dialog open={isEditInvoiceOpen} onOpenChange={setIsEditInvoiceOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-patient">Patient Name</Label>
              <Input
                id="edit-patient"
                value={newInvoice.patient}
                onChange={(e) => setNewInvoice({ ...newInvoice, patient: e.target.value })}
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <Label htmlFor="edit-service">Service</Label>
              <Input
                id="edit-service"
                value={newInvoice.service}
                onChange={(e) => setNewInvoice({ ...newInvoice, service: e.target.value })}
                placeholder="Enter service description"
              />
            </div>
            <div>
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                placeholder="Enter amount"
              />
            </div>
            <div>
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={newInvoice.date}
                onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
              />
            </div>
            <Button onClick={handleSaveEdit} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
