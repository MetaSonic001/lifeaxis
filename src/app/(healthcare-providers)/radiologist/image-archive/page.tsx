"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, Edit, Trash2, FileImage } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type ImageRecord = {
  id: number
  patientName: string
  patientId: string
  imageType: string
  bodyPart: string
  date: string
  radiologist: string
  findings: string
  status: "Normal" | "Abnormal" | "Pending" | "Critical"
  fileSize: string
  modality: string
}

const mockRecords: ImageRecord[] = [
  {
    id: 1,
    patientName: "John Doe",
    patientId: "P001",
    imageType: "X-ray",
    bodyPart: "Chest",
    date: "2024-01-15",
    radiologist: "Dr. Smith",
    findings: "No abnormalities detected. Clear lung fields bilaterally.",
    status: "Normal",
    fileSize: "2.4 MB",
    modality: "CR",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientId: "P002",
    imageType: "MRI",
    bodyPart: "Brain",
    date: "2024-01-14",
    radiologist: "Dr. Johnson",
    findings: "Small lesion detected in left hemisphere, requires follow-up.",
    status: "Abnormal",
    fileSize: "45.2 MB",
    modality: "MR",
  },
  {
    id: 3,
    patientName: "Mike Brown",
    patientId: "P003",
    imageType: "CT Scan",
    bodyPart: "Abdomen",
    date: "2024-01-13",
    radiologist: "Dr. Williams",
    findings: "Mild inflammation in lower right lung area.",
    status: "Abnormal",
    fileSize: "28.7 MB",
    modality: "CT",
  },
  {
    id: 4,
    patientName: "Sarah Wilson",
    patientId: "P004",
    imageType: "Ultrasound",
    bodyPart: "Abdomen",
    date: "2024-01-12",
    radiologist: "Dr. Davis",
    findings: "Routine examination - awaiting detailed review.",
    status: "Pending",
    fileSize: "8.9 MB",
    modality: "US",
  },
  {
    id: 5,
    patientName: "Robert Taylor",
    patientId: "P005",
    imageType: "X-ray",
    bodyPart: "Spine",
    date: "2024-01-11",
    radiologist: "Dr. Brown",
    findings: "Severe compression fracture at L2 vertebra.",
    status: "Critical",
    fileSize: "3.1 MB",
    modality: "DR",
  },
  {
    id: 6,
    patientName: "Emily Davis",
    patientId: "P006",
    imageType: "MRI",
    bodyPart: "Knee",
    date: "2024-01-10",
    radiologist: "Dr. Wilson",
    findings: "Torn ACL with moderate joint effusion.",
    status: "Abnormal",
    fileSize: "52.3 MB",
    modality: "MR",
  },
]

