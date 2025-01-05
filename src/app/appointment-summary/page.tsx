'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, CreditCard, FileText, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

function AppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams) {
    router.push('/');
    return null;
  }

  const appointmentDetails = {
    hospitalId: searchParams.get('hospitalId') || 'N/A',
    doctorId: searchParams.get('doctorId') || 'N/A',
    date: searchParams.get('date')
      ? new Date(searchParams.get('date') as string).toLocaleDateString()
      : 'N/A',
    slot: searchParams.get('slot') || 'N/A',
    price: searchParams.get('price') || 'N/A',
    reason: searchParams.get('reason') || 'N/A',
    additionalInfo: searchParams.get('additionalInfo') || 'N/A',
  };

  const handleEdit = () => {
    router.back();
  };

  const handleConfirm = () => {
    if (!appointmentDetails.hospitalId || !appointmentDetails.doctorId || !appointmentDetails.date) {
      alert('Some required details are missing.');
      return;
    }
    router.push('/booking-confirmation');
  };

  return (
    <Card className="shadow-lg border-none">
      <CardHeader className="space-y-3 border-b border-gray-100 pb-6">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Appointment Summary
        </CardTitle>
        <CardDescription className="text-lg">
          Please review your appointment details before confirming
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        {/* Main Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{appointmentDetails.date}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{appointmentDetails.slot}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="font-medium">${appointmentDetails.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              Reason for Visit
            </h3>
            <p className="text-gray-700">{appointmentDetails.reason}</p>
          </div>

          {appointmentDetails.additionalInfo !== 'N/A' && (
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                Additional Information
              </h3>
              <p className="text-gray-700">{appointmentDetails.additionalInfo}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
          <Button 
            onClick={handleEdit}
            variant="outline"
            className="flex-1 py-6 text-base font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Edit Details
          </Button>
          <Button 
            onClick={handleConfirm}
            className="flex-1 py-6 text-base font-medium bg-blue-600 hover:bg-blue-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Confirm and Pay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AppointmentSummary() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Suspense fallback={
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-lg text-gray-600">Loading appointment details...</span>
        </div>
      }>
        <AppointmentContent />
      </Suspense>
    </div>
  );
}