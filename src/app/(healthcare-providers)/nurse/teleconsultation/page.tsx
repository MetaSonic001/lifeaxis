'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'

export default function TeleconsultationSymptomAnalysis() {
  const [patientSymptoms, setPatientSymptoms] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: patientSymptoms })
      })

      if (!response.ok) {
        throw new Error('Symptom analysis failed')
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black-900">
      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        <div className="bg-black shadow-lg rounded-lg p-6 md:p-10 flex-grow flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-white-800 mb-6 text-center">
            Teleconsultation Symptom Analysis
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
            <div className="flex-grow flex flex-col">
              <label 
                htmlFor="patientSymptoms" 
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Patient Reported Symptoms
              </label>
              <textarea
                id="patientSymptoms"
                rows={6}
                className="
                  block w-full px-4 py-3 
                  border border-gray-300 rounded-lg 
                  shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition duration-200
                  text-gray-200 placeholder-white-400
                  flex-grow
                "
                value={patientSymptoms}
                onChange={(e) => setPatientSymptoms(e.target.value)}
                placeholder="Enter a detailed description of patient symptoms, including duration, severity, and any accompanying conditions..."
                disabled={isLoading}
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="
                  px-6 py-3 
                  bg-blue-600 text-white 
                  rounded-lg 
                  hover:bg-blue-900 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                  disabled:opacity-50 
                  transition duration-200
                  w-full md:w-auto
                "
                disabled={isLoading || !patientSymptoms.trim()}
              >
                {isLoading ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-center">
              <AlertCircle className="mr-2 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {analysis && (
            <div className="mt-6 p-6 rounded-lg shadow-md bg-black-100 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-white-800">Preliminary Analysis:</h2>
              <div className="bg-black p-4 rounded-lg border border-gray-00">
                <pre className="whitespace-pre-wrap text-white-700">
                  {analysis}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}