
"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Upload,
  Calendar,
  User,
  Heart,
  Activity,
  Pill,
  TestTube,
  Image as ImageIcon,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    // Initialize with sample medical records
    const sampleRecords = [
      {
        id: 1,
        title: "Annual Physical Examination",
        type: "examination",
        date: "2025-06-25",
        doctor: "Dr. Sarah Johnson",
        category: "Cardiology",
        summary: "Complete physical examination with vital signs assessment",
        status: "completed",
        files: ["physical_exam_2025.pdf"],
      },
      {
        id: 2,
        title: "Blood Work Results - Lipid Panel",
        type: "lab",
        date: "2025-06-20",
        doctor: "Dr. Michael Chen",
        category: "Laboratory",
        summary: "Comprehensive metabolic panel and lipid profile",
        status: "available",
        files: ["blood_work_june_2025.pdf", "lab_summary.pdf"],
      },
      {
        id: 3,
        title: "Chest X-Ray",
        type: "imaging",
        date: "2025-06-15",
        doctor: "Dr. Emily Davis",
        category: "Radiology",
        summary: "Routine chest X-ray - clear lungs, normal heart size",
        status: "available",
        files: ["chest_xray_2025.jpg", "radiology_report.pdf"],
      },
      {
        id: 4,
        title: "Prescription - Lisinopril",
        type: "prescription",
        date: "2025-06-10",
        doctor: "Dr. Sarah Johnson",
        category: "Cardiology",
        summary: "Blood pressure medication prescription renewal",
        status: "active",
        files: ["prescription_lisinopril.pdf"],
      },
      {
        id: 5,
        title: "Vaccination Record - COVID-19 Booster",
        type: "vaccination",
        date: "2025-05-30",
        doctor: "Dr. Jennifer Wilson",
        category: "Immunization",
        summary: "COVID-19 booster vaccination administered",
        status: "completed",
        files: ["vaccination_record.pdf"],
      },
    ];
    
    setRecords(sampleRecords);
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case "examination": return <User className="w-5 h-5" />;
      case "lab": return <TestTube className="w-5 h-5" />;
      case "imaging": return <ImageIcon className="w-5 h-5" />;
      case "prescription": return <Pill className="w-5 h-5" />;
      case "vaccination": return <Heart className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "examination": return "bg-blue-100 text-blue-800";
      case "lab": return "bg-green-100 text-green-800";
      case "imaging": return "bg-purple-100 text-purple-800";
      case "prescription": return "bg-orange-100 text-orange-800";
      case "vaccination": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "available": return "bg-blue-100 text-blue-800";
      case "active": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || record.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const groupedRecords = filteredRecords.reduce((acc, record) => {
    if (!acc[record.type]) {
      acc[record.type] = [];
    }
    acc[record.type].push(record);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-blue-600" />
            Medical Records
          </h1>
          <p className="text-gray-600 mt-2">Access and manage your complete medical history</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload Record
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Records
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search medical records..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="examination">Examinations</option>
          <option value="lab">Lab Results</option>
          <option value="imaging">Imaging</option>
          <option value="prescription">Prescriptions</option>
          <option value="vaccination">Vaccinations</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { type: "examination", label: "Examinations", count: records.filter(r => r.type === "examination").length, color: "bg-blue-50 text-blue-700" },
          { type: "lab", label: "Lab Results", count: records.filter(r => r.type === "lab").length, color: "bg-green-50 text-green-700" },
          { type: "imaging", label: "Imaging", count: records.filter(r => r.type === "imaging").length, color: "bg-purple-50 text-purple-700" },
          { type: "prescription", label: "Prescriptions", count: records.filter(r => r.type === "prescription").length, color: "bg-orange-50 text-orange-700" },
          { type: "vaccination", label: "Vaccinations", count: records.filter(r => r.type === "vaccination").length, color: "bg-red-50 text-red-700" },
        ].map((item) => (
          <Card key={item.type} className={`${item.color} border-0`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{item.count}</div>
              <div className="text-sm font-medium">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="by-type">By Type</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredRecords.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">No records found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(record.type)}`}>
                        {getTypeIcon(record.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{record.title}</h3>
                        <p className="text-gray-600">{record.summary}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {record.date}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {record.doctor}
                          </div>
                          <div className="flex items-center">
                            <Activity className="w-4 h-4 mr-1" />
                            {record.category}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getTypeColor(record.type)}>
                            {record.type}
                          </Badge>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {record.files.length} file{record.files.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {filteredRecords
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(record.type)}`}>
                        {getTypeIcon(record.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{record.title}</h4>
                        <p className="text-sm text-gray-600">{record.date} • {record.doctor}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="by-type" className="space-y-6">
          {Object.entries(groupedRecords).map(([type, typeRecords]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="flex items-center capitalize">
                  {getTypeIcon(type)}
                  <span className="ml-2">{type}s ({typeRecords.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {typeRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{record.title}</h4>
                        <p className="text-sm text-gray-600">{record.date} • {record.doctor}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
