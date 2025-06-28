"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Send } from "lucide-react"

export default function TeleconsultationSymptomAnalysis() {
  const [patientSymptoms, setPatientSymptoms] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: patientSymptoms }),
      })

      if (!response.ok) {
        throw new Error("Symptom analysis failed")
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Teleconsultation Symptom Analysis</h1>
        <p className="text-slate-600">AI-powered preliminary symptom analysis for remote consultations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="patientSymptoms" className="block text-sm font-medium text-slate-700 mb-3">
              Patient Reported Symptoms
            </label>
            <textarea
              id="patientSymptoms"
              rows={8}
              className="
                block w-full px-4 py-3 
                border border-slate-300 rounded-lg 
                shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition duration-200
                text-slate-700 placeholder-slate-400
                resize-none
              "
              value={patientSymptoms}
              onChange={(e) => setPatientSymptoms(e.target.value)}
              placeholder="Enter a detailed description of patient symptoms, including duration, severity, and any accompanying conditions..."
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="
                px-8 py-3 
                bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
                rounded-lg 
                hover:from-blue-600 hover:to-indigo-600 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
                font-medium shadow-sm
                flex items-center space-x-2
              "
              disabled={isLoading || !patientSymptoms.trim()}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Analyzing Symptoms...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Analyze Symptoms</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Analysis Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {analysis && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Preliminary Analysis</span>
            </h2>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <pre className="whitespace-pre-wrap text-slate-700 text-sm leading-relaxed">{analysis}</pre>
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-700">
                <strong>Disclaimer:</strong> This analysis is for preliminary assessment only and should not replace
                professional medical diagnosis.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
