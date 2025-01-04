'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AppointmentSummary() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isEditing, setIsEditing] = useState(false)

  const appointmentDetails = {
    hospitalId: searchParams.get('hospitalId'),
    doctorId: searchParams.get('doctorId'),
    date: new Date(searchParams.get('date') as string).toLocaleDateString(),
    slot: searchParams.get('slot'),
    price: searchParams.get('price'),
    reason: searchParams.get('reason'),
    additionalInfo: searchParams.get('additionalInfo')
  }

  const handleEdit = () => {
    setIsEditing(true)
    router.back()
  }

  const handleConfirm = () => {
    // Here you would typically send the appointment details to your backend
    // For now, we'll just simulate a successful booking
    router.push('/booking-confirmation')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Appointment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p><strong>Date:</strong> {appointmentDetails.date}</p>
            <p><strong>Time:</strong> {appointmentDetails.slot}</p>
            <p><strong>Price:</strong> ${appointmentDetails.price}</p>
            <p><strong>Reason for Visit:</strong> {appointmentDetails.reason}</p>
            <p><strong>Additional Information:</strong> {appointmentDetails.additionalInfo}</p>
            <div className="flex space-x-4">
              <Button onClick={handleEdit}>Edit Details</Button>
              <Button onClick={handleConfirm}>Confirm and Pay</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

