"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Activity, RefreshCw, Download, Zap, AlertTriangle, CheckCircle } from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type PatientInsight = {
  id: number
  name: string
  riskScore: number
  insights: string[]
  recommendations: string[]
  vitalTrends: Array<{ date: string; heartRate: number; bloodPressure: number; temperature: number }>
  conditions: Array<{ name: string; severity: "Low" | "Medium" | "High"; probability: number }>
}

const mockPatientInsights: PatientInsight[] = [
  {
    id: 1,
    name: "John Doe",
    riskScore: 75,
    insights: [
      "Blood pressure trending upward over past 3 months",
      "Medication adherence appears consistent",
      "Exercise patterns show improvement",
      "Sleep quality metrics within normal range",
    ],
    recommendations: [
      "Consider adjusting hypertension medication dosage",
      "Schedule cardiology consultation within 2 weeks",
      "Implement daily blood pressure monitoring",
      "Dietary consultation for sodium reduction",
    ],
    vitalTrends: [
      { date: "2024-01-01", heartRate: 72, bloodPressure: 140, temperature: 98.6 },
      { date: "2024-01-08", heartRate: 75, bloodPressure: 142, temperature: 98.4 },
      { date: "2024-01-15", heartRate: 78, bloodPressure: 145, temperature: 98.7 },
      { date: "2024-01-22", heartRate: 76, bloodPressure: 143, temperature: 98.5 },
    ],
    conditions: [
      { name: "Hypertension", severity: "High", probability: 85 },
      { name: "Pre-diabetes", severity: "Medium", probability: 60 },
      { name: "Sleep Apnea", severity: "Low", probability: 30 },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    riskScore: 45,
    insights: [
      "Diabetes management showing good control",
      "Weight loss progress on track",
      "Regular exercise routine established",
      "HbA1c levels improving consistently",
    ],
    recommendations: [
      "Continue current diabetes medication regimen",
      "Maintain current exercise and diet plan",
      "Schedule quarterly HbA1c monitoring",
      "Consider reducing medication if trends continue",
    ],
    vitalTrends: [
      { date: "2024-01-01", heartRate: 68, bloodPressure: 120, temperature: 98.2 },
      { date: "2024-01-08", heartRate: 70, bloodPressure: 118, temperature: 98.1 },
      { date: "2024-01-15", heartRate: 69, bloodPressure: 115, temperature: 98.3 },
      { date: "2024-01-22", heartRate: 67, bloodPressure: 112, temperature: 98.0 },
    ],
    conditions: [
      { name: "Type 2 Diabetes", severity: "Medium", probability: 95 },
      { name: "Obesity", severity: "Medium", probability: 70 },
      { name: "Metabolic Syndrome", severity: "Low", probability: 40 },
    ],
  },
]

export default function PatientInsightPage() {
  const [selectedPatient, setSelectedPatient] = useState<PatientInsight | null>(mockPatientInsights[0])
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [insights, setInsights] = useState<string>("")

  const handleGenerateInsights = async (patient: PatientInsight) => {
    setIsGeneratingInsights(true)
    setSelectedPatient(patient)

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const generatedInsights = `AI-Generated Patient Insights for ${patient.name}:

RISK ASSESSMENT:
Overall Risk Score: ${patient.riskScore}/100 (${patient.riskScore > 70 ? "High" : patient.riskScore > 40 ? "Medium" : "Low"} Risk)

KEY CLINICAL INSIGHTS:
${patient.insights.map((insight, index) => `${index + 1}. ${insight}`).join("\n")}

PREDICTIVE ANALYTICS:
- Based on current trends, patient shows ${patient.riskScore > 70 ? "concerning" : "stable"} health trajectory
- Vital signs analysis indicates ${patient.vitalTrends[patient.vitalTrends.length - 1].bloodPressure > 140 ? "elevated blood pressure requiring attention" : "stable cardiovascular metrics"}
- Medication adherence patterns suggest ${Math.random() > 0.5 ? "good compliance" : "potential adherence issues"}

RECOMMENDED INTERVENTIONS:
${patient.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join("\n")}

CONDITION PROBABILITIES:
${patient.conditions.map((condition) => `- ${condition.name}: ${condition.probability}% probability (${condition.severity} severity)`).join("\n")}

NEXT STEPS:
- Schedule follow-up appointment within ${patient.riskScore > 70 ? "1-2 weeks" : "4-6 weeks"}
- Monitor key vital signs: ${patient.riskScore > 70 ? "daily" : "weekly"}
- Patient education on warning signs and when to seek immediate care
- Coordinate with specialists as needed based on condition severity

This analysis is generated using advanced AI algorithms and should be used in conjunction with clinical judgment and comprehensive patient evaluation.`

      setInsights(generatedInsights)
      console.log("Patient insights generated successfully")
    } catch (error) {
      console.error("Error generating insights:", error)
      setInsights("Unable to generate patient insights. Please try again.")
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Patient data refreshed")
    } catch (error) {
      console.error("Error refreshing data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleExportInsights = async () => {
    if (!insights) {
      alert("Please generate insights first")
      return
    }

    setIsExporting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const blob = new Blob([insights], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `patient-insights-${selectedPatient?.name.replace(" ", "-").toLowerCase()}.txt`
      a.click()
      URL.revokeObjectURL(url)

      console.log("Insights exported successfully")
    } catch (error) {
      console.error("Error exporting insights:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const getRiskColor = (score: number) => {
    if (score > 70) return "text-red-600"
    if (score > 40) return "text-orange-600"
    return "text-green-600"
  }

  const getRiskBadgeColor = (score: number) => {
    if (score > 70) return "bg-red-100 text-red-700 border-red-200"
    if (score > 40) return "bg-orange-100 text-orange-700 border-orange-200"
    return "bg-green-100 text-green-700 border-green-200"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200"
      case "Medium":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "Low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Patient Insights
          </h1>
          <p className="text-slate-600">AI-powered patient analysis and predictive healthcare insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            variant="outline"
            onClick={handleExportInsights}
            disabled={isExporting || !insights}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient Selection */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
            <CardTitle className="text-slate-700 flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Select Patient</span>
            </CardTitle>
            <CardDescription className="text-slate-600">Choose a patient for AI analysis</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {mockPatientInsights.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedPatient?.id === patient.id
                      ? "border-purple-200 bg-purple-50"
                      : "border-slate-200 hover:border-purple-200 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-700">{patient.name}</h4>
                    <Badge className={getRiskBadgeColor(patient.riskScore)}>Risk: {patient.riskScore}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Risk Score</span>
                      <span className={`font-medium ${getRiskColor(patient.riskScore)}`}>{patient.riskScore}/100</span>
                    </div>
                    <Progress value={patient.riskScore} className="h-2" />
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleGenerateInsights(patient)
                    }}
                    disabled={isGeneratingInsights}
                    className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    size="sm"
                  >
                    <Zap className="w-3 h-3 mr-2" />
                    {isGeneratingInsights && selectedPatient?.id === patient.id ? "Analyzing..." : "Generate Insights"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Analysis */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-pink-100"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="trends"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-pink-100"
                >
                  Vital Trends
                </TabsTrigger>
                <TabsTrigger
                  value="conditions"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-pink-100"
                >
                  Conditions
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-pink-100"
                >
                  AI Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
                      <CardTitle className="text-slate-700 flex items-center space-x-2">
                        <Activity className="w-5 h-5" />
                        <span>Risk Assessment</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${getRiskColor(selectedPatient.riskScore)}`}>
                          {selectedPatient.riskScore}
                        </div>
                        <p className="text-slate-600 mb-4">Overall Risk Score</p>
                        <Progress value={selectedPatient.riskScore} className="mb-4" />
                        <Badge className={getRiskBadgeColor(selectedPatient.riskScore)}>
                          {selectedPatient.riskScore > 70
                            ? "High Risk"
                            : selectedPatient.riskScore > 40
                              ? "Medium Risk"
                              : "Low Risk"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
                      <CardTitle className="text-slate-700 flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Key Insights</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        {selectedPatient.insights.slice(0, 4).map((insight, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-slate-600">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg">
                    <CardTitle className="text-slate-700 flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Vital Signs Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={selectedPatient.vitalTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Line type="monotone" dataKey="heartRate" stroke="#3b82f6" name="Heart Rate" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="bloodPressure"
                          stroke="#ef4444"
                          name="Blood Pressure"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="#10b981"
                          name="Temperature"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conditions">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 rounded-t-lg">
                    <CardTitle className="text-slate-700 flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Condition Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {selectedPatient.conditions.map((condition, index) => (
                        <div key={index} className="bg-slate-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-700">{condition.name}</h4>
                            <Badge className={getSeverityColor(condition.severity)}>
                              {condition.severity} Severity
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Probability</span>
                              <span className="font-medium text-slate-700">{condition.probability}%</span>
                            </div>
                            <Progress value={condition.probability} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
                    <CardTitle className="text-slate-700 flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI-Generated Insights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {insights ? (
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg max-h-[500px] overflow-y-auto">
                        <pre className="whitespace-pre-line text-slate-700 text-sm leading-relaxed">{insights}</pre>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Brain className="w-8 h-8 text-purple-500" />
                        </div>
                        <p className="text-slate-500">
                          Select a patient and click "Generate Insights" to view AI-powered analysis
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className="text-slate-600">Select a patient to view detailed insights and analysis.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
