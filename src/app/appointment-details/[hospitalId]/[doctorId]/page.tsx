'use client'

import { useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AppointmentDetails() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [reason, setReason] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    // Validate required parameters
    if (!reason.trim()) {
      alert('Please provide a reason for your appointment.')
      return
    }

    const hospitalId = params.hospitalId || searchParams.get('hospitalId')
    const doctorId = params.doctorId || searchParams.get('doctorId')
    const date = searchParams.get('date')
    const slot = searchParams.get('slot')
    const price = searchParams.get('price')

    if (!hospitalId || !doctorId || !date || !slot || !price) {
      alert('Missing essential appointment details. Please go back and try again.')
      return
    }

    const appointmentDetails = {
      hospitalId,
      doctorId,
      date,
      slot,
      price,
      reason,
      additionalInfo,
    }

    const queryString = new URLSearchParams(
      Object.entries(appointmentDetails).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.join(',') : value;
        return acc;
      }, {} as Record<string, string>)
    ).toString()

    try {
      setIsLoading(true)
      await router.push(`/appointment-summary?${queryString}`)
    } catch (error) {
      console.error('Navigation error:', error)
      alert('Failed to navigate to the summary page. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason for Appointment</Label>
              <Textarea
                id="reason"
                placeholder="Please describe the reason for your visit"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any additional information for the doctor"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Review Appointment'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
