'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleGenerativeAI } from "@google/generative-ai"

export default function CaseSummaryGenerator() {
  const [patientInfo, setPatientInfo] = useState('')
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate patient info input
    if (!patientInfo.trim()) {
      alert('Please enter patient information')
      return
    }

    setIsLoading(true)

    try {
      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      // Craft a detailed prompt for case summary generation
      const prompt = `You are a medical professional assistant. Generate a comprehensive, well-structured case summary based on the following patient information:

      ${patientInfo}

      Please format the summary with the following sections:
      - Patient Demographics
      - Chief Complaint
      - Key Clinical Findings
      - Relevant Medical History
      - Diagnostic Considerations
      - Recommended Next Steps

      Ensure the summary is:
      - Clear and concise
      - Professionally formatted
      - Focused on key medical insights
      - Providing actionable recommendations`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const rawText = response.text()

      // Sanitize and format the generated case summary
      const cleanText = rawText
        .replace(/\*\*/g, '') // Remove double asterisks
        .replace(/\n+/g, '\n') // Collapse multiple newlines
        .trim() // Remove leading/trailing whitespace

      setSummary(cleanText)
    } catch (error) {
      console.error('Error generating case summary:', error)
      setSummary('Sorry, there was an error generating the case summary. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Case Summary Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea 
                placeholder="Enter patient information, symptoms, and relevant medical history..."
                value={patientInfo}
                onChange={(e) => setPatientInfo(e.target.value)}
                className="w-full"
                rows={6}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Generating Summary...' : 'Generate Summary'}
            </Button>
          </form>

          {summary && (
            <div className="mt-4 p-4 bg-black rounded-md">
              <h2 className="text-lg font-semibold mb-2">Generated Case Summary:</h2>
              <p className="whitespace-pre-line">{summary}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
