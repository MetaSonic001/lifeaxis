'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
            Appointment Booked Successfully
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your appointment has been confirmed. A confirmation email and SMS have been sent with the details.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push('/appointments/my-bookings')}>View My Bookings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

