
"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  Download,
  Eye,
  Calendar,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BillingPage() {
  const [bills, setBills] = useState([]);
  const [payments, setPayments] = useState([]);
  const [insurance, setInsurance] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Initialize with sample billing data
    const sampleBills = [
      {
        id: 1,
        date: "2025-06-25",
        description: "Annual Physical Examination",
        doctor: "Dr. Sarah Johnson",
        amount: 350.00,
        insuranceCovered: 280.00,
        patientResponsibility: 70.00,
        status: "paid",
        dueDate: "2025-07-25",
      },
      {
        id: 2,
        date: "2025-06-20",
        description: "Blood Work - Comprehensive Panel",
        doctor: "Dr. Michael Chen",
        amount: 225.00,
        insuranceCovered: 180.00,
        patientResponsibility: 45.00,
        status: "pending",
        dueDate: "2025-07-20",
      },
      {
        id: 3,
        date: "2025-06-15",
        description: "Chest X-Ray",
        doctor: "Dr. Emily Davis",
        amount: 150.00,
        insuranceCovered: 120.00,
        patientResponsibility: 30.00,
        status: "overdue",
        dueDate: "2025-07-15",
      },
    ];

    const samplePayments = [
      {
        id: 1,
        date: "2025-06-26",
        amount: 70.00,
        method: "Credit Card",
        billId: 1,
        status: "completed",
      },
      {
        id: 2,
        date: "2025-05-15",
        amount: 85.00,
        method: "Bank Transfer",
        billId: null,
        status: "completed",
      },
    ];

    const sampleInsurance = {
      provider: "Blue Cross Blue Shield",
      plan: "Premium Health Plan",
      memberId: "BC123456789",
      groupNumber: "GRP789456",
      effectiveDate: "2025-01-01",
      expirationDate: "2025-12-31",
      copay: "$25",
      deductible: "$1,500",
      deductibleMet: "$750",
      outOfPocketMax: "$5,000",
      outOfPocketMet: "$850",
    };

    setBills(sampleBills);
    setPayments(samplePayments);
    setInsurance(sampleInsurance);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending": return <Clock className="w-5 h-5 text-yellow-600" />;
      case "overdue": return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || bill.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalOwed = bills.reduce((sum, bill) => {
    return bill.status !== "paid" ? sum + bill.patientResponsibility : sum;
  }, 0);

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <CreditCard className="w-8 h-8 mr-3 text-green-600" />
            Billing & Insurance
          </h1>
          <p className="text-gray-600 mt-2">Manage your healthcare expenses and insurance information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Statements
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">${totalOwed.toFixed(2)}</div>
            <div className="text-sm text-red-600">Amount Owed</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">${totalPaid.toFixed(2)}</div>
            <div className="text-sm text-green-600">Total Paid</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">${insurance?.deductibleMet || 0}</div>
            <div className="text-sm text-blue-600">Deductible Met</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{bills.length}</div>
            <div className="text-sm text-purple-600">Total Bills</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bills" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bills">Bills & Statements</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Info</TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search bills..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="p-2 border border-gray-300 rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Bills List */}
          <div className="space-y-4">
            {filteredBills.map((bill) => (
              <Card key={bill.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(bill.status)}
                      <div>
                        <h3 className="text-lg font-semibold">{bill.description}</h3>
                        <p className="text-gray-600">{bill.doctor}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Service: {bill.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Due: {bill.dueDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="space-y-1 mb-3">
                        <div className="text-sm text-gray-600">
                          Total: <span className="font-semibold">${bill.amount.toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-green-600">
                          Insurance: -${bill.insuranceCovered.toFixed(2)}
                        </div>
                        <div className="text-lg font-bold text-red-600">
                          You owe: ${bill.patientResponsibility.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(bill.status)}>
                          {bill.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {bill.status !== "paid" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">${payment.amount.toFixed(2)}</div>
                        <div className="text-sm text-gray-600">
                          {payment.date} • {payment.method}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">
                        {payment.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-6">
          {insurance && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Insurance Provider</label>
                        <div className="text-lg font-semibold">{insurance.provider}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Plan Name</label>
                        <div className="text-lg font-semibold">{insurance.plan}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Member ID</label>
                        <div className="text-lg font-semibold">{insurance.memberId}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Group Number</label>
                        <div className="text-lg font-semibold">{insurance.groupNumber}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Coverage Period</label>
                        <div className="text-lg font-semibold">
                          {insurance.effectiveDate} - {insurance.expirationDate}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Copay</label>
                        <div className="text-lg font-semibold">{insurance.copay}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Annual Deductible</label>
                        <div className="text-lg font-semibold">
                          {insurance.deductible} (${insurance.deductibleMet} met)
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Out-of-Pocket Maximum</label>
                        <div className="text-lg font-semibold">
                          {insurance.outOfPocketMax} (${insurance.outOfPocketMet} met)
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Coverage Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-600 font-medium">Deductible Progress</div>
                      <div className="text-2xl font-bold text-blue-700">
                        ${insurance.deductibleMet} / {insurance.deductible}
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(750 / 1500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600 font-medium">Out-of-Pocket Progress</div>
                      <div className="text-2xl font-bold text-green-700">
                        ${insurance.outOfPocketMet} / {insurance.outOfPocketMax}
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(850 / 5000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
