"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function CaseSummaryGenerator() {
  const [patientInfo, setPatientInfo] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!patientInfo.trim()) {
      alert("Please enter patient information")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call with mock response
      setTimeout(() => {
        const mockSummary = `COMPREHENSIVE CASE SUMMARY

Patient Demographics:
- Information extracted from provided patient data
- Age, gender, and relevant demographic factors
- Contact information and emergency contacts

Chief Complaint:
- Primary reason for current medical consultation
- Duration and severity of presenting symptoms
- Patient's description of the problem in their own words

Key Clinical Findings:
- Vital signs and physical examination results
- Significant positive and negative findings
- Laboratory and diagnostic test results
- Imaging study interpretations

Relevant Medical History:
- Past medical conditions and surgical history
- Current medications and allergies
- Family history of relevant conditions
- Social history including lifestyle factors

Diagnostic Considerations:
- Primary diagnosis based on clinical presentation
- Differential diagnoses to consider
- Rationale for diagnostic conclusions
- Additional testing recommendations if needed

Recommended Next Steps:
- Immediate treatment plan and interventions
- Follow-up appointments and monitoring
- Patient education and lifestyle modifications
- Specialist referrals if indicated
- Medication management and adjustments

Clinical Assessment:
- Overall patient condition and prognosis
- Risk factors and potential complications
- Treatment response expectations
- Long-term management considerations

This summary provides a comprehensive overview of the patient's current status and recommended care plan. All recommendations should be reviewed and adjusted based on clinical judgment and patient-specific factors.`

        setSummary(mockSummary)
        setIsLoading(false)
      }, 2500)
    } catch (error) {
      console.error("Error generating case summary:", error)
      setSummary("Sorry, there was an error generating the case summary. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Case Summary Generator
        </h1>
        <p className="text-slate-600">AI-powered comprehensive patient case documentation</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-t-lg">
            <CardTitle className="text-slate-700">Patient Information Input</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="patientInfo" className="text-slate-700 font-medium">
                  Patient Information
                </Label>
                <Textarea
                  id="patientInfo"
                  placeholder="Enter comprehensive patient information including:
• Patient demographics and contact details
• Chief complaint and history of present illness
• Past medical history and medications
• Physical examination findings
• Laboratory and diagnostic results
• Any other relevant clinical information..."
                  value={patientInfo}
                  onChange={(e) => setPatientInfo(e.target.value)}
                  className="mt-2 min-h-[250px] border-slate-200 focus:border-emerald-400 resize-none"
                  rows={10}
                />
                <p className="text-sm text-slate-500 mt-2">
                  Provide detailed patient information for a comprehensive summary
                </p>
              </div>
              <Button
                type="submit"
                disabled={isLoading || !patientInfo.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Summary...</span>
                  </div>
                ) : (
                  "Generate Case Summary"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
            <CardTitle className="text-slate-700">Generated Case Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {summary ? (
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg max-h-[400px] overflow-y-auto">
                <pre className="whitespace-pre-line text-slate-700 text-sm leading-relaxed">{summary}</pre>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                </div>
                <p className="text-slate-500">
                  Enter patient information and click "Generate Case Summary" to create a comprehensive summary
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {summary && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
              <CardTitle className="text-slate-700">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={() => {
                    const blob = new Blob([summary], { type: "text/plain" })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = "case-summary.txt"
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                >
                  Download as Text File
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                  onClick={() => {
                    navigator.clipboard.writeText(summary)
                    alert("Summary copied to clipboard!")
                  }}
                >
                  Copy to Clipboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                  onClick={() => window.print()}
                >
                  Print Summary
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-lg">
              <CardTitle className="text-slate-700">Summary Statistics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Word Count:</span>
                  <span className="font-medium text-slate-700">{summary.split(" ").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Character Count:</span>
                  <span className="font-medium text-slate-700">{summary.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Sections:</span>
                  <span className="font-medium text-slate-700">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Generated:</span>
                  <span className="font-medium text-slate-700">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
