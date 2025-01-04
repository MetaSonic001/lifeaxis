'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Clock, User, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ImagingStudy = {
  id: number
  patientName: string
  studyType: string
  urgency: 'Low' | 'Medium' | 'High'
  aiFindings: string
  timestamp: string
}

export default function AutomatedImagingPrioritization() {
  const [studies, setStudies] = useState<ImagingStudy[]>([])

  useEffect(() => {
    // Simulating incoming imaging studies
    const studyTypes = ['X-ray', 'MRI', 'CT Scan', 'Ultrasound']
    const urgencyLevels: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High']
    
    const interval = setInterval(() => {
      const newStudy: ImagingStudy = {
        id: Date.now(),
        patientName: `Patient ${Math.floor(Math.random() * 1000)}`,
        studyType: studyTypes[Math.floor(Math.random() * studyTypes.length)],
        urgency: urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)],
        aiFindings: 'Potential abnormality detected',
        timestamp: new Date().toLocaleString(),
      }
      setStudies(prevStudies => [...prevStudies, newStudy].sort((a, b) => {
        const urgencyOrder = { High: 0, Medium: 1, Low: 2 }
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
      }))
    }, 10000) // New study every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const handleReviewStudy = (id: number) => {
    // In a real application, this would open the imaging study for review
    console.log(`Reviewing study ${id}`)
    setStudies(prevStudies => prevStudies.filter(study => study.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Automated Imaging Prioritization System</h1>

      <div className="space-y-4">
        {studies.map(study => (
          <Card key={study.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{study.patientName}</span>
                <Badge variant={study.urgency === 'High' ? 'destructive' : study.urgency === 'Medium' ? 'default' : 'secondary'}>
                  {study.urgency} Priority
                </Badge>
              </CardTitle>
              <CardDescription>{study.studyType}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5 text-blue-500" />
                  <span>{study.aiFindings}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span>Received: {study.timestamp}</span>
                </div>
              </div>
              <Button onClick={() => handleReviewStudy(study.id)} className="mt-4">
                Review Study
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {studies.length === 0 && (
        <Card>
          <CardContent className="text-center py-6">
            <p>No pending studies. Great job!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

