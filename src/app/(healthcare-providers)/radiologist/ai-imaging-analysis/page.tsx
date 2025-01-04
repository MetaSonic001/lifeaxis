'use client'

import { useState } from 'react'

type ImageAnalysis = {
  id: number
  patientName: string
  imageType: 'X-ray' | 'MRI' | 'CT Scan'
  bodyPart: string
  aiFindings: string
  radiologistNotes: string
  status: 'Pending Review' | 'Reviewed'
}

export default function AIImagingAnalysis() {
  const [analyses, setAnalyses] = useState<ImageAnalysis[]>([
    {
      id: 1,
      patientName: 'John Doe',
      imageType: 'X-ray',
      bodyPart: 'Chest',
      aiFindings: 'Possible pneumonia in lower right lobe',
      radiologistNotes: '',
      status: 'Pending Review'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      imageType: 'MRI',
      bodyPart: 'Brain',
      aiFindings: 'No significant abnormalities detected',
      radiologistNotes: '',
      status: 'Pending Review'
    },
  ])

  const handleReview = (id: number, notes: string) => {
    setAnalyses(prevAnalyses =>
      prevAnalyses.map(analysis =>
        analysis.id === id ? { ...analysis, radiologistNotes: notes, status: 'Reviewed' } : analysis
      )
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI-Assisted Imaging Analysis</h1>
      {analyses.map(analysis => (
        <div key={analysis.id} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">{analysis.patientName} - {analysis.imageType} of {analysis.bodyPart}</h2>
          <p className="mb-2"><strong>AI Findings:</strong> {analysis.aiFindings}</p>
          <p className="mb-2"><strong>Status:</strong> {analysis.status}</p>
          {analysis.status === 'Pending Review' ? (
            <div>
              <textarea
                className="w-full p-2 border rounded mb-2"
                placeholder="Enter your notes here"
                rows={3}
              ></textarea>
              <button
                onClick={() => handleReview(analysis.id, 'Radiologist notes here')} // In a real app, you'd get the notes from the textarea
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit Review
              </button>
            </div>
          ) : (
            <p><strong>Radiologist Notes:</strong> {analysis.radiologistNotes}</p>
          )}
        </div>
      ))}
    </div>
  )
}

