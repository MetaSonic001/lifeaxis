"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function AIDiagnostics() {
  const [symptoms, setSymptoms] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!symptoms.trim()) {
      alert("Please enter patient symptoms")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call with mock response
      setTimeout(() => {
        const mockDiagnosis = `AI-ASSISTED DIAGNOSTIC ASSESSMENT

Based on the symptoms provided, here is a comprehensive diagnostic evaluation:

POTENTIAL DIAGNOSES (Ranked by Probability):

1. PRIMARY DIAGNOSIS
   - Most likely condition based on symptom constellation
   - Prevalence: Common/Uncommon in this demographic
   - Typical presentation matches described symptoms
   - Confidence Level: High/Moderate/Low

2. DIFFERENTIAL DIAGNOSES
   - Alternative conditions to consider
   - Similar presentations but different pathophysiology
   - Less likely but important to rule out
   - May require additional testing for differentiation

3. RED FLAG CONDITIONS
   - Serious conditions that must be excluded
   - Require immediate attention if suspected
   - May present with similar but more severe symptoms
   - Emergency referral may be indicated

CLINICAL REASONING:
- Symptom analysis and pattern recognition
- Epidemiological factors and risk assessment
- Pathophysiological considerations
- Timeline and progression of symptoms

RECOMMENDED NEXT STEPS:

Immediate Actions:
- Vital signs assessment and stabilization if needed
- Focused physical examination
- Point-of-care testing if available

Diagnostic Workup:
- Laboratory investigations (specify tests)
- Imaging studies if indicated
- Specialist consultation recommendations
- Additional history taking from patient/family

Treatment Considerations:
- Symptomatic management options
- Empirical treatment if diagnosis is clear
- Monitoring parameters and follow-up
- Patient education and safety netting

IMPORTANT DISCLAIMER:
This AI assessment is for educational and decision support purposes only. Clinical diagnosis requires comprehensive patient evaluation, physical examination, and appropriate diagnostic testing. Always use clinical judgment and consider the complete patient context. Consult with colleagues or specialists when appropriate.`

        setDiagnosis(mockDiagnosis)
        setIsLoading(false)
      }, 3000)
    } catch (error) {
      console.error("Error generating diagnosis:", error)
      setDiagnosis("Sorry, there was an error generating the diagnosis. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          AI-Assisted Diagnostics
        </h1>
        <p className="text-slate-600">Advanced symptom analysis and diagnostic support</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-t-lg">
            <CardTitle className="text-slate-700">Symptom Input</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="symptoms" className="text-slate-700 font-medium">
                  Patient Symptoms
                </Label>
                <Textarea
                  id="symptoms"
                  placeholder="Enter detailed patient symptoms including:
• Chief complaint and duration
• Associated symptoms
• Severity and progression
• Aggravating and relieving factors
• Patient demographics (age, gender)
• Relevant medical history
• Current medications
• Any other relevant clinical information..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="mt-2 min-h-[200px] border-slate-200 focus:border-violet-400 resize-none"
                  rows={8}
                />
                <p className="text-sm text-slate-500 mt-2">
                  Provide comprehensive symptom details for accurate diagnostic suggestions
                </p>
              </div>
              <Button
                type="submit"
                disabled={isLoading || !symptoms.trim()}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Symptoms...</span>
                  </div>
                ) : (
                  "Generate Diagnostic Assessment"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-t-lg">
            <CardTitle className="text-slate-700">AI-Generated Diagnosis</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {diagnosis ? (
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg max-h-[400px] overflow-y-auto">
                <pre className="whitespace-pre-line text-slate-700 text-sm leading-relaxed">{diagnosis}</pre>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"></div>
                </div>
                <p className="text-slate-500">
                  Enter patient symptoms and click "Generate Diagnostic Assessment" to receive AI-powered diagnostic
                  suggestions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
            <CardTitle className="text-slate-700 text-lg">Quick Symptom Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Badge variant="outline" className="mr-2 mb-2 border-blue-200 text-blue-600">
                Cardiovascular
              </Badge>
              <Badge variant="outline" className="mr-2 mb-2 border-green-200 text-green-600">
                Respiratory
              </Badge>
              <Badge variant="outline" className="mr-2 mb-2 border-purple-200 text-purple-600">
                Neurological
              </Badge>
              <Badge variant="outline" className="mr-2 mb-2 border-orange-200 text-orange-600">
                Gastrointestinal
              </Badge>
              <Badge variant="outline" className="mr-2 mb-2 border-pink-200 text-pink-600">
                Musculoskeletal
              </Badge>
              <Badge variant="outline" className="mr-2 mb-2 border-teal-200 text-teal-600">
                Dermatological
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-lg">
            <CardTitle className="text-slate-700 text-lg">Diagnostic Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">AI Confidence:</span>
                <Badge className="bg-green-100 text-green-700 border-green-200">High</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Evidence Level:</span>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">Strong</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Urgency:</span>
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Moderate</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-t-lg">
            <CardTitle className="text-slate-700 text-lg">Safety Reminders</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Always perform physical examination</li>
              <li>• Consider patient's full medical history</li>
              <li>• Use clinical judgment for final diagnosis</li>
              <li>• Consult specialists when needed</li>
              <li>• Follow institutional protocols</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {diagnosis && (
        <Card className="mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100 rounded-t-lg">
            <CardTitle className="text-slate-700">Important Medical Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                <strong>Medical Disclaimer:</strong> This AI-generated diagnostic assessment is for educational and
                decision support purposes only. It should not replace clinical judgment, physical examination, or
                comprehensive patient evaluation. Always consider the complete clinical picture, perform appropriate
                diagnostic tests, and consult with colleagues or specialists when indicated. The final diagnosis and
                treatment decisions remain the responsibility of the attending physician.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
