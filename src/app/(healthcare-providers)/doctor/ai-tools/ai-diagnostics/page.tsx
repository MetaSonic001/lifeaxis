'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleGenerativeAI } from "@google/generative-ai"

export default function AIDiagnostics() {
  const [symptoms, setSymptoms] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate symptoms input
    if (!symptoms.trim()) {
      alert('Please enter patient symptoms')
      return
    }

    setIsLoading(true)

    try {
      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      // Craft a detailed prompt for medical diagnosis
      const prompt = `You are a medical AI assistant. Provide a professional medical assessment based on these symptoms: ${symptoms}.
      
      Please follow these guidelines:
      - List potential diagnoses
      - Provide a brief explanation for each diagnosis
      - Recommend next steps or consultations
      - Emphasize that this is not a definitive diagnosis

      Format your response in a clear, structured manner.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const rawText = response.text()

      // Clean the response by removing unnecessary parts like '**' or excessive formatting
      const cleanText = rawText
        .replace(/\*\*/g, '') // Remove double asterisks
        .replace(/\n+/g, '\n') // Remove excessive newlines
        .trim() // Remove leading and trailing whitespace

      setDiagnosis(cleanText)
    } catch (error) {
      console.error('Error generating diagnosis:', error)
      setDiagnosis('Sorry, there was an error generating the diagnosis. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">AI-Assisted Diagnostics</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea 
                placeholder="Enter patient symptoms..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Generating...' : 'Generate Diagnosis'}
            </Button>
          </form>

          {diagnosis && (
            <div className="mt-4 p-4 bg-black rounded-md">
              <h2 className="text-lg font-semibold mb-2">AI-Generated Diagnosis:</h2>
              <p className="whitespace-pre-line">{diagnosis}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
