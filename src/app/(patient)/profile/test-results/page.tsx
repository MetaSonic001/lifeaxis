
"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  TestTube,
  Activity,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function TestResultsPage() {
  const [testResults, setTestResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Initialize with sample test results
    const sampleResults = [
      {
        id: 1,
        testName: "Complete Blood Count (CBC)",
        date: "2025-06-25",
        doctor: "Dr. Sarah Johnson",
        status: "normal",
        category: "Blood Work",
        results: [
          { parameter: "White Blood Cells", value: "7.2", unit: "K/uL", range: "4.0-11.0", status: "normal" },
          { parameter: "Red Blood Cells", value: "4.8", unit: "M/uL", range: "4.2-5.4", status: "normal" },
          { parameter: "Hemoglobin", value: "14.2", unit: "g/dL", range: "12.0-16.0", status: "normal" },
          { parameter: "Hematocrit", value: "42.1", unit: "%", range: "36.0-46.0", status: "normal" },
          { parameter: "Platelets", value: "285", unit: "K/uL", range: "150-450", status: "normal" },
        ],
      },
      {
        id: 2,
        testName: "Lipid Panel",
        date: "2025-06-20",
        doctor: "Dr. Michael Chen",
        status: "attention",
        category: "Blood Work",
        results: [
          { parameter: "Total Cholesterol", value: "210", unit: "mg/dL", range: "<200", status: "high" },
          { parameter: "LDL Cholesterol", value: "135", unit: "mg/dL", range: "<100", status: "high" },
          { parameter: "HDL Cholesterol", value: "45", unit: "mg/dL", range: ">40", status: "normal" },
          { parameter: "Triglycerides", value: "150", unit: "mg/dL", range: "<150", status: "normal" },
        ],
      },
      {
        id: 3,
        testName: "Thyroid Function Panel",
        date: "2025-06-15",
        doctor: "Dr. Emily Davis",
        status: "normal",
        category: "Hormone",
        results: [
          { parameter: "TSH", value: "2.1", unit: "mIU/L", range: "0.4-4.0", status: "normal" },
          { parameter: "Free T4", value: "1.3", unit: "ng/dL", range: "0.8-1.8", status: "normal" },
          { parameter: "Free T3", value: "3.2", unit: "pg/mL", range: "2.3-4.2", status: "normal" },
        ],
      },
      {
        id: 4,
        testName: "HbA1c (Diabetes)",
        date: "2025-06-10",
        doctor: "Dr. Michael Chen",
        status: "normal",
        category: "Diabetes",
        results: [
          { parameter: "Hemoglobin A1c", value: "5.6", unit: "%", range: "<5.7", status: "normal" },
          { parameter: "Average Blood Sugar", value: "114", unit: "mg/dL", range: "<117", status: "normal" },
        ],
      },
      {
        id: 5,
        testName: "Vitamin D",
        date: "2025-06-05",
        doctor: "Dr. Sarah Johnson",
        status: "low",
        category: "Vitamin",
        results: [
          { parameter: "25-Hydroxy Vitamin D", value: "22", unit: "ng/mL", range: "30-100", status: "low" },
        ],
      },
    ];
    
    setTestResults(sampleResults);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "normal": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "attention": return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "high": return <TrendingUp className="w-5 h-5 text-red-600" />;
      case "low": return <TrendingDown className="w-5 h-5 text-blue-600" />;
      default: return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-800";
      case "attention": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getParameterStatus = (parameter) => {
    if (parameter.status === "normal") return "text-green-600";
    if (parameter.status === "high") return "text-red-600";
    if (parameter.status === "low") return "text-blue-600";
    return "text-gray-600";
  };

  const filteredResults = testResults.filter(result => {
    const matchesSearch = result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || result.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getHealthScore = () => {
    const totalTests = testResults.length;
    const normalTests = testResults.filter(r => r.status === "normal").length;
    return Math.round((normalTests / totalTests) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <TestTube className="w-8 h-8 mr-3 text-blue-600" />
            Test Results
          </h1>
          <p className="text-gray-600 mt-2">View and track your laboratory test results</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All Results
          </Button>
        </div>
      </div>

      {/* Health Score Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Overall Health Score</h3>
              <p className="text-gray-600">Based on your recent test results</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{getHealthScore()}%</div>
              <Progress value={getHealthScore()} className="w-32 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search test results..." 
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
          <option value="all">All Results</option>
          <option value="normal">Normal</option>
          <option value="attention">Needs Attention</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { status: "normal", label: "Normal", count: testResults.filter(r => r.status === "normal").length, color: "bg-green-50 text-green-700" },
          { status: "attention", label: "Attention", count: testResults.filter(r => r.status === "attention").length, color: "bg-yellow-50 text-yellow-700" },
          { status: "high", label: "High", count: testResults.filter(r => r.status === "high").length, color: "bg-red-50 text-red-700" },
          { status: "low", label: "Low", count: testResults.filter(r => r.status === "low").length, color: "bg-blue-50 text-blue-700" },
        ].map((item) => (
          <Card key={item.status} className={`${item.color} border-0`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{item.count}</div>
              <div className="text-sm font-medium">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredResults.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <TestTube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">No test results found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredResults.map((test) => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <CardTitle className="text-lg">{test.testName}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {test.date}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {test.doctor}
                          </div>
                          <Badge variant="outline">{test.category}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(test.status)}>
                        {test.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {test.results.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{result.parameter}</div>
                          <div className="text-sm text-gray-600">Normal range: {result.range}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${getParameterStatus(result)}`}>
                            {result.value} {result.unit}
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getStatusColor(result.status)}`}
                          >
                            {result.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {testResults
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3)
            .map((test) => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <h4 className="font-semibold">{test.testName}</h4>
                        <p className="text-sm text-gray-600">{test.date} • {test.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(test.status)}>
                        {test.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">Trend Analysis Coming Soon</h3>
                <p className="text-gray-500">Historical trend analysis for your test results</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}