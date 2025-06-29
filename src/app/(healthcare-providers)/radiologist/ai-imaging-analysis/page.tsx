"use client"

import { useState } from "react"
import { CheckCircle, Clock, FileText, User, AlertCircle, Edit, Save, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

type ImageAnalysis = {
  id: number
  patientName: string
  patientId: string
  imageType: "X-ray" | "MRI" | "CT Scan" | "Ultrasound"
  bodyPart: string
  aiFindings: string
  radiologistNotes: string
  status: "Pending Review" | "Reviewed"
  confidence: number
  timestamp: string
  priority: "Low" | "Medium" | "High"
}

export default function AIImagingAnalysis() {
  const [analyses, setAnalyses] = useState<ImageAnalysis[]>([
    {
      id: 1,
      patientName: "John Doe",
      patientId: "P001",
      imageType: "X-ray",
      bodyPart: "Chest",
      aiFindings: "Possible pneumonia in lower right lobe. Increased opacity and consolidation pattern detected.",
      radiologistNotes: "",
      status: "Pending Review",
      confidence: 0.87,
      timestamp: "2024-01-15 14:30",
      priority: "High",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      patientId: "P002",
      imageType: "MRI",
      bodyPart: "Brain",
      aiFindings: "No significant abnormalities detected. Normal brain parenchyma and ventricular system.",
      radiologistNotes: "",
      status: "Pending Review",
      confidence: 0.94,
      timestamp: "2024-01-15 15:45",
      priority: "Low",
    },
    {
      id: 3,
      patientName: "Mike Brown",
      patientId: "P003",
      imageType: "CT Scan",
      bodyPart: "Abdomen",
      aiFindings: "Small nodule detected in liver segment VII, approximately 8mm. Requires follow-up imaging.",
      radiologistNotes:
        "Confirmed small hepatic lesion. Recommend follow-up CT in 3 months. Likely benign but monitoring advised.",
      status: "Reviewed",
      confidence: 0.76,
      timestamp: "2024-01-15 13:15",
      priority: "Medium",
    },
    {
      id: 4,
      patientName: "Sarah Wilson",
      patientId: "P004",
      imageType: "Ultrasound",
      bodyPart: "Abdomen",
      aiFindings: "Gallbladder wall thickening noted. Possible acute cholecystitis.",
      radiologistNotes: "",
      status: "Pending Review",
      confidence: 0.82,
      timestamp: "2024-01-15 16:20",
      priority: "High",
    },
    {
      id: 5,
      patientName: "Robert Taylor",
      patientId: "P005",
      imageType: "X-ray",
      bodyPart: "Spine",
      aiFindings: "Compression fracture at L2 vertebra. Moderate loss of vertebral height.",
      radiologistNotes:
        "Acute compression fracture confirmed. Recommend MRI for further evaluation and orthopedic consultation.",
      status: "Reviewed",
      confidence: 0.91,
      timestamp: "2024-01-15 12:00",
      priority: "High",
    },
  ])

  const [noteInputs, setNoteInputs] = useState<{ [key: number]: string }>({})
  const [editingNotes, setEditingNotes] = useState<{ [key: number]: boolean }>({})

  const handleReview = (id: number) => {
    const notes = noteInputs[id] || ""
    if (!notes.trim()) {
      alert("⚠️ Missing Assessment\n\nPlease enter your professional assessment before submitting the review.")
      return
    }

    const analysis = analyses.find((a) => a.id === id)
    if (
      analysis &&
      confirm(
        `✅ Submit Review\n\nPatient: ${analysis.patientName}\nImage: ${analysis.imageType} of ${analysis.bodyPart}\n\nSubmit your assessment and mark as reviewed?`,
      )
    ) {
      setAnalyses((prevAnalyses) =>
        prevAnalyses.map((analysis) =>
          analysis.id === id ? { ...analysis, radiologistNotes: notes, status: "Reviewed" } : analysis,
        ),
      )
      setNoteInputs((prev) => ({ ...prev, [id]: "" }))
      alert(
        "✅ Review submitted successfully!\n\nThe case has been marked as reviewed and your assessment has been saved.",
      )
    }
  }

  const handleEditNotes = (id: number) => {
    const analysis = analyses.find((a) => a.id === id)
    if (analysis) {
      setNoteInputs((prev) => ({ ...prev, [id]: analysis.radiologistNotes }))
      setEditingNotes((prev) => ({ ...prev, [id]: true }))
    }
  }

  const handleSaveEdit = (id: number) => {
    const notes = noteInputs[id] || ""
    if (!notes.trim()) {
      alert("⚠️ Empty Notes\n\nPlease enter your assessment before saving.")
      return
    }

    if (confirm("💾 Save Changes\n\nSave the updated assessment?")) {
      setAnalyses((prevAnalyses) =>
        prevAnalyses.map((analysis) => (analysis.id === id ? { ...analysis, radiologistNotes: notes } : analysis)),
      )
      setEditingNotes((prev) => ({ ...prev, [id]: false }))
      setNoteInputs((prev) => ({ ...prev, [id]: "" }))
      alert("✅ Assessment updated successfully!")
    }
  }

  const handleCancelEdit = (id: number) => {
    if (confirm("❌ Cancel Edit\n\nDiscard changes and cancel editing?")) {
      setEditingNotes((prev) => ({ ...prev, [id]: false }))
      setNoteInputs((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const handleExportReports = () => {
    const reviewedCount = analyses.filter((a) => a.status === "Reviewed").length
    alert(
      `📊 Export Reports\n\nExporting ${reviewedCount} completed reports:\n• PDF format with findings\n• Radiologist assessments\n• AI analysis data\n• Patient information\n\nExport will begin shortly...`,
    )
  }

  const handleBulkReview = () => {
    const pendingCount = analyses.filter((a) => a.status === "Pending Review").length
    if (pendingCount === 0) {
      alert("ℹ️ No Pending Reviews\n\nAll cases have been reviewed!")
      return
    }

    if (
      confirm(
        `📋 Bulk Review\n\nMark all ${pendingCount} pending cases for batch review?\n\nThis will open the bulk review interface.`,
      )
    ) {
      alert("🔄 Opening Bulk Review Interface\n\nLoading batch review tools for efficient case processing...")
    }
  }

  const handleNoteChange = (id: number, value: string) => {
    setNoteInputs((prev) => ({ ...prev, [id]: value }))
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600 bg-green-100"
    if (confidence >= 0.7) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getImageTypeColor = (type: string) => {
    switch (type) {
      case "X-ray":
        return "bg-blue-100 text-blue-800"
      case "MRI":
        return "bg-purple-100 text-purple-800"
      case "CT Scan":
        return "bg-green-100 text-green-800"
      case "Ultrasound":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Priority</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Priority</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Priority</Badge>
      default:
        return <Badge variant="secondary">{priority} Priority</Badge>
    }
  }

  const pendingCount = analyses.filter((a) => a.status === "Pending Review").length
  const reviewedCount = analyses.filter((a) => a.status === "Reviewed").length
  const highPriorityCount = analyses.filter((a) => a.priority === "High" && a.status === "Pending Review").length

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">AI-Assisted Imaging Analysis</h1>
          <p className="text-slate-600 mt-2">Review AI-generated findings and add your professional assessment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReports}>
            Export Reports
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleBulkReview}>
            Bulk Review
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-pastel-orange to-white border-l-4 border-l-orange-400">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Review</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800">{pendingCount}</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pastel-green to-white border-l-4 border-l-green-400">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Reviewed</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800">{reviewedCount}</p>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pastel-red to-white border-l-4 border-l-red-400">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">High Priority</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800">{highPriorityCount}</p>
              </div>
              <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pastel-blue to-white border-l-4 border-l-blue-400">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Cases</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800">{analyses.length}</p>
              </div>
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Cards */}
      <div className="space-y-6">
        {analyses.map((analysis) => (
          <Card key={analysis.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <CardTitle className="text-lg sm:text-xl text-slate-800 flex items-center gap-3 flex-wrap">
                    <User className="h-5 w-5 text-slate-600 flex-shrink-0" />
                    <span className="truncate">{analysis.patientName}</span>
                    <span className="text-sm text-slate-500">({analysis.patientId})</span>
                    {analysis.status === "Reviewed" && <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={getImageTypeColor(analysis.imageType)}>{analysis.imageType}</Badge>
                    <Badge variant="outline" className="text-slate-600">
                      {analysis.bodyPart}
                    </Badge>
                    <Badge className={`${getConfidenceColor(analysis.confidence)} font-medium`}>
                      {(analysis.confidence * 100).toFixed(0)}% confidence
                    </Badge>
                    {getPriorityBadge(analysis.priority)}
                  </div>
                </div>
                <div className="text-right text-sm text-slate-500 flex-shrink-0">
                  <p>{analysis.timestamp}</p>
                  <Badge
                    variant={analysis.status === "Reviewed" ? "default" : "secondary"}
                    className={
                      analysis.status === "Reviewed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {analysis.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* AI Findings */}
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-l-blue-400">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 mb-2">AI Findings</h4>
                    <p className="text-slate-700 text-sm sm:text-base">{analysis.aiFindings}</p>
                  </div>
                </div>
              </div>

              {/* Radiologist Section */}
              {analysis.status === "Pending Review" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-600" />
                    <h4 className="font-semibold text-slate-800">Your Assessment</h4>
                  </div>
                  <Textarea
                    placeholder="Enter your professional assessment and notes here..."
                    value={noteInputs[analysis.id] || ""}
                    onChange={(e) => handleNoteChange(analysis.id, e.target.value)}
                    className="min-h-[120px] border-slate-200 focus:border-blue-400"
                  />
                  <Button
                    onClick={() => handleReview(analysis.id)}
                    className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit Review
                  </Button>
                </div>
              ) : (
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-l-green-400">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-slate-800">Radiologist Assessment</h4>
                        {!editingNotes[analysis.id] && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditNotes(analysis.id)}
                            className="self-start sm:self-center"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                      {editingNotes[analysis.id] ? (
                        <div className="space-y-3">
                          <Textarea
                            value={noteInputs[analysis.id] || ""}
                            onChange={(e) => handleNoteChange(analysis.id, e.target.value)}
                            className="min-h-[100px] border-slate-200 focus:border-blue-400"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(analysis.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleCancelEdit(analysis.id)}>
                              <X className="h-3 w-3 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-slate-700 text-sm sm:text-base">{analysis.radiologistNotes}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {analyses.length === 0 && (
        <Card className="bg-gradient-to-r from-pastel-blue to-white">
          <CardContent className="text-center py-8 sm:py-12">
            <FileText className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No analyses available</h3>
            <p className="text-slate-600">New AI analyses will appear here for your review.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