export default function ImageArchive() {
  const [records, setRecords] = useState<ImageRecord[]>(mockRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedModality, setSelectedModality] = useState<string>("all")

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.imageType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.radiologist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.bodyPart.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || record.status.toLowerCase() === selectedStatus.toLowerCase()
    const matchesModality =
      selectedModality === "all" || record.modality.toLowerCase() === selectedModality.toLowerCase()

    return matchesSearch && matchesStatus && matchesModality
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Normal":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Normal</Badge>
      case "Abnormal":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Abnormal</Badge>
      case "Pending":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pending</Badge>
      case "Critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleViewImage = (record: ImageRecord) => {
    alert(
      `🖼️ Image Viewer\n\nOpening image for:\n• Patient: ${record.patientName} (${record.patientId})\n• Type: ${record.imageType}\n• Body Part: ${record.bodyPart}\n• Date: ${record.date}\n• File Size: ${record.fileSize}\n\nImage viewer would open here with DICOM support.`,
    )
  }

  const handleDownload = (record: ImageRecord) => {
    alert(
      `⬇️ Download Started\n\nDownloading:\n• File: ${record.imageType}_${record.patientId}_${record.date}\n• Size: ${record.fileSize}\n• Format: DICOM\n\nDownload will begin shortly...`,
    )
  }

  const handleEdit = (record: ImageRecord) => {
    const newFindings = prompt(`✏️ Edit Findings for ${record.patientName}\n\nCurrent findings:`, record.findings)
    if (newFindings !== null && newFindings.trim() !== "") {
      setRecords((prev) => prev.map((r) => (r.id === record.id ? { ...r, findings: newFindings } : r)))
      alert("✅ Findings updated successfully!")
    }
  }

  const handleDelete = (id: number) => {
    const record = records.find((r) => r.id === id)
    if (
      record &&
      confirm(
        `🗑️ Delete Image Record\n\nAre you sure you want to delete the record for ${record.patientName}?\n\nThis action cannot be undone.`,
      )
    ) {
      setRecords((prev) => prev.filter((record) => record.id !== id))
      alert("✅ Record deleted successfully!")
    }
  }

  const handleAdvancedFilters = () => {
    alert(
      "🔍 Advanced Filters\n\nOpening advanced filter panel:\n• Date range selection\n• Modality filtering\n• Radiologist filtering\n• Status filtering\n• Body part selection\n• File size range",
    )
  }

  const handleExportAll = () => {
    alert(
      `📊 Export All Records\n\nExporting ${filteredRecords.length} records to CSV:\n• Patient information\n• Image metadata\n• Findings summary\n• Status reports\n\nExport will begin shortly...`,
    )
  }

  const statusCounts = {
    all: records.length,
    normal: records.filter((r) => r.status === "Normal").length,
    abnormal: records.filter((r) => r.status === "Abnormal").length,
    pending: records.filter((r) => r.status === "Pending").length,
    critical: records.filter((r) => r.status === "Critical").length,
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">Radiology Image Archive</h1>
          <p className="text-slate-600 mt-2">Browse and manage medical imaging records</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="bg-transparent" onClick={handleAdvancedFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleExportAll}>
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <Card className="bg-gradient-to-r from-pastel-blue to-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{statusCounts.all}</div>
              <p className="text-sm text-slate-600">Total Images</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-pastel-green to-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{statusCounts.normal}</div>
              <p className="text-sm text-slate-600">Normal</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-pastel-yellow to-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{statusCounts.abnormal}</div>
              <p className="text-sm text-slate-600">Abnormal</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-pastel-purple to-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{statusCounts.pending}</div>
              <p className="text-sm text-slate-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-pastel-pink to-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{statusCounts.critical}</div>
              <p className="text-sm text-slate-600">Critical</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-sm bg-gradient-to-r from-pastel-blue to-white">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by patient name, ID, image type, or radiologist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-base border-slate-200 focus:border-blue-400"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm focus:border-blue-400 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="normal">Normal</option>
                <option value="abnormal">Abnormal</option>
                <option value="pending">Pending</option>
                <option value="critical">Critical</option>
              </select>
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm focus:border-blue-400 focus:outline-none"
              >
                <option value="all">All Modalities</option>
                <option value="cr">X-ray (CR)</option>
                <option value="dr">X-ray (DR)</option>
                <option value="mr">MRI</option>
                <option value="ct">CT</option>
                <option value="us">Ultrasound</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Image Records ({filteredRecords.length} found)</CardTitle>
          <CardDescription>Click on any record to view detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-4">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">{record.patientName}</h4>
                      <p className="text-sm text-slate-600">ID: {record.patientId}</p>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <Badge variant="outline" className="bg-pastel-purple text-purple-700">
                        {record.imageType}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Body Part:</span>
                      <span className="text-slate-800">{record.bodyPart}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Date:</span>
                      <span className="text-slate-800">{record.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Radiologist:</span>
                      <span className="text-slate-800">{record.radiologist}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-slate-600 mb-3">{record.findings}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewImage(record)} className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownload(record)} className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                  <TableHead className="font-semibold text-slate-700">Image Type</TableHead>
                  <TableHead className="font-semibold text-slate-700">Body Part</TableHead>
                  <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Radiologist</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Size</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record, index) => (
                  <TableRow
                    key={record.id}
                    className={`hover:bg-slate-50 ${index % 2 === 0 ? "bg-white" : "bg-slate-25"}`}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-800">{record.patientName}</p>
                        <p className="text-xs text-slate-500">ID: {record.patientId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-pastel-purple text-purple-700">
                        {record.imageType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{record.bodyPart}</TableCell>
                    <TableCell className="text-slate-600">{record.date}</TableCell>
                    <TableCell className="text-slate-600">{record.radiologist}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{record.fileSize}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewImage(record)}
                          className="h-8 bg-transparent"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(record)}
                          className="h-8 bg-transparent"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(record)}
                          className="h-8 bg-transparent"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(record.id)}
                          className="h-8 bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8 sm:py-12 text-slate-500">
              <FileImage className="mx-auto h-8 w-8 sm:h-12 sm:w-12 mb-4 text-slate-300" />
              <p className="text-sm sm:text-base">No records found matching your search.</p>
              <p className="text-xs sm:text-sm mt-2">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
