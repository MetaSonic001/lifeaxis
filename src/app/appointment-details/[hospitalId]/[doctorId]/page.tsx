'use client'

import { useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, Calendar, Clock, CreditCard, FileText, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AppointmentDetails() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [reason, setReason] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const date = searchParams.get('date')
  const slot = searchParams.get('slot')
  const price = searchParams.get('price')

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert('Please provide a reason for your appointment.')
      return
    }

    const hospitalId = params.hospitalId || searchParams.get('hospitalId')
    const doctorId = params.doctorId || searchParams.get('doctorId')

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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="shadow-lg border-none">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Appointment Details
          </CardTitle>
          <CardDescription className="text-lg">
            Please provide additional information about your visit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Appointment Summary */}
          <div className="bg-blue-50 p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-semibold text-blue-800">Appointment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(date!).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{slot}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                  <p className="font-medium">${price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-lg font-medium flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Reason for Appointment
              </Label>
              <Textarea
                id="reason"
                placeholder="Please describe your symptoms or reason for visit in detail"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[120px] text-base"
              />
              {!reason.trim() && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please provide a reason for your appointment
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-lg font-medium flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Additional Information
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any medical history, current medications, or other relevant information"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="min-h-[120px] text-base"
              />
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !reason.trim()} 
            className="w-full py-6 text-lg font-medium bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </span>
            ) : (
              'Review Appointment'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  
  )
}