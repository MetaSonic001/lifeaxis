"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ClinicalDecisionSupport() {
  const [caseDetails, setCaseDetails] = useState("")
  const [recommendation, setRecommendation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!caseDetails.trim()) {
      alert("Please enter case details")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call with mock response
      setTimeout(() => {
        const mockRecommendation = `Clinical Decision Support Recommendation:

1. Provisional Diagnosis:
   Based on the presented symptoms and clinical findings, the most likely diagnosis appears to be related to the described condition. Consider differential diagnoses including related conditions that may present similarly.

2. Recommended Diagnostic Tests:
   - Complete Blood Count (CBC) with differential
   - Comprehensive Metabolic Panel (CMP)
   - Inflammatory markers (ESR, CRP)
   - Imaging studies as clinically indicated
   - Specific laboratory tests based on suspected diagnosis

3. Initial Treatment Plan:
   - Symptomatic management with appropriate medications
   - Supportive care measures
   - Monitor vital signs and clinical response
   - Consider specialist consultation if indicated

4. Pharmacological Interventions:
   - Evidence-based medication selection
   - Appropriate dosing based on patient factors
   - Monitor for drug interactions and contraindications
   - Consider patient allergies and previous reactions

5. Follow-up Recommendations:
   - Schedule appropriate follow-up interval
   - Patient education on warning signs
   - Clear instructions for medication compliance
   - When to seek immediate medical attention

6. Patient Management Considerations:
   - Assess patient's understanding and compliance
   - Consider social and economic factors
   - Coordinate care with other healthcare providers
   - Document all clinical decisions and rationale

IMPORTANT DISCLAIMER: This is a decision support tool. The final clinical decision must be made by a qualified healthcare professional based on complete patient assessment and clinical judgment.`

        setRecommendation(mockRecommendation)
        setIsLoading(false)
      }, 3000)
    } catch (error) {
      console.error("Error generating clinical recommendation:", error)
      setRecommendation("Sorry, there was an error generating the clinical recommendation. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Clinical Decision Support System
        </h1>
        <p className="text-slate-600">AI-powered clinical recommendations and treatment guidance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg">
            <CardTitle className="text-slate-700">Case Input</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="caseDetails" className="text-slate-700 font-medium">
                  Case Details
                </Label>
                <Textarea
                  id="caseDetails"
                  placeholder="Enter detailed case information, including patient history, symptoms, physical examination findings, and any available test results..."
                  value={caseDetails}
                  onChange={(e) => setCaseDetails(e.target.value)}
                  className="mt-2 min-h-[200px] border-slate-200 focus:border-blue-400 resize-none"
                  rows={8}
                />
                <p className="text-sm text-slate-500 mt-2">
                  Provide comprehensive patient information for accurate recommendations
                </p>
              </div>
              <Button
                type="submit"
                disabled={isLoading || !caseDetails.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Recommendation...</span>
                  </div>
                ) : (
                  "Get Clinical Recommendation"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-t-lg">
            <CardTitle className="text-slate-700">AI-Generated Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {recommendation ? (
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg max-h-[400px] overflow-y-auto">
                <pre className="whitespace-pre-line text-slate-700 text-sm leading-relaxed">{recommendation}</pre>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                </div>
                <p className="text-slate-500">
                  Enter case details and click "Get Clinical Recommendation" to receive AI-powered guidance
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {recommendation && (
        <Card className="mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-lg">
            <CardTitle className="text-slate-700">Important Notice</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                <strong>Disclaimer:</strong> This AI-generated recommendation is for educational and decision support
                purposes only. Always use your clinical judgment and consider the complete patient context. Consult with
                colleagues or specialists when appropriate, and ensure all recommendations align with current medical
                guidelines and institutional protocols.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
