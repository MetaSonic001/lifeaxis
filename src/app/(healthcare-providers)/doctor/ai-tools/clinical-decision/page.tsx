'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleGenerativeAI } from "@google/generative-ai"

export default function ClinicalDecisionSupport() {
  const [caseDetails, setCaseDetails] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate case details input
    if (!caseDetails.trim()) {
      alert('Please enter case details')
      return
    }

    setIsLoading(true)
    
    try {
      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')
      const model = genAI.getGenerativeModel({ model: "gemini-pro"})

      // Craft a detailed prompt for clinical decision support
      const prompt = `You are a medical decision support AI assistant. Provide a comprehensive clinical recommendation based on the following case details:

      ${caseDetails}

      Please structure your recommendation with the following sections:
      1. Provisional Diagnosis
      2. Recommended Diagnostic Tests
      3. Initial Treatment Plan
      4. Pharmacological Interventions
      5. Follow-up Recommendations
      6. Patient Management Considerations

      Key guidelines:
      - Base recommendations on best medical practices
      - Provide evidence-based suggestions
      - Include rationale for each recommendation
      - Emphasize the need for individual clinical judgment
      - Maintain a professional, concise medical tone

      IMPORTANT: This is a decision support tool. The final clinical decision must be made by a qualified healthcare professional.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const rawText = response.text()

      // Clean and format the AI response
      const cleanText = rawText
        .replace(/\*\*/g, '') // Remove all double asterisks
        .replace(/\[.*?\]/g, '') // Remove bracketed content, if any
        .replace(/\n+/g, '\n') // Collapse multiple newlines into a single newline
        .trim() // Remove leading and trailing whitespace

      setRecommendation(cleanText)
    } catch (error) {
      console.error('Error generating clinical recommendation:', error)
      setRecommendation('Sorry, there was an error generating the clinical recommendation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Clinical Decision Support System</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea 
                placeholder="Enter detailed case information, including patient history, symptoms, and test results..."
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
                className="w-full"
                rows={6}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Generating Recommendation...' : 'Get Recommendation'}
            </Button>
          </form>

          {recommendation && (
            <div className="mt-4 p-4 bg-black rounded-md">
              <h2 className="text-lg font-semibold mb-2">AI-Generated Recommendation:</h2>
              <p className="whitespace-pre-line">{recommendation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
