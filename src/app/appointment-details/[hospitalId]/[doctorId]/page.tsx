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

  const handleSubmit = () => {
    const appointmentDetails = {
      hospitalId: params.hospitalId,
      doctorId: params.doctorId,
      date: searchParams.get('date'),
      slot: searchParams.get('slot'),
      price: searchParams.get('price'),
      reason,
      additionalInfo
    }
    router.push(`/appointment-summary?${new URLSearchParams(appointmentDetails as any).toString()}`)
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
            <Button onClick={handleSubmit}>Review Appointment</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

