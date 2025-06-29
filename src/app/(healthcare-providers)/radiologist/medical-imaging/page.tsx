"use client"

import type React from "react"
import { useState } from "react"
import { Upload, Info, Loader2, FileImage, CheckCircle, Search, Clock, Download, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Define analysis result type
type AnalysisResult = {
  label: string
  score: number
}

type HistoryItem = {
  id: number
  fileName: string
  patientName: string
  analysisDate: string
  results: AnalysisResult[]
  status: "Completed" | "Processing" | "Failed"
}

export default function MedicalImagingAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult[] | null>(null)

  // Dummy history data
  const [analysisHistory, setAnalysisHistory] = useState<HistoryItem[]>([
    {
      id: 1,
      fileName: "chest_xray_001.jpg",
      patientName: "John Doe",
      analysisDate: "2024-01-15 14:30",
      results: [
        { label: "Normal chest X-ray", score: 0.92 },
        { label: "No pneumonia detected", score: 0.88 },
        { label: "Clear lung fields", score: 0.85 },
      ],
      status: "Completed",
    },
    {
      id: 2,
      fileName: "brain_mri_002.dcm",
      patientName: "Jane Smith",
      analysisDate: "2024-01-15 13:15",
      results: [
        { label: "Possible small lesion", score: 0.76 },
        { label: "Requires follow-up", score: 0.68 },
        { label: "Left hemisphere abnormality", score: 0.72 },
      ],
      status: "Completed",
    },
    {
      id: 3,
      fileName: "ct_scan_003.jpg",
      patientName: "Mike Brown",
      analysisDate: "2024-01-15 12:00",
      results: [],
      status: "Processing",
    },
    {
      id: 4,
      fileName: "ultrasound_004.jpg",
      patientName: "Sarah Wilson",
      analysisDate: "2024-01-15 11:45",
      results: [],
      status: "Failed",
    },
  ])

  // Image upload handler
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string)
          setError(null)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Medical image analysis function
  const analyzeImage = async () => {
    if (!imageFile) {
      setError("Please upload a medical image first.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call with dummy data
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate dummy results
      const dummyResults: AnalysisResult[] = [
        { label: "Normal findings", score: 0.89 },
        { label: "No abnormalities detected", score: 0.82 },
        { label: "Healthy tissue structure", score: 0.76 },
      ]

      setAnalysisResult(dummyResults)

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        fileName: imageFile.name,
        patientName: "New Patient",
        analysisDate: new Date().toLocaleString(),
        results: dummyResults,
        status: "Completed",
      }

      setAnalysisHistory((prev) => [newHistoryItem, ...prev])
    } catch (err) {
      console.error("Image analysis error:", err)
      setError(`Analysis failed: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteHistory = (id: number) => {
    if (confirm("Are you sure you want to delete this analysis? This action cannot be undone.")) {
      setAnalysisHistory((prev) => prev.filter((item) => item.id !== id))
      alert("✅ Analysis deleted successfully!")
    }
  }

  const handleViewDetails = (item: HistoryItem) => {
    alert(
      `📋 Analysis Details\n\nFile: ${item.fileName}\nPatient: ${item.patientName}\nDate: ${item.analysisDate}\nStatus: ${item.status}\n\nTop Finding: ${item.results[0]?.label || "No results"}\nConfidence: ${item.results[0] ? (item.results[0].score * 100).toFixed(1) + "%" : "N/A"}`,
    )
  }

  const handleDownloadReport = (item: HistoryItem) => {
    alert(
      `📄 Downloading Report\n\nGenerating PDF report for:\n• Patient: ${item.patientName}\n• Analysis: ${item.fileName}\n• Date: ${item.analysisDate}\n\nReport will be saved to your downloads folder.`,
    )
  }

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-7xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Medical Imaging Analysis</h1>
        <p className="text-slate-600">AI-powered medical image classification and analysis</p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
          <TabsTrigger value="upload" className="text-sm sm:text-base">
            Upload & Analyze
          </TabsTrigger>
          <TabsTrigger value="history" className="text-sm sm:text-base">
            Analysis History ({analysisHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {/* Upload Section */}
            <Card className="shadow-sm border-0 bg-gradient-to-br from-pastel-blue to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <FileImage className="h-5 w-5" />
                  Upload Medical Image
                </CardTitle>
                <CardDescription>Select a medical image for AI-powered analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 sm:p-8 text-center hover:border-blue-400 transition-colors">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <div className="mt-4 text-sm text-slate-600">
                    <Upload className="mx-auto h-6 w-6 sm:h-8 sm:w-8 mb-2 text-slate-400" />
                    <p className="font-medium">Drag and drop or click to select</p>
                    <p className="text-xs mt-1">Supports: JPG, PNG, DICOM files</p>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {selectedImage && (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected medical image"
                        className="w-full h-48 sm:h-64 object-cover rounded-lg border shadow-sm"
                      />
                      <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Image loaded
                      </div>
                    </div>

                    <Button
                      onClick={analyzeImage}
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing Image...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-5 w-5" />
                          Analyze Image
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-sm border-0 bg-gradient-to-br from-pastel-green to-white">
              <CardHeader>
                <CardTitle className="text-slate-800">Analysis Results</CardTitle>
                <CardDescription>AI-generated findings and confidence scores</CardDescription>
              </CardHeader>
              <CardContent>
                {analysisResult ? (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-4 border">
                      <h4 className="font-semibold text-slate-800 mb-4">Top Predictions:</h4>
                      <div className="space-y-3">
                        {analysisResult.map((result, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-700">{result.label}</span>
                              <span className="text-sm font-bold text-slate-800">
                                {(result.score * 100).toFixed(1)}%
                              </span>
                            </div>
                            <Progress value={result.score * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Alert className="border-amber-200 bg-amber-50">
                      <Info className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800">
                        <strong>Important:</strong> This AI analysis is for assistance only and should not replace
                        professional medical diagnosis.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12 text-slate-500">
                    <FileImage className="mx-auto h-8 w-8 sm:h-12 sm:w-12 mb-4 text-slate-300" />
                    <p className="text-sm sm:text-base">Upload and analyze an image to see results here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Analysis History</CardTitle>
              <CardDescription>View and manage your previous image analyses</CardDescription>
            </CardHeader>
            <CardContent>
              {analysisHistory.length > 0 ? (
                <div className="space-y-4">
                  {analysisHistory.map((item) => (
                    <Card key={item.id} className="border shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-slate-800 truncate">{item.fileName}</h4>
                              <Badge
                                className={
                                  item.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : item.status === "Processing"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {item.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">Patient: {item.patientName}</p>
                            <p className="text-xs text-slate-500">Analyzed: {item.analysisDate}</p>

                            {item.results.length > 0 && (
                              <div className="mt-3 space-y-1">
                                <p className="text-xs font-medium text-slate-700">Top Finding:</p>
                                <p className="text-sm text-slate-600">
                                  {item.results[0].label} ({(item.results[0].score * 100).toFixed(1)}% confidence)
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-row sm:flex-col gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(item)}
                              className="flex-1 sm:flex-none"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            {item.status === "Completed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadReport(item)}
                                className="flex-1 sm:flex-none"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Report
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteHistory(item.id)}
                              className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 text-slate-500">
                  <Clock className="mx-auto h-8 w-8 sm:h-12 sm:w-12 mb-4 text-slate-300" />
                  <p className="text-sm sm:text-base">No previous analyses found.</p>
                  <p className="text-xs sm:text-sm mt-2">Your analysis history will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
